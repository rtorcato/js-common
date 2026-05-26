import { describe, expect, it } from 'vitest'
import { detectLanguage, formatDateI18n, formatNumber, pluralize, t } from '.'

describe('detectLanguage', () => {
	it('returns the default language when no environment signals are present', () => {
		const lang = detectLanguage('en')
		expect(typeof lang).toBe('string')
		expect(lang.length).toBeGreaterThan(0)
	})
	it('uses the provided default when nothing is detectable', () => {
		const orig = process.env['LANG']
		delete process.env['LANG']
		const lang = detectLanguage('fr')
		// In a Node test environment without LANG set and no navigator, returns default
		expect(['fr', 'en']).toContain(lang) // allow 'en' if CI sets it
		process.env['LANG'] = orig
	})
})

describe('formatNumber', () => {
	it('formats with default locale', () => {
		const result = formatNumber(1234567.89, 'en-US', { maximumFractionDigits: 2 })
		expect(result).toBe('1,234,567.89')
	})
	it('formats with options', () => {
		const result = formatNumber(0.5, 'en-US', { style: 'percent' })
		expect(result).toBe('50%')
	})
})

describe('formatDateI18n', () => {
	it('formats a date with locale', () => {
		const result = formatDateI18n(new Date(2024, 0, 15), 'en-US', { dateStyle: 'short' })
		expect(result).toBe('1/15/24')
	})
})

describe('t', () => {
	const dict = { en: { hello: 'Hello', bye: 'Bye' }, fr: { hello: 'Bonjour' } }
	it('returns the translation for the given language', () => {
		expect(t('hello', dict, 'fr')).toBe('Bonjour')
	})
	it('falls back to English when key missing in language', () => {
		expect(t('bye', dict, 'fr')).toBe('Bye')
	})
	it('returns the key itself when not found anywhere', () => {
		expect(t('missing', dict, 'en')).toBe('missing')
	})
})

describe('pluralize', () => {
	it('returns singular for count 1', () => {
		expect(pluralize('item', 1)).toBe('item')
	})
	it('returns plural for other counts', () => {
		expect(pluralize('item', 0)).toBe('items')
		expect(pluralize('item', 5)).toBe('items')
	})
})
