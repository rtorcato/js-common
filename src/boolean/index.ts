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
