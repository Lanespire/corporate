"""Browser regression checks. Contact POSTs are intercepted; no messages are sent."""
import argparse
import atexit
import json
import os
from pathlib import Path
from urllib.parse import parse_qs
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--url', default='http://127.0.0.1:8765')
parser.add_argument('--allow-missing-images', action='store_true')
args = parser.parse_args()
base = args.url.rstrip('/')
out = Path(os.environ.get('QA_OUTPUT', 'qa-results'))
out.mkdir(exist_ok=True, parents=True)
results = []

@atexit.register
def write_report():
    (out/'report.json').write_text(json.dumps({'checks':results,'image_decode_checked':not args.allow_missing_images,'contact_requests':'intercepted locally; no real messages sent'},ensure_ascii=False,indent=2))

def check(name, value):
    results.append({'name': name, 'passed': bool(value)})
    assert value, name

with sync_playwright() as p:
    executable = os.environ.get('CHROMIUM_PATH')
    browser = p.chromium.launch(headless=True, **({'executable_path': executable} if executable else {}))
    context = browser.new_context(viewport={'width':1440,'height':1000}, locale='ja-JP', reduced_motion='reduce')
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.goto(base, wait_until='networkidle')
    page.evaluate('document.fonts.ready')
    check('approved hero copy', '企業の変革を支える。' in page.locator('h1').inner_text().replace('\n',''))
    check('seven portfolio cards', page.locator('.work-card').count()==7)
    check('client engagements first', page.locator('.work-card h3').all_text_contents()[:2]==['日程調整システム','営業CRM'])
    check('two client cases and five owned labels', page.locator('.work-card .commissioned').count()==2 and page.locator('.work-card .owned').count()==5)
    check('scheduling card is 業務委託', page.locator('.work-card').first.locator('.work-kind').inner_text()=='業務委託')
    check('CRM card remains 受託開発', page.locator('.work-card').nth(1).locator('.work-kind').inner_text()=='受託開発')
    check('old duplicated showcase removed', page.locator('.product-showcase,.product-grid,.filters').count()==0)
    check('five public links retained', page.locator('.work-visit').count()==5)
    check('legacy anchor retained', page.locator('#products').count()==1)
    page.screenshot(path=str(out/'desktop-hero.png'))
    for width in [320,390,768,1280,1440,1920]:
        page.set_viewport_size({'width':width,'height':1000})
        page.wait_for_timeout(250)
        check(f'no page overflow {width}', page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'))
        check(f'horizontal carousel {width}', page.locator('#works-track').evaluate('(e)=>e.scrollWidth > e.clientWidth'))
    page.set_viewport_size({'width':1440,'height':1000})
    page.locator('#works').scroll_into_view_if_needed()
    track=page.locator('#works-track')
    page.locator('[data-carousel-next]').click()
    page.wait_for_timeout(100)
    check('next arrow scrolls', track.evaluate('(e)=>e.scrollLeft')>200)
    page.locator('[data-carousel-prev]').click()
    page.wait_for_timeout(100)
    check('previous arrow returns', track.evaluate('(e)=>e.scrollLeft')<5)
    track.focus();page.keyboard.press('End');page.wait_for_timeout(120)
    check('End reaches final cards', page.locator('[data-carousel-next]').is_disabled())
    check('counter shows final item', '7' in page.locator('#works-position').inner_text().split('/')[0])
    page.keyboard.press('Home');page.wait_for_timeout(120)
    check('Home restores start', page.locator('[data-carousel-prev]').is_disabled())
    for index in range(7):
        page.locator('.work-card').nth(index).locator('img').evaluate('(e)=>e.loading="eager"')
    if not args.allow_missing_images:
        page.wait_for_function('[...document.querySelectorAll(".work-card img")].every(i=>i.complete && i.naturalWidth>0)')
        check('all actual portfolio images decode', True)
        check('images same-origin', page.locator('.work-card img').evaluate_all('(imgs)=>imgs.every(i=>new URL(i.currentSrc).origin===location.origin)'))
    page.locator('.work-card').first.locator('.work-detail').click()
    check('scheduling detail dialog opens', page.locator('#project-dialog').evaluate('(e)=>e.open'))
    check('scheduling detail label is 業務委託', page.locator('#project-dialog .work-kind').inner_text()=='業務委託')
    check('scheduling detail note is 業務委託', page.locator('#project-dialog .dialog-note').inner_text().startswith('業務委託の実績です。'))
    check('contract project has no invented URL', page.locator('#project-dialog a[target="_blank"]').count()==0)
    check('contract details sourced', 'ダブルブッキング' in page.locator('#project-dialog').inner_text())
    page.keyboard.press('Escape')
    check('dialog restores focus', page.locator('.work-card').first.locator('.work-detail').evaluate('(e)=>document.activeElement===e'))
    page.locator('.work-card').nth(1).locator('.work-detail').click()
    check('CRM detail label remains 受託開発', page.locator('#project-dialog .work-kind').inner_text()=='受託開発')
    check('CRM detail note remains 受託開発', page.locator('#project-dialog .dialog-note').inner_text().startswith('受託開発の実績です。'))
    page.keyboard.press('Escape')
    page.locator('.work-card').nth(2).locator('.work-detail').click()
    check('own service links to public URL', page.locator('#project-dialog a[target="_blank"]').get_attribute('href')=='https://night-table.com/')
    page.keyboard.press('Escape')
    track.evaluate('(e)=>e.scrollTo({left:0,behavior:"instant"})')
    page.wait_for_timeout(100)
    page.locator('#works').screenshot(path=str(out/'desktop-works.png'))
    posts=[]
    def post_route(route):
        if route.request.method=='POST':
            posts.append(parse_qs(route.request.post_data or '',keep_blank_values=True))
            route.fulfill(status=500 if len(posts)==1 else 200, content_type='text/html', body='test response')
        else:
            route.continue_()
    page.route(base+'/',post_route)
    form=page.locator('#contact-form')
    form.locator('[name="name"]').fill('動作確認担当')
    form.locator('[name="email"]').fill('qa@example.com')
    form.locator('[name="company"]').fill('テスト用（外部送信しません）')
    form.locator('[name="subject"]').select_option('Web・SaaS開発')
    form.locator('[name="message"]').fill('<script>window.unwanted = true</script>\nテスト用のお問い合わせ')
    form.locator('[type="submit"]').click()
    check('confirmation sends nothing', not posts)
    check('form text safely rendered', page.evaluate('window.unwanted !== true'))
    page.locator('#send-contact').click()
    page.wait_for_function('document.querySelector("#send-status").dataset.state === "error"')
    check('failed request keeps entered message', 'テスト用のお問い合わせ' in form.locator('[name="message"]').input_value())
    check('failed request never claims success', not page.locator('#form-status').inner_text())
    page.locator('#send-contact').evaluate('(e)=>{e.click();e.click();}')
    page.wait_for_function('!document.querySelector("#contact-dialog").open')
    check('duplicate sends guarded', len(posts)==2)
    check('Netlify form identifier preserved', posts[-1].get('form-name')==['contact'])
    check('successful submission clears form', form.locator('[name="message"]').input_value()=='')
    check('success feedback shown', '受け付けました' in page.locator('#form-status').inner_text())
    check('OS reduced motion respected', page.locator('body').evaluate('(e)=>e.classList.contains("reduced-motion")'))
    page.set_viewport_size({'width':390,'height':844})
    page.evaluate('scrollTo({top:0,behavior:"instant"})');page.wait_for_timeout(100)
    page.screenshot(path=str(out/'mobile-hero.png'))
    page.locator('.menu-toggle').click()
    check('mobile menu opens', page.locator('.menu-toggle').get_attribute('aria-expanded')=='true')
    page.keyboard.press('Escape')
    check('mobile menu Escape closes', page.locator('#mobile-menu').is_hidden())
    page.locator('#works').scroll_into_view_if_needed();page.wait_for_timeout(100)
    page.locator('#works').screenshot(path=str(out/'mobile-works.png'))
    check('zero uncaught JavaScript errors', not errors)
    nojs=browser.new_context(java_script_enabled=False,viewport={'width':390,'height':844})
    plain=nojs.new_page();plain.goto(base)
    check('no-JS has seven readable works', plain.locator('.work-card').count()==7)
    check('no-JS has company information', plain.locator('#company').count()==1)
    check('no-JS scheduling label is 業務委託', plain.locator('.work-card').first.locator('.work-kind').inner_text()=='業務委託')
    check('no-JS CRM label remains 受託開発', plain.locator('.work-card').nth(1).locator('.work-kind').inner_text()=='受託開発')
    nojs.close();context.close();browser.close()
print(f'PASS: {len(results)} checks. Image verification: {not args.allow_missing_images}. No actual contact submissions.')
