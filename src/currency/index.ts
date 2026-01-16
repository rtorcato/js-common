// Lazy-loaded currencies cache
let currenciesCache: string[] | null = null

/**
 * Lazily loads the currencies list to reduce bundle size.
 * The list is cached after first load.
 *
 * @returns Promise resolving to the array of currency codes.
 */
async function loadCurrencies(): Promise<string[]> {
	if (currenciesCache) return currenciesCache
	const { default: currencies } = await import('./currencies.js')
	currenciesCache = currencies
	return currencies
}

/**
 * Returns the currency symbol for a given ISO 4217 currency code.
 *
 * Utilizes the `Intl.NumberFormat` API to format a number as currency and extract the symbol.
 *
 * @param currency - The ISO 4217 currency code (e.g., 'USD', 'EUR', 'JPY').
 * @returns The currency symbol as a string (e.g., '$', '€', '¥'), or `undefined` if the symbol cannot be determined.
 *
 * @example
 * ```typescript
 * getCurrencySymbol('USD') // '$'
 * getCurrencySymbol('EUR') // '€'
 * getCurrencySymbol('JPY') // '¥'
 * ```
 */
export const getCurrencySymbol = (currency: string): string | undefined => {
	try {
		const currencySymbol = new Intl.NumberFormat('en', {
			currency,
			style: 'currency',
		})
			.formatToParts(0)
			.find((part) => part.type === 'currency')
		return currencySymbol?.value === '¤' ? undefined : currencySymbol?.value
	} catch {
		return undefined
	}
}

/**
 * Returns the full display name of a currency.
 *
 * @param currency - The ISO 4217 currency code (e.g., 'USD', 'EUR').
 * @param locale - The locale to use for the display name. Defaults to 'en'.
 * @returns The full currency name (e.g., 'US Dollar'), or `undefined` if invalid.
 *
 * @example
 * ```typescript
 * getCurrencyName('USD') // 'US Dollar'
 * getCurrencyName('EUR') // 'Euro'
 * getCurrencyName('JPY', 'ja') // '日本円'
 * ```
 */
export function getCurrencyName(currency: string, locale = 'en'): string | undefined {
	try {
		return new Intl.DisplayNames([locale], { type: 'currency' }).of(currency.toUpperCase())
	} catch {
		return undefined
	}
}

/**
 * Returns the default locale typically associated with a currency.
 *
 * @param currency - The ISO 4217 currency code.
 * @returns The locale string (e.g., 'en-US' for USD), or 'en' as fallback.
 *
 * @example
 * ```typescript
 * getCurrencyLocale('USD') // 'en-US'
 * getCurrencyLocale('EUR') // 'de-DE'
 * getCurrencyLocale('JPY') // 'ja-JP'
 * ```
 */
export function getCurrencyLocale(currency: string): string {
	const localeMap: Record<string, string> = {
		USD: 'en-US',
		EUR: 'de-DE',
		GBP: 'en-GB',
		JPY: 'ja-JP',
		CNY: 'zh-CN',
		CAD: 'en-CA',
		AUD: 'en-AU',
		CHF: 'de-CH',
		NZD: 'en-NZ',
		SGD: 'en-SG',
		HKD: 'zh-HK',
		KRW: 'ko-KR',
		INR: 'en-IN',
		BRL: 'pt-BR',
		MXN: 'es-MX',
		RUB: 'ru-RU',
		ZAR: 'en-ZA',
		SEK: 'sv-SE',
		NOK: 'nb-NO',
		DKK: 'da-DK',
		PLN: 'pl-PL',
		TRY: 'tr-TR',
		THB: 'th-TH',
		MYR: 'ms-MY',
		PHP: 'en-PH',
		IDR: 'id-ID',
		CZK: 'cs-CZ',
		HUF: 'hu-HU',
		ILS: 'he-IL',
		TWD: 'zh-TW',
	}
	return localeMap[currency.toUpperCase()] ?? 'en'
}

/**
 * Formats a given price value into a localized currency string.
 *
 * @param price - The numeric value or string representation of the price to format.
 * @param currency - The ISO 4217 currency code. Defaults to 'USD'.
 * @param locale - The locale to use for formatting. If not provided, uses the currency's default locale.
 * @returns The formatted currency string.
 *
 * @example
 * ```typescript
 * formatPrice(1234.56, 'USD') // '$1,234.56'
 * formatPrice(1234.56, 'EUR') // '1.234,56 €'
 * formatPrice(1234.56, 'JPY') // '¥1,235'
 * ```
 */
export function formatPrice(price: number | string, currency = 'USD', locale?: string): string {
	const resolvedLocale = locale ?? getCurrencyLocale(currency)
	return new Intl.NumberFormat(resolvedLocale, {
		style: 'currency',
		currency,
	}).format(Number(price))
}

/**
 * Formats a price in compact notation (e.g., $1.2K, $1.5M).
 *
 * @param price - The numeric value to format.
 * @param currency - The ISO 4217 currency code. Defaults to 'USD'.
 * @param locale - The locale to use for formatting.
 * @returns The formatted compact currency string.
 *
 * @example
 * ```typescript
 * formatPriceCompact(1234) // '$1.2K'
 * formatPriceCompact(1234567) // '$1.2M'
 * formatPriceCompact(1234567890) // '$1.2B'
 * formatPriceCompact(1500, 'EUR') // '1,5 Tsd. €'
 * ```
 */
