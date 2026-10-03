# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm run build-dev       # development build (esbuild + tsc declarations)
pnpm run build-prod      # production build
pnpm run build-cli       # CLI build (separate TypeScript compilation + shebang injection)
pnpm test                # vitest
pnpm coverage            # vitest with V8 coverage (@vitest/coverage-v8)
pnpm typecheck           # tsc --noEmit
pnpm lint                # biome lint (read-only)
pnpm format              # biome format (write)
pnpm check               # biome check (lint + format)
pnpm check:fix           # biome check --fix (lint + format + autofix)
```

## Code Style (Biome)

- Tabs for indentation, 100-character line width
- Single quotes, semicolons only as needed (ASI), trailing commas: es5
- `noExplicitAny`, `noInferrableTypes`, `useLiteralKeys` are all **off** — these are intentional
- Prefer `export function foo()` over `export const foo = () =>` for module-level exports (the established convention across `src/`)

## Adding a New Module

Every new module in `src/` must also be registered in the `exports` field of `package.json` for tree-shaking to work. Follow the existing pattern of named subpath exports (e.g. `"./strings"`, `"./date"`).

The `./types` subpath is intentionally types-only — it has no `import` field, only `types`. Do not "fix" this; `src/types/` ships `.d.ts` declarations with no runtime code.

## Commits & PRs

- Conventional commits are **required**. Run `pnpm commit` for a guided prompt (commitizen).
- PRs must be **squash-merged** — never rebase-merge or merge-commit.
- `semantic-release` derives the version from commit messages when `release.yml` runs. **Never bump the version manually** in `package.json`.
- Dispatching `release.yml` on a `beta` branch publishes a pre-release under the `beta` dist-tag; `latest` is untouched.

## Pre-commit Hooks

Husky runs `pnpm typecheck` and `pnpm check` on every commit. This can be slow — factor it in before committing frequently.

## Notes

- The CLI (`src/cli/`) is built by `build-cli`, which runs `tsc` with `--ignoreConfig` and every flag inline — there is no CLI `tsconfig`, only `tsconfig.json` and `tsconfig.build.json`. Do not include the CLI in the main library build.
- The CLI is a shop window, not a port of the library. `src/cli/catalog.ts` may only advertise verbs that `src/cli/cli.ts` actually registers; `catalog.test.ts` enforces both that and the `exportName`s being real.
- Releases authenticate to npm via OIDC trusted publishing and to GitHub via the job's automatic `GITHUB_TOKEN`; no repository secrets are needed.
- Merging to `main` (or pushing `beta`) does not release. A release runs only when `release.yml` is dispatched or a milestone is closed, and then waits on the `release` GitHub environment for a manual approval.
