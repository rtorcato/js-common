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
5. **Open a PR against `main`.** The PR title must be a Conventional Commit: PRs are squash-merged. If the PR changes `@rtorcato/js-common` for users, add a changeset (see Releases).

## Adding a new module

Every new module in `src/` must also be registered as a named subpath in the `exports` field of `package.json` (e.g. `"./strings"`), or tree-shaking won't work. Read `MODULE-BOUNDARIES.md` before proposing any removal or merge.

## Style

Tabs, single quotes, semicolons only as needed, 100-character lines. Enforced by Biome.

## Releases

Releases use [Changesets](https://github.com/changesets/changesets). Never bump the version in `package.json` or tag by hand.

1. Add a changeset for any user-facing change: `pnpm changeset`. Pick the bump (patch/minor/major) and commit the file under `.changeset/` with your PR.
2. Merging to `main` does not publish. Each push opens or updates a "Version Packages" PR that consumes the pending changesets, bumps the version and writes `CHANGELOG.md`.
3. Merging the Version Packages PR is the release. Its `publish` job waits for one approval in the `release` GitHub environment, then publishes to npm, creates the GitHub Release and rebuilds the docs site.

## License

By contributing, you agree your contributions are licensed under the [MIT License](LICENSE).
