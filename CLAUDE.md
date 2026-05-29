# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm run build-dev       # development build (esbuild + tsc declarations)
pnpm run build-prod      # production build
pnpm run build-cli       # CLI build (separate TypeScript compilation + shebang injection)
pnpm test                # vitest
pnpm coverage            # vitest with Istanbul coverage
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

## Adding a New Module

Every new module in `src/` must also be registered in the `exports` field of `package.json` for tree-shaking to work. Follow the existing pattern of named subpath exports (e.g. `"./strings"`, `"./date"`).

## Commits & PRs

- Conventional commits are **required**. Run `pnpm commit` for a guided prompt (commitizen).
- PRs must be **squash-merged** — never rebase-merge or merge-commit.
- `semantic-release` auto-publishes from `main` using commit messages. **Never bump the version manually** in `package.json`.

## Pre-commit Hooks

Husky runs `pnpm typecheck` and `pnpm check` on every commit. This can be slow — factor it in before committing frequently.

## Notes

- The CLI (`src/cli/`) is built with a separate script and has its own `tsconfig`. Do not include it in the main library build.
- Required env vars for CI releases: `GITHUB_TOKEN`, `NPM_TOKEN` (GitHub Actions), `GITLAB_TOKEN` (GitLab CI).
