/**
 * Converts a value to a boolean.
 * Accepts 'true', '1', 1 as true; 'false', '0', 0 as false.
 *
 * @example
 * ```typescript
 * toBoolean('true') // true
 * toBoolean('0') // false
 * toBoolean(1) // true
 * toBoolean(2) // false
 * toBoolean(null) // false
 * ```
 *
 * @param value The value to convert.
 * @returns The boolean representation.
 */

export function toBoolean(value: unknown): boolean {
	if (typeof value === 'boolean') return value
	if (typeof value === 'string') {
		const v = value.trim().toLowerCase()
		if (v === 'true' || v === '1') return true
		if (v === 'false' || v === '0') return false
	}
	if (typeof value === 'number') {
		return value === 1
	}
	return Boolean(value)
}

/**
 * Returns the logical exclusive OR (XOR) of two booleans.
 *
 * @example
 * ```typescript
 * xor(true, false) // true
 * xor(true, true) // false
 * xor(false, false) // false
 * ```
 *
 * @param a First boolean.
 * @param b Second boolean.
 * @returns True if exactly one of a or b is true.
 */
export function xor(a: boolean, b: boolean): boolean {
	return !!(a ? !b : b)
}

/**
 * Logical AND for two booleans.
 * @param a First boolean.
 * @param b Second boolean.
 * @returns True if both a and b are true.
 */
export function and(a: boolean, b: boolean): boolean {
	return a && b
}

/**
 * Logical OR for two booleans.
 * @param a First boolean.
 * @param b Second boolean.
 * @returns True if either a or b is true.
 */
export function or(a: boolean, b: boolean): boolean {
	return a || b
}

/**
 * Logical NOT for a boolean.
 * @param a The boolean to negate.
 * @returns The negated boolean.
 */
export function not(a: boolean): boolean {
	return !a
}
