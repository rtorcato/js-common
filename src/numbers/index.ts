/**
 * Pads a single-digit number with a leading zero and returns it as a string.
 *
 * @param val - The number to pad.
 * @returns The number as a string, padded with a leading zero if it is less than 10.
 *
 * @example
 * padNumberToString(5); // returns "05"
 * padNumberToString(12); // returns "12"
 */
export function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Clamps a number between a minimum and maximum value.
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
 * @param value The number to round.
 * @param decimals The number of decimal places. Defaults to 2.
 * @returns The rounded number.
 */
export function roundTo(value: number, decimals = 2): number {
	const factor = 10 ** decimals
	return Math.round(value * factor) / factor
}

/**
 * Checks if a value is a finite number.
 * @param value The value to check.
 * @returns True if the value is a finite number, false otherwise.
 */
export function isFiniteNumber(value: unknown): value is number {
	return typeof value === 'number' && Number.isFinite(value)
}

/**
 * Generates a random float between min (inclusive) and max (exclusive).
 * @param min The minimum value (inclusive).
 * @param max The maximum value (exclusive).
 * @returns A random float.
 */
export function getRandomFloat(min: number, max: number): number {
	return Math.random() * (max - min) + min
}

/**
 * Checks if a value is an integer.
 * @param value The value to check.
 * @returns True if the value is an integer, false otherwise.
 */
export function isInteger(value: unknown): value is number {
	return typeof value === 'number' && Number.isInteger(value)
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
