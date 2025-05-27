import { describe, expect, it } from 'vitest'
import {
	getEmailDomain,
	isFreeEmailProvider,
	isValidEmail,
	maskEmail,
	normalizeEmail,
} from './index'

describe('emails module', () => {
	it('isValidEmail validates email addresses', () => {
		expect(isValidEmail('test@example.com')).toBe(true)
		expect(isValidEmail('foo@bar.co.uk')).toBe(true)
		expect(isValidEmail('invalid-email')).toBe(false)
		expect(isValidEmail('foo@bar')).toBe(false)
		expect(isValidEmail('foo@.com')).toBe(false)
	})

	it('normalizeEmail trims and lowercases', () => {
		expect(normalizeEmail('  TEST@Example.COM  ')).toBe('test@example.com')
	})

	it('maskEmail masks the user part', () => {
		expect(maskEmail('jane@example.com')).toBe('j***@example.com')
		expect(maskEmail('a@b.com')).toBe('*@b.com')
		expect(maskEmail('invalid')).toBe('invalid')
	})

	it('getEmailDomain extracts the domain', () => {
		expect(getEmailDomain('foo@bar.com')).toBe('bar.com')
		expect(getEmailDomain('foo@bar.co.uk')).toBe('bar.co.uk')
		expect(getEmailDomain('invalid')).toBe('')
	})

	it('isFreeEmailProvider detects free providers', () => {
		expect(isFreeEmailProvider('foo@gmail.com')).toBe(true)
		expect(isFreeEmailProvider('foo@yahoo.com')).toBe(true)
		expect(isFreeEmailProvider('foo@outlook.com')).toBe(true)
		expect(isFreeEmailProvider('foo@mycompany.com')).toBe(false)
	})
})
