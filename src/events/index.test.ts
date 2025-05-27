// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import { emit, on, once, preventDefault, stopPropagation } from './index'

describe('events module', () => {
	it('on adds and removes event listeners', () => {
		const target = document.createElement('div')
		const handler = vi.fn()
		const off = on(target, 'click', handler)
		target.dispatchEvent(new MouseEvent('click'))
		expect(handler).toHaveBeenCalledTimes(1)
		off()
		target.dispatchEvent(new MouseEvent('click'))
		expect(handler).toHaveBeenCalledTimes(1)
	})

	it('emit dispatches a custom event with detail', () => {
		const target = document.createElement('div')
		const handler = vi.fn()
		target.addEventListener('custom', (e: Event) => {
			handler((e as CustomEvent).detail)
		})
		const detail = { foo: 1 }
		const result = emit(target, 'custom', detail)
		expect(result).toBe(true)
		expect(handler).toHaveBeenCalledWith(detail)
	})

	it('once resolves when event is fired', async () => {
		const target = document.createElement('div')
		setTimeout(() => target.dispatchEvent(new MouseEvent('click')), 10)
		const event = await once(target, 'click')
		expect(event).toBeInstanceOf(MouseEvent)
	})

	it('preventDefault calls event.preventDefault', () => {
		const event = { preventDefault: vi.fn() } as unknown as Event
		preventDefault(event)
		expect(event.preventDefault).toHaveBeenCalled()
	})

	it('stopPropagation calls event.stopPropagation', () => {
		const event = { stopPropagation: vi.fn() } as unknown as Event
		stopPropagation(event)
		expect(event.stopPropagation).toHaveBeenCalled()
	})
})
