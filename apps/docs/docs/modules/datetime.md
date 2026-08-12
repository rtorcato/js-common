---
title: Datetime
description: Thin native-Date helpers for ISO datetimes, ISO weeks, timezone offsets, and Unix timestamps.
---

A minimal set of combined date+time helpers built on the native `Date` — ISO formatting, ISO week numbers, timezone offset, Unix timestamps.

:::note Intentionally minimal
The `date`, `time`, and `datetime` modules cover everyday native-`Date` work and nothing more. If you need locale-aware formatting, parsing arbitrary formats, durations, calendars, or timezone math, use a dedicated library:

- [**date-fns**](https://date-fns.org/) — modular, tree-shakeable, immutable
- [**dayjs**](https://day.js.org/) — 2 KB Moment-style API
- [**luxon**](https://moment.github.io/luxon/) — IANA timezones, Intl-based formatting, durations

These are stable, well-maintained, and far better than anything a thin helper set can offer.
:::

## Example

```ts
import { getIsoWeek, nowIso, unixTimestamp } from '@rtorcato/js-common/datetime'
import { secondsBetween } from '@rtorcato/js-common/time'

const started = new Date()
const row = {
  createdAt: nowIso(),                  // '2026-06-12T09:04:07.123Z'
  expiresAt: unixTimestamp() + 3600,    // seconds, for a JWT `exp`
}

await handleRequest()
secondsBetween(started, new Date()) // elapsed seconds, floored (b - a)

getIsoWeek(new Date('2026-01-01')) // 1
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { formatDateTimeLocal, getIsoWeek, getIsoWeekInfo } from '@rtorcato/js-common/datetime'
```

## Exports

| Name | Summary |
| --- | --- |
| `formatDateTimeLocal` | Formats a Date as `YYYY-MM-DD HH:mm:ss` (local time). |
| `getIsoWeek` | Returns the ISO week number (1–53) of a given date using UTC. |
| `getIsoWeekInfo` | Returns ISO week number and ISO week year (which may differ from calendar year). |
| `getTimezoneOffset` | Returns the timezone offset in minutes for a given date (local − UTC). |
| `nowIso` | Returns the current date and time as an ISO string (`YYYY-MM-DDTHH:mm:ss.sssZ`). |
| `parseIsoDateTime` | Parses an ISO date-time string to a Date object. |
| `toUtcDate` | Returns the UTC equivalent of a local Date. |
| `unixMillis` | Returns the number of milliseconds since the Unix epoch. |
| `unixTimestamp` | Returns the number of seconds since the Unix epoch (UTC). |

<!-- /generated:exports -->

## See also

- [date](./date.md) — calendar-day helpers — add, diff, compare, format
- [time](./time.md) — time-of-day parsing, `HH:MM:SS` formatting and `secondsBetween`
- [interval](./interval.md) — run something repeatedly on a timer
- [i18n](./i18n.md) — locale-aware number/date formatting and translation
