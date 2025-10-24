/**
 * Returns a promise that resolves after a given delay (ms).
 * @param ms Milliseconds to wait.
 * @returns {Promise<void>}
 */
export function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Wraps a promise and returns a tuple [error, result].
 * @param promise The promise to wrap.
 * @returns {Promise<[any, T | undefined]>}
 */

export async function to<T>(promise: Promise<T>): Promise<[any, T | undefined]> {
	try {
		const result = await promise
		return [null, result]
	} catch (err) {
		return [err, undefined]
	}
}

/**
 * Returns a promise that rejects after a timeout if the input promise does not resolve.
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
 * Returns a promise that resolves when all promises resolve, or rejects on the first rejection (like Promise.all).
 * @param promises Array of promises.
 * @returns {Promise<T[]>}
 */
export function all<T>(promises: Promise<T>[]): Promise<T[]> {
	return Promise.all(promises)
}

/**
 * Returns a promise that resolves when all promises settle (like Promise.allSettled).
 * @param promises Array of promises.
 * @returns {Promise<PromiseSettledResult<T>[]>}
 */
export function allSettled<T>(promises: Promise<T>[]): Promise<PromiseSettledResult<T>[]> {
	return Promise.allSettled(promises)
}

/**
 * Returns a promise that resolves or rejects as soon as one of the promises resolves or rejects (like Promise.race).
 * @param promises Array of promises.
 * @returns {Promise<T>}
 */
export function race<T>(promises: Promise<T>[]): Promise<T> {
	return Promise.race(promises)
}
