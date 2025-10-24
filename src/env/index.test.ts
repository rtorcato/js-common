import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import { getENV, getNodeEnv, isDev, isProd, isTest } from './index'

describe('env module', () => {
	const OLD_ENV = process.env

	beforeEach(() => {
		process.env = { ...OLD_ENV }
	})

	afterAll(() => {
		process.env = OLD_ENV
	})

	it('getENV returns the value if set', () => {
		process.env.FOO = 'bar'
		expect(getENV('FOO')).toBe('bar')
	})

	it('getENV returns defaultValue if not set', () => {
		process.env.NOT_SET = undefined
		expect(getENV('NOT_SET', 'default')).toBe('default')
	})

	it('getENV throws if not set and no default', () => {
		process.env.NOT_SET = undefined
		expect(() => getENV('NOT_SET')).toThrow('Undefined ENV variable - NOT_SET')
	})

	it('isDev returns true if NODE_ENV is development', () => {
		process.env.NODE_ENV = 'development'
		expect(isDev()).toBe(true)
		process.env.NODE_ENV = 'production'
		expect(isDev()).toBe(false)
	})

	it('isProd returns true if NODE_ENV is production', () => {
		process.env.NODE_ENV = 'production'
		expect(isProd()).toBe(true)
		process.env.NODE_ENV = 'development'
		expect(isProd()).toBe(false)
	})

	it('isTest returns true if NODE_ENV is test', () => {
		process.env.NODE_ENV = 'test'
		expect(isTest()).toBe(true)
		process.env.NODE_ENV = 'development'
		expect(isTest()).toBe(false)
	})

	it('getNodeEnv returns NODE_ENV or development', () => {
		process.env.NODE_ENV = 'production'
		expect(getNodeEnv()).toBe('production')
		process.env.NODE_ENV = undefined
		expect(getNodeEnv()).toBe('development')
	})
})
