/**
 * Inverts a Map (swaps keys and values). If duplicate values exist, later keys overwrite earlier ones.
 * @param map The map to invert.
 * @returns {Map<any, any>} The inverted map.
 */
export function invertMap<K, V>(map: Map<K, V>): Map<V, K> {
	const result = new Map<V, K>()
	for (const [k, v] of map) {
		result.set(v, k)
	}
	return result
}

/**
 * Maps the values of a Map using a function.
 * @param map The map to map over.
 * @param fn The function to apply to each value.
 * @returns {Map<K, U>} A new map with mapped values.
 */
export function mapValues<K, V, U>(map: Map<K, V>, fn: (value: V, key: K) => U): Map<K, U> {
	const result = new Map<K, U>()
	for (const [k, v] of map) {
		result.set(k, fn(v, k))
	}
	return result
}

/**
 * Merges two or more maps. Later maps overwrite earlier keys.
 * @param maps The maps to merge.
 * @returns {Map<K, V>} The merged map.
 */
export function mergeMaps<K, V>(...maps: Map<K, V>[]): Map<K, V> {
	const result = new Map<K, V>()
	for (const map of maps) {
		for (const [k, v] of map) {
			result.set(k, v)
		}
	}
	return result
}

/**
 * Converts an object to a Map.
 * @param obj The object to convert.
 * @returns {Map<string, any>} The resulting map.
 */

export function objectToMap<T extends object>(obj: T): Map<string, any> {
	return new Map(Object.entries(obj))
}

/**
 * Converts a Map to an object.
 * @param map The map to convert.
 * @returns {Record<string, any>} The resulting object.
 */
export function mapToObject<V>(map: Map<string, V>): Record<string, V> {
	const obj: Record<string, V> = {}
	for (const [k, v] of map) {
		obj[k] = v
	}
	return obj
}
