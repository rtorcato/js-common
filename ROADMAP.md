# Roadmap

Where `@rtorcato/js-common` is going, and what "done" means for each stage. Each
section maps 1:1 to a [GitHub milestone](https://github.com/rtorcato/js-common/milestones) —
the milestone is where the individual issues live, this file is the at-a-glance view.
Day-to-day open work is in [GitHub issues](https://github.com/rtorcato/js-common/issues).

## [v2.x — Shipped modules](https://github.com/rtorcato/js-common/milestone/1) — done

Everything already published to npm up to 2.8.2.

- [x] ~47 tree-shakeable subpath modules (`strings`, `date`, `arrays`, `objects`, `crypto`, `fetch`, `validation`, …)
- [x] CLI (`src/cli/`), built and shipped separately
- [x] Biome + Vitest + Husky + semantic-release tooling
- [x] Docusaurus docs site on GitHub Pages

## [Beta — npm preview](https://github.com/rtorcato/js-common/milestone/2)

The pre-stable line, published under a beta/next dist-tag for real-world feedback
before the public surface is locked. **Breaking changes are still allowed here.**

- [ ] Publish a `beta` dist-tag alongside `latest`
- [ ] Shake out API rough edges reported against the preview
- [ ] Settle the module boundaries — no more renames after this stage

## [v1.0 — Stable API](https://github.com/rtorcato/js-common/milestone/3)

The stable, documented public surface. After this, breaking changes only in a major.

- [ ] A docs-site guide per module, not just generated API reference
- [ ] README API reference in sync with the shipped exports
- [ ] Bundle-size budget enforced in CI (`.size-limit.json`)

> **Note on the version number.** `package.json` is already at 2.x, so "v1.0" here
> names the *API stability* stage, not the semver number the release will carry.

## Release checklist

Version bumps are automated by semantic-release — never bump `package.json` by hand.
This checklist covers what automation *can't* do. Any change that **adds or changes a
public API** must also:

- [ ] Update the docs site (`apps/docs/docs/modules/`, plus a recipe if the API deserves one)
- [ ] Update the README — the module list under "Available Modules" and any affected example
- [ ] Tick the relevant item in this file, and close the issue in its milestone

Internal changes (refactors, build, CI, dependency bumps) don't need any of the above.
