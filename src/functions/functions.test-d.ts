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
		expectTypeOf(debounced).toEqualTypeOf<typeof fn>()
		expectTypeOf(debounced).parameters.toEqualTypeOf<[string, number]>()
		expectTypeOf(debounced).returns.toEqualTypeOf<void>()
		// @ts-expect-error — arguments are still checked
		debounced(1, 'a')
	})

	it('throttle preserves the wrapped function parameters', () => {
		const fn = (_event: { x: number }) => {}
		const throttled = throttle(fn, 100)
		expectTypeOf(throttled).toEqualTypeOf<typeof fn>()
		expectTypeOf(throttled).parameters.toEqualTypeOf<[{ x: number }]>()
		expectTypeOf(throttled).returns.toEqualTypeOf<void>()
		// @ts-expect-error — arguments are still checked
		throttled({ y: 1 })
	})

	it('debounce/throttle keep a non-void return type even though the wrapper drops it', () => {
		// Current (unsound) behaviour: the `=> void` constraint accepts value-returning
		// functions, so `T` — and therefore the returned type — still says `number`,
		// while at runtime the wrapper returns undefined. Asserted as-is, not endorsed.
		const fn = (n: number) => n * 2
		expectTypeOf(debounce(fn, 10)).returns.toEqualTypeOf<number>()
		expectTypeOf(throttle(fn, 10)).returns.toEqualTypeOf<number>()
	})
})
