---
title: Time
description: Thin native-Date time helpers — HH:MM:SS formatting, parsing, and seconds-between.
---

A minimal set of time-of-day helpers built on the native `Date`. No locale-aware formatting, no durations, no timezone math.

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

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { formatTime, nowTime, nowTimeShort } from '@rtorcato/js-common/time'
```

## Exports

| Name | Summary |
| --- | --- |
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
- [interval](./interval.md) — run something repeatedly on a timer
- [i18n](./i18n.md) — locale-aware number/date formatting and translation
