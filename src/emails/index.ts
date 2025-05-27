/**
 * Validates if a string is a valid email address (simple regex).
 * @param email The email address to validate.
 * @returns True if valid, false otherwise.
 */
export function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Normalizes an email address by trimming and converting to lowercase.
 * @param email The email address to normalize.
 * @returns The normalized email address.
 */
export function normalizeEmail(email: string): string {
	return email.trim().toLowerCase()
}

/**
 * Masks an email address for privacy (e.g., j***@domain.com).
 * @param email The email address to mask.
 * @returns The masked email address.
 */
export function maskEmail(email: string): string {
	const [user, domain] = email.split('@')
	if (!user || !domain) return email
	if (user.length <= 1) return `*@${domain}`
	return `${user[0]}${'*'.repeat(Math.max(1, user.length - 1))}@${domain}`
}

/**
 * Extracts the domain from an email address.
 * @param email The email address.
 * @returns The domain part of the email, or an empty string if invalid.
 */
export function getEmailDomain(email: string): string {
	const parts = email.split('@')
	return parts.length === 2 ? (parts[1] ?? '') : ''
}

/**
 * Checks if an email address is from a free provider (e.g., gmail, yahoo, outlook).
 * @param email The email address.
 * @returns True if the email is from a free provider, false otherwise.
 */
const freeProviders = [
	'gmail.com',
	'yahoo.com',
	'outlook.com',
	'hotmail.com',
	'icloud.com',
	'aol.com',
	'zoho.com',
	'mail.com',
]
export function isFreeEmailProvider(email: string): boolean {
	return freeProviders.includes(getEmailDomain(email))
}
