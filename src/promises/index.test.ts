import { describe, expect, it } from 'vitest'
import { to, withTimeout } from './index'

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
})
