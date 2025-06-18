import { describe, expect, it } from 'vitest'
import { helloWorld } from './index'

describe('helloWorld', () => {
	it('should return "Hello, World!"', () => {
		const result = helloWorld()
		expect(result).toBe('Hello, World!')
	})
})
