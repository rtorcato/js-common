/**
 * Checks if a string is a valid URL.
 *
 * @example
 * ```typescript
 * isValidUrl('https://example.com/a?b=1') // true
 * isValidUrl('example.com') // false (no protocol)
 * ```
 *
 * @param str The string to check.
 * @returns True if valid URL, false otherwise.
 */
export function isValidUrl(str: string): boolean {
	try {
		new URL(str)
		return true
	} catch {
		return false
	}
}

/**
 * Gets the query parameters from a URL as an object.
 *
 * @example
 * ```typescript
 * getQueryParams('https://example.com/s?q=cats&page=2') // { q: 'cats', page: '2' }
 * getQueryParams('not a url') // {}
 * ```
 *
 * @param url The URL string.
 * @returns An object of query parameters.
 */
export function getQueryParams(url: string): Record<string, string> {
	try {
		const params = new URL(url).searchParams
		const result: Record<string, string> = {}
		params.forEach((value, key) => {
			result[key] = value
		})
		return result
	} catch {
		return {}
	}
}

/**
 * Adds or updates a query parameter in a URL.
 *
 * @example
 * ```typescript
 * setQueryParam('https://example.com/s?q=cats', 'page', '2')
 * // 'https://example.com/s?q=cats&page=2'
 * setQueryParam('https://example.com/s?q=cats', 'q', 'dogs')
 * // 'https://example.com/s?q=dogs'
 * ```
 *
 * @param url The URL string.
 * @param key The query parameter key.
 * @param value The query parameter value.
 * @returns The updated URL string.
 */
export function setQueryParam(url: string, key: string, value: string): string {
	try {
		const u = new URL(url)
		u.searchParams.set(key, value)
		return u.toString()
	} catch {
		return url
	}
}

/**
 * Removes a query parameter from a URL.
 * @param url The URL string.
 * @param key The query parameter key to remove.
 * @returns The updated URL string.
 */
export function removeQueryParam(url: string, key: string): string {
	try {
		const u = new URL(url)
		u.searchParams.delete(key)
		return u.toString()
	} catch {
		return url
	}
}

/**
 * Joins multiple URL segments into a single URL, ensuring proper slashes.
 * @param parts The URL segments.
 * @returns The joined URL string.
 */
export function joinUrl(...parts: string[]): string {
	return parts
		.map((part, i) => {
			if (i === 0) return part.replace(/\/+$/, '')
			return part.replace(/^\/+|\/+$/g, '')
		})
		.filter(Boolean)
		.join('/')
}

/**
 * Gets the hostname from a URL string.
 * @param url The URL string.
 * @returns The hostname, or an empty string if invalid.
 */
export function getHostname(url: string): string {
	try {
		return new URL(url).hostname
	} catch {
		return ''
	}
}
