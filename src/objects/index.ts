/**
 * Returns true if the value is a plain object (not null, not array, not function).
 *
 * @example
 * ```typescript
 * isPlainObject({ a: 1 }) // true
 * isPlainObject([1, 2]) // false
 * isPlainObject(null) // false
 * isPlainObject(new Date()) // false
 * ```
 *
 * @param value The value to check.
 * @returns {boolean}
 */

export function isPlainObject(value: any): value is Record<string, any> {
	return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * Deeply merges two objects. Does not mutate inputs.
 *
 * @example
 * ```typescript
 * deepMerge({ a: 1, nested: { x: 1, y: 2 } }, { nested: { y: 9 }, b: 2 })
 * // { a: 1, nested: { x: 1, y: 9 }, b: 2 }
 * ```
 *
 * @param target The target object.
 * @param source The source object.
 * @returns {object} The merged object.
 */
export function deepMerge<T extends object, U extends object>(target: T, source: U): T & U {
	const result = { ...target } as T & U
	for (const key in source) {
		if (isPlainObject(source[key]) && isPlainObject((result as any)[key])) {
			;(result as any)[key] = deepMerge((result as any)[key], source[key])
		} else {
			;(result as any)[key] = source[key]
		}
	}
	return result
}

/**
 * Returns a shallow copy of an object with the given keys omitted.
 *
 * @example
 * ```typescript
 * omit({ id: 1, name: 'Ada', password: 'x' }, ['password'])
 * // { id: 1, name: 'Ada' }
 * ```
 *
 * @param obj The source object.
 * @param keys Keys to omit.
 * @returns {object}
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
	const result = { ...obj }
	for (const key of keys) {
		delete result[key]
	}
	return result
}

/**
 * Returns a shallow copy of an object with only the given keys.
 * @param obj The source object.
 * @param keys Keys to pick.
 * @returns {object}
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
	const result = {} as Pick<T, K>
	for (const key of keys) {
		if (key in obj) {
			result[key] = obj[key]
		}
	}
	return result
}

/**
 * Deep clones a value using the native structuredClone algorithm.
 * Correctly handles Date, Map, Set, ArrayBuffer, and circular references.
 * @param obj The value to clone.
 * @returns A deep clone of the value.
 */
export function deepClone<T>(obj: T): T {
	return structuredClone(obj)
}
