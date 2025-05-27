import { describe, expect, it } from 'vitest'
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
		await expect(abortPromise(signal)).rejects.toThrow(/Aborted/)
	})
	it('rejects immediately if already aborted', async () => {
		const { controller, signal } = createAbortController()
		controller.abort()
		await expect(abortPromise(signal)).rejects.toThrow(/Aborted/)
	})
})

describe('withAbort', () => {
	it('resolves if promise resolves before abort', async () => {
		const { controller, signal } = createAbortController()
		const p = new Promise((resolve) => setTimeout(() => resolve('ok'), 10))
		await expect(withAbort(p, signal)).resolves.toBe('ok')
	})
	it('rejects if aborted before promise resolves', async () => {
		const { controller, signal } = createAbortController()
		const p = new Promise((resolve) => setTimeout(() => resolve('ok'), 50))
		setTimeout(() => controller.abort(), 10)
		await expect(withAbort(p, signal)).rejects.toThrow(/Aborted/)
	})
})

describe('abortAfter', () => {
	it('aborts the controller after timeout', async () => {
		const { controller, signal } = createAbortController()
		abortAfter(controller, 10)
		await expect(abortPromise(signal)).rejects.toThrow(/Aborted/)
	})
})
