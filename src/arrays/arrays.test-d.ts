import { describe, expectTypeOf, it } from 'vitest'
import { chunk, unique } from './index'

describe('arrays — types', () => {
	it('unique preserves element type', () => {
		expectTypeOf(unique([1, 2, 3])).toEqualTypeOf<number[]>()
		expectTypeOf(unique(['a'])).toEqualTypeOf<string[]>()
	})

	it('chunk returns array of arrays of the element type', () => {
		expectTypeOf(chunk([1, 2, 3], 2)).toEqualTypeOf<number[][]>()
		expectTypeOf(chunk(['a', 'b'], 1)).toEqualTypeOf<string[][]>()
	})
})
