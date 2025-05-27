import { describe, expect, it, vi } from 'vitest'
import {
	getNodeMajorVersion,
	getProcessUptime,
	isNode,
	nodeVersionCheck,
	requireOptional,
} from './index'

describe('node module', () => {
	it('getNodeMajorVersion returns a number >= 0', () => {
		const major = getNodeMajorVersion()
		expect(typeof major).toBe('number')
		expect(major).toBeGreaterThanOrEqual(0)
	})

	it('isNode returns true in Node.js', () => {
		expect(isNode()).toBe(true)
	})

	it('requireOptional returns module or undefined', () => {
		expect(requireOptional('fs')).toBeDefined()
		expect(requireOptional('nonexistent-module-xyz')).toBeUndefined()
	})

	it('getProcessUptime returns a number >= 0', () => {
		expect(getProcessUptime()).toBeGreaterThanOrEqual(0)
	})

	it('nodeVersionCheck does not exit if version is sufficient', () => {
		const spyExit = vi.spyOn(process, 'exit').mockImplementation(() => {
			throw new Error('exit')
		})
		const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {})
		expect(() => nodeVersionCheck(getNodeMajorVersion())).not.toThrow()
		spyExit.mockRestore()
		spyLog.mockRestore()
	})

	it('nodeVersionCheck exits if version is too low', () => {
		const spyExit = vi.spyOn(process, 'exit').mockImplementation(() => {
			throw new Error('exit')
		})
		const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {})
		// Simulate a lower version by monkey-patching process.version
		const origVersion = process.version
		Object.defineProperty(process, 'version', { value: 'v0.0.1', configurable: true })
		expect(() => nodeVersionCheck(100)).toThrow('exit')
		Object.defineProperty(process, 'version', { value: origVersion })
		spyExit.mockRestore()
		spyLog.mockRestore()
	})
})
