/**
 * Escapes special regex characters in a string so it can be used in a RegExp.
 * @param str The string to escape.
 * @returns The escaped string.
 */
export function escapeRegExp(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Tests if a string matches a given regex pattern.
 * @param str The string to test.
 * @param pattern The regex pattern (string or RegExp).
 * @returns True if the string matches, false otherwise.
 */
export function testRegex(str: string, pattern: string | RegExp): boolean {
	const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern
	return regex.test(str)
}

/**
 * Returns all matches of a regex pattern in a string.
 * @param str The string to search.
 * @param pattern The regex pattern (string or RegExp).
 * @returns An array of matches, or an empty array if none found.
 */
export function matchAll(str: string, pattern: string | RegExp): RegExpMatchArray[] {
	const regex =
		typeof pattern === 'string'
			? new RegExp(pattern, 'g')
			: new RegExp(
					pattern.source,
					pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`
				)
	return Array.from(str.matchAll(regex))
}

/**
 * Replaces all matches of a regex pattern in a string with a replacement.
 * @param str The string to search.
 * @param pattern The regex pattern (string or RegExp).
 * @param replacement The replacement string or function.
 * @returns The resulting string.
 */

export function replaceAllRegex(
	str: string,
	pattern: string | RegExp,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	replacement: string | ((substring: string, ...args: any[]) => string)
): string {
	const regex =
		typeof pattern === 'string'
			? new RegExp(pattern, 'g')
			: new RegExp(
					pattern.source,
					pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`
				)
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return str.replace(regex, replacement as any)
}

/**
 * Splits a string by a regex pattern.
 * @param str The string to split.
 * @param pattern The regex pattern (string or RegExp).
 * @returns An array of strings.
 */
export function splitByRegex(str: string, pattern: string | RegExp): string[] {
	const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern
	return str.split(regex)
}
