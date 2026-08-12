import { randomBytes } from 'node:crypto'

/**
 * Removes `<script>` blocks and inline `on*=` event-handler attributes from a string.
 *
 * **Not a sanitizer, and deliberately not named like one.** It is a blocklist over
 * two shapes, so anything it does not name survives, and a single pass can be
 * defeated by nesting the pattern inside itself. Use it as defence in depth on
 * markup you already trust. For untrusted input, escape with `html.escapeHtml`,
 * or run a real sanitizer such as DOMPurify when the markup must survive.
 *
 * @example
 * ```typescript
 * stripScriptish('<p onclick="steal()">hi</p><script>bad()</script>')
 * // '<p>hi</p>'
 *
 * // Bypassable by construction — this is XSS it does not name, so it survives:
 * stripScriptish('<a href="javascript:alert(1)">x</a>')
 * // '<a href="javascript:alert(1)">x</a>'
 * ```
 *
 * @param str The string to strip.
 * @returns The string with script blocks and inline handlers removed.
 */
export function stripScriptish(str: string): string {
	// The handler pass stays a regex: the alternation is over bounded character
	// classes, so there is nothing to backtrack into. The bare-value arm is what
	// the old `(['"]).*?\1` could not see — `onerror=alert(1)` needs no quotes to
	// fire, and `<img/onerror=…>` needs no space either. The leading separator is
	// consumed so removal leaves no stray character.
	//
	// Apply repeatedly until stable to avoid incomplete multi-character
	// sanitization where one removal can expose a new `on*=` sequence.
	let sanitized = removeScriptBlocks(str)
	let previous: string
	do {
		previous = sanitized
		sanitized = sanitized.replace(/[\s/]on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '')
	} while (sanitized !== previous)
	return sanitized
}

/**
 * One left-to-right pass removing `<script …>…</script …>` blocks.
 *
 * Deliberately not a regex. Every lazy variant of this pattern rescans to the end
 * of the input once per `<script` occurrence, so `'<script'.repeat(n)` costs
 * O(n²) — 2.5s at n=20_000, which is CodeQL `js/polynomial-redos` alert #11.
 * Each `indexOf` below resumes from a monotonically increasing offset, so the
 * whole pass is linear.
 *
 * Known ceiling: `</scriptural>` is accepted as a closing tag. Rejecting it means
 * resuming the closer search mid-scan, which is more machinery than an
 * intentionally coarse stripper is worth.
 */
function removeScriptBlocks(str: string): string {
	const lower = str.toLowerCase()
	let out = ''
	let from = 0
	let at = 0

	for (;;) {
		const open = lower.indexOf('<script', at)
		if (open === -1) break

		// `<scriptural>` is not a script tag. Skip past it rather than giving up.
		const next = lower[open + 7]
		if (next !== undefined && next !== '>' && next !== '/' && !/\s/.test(next)) {
			at = open + 7
			continue
		}

		const openEnd = lower.indexOf('>', open)
		if (openEnd === -1) break
		const close = lower.indexOf('</script', openEnd)
		if (close === -1) break
		// Matches `</script >` too, which the old pattern missed (js/bad-tag-filter).
		const closeEnd = lower.indexOf('>', close)
		if (closeEnd === -1) break

		out += str.slice(from, open)
		from = closeEnd + 1
		at = from
	}

	return out + str.slice(from)
}

/**
 * Checks if a password is strong (min 8 chars, upper, lower, number, special char).
 *
 * @example
 * ```typescript
 * isStrongPassword('Str0ng!pass') // true
 * isStrongPassword('password') // false
 * isStrongPassword('Sh0rt!') // false (under 8 characters)
 * ```
 *
 * @param password The password to check.
 * @returns True if the password is strong, false otherwise.
 */
export function isStrongPassword(password: string): boolean {
	return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
		password
	)
}

/**
 * Generates a cryptographically secure random token (hex string).
 *
 * @example
 * ```typescript
 * generateSecureToken() // 64 hex chars (32 bytes)
 * generateSecureToken(8) // 'c1f0a4e29b73d518'
 * ```
 *
 * @param length The number of bytes (not hex chars).
 * @returns A random hex string.
 */
export function generateSecureToken(length = 32): string {
	return randomBytes(length).toString('hex')
}
