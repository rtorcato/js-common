import { sleepWithAbort } from '../sleep'

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

/** Options for `retry`. Every field is optional. */
export type RetryOptions = {
	/** Retries after the first attempt, so `retries + 1` attempts in total. Default 3. */
	retries?: number
	/** Base delay in ms; the cap doubles each retry (`minDelay * 2 ** (attempt - 1)`). Default 100. */
	minDelay?: number
	/** Upper bound on a single wait, in ms. Default 10_000. */
	maxDelay?: number
	/** Full jitter: wait a random 0..cap instead of the full cap. Default true. */
	jitter?: boolean
	/** Return false to stop retrying and reject with `err`. Default: retry every error. */
	shouldRetry?: (err: unknown, attempt: number) => boolean
	/** Stops further attempts and aborts the wait; the promise rejects with `signal.reason`. */
	signal?: AbortSignal
}

/**
 * Runs `fn` until it resolves, retrying rejections with exponential backoff and full jitter.
 * `attempt` is 1-based. Rejects with the last error once retries run out or `shouldRetry`
 * says no, or with `signal.reason` if the signal aborts.
 *
 * @example
 * ```typescript
 * const report = await retry((attempt, signal) => fetch('/api/report', { signal }), {
 *   retries: 4,
 *   shouldRetry: (err) => !(err instanceof HttpError) || err.status >= 500,
 *   signal: AbortSignal.timeout(30_000),
 * })
 * ```
 *
 * @param fn The operation to run; receives the attempt number and the caller's signal.
 * @param opts Retry count, backoff bounds, jitter, retry predicate and abort signal.
 * @returns {Promise<T>}
 */
export async function retry<T>(
	fn: (attempt: number, signal?: AbortSignal) => Promise<T>,
	opts: RetryOptions = {}
): Promise<T> {
	const {
		retries = 3,
		minDelay = 100,
		maxDelay = 10_000,
		jitter = true,
		shouldRetry = () => true,
		signal,
	} = opts
	for (let attempt = 1; ; attempt++) {
		signal?.throwIfAborted()
		try {
			return await fn(attempt, signal)
		} catch (err) {
			if (signal?.aborted) throw signal.reason
			if (attempt > retries || !shouldRetry(err, attempt)) throw err
		}
		const cap = Math.min(maxDelay, minDelay * 2 ** (attempt - 1))
		await sleepWithAbort(jitter ? Math.random() * cap : cap, signal)
	}
}
