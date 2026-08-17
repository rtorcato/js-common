---
title: Migrating
description: Upgrading from 1.x to 2.x, from 2.x to 3.x, and from 3.x to 4.x.
sidebar_position: 3
---

## 3.x → 4.x — what the platform already does

4.0 removes wrappers whose replacement is the runtime itself, not another module
in this package. Nothing was re-homed, so there is no "import it from here
instead" — every row below points at a JavaScript built-in.

The `engines.node` floor of `>=22` is what makes this possible: `Set.prototype`
methods, `Object.groupBy`, `Array.prototype.at`, `structuredClone` and
`crypto.randomUUID` are all available there.

### Individual exports removed

| Was | Now |
|---|---|
| `promises.all(ps)` | `Promise.all(ps)` |
| `promises.allSettled(ps)` | `Promise.allSettled(ps)` |
| `promises.race(ps)` | `Promise.race(ps)` |
| `promises.delay(ms)` | `sleep(ms)` from `@rtorcato/js-common/sleep` |
| `boolean.and(a, b)` | `a && b` |
| `boolean.or(a, b)` | `a \|\| b` |
| `boolean.not(a)` | `!a` |
| `boolean.xor(a, b)` | `a !== b` |
| `strings.padStart(s, n, c)` | `s.padStart(n, c)` |
| `strings.padEnd(s, n, c)` | `s.padEnd(n, c)` |
| `strings.replaceString(s, a, b)` | `s.replaceAll(a, b)` |
| `arrays.first(arr)` | `arr.at(0)` |
| `arrays.last(arr)` | `arr.at(-1)` |
| `arrays.flatten(arr)` | `arr.flat()` |
| `arrays.groupBy(arr, fn)` | `Object.groupBy(arr, fn)` — **see the note below** |
| `numbers.isInteger(v)` | `Number.isInteger(v)` |
| `numbers.isFiniteNumber(v)` | `Number.isFinite(v)` |
| `numbers.min(ns)` | `Math.min(...ns)` |
| `numbers.max(ns)` | `Math.max(...ns)` |
| `objects.deepClone(v)` | `structuredClone(v)` |
| `json.deepCloneJson(v)` | `structuredClone(v)` — **see the note below** |
| `uuid.getUUID()` | `crypto.randomUUID()` |

`toBoolean` stays in `boolean`, and `sum`, `average`, `clamp`, `mod` and
`between` stay in `numbers` — those do work a built-in does not.

### `groupBy` is not a drop-in

`Object.groupBy` differs from the removed helper in two ways that will show up
in a type check rather than at runtime:

```ts
// boundary-check: ignore — quotes the pre-4.0 API on purpose
- const byTeam = groupBy(rows, (r) => r.team)
- byTeam.red.length      // T[] — always defined
+ const byTeam = Object.groupBy(rows, (r) => r.team)
+ byTeam.red?.length     // T[] | undefined — every key is optional
```

It also returns a **null-prototype** object, so `byTeam.hasOwnProperty(...)`
throws. Use `Object.hasOwn(byTeam, key)` or the `in` operator. Both differences
are the standard's, not a behaviour change we chose.

### `deepCloneJson` had different semantics

`json.deepCloneJson` cloned through `JSON.parse(JSON.stringify(v))`, which
silently drops `undefined` and functions and turns `Date`s into strings.
`structuredClone` keeps `Date`s, `Map`s, `Set`s, typed arrays and cycles, and
throws on functions instead of dropping them.

That is a **better** result in almost every case, but it is not identical — if
you were relying on the JSON round trip to flatten a value into
JSON-serialisable shape, call `JSON.parse(JSON.stringify(v))` explicitly so the
intent is visible.

### `mimeTypes` entries lose `compressible`

The vendored MIME database no longer carries a `compressible` flag per entry.
Nothing in the library read it — `lookup` is built from `extensions` and
`source` alone — so it was 913 lines of payload for every consumer of the
`mime-types` module. `MimeValue` narrows to `{ source, extensions }` to match.
`lookup`, `types` and `extensions` are unchanged.

