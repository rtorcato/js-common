import { describe, expect, it } from 'vitest'
import { formatDate, formatDateTime, formatNumber, formatPercent, formatTime, padZero } from '.'

describe('padZero', () => {
	it('pads single-digit numbers', () => {
		expect(padZero(5)).toBe('05')
		expect(padZero(0)).toBe('00')
	})
	it('does not pad numbers at or above the length', () => {
		expect(padZero(12)).toBe('12')
		expect(padZero(100, 2)).toBe('100')
	})
	it('accepts a custom length', () => {
		expect(padZero(7, 4)).toBe('0007')
	})
	it('accepts string input', () => {
		expect(padZero('3')).toBe('03')
	})
})

describe('formatNumber', () => {
	it('formats with thousands separators', () => {
		expect(formatNumber(1000000)).toBe('1,000,000')
	})
	it('accepts a locale', () => {
		expect(formatNumber(1000, 'de-DE')).toBe('1.000')
	})
})

describe('formatPercent', () => {
	it('formats a decimal as percent', () => {
		expect(formatPercent(0.25)).toBe('25%')
		expect(formatPercent(1)).toBe('100%')
	})
	it('respects fractionDigits', () => {
		expect(formatPercent(0.1234, 2)).toBe('12.34%')
	})
})

describe('formatDate', () => {
	it('formats as YYYY-MM-DD', () => {
		expect(formatDate(new Date(2024, 0, 5))).toBe('2024-01-05')
	})
	it('pads month and day', () => {
		expect(formatDate(new Date(2024, 8, 3))).toBe('2024-09-03')
	})
})

describe('formatTime', () => {
	it('formats as HH:MM:SS', () => {
		expect(formatTime(new Date(2024, 0, 1, 9, 5, 3))).toBe('09:05:03')
	})
})

describe('formatDateTime', () => {
	it('combines date and time', () => {
		expect(formatDateTime(new Date(2024, 0, 5, 9, 5, 3))).toBe('2024-01-05 09:05:03')
	})
})
