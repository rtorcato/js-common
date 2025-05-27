import { describe, expect, it } from 'vitest'
import { getHomeDir, getOsArch, getOsPlatform, getOsRelease, getTmpDir } from './index'

describe('os utils', () => {
	it('getOsPlatform returns process.platform or undefined', () => {
		if (typeof process !== 'undefined') {
			expect(getOsPlatform()).toBe(process.platform)
		} else {
			expect(getOsPlatform()).toBeUndefined()
		}
	})

	it('getOsRelease returns process.release.name or undefined', () => {
		if (typeof process !== 'undefined' && process.release && process.release.name) {
			expect(getOsRelease()).toBe(process.release.name)
		} else {
			expect(getOsRelease()).toBeUndefined()
		}
	})

	it('getOsArch returns process.arch or undefined', () => {
		if (typeof process !== 'undefined') {
			expect(getOsArch()).toBe(process.arch)
		} else {
			expect(getOsArch()).toBeUndefined()
		}
	})

	it('getHomeDir returns HOME or USERPROFILE or undefined', () => {
		if (typeof process !== 'undefined' && process.env) {
			if (process.env['HOME']) {
				expect(getHomeDir()).toBe(process.env['HOME'])
			} else if (process.env['USERPROFILE']) {
				expect(getHomeDir()).toBe(process.env['USERPROFILE'])
			} else {
				expect(getHomeDir()).toBeUndefined()
			}
		} else {
			expect(getHomeDir()).toBeUndefined()
		}
	})

	it('getTmpDir returns TMPDIR, TEMP, TMP, or undefined', () => {
		if (typeof process !== 'undefined' && process.env) {
			if (process.env['TMPDIR']) {
				expect(getTmpDir()).toBe(process.env['TMPDIR'])
			} else if (process.env['TEMP']) {
				expect(getTmpDir()).toBe(process.env['TEMP'])
			} else if (process.env['TMP']) {
				expect(getTmpDir()).toBe(process.env['TMP'])
			} else {
				expect(getTmpDir()).toBeUndefined()
			}
		} else {
			expect(getTmpDir()).toBeUndefined()
		}
	})
})
