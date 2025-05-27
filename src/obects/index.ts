/**
 * Returns true if the value is a plain object (not null, not array, not function).
 * @param value The value to check.
 * @returns {boolean}
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function isPlainObject(value: any): value is Record<string, any> {
	return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * Deeply merges two objects. Does not mutate inputs.
 * @param target The target object.
 * @param source The source object.
 * @returns {object} The merged object.
 */
export function deepMerge<T extends object, U extends object>(target: T, source: U): T & U {
	const result = { ...target } as T & U
	for (const key in source) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		if (isPlainObject(source[key]) && isPlainObject((result as any)[key])) {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			;(result as any)[key] = deepMerge((result as any)[key], source[key])
		} else {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			;(result as any)[key] = source[key]
		}
	}
	return result
}

/**
 * Returns a shallow copy of an object with the given keys omitted.
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
 * Deep clones a plain object or array.
 * @param obj The object or array to clone.
 * @returns {any}
 */
export function deepClone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj))
}
