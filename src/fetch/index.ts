/**
 * Fetches a resource with a timeout.
 * @param url The URL to fetch.
 * @param options Fetch options.
 * @param timeout Timeout in milliseconds (default: 8000).
 * @returns The parsed JSON response.
 */
export async function fetchWithTimeout(
	url: string,
	options: RequestInit = {},
	timeout = 8000
): Promise<unknown> {
	const controller = new AbortController()
	const id = setTimeout(() => controller.abort(), timeout)
	try {
		const response = await fetch(url, { ...options, signal: controller.signal })
		clearTimeout(id)
		return await response.json()
	} finally {
		clearTimeout(id)
	}
}

/**
 * Sends a POST request with a JSON body.
 * @param url The URL to post to.
 * @param body The body to send.
 * @param options Additional fetch options.
 * @returns The parsed JSON response.
 */
export async function postJson<T = unknown, R = unknown>(
	url: string,
	body: T,
	options: RequestInit = {}
): Promise<R> {
	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
		body: JSON.stringify(body),
		...options,
	})
	return await response.json()
}

/**
 * Sends a GET request and returns JSON.
 * @param url The URL to fetch.
 * @param options Additional fetch options.
 * @returns The parsed JSON response.
 */
export async function getJson<T = unknown>(url: string, options: RequestInit = {}): Promise<T> {
	const response = await fetch(url, { ...options, method: 'GET' })
	return await response.json()
}

/**
 * Fetches a resource and returns the response as text.
 * @param url The URL to fetch.
 * @param options Fetch options.
 * @returns The response as text.
 */
export async function fetchText(url: string, options: RequestInit = {}): Promise<string> {
	const response = await fetch(url, options)
	return await response.text()
}

/**
 * Handles fetch errors and returns a fallback value or throws.
 * @param promise The fetch promise.
 * @param fallback The fallback value to return on error.
 * @returns The resolved value or the fallback.
 */
export async function handleApiError<T>(promise: Promise<T>, fallback?: T): Promise<T> {
	try {
		return await promise
	} catch (e) {
		if (fallback !== undefined) return fallback
		throw e
	}
}
