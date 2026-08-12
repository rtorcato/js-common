import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import { z } from 'zod'
import { checkEnv, getENV, getNodeEnv, isDev, isProd, isTest, RootApiEnvSchema } from './index'

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

describe('checkEnv', () => {
	const schema = z.object({
		API_URL: z.string(),
		PORT: z.coerce.number(),
	})

	it('returns the parsed environment when it is valid', () => {
		expect(checkEnv(schema, { API_URL: 'https://example.com', PORT: '8080' })).toEqual({
			API_URL: 'https://example.com',
			PORT: 8080,
		})
	})

	it('throws listing the missing keys when validation fails', () => {
		expect(() => checkEnv(schema, { PORT: '8080' })).toThrow(
			'Missing required values in .env:\nAPI_URL'
		)
	})

	it('strips the stack so the message is the whole error', () => {
		let caught: Error | undefined
		try {
			checkEnv(schema, {})
		} catch (error) {
			caught = error as Error
		}
		expect(caught?.stack).toBe('')
		expect(caught?.message).toContain('API_URL')
		expect(caught?.message).toContain('PORT')
	})

	it('rethrows non-Zod errors untouched', () => {
		const boom = new Error('boom')
		const exploding = {
			parse: () => {
				throw boom
			},
		} as unknown as typeof schema
		expect(() => checkEnv(exploding, {})).toThrow(boom)
	})

	it('applies RootApiEnvSchema defaults to an empty environment', () => {
		expect(checkEnv(RootApiEnvSchema, {})).toEqual({
			NODE_ENV: 'development',
			LOG_LEVEL: 'info',
			PORT: 3000,
		})
	})
})
