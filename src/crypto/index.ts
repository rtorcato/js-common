import { createHash, createHmac, randomBytes } from 'node:crypto'

/**
 * Hashes a string using the specified algorithm.
 * @param str The string to hash.
 * @param algorithm The hash algorithm (default: 'sha256').
 * @returns The hex-encoded hash.
 */
export function hashString(str: string, algorithm = 'sha256'): string {
	return createHash(algorithm).update(str).digest('hex')
}

/**
 * Generates a random hex string of the specified length (in bytes).
 * @param length The number of bytes (not hex chars).
 * @returns A random hex string.
 */
export function randomHex(length = 16): string {
	return randomBytes(length).toString('hex')
}

/**
 * Creates an HMAC hash of a string using a secret and algorithm.
 * @param str The string to hash.
 * @param secret The secret key.
 * @param algorithm The hash algorithm (default: 'sha256').
 * @returns The hex-encoded HMAC.
 */
export function hmacHash(str: string, secret: string, algorithm = 'sha256'): string {
	return createHmac(algorithm, secret).update(str).digest('hex')
}

/**
 * Encodes a string to base64.
 * @param str The string to encode.
 * @returns The base64-encoded string.
 */
export function base64Encode(str: string): string {
	return Buffer.from(str, 'utf-8').toString('base64')
}

/**
 * Decodes a base64 string.
 * @param b64 The base64 string to decode.
 * @returns The decoded string.
 */
export function base64Decode(b64: string): string {
	return Buffer.from(b64, 'base64').toString('utf-8')
}
