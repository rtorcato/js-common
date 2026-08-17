/**
 * Wraps a promise and returns a tuple [error, result].
 * The error slot is `unknown` — narrow it at the call site before touching its properties.
 *
 * @example
 * ```typescript
 * const [err, value] = await to(Promise.resolve(42))
 * // err = null, value = 42
 *
 * const [err2, value2] = await to(Promise.reject(new Error('boom')))
 * const message = err2 instanceof Error ? err2.message : String(err2)
 * // message = 'boom', value2 = undefined
 * ```
 *
 * @param promise The promise to wrap.
 * @returns {Promise<[unknown, T | undefined]>}
 */

export async function to<T>(promise: Promise<T>): Promise<[unknown, T | undefined]> {
	try {
		const result = await promise
		return [null, result]
	} catch (err) {
		return [err, undefined]
	}
}

/**
 * Returns a promise that rejects after a timeout if the input promise does not resolve.
 *
 * @example
 * ```typescript
 * await withTimeout(delay(10).then(() => 'fast'), 100) // 'fast'
 * await withTimeout(delay(500), 100) // rejects with Error('Timeout')
 * ```
 *
 * @param promise The promise to race.
 * @param ms Timeout in milliseconds.
 * @param error Optional error to throw on timeout.
 * @returns {Promise<T>}
 */
export function withTimeout<T>(
	promise: Promise<T>,
	ms: number,
	error: any = new Error('Timeout')
): Promise<T> {
	return Promise.race([promise, new Promise<T>((_, reject) => setTimeout(() => reject(error), ms))])
}
