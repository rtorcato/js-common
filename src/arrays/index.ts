/**
 * Returns the first element of an array, or undefined if the array is empty.
 * 
 * @example
 * ```typescript
 * first([1, 2, 3]) // 1
 * first([]) // undefined
 * first(['a', 'b']) // 'a'
 * ```
 * 
 * @param arr The array to get the first element from
 * @returns The first element or undefined if array is empty
 * @category Array Utilities
 */
export function first<T>(arr: T[]): T | undefined {
	return arr[0]
}

/**
 * Returns the last element of an array, or undefined if the array is empty.
 * 
 * @example
 * ```typescript
 * last([1, 2, 3]) // 3
 * last([]) // undefined
 * last(['a', 'b']) // 'b'
 * ```
 * 
 * @param arr The array to get the last element from
 * @returns The last element or undefined if array is empty
 * @category Array Utilities
 */
export function last<T>(arr: T[]): T | undefined {
	return arr.length ? arr[arr.length - 1] : undefined
}

/**
 * Removes duplicate values from an array while preserving order.
 * Uses Set for O(n) performance with primitive values.
 * 
 * @example
 * ```typescript
 * unique([1, 2, 2, 3, 1]) // [1, 2, 3]
 * unique(['a', 'b', 'a']) // ['a', 'b']
 * unique([{id: 1}, {id: 2}, {id: 1}]) // [{id: 1}, {id: 2}, {id: 1}] (objects by reference)
 * ```
 * 
 * @param arr The array to remove duplicates from
 * @returns A new array with unique values
 * @category Array Utilities
 */
export function unique<T>(arr: T[]): T[] {
	return Array.from(new Set(arr))
}

/**
 * Flattens an array one level deep.
 * 
 * @example
 * ```typescript
 * flatten([[1, 2], [3, 4]]) // [1, 2, 3, 4]
 * flatten([1, [2, 3], 4]) // [1, 2, 3, 4]
 * flatten([[1, [2]], [3]]) // [1, [2], 3] (only one level deep)
 * ```
 * 
 * @param arr The array to flatten
 * @returns A new flattened array
 * @category Array Utilities
 */
export function flatten<T>(arr: any[]): T[] {
	return arr.flat()
}

/**
 * Chunks an array into smaller arrays of a specified size.
 * The last chunk may be smaller if the array length is not evenly divisible.
 * 
 * @example
 * ```typescript
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * chunk(['a', 'b', 'c'], 2) // [['a', 'b'], ['c']]
 * chunk([1, 2, 3], 5) // [[1, 2, 3]]
 * ```
 * 
 * @param arr The array to chunk
 * @param size The size of each chunk (must be positive)
 * @returns An array of chunks
 * @throws {Error} When size is less than 1
 * @category Array Utilities
 */
export function chunk<T>(arr: T[], size: number): T[][] {
	if (size < 1) throw new Error('Chunk size must be at least 1')
	const result: T[][] = []
	for (let i = 0; i < arr.length; i += size) {
		result.push(arr.slice(i, i + size))
	}
	return result
}

/**
 * Removes all falsy values from an array.
 * Falsy values: false, 0, -0, 0n, "", null, undefined, NaN
 * 
 * @example
 * ```typescript
 * compact([0, 1, false, 2, '', 3, null, undefined, NaN]) // [1, 2, 3]
 * compact(['', 'hello', 0, 'world']) // ['hello', 'world']
 * compact([true, false, 1, 0]) // [true, 1]
 * ```
 * 
 * @param arr The array to filter
 * @returns A new array with only truthy values
 * @category Array Utilities
 */
export function compact<T>(arr: T[]): T[] {
	return arr.filter(Boolean)
}

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * Returns a new array without modifying the original.
 * 
 * @example
 * ```typescript
 * shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4] (random order)
 * shuffle(['a', 'b', 'c']) // ['c', 'a', 'b'] (random order)
 * 
 * // Original array is unchanged
 * const original = [1, 2, 3]
 * const shuffled = shuffle(original)
 * console.log(original) // [1, 2, 3]
 * ```
 * 
 * @param arr The array to shuffle
 * @returns A new shuffled array
 * @category Array Utilities
 */
export function shuffle<T>(arr: T[]): T[] {
	const a = arr.slice()
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[a[i], a[j]] = [a[j], a[i]] as [T, T]
	}
	return a
}
