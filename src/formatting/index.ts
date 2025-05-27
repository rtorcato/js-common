/**
 * Pads a string or number with leading zeros to a given length.
 * @param value The value to pad.
 * @param length The desired length.
 * @returns The padded string.
 */
export function padZero(value: string | number, length: number = 2): string {
	return String(value).padStart(length, '0')
}

/**
 * Capitalizes the first character of a string.
 * @param str The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalize(str: string): string {
	if (!str) return ''
	return str[0]?.toUpperCase() + str.slice(1)
}

/**
 * Converts a string to title case (first letter of each word capitalized).
 * @param str The string to convert.
 * @returns The title-cased string.
 */
export function toTitleCase(str: string): string {
	return str.replace(/\w\S*/g, (txt) => (txt[0]?.toUpperCase() ?? '') + txt.slice(1).toLowerCase())
}

/**
 * Formats a number with thousands separators.
 * @param num The number to format.
 * @param locale Optional locale string (default: 'en-US').
 * @returns The formatted string.
 */
export function formatNumber(num: number, locale: string = 'en-US'): string {
	return num.toLocaleString(locale)
}

/**
 * Formats a number as a percentage string.
 * @param value The value to format (e.g. 0.25 for 25%).
 * @param fractionDigits Number of decimal places (default: 0).
 * @returns The formatted percentage string.
 */
export function formatPercent(value: number, fractionDigits = 0): string {
	return `${(value * 100).toFixed(fractionDigits)}%`
}

/**
 * Formats a Date as YYYY-MM-DD.
 * @param date The date to format.
 * @returns The formatted date string.
 */
export function formatDate(date: Date): string {
	return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`
}

/**
 * Formats a Date as HH:MM:SS.
 * @param date The date to format.
 * @returns The formatted time string.
 */
export function formatTime(date: Date): string {
	return `${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`
}

/**
 * Formats a Date as YYYY-MM-DD HH:MM:SS.
 * @param date The date to format.
 * @returns The formatted date-time string.
 */
export function formatDateTime(date: Date): string {
	return `${formatDate(date)} ${formatTime(date)}`
}
