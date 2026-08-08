import * as fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { deepClone, deepMerge, isPlainObject } from './index'

// Biased towards a tiny pool so two generated objects actually collide on keys —
// with purely random keys the merge properties are vacuously true. Capped at 6
// chars so `__proto__`/`constructor` can never be generated.
const key = fc.oneof(
	{ arbitrary: fc.constantFrom('a', 'b', 'c', 'nest'), weight: 4 },
	{ arbitrary: fc.string({ minLength: 1, maxLength: 6 }), weight: 1 }
)

// Constrained to what `structuredClone` actually supports: no functions, no
// symbols, no null-prototype objects, no sparse arrays.
const cloneable = fc.letrec<{ leaf: unknown; node: unknown }>((tie) => ({
	leaf: fc.oneof(
		fc.integer(),
		fc.string(),
		fc.boolean(),
		fc.bigInt(),
		fc.date({ noInvalidDate: true }),
		fc.constant(null),
		fc.constant(undefined)
	),
	node: fc.oneof(
		{ maxDepth: 3 },
		tie('leaf'),
		fc.array(tie('node'), { maxLength: 4 }),
		fc.dictionary(key, tie('node'), { maxKeys: 4, noNullPrototype: true })
	),
})).node

const cloneableObject = fc.dictionary(key, cloneable, { maxKeys: 5, noNullPrototype: true })

/** Recursively scribbles on every mutable node so a shared reference cannot hide. */
function mutateEverything(value: unknown): void {
	if (Array.isArray(value)) {
		for (const item of [...value]) mutateEverything(item)
		value.push('mutated')
	} else if (value instanceof Date) {
		value.setTime(0)
	} else if (isPlainObject(value)) {
		for (const item of Object.values(value)) mutateEverything(item)
		value['mutated'] = true
	}
}

describe('objects — properties', () => {
	it('deepClone is structurally equal to the original', () => {
		fc.assert(
			fc.property(cloneable, (value) => {
				expect(deepClone(value)).toEqual(value)
			})
		)
	})

	it('mutating the clone never touches the source', () => {
		fc.assert(
			// Two independently constructed but identical values: `reference` is the
			// yardstick, so a deepClone that returned its input would be caught.
			fc.property(fc.clone(cloneableObject, 2), ([source, reference]) => {
				const clone = deepClone(source)
				mutateEverything(clone)
				expect(source).toEqual(reference)
			})
		)
	})

	it('deepMerge keeps every key from both sides', () => {
		fc.assert(
			fc.property(cloneableObject, cloneableObject, (target, source) => {
				const merged = deepMerge(target, source)
				for (const k of [...Object.keys(target), ...Object.keys(source)]) {
					expect(Object.hasOwn(merged, k)).toBe(true)
				}
			})
		)
	})

	it('deepMerge preserves nested structure — nested keys from both sides survive', () => {
		fc.assert(
			fc.property(cloneableObject, cloneableObject, (target, source) => {
				const merged = deepMerge(target, source) as Record<string, unknown>
				for (const k of Object.keys(source)) {
					if (!isPlainObject(source[k]) || !isPlainObject(target[k])) continue
					const nested = merged[k] as Record<string, unknown>
					for (const nk of [...Object.keys(target[k]), ...Object.keys(source[k])]) {
						expect(Object.hasOwn(nested, nk)).toBe(true)
					}
				}
			})
		)
	})

	// NOT commutative and NOT associative: the implementation is last-write-wins,
	// so only the "source overrides target" direction is asserted.
	it('deepMerge lets the source win for every non-plain-object value', () => {
		fc.assert(
			fc.property(cloneableObject, cloneableObject, (target, source) => {
				const merged = deepMerge(target, source) as Record<string, unknown>
				for (const [k, v] of Object.entries(source)) {
					if (!isPlainObject(v)) expect(merged[k]).toBe(v)
				}
			})
		)
	})

	it('deepMerge with an empty object is the identity on either side', () => {
		fc.assert(
			fc.property(cloneableObject, (obj) => {
				expect(deepMerge(obj, {})).toEqual(obj)
				expect(deepMerge({}, obj)).toEqual(obj)
			})
		)
	})

	it('deepMerge is idempotent in its source argument', () => {
		fc.assert(
			fc.property(cloneableObject, cloneableObject, (target, source) => {
				const once = deepMerge(target, source)
				expect(deepMerge(once, source)).toEqual(once)
			})
		)
	})

	it('deepMerge does not mutate either input', () => {
		fc.assert(
			fc.property(
				fc.clone(cloneableObject, 2),
				fc.clone(cloneableObject, 2),
				([target, targetRef], [source, sourceRef]) => {
					deepMerge(target, source)
					expect(target).toEqual(targetRef)
					expect(source).toEqual(sourceRef)
				}
			)
		)
	})
})
