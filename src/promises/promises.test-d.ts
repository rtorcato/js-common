import { describe, expectTypeOf, it } from 'vitest'
import { to, withTimeout } from './index'

describe('promises — types', () => {
	it('withTimeout preserves the awaited type', () => {
		expectTypeOf(withTimeout(Promise.resolve(42), 10)).toEqualTypeOf<Promise<number>>()
		expectTypeOf(withTimeout(Promise.resolve({ id: 1 }), 10)).toEqualTypeOf<
			Promise<{ id: number }>
		>()
	})

	it('to returns an [error, value] tuple with the value widened to undefined', () => {
		// The error slot is `unknown`, so call sites have to narrow before using it.
		expectTypeOf(to(Promise.resolve('x'))).toEqualTypeOf<Promise<[unknown, string | undefined]>>()
	})
})
