import { describe, expect, it } from 'vitest'
import {
	getHostname,
	getQueryParams,
	isValidUrl,
	joinUrl,
	removeQueryParam,
	setQueryParam,
} from './index'

describe('isValidUrl', () => {
	it('returns true for valid URLs', () => {
		expect(isValidUrl('https://example.com')).toBe(true)
		expect(isValidUrl('http://localhost:3000')).toBe(true)
	})
	it('returns false for invalid URLs', () => {
		expect(isValidUrl('not a url')).toBe(false)
		expect(isValidUrl('example.com')).toBe(false)
	})
})

describe('getQueryParams', () => {
	it('returns query params as object', () => {
		expect(getQueryParams('https://a.com?foo=1&bar=2')).toEqual({ foo: '1', bar: '2' })
	})
	it('returns empty object for no params or invalid url', () => {
		expect(getQueryParams('https://a.com')).toEqual({})
		expect(getQueryParams('not a url')).toEqual({})
	})
})

describe('setQueryParam', () => {
	it('adds or updates a query param', () => {
		expect(setQueryParam('https://a.com', 'foo', 'bar')).toBe('https://a.com/?foo=bar')
		expect(setQueryParam('https://a.com?foo=1', 'foo', '2')).toBe('https://a.com/?foo=2')
	})
	it('returns original url if invalid', () => {
		expect(setQueryParam('not a url', 'foo', 'bar')).toBe('not a url')
	})
})

describe('removeQueryParam', () => {
	it('removes a query param', () => {
		expect(removeQueryParam('https://a.com?foo=1&bar=2', 'foo')).toBe('https://a.com/?bar=2')
	})
	it('returns original url if invalid', () => {
		expect(removeQueryParam('not a url', 'foo')).toBe('not a url')
	})
})

describe('joinUrl', () => {
	it('joins url segments with proper slashes', () => {
		expect(joinUrl('https://a.com/', '/foo/', '/bar')).toBe('https://a.com/foo/bar')
		expect(joinUrl('/a/', '/b/', '/c/')).toBe('/a/b/c')
		expect(joinUrl('a', 'b', 'c')).toBe('a/b/c')
	})
})

describe('getHostname', () => {
	it('returns the hostname from a url', () => {
		expect(getHostname('https://a.com/foo')).toBe('a.com')
		expect(getHostname('http://localhost:3000')).toBe('localhost')
	})
	it('returns empty string for invalid url', () => {
		expect(getHostname('not a url')).toBe('')
	})
})
