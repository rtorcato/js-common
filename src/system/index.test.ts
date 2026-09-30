import { afterEach, describe, expect, it, vi } from 'vitest'
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

	describe('browser user agents', () => {
		afterEach(() => {
			vi.unstubAllGlobals()
		})

		const cases: [string, string][] = [
			[
				'ios',
				'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
			],
			[
				'android',
				'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36',
			],
			[
				'macos',
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
			],
			[
				'windows',
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
			],
			[
				'linux',
				'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
			],
		]

		it.each(cases)('getPlatform reports %s', (expected, userAgent) => {
			vi.stubGlobal('window', { navigator: { userAgent } })
			expect(getPlatform()).toBe(expected)
			expect(isMacOs()).toBe(expected === 'macos')
			expect(isLinux()).toBe(expected === 'linux')
		})
	})
})
