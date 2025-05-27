import { describe, expect, it } from 'vitest'
import { all, allSettled, delay, race, to, withTimeout } from './index'

describe('promises module', () => {
	it('delay resolves after given ms', async () => {
		const start = Date.now()
		await delay(30)
		expect(Date.now() - start).toBeGreaterThanOrEqual(25)
	})

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

	it('all resolves when all promises resolve', async () => {
		const result = await all([Promise.resolve(1), Promise.resolve(2)])
		expect(result).toEqual([1, 2])
	})

	it('allSettled resolves with all results', async () => {
		const result = await allSettled([Promise.resolve(1), Promise.reject('fail')])
		expect(result[0].status).toBe('fulfilled')
		expect(result[1].status).toBe('rejected')
	})

	it('race resolves/rejects as soon as one settles', async () => {
		const p1 = new Promise((resolve) => setTimeout(() => resolve('a'), 20))
		const p2 = Promise.resolve('b')
		const result = await race([p1, p2])
		expect(result).toBe('b')
	})
})
