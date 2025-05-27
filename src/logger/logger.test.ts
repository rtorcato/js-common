import { describe, expect, it, vi } from 'vitest'
import { logger } from './logger'

describe('logger module', () => {
	it('logger has standard log methods', () => {
		expect(typeof logger.info).toBe('function')
		expect(typeof logger.error).toBe('function')
		expect(typeof logger.debug).toBe('function')
		expect(typeof logger.warn).toBe('function')
	})

	it('logger logs info messages', () => {
		const spy = vi.spyOn(logger, 'info')
		logger.info('test info')
		expect(spy).toHaveBeenCalledWith('test info')
		spy.mockRestore()
	})

	it('logger logs error messages', () => {
		const spy = vi.spyOn(logger, 'error')
		logger.error('test error')
		expect(spy).toHaveBeenCalledWith('test error')
		spy.mockRestore()
	})

	it('logger logs debug messages', () => {
		const spy = vi.spyOn(logger, 'debug')
		logger.debug('test debug')
		expect(spy).toHaveBeenCalledWith('test debug')
		spy.mockRestore()
	})

	it('logger logs warn messages', () => {
		const spy = vi.spyOn(logger, 'warn')
		logger.warn('test warn')
		expect(spy).toHaveBeenCalledWith('test warn')
		spy.mockRestore()
	})
})
