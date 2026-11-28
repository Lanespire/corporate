"""Compare a deployed site with the case manuscript, text unit by text unit.

Usage: python3 scripts/check-cases-live.py <cases.md> <base-url>
Reads the rendered HTML only (scripts and styles are removed), so hydration data cannot mask a missing sentence.
"""
import html
import json
import re
import sys
import urllib.request
from pathlib import Path

root = Path(__file__).resolve().parent.parent
source = Path(sys.argv[1]).read_text(encoding='utf-8')
base = sys.argv[2].rstrip('/')
slugs = {case['title']: case for case in json.loads((root / 'src/lib/corp/cases.json').read_text(encoding='utf-8'))}
SKIPPED = {'相談'}


def page_text(path):
    request = urllib.request.Request(base + path, headers={'User-Agent': 'Mozilla/5.0 (case manuscript check)'})
    markup = urllib.request.urlopen(request, timeout=30).read().decode('utf-8')
    markup = re.sub(r'<(script|style|svg|noscript)\b[\s\S]*?</\1>', '', markup)
    markup = re.sub(r'<!--[\s\S]*?-->', '', markup)
    return html.unescape(re.sub(r'<[^>]+>', '\n', markup))


failures = 0
top = page_text('/')
for block in re.split(r'^## ', source, flags=re.M)[1:]:
    title, _, body = block.partition('\n')
    title = title.strip()
    case = slugs[title]
    units, table, skipping = [title], {}, False
    for line in (line.strip() for line in body.split('\n')):
        if not line:
            continue
        if line.startswith('### '):
            heading = line[4:].strip()
            skipping = heading in SKIPPED
            if heading != '項目表' and not skipping:
                units.append(heading)
        elif skipping:
            continue
        elif line.startswith('|'):
            cells = [cell.strip() for cell in line.strip('|').split('|')]
            if cells[0] in ('項目', '') or set(cells[0]) <= {'-', ' '}:
                continue
            table[cells[0]] = cells[1]
            units.extend(cells[1].split('、') if cells[0] == '技術' else [cells[1]])
        else:
            units.append(re.sub(r'^(- +|\d+\. +)', '', line))
    text = page_text('/cases/' + case['slug'])
    lines = {line.strip() for line in text.split('\n')}
    missing = [unit for unit in units if unit not in lines]
    card = [title, *[table[key] for key in ('期間', '体制', '担当範囲')]] if case['featured'] else [title]
    top_lines = {line.strip() for line in top.split('\n')}
    missing_top = [unit for unit in card + (case['results'] + [case['summary']] if case['featured'] else []) if unit not in top_lines]
    failures += len(missing) + len(missing_top)
    print(f"{case['slug']}: {len(units)} units on the case page, {len(missing)} missing; top page {len(missing_top)} missing")
    for unit in missing + missing_top:
        print('   MISSING:', unit[:80])
for word in ['受託', '不明', '職務経歴書', 'チーム1名、開発1名、全体1名', 'チーム3名、開発1名、全体3名', 'AD、Active Directory']:
    where = [path for path in ['/'] + ['/cases/' + case['slug'] for case in slugs.values()] if word in page_text(path) and not (word == '受託' and path == '/')]
    failures += len(where)
    print(f'old or unwanted wording "{word}":', where or 'none')
print('RESULT:', 'all text equals the manuscript' if not failures else f'{failures} problems')
sys.exit(1 if failures else 0)
