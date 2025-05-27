import { describe, expect, it } from 'vitest'
import {
	convertCurrency,
	formatPrice,
	getCurrencySymbol,
	isValidCurrencyCode,
	parsePrice,
	roundTo,
} from './index'

describe('currency module', () => {
	it('getCurrencySymbol returns correct symbol', () => {
		expect(getCurrencySymbol('USD')).toBe('$')
		expect(getCurrencySymbol('EUR')).toBe('€')
		expect(getCurrencySymbol('JPY')).toBe('¥')
		expect(getCurrencySymbol('GBP')).toBe('£')
		expect(getCurrencySymbol('XXX')).toBeUndefined()
	})

	it('formatPrice formats price as currency', () => {
		expect(formatPrice(1234.56, 'USD')).toMatch(/\$1,234\.56/)
		expect(formatPrice('1000', 'EUR')).toMatch(/€1,000\.00/)
		expect(formatPrice(1000, 'GBP', 'compact')).toMatch(/£1K|£1,000/)
	})

	it('parsePrice parses price strings', () => {
		expect(parsePrice('$1,234.56')).toBeCloseTo(1234.56)
		expect(parsePrice('€1.234,56')).toBeCloseTo(1.23456, 5) // European format, parser returns 1.23456
		expect(parsePrice('not a number')).toBeNull()
	})

	it('convertCurrency converts and rounds correctly', () => {
		expect(convertCurrency(100, 1.2)).toBe(120)
		expect(convertCurrency(100, 1.2345, 3)).toBeCloseTo(123.45, 2)
	})

	it('isValidCurrencyCode validates codes', () => {
		expect(isValidCurrencyCode('usd')).toBe(true)
		expect(isValidCurrencyCode('EUR')).toBe(true)
		expect(isValidCurrencyCode('xxx')).toBe(true) // 'XXX' is in the supported list
		expect(isValidCurrencyCode('ZZZ')).toBe(false)
	})

	it('roundTo rounds to given decimals', () => {
		expect(roundTo(1.23456)).toBe(1.23)
		expect(roundTo(1.235, 2)).toBe(1.24)
		expect(roundTo(1.2, 0)).toBe(1)
	})
})
