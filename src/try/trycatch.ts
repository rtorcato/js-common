/**
 * Successful branch of a `Result` — carries the value and a `null` error.
 */
export type Success<T> = { data: T; error: null }

/**
 * Error branch of a `Result` — carries a `null` value and an error of type `E`.
 */
export type Failure<E> = { data: null; error: E }

/**
 * Go-style discriminated union representing either a `Success<T>` or a `Failure<E>`,
 * for async code that prefers explicit error returns over thrown exceptions.
 *
 * @example
 * ```typescript
 * const ok: Result<number> = { data: 42, error: null }
 * const bad: Result<number> = { data: null, error: new Error('boom') }
 * ```
 */
export type Result<T, E = Error> = Success<T> | Failure<E>

/**
 * Type guard that narrows a `Result` to its `Success` branch when the error is `null`.
 *
 * @example
 * ```typescript
 * const result = await tryCatch(async () => 42)
 * if (isSuccess(result)) {
 * 	result.data // 42, narrowed to number
 * }
 * ```
 */
export function isSuccess<T, E>(result: Result<T, E>): result is Success<T> {
	return result.error === null
}

/**
 * Run an async function and capture any thrown error into a `Result`, eliminating
 * try/catch at the call site.
 *
 * @example
 * ```typescript
 * const { data, error } = await tryCatch(() => fetch('/api/user').then((r) => r.json()))
 * // success: { data: { id: 1 }, error: null }
 * // failure: { data: null, error: Error }
 *
 * if (error) return console.error(error)
 * console.log(data.id)
 * ```
 */
export async function tryCatch<T, E = Error>(fn: () => Promise<T>): Promise<Result<T, E>> {
	try {
		const data = await fn()
		return { data, error: null }
	} catch (error) {
		return { data: null, error: error as E }
	}
}
