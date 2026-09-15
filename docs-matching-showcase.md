# Matching: native preview and landing page

- Landing page: https://lanespire.com/templates/matching/
- Native Expo Go: `exps://u.expo.dev/78be510e-a5ef-4f35-8ad6-761054512d24?channel-name=showcase&runtime-version=0.2.0`
- Browser customization: https://lanespire.com/showcase/
- Admin gallery: landing page `#admin-showcase`.

The QR opens the native Expo Go app. The preview uses Expo SDK 54 for the App Store version of Expo Go. The OEM app keeps SDK 57; both consume the shared UI packages. Preview profiles and conversations remain in memory, without API, D1, payments or outgoing messages.

## Native release and capture

Publish `matching/apps/showcase` through EAS Update on branch `showcase`, channel `showcase`, project `@lanespire/matching-template`. Use the installed EAS CLI with `NODE_PATH` pointing to the workspace `node_modules/.pnpm/node_modules` when its direct Expo subprocess cannot resolve the monorepo dependencies. Publish both platforms with environment `development`. The app version defines the update runtime version.

Open the public native URL in Expo Go, then run the Maestro flows in `apps/showcase/maestro` on an iOS simulator. `native-smoke.yaml` checks swipe, undo, like, match, message input/send and reopening the conversation. `capture-scenes.yaml` captures additional screens using actual app controls. Keep capture files from a passing public-runtime run; do not substitute browser images. Before import, inspect every image and run `swift tooling/verify-showcase-captures.swift /path/to/captures/*.png` in matching on macOS. Maestro can see the app behind the Expo Go developer menu, so its visibility assertions alone do not prove the overlay is absent. Dismiss both onboarding and the developer menu in the visible Simulator before capturing.

September 15, 2026: SDK 54 public update group `ce541c57-242a-46ca-94ad-658dea9a8bc4` passed both flows on iPhone 17 / iOS 26.3 Simulator. The follow-up conversation text update `22e1d7a7-6923-4250-ac45-3bd51e6d0749` also passed the native smoke flow. Physical iPhone and Android execution remain separate checks. The preview flow does not establish acceptance of OEM payment, calling, push notification or backend persistence features.

## Import and verify

Build the browser customization runtime with `pnpm build:showcase` in the matching repository. Collect nine native app PNGs and four actual admin PNGs; names are listed in the importer. Capture admin after normal login and MFA in an isolated development environment with reference masters. Keep credentials, session state, member data and private conversations out of this repository.

The capture directory must include `native-preview.json` with the public native `url`, `captureRuntime: "Expo Go on iOS Simulator"`, SDK/runtime version and EAS update IDs. The importer generates the QR from that URL and synchronizes the landing page links. It uses `qrcode` and `sharp`; image filenames have content hashes. Keep previous hashed images so cached HTML remains valid.

```sh
node scripts/import-matching-showcase.mjs /path/to/matching/apps/showcase/dist /path/to/captures
npm run check
npm run lint
npm run build
python3 -m http.server 8767 --directory build
```

With Python Playwright 1.57 and Chromium installed, run `python scripts/qa-matching-showcase.py`. Set `MATCHING_QA_BASE_URL` to verify a deployment. It checks native QR metadata, actual gallery images, mobile/desktop layout, browser customization, like → match → chat and skip → undo. It never submits the contact form. `static/showcase/release.json` records exported file SHA-256 checksums and native release metadata.
