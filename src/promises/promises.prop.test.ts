import * as fc from 'fast-check'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { withTimeout } from './index'

// Everything here runs on fake timers: asserting real-clock bounds would be
// flaky on a loaded CI box, and a flaky property test is worse than none.
describe('promises — properties', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('withTimeout rejects with the supplied error once the window elapses', async () => {
		await fc.assert(
			fc.asyncProperty(fc.integer({ min: 1, max: 10_000 }), async (ms) => {
				const error = new Error(`timed out after ${ms}ms`)
				const raced = withTimeout(new Promise(() => {}), ms, error)
				const assertion = expect(raced).rejects.toBe(error)
				await vi.advanceTimersByTimeAsync(ms)
				await assertion
			}),
			{ numRuns: 25 }
		)
	})

	it('withTimeout never settles before the window, and always settles at it', async () => {
		await fc.assert(
			fc.asyncProperty(fc.integer({ min: 2, max: 10_000 }), async (ms) => {
				let settled = false
				const raced = withTimeout(new Promise(() => {}), ms, 'timeout')
				raced.then(
					() => {
						settled = true
					},
					() => {
						settled = true
					}
				)
				await vi.advanceTimersByTimeAsync(ms - 1)
				expect(settled).toBe(false)
				await vi.advanceTimersByTimeAsync(1)
				expect(settled).toBe(true)
			}),
			{ numRuns: 25 }
		)
	})

	it('withTimeout resolves with the underlying value when it wins the race', async () => {
		await fc.assert(
			fc.asyncProperty(
				fc.integer({ min: 1, max: 1_000 }),
				fc.integer({ min: 1, max: 1_000 }),
				fc.string(),
				async (resolveAt, gap, value) => {
					const slow = new Promise<string>((resolve) => {
						setTimeout(() => resolve(value), resolveAt)
					})
					const raced = withTimeout(slow, resolveAt + gap)
					const assertion = expect(raced).resolves.toBe(value)
					await vi.advanceTimersByTimeAsync(resolveAt + gap)
					await assertion
				}
			),
			{ numRuns: 25 }
		)
	})
})
