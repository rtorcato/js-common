import { describe, expectTypeOf, it } from 'vitest'
import { debounce, once, throttle } from './index'

describe('functions — types', () => {
	it('once preserves the wrapped function signature', () => {
		const load = (id: number, label: string) => ({ id, label })
		const wrapped = once(load)
		expectTypeOf(wrapped).toEqualTypeOf<typeof load>()
		expectTypeOf(wrapped).parameters.toEqualTypeOf<[number, string]>()
		expectTypeOf(wrapped).returns.toEqualTypeOf<{ id: number; label: string }>()
		// @ts-expect-error — arguments are still checked
		wrapped('1', 'a')
	})

	it('debounce preserves the wrapped function parameters', () => {
		const fn = (_a: string, _b: number) => {}
		const debounced = debounce(fn, 100)
		expectTypeOf(debounced).parameters.toEqualTypeOf<[string, number]>()
		expectTypeOf(debounced).returns.toEqualTypeOf<void>()
		// @ts-expect-error — arguments are still checked
		debounced(1, 'a')
	})

	it('throttle preserves the wrapped function parameters', () => {
		const fn = (_event: { x: number }) => {}
		const throttled = throttle(fn, 100)
		expectTypeOf(throttled).parameters.toEqualTypeOf<[{ x: number }]>()
		expectTypeOf(throttled).returns.toEqualTypeOf<void>()
		// @ts-expect-error — arguments are still checked
		throttled({ y: 1 })
	})

	it('debounce/throttle return void even when the wrapped function returns a value', () => {
		// The wrapper never forwards `fn`'s return value, so the type must not claim it does.
		const fn = (n: number) => n * 2
		expectTypeOf(debounce(fn, 10)).returns.toEqualTypeOf<void>()
		expectTypeOf(throttle(fn, 10)).returns.toEqualTypeOf<void>()
		expectTypeOf(debounce(fn, 10)).parameters.toEqualTypeOf<[number]>()
	})
})
