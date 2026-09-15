"""Sales-page interaction checks; no native app, payment, or production POSTs.
Run after qa-templates.py against the actual static build served over HTTP.
"""
import argparse
import atexit
import json
import os
from pathlib import Path
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--base-url', default='http://127.0.0.1:8766')
args = parser.parse_args()
base = args.base_url.rstrip('/')
origin = urlsplit(base).netloc
out = Path('qa-results/templates')
out.mkdir(parents=True, exist_ok=True)
results = []

@atexit.register
def report():
    (out / 'experience-results.json').write_text(json.dumps({
        'checks': results, 'environment': 'actual build over HTTP',
        'scope': 'sales pages only; not product acceptance tests',
        'outbound_posts': 'blocked',
    }, ensure_ascii=False, indent=2), encoding='utf-8')

def check(name, passed):
    results.append({'name': name, 'passed': bool(passed)})
    assert passed, name

def guard(route):
    request = route.request
    if request.method not in ('GET', 'HEAD') or urlsplit(request.url).netloc != origin:
        route.abort()
    else:
        route.continue_()

with sync_playwright() as p:
    executable = os.environ.get('CHROMIUM_PATH')
    browser = p.chromium.launch(headless=True, **({'executable_path': executable} if executable else {}))
    context = browser.new_context(reduced_motion='reduce', locale='ja-JP')
    context.route('**/*', guard)
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    for width in (320, 390, 768, 1024, 1440, 1920):
        page.set_viewport_size({'width': width, 'height': 960})
        page.goto(base + '/templates/', wait_until='networkidle')
        check(f'{width} catalog script enabled', page.locator('script[src*="experience.js"]').count() == 1)
        page.locator('[data-module-select="api"]').click()
        check(f'{width} API module select', page.locator('.package-stage').get_attribute('data-module') == 'api')
        page.locator('[data-module-select="admin"]').focus()
        page.keyboard.press('Home')
        check(f'{width} module Home', page.locator('.package-stage').get_attribute('data-module') == 'all')
        page.keyboard.press('End')
        check(f'{width} module End', page.locator('.package-stage').get_attribute('data-module') == 'admin')
        check(f'{width} catalog no overflow', page.evaluate('document.documentElement.scrollWidth <= innerWidth'))
        page.goto(base + '/templates/matching/', wait_until='networkidle')
        page.locator('[data-feature-filter="operations"]').click()
        check(f'{width} operations filter', page.locator('.feature-group:visible').count() == 3 and '3つ' in page.locator('#feature-count').inner_text())
        page.locator('[data-feature-filter="brand"]').focus()
        page.keyboard.press('Enter')
        check(f'{width} keyboard brand filter', page.locator('.feature-group:visible').count() == 2 and page.locator('[data-feature-filter="brand"]').get_attribute('aria-pressed') == 'true')
        page.locator('[data-feature-filter="all"]').click()
        check(f'{width} all features restored', page.locator('.feature-group:visible').count() == 8)
        page.locator('label[for="preset-marriage"]').click()
        page.locator('#brand-name').fill('Lanespire Demo')
        check(f'{width} brand live preview', page.locator('#code-brand-name').inner_text() == 'Lanespire Demo')
        check(f'{width} marriage is list', page.locator('#code-layout').inner_text() == 'list')
        page.locator('#brand-name').fill('<script>test</script>')
        check(f'{width} brand text escaped', page.locator('#demo-brand script').count() == 0)
        page.locator('#brand-name').fill('あいうえおかきくけこさしすせそたちつてとなにぬね')
        check(f'{width} long brand no overflow', page.evaluate('document.documentElement.scrollWidth <= innerWidth'))
        page.locator('#brand-name').fill('Lanespire Demo')
        page.locator('label[for="view-admin"]').click()
        check(f'{width} admin preview name', 'Lanespire Demo' in page.locator('#admin-brand').inner_text())
        check(f'{width} source initial total', page.locator('#template-total').inner_text() == '¥498,000')
        page.locator('input[name="calc-plan"][value="brand"]').check()
        check(f'{width} brand total', page.locator('#template-total').inner_text() == '¥548,000')
        page.locator('#scratch-input').fill('40')
        check(f'{width} negative result honest', page.locator('#savings-total').inner_text().startswith('−14.8') and '高く' in page.locator('#difference-label').inner_text())
        page.locator('#scratch-input').fill('0')
        check(f'{width} zero denominator', '算出しません' in page.locator('#saving-ratio').inner_text())
        page.locator('#scratch-input').fill('')
        check(f'{width} empty never zero', page.locator('#template-total').inner_text() == '—' and page.locator('#copy-estimate').is_disabled())
        page.locator('#scratch-input').fill('-1')
        check(f'{width} negative input rejected', page.locator('#calc-error').inner_text() != '')
        page.locator('.calc-reset').click()
        page.wait_for_timeout(30)
        check(f'{width} defaults restored', page.locator('#template-total').inner_text() == '¥498,000')
        page.locator('#custom-input').fill('0.1')
        check(f'{width} yen precision', page.locator('#template-total').inner_text() == '¥199,000')
        page.locator('#scratch-input').fill('10000')
        page.locator('#custom-input').fill('10000')
        page.locator('#setup-input').fill('10000')
        check(f'{width} max no overflow', page.evaluate('document.documentElement.scrollWidth <= innerWidth'))
        page.locator('.calc-reset').click()
        page.wait_for_timeout(30)
        if width in (390, 1440):
            page.locator('label[for="view-discovery"]').click()
            page.locator('#brand-name').fill('')
            page.evaluate('window.scrollTo(0,0)')
            page.screenshot(path=str(out / f'experience-matching-{width}.png'), full_page=True)
    page.evaluate("Object.defineProperty(navigator, 'clipboard', {configurable:true, value:undefined})")
    page.locator('#copy-estimate').click()
    copied = page.locator('.calc-copy-field').input_value()
    check('copy fallback includes assumptions', '仮定' in copied and '¥498,000' in copied and '保証ではありません' in copied)
    check('no uncaught script errors', not errors)
    context.close()
    nojs = browser.new_context(java_script_enabled=False, viewport={'width': 390, 'height': 844})
    nojs.route('**/*', guard)
    plain = nojs.new_page()
    plain.goto(base + '/templates/matching/')
    check('noJS calculator noninteractive', plain.locator('#cost-form').evaluate('(e)=>e.inert'))
    check('noJS static example readable', plain.locator('#template-total').inner_text() == '¥498,000')
    check('noJS original demo retained', plain.locator('#preset-marriage').count() == 1)
    nojs.close()
    motion = browser.new_context(viewport={'width': 1440, 'height': 960})
    motion.route('**/*', guard)
    moving = motion.new_page()
    moving.goto(base + '/templates/', wait_until='domcontentloaded')
    moving.locator('#motion-pause').check()
    moving.wait_for_timeout(50)
    check('manual pause stops animations', moving.evaluate('document.getAnimations().filter(a=>a.playState === "running").length') == 0)
    moving.locator('[data-module-select="api"]').click()
    check('pause preserves selection', moving.locator('.package-stage').get_attribute('data-module') == 'api')
    motion.close()
    browser.close()
print(f'PASS: {len(results)} additional sales-page checks. No real messages or payments.')
