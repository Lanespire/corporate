"""Convert the reviewed case manuscript (Markdown) into src/lib/corp/cases.json. Text is copied verbatim."""
import json
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
source = Path(sys.argv[1]).read_text(encoding='utf-8')
SLUGS = [
    ('シングルサインオン', 'sso', '請負'),
    ('日報', 'daily-report', None),
    ('AI対話', 'real-estate-ai', '業務委託'),
    ('媒体更新', 'media-ops', None),
    ('顧客管理', 'sales-crm', '業務委託'),
    ('研修', 'ai-training', None),
]
FEATURED = 4
INTERNAL = ['職務経歴書に請負と記載されています。', '本人の職務経歴書の記載です。']
SKIP_SECTIONS = {'項目表', '相談'}


def sentences(text):
    for note in INTERNAL:
        text = text.replace(note, '')
    return [part.strip() + '。' for part in text.split('。') if part.strip()]


cases = []
for block in re.split(r'^## ', source, flags=re.M)[1:]:
    title, _, body = block.partition('\n')
    title = title.strip()
    match = next((s for s in SLUGS if s[0] in title), None)
    if match is None:
        continue
    meta, tech, sections = [], [], []
    for part in re.split(r'^### ', body, flags=re.M)[1:]:
        heading, _, text = part.partition('\n')
        heading = heading.strip()
        if heading == '項目表':
            for key, value in re.findall(r'^\| *([^|]+?) *\| *([^|]+?) *\|$', text, flags=re.M):
                if key in ('項目', '---') or set(key) <= {'-', ' '}:
                    continue
                if key == '技術':
                    tech = [t.strip() for t in value.split('、') if t.strip()]
                else:
                    meta.append({'k': key, 'v': value})
        elif heading not in SKIP_SECTIONS:
            items = []
            for line in [line.strip() for line in text.split('\n') if line.strip()]:
                numbered = re.match(r'^\d+\. *(.+)$', line)
                items.extend([numbered.group(1)] if numbered else sentences(line))
            if items:
                sections.append({'h': heading, 'items': items})
    if not sections:
        raise SystemExit(f'No sections: {title}')
    cases.append(
        {
            'slug': match[1],
            'title': title,
            'label': match[2],
            'featured': len(cases) < FEATURED,
            'meta': meta,
            'tech': tech,
            'summary': sections[0]['items'][0],
            'sections': sections,
        }
    )
if len(cases) != len(SLUGS):
    raise SystemExit(f'Expected {len(SLUGS)} cases, found {len(cases)}')
text = json.dumps(cases, ensure_ascii=False, indent='\t') + '\n'
if '受託' in text or '不明' in text:
    raise SystemExit('Manuscript contains a word that must not be published')
(root / 'src/lib/corp/cases.json').write_text(text, encoding='utf-8')
print(f'{len(cases)} cases:', ', '.join(c['slug'] for c in cases))
