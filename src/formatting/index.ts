/**
 * Pads a string or number with leading zeros to a given length.
 *
 * @example
 * ```typescript
 * padZero(7) // '07'
 * padZero(7, 4) // '0007'
 * padZero('42', 2) // '42'
 * ```
 *
 * @param value The value to pad.
 * @param length The desired length.
 * @returns The padded string.
 */
export function padZero(value: string | number, length: number = 2): string {
	return String(value).padStart(length, '0')
}

/**
 * Formats a number with thousands separators.
 *
 * @example
 * ```typescript
 * formatNumber(1234567.5) // '1,234,567.5'
 * formatNumber(1234567.5, 'de-DE') // '1.234.567,5'
 * ```
 *
 * @param num The number to format.
 * @param locale Optional locale string (default: 'en-US').
 * @returns The formatted string.
 */
export function formatNumber(num: number, locale: string = 'en-US'): string {
	return num.toLocaleString(locale)
}

/**
 * Formats a number as a percentage string.
 *
 * @example
 * ```typescript
 * formatPercent(0.25) // '25%'
 * formatPercent(0.1234, 1) // '12.3%'
 * ```
 *
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
