import { afterEach, describe, expect, it, vi } from 'vitest'
import { detectLanguage, formatDateI18n, formatNumber, t } from '.'

describe('detectLanguage', () => {
	const originalLang = process.env['LANG']

	afterEach(() => {
		vi.unstubAllGlobals()
		if (originalLang === undefined) delete process.env['LANG']
		else process.env['LANG'] = originalLang
	})

	it('prefers navigator.language and strips the region subtag', () => {
		vi.stubGlobal('navigator', { language: 'en-GB' })
		expect(detectLanguage('fr')).toBe('en')
	})

	it('falls back to the LANG environment variable outside the browser', () => {
		vi.stubGlobal('navigator', undefined)
		process.env['LANG'] = 'fr_FR.UTF-8'
		expect(detectLanguage('en')).toBe('fr')
	})

	it('uses the provided default when nothing is detectable', () => {
		vi.stubGlobal('navigator', undefined)
		delete process.env['LANG']
		expect(detectLanguage('fr')).toBe('fr')
	})

	it('defaults to "en" when no default is given', () => {
		vi.stubGlobal('navigator', undefined)
		delete process.env['LANG']
		expect(detectLanguage()).toBe('en')
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
