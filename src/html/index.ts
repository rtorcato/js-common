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
 * unescapeHtml('a&#x2F;b&nbsp;c') // 'a/b c'
 * ```
 *
 * @param str The string to unescape.
 * @returns The unescaped string.
 */
export function unescapeHtml(str: string): string {
	const htmlUnescapes: Record<string, string> = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&#39;': "'",
		'&#x27;': "'",
		'&#x2F;': '/',
		'&nbsp;': ' ',
	}
	return str.replace(
		/&(?:amp|lt|gt|quot|#39|#x27|#x2F|nbsp);/g,
		(entity) => htmlUnescapes[entity] ?? entity
	)
}

/**
 * Finds the next `<…>` span at or after `from`, matching what `/<[^>]*>/` would match.
 *
 * ponytail: an index scan rather than the regex — same spans, but linear in the length of
 * the input instead of quadratic on inputs like `'<<<<<<<'` (CodeQL `js/polynomial-redos`).
 *
 * A `<` with no `>` after it is not a span, and neither is anything later in the string,
 * so `null` ends the search.
 */
function findTag(str: string, from: number): { open: number; close: number } | null {
	const open = str.indexOf('<', from)
	if (open === -1) return null
	const close = str.indexOf('>', open + 1)
	return close === -1 ? null : { open, close }
}

/**
 * Strips all HTML tags from a string.
 *
 * @example
 * ```typescript
 * stripHtmlTags('<p>Hello <b>world</b></p>') // 'Hello world'
 * stripHtmlTags('plain text') // 'plain text'
 *
 * // Strips `<…>` spans, so ragged input leaves residue — not a sanitizer.
 * stripHtmlTags('<<a>script>') // 'script>'
 * stripHtmlTags('<scr<x>ipt>') // 'ipt>'
 * ```
 *
 * Removes `<…>` spans and nothing else: it does not decode entities and does
 * not understand attributes or quoting, so ragged or nested markup leaves
 * attacker-controlled residue behind rather than a safe string. Not a
 * substitute for a real sanitizer such as DOMPurify when rendering untrusted
 * HTML — this produces display text, it does not make untrusted markup safe.
 *
 * @param str The string to strip tags from.
 * @returns The plain text string.
 */
export function stripHtmlTags(str: string): string {
	let out = ''
	let i = 0
	for (let tag = findTag(str, i); tag; tag = findTag(str, i)) {
		out += str.slice(i, tag.open)
		i = tag.close + 1
	}
	return out + str.slice(i)
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
 *
 * A heuristic for "does this look like markup", not a security gate: it only
 * looks for a non-empty `<…>` span, so `'a<b'` and `'<>'` are both false. Do
 * not use it to decide whether untrusted input is safe to render.
 *
 * @param str The string to check.
 * @returns True if the string contains HTML tags, false otherwise.
 */
export function containsHtml(str: string): boolean {
	// Same matches as /<[^>]+>/ — the `close > open + 1` check is the `+` (an empty `<>` is not a tag).
	for (let tag = findTag(str, 0); tag; tag = findTag(str, tag.close + 1)) {
		if (tag.close > tag.open + 1) return true
	}
	return false
}
