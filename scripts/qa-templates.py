"""Check the generated storefront over HTTP. Never submit a contact or payment."""
import argparse
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

class Markup(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.images, self.anchors, self.styles = [], [], [], []
        self.h1 = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag == 'h1': self.h1 += 1
        if tag == 'img': self.images.append(a)
        if tag == 'a': self.anchors.append(a)
        if tag == 'link' and a.get('rel') == 'stylesheet': self.styles.append(a)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--base-url', default='http://127.0.0.1:8766')
    parser.add_argument('--root', default='build')
    args = parser.parse_args()
    base, root = args.base_url.rstrip('/'), Path(args.root)
    out = Path('qa-results/templates'); out.mkdir(parents=True, exist_ok=True)
    report = []
    routes = ['/templates/', '/templates/matching/']
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for route in routes:
            source = root / route.strip('/') / 'index.html'
            markup = Markup(); markup.feed(source.read_text())
            assert markup.h1 == 1
            assert len(markup.ids) == len(set(markup.ids))
            for a in markup.anchors:
                href = a.get('href', '')
                if href.startswith('#'): assert href[1:] in markup.ids, href
            for img in markup.images:
                assert img.get('alt') and img.get('width') and img.get('height')
                assert (root / img['src'].lstrip('/')).is_file(), img['src']
            for css in markup.styles:
                assert (root / urlparse(css['href']).path.lstrip('/')).is_file()
            for width in [320, 390, 768, 1024, 1440, 1920]:
                page = browser.new_page(viewport={'width': width, 'height': 960}, reduced_motion='reduce')
                # No real submissions or external navigation in this test.
                page.route('**/*', lambda r: r.continue_() if r.request.method in ('GET', 'HEAD') and r.request.url.startswith(base + '/') else r.abort())
                errors = []; page.on('pageerror', lambda e: errors.append(str(e)))
                response = page.goto(base + route, wait_until='networkidle')
                assert response and response.status == 200
                assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (route, width)
                page.locator('img').evaluate_all('(nodes) => nodes.forEach(n => n.loading = "eager")')
                page.wait_for_function('[...document.images].every(i => i.complete && i.naturalWidth > 0)')
                if width in (390, 1440):
                    name = 'matching' if 'matching' in route else 'catalog'
                    page.screenshot(path=str(out / f'{name}-{width}.png'), full_page=True)
                if 'matching' in route and width in (390, 1440):
                    page.locator('label[for=preset-marriage]').click()
                    assert page.locator('.marriage-discovery').is_visible()
                    assert not page.locator('.social-discovery').is_visible()
                    page.locator('#color-iris').check()
                    assert page.locator('#demo-brand').evaluate('(e) => getComputedStyle(e).color') == 'rgb(130, 118, 160)'
                    page.locator('label[for=view-chat]').click()
                    assert page.locator('#chat-panel').is_visible()
                    page.locator('label[for=view-admin]').click()
                    assert page.locator('#admin-panel').is_visible()
                    assert not page.locator('#demo-device').is_visible()
                    page.locator('label[for=view-discovery]').click()
                    page.locator('label[for=preset-social]').click()
                    page.locator('label[for=next-profile]').click()
                    assert page.locator('.profile-second').is_visible()
                    page.locator('#like-profile').click()
                    assert page.locator('#match-notice').is_visible()
                    page.keyboard.press('Escape')
                    assert not page.locator('#match-notice').is_visible()
                    page.locator('[data-open-license]').first.click()
                    assert page.locator('#license-dialog').is_visible()
                    page.keyboard.press('Escape')
                    assert not page.locator('#license-dialog').is_visible()
                assert not errors, errors
                report.append({'route': route, 'width': width, 'result': 'pass'})
                page.close()
        page = browser.new_page(viewport={'width': 1440, 'height': 960})
        page.goto(base + '/templates/')
        page.get_by_role('link', name='商品を見る', exact=True).click()
        page.wait_for_url(base + '/templates/matching/')
        assert page.locator('body').get_attribute('data-page') == 'matching'
        page.locator('.breadcrumb').get_by_role('link', name='Templates', exact=True).click()
        page.wait_for_url(base + '/templates/')
        assert page.locator('body').get_attribute('data-page') == 'catalog'
        page.locator('#motion-pause').check()
        assert page.locator('.series-art').evaluate('(e)=>getComputedStyle(e).animationName') == 'none'
        # Confirm directory resolution, rather than assuming slashless routes work.
        for route in ['/templates', '/templates/matching']:
            response = page.goto(base + route)
            assert response and response.status == 200
            assert page.locator('h1').count() == 1
        browser.close()
    (out / 'results.json').write_text(json.dumps(report, indent=2))
    print('PASS: routes, two-way navigation, 12 layouts, images, native interactions, motion, anchors.')

if __name__ == '__main__':
    main()
