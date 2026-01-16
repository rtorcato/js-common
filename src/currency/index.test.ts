import { describe, expect, it } from 'vitest'
import {
	convertCurrency,
	formatPrice,
	formatPriceCompact,
	getCurrencyLocale,
	getCurrencyName,
	getCurrencySymbol,
	isValidCurrency,
	isValidCurrencyCode,
	parseCurrencyString,
	parsePrice,
	roundTo,
} from './index'

describe('currency module', () => {
	describe('getCurrencySymbol', () => {
		it('returns correct symbol for common currencies', () => {
			expect(getCurrencySymbol('USD')).toBe('$')
			expect(getCurrencySymbol('EUR')).toBe('€')
			expect(getCurrencySymbol('JPY')).toBe('¥')
			expect(getCurrencySymbol('GBP')).toBe('£')
		})

		it('returns undefined for invalid currencies', () => {
			expect(getCurrencySymbol('XXX')).toBeUndefined()
			expect(getCurrencySymbol('INVALID')).toBeUndefined()
		})
	})

	describe('getCurrencyName', () => {
		it('returns full currency name', () => {
			expect(getCurrencyName('USD')).toBe('US Dollar')
			expect(getCurrencyName('EUR')).toBe('Euro')
			expect(getCurrencyName('GBP')).toBe('British Pound')
		})

		it('returns undefined for invalid currencies', () => {
			expect(getCurrencyName('INVALID')).toBeUndefined()
		})
	})

	describe('getCurrencyLocale', () => {
		it('returns correct locale for currencies', () => {
			expect(getCurrencyLocale('USD')).toBe('en-US')
			expect(getCurrencyLocale('EUR')).toBe('de-DE')
			expect(getCurrencyLocale('JPY')).toBe('ja-JP')
			expect(getCurrencyLocale('GBP')).toBe('en-GB')
		})

		it('returns en for unknown currencies', () => {
			expect(getCurrencyLocale('UNKNOWN')).toBe('en')
		})
	})

	describe('formatPrice', () => {
		it('formats price as currency', () => {
			expect(formatPrice(1234.56, 'USD')).toMatch(/\$1,234\.56/)
			expect(formatPrice('1000', 'EUR')).toContain('1')
		})

		it('uses currency default locale', () => {
			const jpyFormatted = formatPrice(1000, 'JPY')
			// Unicode yen symbols: U+00A5 (¥) or U+FFE5 (￥)
			expect(jpyFormatted).toMatch(/[¥￥]/)
		})
	})

	describe('formatPriceCompact', () => {
		it('formats large numbers in compact notation', () => {
			expect(formatPriceCompact(1234, 'USD')).toMatch(/\$1\.?2?K/i)
			expect(formatPriceCompact(1234567, 'USD')).toMatch(/\$1\.?2?M/i)
		})

		it('handles small numbers', () => {
			expect(formatPriceCompact(100, 'USD')).toContain('$')
		})
	})

	describe('parsePrice', () => {
		it('parses US format price strings', () => {
			expect(parsePrice('$1,234.56')).toBeCloseTo(1234.56)
			expect(parsePrice('1234.56')).toBeCloseTo(1234.56)
		})

		it('parses European format price strings', () => {
			expect(parsePrice('€1.234,56')).toBeCloseTo(1234.56)
		})

		it('returns null for invalid strings', () => {
			expect(parsePrice('not a number')).toBeNull()
		})
	})

	describe('parseCurrencyString', () => {
		it('parses currency strings with symbols', () => {
			const usd = parseCurrencyString('$1,234.56')
			expect(usd?.amount).toBeCloseTo(1234.56)
			expect(usd?.currency).toBe('USD')

			const eur = parseCurrencyString('€100')
			expect(eur?.amount).toBe(100)
			expect(eur?.currency).toBe('EUR')
		})

		it('parses currency strings with codes', () => {
			const jpy = parseCurrencyString('1000 JPY')
			expect(jpy?.amount).toBe(1000)
			expect(jpy?.currency).toBe('JPY')
		})

		it('returns null for invalid strings', () => {
			expect(parseCurrencyString('invalid')).toBeNull()
		})
	})

	describe('convertCurrency', () => {
		it('converts and rounds correctly', () => {
			expect(convertCurrency(100, 1.2)).toBe(120)
			expect(convertCurrency(100, 1.2345, 3)).toBeCloseTo(123.45, 2)
		})

		it('handles zero decimals', () => {
			expect(convertCurrency(100, 110.5, 0)).toBe(11050)
		})
	})

	describe('isValidCurrencyCode (async)', () => {
		it('validates currency codes from list', async () => {
			expect(await isValidCurrencyCode('usd')).toBe(true)
			expect(await isValidCurrencyCode('EUR')).toBe(true)
			expect(await isValidCurrencyCode('xxx')).toBe(true)
			expect(await isValidCurrencyCode('ZZZ')).toBe(false)
		})
	})

	describe('isValidCurrency (sync)', () => {
		it('validates currency codes using Intl API', () => {
			expect(isValidCurrency('USD')).toBe(true)
			expect(isValidCurrency('EUR')).toBe(true)
			expect(isValidCurrency('INVALID')).toBe(false)
		})
	})

	describe('roundTo', () => {
		it('rounds to given decimals', () => {
			expect(roundTo(1.23456)).toBe(1.23)
			expect(roundTo(1.235, 2)).toBe(1.24)
			expect(roundTo(1.2, 0)).toBe(1)
		})
	})
})
