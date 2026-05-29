# TODO

Living checklist of issues, gaps, and improvements for `@rtorcato/js-common`. Items are ordered by severity — start at the top.

## 1. Bugs (likely broken in the published package)

- [x] **`./logger` export points to a nonexistent file.** Resolved: `src/logger/index.ts` now re-exports from `./logger`.
- [x] **`build-cli` script builds the wrong file.** Resolved: `src/cli/index.ts` deleted; `cli.ts` is canonical.
- [x] **`src/index.ts` is a `testPackage` stub.** Resolved: replaced with an empty module + comment explaining the subpath-import convention.
- [x] **`src/logging/index1.ts` is dead.** Resolved: deleted.
- [x] **CLAUDE.md claims `src/obects/` typo exists; it does not.** Resolved: stale note removed.
- [x] **`src/helloworld/` looks like dead code.** Resolved: deleted.
- [x] **`src/formatting/` is not in `exports`.** Resolved: added `"./formatting"` entry.

## 2. Packaging / install footprint

- [x] **Heavy CLI deps are runtime `dependencies`.** Resolved: `chalk`, `chalk-animation`, `commander`, `figlet`, `gradient-string`, `@inquirer/prompts` moved to `optionalDependencies`. Unused `inquirer` and `nanospinner` removed entirely. The CLI binary now wraps its dynamic import in a try/catch that prints `npm install -g @rtorcato/js-common` if any optional dep is missing.
- [ ] **No `engines` field.** README says Node ≥ 18; CI uses Node 22; nothing is enforced at install time.
  - Fix: add `"engines": { "node": ">=18" }` to `package.json`.
- [ ] **No `.nvmrc`.** Contributors won't auto-switch Node.
  - Fix: add `.nvmrc` matching CI (Node 22).
- [x] **Dead `lint-staged` + `husky.hooks` config in `package.json`.** Resolved: removed the unused `lint-staged` and `husky.hooks` blocks plus the `lint-staged` devDependency; `.husky/pre-commit` keeps its current full-repo `pnpm typecheck && pnpm check` flow.

## 3. Code organization

- [ ] **Indirection in `src/math/index.ts`** — re-exports from `./math.ts` while every other module exports directly from `index.ts`.
  - Fix: inline `math.ts` into `index.ts` for consistency.
- [ ] **`src/types/` ships `.d.ts` only** (the `./types` export omits `import`, which is correct).
  - Fix: document the convention in `CLAUDE.md` so it isn't "fixed" by mistake.
- [ ] **Mixed arrow vs function declarations** across modules. Cosmetic; deferrable.
- [ ] **`any` usage** in CLI and a few generic wrappers (`flatten<T>(arr: any[])`, `toBoolean(value: any)`, `captureConsole(callback: (type: string, ...args: any[]) => void)`). `noExplicitAny` is intentionally off, but tighten where free.

## 4. Tests & coverage

- [x] **`src/cli/` has no tests.** Resolved: `src/cli/cli.test.ts` spawns the built `dist/cli/index.mjs` and asserts `--version`, `--help`, and `date today` each exit 0 with expected output.
- [x] **`src/tests/` looks like fixtures.** Resolved: the lone trivial placeholder was deleted and the directory removed. `src/types/` remains type-only by design.
- [x] **No explicit coverage thresholds.** Resolved: `vitest.config.mjs` now sets `lines: 85`, `statements: 85`, `functions: 95`, `branches: 70` — a no-regression floor under today's measured coverage (89.8 / 89.74 / 97.41 / 73.79).
- [ ] **No coverage badge in README.**

## 5. Documentation

- [x] **README "277 bytes" badge** Resolved: badge dropped; bundle-size language reframed around per-module bundlejs measurement.
- [ ] **No API reference site.** Optional, larger lift.
  - Fix (if pursued): TypeDoc → `docs/` published to GitHub Pages.
- [ ] **CLAUDE.md is stale** about the `obects` typo (covered in §1).
- [x] **`CLI.md`** is now linked from the README's CLI section.
- [x] **`SECURITY.md` claims "no runtime dependencies"** — Resolved: corrected to "Minimal Runtime Dependencies" with the actual list.

## 6. Nice-to-haves

- [ ] **`.editorconfig`** for editors that don't read `biome.json`.
- [x] **`benchmark` script** Resolved: documented in README Development section.
- [ ] **`.github/workflows/performance.yml`** — confirm it actually runs on PRs and gates something meaningful; otherwise remove.

## Key file references

- `package.json` — exports, scripts, deps
- `src/index.ts` — stub root entry (§1)
- `src/logger/` — missing `index.ts` (§1)
- `src/cli/cli.ts` + `src/cli/index.ts` — duplicate (§1)
- `src/logging/index1.ts` — dead (§1)
- `src/helloworld/` — dead (§1)
- `src/formatting/` — unexported (§1)
- `CLAUDE.md` — stale `obects` note (§1)
- `SECURITY.md` — incorrect "no runtime deps" claim (§5)
