import { afterEach, describe, expect, it, vi } from 'vitest'
import * as fetchUtils from './index'

// Mock fetch for all tests
const mockFetch = vi.fn()
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
globalThis.fetch = mockFetch as any

describe('fetch module', () => {
	afterEach(() => {
		mockFetch.mockReset()
	})

	it('fetchWithTimeout returns JSON on success', async () => {
		mockFetch.mockResolvedValue({
			json: async () => ({ ok: true }),
			// For abort signal
			ok: true,
		})
		const result = await fetchUtils.fetchWithTimeout('http://test', {}, 100)
		expect(result).toEqual({ ok: true })
	})

	it('fetchWithTimeout aborts on timeout', async () => {
		// Simulate fetch that rejects when aborted
		mockFetch.mockImplementation((_url, options) => {
			return new Promise((_resolve, reject) => {
				// biome-ignore lint/complexity/useOptionalChain: <explanation>
				if (options && options.signal) {
					options.signal.addEventListener('abort', () => {
						const err = new Error('aborted')
						// @ts-ignore
						err.name = 'AbortError'
						reject(err)
					})
				}
			})
		})
		await expect(fetchUtils.fetchWithTimeout('http://test', {}, 10)).rejects.toThrow(
			/aborted|AbortError/i
		)
	})

	it('postJson sends POST with JSON body and returns JSON', async () => {
		const body = { foo: 'bar' }
		mockFetch.mockResolvedValue({
			json: async () => ({ success: true }),
			ok: true,
		})
		const result = await fetchUtils.postJson('http://test', body)
		expect(result).toEqual({ success: true })
		expect(mockFetch).toHaveBeenCalledWith(
			'http://test',
			expect.objectContaining({
				method: 'POST',
				headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
				body: JSON.stringify(body),
			})
		)
	})

	it('getJson sends GET and returns JSON', async () => {
		mockFetch.mockResolvedValue({
			json: async () => ({ data: 123 }),
			ok: true,
		})
		const result = await fetchUtils.getJson('http://test')
		expect(result).toEqual({ data: 123 })
		expect(mockFetch).toHaveBeenCalledWith(
			'http://test',
			expect.objectContaining({ method: 'GET' })
		)
	})

	it('fetchText returns text', async () => {
		mockFetch.mockResolvedValue({
			text: async () => 'hello world',
			ok: true,
		})
		const result = await fetchUtils.fetchText('http://test')
		expect(result).toBe('hello world')
	})

	it('handleApiError returns fallback on error', async () => {
		const failingPromise = Promise.reject(new Error('fail'))
		const fallback = { fallback: true }
		const result = await fetchUtils.handleApiError(failingPromise, fallback)
		expect(result).toBe(fallback)
	})

	it('handleApiError throws if no fallback', async () => {
		const failingPromise = Promise.reject(new Error('fail'))
		await expect(fetchUtils.handleApiError(failingPromise)).rejects.toThrow('fail')
	})

	it('handleApiError returns resolved value if no error', async () => {
		const value = { ok: 1 }
		const result = await fetchUtils.handleApiError(Promise.resolve(value), { ok: 2 })
		expect(result).toBe(value)
	})
})
