import { describe, expect, it, vi } from 'vitest'
import { sleep, sleepRandom, sleepSync, sleepWithAbort } from './index'

describe('sleep', () => {
	it('resolves after the specified ms', async () => {
		const start = Date.now()
		await sleep(50)
		const elapsed = Date.now() - start
		// Allow some tolerance for CI environments (±5ms)
		expect(elapsed).toBeGreaterThanOrEqual(45)
		expect(elapsed).toBeLessThanOrEqual(100)
	})
})

describe('sleepSync', () => {
	it('blocks for at least the specified ms', () => {
		const start = Date.now()
		sleepSync(30)
		const elapsed = Date.now() - start
		// Allow some tolerance for CI environments (±5ms)
		expect(elapsed).toBeGreaterThanOrEqual(25)
		expect(elapsed).toBeLessThanOrEqual(60)
	})
})

describe('sleepRandom', () => {
	it('resolves after a random delay between min and max', async () => {
		const min = 10
		const max = 30
		const start = Date.now()
		await sleepRandom(min, max)
		const elapsed = Date.now() - start
		expect(elapsed).toBeGreaterThanOrEqual(min)
		expect(elapsed).toBeLessThanOrEqual(max + 10) // allow some timer drift
	})
})

describe('sleepWithAbort', () => {
	it('resolves if not aborted', async () => {
		await expect(sleepWithAbort(20)).resolves.toBeUndefined()
	})
	it('rejects if aborted before timeout', async () => {
		const controller = new AbortController()
		setTimeout(() => controller.abort(), 10)
		await expect(sleepWithAbort(50, controller.signal)).rejects.toMatchObject({
			name: 'AbortError',
		})
	})
	it('rejects immediately with signal.reason if already aborted', async () => {
		const reason = new Error('custom')
		const start = Date.now()
		await expect(sleepWithAbort(1000, AbortSignal.abort(reason))).rejects.toBe(reason)
		expect(Date.now() - start).toBeLessThan(100)
	})
	it('removes its abort listener after resolving', async () => {
		const controller = new AbortController()
		const remove = vi.spyOn(controller.signal, 'removeEventListener')
		await sleepWithAbort(5, controller.signal)
		expect(remove).toHaveBeenCalledWith('abort', expect.any(Function))
	})
})
