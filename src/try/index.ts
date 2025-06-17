type AttemptSuccess<T> = readonly [null, T]
type AttemptFailure<E> = readonly [E, null]
type AttemptResult<E, T> = AttemptSuccess<T> | AttemptFailure<E>
type AttemptResultAsync<E, T> = Promise<AttemptResult<E, T>>

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function attempt<E = Error, T = Promise<any>>(operation: T): AttemptResultAsync<E, T>
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function attempt<E = Error, T = any>(operation: () => T): AttemptResult<E, T>
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function attempt<E = Error, T = any>(
	operation: Promise<T> | (() => T)
): AttemptResult<E, T> | AttemptResultAsync<E, T> {
	if (operation instanceof Promise) {
		return operation
			.then((value: T) => [null, value] as const)
			.catch((error: E) => [error, null] as const)
	}

	try {
		const data = operation()
		return [null, data]
	} catch (error) {
		return [error as E, null]
	}
}
