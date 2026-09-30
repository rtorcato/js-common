import { describe, expect, it } from 'vitest'
import { mapLimit, to, withTimeout } from './index'

describe('promises module', () => {
	it('to returns [null, result] on success', async () => {
		const [err, result] = await to(Promise.resolve(42))
		expect(err).toBeNull()
		expect(result).toBe(42)
	})

	it('to returns [error, undefined] on failure', async () => {
		const [err, result] = await to(Promise.reject(new Error('fail')))
		expect(err).toBeInstanceOf(Error)
		expect(result).toBeUndefined()
	})

	it('withTimeout resolves if promise resolves in time', async () => {
		const result = await withTimeout(Promise.resolve('ok'), 50)
		expect(result).toBe('ok')
	})

	it('withTimeout rejects if promise does not resolve in time', async () => {
		await expect(withTimeout(new Promise(() => {}), 10, 'timeout')).rejects.toBe('timeout')
	})

	it('mapLimit never exceeds the limit and keeps input order', async () => {
		let inFlight = 0
		let peak = 0
		const result = await mapLimit([30, 5, 20, 1, 10], 2, async (ms, i) => {
			inFlight++
			peak = Math.max(peak, inFlight)
			await new Promise((r) => setTimeout(r, ms))
			inFlight--
			return i * 10
		})
		expect(result).toEqual([0, 10, 20, 30, 40])
		expect(peak).toBe(2)
	})

	it('mapLimit stops starting tasks after the first rejection', async () => {
		const started: number[] = []
		await expect(
			mapLimit([0, 1, 2, 3, 4], 1, async (n) => {
				started.push(n)
				if (n === 1) throw new Error('boom')
				return n
			})
		).rejects.toThrow('boom')
		expect(started).toEqual([0, 1])
	})

	it('mapLimit resolves to [] for empty input', async () => {
		expect(await mapLimit(new Set<number>(), 3, async (n) => n)).toEqual([])
	})

	it('mapLimit rejects a non-positive-integer limit', async () => {
		for (const limit of [0, -1, 1.5, Number.NaN]) {
			await expect(mapLimit([1], limit, async (n) => n)).rejects.toBeInstanceOf(RangeError)
		}
	})
})
