---
title: Formatting
description: Utilities exported from @rtorcato/js-common/formatting.
---

Display formatting with predictable, fixed-shape output — thousands separators, percentages, zero padding, and `YYYY-MM-DD` / `HH:MM:SS` timestamps. The date and time helpers take no format string and the number helpers default to `en-US`, which is the point: this module is for logs, filenames and CSVs, where output should not shift with the machine's locale. When the reader's locale does matter, use `i18n` or `currency`, which go through `Intl`.

```ts
import { formatDate, formatDateTime, formatNumber } from '@rtorcato/js-common/formatting'
```

## Exports

| Name | Summary |
| --- | --- |
| `formatDate` | Formats a Date as YYYY-MM-DD. |
| `formatDateTime` | Formats a Date as YYYY-MM-DD HH:MM:SS. |
| `formatNumber` | Formats a number with thousands separators. |
| `formatPercent` | Formats a number as a percentage string. |
| `formatTime` | Formats a Date as HH:MM:SS. |
| `padZero` | Pads a string or number with leading zeros to a given length. |

## See also

- [strings](./strings.md) — slugify, truncate, casing, emoji stripping
- [numbers](./numbers.md) — sum, average, clamp, roundTo
- [date](./date.md) — calendar-day helpers — add, diff, compare, format
- [currency](./currency.md) — price formatting, parsing and currency codes
