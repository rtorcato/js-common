/**
 * Returns a function that only calls the original function once.
 *
 * @example
 * ```typescript
 * let calls = 0
 * const init = once(() => ++calls)
 * init() // 1
 * init() // 1 (cached, not called again)
 * calls // 1
 * ```
 *
 * @param fn The function to wrap.
 * @returns {Function}
 */

export function once<T extends (...args: any[]) => any>(fn: T): T {
	let called = false
	let result: any
	return function (this: any, ...args: any[]) {
		if (!called) {
			called = true
			result = fn.apply(this, args)
		}
		return result
	} as T
}

/**
 * Returns a debounced version of a function.
 *
 * @example
 * ```typescript
 * const search = debounce((term: string) => console.log(term), 300)
 * search('a')
 * search('ab')
 * search('abc') // only 'abc' is logged, 300ms after the last call
 * ```
 *
 * @param fn The function to debounce.
 * @param wait Milliseconds to wait.
 * @returns {Function}
 */

export function debounce<T extends (...args: any[]) => void>(fn: T, wait: number): T {
	let timeout: ReturnType<typeof setTimeout> | undefined
	return function (this: any, ...args: any[]) {
		clearTimeout(timeout)
		timeout = setTimeout(() => fn.apply(this, args), wait)
	} as T
}

/**
 * Returns a throttled version of a function.
 *
 * @example
 * ```typescript
 * const onScroll = throttle(() => console.log(window.scrollY), 100)
 * window.addEventListener('scroll', onScroll)
 * // fires at most once every 100ms, leading edge first
 * ```
 *
 * @param fn The function to throttle.
 * @param wait Milliseconds to wait between calls.
 * @returns {Function}
 */

export function throttle<T extends (...args: any[]) => void>(fn: T, wait: number): T {
	let last = 0
	return function (this: any, ...args: any[]) {
		const now = Date.now()
		if (now - last >= wait) {
			last = now
			fn.apply(this, args)
		}
	} as T
}

/**
 * Composes functions from right to left.
 * @param fns Functions to compose.
 * @returns {Function}
 */
export function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
	return (arg: T) => fns.reduceRight((acc, fn) => fn(acc), arg)
}

/**
 * Pipes functions from left to right.
 * @param fns Functions to pipe.
 * @returns {Function}
 */
export function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
	return (arg: T) => fns.reduce((acc, fn) => fn(acc), arg)
}
