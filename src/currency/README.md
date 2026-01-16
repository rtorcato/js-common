# Currency Module

A lightweight, tree-shakable currency utilities module with **lazy loading** for optimal bundle size.

## Features

- 🚀 **Lazy Loading** - Currency list is only loaded when needed
- 🌍 **Intl API** - Uses native browser APIs for accurate formatting
- 📦 **Zero Config** - Works out of the box with sensible defaults
- 🔧 **TypeScript** - Full type support

## Installation

```typescript
import {
  getCurrencySymbol,
  getCurrencyName,
  formatPrice,
  formatPriceCompact,
  parsePrice,
  parseCurrencyString,
  convertCurrency,
  isValidCurrency,
  isValidCurrencyCode,
  roundTo,
} from '@rtorcato/js-common/currency'
```

## API Reference

### `getCurrencySymbol(currency: string): string | undefined`

Returns the currency symbol for a given ISO 4217 currency code.

```typescript
getCurrencySymbol('USD') // '$'
getCurrencySymbol('EUR') // '€'
getCurrencySymbol('JPY') // '¥'
getCurrencySymbol('GBP') // '£'
getCurrencySymbol('XXX') // undefined
```

### `getCurrencyName(currency: string, locale?: string): string | undefined`

Returns the full display name of a currency.

```typescript
getCurrencyName('USD')       // 'US Dollar'
getCurrencyName('EUR')       // 'Euro'
getCurrencyName('JPY', 'ja') // '日本円'
```

### `getCurrencyLocale(currency: string): string`

Returns the default locale typically associated with a currency.

```typescript
getCurrencyLocale('USD') // 'en-US'
getCurrencyLocale('EUR') // 'de-DE'
getCurrencyLocale('JPY') // 'ja-JP'
getCurrencyLocale('BRL') // 'pt-BR'
```

### `formatPrice(price: number | string, currency?: string, locale?: string): string`

Formats a price value into a localized currency string.

```typescript
formatPrice(1234.56, 'USD')        // '$1,234.56'
formatPrice(1234.56, 'EUR')        // '1.234,56 €'
formatPrice(1234.56, 'JPY')        // '¥1,235'
formatPrice(1000, 'BRL')           // 'R$ 1.000,00'
formatPrice(1234.56, 'EUR', 'fr')  // '1 234,56 €'
```

### `formatPriceCompact(price: number | string, currency?: string, locale?: string): string`

Formats a price in compact notation for large numbers.

```typescript
formatPriceCompact(1234)       // '$1.2K'
formatPriceCompact(1234567)    // '$1.2M'
formatPriceCompact(1234567890) // '$1.2B'
formatPriceCompact(1500, 'EUR') // '1,5 Tsd. €'
```

### `parsePrice(value: string): number | null`

Parses a price string and returns its numeric value. Handles both US and European formats.

```typescript
parsePrice('$1,234.56')  // 1234.56
parsePrice('€1.234,56')  // 1234.56 (European format)
parsePrice('1000')       // 1000
parsePrice('invalid')    // null
```

### `parseCurrencyString(value: string): { amount: number; currency: string } | null`

Parses a currency string and extracts both the amount and currency code.

```typescript
parseCurrencyString('$1,234.56')  // { amount: 1234.56, currency: 'USD' }
parseCurrencyString('€100')       // { amount: 100, currency: 'EUR' }
parseCurrencyString('1000 JPY')   // { amount: 1000, currency: 'JPY' }
parseCurrencyString('£50.99')     // { amount: 50.99, currency: 'GBP' }
parseCurrencyString('invalid')    // null
```

### `convertCurrency(amount: number, rate: number, decimals?: number): number`

Converts an amount using the provided exchange rate.

```typescript
convertCurrency(100, 0.85)     // 85 (e.g., USD to EUR)
convertCurrency(100, 110.5, 0) // 11050 (e.g., USD to JPY)
convertCurrency(100, 1.35, 3)  // 135.000
```

### `isValidCurrency(code: string): boolean`

Synchronously validates a currency code using the Intl API. **Zero bundle impact.**

```typescript
isValidCurrency('USD')     // true
isValidCurrency('EUR')     // true
isValidCurrency('INVALID') // false
```

### `isValidCurrencyCode(code: string): Promise<boolean>`

Asynchronously validates a currency code against the supported currencies list. Uses lazy loading.

```typescript
await isValidCurrencyCode('USD') // true
await isValidCurrencyCode('XXX') // true (ISO 4217 "no currency")
await isValidCurrencyCode('ZZZ') // false
```

### `roundTo(value: number, decimals?: number): number`

Rounds a number to a specified number of decimal places.

```typescript
roundTo(3.14159)    // 3.14
roundTo(3.14159, 3) // 3.142
roundTo(10.5, 0)    // 11
```

## Supported Currencies

The module includes support for 45+ currencies including:

| Code | Currency |
|------|----------|
| USD | US Dollar |
| EUR | Euro |
| GBP | British Pound |
| JPY | Japanese Yen |
| CNY | Chinese Yuan |
| CAD | Canadian Dollar |
| AUD | Australian Dollar |
| CHF | Swiss Franc |
| INR | Indian Rupee |
| BRL | Brazilian Real |
| ... | [and more](./currencies.ts) |

## Bundle Size Optimization

The module uses **lazy loading** for the currencies list:

```typescript
// ✅ These functions DON'T load the currencies list
getCurrencySymbol('USD')
getCurrencyName('USD')
formatPrice(100, 'USD')
isValidCurrency('USD')

// ⏳ These functions lazy-load the currencies list (once, then cached)
await isValidCurrencyCode('USD')
```

Use `isValidCurrency()` for synchronous validation without any bundle impact.

## Notes

- Currency codes are case-insensitive for validation functions
- The module relies on the `Intl` API which is available in all modern browsers and Node.js
- Exchange rates must be provided externally (this module doesn't fetch live rates)
