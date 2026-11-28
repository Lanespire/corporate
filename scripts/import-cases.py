"""Convert the reviewed case manuscript (Markdown) into src/lib/corp/cases.json.

Text is copied verbatim and the manuscript's own structure is kept: a line stays a paragraph,
"- " lines stay a bullet list, "1. " lines stay a numbered list. Nothing is reworded or dropped
except the "相談" section, whose single sentence is shown once per case page from content.ts.
"""
import hashlib
import json
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
raw = Path(sys.argv[1]).read_bytes()
source = raw.decode('utf-8')
SLUGS = [
    ('シングルサインオン', 'sso', '請負'),
    ('日報', 'daily-report', None),
    ('AI対話', 'real-estate-ai', '業務委託'),
    ('媒体更新', 'media-ops', None),
    ('顧客管理', 'sales-crm', '業務委託'),
    ('研修', 'ai-training', None),
]
FEATURED = 4
TABLE = '項目表'
SKIPPED = {'相談'}
FORBIDDEN = ['受託', '不明', '職務経歴書', '契約の形', 'ボリューム']
BULLET = re.compile(r'^- +(.+)$')
NUMBER = re.compile(r'^\d+\. +(.+)$')
ROW = re.compile(r'^\| *([^|]+?) *\| *([^|]+?) *\|$')

for word in FORBIDDEN:
    if word in source:
        raise SystemExit(f'The manuscript contains "{word}", which must not be published. Nothing was written.')


def blocks_of(text):
    blocks = []
    for line in (line.strip() for line in text.split('\n')):
        if not line:
            continue
        bullet, number = BULLET.match(line), NUMBER.match(line)
        kind = 'ul' if bullet else 'ol' if number else 'p'
        if kind == 'p':
            blocks.append({'t': 'p', 'text': line})
        elif blocks and blocks[-1]['t'] == kind:
            blocks[-1]['items'].append((bullet or number).group(1))
        else:
            blocks.append({'t': kind, 'items': [(bullet or number).group(1)]})
    return blocks


def sentences(blocks):
    text = ''.join(block['text'] for block in blocks if block['t'] == 'p')
    return [part + '。' for part in text.split('。') if part.strip()]


cases = []
for block in re.split(r'^## ', source, flags=re.M)[1:]:
    title, _, body = block.partition('\n')
    title = title.strip()
    match = next((s for s in SLUGS if s[0] in title), None)
    if match is None:
        raise SystemExit(f'Unknown case in the manuscript: {title}')
    meta, tech, sections = [], [], []
    for part in re.split(r'^### ', body, flags=re.M)[1:]:
        heading, _, text = part.partition('\n')
        heading = heading.strip()
        if heading == TABLE:
            for key, value in (row.groups() for row in map(ROW.match, text.split('\n')) if row):
                if key == '項目' or set(key) <= {'-', ' '}:
                    continue
                if key == '技術':
                    tech = [item.strip() for item in value.split('、')]
                else:
                    meta.append({'k': key, 'v': value})
        elif heading not in SKIPPED:
            sections.append({'h': heading, 'blocks': blocks_of(text)})
    if not sections or not tech or not meta:
        raise SystemExit(f'Incomplete case: {title}')
    cases.append(
        {
            'slug': match[1],
            'title': title,
            'label': match[2],
            'featured': len(cases) < FEATURED,
            'meta': meta,
            'tech': tech,
            'summary': sentences(sections[0]['blocks'])[0],
            'results': sentences(sections[-1]['blocks'])[:2],
            'sections': sections,
        }
    )
if [c['slug'] for c in cases] != [s[1] for s in SLUGS]:
    raise SystemExit(f'Expected the cases in the agreed order, found: {[c["slug"] for c in cases]}')

# Self-check: every text unit of the manuscript, read a second way, must equal what was written.
expected, skipping = [], False
for line in (line.strip() for line in source.split('\n')):
    if not line or line.startswith('# '):
        continue
    if line.startswith('## '):
        expected.append(line[3:].strip())
        skipping = False
    elif line.startswith('### '):
        heading = line[4:].strip()
        skipping = heading in SKIPPED
        if heading != TABLE and not skipping:
            expected.append(heading)
    elif skipping:
        continue
    elif line.startswith('|'):
        row = ROW.match(line)
        if row and row.group(1) != '項目' and not set(row.group(1)) <= {'-', ' '}:
            expected.append(row.group(2))
    else:
        expected.append(re.sub(r'^(- +|\d+\. +)', '', line))
written = []
for case in cases:
    written.append(case['title'])
    written.extend(row['v'] for row in case['meta'])
    written.append('、'.join(case['tech']))
    for section in case['sections']:
        written.append(section['h'])
        for item in section['blocks']:
            written.extend([item['text']] if item['t'] == 'p' else item['items'])
if expected != written:
    missing = [unit for unit in expected if unit not in written]
    extra = [unit for unit in written if unit not in expected]
    raise SystemExit(f'Self-check failed. Missing: {missing[:3]} Extra: {extra[:3]}')
for case in cases:
    body = ''.join(''.join([b['text']] if b['t'] == 'p' else b['items']) for s in case['sections'] for b in s['blocks'])
    for sentence in [case['summary'], *case['results']]:
        if sentence not in body:
            raise SystemExit(f'Card sentence is not in the manuscript: {sentence}')

text = json.dumps(cases, ensure_ascii=False, indent='\t') + '\n'
(root / 'src/lib/corp/cases.json').write_text(text, encoding='utf-8')
print(f'{len(cases)} cases, {len(written)} text units, all equal to the manuscript.')
print('manuscript sha256:', hashlib.sha256(raw).hexdigest()[:16])
