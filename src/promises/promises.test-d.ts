import { describe, expectTypeOf, it } from 'vitest'
import { all, allSettled, race, to, withTimeout } from './index'

describe('promises — types', () => {
	it('withTimeout preserves the awaited type', () => {
		expectTypeOf(withTimeout(Promise.resolve(42), 10)).toEqualTypeOf<Promise<number>>()
		expectTypeOf(withTimeout(Promise.resolve({ id: 1 }), 10)).toEqualTypeOf<
			Promise<{ id: number }>
		>()
	})

	it('to returns an [error, value] tuple with the value widened to undefined', () => {
		// The error slot is `any` — see the note in the issue thread, not fixed here.
		expectTypeOf(to(Promise.resolve('x'))).toEqualTypeOf<Promise<[any, string | undefined]>>()
	})

	it('all/allSettled/race preserve the element type', () => {
		expectTypeOf(all([Promise.resolve(1)])).toEqualTypeOf<Promise<number[]>>()
		expectTypeOf(allSettled([Promise.resolve('a')])).toEqualTypeOf<
			Promise<PromiseSettledResult<string>[]>
		>()
		expectTypeOf(race([Promise.resolve(true)])).toEqualTypeOf<Promise<boolean>>()
	})
})
