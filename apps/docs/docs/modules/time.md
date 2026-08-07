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

## Import

```ts
import {
  formatTime,
  nowTime,
  nowTimeShort,
  pad2,
  parseTime,
  secondsBetween,
} from '@rtorcato/js-common/time'
```

## Exports

| Name | Summary |
| --- | --- |
| `formatTime` | Formats a Date object as HH:MM:SS. |
| `nowTime` | Returns the current time as HH:MM:SS string. |
| `nowTimeShort` | Returns the current time as HH:MM string. |
| `pad2` | Pads a number to two digits (e.g. `5` → `'05'`). |
| `parseTime` | Parses a time string (`HH:MM` or `HH:MM:SS`) into a Date object (today's date). |
| `secondsBetween` | Returns the difference in seconds between two times (Date or string). |

## Full reference

See the [`time` API reference](../api/time) for individual function signatures.
