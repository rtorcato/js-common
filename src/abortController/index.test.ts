import { describe, expect, it, vi } from 'vitest'
import { abortAfter, abortPromise, createAbortController, withAbort } from './index'

describe('createAbortController', () => {
	it('returns a controller and signal', () => {
		const { controller, signal } = createAbortController()
		expect(controller).toBeInstanceOf(AbortController)
		expect(signal).toBe(controller.signal)
	})
})

describe('abortPromise', () => {
	it('rejects when signal is aborted', async () => {
		const { controller, signal } = createAbortController()
		setTimeout(() => controller.abort(), 10)
		await expect(abortPromise(signal)).rejects.toMatchObject({ name: 'AbortError' })
	})
	it('rejects immediately if already aborted', async () => {
		const { controller, signal } = createAbortController()
		controller.abort()
		await expect(abortPromise(signal)).rejects.toMatchObject({ name: 'AbortError' })
	})
})

describe('abortPromise reason', () => {
	it('rejects with signal.reason', async () => {
		const reason = new Error('custom')
		await expect(abortPromise(AbortSignal.abort(reason))).rejects.toBe(reason)
	})
	it('preserves TimeoutError from AbortSignal.timeout', async () => {
		await expect(abortPromise(AbortSignal.timeout(5))).rejects.toMatchObject({
			name: 'TimeoutError',
		})
	})
})

describe('withAbort', () => {
	it('rejects with signal.reason when already aborted', async () => {
		const reason = new Error('custom')
		await expect(withAbort(Promise.resolve('ok'), AbortSignal.abort(reason))).rejects.toBe(reason)
	})
	it('removes its abort listener once the promise settles', async () => {
		const { signal } = createAbortController()
		const remove = vi.spyOn(signal, 'removeEventListener')
		await withAbort(Promise.resolve('ok'), signal)
		expect(remove).toHaveBeenCalledWith('abort', expect.any(Function))
	})
	it('resolves if promise resolves before abort', async () => {
		const { signal } = createAbortController()
		const p = new Promise((resolve) => setTimeout(() => resolve('ok'), 10))
		await expect(withAbort(p, signal)).resolves.toBe('ok')
	})
	it('rejects if aborted before promise resolves', async () => {
		const { controller, signal } = createAbortController()
		const p = new Promise((resolve) => setTimeout(() => resolve('ok'), 50))
		setTimeout(() => controller.abort(), 10)
		await expect(withAbort(p, signal)).rejects.toMatchObject({ name: 'AbortError' })
	})
})

describe('abortAfter', () => {
	it('aborts the controller after timeout', async () => {
		const { controller, signal } = createAbortController()
		abortAfter(controller, 10)
		await expect(abortPromise(signal)).rejects.toMatchObject({ name: 'AbortError' })
	})
})
