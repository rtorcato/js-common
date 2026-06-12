import { describe, expectTypeOf, it } from 'vitest'
import { chunk, first, groupBy, last, unique } from './index'

describe('arrays — types', () => {
	it('first/last preserve element type and add undefined', () => {
		expectTypeOf(first([1, 2, 3])).toEqualTypeOf<number | undefined>()
		expectTypeOf(first(['a', 'b'])).toEqualTypeOf<string | undefined>()
		expectTypeOf(last([{ id: 1 }])).toEqualTypeOf<{ id: number } | undefined>()
	})

	it('unique preserves element type', () => {
		expectTypeOf(unique([1, 2, 3])).toEqualTypeOf<number[]>()
		expectTypeOf(unique(['a'])).toEqualTypeOf<string[]>()
	})

	it('chunk returns array of arrays of the element type', () => {
		expectTypeOf(chunk([1, 2, 3], 2)).toEqualTypeOf<number[][]>()
		expectTypeOf(chunk(['a', 'b'], 1)).toEqualTypeOf<string[][]>()
	})

	it('groupBy preserves element type in the grouped arrays', () => {
		const items = [{ kind: 'a' as const, n: 1 }]
		const grouped = groupBy(items, (x) => x.kind)
		expectTypeOf(grouped).toEqualTypeOf<Record<string | number, { kind: 'a'; n: number }[]>>()
	})
})
