import { describe, expect, it, vi } from 'vitest'
import { captureConsole, error, info, logWithTimestamp, warn } from '.'

describe('logWithTimestamp', () => {
	it('logs a message with an ISO timestamp prefix', () => {
		const spy = vi.spyOn(console, 'info').mockImplementation(() => {})
		logWithTimestamp('hello')
		expect(spy).toHaveBeenCalledOnce()
		const msg = spy.mock.calls[0]?.[0] as string
		expect(msg).toMatch(/^\[\d{4}-\d{2}-\d{2}T/)
		expect(msg).toContain('hello')
		spy.mockRestore()
	})
	it('uses the specified log level', () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
		logWithTimestamp('oops', 'error')
		expect(spy).toHaveBeenCalledOnce()
		spy.mockRestore()
	})
})

describe('warn', () => {
	it('calls console.warn with [WARN] prefix', () => {
		const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
		warn('something')
		expect(spy).toHaveBeenCalledWith('[WARN] something')
		spy.mockRestore()
	})
})

describe('error', () => {
	it('calls console.error with [ERROR] prefix', () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
		error('broke')
		expect(spy).toHaveBeenCalledWith('[ERROR] broke')
		spy.mockRestore()
	})
})

describe('info', () => {
	it('calls console.info with [INFO] prefix', () => {
		const spy = vi.spyOn(console, 'info').mockImplementation(() => {})
		info('fyi')
		expect(spy).toHaveBeenCalledWith('[INFO] fyi')
		spy.mockRestore()
	})
})

describe('captureConsole', () => {
	it('captures console output and restores on cleanup', () => {
		const captured: Array<[string, ...unknown[]]> = []
		const restore = captureConsole((type, ...args) => captured.push([type, ...args]))
		console.log('test-log')
		console.warn('test-warn')
		restore()
		expect(captured).toContainEqual(['log', 'test-log'])
		expect(captured).toContainEqual(['warn', 'test-warn'])
		// After restore, further calls should not be captured
		console.log('after-restore')
		expect(captured).toHaveLength(2)
	})
})
