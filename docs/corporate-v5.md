# Corporate site v5 (renewal, D-134)

The root page is a prerendered Svelte page again. It replaces the single-document pipeline described in `corporate-v4.md`.

## Layout of the code

- `src/routes/(corp)/`: the corporate site (`/` and `/cases/<slug>`). Its layout loads only `src/lib/corp/styles.css`.
- `src/routes/(lp)/`: the two LPs with their previous shared layout. URLs are unchanged (`/mvp`, `/launch-lp`).
- `src/lib/corp/content.ts`: every sentence on the page. Text comes from the previous site or the reviewed manuscripts; do not add facts.
- `src/lib/corp/cases.json`: generated from the case manuscript by `python3 scripts/import-cases.py <cases.md>`. Text is copied verbatim.
- `src/lib/corp/motion.ts`: the scroll helpers (`reveal`, `parallax`, `onFrame`). No animation library is loaded on the page.
- `static/corporate/hero/`, `static/corporate/sections/`: the generated glass artwork and the 8 second hero loop.
- `static/fonts/`: Inter (latin) and a Noto Sans JP 800 subset that only contains heading glyphs. After changing a heading, add it to `src/lib/corp/display-chars.txt` and run `python3 scripts/fetch-corp-fonts.py`. Both fonts are SIL OFL 1.1.

## Motion rules

- The first screen paints the still picture, the copy and the buttons before any script runs. The hero intro is CSS only.
- The hero loop is requested after `load`, never with `prefers-reduced-motion` or Save-Data, and has a pause button.
- Every hidden-before-reveal state is scoped to `html.js`; without JavaScript all content is visible. `app.html` reveals everything after 5 seconds if hydration never happens.
- Case cards stack with `position: sticky` only on wide, tall viewports and only when each card fits.

## Kept from v4

GA4 (`/analytics.js`, `generate_lead`), the Netlify form `contact` with its confirm step, Organization/WebSite/FAQPage JSON-LD, canonical, the legacy anchors (`#works`, `#products`, `#approach`), `llms.txt`, the sitemap and the Search Console file.

## Checks

`corporate.yml` builds the site and runs `scripts/qa-corporate.py` against `scripts/serve-build.py` (pretty URLs like Netlify). Contact POSTs are intercepted. The workflow also uploads `qa-results/prettier.patch` and `qa-results/eslint.txt` for people who cannot run the tools locally.
