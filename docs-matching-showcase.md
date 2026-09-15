# Matching: public showcase

- Landing page: https://lanespire.com/templates/matching/
- Interactive Expo Web: https://lanespire.com/showcase/
- Phone / QR destination: https://lanespire.com/showcase/?capture=1
- Admin screenshots: landing page `#admin-showcase` (4 actual development screens).

The Expo export comes from `matching/apps/showcase`, which shares UI packages with the OEM mobile app. Its fictional profiles and conversations stay in memory, without API, D1, payment or outgoing messages. The public URL is an install-free Expo Web experience. It is not an Expo Go / EAS Update link.

## Update the release

In the matching repository, run `pnpm build:showcase`. Capture the actual 390×844 app screens (2× scale) and 1440×1000 admin screens. The importer requires 9 app PNGs and 4 admin PNGs; names are listed in its source. Capture the admin after normal login and MFA, using only reference masters in an isolated development environment. Never copy credentials, browser state, member records, private conversations or identity documents into this repository.

```sh
node scripts/import-matching-showcase.mjs /path/to/matching/apps/showcase/dist /path/to/captures
npm run check
npm run lint
npm run build
python3 -m http.server 8767 --directory build
```

With Python Playwright 1.57 and Chromium installed, run `python scripts/qa-matching-showcase.py`. To verify a published deployment, set `MATCHING_QA_BASE_URL` to its origin. This checks mobile/desktop layout, images, iframe interactions, like → match → chat, and skip → undo. The contact form is not submitted.

The importer uses `qrcode` to generate the QR and `sharp` to encode screenshots. Screenshot filenames include content hashes for immutable CDN caching. `static/showcase/release.json` records exported file sizes and SHA-256 checksums. Keep previous hashed images when updating a published release so cached HTML remains valid.

The public gallery is evidence of the shown UI, not acceptance of every OEM backend feature. Native device tests and payment, calls, notification delivery remain separate checks in the matching repository.
