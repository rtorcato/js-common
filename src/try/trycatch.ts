export type Success<T> = { data: T; error: null }

export type Failure<E> = { data: null; error: E }

export type Result<T, E = Error> = Success<T> | Failure<E>

export function isSuccess<T, E>(result: Result<T, E>): result is Success<T> {
	return result.error === null
}

export async function tryCatch<T, E = Error>(fn: () => Promise<T>): Promise<Result<T, E>> {
	try {
		const data = await fn()
		return { data, error: null }
	} catch (error) {
		return { data: null, error: error as E }
	}
}
