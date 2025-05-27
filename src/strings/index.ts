/**
 * Converts a string to Title Case (capitalizes the first letter of each word).
 * @param str The string to convert.
 * @returns The title-cased string.
 */
export function titleCase(str: string): string {
	return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase())
}
/**
 * Capitalizes the first letter of a string.
 * @param str The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalize(str: string): string {
	return str.length === 0 ? '' : (str[0]?.toUpperCase() ?? '') + str.slice(1)
}

/**
 * Converts a string to camelCase.
 * @param str The string to convert.
 * @returns The camelCased string.
 */
export function camelCase(str: string): string {
	return str
		.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
		.replace(/^(.)/, (m) => m.toLowerCase())
}

/**
 * Converts a string to kebab-case.
 * @param str The string to convert.
 * @returns The kebab-cased string.
 */
export function kebabCase(str: string): string {
	return str
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/[_\s]+/g, '-')
		.toLowerCase()
}

/**
 * Converts a string to snake_case.
 * @param str The string to convert.
 * @returns The snake_cased string.
 */
export function snakeCase(str: string): string {
	return str
		.replace(/([a-z])([A-Z])/g, '$1_$2')
		.replace(/[-\s]+/g, '_')
		.toLowerCase()
}

/**
 * Truncates a string to a maximum length, adding ellipsis if needed.
 * @param str The string to truncate.
 * @param maxLength The maximum length.
 * @returns The truncated string.
 */
export function truncate(str: string, maxLength: number): string {
	return str.length > maxLength ? `${str.slice(0, maxLength - 1)}…` : str
}

/**
 * Pads the start of a string to a given length.
 * @param str The string to pad.
 * @param targetLength The target length.
 * @param padString The string to pad with.
 * @returns The padded string.
 */
export function padStart(str: string, targetLength: number, padString = ' '): string {
	return str.padStart(targetLength, padString)
}

/**
 * Pads the end of a string to a given length.
 * @param str The string to pad.
 * @param targetLength The target length.
 * @param padString The string to pad with.
 * @returns The padded string.
 */
export function padEnd(str: string, targetLength: number, padString = ' '): string {
	return str.padEnd(targetLength, padString)
}

/**
 * get a random string
 * var rStr= randomString(32,'0123456789abcdefghijklmn');
 * @param  {number} length
 * @param  {string} chars
 */
export const randomString = (length: number, chars: string): string => {
	let result = ''
	for (let i = length; i > 0; --i) {
		result += chars[Math.floor(Math.random() * chars.length)]
	}
	return result
}

/**
 * replace all items in a string using regex
 * @param  {string} str
 * @param  {string} search
 * @param  {string} replacement
 */
export const replaceString = (str: string, search: string, replacement: string): string => {
	return str.replace(new RegExp(search, 'g'), replacement)
}

/**
 * Sanitizes a string by removing script tags and event handlers.
 * @param str The string to sanitize.
 * @returns The sanitized string.
 */
export function sanitizeString(str: string): string {
	return str.replace(/<script.*?>.*?<\/script>/gi, '').replace(/on\w+\s*=\s*(['"]).*?\1/gi, '')
}