If you need the flag, [`mime-db`](https://www.npmjs.com/package/mime-db) still
publishes it and is the upstream this database was vendored from.

### Two modules removed entirely

`./sets` and `./interval` were nothing but wrappers, so both subpaths are gone —
44 subpaths become 42.

#### `./sets` → `Set.prototype`

Node 22 ships the ES2025 `Set` methods, so every export had a native equivalent.

| Was | Now |
|---|---|
| `union(a, b)` | `a.union(b)` |
| `intersection(a, b)` | `a.intersection(b)` |
| `difference(a, b)` | `a.difference(b)` |
| `isSubset(a, b)` | `a.isSubsetOf(b)` |
| `isSuperset(a, b)` | `a.isSupersetOf(b)` |
| `setToArray(set)` | `[...set]` |
| `arrayToSet(arr)` | `new Set(arr)` |

Note the argument order reads differently — `isSubset(a, b)` asked "is `a` a
subset of `b`", and `a.isSubsetOf(b)` asks the same thing, so these two are a
direct swap. The set-returning methods produce a new `Set` exactly as before.

#### `./interval` → the timer globals

| Was | Now |
|---|---|
| `runInterval(fn, ms)` | `setInterval(fn, ms)` |
| `clearIntervalById(id)` | `clearInterval(id)` |

Both wrappers passed their arguments straight through and returned what the
global returned, so this is a rename and nothing more.

## 2.x → 3.x — one home per helper

Thirteen names were exported from two modules each, and five more were the same
function under two names. 3.0 gives every helper exactly one home. The losing
copy is **deleted, not deprecated** — you get a build error that names the fix
rather than a silent behaviour change. The reasoning is recorded in
[MODULE-BOUNDARIES.md](https://github.com/rtorcato/js-common/blob/main/MODULE-BOUNDARIES.md);
module paths are frozen as of that record.

### Two modules removed

`./formatting` and `./math` are gone — 46 subpaths become 44.

| Was | Now |
|---|---|
| `formatting.formatPercent` | `numbers.formatPercent` |
| `formatting.formatDate` | `date.formatDate` — **note:** UTC, where the old one was local time |
| `formatting.formatTime` | `time.formatTime` |
| `formatting.formatDateTime` | `datetime.formatDateTimeLocal` |
| `formatting.formatNumber` | `i18n.formatNumber` — takes a locale and `Intl.NumberFormat` options |
| `formatting.padZero` | `strings.padStart(str, n, '0')` |
| `math.add` / `subtract` / `multiply` / `divide` | `+` `-` `*` `/` |

`formatting.formatDate` formatted in **local** time and `date.formatDate`
formats in **UTC**. Near midnight they disagree on the day, so this one is worth
a second look rather than a blind find-and-replace.

### Duplicate names — one owner each

Import from the owner; the other module no longer exports the name.

| Name | Owner | No longer in |
|---|---|---|
| `roundTo` | `numbers` | `currency` |
| `randomString` | `random` | `strings` |
| `sanitizeString` | `security` | `strings` — and renamed, see below |
| `escapeHtml`, `unescapeHtml` | `html` | `strings` |
| `pluralize` | `strings` | `i18n` |
| `formatNumber` | `i18n` | — (`formatting` removed) |
| `secondsBetween` | `time` | `datetime` |
| `isBoolean` | `validation` | `boolean` |
| `getProcessUptime` | `process` | `node` |

Three of these changed behaviour where the surviving copy was the stricter one:

- `random.randomString(length, chars?)` defaults its charset and draws via
  `randomInt`; the `strings` copy required a charset and called `Math.random()`.
- `time.secondsBetween` accepts `string | Date`; the `datetime` copy took only `Date`.
- `process.getProcessUptime()` returns `number | undefined` behind a guard; the
  `node` copy assumed `process` exists and returned `number`.

`html.unescapeHtml` also **adopted the `strings` implementation**, so it now
decodes `&#x27;`, `&#x2F;` and `&nbsp;` as well.

### `sanitizeString` is now `stripScriptish`

```ts
// boundary-check: ignore — quotes the pre-3.0 name on purpose
- import { sanitizeString } from '@rtorcato/js-common/security'
- sanitizeString(html)
+ import { stripScriptish } from '@rtorcato/js-common/security'
+ stripScriptish(html)
```

Same function, honest name. It removes `<script>` blocks and inline `on*=`
handlers and nothing else — a blocklist over two shapes. It was never a
sanitizer, and the old name invited people to use it as one without reading the
caveat that has been in its docs the whole time.

**If you were relying on it to make untrusted HTML safe, renaming the import is
not the fix.** Escape with [`html.escapeHtml`](../modules/html.md), or run
DOMPurify when the markup has to survive.

Three behaviour changes came with the rename, all of them things the old
regexes got wrong:

- Unquoted handlers are now removed. `<img src=x onerror=alert(1)>` was
  previously left intact, because the old pattern required matching quotes.
  So was `<img/onerror=alert(1)>`, where `/` separates the attribute instead
  of a space.
- `</script >` now closes a block. The old pattern demanded `</script>` exactly,
  so a space defeated it (CodeQL `js/bad-tag-filter`).
- No stray space is left behind. `<div onclick="x()">` yields `<div>`, not
  `<div >`. Update snapshot tests that captured the old output.

Performance also changed by three orders of magnitude on hostile input:
`'<script'.repeat(40_000)` took 9.8s and now takes ~2ms. The old
implementation backtracked once per `<script` occurrence
(CodeQL `js/polynomial-redos`), which was a denial-of-service vector for anyone
passing it attacker-controlled strings.

### Renames

| Was | Now |
|---|---|
| `events.once(target, type)` | `events.onceEvent(target, type)` |
| `numbers.getRandomInt` | `random.randomInt` |
| `numbers.getRandomFloat` | `random.randomFloat` |
| `strings.stripHtml` | `html.stripHtmlTags` |
| `time.pad2` | kept — but `strings.padStart` covers the general case |

`functions.once` keeps its name. It memoises a call, which is a genuinely
different function from awaiting a DOM event, so the event one moved aside.

## 1.x → 2.x — `errors.tryCatch` → `errors.tryWithFallback`

```ts
// boundary-check: ignore — quotes the pre-2.0 API on purpose
// 1.x — swallow errors and fall back to a default value
import { tryCatch } from '@rtorcato/js-common/errors'
const data = await tryCatch(() => fetchData(), [])

// 2.x — same function, renamed for clarity
import { tryWithFallback } from '@rtorcato/js-common/errors'
const data = await tryWithFallback(() => fetchData(), [])
```

The name `tryCatch` is now reserved for the Result-pattern helper in `@rtorcato/js-common/try`, which returns `{ data, error }` instead of swallowing:

```ts
import { tryCatch } from '@rtorcato/js-common/try'
const { data, error } = await tryCatch(() => fetchData())
if (error) { /* handle */ }
```

Prefer the Result-style `tryCatch` for new code; reserve `tryWithFallback` for cases where the fallback is genuinely safe.
