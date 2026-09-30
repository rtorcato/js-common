// @vitest-environment node
import { expect, it } from 'vitest'
import { emit, on } from './index'

it('emit delivers detail to an on listener in Node', () => {
	const target = new EventTarget()
	let received: unknown
	on(target, 'cart:add' as keyof HTMLElementEventMap, (event) => {
		received = (event as unknown as CustomEvent).detail
	})
	expect(emit(target, 'cart:add', { sku: 'A1' })).toBe(true)
	expect(received).toEqual({ sku: 'A1' })
})
