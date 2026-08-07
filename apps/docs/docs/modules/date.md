---
title: Date
description: Thin native-Date helpers — formatting, math, comparisons, relative strings.
sidebar_position: 2
---

A small set of native-`Date` helpers — no third-party date dependency, no parsing of arbitrary formats, no timezone math beyond what the platform already provides. Use these for everyday date work; reach for `date-fns`/`dayjs`/`luxon` if you need locale-aware formatting or rich timezone handling.

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
  today,
  parseDate,
  formatDate,
  daysBetween,
  diffInHours,
  diffInMinutes,
  isLeapYear,
  addDays,
  subDays,
  addMonths,
  getDayOfWeek,
  startOfDay,
  endOfDay,
  isWeekend,
  isSameDay,
  isToday,
  formatRelative,
} from '@rtorcato/js-common/date'
```

## Formatting & parsing

```ts
today()                                 // "2026-06-12"
parseDate('2026-05-28')                 // Date — local-time midnight
formatDate(new Date())                  // "2026-06-12" (UTC YYYY-MM-DD)
```

`formatDate` takes a `Date` only — there is no format-string argument. The output is always `YYYY-MM-DD` in UTC.

## Day math

```ts
addDays('2026-01-01', 5)                // Date — Jan 6
subDays('2026-01-10', 5)                // Date — Jan 5
addMonths('2026-01-15', 2)              // Date — Mar 15
```

## Differences

```ts
daysBetween('2026-01-01', '2026-05-28')           // 147
diffInHours(a, b)                                 // hours between (b - a)
diffInMinutes(a, b)                               // minutes between (b - a)
```

All three return signed integers (`date2 - date1`, floored).

## Boundaries

```ts
startOfDay(new Date())                  // 00:00:00.000 local time
endOfDay(new Date())                    // 23:59:59.999 local time
```

## Comparisons

```ts
isLeapYear(2024)                        // true
isWeekend('2026-06-13')                 // true (Saturday)
isSameDay('2026-06-12', new Date())     // true if today is Jun 12
isToday(new Date())                     // true
getDayOfWeek('2026-06-12')              // 5 (Friday — 0=Sun, 6=Sat)
```

## Relative formatting

```ts
formatRelative('2026-06-12')            // "today"
formatRelative('2026-06-13')            // "tomorrow"
formatRelative('2026-06-11')            // "yesterday"
formatRelative('2026-06-15')            // "in 3 days"
formatRelative('2026-06-07')            // "5 days ago"
```

Pass a second `now` argument to compare against a fixed reference date (useful for tests).

## Full reference

See the [`date` API reference](../api/date) for individual function signatures.
