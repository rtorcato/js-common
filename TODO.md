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

- [ ] **Heavy CLI deps are runtime `dependencies`.** `chalk`, `chalk-animation`, `commander`, `figlet`, `gradient-string`, `inquirer`, `nanospinner` are only used by the CLI but get installed for every library consumer. README's "277 bytes main bundle" claim is misleading against a multi-MB install.
  - Fix: move CLI-only deps to `optionalDependencies` (with graceful CLI degradation) or split the CLI into its own package.
- [ ] **No `engines` field.** README says Node ≥ 18; CI uses Node 22; nothing is enforced at install time.
  - Fix: add `"engines": { "node": ">=18" }` to `package.json`.
- [ ] **No `.nvmrc`.** Contributors won't auto-switch Node.
  - Fix: add `.nvmrc` matching CI (Node 22).
- [ ] **Dead `lint-staged` + `husky.hooks` config in `package.json`.** The actual `.husky/pre-commit` runs `pnpm typecheck && pnpm check` directly, bypassing lint-staged.
  - Fix: either wire lint-staged in (faster commits) or remove the unused `lint-staged` and `husky.hooks` blocks.

## 3. Code organization

- [ ] **Indirection in `src/math/index.ts`** — re-exports from `./math.ts` while every other module exports directly from `index.ts`.
  - Fix: inline `math.ts` into `index.ts` for consistency.
- [ ] **`src/types/` ships `.d.ts` only** (the `./types` export omits `import`, which is correct).
  - Fix: document the convention in `CLAUDE.md` so it isn't "fixed" by mistake.
- [ ] **Mixed arrow vs function declarations** across modules. Cosmetic; deferrable.
- [ ] **`any` usage** in CLI and a few generic wrappers (`flatten<T>(arr: any[])`, `toBoolean(value: any)`, `captureConsole(callback: (type: string, ...args: any[]) => void)`). `noExplicitAny` is intentionally off, but tighten where free.

## 4. Tests & coverage

- [ ] **`src/cli/` has no tests.**
  - Fix: smoke test that the binary builds, prints `--help`, and exits 0.
- [ ] **`src/types/` and `src/tests/` have no tests.** `types/` is type-only (OK); `tests/` looks like fixtures.
  - Fix: rename `src/tests/` to `__fixtures__` or move fixtures into the modules that use them.
- [ ] **No explicit coverage thresholds.** `vitest.config.mjs` only extends the shared tooling config.
  - Fix: add explicit thresholds (e.g., 80% lines/branches/functions/statements) so regressions fail CI.
- [ ] **No coverage badge in README.**

## 5. Documentation

- [ ] **README "277 bytes" badge** is misleading once you account for runtime deps and the fact that the main entry is currently a stub.
  - Fix: re-measure after the root module is fixed, or drop the badge.
- [ ] **No API reference site.** Optional, larger lift.
  - Fix (if pursued): TypeDoc → `docs/` published to GitHub Pages.
- [ ] **CLAUDE.md is stale** about the `obects` typo (covered in §1).
- [x] **`CLI.md`** is now linked from the README's CLI section.
- [x] **`SECURITY.md` claims "no runtime dependencies"** — Resolved: corrected to "Minimal Runtime Dependencies" with the actual list.

## 6. Nice-to-haves

- [ ] **`.editorconfig`** for editors that don't read `biome.json`.
- [ ] **`benchmark` script** is wired in `package.json` but `scripts/benchmark.mjs` isn't documented in README or CONTRIBUTORS.
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
- `vitest.config.mjs` — coverage thresholds (§4)
- `.husky/pre-commit` — lint-staged dead code (§2)
