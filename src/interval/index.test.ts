import { describe, expect, it, vi } from 'vitest'
import { clearIntervalById, runInterval } from './index'

describe('interval module', () => {
	it('runInterval calls function repeatedly', async () => {
		const fn = vi.fn()
		const id = runInterval(fn, 10)
		await new Promise((resolve) => setTimeout(resolve, 35))
		clearIntervalById(id)
		expect(fn).toHaveBeenCalled()
		expect(fn.mock.calls.length).toBeGreaterThanOrEqual(2)
	})

	it('clearIntervalById stops the interval', async () => {
		const fn = vi.fn()
		const id = runInterval(fn, 10)
		clearIntervalById(id)
		await new Promise((resolve) => setTimeout(resolve, 30))
		expect(fn).not.toHaveBeenCalled()
	})
})
