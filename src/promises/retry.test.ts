import { afterEach, describe, expect, it, vi } from 'vitest'
import { retry } from './index'

afterEach(() => {
	vi.useRealTimers()
	vi.restoreAllMocks()
})

function failing(times: number, value = 'ok') {
	return vi.fn(async (_attempt: number) => {
		if (_attempt <= times) throw new Error(`fail ${_attempt}`)
		return value
	})
}

describe('retry', () => {
	it('resolves on the first success without waiting', async () => {
		const fn = failing(0)
		await expect(retry(fn)).resolves.toBe('ok')
		expect(fn).toHaveBeenCalledTimes(1)
	})

	it('makes retries + 1 attempts, then rejects with the last error', async () => {
		const fn = failing(Number.POSITIVE_INFINITY)
		await expect(retry(fn, { retries: 2, minDelay: 0 })).rejects.toThrow('fail 3')
		expect(fn.mock.calls.map(([attempt]) => attempt)).toEqual([1, 2, 3])
	})

	it('backs off exponentially, capped at maxDelay, without jitter', async () => {
		vi.useFakeTimers()
		const fn = failing(4)
		const done = retry(fn, { retries: 4, minDelay: 100, maxDelay: 300, jitter: false })
		const waits = [100, 200, 300, 300]
		for (const [i, ms] of waits.entries()) {
			await vi.advanceTimersByTimeAsync(ms - 1)
			expect(fn).toHaveBeenCalledTimes(i + 1)
			await vi.advanceTimersByTimeAsync(1)
			expect(fn).toHaveBeenCalledTimes(i + 2)
		}
		await expect(done).resolves.toBe('ok')
	})

	it('full jitter waits a random share of the cap', async () => {
		vi.useFakeTimers()
		vi.spyOn(Math, 'random').mockReturnValue(0.5)
		const fn = failing(1)
		const done = retry(fn, { minDelay: 1000 })
		await vi.advanceTimersByTimeAsync(499)
		expect(fn).toHaveBeenCalledTimes(1)
		await vi.advanceTimersByTimeAsync(1)
		await expect(done).resolves.toBe('ok')
	})

	it('stops as soon as shouldRetry returns false', async () => {
		const fn = failing(Number.POSITIVE_INFINITY)
		const shouldRetry = vi.fn(() => false)
		await expect(retry(fn, { shouldRetry })).rejects.toThrow('fail 1')
		expect(fn).toHaveBeenCalledTimes(1)
		expect(shouldRetry).toHaveBeenCalledWith(expect.any(Error), 1)
	})

	it('aborting mid-wait rejects with signal.reason and makes no further attempt', async () => {
		vi.useFakeTimers()
		const controller = new AbortController()
		const fn = failing(Number.POSITIVE_INFINITY)
		const done = retry(fn, { minDelay: 1000, jitter: false, signal: controller.signal })
		const assertion = expect(done).rejects.toBe('stop')
		await vi.advanceTimersByTimeAsync(500)
		controller.abort('stop')
		await assertion
		await vi.advanceTimersByTimeAsync(10_000)
		expect(fn).toHaveBeenCalledTimes(1)
	})

	it('an already-aborted signal rejects without calling fn', async () => {
		const fn = failing(0)
		await expect(retry(fn, { signal: AbortSignal.abort('gone') })).rejects.toBe('gone')
		expect(fn).not.toHaveBeenCalled()
	})

	it('passes the signal through to fn', async () => {
		const { signal } = new AbortController()
		const fn = vi.fn(async (_attempt: number, s?: AbortSignal) => s)
		await expect(retry(fn, { signal })).resolves.toBe(signal)
	})
})
