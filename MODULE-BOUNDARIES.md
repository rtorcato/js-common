# Module boundaries

**Status:** accepted during beta · settles [#174](https://github.com/rtorcato/js-common/issues/174)

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
opt-in, which is the whole point of shipping 44 subpaths instead of one barrel.

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
| `sanitizeString` | `./security` | `./strings` | byte-identical; sanitising is a security concern |
| `isBoolean` | `./validation` | `./boolean` | identical; belongs with the `is*` family. `./boolean` keeps the logic operators (`and`, `or`, `not`, `xor`, `toBoolean`) |
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

## What this freezes

Once this record lands, **module paths and export names are frozen**. Moving a
helper between modules after 1.0 is a breaking change for every consumer that
imported it, so from here it needs a major version and an entry in
`CHANGELOG.md`.

Adding a *new* helper to an existing module is not covered by the freeze and
stays ordinary work — but it inherits the rule at the top: check that the name is
not already exported somewhere else first. `scripts/check-readme-exports.mjs`
catches drift between the README and `package.json`; it does not catch a name
exported from two modules, so that check stays a review responsibility.
