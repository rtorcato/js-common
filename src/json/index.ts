/**
 * Safely parses a JSON string, returning a fallback value if parsing fails.
 * @param {string} str - The JSON string to parse.
 * @param {any} [fallback=null] - The value to return if parsing fails.
 * @returns {any} The parsed object or the fallback value.
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function safeJsonParse<T = any>(str: string, fallback: T | null = null): T | null {
	try {
		return JSON.parse(str) as T
	} catch {
		return fallback
	}
}

/**
 * Safely stringifies a value to JSON, returning a fallback value if stringification fails.
 * @param {any} value - The value to stringify.
 * @param {string} [fallback=null] - The value to return if stringification fails.
 * @returns {string | null} The JSON string or the fallback value.
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function safeJsonStringify(value: any, fallback: string | null = null): string | null {
	try {
		return JSON.stringify(value)
	} catch {
		return fallback
	}
}

/**
 * Checks if a string is valid JSON.
 * @param {string} str - The string to check.
 * @returns {boolean} True if the string is valid JSON, false otherwise.
 */
export function isValidJson(str: string): boolean {
	try {
		JSON.parse(str)
		return true
	} catch {
		return false
	}
}

/**
 * Deep clones a value using JSON serialization.
 * Note: Only works for JSON-safe values (no functions, undefined, etc).
 * @param {T} value - The value to clone.
 * @returns {T} The deep-cloned value.
 */
export function deepCloneJson<T>(value: T): T {
	return JSON.parse(JSON.stringify(value))
}
