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

/**
 * Maps `items` through an async `fn` with at most `limit` calls in flight, resolving to the
 * results in input order. On the first rejection no new calls are started and the returned
 * promise rejects with that error, like `Promise.all`; calls already in flight are not cancelled.
 *
 * @example
 * ```typescript
 * const users = await mapLimit(ids, 4, (id) => getUser(id))
 * ```
 *
 * @param items The values to map.
 * @param limit Maximum number of concurrent calls — a positive integer.
 * @param fn Async mapper, called with each item and its index.
 * @returns {Promise<R[]>}
 * @throws {RangeError} If `limit` is not a positive integer (the promise rejects).
 */
export async function mapLimit<T, R>(
	items: Iterable<T>,
	limit: number,
	fn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
	if (!Number.isInteger(limit) || limit < 1) {
		throw new RangeError(`limit must be a positive integer, got ${limit}`)
	}
	const list = Array.from(items)
	const results = new Array<R>(list.length)
	let next = 0
	let failed = false
	async function worker() {
		while (!failed && next < list.length) {
			const i = next++
			try {
				results[i] = await fn(list[i] as T, i)
			} catch (err) {
				failed = true
				throw err
			}
		}
	}
	await Promise.all(Array.from({ length: Math.min(limit, list.length) }, worker))
	return results
}
