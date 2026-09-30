# Contributing to js-common

Thanks for your interest. This is a tree-shakeable TypeScript utility library; contributions of any size are welcome.

## Prerequisites

- Node.js (see `engines` in `package.json`)
- pnpm (via Corepack or installed globally)
- git

## Setup

```bash
git clone https://github.com/rtorcato/js-common.git
cd js-common
pnpm install
```

## Workflow

1. **One branch and PR per issue.** Branch from `main` and name it `feat/<topic>`, `fix/<topic>`, `docs/<topic>`, or `chore/<topic>`. Don't batch unrelated changes.
2. **Make your change.**
3. **Verify locally** before pushing:
   ```bash
   pnpm verify
   ```
   This runs typecheck, Biome, and the test suite. `pnpm check:fix` auto-formats.
4. **Commit using Conventional Commits** (`pnpm commit` gives a guided prompt). Husky runs typecheck and Biome on every commit.
5. **Open a PR against `main`.** The PR title must be a Conventional Commit: PRs are squash-merged, and the squash subject is what semantic-release reads to decide whether a release is cut.

## Adding a new module

Every new module in `src/` must also be registered as a named subpath in the `exports` field of `package.json` (e.g. `"./strings"`), or tree-shaking won't work. Read `MODULE-BOUNDARIES.md` before proposing any removal or merge.

## Style

Tabs, single quotes, semicolons only as needed, 100-character lines. Enforced by Biome.

## Releases

Releases are automated by semantic-release from `main` and need manual approval on the `release` GitHub environment. Never bump the version in `package.json` or tag by hand.

## License

By contributing, you agree your contributions are licensed under the [MIT License](LICENSE).
