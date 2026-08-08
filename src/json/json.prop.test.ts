import * as fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { isValidJson, safeJsonParse, safeJsonStringify } from './index'

// Keys are capped at 6 chars so `__proto__`/`constructor` can never be generated.
const key = fc.string({ minLength: 1, maxLength: 6 })

// Deliberately no doubles: `-0` stringifies to `"0"`, which is a JSON round-trip
// limitation rather than anything this module controls.
const jsonValue = fc.letrec<{ leaf: unknown; node: unknown }>((tie) => ({
	leaf: fc.oneof(fc.integer(), fc.string(), fc.boolean(), fc.constant(null)),
	node: fc.oneof(
		{ maxDepth: 3 },
		tie('leaf'),
		fc.array(tie('node'), { maxLength: 4 }),
		fc.dictionary(key, tie('node'), { maxKeys: 4, noNullPrototype: true })
	),
})).node

describe('json — properties', () => {
	it('safeJsonStringify round-trips through safeJsonParse', () => {
		fc.assert(
			fc.property(jsonValue, (value) => {
				expect(safeJsonParse(safeJsonStringify(value) as string)).toEqual(value)
			})
		)
	})

	it('safeJsonStringify always emits valid JSON', () => {
		fc.assert(
			fc.property(jsonValue, (value) => {
				expect(isValidJson(safeJsonStringify(value) as string)).toBe(true)
			})
		)
	})

	it('safeJsonStringify returns the fallback on circular references instead of throwing', () => {
		fc.assert(
			fc.property(
				fc.dictionary(key, jsonValue, { maxKeys: 4, noNullPrototype: true }),
				fc.string(),
				(obj, fallback) => {
					const circular: Record<string, unknown> = { ...obj }
					circular['self'] = circular
					expect(safeJsonStringify(circular, fallback)).toBe(fallback)
					expect(safeJsonStringify(circular)).toBeNull()
				}
			)
		)
	})

	it('safeJsonParse never throws — it falls back exactly when the input is not JSON', () => {
		const sentinel = { fallback: true }
		fc.assert(
			fc.property(fc.string(), (str) => {
				const parsed = safeJsonParse<unknown>(str, sentinel)
				if (isValidJson(str)) expect(parsed).toEqual(JSON.parse(str))
				else expect(parsed).toBe(sentinel)
			})
		)
	})
})
