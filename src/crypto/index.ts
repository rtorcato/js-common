// Web Crypto (`globalThis.crypto`) only, so this module runs in Node >= 24, browsers and
// edge runtimes alike. `subtle` is async, which is why the digests return promises.

function toHex(buffer: ArrayBuffer | Uint8Array): string {
	return Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, '0')).join('')
}

/** Maps the Node-style name (`'sha256'`) to the Web Crypto one (`'SHA-256'`). */
function webAlgorithm(algorithm: string): string {
	return `SHA-${algorithm.replace(/^sha-?/i, '')}`
}

/**
 * Hashes a string using the specified algorithm.
 *
 * Web Crypto supports SHA-1/256/384/512 only — there is no md5. An unsupported
 * algorithm rejects.
 *
 * @example
 * ```typescript
 * await hashString('hello')
 * // '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
 * await hashString('hello', 'sha1') // 'aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d'
 * ```
 *
 * @param str The string to hash.
 * @param algorithm The hash algorithm (default: 'sha256').
 * @returns The hex-encoded hash.
 */
export async function hashString(
	str: string,
	algorithm: 'sha1' | 'sha256' | 'sha384' | 'sha512' = 'sha256'
): Promise<string> {
	const digest = await crypto.subtle.digest(webAlgorithm(algorithm), new TextEncoder().encode(str))
	return toHex(digest)
}

/**
 * Generates a cryptographically secure random hex string of the specified length (in bytes).
 *
 * @example
 * ```typescript
 * randomHex(4) // '9f3c1ab7' (8 hex chars)
 * randomHex() // 32 hex chars (16 bytes)
 * randomHex(32) // 64 hex chars — a password-reset token
 * ```
 *
 * @param length The number of bytes (not hex chars).
 * @returns A random hex string.
 */
export function randomHex(length = 16): string {
	return toHex(crypto.getRandomValues(new Uint8Array(length)))
}

/**
 * Creates an HMAC hash of a string using a secret and algorithm.
 *
 * @example
 * ```typescript
 * await hmacHash('payload', 's3cret')
 * // 'd1d0f5b6...' (64 hex chars, stable for the same input + secret)
 * await hmacHash('payload', 's3cret', 'sha1') // 40 hex chars
 * ```
 *
 * @param str The string to hash.
 * @param secret The secret key.
 * @param algorithm The hash algorithm (default: 'sha256').
 * @returns The hex-encoded HMAC.
 */
export async function hmacHash(
	str: string,
	secret: string,
	algorithm: 'sha1' | 'sha256' | 'sha384' | 'sha512' = 'sha256'
): Promise<string> {
	const encoder = new TextEncoder()
	const key = await crypto.subtle.importKey(
		'raw',
		encoder.encode(secret),
		{ name: 'HMAC', hash: webAlgorithm(algorithm) },
		false,
		['sign']
	)
	return toHex(await crypto.subtle.sign('HMAC', key, encoder.encode(str)))
}

/**
 * Encodes a string (as UTF-8) to base64.
 * @param str The string to encode.
 * @returns The base64-encoded string.
 */
export function base64Encode(str: string): string {
	return btoa(Array.from(new TextEncoder().encode(str), (b) => String.fromCharCode(b)).join(''))
}

/**
 * Decodes a base64 string to a UTF-8 string.
 * @param b64 The base64 string to decode (standard alphabet; padding optional).
 * @returns The decoded string.
 * @throws {DOMException} When `b64` is not valid base64 (including the URL-safe `-`/`_` alphabet).
 */
export function base64Decode(b64: string): string {
	return new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)))
}
