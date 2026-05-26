import { describe, expect, it } from 'vitest'
import { add, divide, multiply, subtract } from './math'

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

	it('multiply multiplies two numbers', () => {
		expect(multiply(2, 3)).toBe(6)
		expect(multiply(-2, 3)).toBe(-6)
		expect(multiply(0, 5)).toBe(0)
	})

	it('divide divides two numbers', () => {
		expect(divide(6, 2)).toBe(3)
		expect(divide(5, 2)).toBe(2.5)
		expect(divide(0, 5)).toBe(0)
	})
})
