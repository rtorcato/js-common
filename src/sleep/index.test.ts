import { describe, expect, it } from 'vitest'
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
		await expect(sleepWithAbort(50, controller.signal)).rejects.toThrow('Sleep aborted')
	})
})
