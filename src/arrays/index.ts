/**
 * Returns the first element of an array, or undefined if the array is empty.
 * @param arr The array.
 * @returns The first element or undefined.
 */
export function first<T>(arr: T[]): T | undefined {
	return arr[0]
}

/**
 * Returns the last element of an array, or undefined if the array is empty.
 * @param arr The array.
 * @returns The last element or undefined.
 */
export function last<T>(arr: T[]): T | undefined {
	return arr.length ? arr[arr.length - 1] : undefined
}

/**
 * Removes duplicate values from an array.
 * @param arr The array.
 * @returns A new array with unique values.
 */
export function unique<T>(arr: T[]): T[] {
	return Array.from(new Set(arr))
}

/**
 * Flattens an array one level deep.
 * @param arr The array to flatten.
 * @returns A new flattened array.
 */

// biome-ignore lint/suspicious/noExplicitAny: Function accepts arrays of any type for flattening
export function flatten<T>(arr: any[]): T[] {
	return arr.flat()
}

/**
 * Chunks an array into smaller arrays of a specified size.
 * @param arr The array to chunk.
 * @param size The chunk size.
 * @returns An array of chunks.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
	const result: T[][] = []
	for (let i = 0; i < arr.length; i += size) {
		result.push(arr.slice(i, i + size))
	}
	return result
}

/**
 * Removes all falsy values from an array.
 * @param arr The array.
 * @returns A new array with only truthy values.
 */
export function compact<T>(arr: T[]): T[] {
	return arr.filter(Boolean)
}

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * @param arr The array to shuffle.
 * @returns The shuffled array.
 */
export function shuffle<T>(arr: T[]): T[] {
	const a = arr.slice()
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[a[i], a[j]] = [a[j], a[i]] as [T, T]
	}
	return a
}
