import { describe, expect, it } from 'vitest'
import { assert, createCustomError, getErrorMessage, isErrorName, tryCatch } from './index'

describe('errors module', () => {
	it('createCustomError creates an Error with custom name and message', () => {
		const err = createCustomError('MyError', 'Something went wrong')
		expect(err).toBeInstanceOf(Error)
		expect(err.name).toBe('MyError')
		expect(err.message).toBe('Something went wrong')
	})

	it('isErrorName returns true for matching error name', () => {
		const err = createCustomError('SpecialError', 'msg')
		expect(isErrorName(err, 'SpecialError')).toBe(true)
		expect(isErrorName(err, 'OtherError')).toBe(false)
		expect(isErrorName('not-an-error', 'SpecialError')).toBe(false)
	})

	it('getErrorMessage returns message for Error', () => {
		const err = new Error('fail')
		expect(getErrorMessage(err)).toBe('fail')
	})

	it('getErrorMessage returns string for string input', () => {
		expect(getErrorMessage('oops')).toBe('oops')
	})

	it('getErrorMessage stringifies objects', () => {
		expect(getErrorMessage({ foo: 1 })).toBe('{"foo":1}')
	})

	it('getErrorMessage falls back to String(error) if not serializable', () => {
		// biome-ignore lint/suspicious/noExplicitAny: Test needs any type for circular reference
		const circular: any = {}
		circular.self = circular
		expect(getErrorMessage(circular)).toMatch('[object Object]')
	})

	it('assert does not throw if condition is true', () => {
		expect(() => assert(true, 'should not throw')).not.toThrow()
	})

	it('assert throws if condition is false', () => {
		expect(() => assert(false, 'fail')).toThrow('fail')
	})

	it('tryCatch returns result if no error', async () => {
		const result = await tryCatch(() => 42, 0)
		expect(result).toBe(42)
	})

	it('tryCatch returns fallback if error thrown', async () => {
		const result = await tryCatch(() => {
			throw new Error('fail')
		}, 123)
		expect(result).toBe(123)
	})

	it('tryCatch works with async functions', async () => {
		const result = await tryCatch(async () => {
			throw new Error('fail')
		}, 'fallback')
		expect(result).toBe('fallback')
		const ok = await tryCatch(async () => 'ok', 'bad')
		expect(ok).toBe('ok')
	})
})
