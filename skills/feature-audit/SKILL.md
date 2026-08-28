---
name: feature-audit
description: Audit @rtorcato/js-common against the current state of JavaScript — which exported helpers are now redundant with a shipped native feature and should be deprecated, and which genuinely-missing features are worth adding. Use when a new ECMAScript proposal ships or reaches Stage 4, when reviewing whether a module still earns its place, or when the user asks "is the library missing new JS features", "what can we delete now that X is native", or invokes /feature-audit. Reports only — it never edits src/.
---

# js-common feature audit

A utility library's default reaction to a new JavaScript feature is **deprecation, not
addition** — and deprecation here means a JSDoc `@deprecated` tag, not a removal. When a
helper becomes a one-line wrapper around a native, point users at the native and keep the
wrapper working. Additions are the rarer, harder-earned half of this audit.

Produce a report. Do not edit `src/`, `package.json`, or the docs — the maintainer decides
what to act on.

## Backwards compatibility is the default

This package is published to npm and `semantic-release` cuts a major from a
`BREAKING CHANGE:` footer. **Never recommend removing a public export as a standalone
action.** Removing one forces a major version on every consumer, and buys them nothing they
asked for.

Two facts make keeping a redundant helper close to free, and the report should reason from
them rather than from tidiness:

- The library is **tree-shakeable, one subpath per module**. A deprecated helper nobody
  imports is shaken out of the consumer's bundle — it costs them zero bytes. The only real
  cost is maintenance on this side.
- A `@deprecated` JSDoc tag is **non-breaking and already visible**: editors strike the
  symbol through and surface the replacement at the call site, so users migrate on their own
  schedule.

So the recommended action for a now-native helper is, in order:

1. Add `@deprecated Use <native> instead.` to its JSDoc. Non-breaking, ships as a `patch`.
2. Note the native equivalent in the module's docs page prose.
3. Leave the implementation alone. It still works.

Only propose actual removal when the maintainer is *already* planning a major for other
reasons — and then batch every removal into that one major rather than dribbling breaking
changes out. Say so explicitly if a finding is removal-worthy-but-deferred; do not file it
as if it were actionable now.

## Rules

1. **Fetch, don't recall.** What has shipped moves faster than any model's knowledge, and a
   confidently wrong "this is native now" is the one failure mode that makes this audit
   harmful. Check the live sources every run:
   - `https://github.com/tc39/proposals/blob/main/finished-proposals.md` (Stage 4)
   - `https://github.com/tc39/proposals/blob/main/README.md` (Stage 3 — shipping soon)
   - MDN Baseline status for anything browser-facing
   - `https://node.green/` for Node support, against `engines.node` in `package.json`
     (currently `>=22` — a feature that needs Node 24+ is a *future* item, not a now item)

2. **Stage 3 or 4 only.** Anything Stage 2 or below is a moving API. Vendoring a polyfill for
   it ships churn to consumers. Signals is the standing example: Stage 1, zero engines, and
   the API has already changed more than once — it belongs in the Rejected table, not the
   Missing one.

3. **Syntax cannot be exported.** `await using`, decorators, pattern matching and the like are
   grammar, not values. The only library-side question they raise is whether js-common's own
   objects should participate — e.g. does anything here hold a resource that deserves
   `Symbol.asyncDispose`? (As of 2026-08 nothing does: `file` makes one-shot async `fs` calls
   and holds no handle.) Never list syntax as a "missing export".

4. **Redundant ≠ deprecate on sight.** A wrapper still earns its place when it adds type
   narrowing, an edge-case guard, or a name that reads better at the call site than the
   native does. Say which of those applies, or say it's a pure passthrough. `unique` →
   `[...new Set(x)]` is a passthrough; `safeJsonParse` → `JSON.parse` is not, it swallows the
   throw. Only pure passthroughs are worth a `@deprecated` tag — tagging a helper that still
   adds value just nags users away from the better call site.

5. **Cross-check the docs claim, not just the source.** `apps/docs/docs/modules/overview.md`
   is hand-written and has drifted before (it advertised `flatten` and `groupBy` from
   `/arrays`, neither of which exists). Compare what the docs promise against what
   `src/*/index.ts` actually exports and report the gap.

## Method

1. Enumerate the real surface: the `exports` field of `package.json` for subpaths, then
   `grep -nE "^export (function|const)" src/*/index.ts` for the exports in each. Exclude
   `src/cli` (built separately, not a public subpath) and `src/types` (declarations only).
2. For each export, ask: is there now a native that does this, at `engines.node` or above?
3. Separately, scan the Stage 3/4 list for capabilities the library has *no* answer to.
4. Weigh each candidate against `MODULE-BOUNDARIES.md` — it records which module owns which
   name and why some helpers were already removed. A deletion that contradicts a decision
   recorded there needs to argue with it explicitly, not silently reverse it.

## Report format

```markdown
## js-common feature audit — YYYY-MM-DD

### Now native — candidates for a @deprecated tag
| Export | Native equivalent | In Node >=22? | Passthrough, or still earns its place? |

None of these are removals. The action is a JSDoc tag; the implementation stays.

### Missing — consider adding
| Feature | Stage | Ships in | Why it fits js-common |

### Rejected this round
| Feature | Stage | Why not |

### Docs drift
| Claim | Location | Reality |
```

Close with a one-line recommendation. If every table is empty, say so plainly — a run that
finds nothing is the expected outcome most of the time, and padding it with marginal
suggestions is how a library accretes helpers nobody asked for.

## Standing context

- **Temporal is the live one.** Stage 4 (ES2027), shipping in Chrome 144 / Firefox 139 /
  Node 26, and it supersedes most of `date` (17 exports), `datetime` (9) and `time` (6). It
  needs Node 26, above the current `engines.node` floor of `>=22`, so nothing is actionable
  until that floor rises — and even then the action is `@deprecated` tags, not deleting three
  modules. Those modules keep working on the old `Date` for as long as `Date` exists, which
  is forever.
- The `date`/`datetime`/`time` split is itself recorded in `MODULE-BOUNDARIES.md`; read it
  before proposing that any of the three disappear.
