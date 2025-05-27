import { describe, expect, it, vi } from 'vitest'
import { clearConsole, disableConsole } from './index'

describe('console module', () => {
	it('disableConsole disables console.log in production', () => {
		const originalLog = console.log
		const originalEnv = process.env.NODE_ENV
		process.env.NODE_ENV = 'production'
		let called = false
		console.log = () => {
			called = true
		}
		disableConsole()
		console.log('should not log')
		expect(called).toBe(false)
		// Restore
		console.log = originalLog
		process.env.NODE_ENV = originalEnv
	})

	it('disableConsole does not disable console.log in non-production', () => {
		const originalLog = console.log
		const originalEnv = process.env.NODE_ENV
		process.env.NODE_ENV = 'development'
		let called = false
		console.log = () => {
			called = true
		}
		disableConsole()
		console.log('should log')
		expect(called).toBe(true)
		// Restore
		console.log = originalLog
		process.env.NODE_ENV = originalEnv
	})

	it('clearConsole writes the clear sequence to stdout', () => {
		const spy = vi.spyOn(process.stdout, 'write')
		clearConsole()
		expect(spy).toHaveBeenCalledWith('\x1B[2J\x1B[0f')
		spy.mockRestore()
	})
})
