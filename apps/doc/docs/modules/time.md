---
title: Time
description: Utilities exported from @rtorcato/js-common/time.
---

```ts
import { formatTime, nowTime, nowTimeShort } from '@rtorcato/js-common/time'
```

## Exports

| Name | Summary |
| --- | --- |
| `formatTime` | Formats a Date object as HH:MM:SS. |
| `nowTime` | Returns the current time as HH:MM:SS string. |
| `nowTimeShort` | Returns the current time as HH:MM string. |
| `pad2` | Pads a number to two digits (e.g., 5 -> '05'). |
| `parseTime` | Parses a time string (HH:MM or HH:MM:SS) into a Date object (today's date). |
| `secondsBetween` | Returns the difference in seconds between two times (as Date or string). |
