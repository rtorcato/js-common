import { describe, expect, it } from 'vitest'
import { getCwd, getProcessId, getProcessPlatform, getProcessUptime, isCI } from './index'

describe('process utils', () => {
	it('getProcessId returns process.pid or undefined', () => {
		if (typeof process !== 'undefined') {
			expect(getProcessId()).toBe(process.pid)
		} else {
			expect(getProcessId()).toBeUndefined()
		}
	})

	it('getProcessUptime returns process.uptime() or undefined', () => {
		if (typeof process !== 'undefined' && typeof process.uptime === 'function') {
			expect(getProcessUptime()).toBeCloseTo(process.uptime(), 1)
		} else {
			expect(getProcessUptime()).toBeUndefined()
		}
	})

	it('getCwd returns process.cwd() or undefined', () => {
		if (typeof process !== 'undefined' && typeof process.cwd === 'function') {
			expect(getCwd()).toBe(process.cwd())
		} else {
			expect(getCwd()).toBeUndefined()
		}
	})

	it('getProcessPlatform returns process.platform or undefined', () => {
		if (typeof process !== 'undefined') {
			expect(getProcessPlatform()).toBe(process.platform)
		} else {
			expect(getProcessPlatform()).toBeUndefined()
		}
	})

	it('isCI returns true if CI env vars are set', () => {
		const orig = process.env.CI
		process.env.CI = '1'
		expect(isCI()).toBe(true)
		process.env.CI = orig
	})

	it('isCI returns false if no CI env vars are set', () => {
		const origs = {
			CI: process.env.CI,
			CONTINUOUS_INTEGRATION: process.env.CONTINUOUS_INTEGRATION,
			BUILD_NUMBER: process.env.BUILD_NUMBER,
			RUN_ID: process.env.RUN_ID,
		}
		delete process.env.CI
		delete process.env.CONTINUOUS_INTEGRATION
		delete process.env.BUILD_NUMBER
		delete process.env.RUN_ID
		expect(isCI()).toBe(false)
		Object.assign(process.env, origs)
	})
})
