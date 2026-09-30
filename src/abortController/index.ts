/**
 * Creates a new AbortController and returns its controller and signal.
 *
 * @example
 * ```typescript
 * const { controller, signal } = createAbortController()
 * signal.aborted // false
 * controller.abort()
 * signal.aborted // true
 * ```
 *
 * @returns {{ controller: AbortController, signal: AbortSignal }}
 */
export function createAbortController() {
	const controller = new AbortController()
	return { controller, signal: controller.signal }
}

/**
 * Returns a promise that rejects with `signal.reason` when the given AbortSignal is aborted.
 *
 * @example
 * ```typescript
 * const { controller, signal } = createAbortController()
 * const pending = abortPromise(signal)
 * controller.abort()
 * await pending.catch((err) => err.name) // 'AbortError'
 * ```
 *
 * @param signal The AbortSignal to listen to.
 * @returns {Promise<never>}
 */
export function abortPromise(signal: AbortSignal): Promise<never> {
	return new Promise((_, reject) => {
		if (signal.aborted) reject(signal.reason)
		else signal.addEventListener('abort', () => reject(signal.reason), { once: true })
	})
}

/**
 * Wraps a promise and rejects it with `signal.reason` if the signal is aborted.
 * The abort listener is removed once the promise settles.
 *
 * @example
 * ```typescript
 * const { controller, signal } = createAbortController()
 * const slow = new Promise<string>((resolve) => setTimeout(() => resolve('done'), 50))
 *
 * await withAbort(slow, signal) // 'done'
 *
 * controller.abort()
 * await withAbort(slow, signal).catch((err) => err.name) // 'AbortError'
 * ```
 *
 * @param promise The promise to wrap.
 * @param signal The AbortSignal.
 * @returns {Promise<T>}
 */
export function withAbort<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
	if (signal.aborted) return Promise.reject(signal.reason)
	return new Promise<T>((resolve, reject) => {
		const onAbort = () => reject(signal.reason)
		signal.addEventListener('abort', onAbort, { once: true })
		const cleanup = () => signal.removeEventListener('abort', onAbort)
		promise.then(
			(value) => {
				cleanup()
				resolve(value)
			},
			(error) => {
				cleanup()
				reject(error)
			}
		)
	})
}

/**
 * Aborts the given controller after a timeout (ms).
 * @param controller The AbortController.
 * @param ms Timeout in milliseconds.
 * @returns {NodeJS.Timeout | number} The timeout ID.
 */
export function abortAfter(controller: AbortController, ms: number): ReturnType<typeof setTimeout> {
	return setTimeout(() => controller.abort(), ms)
}
