import { describe, expect, it, vi } from 'vitest'
import type { Result } from '.'
import { isSuccess, tryCatch, tryCatchSync } from '.'

describe('tryCatch', () => {
	it('should return Success when the function resolves', async () => {
		const mockFn = vi.fn(async () => 'resolved value')
		const result = await tryCatch(mockFn)

		expect(isSuccess(result)).toBe(true)
		expect(result).toEqual({ data: 'resolved value', error: null })
	})

	it('should return Failure when the function rejects', async () => {
		const mockError = new Error('rejected error')
		const mockFn = vi.fn(async () => {
			throw mockError
		})
		const result = await tryCatch(mockFn)

		expect(isSuccess(result)).toBe(false)
		expect(result).toEqual({ data: null, error: mockError })
	})
})

describe('isSuccess', () => {
	it('should return true for Success result', () => {
		const successResult: Result<string> = { data: 'success', error: null }
		expect(isSuccess(successResult)).toBe(true)
	})

	it('should return false for Failure result', () => {
		const failureResult: Result<string> = { data: null, error: new Error('failure') }
		expect(isSuccess(failureResult)).toBe(false)
	})
})

describe('tryCatchSync', () => {
	it('returns data and null error on success', () => {
		const result = tryCatchSync(() => JSON.parse('{"a":1}'))
		expect(result.data).toEqual({ a: 1 })
		expect(result.error).toBeNull()
	})
	it('returns null data and the error on failure', () => {
		const result = tryCatchSync(() => JSON.parse('nope'))
		expect(result.data).toBeNull()
		expect(result.error).toBeInstanceOf(SyntaxError)
	})
})
