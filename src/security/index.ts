/**
 * Sanitizes a string by removing script tags and event handlers.
 * @param str The string to sanitize.
 * @returns The sanitized string.
 */
export function sanitizeString(str: string): string {
	return str.replace(/<script.*?>.*?<\/script>/gi, '').replace(/on\w+\s*=\s*(['"]).*?\1/gi, '')
}

/**
 * Checks if a password is strong (min 8 chars, upper, lower, number, special char).
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
 * @param length The number of bytes (not hex chars).
 * @returns A random hex string.
 */
import { randomBytes } from 'node:crypto'
export function generateSecureToken(length = 32): string {
	return randomBytes(length).toString('hex')
}
