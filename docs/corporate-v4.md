# Corporate LP v4 — approved v3 design + development-works carousel

## Scope

The approved corporate LP v3 design is retained. The former featured-product tabs plus repeated grid are replaced by a single scroll-snap carousel titled **開発実績**. 日程調整システム and 営業CRM are first and labeled **受託開発**. NightTable, Marubatsu AI, SakuEdit, Lashmie and Style Frame are labeled **自社サービス**. Anonymous client identities and internal URLs are not published. Contract images are labeled 機能イメージ rather than presented as actual client screenshots.

The two commissioned descriptions and existing images come from the previous root page at commit `19d2e2c021deff11d5c75699d7e3eff7dabbc9ed`. The owner explicitly requested their commissioned-work classification. No customer numbers, outcomes, customer logos or quotations have been invented.

## Implementation

- `src/lib/corporate/page.html`: approved standalone corporate-page template.
- `src/lib/corporate/projects.json`: portfolio copy, ordering, public URLs and existing source-image filenames.
- `src/lib/corporate/{base,content,responsive,works}.css`: approved styles plus isolated carousel additions. Legacy unused catalog selectors remain to avoid unintended changes to shared modal/media styles.
- `static/corporate/client.js`: progressive interactions, accessible dialogs, optional motion and confirmation-based form submission.
- `src/routes/+server.ts`: prerenders the document to the site's root. Endpoint routes are not wrapped in the old neon Svelte layout. `/mvp`, `/launch-lp`, the existing layout, Netlify edge host rewrite and domain redirects remain unchanged.
- `scripts/prepare-corporate.mjs`: combines styles and derives two optimized WebP sizes from the **existing repository PNGs**. Names include a content hash so Netlify's immutable image caching cannot hold outdated images. Generated images and CSS are not checked in.

```sh
npm install
npm run dev
# or
npm run build
```

`predev` and `prebuild` run image/style preparation automatically. There are no added application dependencies. For image changes, replace the corresponding repository asset: the output filename changes automatically. No external image hotlinks, CDN scripts, font downloads or tracking SDKs are used on the new root page.

## Interaction and accessibility

Native horizontal scrolling supports touch and trackpads. Previous/next buttons and keyboard arrows/Home/End navigate the carousel. There is no autoplay. The counter identifies the visible range, boundary buttons are disabled, dialogs close with Escape and restore focus, and both OS reduced-motion preferences and the manual motion control are respected. A readable HTML document and public service links remain without JavaScript.

## Contact form

The existing `contact` Netlify Forms integration is retained; this is **not** the mail-draft-only behavior of the v3 ZIP. Static markup includes `data-netlify`, the honeypot, and `form-name=contact`. Confirmation alone does not send anything. Only the explicit send action issues an URL-encoded POST. Duplicate sends are guarded. HTTP errors preserve input and timeouts report that the result is unknown. Netlify form detection and notification recipients must remain enabled/configured in the hosting account.

## Verification

`Corporate LP build and browser checks` performs a production build, checks all three generated pages, and runs Chromium regression checks including real image decoding, six viewport widths, carousel controls, dialogs, menu, reduced motion and no-JS content. Contact POSTs are intercepted by the test browser; automated QA does **not** send messages to the company. Build output and screenshots are uploaded as a GitHub Actions artifact.

The repository's original `CI` workflow is preserved. Before this change, its lint step already failed in the Netlify edge function, launch LP and MVP footer; check that workflow separately rather than treating the focused corporate checks as an all-repository lint result.

Production still uses the existing Netlify Git integration (`master`, `npm run build`, publish directory `build`). A Git commit alone is not proof of a completed production deployment; verify the live root page and its image URLs after Netlify publishes it.
