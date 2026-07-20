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

## Import

```ts
import {
  formatDateTimeLocal,
  getIsoWeek,
  getIsoWeekInfo,
  getTimezoneOffset,
  nowIso,
  parseIsoDateTime,
  secondsBetween,
  toUtcDate,
  unixMillis,
  unixTimestamp,
} from '@rtorcato/js-common/datetime'
```

## Exports

| Name | Summary |
| --- | --- |
| `formatDateTimeLocal` | Formats a Date as `YYYY-MM-DD HH:mm:ss` (local time). |
| `getIsoWeek` | Returns the ISO week number (1–53) of a date (UTC). |
| `getIsoWeekInfo` | Returns ISO week number and ISO week year (may differ from calendar year). |
| `getTimezoneOffset` | Returns the timezone offset in minutes for a date (local − UTC). |
| `nowIso` | Returns the current date and time as an ISO string. |
| `parseIsoDateTime` | Parses an ISO date-time string to a Date object. |
| `secondsBetween` | Returns the difference in seconds between two Date objects. |
| `toUtcDate` | Returns the UTC equivalent of a local Date. |
| `unixMillis` | Returns the number of milliseconds since the Unix epoch. |
| `unixTimestamp` | Returns the number of seconds since the Unix epoch (UTC). |

## Full reference

See the [`datetime` API reference](../api/datetime) for individual function signatures.
