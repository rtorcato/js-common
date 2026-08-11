/**
 * Creates a new Error with a custom name and message.
 *
 * @example
 * ```typescript
 * const err = createCustomError('NotFoundError', 'user 42 is missing')
 * err.name // 'NotFoundError'
 * err.message // 'user 42 is missing'
 * err instanceof Error // true
 * ```
 *
 * @param name The error name.
 * @param message The error message.
 * @returns The custom Error object.
 */
export function createCustomError(name: string, message: string): Error {
	const err = new Error(message)
	err.name = name
	return err
}

/**
 * Checks if an error is an instance of a specific error name.
 *
 * @example
 * ```typescript
 * const err = createCustomError('NotFoundError', 'missing')
 * isErrorName(err, 'NotFoundError') // true
 * isErrorName(err, 'TypeError') // false
 * isErrorName('oops', 'TypeError') // false
 * ```
 *
 * @param error The error to check.
 * @param name The error name to match.
 * @returns True if the error matches the name, false otherwise.
 */
export function isErrorName(error: unknown, name: string): boolean {
	return error instanceof Error && error.name === name
}

/**
 * Gets the error message from an unknown error value.
 *
 * @example
 * ```typescript
 * getErrorMessage(new Error('boom')) // 'boom'
 * getErrorMessage('boom') // 'boom'
 * getErrorMessage({ code: 500 }) // '{"code":500}'
 * ```
 *
 * @param error The error value.
 * @returns The error message, or a stringified version if not an Error.
 */
export function getErrorMessage(error: unknown): string {
	if (error instanceof Error) return error.message
	if (typeof error === 'string') return error
	try {
		return JSON.stringify(error)
	} catch {
		return String(error)
	}
}

/**
 * Throws an error if the condition is false.
 * @param condition The condition to check.
 * @param message The error message to throw if the condition is false.
 */

export function assert(condition: unknown, message: string): asserts condition {
	if (!condition) {
		throw new Error(message)
	}
}

/**
 * Wraps a function and catches errors, returning a fallback value if an error occurs.
 * Use this only when the fallback is genuinely safe and the error can be ignored.
 * For typed error handling, prefer `tryCatch` from `@rtorcato/js-common/try`.
 * @param fn The function to wrap.
 * @param fallback The fallback value to return on error.
 *
 * @example
 * ```typescript
 * await tryWithFallback(async () => fetchData(), []) // the data, or [] if it throws
 * await tryWithFallback(() => JSON.parse('{'), {}) // {}
 * ```
 */
export async function tryWithFallback<T>(fn: () => Promise<T> | T, fallback: T): Promise<T> {
	try {
		return await fn()
	} catch {
		return fallback
	}
}
