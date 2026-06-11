# TODO

Living checklist of issues, gaps, and improvements for `@rtorcato/js-common`. Items are ordered by severity — start at the top.

## Documentation

Goal: an excellent docs site at https://rtorcato.github.io/js-common/. Items roughly ordered by reader impact.

- [x] **Module index published** — every subpath has a stub page listing its exports + one-line JSDoc summary (Docusaurus + `scripts/generate-module-docs.mjs`).
- [x] **Full API reference.** `docusaurus-plugin-typedoc` generates a page per export under `/api/` with signatures, params, return types, generics, source links, and `@example` blocks. Regenerated on each build.
- [ ] **Runnable examples on every function.** At minimum: input → output snippet for the top 3 functions per module. Ideally a live playground (CodeSandbox/StackBlitz embed or `@docusaurus/theme-live-codeblock`).
- [x] **Full-text search.** `@easyops-cn/docusaurus-search-local` indexes every page (including API ref) at build time. No external service.
- [ ] **Module overview prose, not just tables.** Each module page opens with 2–3 sentences explaining *when* to reach for it and the design choices (e.g. why `arrays.unique` uses `Set` semantics, not deep equality).
- [ ] **"See also" cross-links between related modules** (e.g. `date` ↔ `datetime` ↔ `time`; `arrays` ↔ `objects` ↔ `sets`).
- [ ] **Tree-shaking / import-pattern guidance.** A short page (or callout per module) showing the subpath import vs root import and explaining the bundle implications.
- [ ] **Recipes / cookbook section.** Task-oriented pages: "format a date for a user's locale", "debounce a search input", "safely parse untrusted JSON" — each pulls from multiple modules and is what readers actually arrive Googling for.
- [ ] **Versioned docs actually populated.** `docusaurus.config.ts` declares `versions: { current: { label: '2.x' } }` but there's no 1.x snapshot — either cut a `1.x` version or remove the versioning UI until it's real.
- [x] **Changelog page in the nav.** `scripts/sync-changelog.mjs` mirrors the root `CHANGELOG.md` into `apps/doc/docs/changelog.md` as a prebuild step. Semantic-release still owns the canonical file; the synced copy is gitignored.
- [ ] **Polish: OG/social card images, custom 404, logo, favicon.** Default favicon is `img/logo.svg` — confirm it actually renders and add `og:image` metadata for shared links.
- [ ] **Migration page surfacing.** `guides/migration` exists; add an inline callout from the homepage hero for anyone landing on 2.x docs from a 1.x context.
- [x] **CI guardrail.** New `docs-build` job in `ci.yml` runs `pnpm --filter @rtorcato/js-common-docs build` on every PR so a broken docs site can't reach `main`.

## CI / Infrastructure

- [ ] **Bump GitHub Actions runners to Node 24.** `docs.yml` (and likely `ci.yml`, `performance.yml`, `security.yml`) use `actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-artifact@v4`, `pnpm/action-setup@v4` — all running on Node 20, which GitHub Actions will force to Node 24 on **2026-06-16**. Bump the action versions (or set `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true`) before then.
