import { describe, expect, it } from 'vitest'
import { isSuccess, tryCatch } from '.'

describe('tryCatch', () => {
	it('returns data and null error on success', async () => {
		const result = await tryCatch(() => Promise.resolve(42))
		expect(result.data).toBe(42)
		expect(result.error).toBeNull()
	})
	it('returns null data and the error on failure', async () => {
		const boom = new Error('boom')
		const result = await tryCatch(() => Promise.reject(boom))
		expect(result.data).toBeNull()
		expect(result.error).toBe(boom)
	})
})

describe('isSuccess', () => {
	it('returns true for a success result', async () => {
		const result = await tryCatch(() => Promise.resolve('ok'))
		expect(isSuccess(result)).toBe(true)
	})
	it('returns false for a failure result', async () => {
		const result = await tryCatch(() => Promise.reject(new Error('no')))
		expect(isSuccess(result)).toBe(false)
	})
	it('narrows the type so data is accessible without null check', async () => {
		const result = await tryCatch(() => Promise.resolve(99))
		if (isSuccess(result)) {
			expect(result.data).toBe(99)
		}
	})
})
