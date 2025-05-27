import { describe, expect, it } from 'vitest'
import { add, subtract } from './math'
import { sum } from './sum'

describe('math module', () => {
	it('add adds two numbers', () => {
		expect(add(2, 3)).toBe(5)
		expect(add(-1, 1)).toBe(0)
		expect(add(0, 0)).toBe(0)
	})

	it('subtract subtracts two numbers', () => {
		expect(subtract(5, 3)).toBe(2)
		expect(subtract(0, 1)).toBe(-1)
		expect(subtract(10, 0)).toBe(10)
	})

	it('sum adds two numbers', () => {
		expect(sum(1, 2)).toBe(3)
		expect(sum(-1, 1)).toBe(0)
		expect(sum(0, 0)).toBe(0)
	})
})
