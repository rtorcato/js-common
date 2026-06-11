# TODO

Living checklist of issues, gaps, and improvements for `@rtorcato/js-common`. Items are ordered by severity — start at the top.

## Documentation

Goal: an excellent docs site at https://rtorcato.github.io/js-common/. Items roughly ordered by reader impact.

- [x] **Module index published** — every subpath has a stub page listing its exports + one-line JSDoc summary (Docusaurus + `scripts/generate-module-docs.mjs`).
- [ ] **Full API reference.** Stub pages don't show signatures, parameter docs, return types, generics, or `@example` blocks. Wire `docusaurus-plugin-typedoc` so TypeDoc-generated reference pages live alongside the hand-written guides.
- [ ] **Runnable examples on every function.** At minimum: input → output snippet for the top 3 functions per module. Ideally a live playground (CodeSandbox/StackBlitz embed or `@docusaurus/theme-live-codeblock`).
- [ ] **Full-text search.** Wire Algolia DocSearch (free for OSS) or `@easyops-cn/docusaurus-search-local` as a no-config fallback.
- [ ] **Module overview prose, not just tables.** Each module page opens with 2–3 sentences explaining *when* to reach for it and the design choices (e.g. why `arrays.unique` uses `Set` semantics, not deep equality).
- [ ] **"See also" cross-links between related modules** (e.g. `date` ↔ `datetime` ↔ `time`; `arrays` ↔ `objects` ↔ `sets`).
- [ ] **Tree-shaking / import-pattern guidance.** A short page (or callout per module) showing the subpath import vs root import and explaining the bundle implications.
- [ ] **Recipes / cookbook section.** Task-oriented pages: "format a date for a user's locale", "debounce a search input", "safely parse untrusted JSON" — each pulls from multiple modules and is what readers actually arrive Googling for.
- [ ] **Versioned docs actually populated.** `docusaurus.config.ts` declares `versions: { current: { label: '2.x' } }` but there's no 1.x snapshot — either cut a `1.x` version or remove the versioning UI until it's real.
- [ ] **Changelog page in the nav.** Render `CHANGELOG.md` (semantic-release output) as a Docusaurus page so users see "what's new" without leaving the site.
- [ ] **Polish: OG/social card images, custom 404, logo, favicon.** Default favicon is `img/logo.svg` — confirm it actually renders and add `og:image` metadata for shared links.
- [ ] **Migration page surfacing.** `guides/migration` exists; add an inline callout from the homepage hero for anyone landing on 2.x docs from a 1.x context.
- [ ] **CI guardrail.** Add a `docs:check` step (broken-link check + `pnpm --filter @rtorcato/js-common-docs build`) to `ci.yml` so PRs that break the site fail before merge.
