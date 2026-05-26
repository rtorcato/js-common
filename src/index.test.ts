import { describe, expect, it, vi } from 'vitest'
import { testPackage } from './index'

describe('testPackage', () => {
	it('returns the correct string and logs to console', () => {
		const spy = vi.spyOn(console, 'log').mockImplementation(() => {})
		const result = testPackage()
		expect(result).toBe('testPackage')
		expect(spy).toHaveBeenCalledWith('test')
		spy.mockRestore()
	})
})
