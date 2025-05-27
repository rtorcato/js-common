import { describe, expect, it } from 'vitest'
import { randomBool, randomElement, randomFloat, randomInt, randomString } from './index'

describe('random module', () => {
	it('randomInt returns integer in range', () => {
		for (let i = 0; i < 20; i++) {
			const n = randomInt(1, 5)
			expect(Number.isInteger(n)).toBe(true)
			expect(n).toBeGreaterThanOrEqual(1)
			expect(n).toBeLessThanOrEqual(5)
		}
	})

	it('randomFloat returns float in range', () => {
		for (let i = 0; i < 20; i++) {
			const n = randomFloat(1, 2)
			expect(typeof n).toBe('number')
			expect(n).toBeGreaterThanOrEqual(1)
			expect(n).toBeLessThan(2)
		}
	})

	it('randomBool returns a boolean', () => {
		const results = new Set()
		for (let i = 0; i < 20; i++) results.add(randomBool())
		expect([...results].every((v) => typeof v === 'boolean')).toBe(true)
		// Should eventually get both true and false
		expect(results.size).toBe(2)
	})

	it('randomElement returns an element or undefined', () => {
		const arr = [1, 2, 3]
		for (let i = 0; i < 10; i++) {
			expect(arr).toContain(randomElement(arr))
		}
		expect(randomElement([])).toBeUndefined()
	})

	it('randomString returns string of correct length and chars', () => {
		const str = randomString(10)
		expect(typeof str).toBe('string')
		expect(str.length).toBe(10)
		expect(str).toMatch(/^[A-Za-z0-9]{10}$/)
		const custom = randomString(5, 'abc')
		expect(custom.length).toBe(5)
		expect(custom).toMatch(/^[abc]{5}$/)
	})
})
