"""Verify the public Expo runtime and actual screenshot gallery without sending data."""
import hashlib
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

BASE = os.environ.get('MATCHING_QA_BASE_URL', 'http://localhost:8767').rstrip('/')
OUT = Path('qa-results/matching-showcase')
OUT.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    errors = []
    request = p.request.new_context()
    manifest = request.get(BASE + '/showcase/release.json').json()
    for asset in manifest['assets']:
        response = request.get(BASE + '/' + asset['path'])
        assert response.status == 200, asset['path']
        assert hashlib.sha256(response.body()).hexdigest() == asset['sha256'], asset['path']
    request.dispose()
    for width in [1440, 390]:
        context = browser.new_context(viewport={'width': width, 'height': 1000 if width > 400 else 844}, locale='ja-JP')
        page = context.new_page()
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(BASE + '/templates/matching/', wait_until='domcontentloaded', timeout=60000)
        expect(page.locator('.screen-card')).to_have_count(9)
        expect(page.locator('.admin-showcase figure')).to_have_count(4)
        expect(page.locator('.live-qr')).to_have_attribute('href', '/showcase/?capture=1')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'LP horizontal overflow'
        page.screenshot(path=str(OUT / f'lp-{width}.png'))
        page.locator('#admin-showcase').scroll_into_view_if_needed()
        page.wait_for_timeout(500)
        page.screenshot(path=str(OUT / f'admin-{width}.png'))
        for img in page.locator('.admin-showcase img, .screen-card img, .live-qr img').all():
            img.scroll_into_view_if_needed()
            expect(img).to_have_js_property('complete', True)
            assert img.evaluate('img => img.naturalWidth > 0'), 'Unloaded screenshot'
        page.locator('.live-device').scroll_into_view_if_needed()
        app = page.frame_locator('.live-device iframe')
        expect(app.get_by_role('button', name='いいね', exact=True)).to_be_visible()
        app.get_by_role('button', name='いいね', exact=True).click()
        app.get_by_role('button', name='メッセージを送る', exact=True).click()
        app.get_by_role('textbox').fill('カフェの話をしましょう')
        app.get_by_role('button', name='送信', exact=True).click()
        expect(app.get_by_text('カフェの話をしましょう', exact=True)).to_be_visible()
        context.close()
    page = browser.new_page(viewport={'width':390, 'height':844}, locale='ja-JP')
    page.goto(BASE + '/showcase/?capture=1', wait_until='domcontentloaded', timeout=60000)
    page.get_by_role('button', name='スキップ', exact=True).click()
    page.wait_for_timeout(600)
    expect(page.get_by_text('はる', exact=False).first).to_be_visible()
    page.get_by_role('button', name='ひとつ戻す', exact=True).click()
    expect(page.get_by_text('あおい', exact=False).first).to_be_visible()
    page.get_by_role('button', name='スタジオに戻る', exact=True).click()
    page.get_by_role('textbox', name='サービス名を入力', exact=True).fill('Lanespire Demo')
    page.get_by_role('button', name='婚活 / coto', exact=True).click()
    page.get_by_role('button', name='閉じる', exact=True).click()
    expect(page.get_by_text('Lanespire Demo', exact=True)).to_be_visible()
    assert 'preset=marriage' in page.url
    assert not errors, errors
    browser.close()
print(json.dumps({'status': 'passed', 'viewports': [1440, 390], 'app_screens': 9,
                  'admin_screens': 4, 'like_match_chat': 'passed', 'skip_undo': 'passed',
                  'brand_name_and_preset': 'passed', 'page_errors': errors}, ensure_ascii=False))
