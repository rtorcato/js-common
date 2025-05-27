/**
 * Returns the union of two sets.
 * @param a First set.
 * @param b Second set.
 * @returns {Set<T>} Union of a and b.
 */
export function union<T>(a: Set<T>, b: Set<T>): Set<T> {
	return new Set([...a, ...b])
}

/**
 * Returns the intersection of two sets.
 * @param a First set.
 * @param b Second set.
 * @returns {Set<T>} Intersection of a and b.
 */
export function intersection<T>(a: Set<T>, b: Set<T>): Set<T> {
	return new Set([...a].filter((x) => b.has(x)))
}

/**
 * Returns the difference of two sets (elements in a not in b).
 * @param a First set.
 * @param b Second set.
 * @returns {Set<T>} Difference of a and b.
 */
export function difference<T>(a: Set<T>, b: Set<T>): Set<T> {
	return new Set([...a].filter((x) => !b.has(x)))
}

/**
 * Returns true if set a is a subset of set b.
 * @param a First set.
 * @param b Second set.
 * @returns {boolean}
 */
export function isSubset<T>(a: Set<T>, b: Set<T>): boolean {
	for (const x of a) if (!b.has(x)) return false
	return true
}

/**
 * Returns true if set a is a superset of set b.
 * @param a First set.
 * @param b Second set.
 * @returns {boolean}
 */
export function isSuperset<T>(a: Set<T>, b: Set<T>): boolean {
	for (const x of b) if (!a.has(x)) return false
	return true
}

/**
 * Converts a set to an array.
 * @param set The set to convert.
 * @returns {T[]}
 */
export function setToArray<T>(set: Set<T>): T[] {
	return Array.from(set)
}

/**
 * Converts an array to a set.
 * @param arr The array to convert.
 * @returns {Set<T>}
 */
export function arrayToSet<T>(arr: T[]): Set<T> {
	return new Set(arr)
}
