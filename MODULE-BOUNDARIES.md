# Module boundaries

**Status:** accepted and applied during beta · settles [#174](https://github.com/rtorcato/js-common/issues/174)

Every decision below is live in the code as of 3.0. The before/after map for
consumers is the [migration guide](apps/docs/docs/guides/migration.md).

This is the decision record for where each helper lives. It exists so the next
contributor does not re-litigate a question that was already answered, and so a
reviewer can point at a rule instead of arguing taste.

## The rule

**Every exported helper has exactly one home.** Where two modules shipped the
same name, one keeps it and the other copy is **deleted outright** — no
deprecated re-export, no alias.

That is deliberately the harsher option. A deprecated re-export ships a second
copy of the API into beta and needs a follow-up issue to actually remove, which
is how a "temporary" alias becomes permanent. Deleting now costs consumers one
build error that names the fix; deleting after 1.0 costs them a major version.
Beta is the only window where this is free.

## Modules removed

`./formatting` and `./math` are gone. The package goes from 46 subpath modules
to 44.

### `./formatting` → redistributed

It was the single largest source of ambiguity: four of the thirteen name
collisions below involved it, because "formatting" describes an activity rather
than a subject, so every module that formats anything overlapped with it.

| Export | Went to | Note |
|---|---|---|
| `formatDate` | — | dropped; `date.formatDate` already owned the name |
| `formatTime` | — | dropped; `time.formatTime` already owned the name |
| `formatDateTime` | — | dropped; identical output to `datetime.formatDateTimeLocal` |
| `formatNumber` | — | dropped; `i18n.formatNumber` is a strict superset |
| `formatPercent` | `./numbers` | the only export with no existing home |
| `padZero` | — | dropped; `strings.padStart(str, n, '0')` is the same thing |

Note that `formatting.formatDate` was **local** time while `date.formatDate` is
**UTC**. They looked interchangeable and were not — see the collision table.

### `./math` → deleted

Its entire surface was `add`, `subtract`, `multiply`, `divide`: four one-line
wrappers around `+`, `-`, `*`, `/`. They are not re-homed, because `a + b` is
shorter, faster and clearer than `add(a, b)`. `./numbers` keeps the arithmetic
that actually earns a function call — `clamp`, `average`, `sum`, `mod`, `between`.

### `./sets` and `./interval` → deleted in 4.0

Same reasoning as `./math`, applied to the platform rather than to operators.
The package goes from 44 subpath modules to 42.

- `./interval` was `runInterval` and `clearIntervalById`, which called
  `setInterval` and `clearInterval` with the same arguments and returned the
  same value.
- `./sets` predated the ES2025 `Set` methods. `engines.node` is `>=22`, which
  ships `union`, `intersection`, `difference`, `isSubsetOf` and `isSupersetOf`
  on `Set.prototype`; `setToArray` and `arrayToSet` are `[...set]` and
  `new Set(arr)`.

Both are unusual in that the replacement is *not* a second copy inside this
package — it is the runtime, so there is nothing left to re-home.

### Individual exports the platform already provides → deleted in 4.0

The same rule applied inside modules that survive. Each of these was a
pass-through: same arguments, same return value, one extra import.

| Removed | Replacement |
|---|---|
| `promises.all` / `allSettled` / `race` | `Promise.all` / `allSettled` / `race` |
| `promises.delay` | `sleep.sleep` — it was the same function under two names |
| `boolean.and` / `or` / `not` / `xor` | `&&`, `\|\|`, `!`, `!==` |
| `strings.padStart` / `padEnd` | `String.prototype.padStart` / `padEnd` |
| `strings.replaceString` | `String.prototype.replaceAll` |
| `arrays.first` / `last` | `arr.at(0)` / `arr.at(-1)` |
| `arrays.flatten` | `arr.flat()` |
| `arrays.groupBy` | `Object.groupBy` |
| `numbers.isInteger` / `isFiniteNumber` | `Number.isInteger` / `Number.isFinite` |
| `numbers.min` / `max` | `Math.min(...ns)` / `Math.max(...ns)` |
| `objects.deepClone` | `structuredClone` — it was a one-line passthrough |
| `json.deepCloneJson` | `structuredClone`, which does not lose `Date`s |
| `uuid.getUUID` | `crypto.randomUUID()` |

**This reverses the `isBoolean` row below**, which recorded that `./boolean`
keeps `and`, `or`, `not` and `xor`. That was inconsistent with the `./math`
deletion three sections up: `add(a, b)` was cut because `a + b` is shorter and
clearer, and `and(a, b)` is the same trade for `a && b`. The argument for
keeping them — that named operators can be passed as values to `reduce` or
`pipe` — is real but rare, and an arrow function covers it at the one call site
that needs it. `toBoolean` stays: coercing `'false'` to `false` is genuine
behaviour, not an operator in disguise.

`uuid.getUUID` removes no dependency — `uuid` is still needed for v7, `parse`,
`stringify` and version-aware validation. It goes for consistency with the rest
of the table, not for weight.

## Modules deliberately kept apart

### `./logger` and `./logging` stay separate

This one **deviates from the initial plan to fold `logger` into `logging`**, and
the reason is a dependency boundary rather than a naming one:

- `./logger` exports a configured **pino** instance. It pulls `pino` (a runtime
  dependency) and probes for the optional `pino-pretty`.
- `./logging` is `console` helpers — `info`, `warn`, `error`, `logWithTimestamp`,
  `captureConsole` — with **zero runtime imports**.

Folding them would make every `import { captureConsole } from '.../logging'`
drag pino into the consumer's bundle. The subpath split is what keeps that cost
opt-in, which is the whole point of shipping a subpath per module instead of
one barrel.

The names are admittedly close. The distinction to remember: **`./logger` is a
thing** (one configured logger), **`./logging` is a set of actions** (console
helpers). If a rename happens later it should be `./logging` → `./console-log`,
and it is a separate decision from this one.

### `./date`, `./datetime`, `./time`

Kept as three, because they answer three different questions — a calendar day,
an instant, and a time of day. Their overlaps were name collisions, not a case
for merging; those are resolved below.

### `./errors` and `./try`

Already settled before this record: `errors.tryCatch` was renamed
`tryWithFallback` in 2.0, leaving `try.tryCatch` (the `Result`-pattern helper)
as the only `tryCatch` in the package. No further change.

## Name collisions resolved

Thirteen names were exported from two modules each. **Owner** keeps the name;
**removed from** loses its copy.

### Where the two copies behaved differently

These are the dangerous ones — same name, interchangeable-looking signature,
different answers.

| Name | Owner | Removed from | Why this owner |
|---|---|---|---|
| `formatDate` | `./date` | `./formatting` | `date` is UTC (`toISOString`), `formatting` was local — near midnight they disagreed on the day. UTC is the defensible default for a date stamp |
| `once` | `./functions` | `./events` → renamed `onceEvent` | Genuinely two functions: `functions.once(fn)` memoises a call, `events.once(target, type)` awaits an event. Neither is wrong, so the event one is renamed rather than deleted |
| `getProcessUptime` | `./process` | `./node` | `process` returns `number \| undefined` behind a guard; `node` assumed `process` exists and returned `number` |
| `randomString` | `./random` | `./strings` | `random` defaults its charset and draws via `randomInt`; the `strings` copy **required** a charset and called `Math.random()` directly |
| `unescapeHtml` | `./html` | `./strings` | The `strings` implementation decoded `&#x27;`, `&#x2F;` and `&nbsp;` and the `html` one did not — so `html` keeps the name but **adopts the `strings` implementation** |
| `secondsBetween` | `./time` | `./datetime` | `time` accepts `string \| Date`; `datetime` accepted only `Date` |
| `formatNumber` | `./i18n` | `./formatting` | `i18n` takes a locale and full `Intl.NumberFormat` options; `formatting` hardcoded `en-US` |
| `pluralize` | `./strings` | `./i18n` | `strings` accepts an explicit plural form for irregular words; `i18n` only appended `s` |

### Where the two copies were identical

No behaviour change for anyone importing from the owner.

| Name | Owner | Removed from | Note |
|---|---|---|---|
| `roundTo` | `./numbers` | `./currency` | byte-identical |
| `stripScriptish` | `./security` | `./strings` | byte-identical; sanitising is a security concern. Called `sanitizeString` before 3.0 — renamed because the old name promised a guarantee it never delivered, see [#201](https://github.com/rtorcato/js-common/issues/201) |
| `isBoolean` | `./validation` | `./boolean` | identical; belongs with the `is*` family. `./boolean` kept the logic operators at the time — 4.0 removed them, see below |
| `escapeHtml` | `./html` | `./strings` | different implementations, same output |
| `formatTime` | `./time` | `./formatting` | both local `HH:MM:SS` |

## Near-duplicates resolved

Different names for the same function — invisible to a collision check, and the
reason an audit was worth doing at all.

| Kept | Removed | Note |
|---|---|---|
| `random.randomInt` | `numbers.getRandomInt` | identical bodies |
| `random.randomFloat` | `numbers.getRandomFloat` | identical bodies |
| `html.stripHtmlTags` | `strings.stripHtml` | identical bodies |
| `time.pad2` | `formatting.padZero` | `strings.padStart` covers the general case |
| `datetime.formatDateTimeLocal` | `formatting.formatDateTime` | identical output |

## Near-duplicates collapsed, not removed

The four pairs that outlived the 3.0 audit ([#239](https://github.com/rtorcato/js-common/issues/239)).
Removing an export needs a major, and a major spent only on deleting aliases costs
every consumer a version bump for nothing they asked for. So three of the four were
**collapsed instead**: the loser keeps its name and delegates to the winner, marked
`@deprecated` with the replacement named.

| Winner | Delegating alias | Why this owner |
|---|---|---|
| `emails.isValidEmail` | `validation.isEmail` | `./emails` is the subject-matter home, as `pluralize` went to `./strings` over `./i18n` |
| `url.isValidUrl` | `validation.isUrl` | `./url` owns it, same reasoning |
| `process.getProcessPlatform` | `os.getOsPlatform` | follows the `getProcessUptime` precedent above — guarded `process` access belongs to `./process` |

This is non-breaking, so it ships as an ordinary release: one implementation, one
place to fix a bug, and the editor strikes the alias through at the call site so
callers migrate on their own schedule. **Deleting the three aliases is still the end
state** — it just rides along with whatever major happens next for a real reason,
rather than forcing one.

The build hoists a delegated body into a shared chunk rather than copying it, so an
alias costs nothing at consumer bundle size: `validation` and `emails` share
`chunk-BTQDSDRX`, `os` and `process` share `chunk-HFYUD75W`.

**One pair is deliberately left alone.** `crypto.randomHex` (default 16 bytes) and
`security.generateSecureToken` (default 32) have identical bodies but different
defaults, so delegating either direction silently halves or doubles the token length
its callers get. It stays on the `ACCEPTED_DUPLICATES` allowlist in
`scripts/check-readme-exports.mjs` until someone picks a winner *and* accepts that
behaviour change — a judgement call, not a mechanical one.

Why collapse rather than leave them duplicated: check 4 fires on *identical* bodies,
so it never protected these. The moment someone "simplified" one copy the bodies
would diverge and the check would go **quiet** — which is precisely how the email
pair's ReDoS rationale (domain parts exclude `.` so the match stays linear on
`'a@!.!.!.!.'`, CodeQL `js/polynomial-redos`) could have been lost from one copy
without anything failing.

## Queued for the next major

Nothing here justifies a major on its own; all of it rides along with the next one
that happens for a real reason.

- **Drop `"."` from `exports`** ([#259](https://github.com/rtorcato/js-common/issues/259)).
  The root resolves to an empty module today, so `import * as m from '@rtorcato/js-common'`
  binds nothing and fails later at the call site, wherever `m.chunk(...)` is eventually
  called. (A named `import { chunk }` does at least fail at import time.) Removing the
  subpath makes both forms fail loudly at resolve time
  (`ERR_PACKAGE_PATH_NOT_EXPORTED`) instead. Re-exporting every
  module from the root was the alternative and is rejected: it hands root importers the
  whole library and defeats the per-concern subpaths this file exists to protect.
- **Delete the three deprecated aliases** — `validation.isEmail`, `validation.isUrl`,
  `os.getOsPlatform` (see above).

## What this freezes

Once this record lands, **module paths and export names are frozen**. Moving a
helper between modules after 1.0 is a breaking change for every consumer that
imported it, so from here it needs a major version and an entry in
`CHANGELOG.md`.

Adding a *new* helper to an existing module is not covered by the freeze and
stays ordinary work — but it inherits the rule at the top: check that the name is
not already exported somewhere else first.

`scripts/check-readme-exports.mjs` enforces that in CI so it does not rest on
reviewer vigilance. It fails the build on five things:

1. A `package.json#exports` subpath missing from the README's
   `## Available Modules` section, or a module listed there that is not exported.
2. **An export name reachable from two different subpaths** — the rule at the top
   of this record.
3. An `import { … } from '@rtorcato/js-common/<module>'` sample anywhere in
   `README.md` or `apps/docs/docs/**` naming something that module does not
   export.
4. Two subpaths exporting a function with the same body — the near-duplicate
   rule, which check 2 is blind to because the names differ.
5. A markdown table row that names a subpath and then lists a backticked name
   that subpath does not export. Summary tables carry no import sample, so
   check 3 never sees them — that is how five removed exports outlived 4.0
   (#243). Generated blocks are exempt; they are rewritten from the source.

Docs that quote a removed API on purpose — the "before" half of a migration
snippet — opt out by putting `boundary-check: ignore` inside the fenced block.
For check 5 the opt-out is an `<!-- boundary-check: ignore -->` comment anywhere
in the file, which exempts the whole file: a migration guide is tables of removed
names top to bottom. Use either only for content that is *meant* to be
historical; neither is a way to park a broken example.
