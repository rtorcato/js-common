/**
 * Escapes special HTML characters in a string to prevent XSS attacks.
 *
 * @example
 * ```typescript
 * escapeHtml('<script>alert("x")</script>')
 * // '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'
 * escapeHtml("Tom & Jerry's") // 'Tom &amp; Jerry&#39;s'
 * ```
 *
 * @param str The string to escape.
 * @returns The escaped string.
 */
export function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
}

/**
 * Unescapes HTML entities in a string.
 *
 * @example
 * ```typescript
 * unescapeHtml('&lt;b&gt;hi&lt;/b&gt;') // '<b>hi</b>'
 * unescapeHtml('Tom &amp; Jerry') // 'Tom & Jerry'
 * ```
 *
 * @param str The string to unescape.
 * @returns The unescaped string.
 */
export function unescapeHtml(str: string): string {
	return str
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&amp;/g, '&')
}

/**
 * Strips all HTML tags from a string.
 *
 * @example
 * ```typescript
 * stripHtmlTags('<p>Hello <b>world</b></p>') // 'Hello world'
 * stripHtmlTags('plain text') // 'plain text'
 * ```
 *
 * @param str The string to strip tags from.
 * @returns The plain text string.
 */
export function stripHtmlTags(str: string): string {
	return str.replace(/<[^>]*>/g, '')
}

/**
 * Converts a plain text string to a simple HTML paragraph (newlines become `<br>` tags).
 * @param str The plain text string.
 * @returns The HTML string with `<br>` tags.
 */
export function textToHtml(str: string): string {
	return str.replace(/\n/g, '<br>')
}

/**
 * Checks if a string contains any HTML tags.
 * @param str The string to check.
 * @returns True if the string contains HTML tags, false otherwise.
 */
export function containsHtml(str: string): boolean {
	return /<[^>]+>/.test(str)
}
