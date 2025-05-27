import { describe, expect, it } from 'vitest'
import { getPlatform, isAndroid, isIOS, isLinux, isMacOs, isTouchDevice, isWindows } from './index'

describe('system module', () => {
	it('isMacOs returns true on macOS', () => {
		// Simulate Node.js on macOS
		const origPlatform = process.platform
		Object.defineProperty(process, 'platform', { value: 'darwin', configurable: true })
		expect(isMacOs()).toBe(true)
		Object.defineProperty(process, 'platform', { value: origPlatform })
	})

	it('isWindows returns true on Windows', () => {
		const origPlatform = process.platform
		Object.defineProperty(process, 'platform', { value: 'win32', configurable: true })
		expect(isWindows()).toBe(true)
		Object.defineProperty(process, 'platform', { value: origPlatform })
	})

	it('isLinux returns true on Linux', () => {
		const origPlatform = process.platform
		Object.defineProperty(process, 'platform', { value: 'linux', configurable: true })
		expect(isLinux()).toBe(true)
		Object.defineProperty(process, 'platform', { value: origPlatform })
	})

	it('isIOS returns false in Node.js', () => {
		expect(isIOS()).toBe(false)
	})

	it('isAndroid returns false in Node.js', () => {
		expect(isAndroid()).toBe(false)
	})

	it('getPlatform returns correct platform string', () => {
		const origPlatform = process.platform
		Object.defineProperty(process, 'platform', { value: 'darwin', configurable: true })
		expect(getPlatform()).toBe('macos')
		Object.defineProperty(process, 'platform', { value: 'win32' })
		expect(getPlatform()).toBe('windows')
		Object.defineProperty(process, 'platform', { value: 'linux' })
		expect(getPlatform()).toBe('linux')
		Object.defineProperty(process, 'platform', { value: origPlatform })
	})

	it('isTouchDevice returns false in Node.js', () => {
		expect(isTouchDevice()).toBe(false)
	})
})
