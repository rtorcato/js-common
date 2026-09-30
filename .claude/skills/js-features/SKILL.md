---
name: js-features
description: Check js-common against recent JavaScript/TypeScript platform features — which exported helpers the runtime now does natively, which implementations could use a native API, and whether `lib`/`engines` lag the floor. Use when the user asks "are there new JS features we're missing", "what can the platform replace", "check for new ES features", or invokes /js-features. Reports only; files nothing and edits nothing without asking.
---

# js-features

Audit this repo against the JavaScript platform. The output is a report; nothing
is changed until the user picks items from it.

`MODULE-BOUNDARIES.md` is binding. Read it first — it already records every
platform passthrough removed in 4.0 (`./sets`, `arrays.groupBy`, `strings.padStart`,
…), so don't re-report those, and follow its rules for what a finding turns into.

## 1. Establish the floor

A feature only counts if it exists at the **lowest runtime this package supports**:

- `engines.node` in `package.json` — the Node floor.
- `compilerOptions.lib` / `target` in `tsconfig.json` (and the repo-tooling base it
  extends) — what the type checker lets `src/` call.
- `typescript` version in `package.json` — whether its bundled lib files type the feature.

Report any mismatch as its own finding: a `lib` older than the Node floor hides
APIs the runtime already ships (e.g. `lib: ES2022` with `node >=22` leaves
`Object.groupBy`, `Promise.withResolvers` and the `Set` methods untyped).

## 2. Gather what's new — from sources, not memory

Look up, don't recall:

- TC39 finished proposals: https://github.com/tc39/proposals/blob/main/finished-proposals.md
  (and stage 3 for anything landing soon — list separately, never as a finding).
- Node release notes / changelog for the versions between the floor and current LTS,
  for V8 upgrades and new globals (`node.green` for per-version support).
- TypeScript release notes for the installed major, for new `lib` entries.

For each feature record: name, ES edition, first Node version shipping it unflagged.
Drop anything not unflagged at the Node floor into a "not yet at floor" list.

## 3. Match against the library

For each at-floor feature, grep `src/` (skip `src/cli/` unless it's a CLI concern):

**A. Export the platform now covers** — an exported helper that is a passthrough or
near-equivalent of the native API (e.g. a `sumPrecise`-style sum vs `Math.sumPrecise`,
`escapeRegExp` vs `RegExp.escape`, a base64 helper vs `Uint8Array.fromBase64`,
`isError` vs `Error.isError`, iterator helpers vs `Iterator.prototype.map/filter/take`).
Compare behaviour, not names — note every edge-case difference (empty input,
`NaN`, precision, non-string input). A difference means it's *not* a passthrough;
say so and keep it.

**B. Implementation could use a native** — the export earns its keep, but its body
reimplements something native now provides. Internal swap, no API change.

**C. Gap** — a native feature that a module's subject clearly covers but callers
still need wrapping for (a guard, a fallback, a friendlier signature). Be strict:
the library does not wrap platform APIs for their own sake (see the `./math` and
`./interval` sections of MODULE-BOUNDARIES.md).

## 4. Report

One table per category, each row: export (`module.name`) · native feature · floor
it needs · behaviour differences · proposed action. Then the floor mismatches, then
the "not yet at floor" / stage-3 watchlist in one line each.

Proposed actions follow MODULE-BOUNDARIES.md:

- **A, exact passthrough** → deprecate now (`@deprecated`, delegate to or name the
  native), and add the removal to "Queued for the next major". Never delete outside a
  major.
- **A, behaviour differs** → keep; note the difference in the doc comment.
- **B** → ordinary `refactor:` — same outputs, tests must pass unchanged.
- **C** → new helper: check the name isn't already exported elsewhere
  (`scripts/check-readme-exports.mjs` enforces it) and register any new module in
  `package.json#exports`.

End by asking which rows to act on. Each accepted row becomes its own issue and
branch — don't batch them.
