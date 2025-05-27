import currencies from './currencies.js'

/**
 * Returns the currency symbol for a given ISO 4217 currency code.
 *
 * Utilizes the `Intl.NumberFormat` API to format a number as currency and extract the symbol.
 *
 * @param currency - The ISO 4217 currency code (e.g., 'USD', 'EUR', 'JPY').
 * @returns The currency symbol as a string (e.g., '$', '€', '¥'), or `undefined` if the symbol cannot be determined.
 */
export const getCurrencySymbol = (currency: string): string | undefined => {
	const currencySymbol = new Intl.NumberFormat('en', {
		currency,
		style: 'currency',
	})
		.formatToParts(0)
		.find((part) => part.type === 'currency')
	return currencySymbol?.value === '¤' ? undefined : currencySymbol?.value
}

/**
 * Formats a given price value into a localized currency string.
 *
 * @param price - The numeric value or string representation of the price to format.
 * @param currency - The currency code to use for formatting. Supported values are 'USD', 'EUR', 'GBP', and 'BDT'. Defaults to 'USD'.
 * @param notation - The formatting notation style. Can be 'compact', 'engineering', 'scientific', or 'standard'. Defaults to 'standard'.
 * @returns The formatted currency string according to the specified locale, currency, and notation.
 */
export function formatPrice(
	price: number | string,
	currency: 'USD' | 'EUR' | 'GBP' | 'BDT' = 'USD',
	notation: 'compact' | 'engineering' | 'scientific' | 'standard' = 'standard'
) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		notation,
	}).format(Number(price))
}

/**
 * Parses a given price string and returns its numeric value.
 *
 * @param value - The price string to parse.
 * @returns The numeric value of the price, or `null` if the value cannot be parsed.
 */
export function parsePrice(value: string): number | null {
	const numeric = value.replace(/[^0-9.-]+/g, '')
	const parsed = Number.parseFloat(numeric)
	return Number.isNaN(parsed) ? null : parsed
}

/**
 * Converts a given amount from one currency to another using the provided exchange rate.
 *
 * @param amount - The amount of money to convert.
 * @param rate - The exchange rate to use for the conversion.
 * @param decimals - The number of decimal places to include in the result. Defaults to 2.
 * @returns The converted amount as a number.
 */
export function convertCurrency(amount: number, rate: number, decimals = 2): number {
	return Number.parseFloat((amount * rate).toFixed(decimals))
}

/**
 * Checks if the provided currency code is valid.
 *
 * Converts the input code to uppercase and verifies if it exists in the list of supported currencies.
 *
 * @param code - The currency code to validate (e.g., 'USD', 'eur').
 * @returns `true` if the currency code is valid; otherwise, `false`.
 */
export function isValidCurrencyCode(code: string): boolean {
	return currencies.includes(code.toUpperCase())
}

/**
 * Rounds a given number to a specified number of decimal places.
 *
 * @param value - The number to be rounded.
 * @param decimals - The number of decimal places to round to. Defaults to 2.
 * @returns The rounded number.
 */
export function roundTo(value: number, decimals = 2): number {
	const factor = 10 ** decimals
	return Math.round(value * factor) / factor
}
