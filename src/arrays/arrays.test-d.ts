import { describe, expectTypeOf, it } from 'vitest'
import { chunk, partition, sortBy, unique, zip } from './index'

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

describe('arrays — grouping helper types', () => {
	it('partition returns a tuple of element arrays', () => {
		expectTypeOf(partition([1, 2], (n) => n > 1)).toEqualTypeOf<[number[], number[]]>()
	})

	it('sortBy preserves the element type', () => {
		expectTypeOf(sortBy([1, 2], (n) => n)).toEqualTypeOf<number[]>()
	})

	it('zip pairs both element types', () => {
		expectTypeOf(zip([1], ['a'])).toEqualTypeOf<[number, string][]>()
	})
})
