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
 * Returns a promise that rejects when the given AbortSignal is aborted.
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
		if (signal.aborted) {
			reject(new DOMException('Aborted', 'AbortError'))
		} else {
			signal.addEventListener(
				'abort',
				() => {
					reject(new DOMException('Aborted', 'AbortError'))
				},
				{ once: true }
			)
		}
	})
}

/**
 * Wraps a promise and rejects it if the signal is aborted.
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
	return Promise.race([promise, abortPromise(signal)])
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
