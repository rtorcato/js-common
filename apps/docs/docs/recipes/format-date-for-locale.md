---
title: Format a date for a user's locale
description: Turn an ISO timestamp from an API into a string a reader recognises — relative for recent dates, locale-aware otherwise.
---

An API hands you `"2026-06-12T14:30:00Z"`. A reader wants either "yesterday" or
"12 June 2026 at 15:30" — never the raw ISO string, and never a US format for a
German visitor.

Three modules cover it: [`datetime`](../modules/datetime.md) parses the string,
[`date`](../modules/date.md) decides whether it is recent enough for a relative
label, and [`i18n`](../modules/i18n.md) formats the rest through `Intl`.

## The code

```ts
import { daysBetween, formatRelative } from '@rtorcato/js-common/date'
import { parseIsoDateTime } from '@rtorcato/js-common/datetime'
import { formatDateI18n } from '@rtorcato/js-common/i18n'

/**
 * Formats an ISO timestamp for display.
 * Returns `null` for input that is not a valid date, so the caller decides
 * what to render instead of getting "Invalid Date" in the UI.
 */
export function formatTimestamp(iso: string, locale?: string, now = new Date()): string | null {
  const date = parseIsoDateTime(iso)
  if (!date) return null

  // Yesterday / today / tomorrow read better than a full date.
  if (Math.abs(daysBetween(date, now)) <= 1) return formatRelative(date, now)

  return formatDateI18n(date, locale, { dateStyle: 'long', timeStyle: 'short' })
}
```

```ts
formatTimestamp('2026-06-11T14:30:00Z', 'en-GB', new Date('2026-06-12T09:00:00Z'))
// "yesterday"

formatTimestamp('2026-06-12T14:30:00Z', 'en-GB', new Date('2026-08-01T09:00:00Z'))
// "12 June 2026 at 15:30"

formatTimestamp('2026-06-12T14:30:00Z', 'de-DE', new Date('2026-08-01T09:00:00Z'))
// "12. Juni 2026 um 16:30"

formatTimestamp('not a date')
// null
```

## Picking the locale

Passing `locale` explicitly is the reliable option — take it from the user's
account settings, an `Accept-Language` header, or the route.

If you have nothing, `detectLanguage()` gives you a fallback:

```ts
import { detectLanguage } from '@rtorcato/js-common/i18n'

const locale = user.locale ?? detectLanguage() // "en" if nothing is detectable
formatTimestamp(iso, locale)
```

:::caution `detectLanguage` drops the region
It returns the language only — a `navigator.language` of `"en-GB"` becomes
`"en"`, so dates format as US English. In the browser, prefer
`navigator.language` directly when the region matters; use `detectLanguage()`
for its `defaultLang` fallback on the server.
:::

Leaving `locale` as `undefined` is also valid: `Intl` then uses the runtime's
default locale. That is the right call in a browser and the wrong one on a
server, where the runtime locale is the machine's, not the reader's.

## Timezones

`Intl.DateTimeFormat` formats in the runtime's timezone unless you say
otherwise. On a server that is usually UTC, which is rarely what the reader
wants. Pass the zone through when you know it:

```ts
formatDateI18n(date, 'en-GB', {
  dateStyle: 'long',
  timeStyle: 'short',
  timeZone: user.timeZone, // e.g. "Europe/Berlin"
})
```

For anything beyond formatting — timezone arithmetic, durations, parsing
non-ISO formats — reach for [luxon](https://moment.github.io/luxon/) or
[date-fns](https://date-fns.org/). The `date`/`datetime` modules are
deliberately thin.

## Numbers travel with dates

The same `Intl` treatment applies to any number rendered next to that date:

```ts
import { formatNumber } from '@rtorcato/js-common/i18n'

formatNumber(1234.56, 'de-DE') // "1.234,56"
formatNumber(0.42, 'en-US', { style: 'percent' }) // "42%"
```

## See also

- [datetime](../modules/datetime.md) — ISO parsing, ISO weeks and Unix timestamps
- [date](../modules/date.md) — calendar-day helpers — add, diff, compare, format
- [i18n](../modules/i18n.md) — `Intl` wrappers for dates, numbers and language detection
- [currency](../modules/currency.md) — price formatting and currency codes
