# Portfolio image review

The existing anonymous illustration filenames do not match their visible contents. The visual inspection of the first production build showed:

- `work-anon-crm.png` contains a calendar, meeting and scheduling illustration. It is intentionally assigned to **日程調整システム**.
- `work-anon-scheduling.png` contains a pipeline, sales charts and customer dashboard illustration. It is intentionally assigned to **営業CRM**.

The source binaries are reused without changing them; only their mapping in `projects.json` is corrected. Both cards state **機能イメージ**. These are not being represented as actual client-system screenshots.
