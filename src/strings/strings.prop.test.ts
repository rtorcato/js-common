import * as fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { camelCase, capitalize, kebabCase, snakeCase } from './index'

// Inputs constrained to a "word-like" alphabet so case helpers have well-defined
// behavior — Unicode/emoji round-trips aren't a contract these helpers promise.
const wordy = fc.stringMatching(/^[A-Za-z][A-Za-z0-9\- _]*$/, { size: 'small' })

describe('strings — properties', () => {
	it('kebabCase is idempotent on word-like input', () => {
		fc.assert(
			fc.property(wordy, (s) => {
				expect(kebabCase(kebabCase(s))).toBe(kebabCase(s))
			})
		)
	})

	it('snakeCase is idempotent on word-like input', () => {
		fc.assert(
			fc.property(wordy, (s) => {
				expect(snakeCase(snakeCase(s))).toBe(snakeCase(s))
			})
		)
	})

	it('camelCase is idempotent on word-like input', () => {
		fc.assert(
			fc.property(wordy, (s) => {
				expect(camelCase(camelCase(s))).toBe(camelCase(s))
			})
		)
	})

	it('kebabCase output only contains [a-z0-9-]', () => {
		fc.assert(
			fc.property(wordy, (s) => {
				expect(kebabCase(s)).toMatch(/^[a-z0-9-]*$/)
			})
		)
	})

	it('snakeCase output only contains [a-z0-9_]', () => {
		fc.assert(
			fc.property(wordy, (s) => {
				expect(snakeCase(s)).toMatch(/^[a-z0-9_]*$/)
			})
		)
	})

	it('capitalize leaves a leading uppercase letter unchanged', () => {
		fc.assert(
			fc.property(fc.stringMatching(/^[A-Z][a-z]+$/, { size: 'small' }), (s) => {
				expect(capitalize(s)).toBe(s)
			})
		)
	})
})
