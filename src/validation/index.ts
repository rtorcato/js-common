/**
 * Checks if a value is defined (not null or undefined).
 * @param value The value to check.
 * @returns {boolean}
 */
export function isDefined<T>(value: T | null | undefined): value is T {
	return value !== undefined && value !== null
}

/**
 * Check if a value is a string.
 * @param value - The value to check.
 * @returns `true` if the value is a string, `false` otherwise.
 */

export function isString(value: any): value is string {
	return typeof value === 'string'
}

/**
 * Checks if a value is a number (and not NaN).
 * @param value The value to check.
 * @returns {boolean}
 */

export function isNumber(value: any): value is number {
	return typeof value === 'number' && !Number.isNaN(value)
}

/**
 * Checks if a value is a boolean.
 * @param value The value to check.
 * @returns {boolean}
 */

export function isBoolean(value: any): value is boolean {
	return typeof value === 'boolean'
}

/**
 * Checks if a value is an array.
 * @param value The value to check.
 * @returns {boolean}
 */

export function isArray(value: any): value is any[] {
	return Array.isArray(value)
}

/**
 * Checks if a value is an object (but not null or array).
 * @param value The value to check.
 * @returns {boolean}
 */

export function isObject(value: any): value is object {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Checks if a string is a valid email address (simple regex).
 * @param str The string to check.
 * @returns {boolean}
 */
export function isEmail(str: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)
}

/**
 * Checks if a string is a valid URL.
 * @param str The string to check.
 * @returns {boolean}
 */
export function isUrl(str: string): boolean {
	try {
		new URL(str)
		return true
	} catch {
		return false
	}
}
