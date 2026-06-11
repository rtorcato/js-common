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
- [x] **Tree-shaking / import-pattern guidance.** `guides/tree-shaking` covers subpath vs root imports, why the root entry is empty by design, real per-module sizes, bundler verification, and the types-only subpath.
- [ ] **Recipes / cookbook section.** Task-oriented pages: "format a date for a user's locale", "debounce a search input", "safely parse untrusted JSON" — each pulls from multiple modules and is what readers actually arrive Googling for.
- [x] **Versioned docs cleaned up.** Removed the misleading `versions` config and `docsVersionDropdown` navbar item — when a 1.x snapshot is genuinely needed, `docusaurus docs:version 1.x` is one command away.
- [x] **Changelog page in the nav.** `scripts/sync-changelog.mjs` mirrors the root `CHANGELOG.md` into `apps/doc/docs/changelog.md` as a prebuild step. Semantic-release still owns the canonical file; the synced copy is gitignored.
- [ ] **Polish: OG/social card images, custom 404, logo, favicon.** Default favicon is `img/logo.svg` — confirm it actually renders and add `og:image` metadata for shared links.
- [ ] **Migration page surfacing.** `guides/migration` exists; add an inline callout from the homepage hero for anyone landing on 2.x docs from a 1.x context.
- [x] **CI guardrail.** New `docs-build` job in `ci.yml` runs `pnpm --filter @rtorcato/js-common-docs build` on every PR so a broken docs site can't reach `main`.

## CI / Infrastructure

- [x] **GitHub Actions bumped to Node 24-ready releases.** All 4 workflows now use `actions/checkout@v6`, `actions/setup-node@v6`, `pnpm/action-setup@v6`, plus `actions/upload-pages-artifact@v5` and `actions/deploy-pages@v5` in `docs.yml`. Ahead of the 2026-06-16 Node 20 deprecation.
