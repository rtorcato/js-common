import { describe, expectTypeOf, it } from 'vitest'
import { type Failure, type Result, type Success, isSuccess, tryCatch } from './trycatch'

describe('try — types', () => {
	it('Result<T,E> is the union of Success<T> and Failure<E>', () => {
		expectTypeOf<Result<number>>().toEqualTypeOf<Success<number> | Failure<Error>>()
		expectTypeOf<Result<string, TypeError>>().toEqualTypeOf<Success<string> | Failure<TypeError>>()
	})

	it('isSuccess narrows Result to Success in the true branch', () => {
		const r = { data: 1, error: null } as Result<number>
		if (isSuccess(r)) {
			expectTypeOf(r).toEqualTypeOf<Success<number>>()
			expectTypeOf(r.data).toEqualTypeOf<number>()
			expectTypeOf(r.error).toEqualTypeOf<null>()
		} else {
			expectTypeOf(r).toEqualTypeOf<Failure<Error>>()
		}
	})

	it('tryCatch returns Promise<Result<T, E>> with the resolved type', async () => {
		const out = tryCatch(async () => 42)
		expectTypeOf(out).toEqualTypeOf<Promise<Result<number, Error>>>()

		const explicit = tryCatch<string, TypeError>(async () => 'x')
		expectTypeOf(explicit).toEqualTypeOf<Promise<Result<string, TypeError>>>()
	})
})
