/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * @param min Minimum integer value.
 * @param max Maximum integer value.
 * @returns {number} Random integer between min and max.
 */
export function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Returns a random float between min (inclusive) and max (exclusive).
 * @param min Minimum float value.
 * @param max Maximum float value.
 * @returns {number} Random float between min and max.
 */
export function randomFloat(min: number, max: number): number {
	return Math.random() * (max - min) + min
}

/**
 * Returns a random boolean value.
 * @returns {boolean}
 */
export function randomBool(): boolean {
	return Math.random() < 0.5
}

/**
 * Returns a random element from an array.
 * @param arr The array to pick from.
 * @returns {T | undefined} A random element from the array, or undefined if the array is empty.
 */
export function randomElement<T>(arr: T[]): T | undefined {
	if (arr.length === 0) return undefined
	return arr[randomInt(0, arr.length - 1)]
}

/**
 * Returns a random string of the given length using the given characters.
 * @param length Length of the string.
 * @param chars Characters to use (default: alphanumeric).
 * @returns {string}
 */
export function randomString(
	length: number,
	chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
	let result = ''
	for (let i = 0; i < length; i++) {
		result += chars.charAt(randomInt(0, chars.length - 1))
	}
	return result
}
