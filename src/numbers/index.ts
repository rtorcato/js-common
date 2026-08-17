/**
 * Clamps a number between a minimum and maximum value.
 *
 * @example
 * ```typescript
 * clamp(15, 0, 10) // 10
 * clamp(-5, 0, 10) // 0
 * clamp(5, 0, 10) // 5
 * ```
 *
 * @param value The number to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns The clamped value.
 */
export function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, value))
}

/**
 * Rounds a number to a specified number of decimal places.
 *
 * @example
 * ```typescript
 * roundTo(3.14159) // 3.14
 * roundTo(3.14159, 3) // 3.142
 * roundTo(1234.5, 0) // 1235
 * ```
 *
 * @param value The number to round.
 * @param decimals The number of decimal places. Defaults to 2.
 * @returns The rounded number.
 */
export function roundTo(value: number, decimals = 2): number {
	const factor = 10 ** decimals
	return Math.round(value * factor) / factor
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
 * Checks if a number is between two values.
 * @param value The number to check.
 * @param min The minimum value.
 * @param max The maximum value.
 * @param inclusive Whether the range is inclusive (default: true).
 * @returns True if the number is between min and max, false otherwise.
 */
export function between(value: number, min: number, max: number, inclusive = true): boolean {
	return inclusive ? value >= min && value <= max : value > min && value < max
}

/**
 * Returns the sum of an array of numbers.
 * @param numbers The array of numbers to sum.
 * @returns The sum of the numbers.
 */
export function sum(numbers: number[]): number {
	return numbers.reduce((acc, n) => acc + n, 0)
}

/**
 * Returns the average of an array of numbers.
 * @param numbers The array of numbers.
 * @returns The average value, or 0 if the array is empty.
 */
export function average(numbers: number[]): number {
	return numbers.length === 0 ? 0 : sum(numbers) / numbers.length
}

/**
 * Returns the true mathematical modulus, handling negative numbers correctly.
 * @param n The dividend.
 * @param m The divisor.
 * @returns The modulus result.
 */
export function mod(n: number, m: number): number {
	return ((n % m) + m) % m
}
