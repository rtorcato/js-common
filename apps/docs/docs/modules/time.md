---
title: Time
description: Thin native-Date time helpers — HH:MM:SS formatting, parsing, seconds-between, and compact elapsed labels.
---

**Runtime:** any — Node.js ≥ 24 or a modern browser

A minimal set of time-of-day helpers built on the native `Date`. No locale-aware formatting, no duration arithmetic, no timezone math.

:::note Intentionally minimal
The `date`, `time`, and `datetime` modules cover everyday native-`Date` work and nothing more. If you need locale-aware formatting, parsing arbitrary formats, durations, calendars, or timezone math, use a dedicated library:

- [**date-fns**](https://date-fns.org/) — modular, tree-shakeable, immutable
- [**dayjs**](https://day.js.org/) — 2 KB Moment-style API
- [**luxon**](https://moment.github.io/luxon/) — IANA timezones, Intl-based formatting, durations

These are stable, well-maintained, and far better than anything a thin helper set can offer.
:::

## Example

```ts
import { formatTime, nowTime, parseTime, secondsBetween } from '@rtorcato/js-common/time'

// Opening hours, stored as plain 'HH:MM:SS' strings.
const open = parseTime('09:00:00')
const close = parseTime('17:30:00')

secondsBetween(open, close) // 30600 — signed, floored (t2 - t1)
formatTime(close)           // '17:30:00'
nowTime()                   // '14:22:07'
```

`parseTime` puts the time on today's date, so comparisons are only meaningful within one day.

## Elapsed time

`formatElapsed` turns milliseconds into a short "how long ago" label, for example "last seen 5m ago":

```ts
import { formatElapsed } from '@rtorcato/js-common/time'

formatElapsed(45_000)                    // '45s'
formatElapsed((3 * 60 + 5) * 60_000)     // '3h 5m'
formatElapsed(2 * 24 * 3600_000 + 5 * 3600_000) // '2d' — days drop the leftover hours
```

Under a minute it shows seconds, under an hour minutes, under a day hours (with leftover minutes, if any), then days. Negative input counts as 0.

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { formatElapsed, formatTime, nowTime } from '@rtorcato/js-common/time'
```

## Exports

| Name | Summary |
| --- | --- |
| `formatElapsed` | Formats an elapsed time in milliseconds as a compact label: `45s`, `12m`, `3h 5m`, `2h`, `2d`. |
| `formatTime` | Formats a Date object as `HH:MM:SS`. |
| `nowTime` | Returns the current time as an `HH:MM:SS` string. |
| `nowTimeShort` | Returns the current time as HH:MM string. |
| `pad2` | Pads a number to two digits (e.g. `5` → `'05'`). |
| `parseTime` | Parses a time string (`HH:MM` or `HH:MM:SS`) into a Date object (today's date). |
| `secondsBetween` | Returns the difference in seconds between two times (as Date or string). |

<!-- /generated:exports -->

## See also

- [date](./date.md) — calendar-day helpers — add, diff, compare, format
- [datetime](./datetime.md) — ISO strings, ISO weeks and Unix timestamps
- [i18n](./i18n.md) — locale-aware number/date formatting and translation
