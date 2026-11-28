"""Browser regression checks for the corporate site. Contact POSTs are intercepted; no messages are sent."""
import argparse
import atexit
import json
import os
import re
from pathlib import Path
from urllib.parse import parse_qs
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--url', default='http://127.0.0.1:8765')
args = parser.parse_args()
base = args.url.rstrip('/')
root = Path(__file__).resolve().parent.parent
out = Path(os.environ.get('QA_OUTPUT', 'qa-results'))
out.mkdir(exist_ok=True, parents=True)
cases = json.loads((root / 'src/lib/corp/cases.json').read_text(encoding='utf-8'))
charset = set(json.loads((root / 'src/lib/corp/display-charset.json').read_text(encoding='utf-8')))
featured = [c for c in cases if c['featured']]
results = []


@atexit.register
def write_report():
    (out / 'report.json').write_text(json.dumps({'checks': results, 'contact_requests': 'intercepted locally; no real messages sent'}, ensure_ascii=False, indent=2))


def check(name, value):
    results.append({'name': name, 'passed': bool(value)})
    assert value, name


with sync_playwright() as p:
    executable = os.environ.get('CHROMIUM_PATH')
    browser = p.chromium.launch(headless=True, **({'executable_path': executable} if executable else {}))

    context = browser.new_context(viewport={'width': 1440, 'height': 900}, locale='ja-JP')
    page = context.new_page()
    errors = []
    media = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.on('request', lambda r: media.append(r.url) if '/corporate/hero/loop' in r.url else None)
    page.goto(base + '/', wait_until='networkidle')
    page.evaluate('document.fonts.ready')
    check('approved hero copy', page.locator('h1').inner_text().replace('\n', '') == 'AIとシステム開発で、企業の変革を支える。')
    check('hero buttons', [t.strip() for t in page.locator('.hero .actions a').all_inner_texts()] == ['開発事例を見る', '開発を相談する'])
    check('hero scope list has four items', page.locator('.hero .scope-list').first.locator('li').count() == 4)
    page.wait_for_function('document.querySelector(".hero video").readyState >= 2', timeout=20000)
    check('hero video requested after load', bool(media))
    check('hero video is muted and loops', page.locator('.hero video').evaluate('(v) => v.muted && v.loop && !v.paused'))
    page.locator('.hero .motion').click()
    check('pause button stops the loop', page.locator('.hero video').evaluate('(v) => v.paused'))
    check('pause button reports state', page.locator('.hero .motion').get_attribute('aria-pressed') == 'false')
    page.screenshot(path=str(out / 'desktop-hero.png'))

    check('featured case cards', page.locator('.stack .case').count() == len(featured))
    check('case titles follow the manuscript', [t.strip() for t in page.locator('.stack .case h3').all_text_contents()] == [c['title'] for c in featured])
    check('case links', [a.get_attribute('href') for a in page.locator('.stack .case h3 a').all()] == ['/cases/' + c['slug'] for c in featured])
    check('other cases listed', page.locator('.others .row').count() == len(cases) - len(featured))
    labels = [t.strip() for t in page.locator('#cases .tag:not(.plain)').all_text_contents()]
    check('engagement labels only where confirmed', sorted(labels) == sorted(c['label'] for c in cases if c['label']))
    check('six own services', page.locator('.products .track').first.locator('a').count() == 6)
    check('own services link out', page.locator('.products .track').first.locator('a').first.get_attribute('href') == 'https://night-table.com/')
    check('legacy anchors retained', all(page.locator(s).count() == 1 for s in ['#works', '#products', '#approach', '#services', '#company', '#faq', '#contact']))
    # Sections below the first screen are skipped by content-visibility until scrolled to, so read textContent.
    body_text = page.locator('main').text_content()
    check('no placeholder words', '不明' not in body_text)
    check('partner note stays off the top page', '広告代理店' not in body_text)
    check('受託 appears only in the company table', body_text.count('受託') == page.locator('#company').text_content().count('受託') == 1)
    displays = ''.join(page.locator('.display').all_text_contents())
    missing = sorted({c for c in displays if ord(c) > 0x2000 and not c.isspace() and c not in charset})
    check('heading font covers every heading glyph: ' + ''.join(missing), not missing)

    ld = json.loads(page.locator('script[type="application/ld+json"]').first.inner_text())
    types = [g['@type'] for g in ld['@graph']]
    check('structured data types', types == ['Organization', 'WebSite', 'FAQPage'])
    faq_ld = [(q['name'], q['acceptedAnswer']['text']) for q in ld['@graph'][2]['mainEntity']]
    faq_dom = list(zip([t.strip() for t in page.locator('#faq summary .question').all_text_contents()], [t.strip() for t in page.locator('#faq details p').all_text_contents()]))
    check('FAQ markup equals visible FAQ', faq_ld == faq_dom)
    check('canonical kept', page.locator('link[rel=canonical]').get_attribute('href') == 'https://lanespire.com/')
    check('analytics loader kept', page.locator('script[src="/analytics.js"]').count() == 1)

    for width in [320, 390, 768, 1024, 1280, 1440, 1920]:
        page.set_viewport_size({'width': width, 'height': 900})
        page.wait_for_timeout(250)
        check(f'no page overflow {width}', page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'))
    page.set_viewport_size({'width': 1440, 'height': 900})
    page.locator('#cases').scroll_into_view_if_needed()
    page.wait_for_timeout(900)
    page.screenshot(path=str(out / 'desktop-cases.png'))
    check('case cards stack on desktop', page.locator('.stack').evaluate('(e) => e.classList.contains("stacked")'))
    check('case artwork loads', page.locator('.stack .case img').first.evaluate('(i) => i.complete && i.naturalWidth > 0'))
    page.locator('#process .lane').scroll_into_view_if_needed()
    page.wait_for_function('document.querySelector("#process .film").readyState >= 2', timeout=20000)
    check('process loop plays when in view', page.locator('#process .film').evaluate('(v) => v.muted && v.loop && !v.paused'))
    page.wait_for_function('document.querySelectorAll("#process ol li.on").length >= 2', timeout=15000)
    check('process labels follow the loop', page.locator('#process ol li.on').count() >= 2)
    page.locator('#process .phases').screenshot(path=str(out / 'desktop-process.png'))
    page.locator('#contact').scroll_into_view_if_needed()
    page.wait_for_timeout(1200)
    page.screenshot(path=str(out / 'desktop-contact.png'))

    posts = []

    def post_route(route):
        if route.request.method == 'POST':
            posts.append(parse_qs(route.request.post_data or '', keep_blank_values=True))
            route.fulfill(status=500 if len(posts) == 1 else 200, content_type='text/html', body='test response')
        else:
            route.continue_()

    page.route(base + '/', post_route)
    page.locator('#services .link').first.click()
    form = page.locator('#contact-form')
    check('service link preselects the subject', form.locator('[name="subject"]').input_value() == 'AI導入・活用支援')
    form.locator('[name="name"]').fill('動作確認担当')
    form.locator('[name="email"]').fill('qa@example.com')
    form.locator('[name="company"]').fill('テスト用（外部送信しません）')
    form.locator('[name="subject"]').select_option('Web・SaaS開発')
    form.locator('[name="message"]').fill('<script>window.unwanted = true</script>\nテスト用のお問い合わせ')
    form.locator('[type="submit"]').click()
    check('confirmation opens', page.locator('#contact-dialog').evaluate('(e) => e.open'))
    check('confirmation sends nothing', not posts)
    check('form text safely rendered', page.evaluate('window.unwanted !== true'))
    page.locator('#send-contact').click()
    page.wait_for_function('document.querySelector("#send-status").dataset.state === "error"')
    check('failed request keeps entered message', 'テスト用のお問い合わせ' in form.locator('[name="message"]').input_value())
    check('failed request never claims success', not page.locator('#form-status').inner_text())
    page.locator('#send-contact').evaluate('(e) => { e.click(); e.click(); }')
    page.wait_for_function('!document.querySelector("#contact-dialog").open')
    check('duplicate sends guarded', len(posts) == 2)
    check('Netlify form identifier preserved', posts[-1].get('form-name') == ['contact'])
    check('all form fields posted', all(k in posts[-1] for k in ['bot-field', 'company', 'name', 'email', 'subject', 'message']))
    check('successful submission clears form', form.locator('[name="message"]').input_value() == '')
    check('success feedback shown', '受け付けました' in page.locator('#form-status').inner_text())
    page.locator('.footer button').click()
    check('privacy dialog opens', page.locator('#privacy-dialog').evaluate('(e) => e.open'))
    check('privacy text mentions analytics', 'Google アナリティクス' in page.locator('#privacy-dialog').inner_text())
    page.keyboard.press('Escape')

    first = cases[0]
    page.goto(base + '/cases/' + first['slug'], wait_until='networkidle')
    check('case page title', page.locator('h1').inner_text().replace('\n', '') == first['title'])
    check('case page sections', page.locator('.story section h2').count() == len(first['sections']))
    check('case page canonical', page.locator('link[rel=canonical]').get_attribute('href') == 'https://lanespire.com/cases/' + first['slug'])
    check('case page has no placeholder words', not re.search('受託|不明', page.locator('main').inner_text()))
    partner = page.locator('.partner')
    check('case page: partner note title', partner.locator('h2').inner_text().strip() == '制作会社・広告代理店・開発会社の方へ')
    check('case page: partner note answers are verbatim', [t.strip() for t in partner.locator('dd').all_text_contents()] == ['窓口は貴社のままです。貴社のお客様へ直接連絡しません。', '案件ごとの見積りです。成果物単位で、時間売りや人月ではありません。', '1営業日以内に返信します。'])
    partner.scroll_into_view_if_needed()
    page.wait_for_timeout(900)
    page.screenshot(path=str(out / 'desktop-case-consult.png'))
    case_displays = ''.join(page.locator('.display').all_inner_texts())
    case_missing = sorted({c for c in case_displays if ord(c) > 0x2000 and not c.isspace() and c not in charset})
    check('case page heading glyphs covered: ' + ''.join(case_missing), not case_missing)
    page.screenshot(path=str(out / 'desktop-case.png'))
    check('zero uncaught JavaScript errors', not errors)
    context.close()

    mobile = browser.new_context(viewport={'width': 390, 'height': 844}, locale='ja-JP', device_scale_factor=2)
    page = mobile.new_page()
    mobile_errors = []
    page.on('pageerror', lambda e: mobile_errors.append(str(e)))
    page.goto(base + '/', wait_until='networkidle')
    check('mobile: no page overflow', page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'))
    check('mobile: body text is 16px', page.evaluate('parseFloat(getComputedStyle(document.body).fontSize) >= 16'))
    copy_bottom = page.locator('.hero .copy').evaluate('(e) => e.getBoundingClientRect().bottom')
    media_top = page.locator('.hero .media').evaluate('(e) => e.getBoundingClientRect().top')
    check('mobile: hero copy sits above the picture', copy_bottom <= media_top + 1)
    page.screenshot(path=str(out / 'mobile-hero.png'))
    page.locator('.header .toggle').click()
    check('mobile menu opens', page.locator('.header .toggle').get_attribute('aria-expanded') == 'true')
    page.keyboard.press('Escape')
    check('mobile menu Escape closes', page.locator('.header .toggle').get_attribute('aria-expanded') == 'false')
    page.locator('#cases').scroll_into_view_if_needed()
    page.wait_for_timeout(900)
    page.screenshot(path=str(out / 'mobile-cases.png'))
    check('mobile: zero uncaught JavaScript errors', not mobile_errors)
    mobile.close()

    calm = browser.new_context(viewport={'width': 1440, 'height': 900}, locale='ja-JP', reduced_motion='reduce')
    page = calm.new_page()
    calm_media = []
    page.on('request', lambda r: calm_media.append(r.url) if '/corporate/hero/loop' in r.url else None)
    page.goto(base + '/', wait_until='networkidle')
    page.wait_for_timeout(1500)
    check('reduced motion: no video request', not calm_media)
    check('reduced motion: no pause button', page.locator('.hero .motion').count() == 0)
    check('reduced motion: headings visible', page.locator('#cases-title .ln-i').first.evaluate('(e) => getComputedStyle(e).transform === "none"'))
    check('reduced motion: cards do not stack', not page.locator('.stack').evaluate('(e) => e.classList.contains("stacked")'))
    page.locator('#process .lane').scroll_into_view_if_needed()
    page.wait_for_timeout(600)
    check('reduced motion: all process steps shown lit', page.locator('#process ol li.on').count() == 5)
    check('reduced motion: no process loop request', not page.locator('#process .film').get_attribute('src'))
    calm.close()

    nojs = browser.new_context(java_script_enabled=False, viewport={'width': 390, 'height': 844})
    plain = nojs.new_page()
    plain.goto(base + '/')
    check('no-JS has the case cards', plain.locator('.stack .case').count() == len(featured))
    check('no-JS has company information', plain.locator('#company').count() == 1)
    check('no-JS has the Netlify form', plain.locator('form[name="contact"][data-netlify="true"]').count() == 1)
    check('no-JS content is not hidden', plain.locator('#cases-title .ln-i').first.evaluate('(e) => getComputedStyle(e).transform === "none"'))
    nojs.close()
    browser.close()
print(f'PASS: {len(results)} checks. No actual contact submissions.')
