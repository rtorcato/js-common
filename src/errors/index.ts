/**
 * Creates a new Error with a custom name and message.
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
 * @param error The error to check.
 * @param name The error name to match.
 * @returns True if the error matches the name, false otherwise.
 */
export function isErrorName(error: unknown, name: string): boolean {
	return error instanceof Error && error.name === name
}

/**
 * Gets the error message from an unknown error value.
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

// biome-ignore lint/suspicious/noExplicitAny: Assertion function needs any type for flexible conditions
export function assert(condition: any, message: string): asserts condition {
	if (!condition) {
		throw new Error(message)
	}
}

/**
 * Wraps a function and catches errors, returning a fallback value if an error occurs.
 * @param fn The function to wrap.
 * @param fallback The fallback value to return on error.
 *
 * @example
 * const result = await tryCatch(async () => {
 *   // some code that might throw
 *   return await fetchData();
 * }, []);
 * // result will be [] if fetchData throws an error*/
export async function tryCatch<T>(fn: () => Promise<T> | T, fallback: T): Promise<T> {
	try {
		return await fn()
	} catch {
		return fallback
	}
}
