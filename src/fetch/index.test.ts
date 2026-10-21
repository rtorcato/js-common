import { afterEach, describe, expect, it, vi } from 'vitest'
import * as fetchUtils from './index'

// Mock fetch for all tests
const mockFetch = vi.fn()
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
				// biome-ignore lint/complexity/useOptionalChain: Test needs explicit check for better readability
				if (options && options.signal) {
					options.signal.addEventListener('abort', () => {
						const err = new Error('aborted')
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

	it('fetchWithTimeout rejects with TimeoutError when the body read is slow', async () => {
		mockFetch.mockImplementation(async (_url, options) => ({
			ok: true,
			json: () =>
				new Promise((_resolve, reject) => {
					options.signal.addEventListener('abort', () => reject(options.signal.reason))
				}),
		}))
		await expect(fetchUtils.fetchWithTimeout('http://test', {}, 10)).rejects.toMatchObject({
			name: 'TimeoutError',
		})
	})

	it('fetchWithTimeout honours the caller signal', async () => {
		mockFetch.mockImplementation(
			(_url, options) =>
				new Promise((_resolve, reject) => {
					options.signal.addEventListener('abort', () => reject(options.signal.reason))
				})
		)
		const controller = new AbortController()
		const pending = fetchUtils.fetchWithTimeout('http://test', { signal: controller.signal }, 5000)
		controller.abort()
		await expect(pending).rejects.toMatchObject({ name: 'AbortError' })
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
				body: JSON.stringify(body),
			})
		)
		expect(mockFetch.mock.calls[0][1].headers.get('Content-Type')).toBe('application/json')
	})

	it('postJson keeps Content-Type when the caller passes headers', async () => {
		mockFetch.mockResolvedValue({ json: async () => ({}), ok: true })
		await fetchUtils.postJson('http://test', {}, { headers: { Authorization: 'Bearer x' } })
		const { headers } = mockFetch.mock.calls[0][1]
		expect(headers.get('Content-Type')).toBe('application/json')
		expect(headers.get('Authorization')).toBe('Bearer x')
	})

	it('postJson lets the caller override the method', async () => {
		mockFetch.mockResolvedValue({ json: async () => ({}), ok: true })
		await fetchUtils.postJson('http://test', { a: 1 }, { method: 'PUT' })
		expect(mockFetch.mock.calls[0][1]).toMatchObject({ method: 'PUT', body: '{"a":1}' })
	})

	it('postJson lets the caller override Content-Type', async () => {
		mockFetch.mockResolvedValue({ json: async () => ({}), ok: true })
		await fetchUtils.postJson('http://test', {}, { headers: { 'content-type': 'text/plain' } })
		expect(mockFetch.mock.calls[0][1].headers.get('Content-Type')).toBe('text/plain')
	})

	describe('non-2xx responses throw HttpError', () => {
		const errorResponse = () => ({
			ok: false,
			status: 404,
			statusText: 'Not Found',
			url: 'http://test/missing',
			text: async () => '{"error":"missing"}',
			json: async () => ({ error: 'missing' }),
		})

		it.each([
			['fetchWithTimeout', () => fetchUtils.fetchWithTimeout('http://test/missing')],
			['postJson', () => fetchUtils.postJson('http://test/missing', {})],
			['getJson', () => fetchUtils.getJson('http://test/missing')],
			['fetchText', () => fetchUtils.fetchText('http://test/missing')],
		])('%s', async (_name, call) => {
			mockFetch.mockResolvedValue(errorResponse())
			const error = await call().catch((e) => e)
			expect(error).toBeInstanceOf(fetchUtils.HttpError)
			expect(error).toMatchObject({
				name: 'HttpError',
				status: 404,
				statusText: 'Not Found',
				url: 'http://test/missing',
				body: '{"error":"missing"}',
				message: 'HTTP 404 Not Found (http://test/missing)',
			})
		})

		it('leaves body undefined when it cannot be read', async () => {
			mockFetch.mockResolvedValue({
				...errorResponse(),
				url: '',
				text: async () => {
					throw new Error('stream locked')
				},
			})
			const error = await fetchUtils.getJson('http://test/fallback').catch((e) => e)
			expect(error).toMatchObject({ status: 404, url: 'http://test/fallback', body: undefined })
		})
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
