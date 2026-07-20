---
title: Currency
description: Utilities exported from @rtorcato/js-common/currency.
---

```ts
import { convertCurrency, formatPrice, formatPriceCompact } from '@rtorcato/js-common/currency'
```

## Exports

| Name | Summary |
| --- | --- |
| `convertCurrency` | Converts a given amount from one currency to another using the provided exchange rate. |
| `formatPrice` | Formats a given price value into a localized currency string. |
| `formatPriceCompact` | Formats a price in compact notation (e.g., $1.2K, $1.5M). |
| `getCurrencyLocale` | Returns the default locale typically associated with a currency. |
| `getCurrencyName` | Returns the full display name of a currency. |
| `getCurrencySymbol` | Lazily loads the currencies list to reduce bundle size. |
| `isValidCurrency` | Synchronously checks if a currency code is valid using the Intl API. |
| `isValidCurrencyCode` | Checks if the provided currency code is valid. |
| `parseCurrencyString` | Parses a currency string and extracts both the amount and currency code. |
| `parsePrice` | Parses a given price string and returns its numeric value. |
| `roundTo` | Rounds a given number to a specified number of decimal places. |
