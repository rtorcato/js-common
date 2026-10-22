import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createTtlCache } from './index'

describe('createTtlCache', () => {
	beforeEach(() => vi.useFakeTimers())
	afterEach(() => vi.useRealTimers())

	it('serves a fresh value without calling load again', async () => {
		const cache = createTtlCache<number>({ ttlMs: 1000 })
		const load = vi.fn().mockResolvedValue(1)
		await cache.get('a', load)
		vi.advanceTimersByTime(999)
		expect(await cache.get('a', load)).toBe(1)
		expect(load).toHaveBeenCalledTimes(1)
	})

	it('reloads once the ttl has passed', async () => {
		const cache = createTtlCache<number>({ ttlMs: 1000 })
		const load = vi.fn().mockResolvedValueOnce(1).mockResolvedValueOnce(2)
		await cache.get('a', load)
		vi.advanceTimersByTime(1000)
		expect(await cache.get('a', load)).toBe(2)
	})

	it('keeps keys apart', async () => {
		const cache = createTtlCache<string>({ ttlMs: 1000 })
		await cache.get('a', async () => 'A')
		expect(await cache.get('b', async () => 'B')).toBe('B')
	})

	it('shares one load between concurrent gets', async () => {
		const cache = createTtlCache<number>({ ttlMs: 1000 })
		const load = vi.fn().mockResolvedValue(1)
		await Promise.all([cache.get('a', load), cache.get('a', load)])
		expect(load).toHaveBeenCalledTimes(1)
	})

	it('rethrows a failed refresh by default', async () => {
		const cache = createTtlCache<number>({ ttlMs: 1000 })
		await cache.get('a', async () => 1)
		vi.advanceTimersByTime(1000)
		await expect(cache.get('a', () => Promise.reject(new Error('boom')))).rejects.toThrow('boom')
	})

	it('serves the last good value on a failed refresh with staleOnError, then retries', async () => {
		const cache = createTtlCache<number>({ ttlMs: 1000, staleOnError: true })
		await cache.get('a', async () => 1)
		vi.advanceTimersByTime(1000)
		expect(await cache.get('a', () => Promise.reject(new Error('boom')))).toBe(1)
		expect(await cache.get('a', async () => 2)).toBe(2)
	})

	it('rethrows with staleOnError when there is no good value yet', async () => {
		const cache = createTtlCache<number>({ ttlMs: 1000, staleOnError: true })
		await expect(cache.get('a', () => Promise.reject(new Error('boom')))).rejects.toThrow('boom')
	})

	it('delete and clear force a reload', async () => {
		const cache = createTtlCache<number>({ ttlMs: 1000 })
		const load = vi.fn().mockResolvedValue(1)
		await cache.get('a', load)
		cache.delete('a')
		await cache.get('a', load)
		cache.clear()
		await cache.get('a', load)
		expect(load).toHaveBeenCalledTimes(3)
	})
})
