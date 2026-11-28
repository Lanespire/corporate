"""Fetch the self-hosted corporate fonts: a heading-only Noto Sans JP subset and Inter (latin)."""
import re
import urllib.parse
import urllib.request
from pathlib import Path

root = Path(__file__).resolve().parent.parent
out = root / 'static' / 'fonts'
out.mkdir(parents=True, exist_ok=True)
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36'
kana = ''.join(chr(c) for c in range(0x3041, 0x3097)) + ''.join(chr(c) for c in range(0x30A1, 0x30FD))
marks = '、。・「」（）ー〜／：？！…'
source = (root / 'src/lib/corp/display-chars.txt').read_text(encoding='utf-8')
chars = ''.join(sorted({c for c in source + kana + marks if ord(c) > 0x2000 and not c.isspace()}))


def css(url):
    request = urllib.request.Request(url, headers={'User-Agent': UA})
    return urllib.request.urlopen(request, timeout=30).read().decode('utf-8')


def save(url, name):
    request = urllib.request.Request(url, headers={'User-Agent': UA})
    data = urllib.request.urlopen(request, timeout=30).read()
    (out / name).write_bytes(data)
    print(f'{name}: {len(data)} bytes')


jp = css('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@800&text=' + urllib.parse.quote(chars))
save(re.search(r'url\((https://[^)]+)\)', jp).group(1), 'noto-sans-jp-800-display.woff2')
inter = css('https://fonts.googleapis.com/css2?family=Inter:wght@400..800&display=swap')
latin = re.search(r'/\* latin \*/[^}]*?url\((https://[^)]+)\)', inter, re.S).group(1)
save(latin, 'inter-latin-var.woff2')
(root / 'src/lib/corp/display-charset.json').write_text('"' + chars + '"\n', encoding='utf-8')
print(f'{len(chars)} display glyphs')
