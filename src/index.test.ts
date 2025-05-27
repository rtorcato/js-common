import { describe, expect, it, vi } from 'vitest'
import { helloWorld, testPackage } from './index'

describe('testPackage', () => {
	it('returns the correct string and logs to console', () => {
		const spy = vi.spyOn(console, 'log').mockImplementation(() => {})
		const result = testPackage()
		expect(result).toBe('testPackage')
		expect(spy).toHaveBeenCalledWith('test')
		spy.mockRestore()
	})
})

describe('helloWorld', () => {
	it('logs hello with provided value', () => {
		const spy = vi.spyOn(console, 'log').mockImplementation(() => {})
		helloWorld('foo')
		expect(spy).toHaveBeenCalledWith('hello foo')
		spy.mockRestore()
	})

	it('logs hello world when value is undefined', () => {
		const spy = vi.spyOn(console, 'log').mockImplementation(() => {})
		helloWorld(undefined)
		expect(spy).toHaveBeenCalledWith('hello world')
		spy.mockRestore()
	})
})
