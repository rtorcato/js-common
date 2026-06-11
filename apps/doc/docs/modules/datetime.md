---
title: Datetime
description: Utilities exported from @rtorcato/js-common/datetime.
---

```ts
import { formatDateTimeLocal, getIsoWeek, getIsoWeekInfo } from '@rtorcato/js-common/datetime'
```

## Exports

| Name | Summary |
| --- | --- |
| `formatDateTimeLocal` | Formats a Date as YYYY-MM-DD HH:mm:ss (local time). |
| `getIsoWeek` | Returns the ISO week number (1–53) of a given date using UTC. |
| `getIsoWeekInfo` | Returns ISO week number and ISO week year (which may differ from calendar year). |
| `getTimezoneOffset` | Returns the timezone offset in minutes for a given date (local - UTC). |
| `nowIso` | Returns the current date and time as an ISO string (YYYY-MM-DDTHH:mm:ss.sssZ). |
| `parseIsoDateTime` | Parses an ISO date-time string to a Date object. |
| `secondsBetween` | Returns the difference in seconds between two Date objects. |
| `toUtcDate` | Returns the UTC equivalent of a local Date. |
| `unixMillis` | Returns the number of milliseconds since the Unix epoch. |
| `unixTimestamp` | Returns the number of seconds since the Unix epoch (UTC). |
