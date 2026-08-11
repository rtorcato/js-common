import { randomBytes } from 'node:crypto'

/**
 * Sanitizes a string by removing script tags and event handlers.
 *
 * @example
 * ```typescript
 * sanitizeString('<p onclick="steal()">hi</p><script>bad()</script>')
 * // '<p >hi</p>'
 *
 * // Blocklist-based, so it is bypassable — not a substitute for a real
 * // sanitizer such as DOMPurify when rendering untrusted HTML.
 * ```
 *
 * @param str The string to sanitize.
 * @returns The sanitized string.
 */
export function sanitizeString(str: string): string {
	return str.replace(/<script.*?>.*?<\/script>/gi, '').replace(/on\w+\s*=\s*(['"]).*?\1/gi, '')
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
