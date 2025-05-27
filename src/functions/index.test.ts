import { describe, expect, it, vi } from 'vitest'
import { compose, debounce, once, pipe, throttle } from './index'

describe('functions module', () => {
	it('once only calls the function once', () => {
		const fn = vi.fn((x) => x + 1)
		const wrapped = once(fn)
		expect(wrapped(1)).toBe(2)
		expect(wrapped(2)).toBe(2)
		expect(fn).toHaveBeenCalledTimes(1)
	})

	it('debounce delays function call', async () => {
		vi.useFakeTimers()
		const fn = vi.fn()
		const debounced = debounce(fn, 50)
		debounced()
		debounced()
		expect(fn).not.toHaveBeenCalled()
		vi.advanceTimersByTime(49)
		expect(fn).not.toHaveBeenCalled()
		vi.advanceTimersByTime(1)
		expect(fn).toHaveBeenCalledTimes(1)
		vi.useRealTimers()
	})

	it('throttle only allows function call every wait ms', async () => {
		vi.useFakeTimers()
		const fn = vi.fn()
		const throttled = throttle(fn, 100)
		throttled()
		throttled()
		expect(fn).toHaveBeenCalledTimes(1)
		vi.advanceTimersByTime(100)
		throttled()
		expect(fn).toHaveBeenCalledTimes(2)
		vi.useRealTimers()
	})

	it('compose composes functions right-to-left', () => {
		const add1 = (x: number) => x + 1
		const double = (x: number) => x * 2
		const composed = compose(double, add1)
		expect(composed(3)).toBe(8) // double(add1(3)) = double(4) = 8
	})

	it('pipe pipes functions left-to-right', () => {
		const add1 = (x: number) => x + 1
		const double = (x: number) => x * 2
		const piped = pipe(add1, double)
		expect(piped(3)).toBe(8) // double(add1(3)) = double(4) = 8
	})
})
