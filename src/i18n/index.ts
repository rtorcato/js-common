/**
 * Detects the user's preferred language from the browser or Node.js environment.
 *
 * @example
 * ```typescript
 * detectLanguage() // 'en' (from navigator.language 'en-GB' or LANG 'en_US.UTF-8')
 * detectLanguage('fr') // 'fr' when nothing can be detected
 * ```
 *
 * @returns {string} The language code (e.g., 'en', 'fr').
 */
export function detectLanguage(defaultLang: string = 'en'): string {
	if (typeof navigator !== 'undefined' && navigator.language) {
		return navigator.language.split('-')[0] || defaultLang
	}
	if (typeof process !== 'undefined' && process.env['LANG']) {
		return ((process.env['LANG'] as string | undefined) ?? 'en').split('_')[0] || defaultLang
	}
	return defaultLang
}

/**
 * Formats a number as a localized string.
 *
 * @example
 * ```typescript
 * formatNumber(1234.5, 'en-US') // '1,234.5'
 * formatNumber(1234.5, 'de-DE') // '1.234,5'
 * formatNumber(0.42, 'en-US', { style: 'percent' }) // '42%'
 * ```
 *
 * @param value The number to format.
 * @param locale The locale code (e.g., 'en-US').
 * @param options Intl.NumberFormat options.
 * @returns {string}
 */
export function formatNumber(
	value: number,
	locale?: string,
	options?: Intl.NumberFormatOptions
): string {
	return new Intl.NumberFormat(locale, options).format(value)
}

/**
 * Formats a date as a localized string.
 *
 * @example
 * ```typescript
 * const d = new Date('2026-08-11T12:00:00Z')
 * formatDateI18n(d, 'en-US', { timeZone: 'UTC' }) // '8/11/2026'
 * formatDateI18n(d, 'en-GB', { timeZone: 'UTC' }) // '11/08/2026'
 * ```
 *
 * @param date The date to format.
 * @param locale The locale code (e.g., 'en-US').
 * @param options Intl.DateTimeFormat options.
 * @returns {string}
 */
export function formatDateI18n(
	date: Date,
	locale?: string,
	options?: Intl.DateTimeFormatOptions
): string {
	return new Intl.DateTimeFormat(locale, options).format(date)
}

/**
 * Simple translation function using a dictionary object.
 * @param key The translation key.
 * @param dict The dictionary object (e.g., `{ en: { hello: 'Hello' }, fr: { hello: 'Bonjour' } }`).
 * @param lang The language code (optional, defaults to detected language).
 * @returns {string}
 */
export function t(
	key: string,
	dict: Record<string, Record<string, string>>,
	lang?: string
): string {
	const l = lang || detectLanguage()
	return dict[l]?.[key] || dict['en']?.[key] || key
}

/**
 * Pluralizes a word based on a count (basic English only).
 * @param word The word to pluralize.
 * @param count The count.
 * @returns {string}
 */
export function pluralize(word: string, count: number): string {
	return count === 1 ? word : `${word}s`
}