export function formatPriceCompact(
	price: number | string,
	currency = 'USD',
	locale?: string
): string {
	const resolvedLocale = locale ?? getCurrencyLocale(currency)
	return new Intl.NumberFormat(resolvedLocale, {
		style: 'currency',
		currency,
		notation: 'compact',
		compactDisplay: 'short',
	}).format(Number(price))
}

/**
 * Parses a given price string and returns its numeric value.
 *
 * @param value - The price string to parse.
 * @returns The numeric value of the price, or `null` if the value cannot be parsed.
 *
 * @example
 * ```typescript
 * parsePrice('$1,234.56') // 1234.56
 * parsePrice('€1.234,56') // 1234.56
 * parsePrice('invalid') // null
 * ```
 */
export function parsePrice(value: string): number | null {
	// Handle European format (1.234,56) by detecting comma as decimal separator
	const hasEuropeanFormat = /\d+\.\d{3},\d{2}$/.test(value)
	let normalized = value

	if (hasEuropeanFormat) {
		// European format: dots are thousands separators, comma is decimal
		normalized = value.replace(/\./g, '').replace(',', '.')
	}

	const numeric = normalized.replace(/[^0-9.-]+/g, '')
	const parsed = Number.parseFloat(numeric)
	return Number.isNaN(parsed) ? null : parsed
}

/**
 * Parses a currency string and extracts both the amount and currency code.
 *
 * @param value - The currency string to parse (e.g., '$1,234.56', 'EUR 100').
 * @returns An object with `amount` and `currency`, or `null` if parsing fails.
 *
 * @example
 * ```typescript
 * parseCurrencyString('$1,234.56') // { amount: 1234.56, currency: 'USD' }
 * parseCurrencyString('€100') // { amount: 100, currency: 'EUR' }
 * parseCurrencyString('1000 JPY') // { amount: 1000, currency: 'JPY' }
 * parseCurrencyString('invalid') // null
 * ```
 */
export function parseCurrencyString(value: string): { amount: number; currency: string } | null {
	const symbolToCurrency: Record<string, string> = {
		$: 'USD',
		'€': 'EUR',
		'£': 'GBP',
		'¥': 'JPY',
		'₹': 'INR',
		'₽': 'RUB',
		R$: 'BRL',
		'₩': 'KRW',
		'฿': 'THB',
		'₪': 'ILS',
		'₱': 'PHP',
		'₫': 'VND',
		kr: 'SEK', // Could be SEK, NOK, DKK
		CHF: 'CHF',
		C$: 'CAD',
		A$: 'AUD',
		NZ$: 'NZD',
		HK$: 'HKD',
		S$: 'SGD',
	}

	// Try to find currency code (e.g., "USD", "EUR")
	const codeMatch = value.match(/\b([A-Z]{3})\b/)
	if (codeMatch?.[1]) {
		const amount = parsePrice(value)
		if (amount !== null) {
			return { amount, currency: codeMatch[1] }
		}
	}

	// Try to find currency symbol
	for (const [symbol, currency] of Object.entries(symbolToCurrency)) {
		if (value.includes(symbol)) {
			const amount = parsePrice(value)
			if (amount !== null) {
				return { amount, currency }
			}
		}
	}

	return null
}

/**
 * Converts a given amount from one currency to another using the provided exchange rate.
 *
 * @param amount - The amount of money to convert.
 * @param rate - The exchange rate to use for the conversion.
 * @param decimals - The number of decimal places to include in the result. Defaults to 2.
 * @returns The converted amount as a number.
 *
 * @example
 * ```typescript
 * convertCurrency(100, 0.85) // 85 (e.g., USD to EUR)
 * convertCurrency(100, 110.5, 0) // 11050 (e.g., USD to JPY)
 * ```
 */
export function convertCurrency(amount: number, rate: number, decimals = 2): number {
	return Number.parseFloat((amount * rate).toFixed(decimals))
}

/**
 * Checks if the provided currency code is valid.
 *
 * This function lazily loads the currencies list to minimize bundle size impact.
 *
 * @param code - The currency code to validate (e.g., 'USD', 'eur').
 * @returns Promise resolving to `true` if the currency code is valid; otherwise, `false`.
 *
 * @example
 * ```typescript
 * await isValidCurrencyCode('USD') // true
 * await isValidCurrencyCode('INVALID') // false
 * ```
 */
export async function isValidCurrencyCode(code: string): Promise<boolean> {
	const currencies = await loadCurrencies()
	return currencies.includes(code.toUpperCase())
}

/**
 * Synchronously checks if a currency code is valid using the Intl API.
 *
 * This does not require loading the currencies list and has zero bundle size impact.
 *
 * @param code - The currency code to validate.
 * @returns `true` if the currency code is valid; otherwise, `false`.
 *
 * @example
 * ```typescript
 * isValidCurrency('USD') // true
 * isValidCurrency('INVALID') // false
 * ```
 */
export function isValidCurrency(code: string): boolean {
	try {
		new Intl.NumberFormat('en', { style: 'currency', currency: code })
		return true
	} catch {
		return false
	}
}

/**
 * Rounds a given number to a specified number of decimal places.
 *
 * @param value - The number to be rounded.
 * @param decimals - The number of decimal places to round to. Defaults to 2.
 * @returns The rounded number.
 *
 * @example
 * ```typescript
 * roundTo(3.14159, 2) // 3.14
 * roundTo(10.5, 0) // 11
 * ```
 */
export function roundTo(value: number, decimals = 2): number {
	const factor = 10 ** decimals
	return Math.round(value * factor) / factor
}
