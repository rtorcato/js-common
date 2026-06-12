import { describe, expectTypeOf, it } from 'vitest'
import { deepClone, deepMerge, omit, pick } from './index'

describe('objects — types', () => {
	it('pick narrows to the selected keys', () => {
		const obj = { a: 1, b: 'two', c: true }
		const out = pick(obj, ['a', 'c'])
		expectTypeOf(out).toEqualTypeOf<{ a: number; c: boolean }>()
		// @ts-expect-error — 'b' was omitted
		out.b
	})

	it('omit drops the listed keys', () => {
		const obj = { a: 1, b: 'two', c: true }
		const out = omit(obj, ['b'])
		expectTypeOf(out).toEqualTypeOf<{ a: number; c: boolean }>()
		// @ts-expect-error — 'b' was omitted
		out.b
	})

	it('deepMerge yields the intersection type', () => {
		const a = { x: 1 }
		const b = { y: 'two' }
		const out = deepMerge(a, b)
		expectTypeOf(out).toEqualTypeOf<{ x: number } & { y: string }>()
	})

	it('deepClone is identity over the input type', () => {
		const value = { nested: { id: 1 as const } }
		expectTypeOf(deepClone(value)).toEqualTypeOf<typeof value>()
	})
})
