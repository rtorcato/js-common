/**
 * Returns a promise that resolves after the specified number of milliseconds.
 * @param ms Number of milliseconds to sleep.
 * @returns Promise that resolves after ms milliseconds.
 */
export const sleep = (ms: number): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Blocks the event loop for the specified number of milliseconds (synchronous sleep).
 * Not recommended for production use, but useful for scripts or tests.
 * @param ms Number of milliseconds to block.
 */
export function sleepSync(ms: number): void {
	const end = Date.now() + ms
	while (Date.now() < end) {}
}

/**
 * Returns a promise that resolves after a random delay between min and max milliseconds.
 * @param min Minimum milliseconds to sleep.
 * @param max Maximum milliseconds to sleep.
 * @returns Promise that resolves after a random delay.
 */
export function sleepRandom(min: number, max: number): Promise<void> {
	const ms = Math.floor(Math.random() * (max - min + 1)) + min
	return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Returns a promise that resolves after ms, or rejects if aborted via AbortSignal.
 * @param ms Milliseconds to sleep.
 * @param signal Optional AbortSignal to cancel the sleep.
 * @returns Promise that resolves after ms or rejects if aborted.
 */
export function sleepWithAbort(ms: number, signal?: AbortSignal): Promise<void> {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(resolve, ms)
		if (signal) {
			signal.addEventListener('abort', () => {
				clearTimeout(timer)
				reject(new Error('Sleep aborted'))
			})
		}
	})
}
