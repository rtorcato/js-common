/**
 * Thrown by the fetch helpers when the response status is not 2xx.
 *
 * @example
 * ```typescript
 * try {
 * 	await getJson('https://api.example.com/missing')
 * } catch (e) {
 * 	if (e instanceof HttpError) e.status // 404
 * }
 * ```
 */
export class HttpError extends Error {
	/** The HTTP status code, e.g. `404`. */
	readonly status: number
	/** The HTTP status text, e.g. `'Not Found'`. */
	readonly statusText: string
	/** The response URL. */
	readonly url: string
	/** The response body as text, or `undefined` when it could not be read. */
	readonly body: string | undefined

	constructor(status: number, statusText: string, url: string, body?: string) {
		super(`HTTP ${status}${statusText ? ` ${statusText}` : ''}${url ? ` (${url})` : ''}`)
		this.name = 'HttpError'
		this.status = status
		this.statusText = statusText
		this.url = url
		this.body = body
	}
}

async function ensureOk(response: Response, url: string): Promise<Response> {
	if (response.ok) return response
	const body = await response.text().catch(() => undefined)
	throw new HttpError(response.status, response.statusText, response.url || url, body)
}

/**
 * Fetches a resource with a timeout.
 *
 * @example
 * ```typescript
 * await fetchWithTimeout('https://api.example.com/health') // { status: 'ok' }
 * await fetchWithTimeout('https://slow.example.com', {}, 500)
 * // rejects with a TimeoutError DOMException after 500ms (covers the body read too)
 * const controller = new AbortController()
 * await fetchWithTimeout('https://api.example.com', { signal: controller.signal })
 * // controller.abort() rejects with AbortError
 * ```
 *
 * @param url The URL to fetch.
 * @param options Fetch options. A caller `signal` is honoured alongside the timeout.
 * @param timeout Timeout in milliseconds (default: 8000).
 * @returns The parsed JSON response.
 * @throws {HttpError} When the response status is not 2xx.
 */
export async function fetchWithTimeout(
	url: string,
	options: RequestInit = {},
	timeout = 8000
): Promise<unknown> {
	const timeoutSignal = AbortSignal.timeout(timeout)
	const signal = options.signal ? AbortSignal.any([options.signal, timeoutSignal]) : timeoutSignal
	const response = await ensureOk(await fetch(url, { ...options, signal }), url)
	return await response.json()
}

/**
 * Sends a POST request with a JSON body.
 *
 * @example
 * ```typescript
 * const user = await postJson<{ name: string }, { id: number }>(
 * 	'https://api.example.com/users',
 * 	{ name: 'Ada' }
 * )
 * user.id // 42
 * ```
 *
 * @param url The URL to post to.
 * @param body The body to send.
 * @param options Additional fetch options. `method` defaults to `POST`; pass e.g. `'PUT'` or
 * `'PATCH'` to override it. Caller headers are merged; `Content-Type` defaults to
 * `application/json` unless the caller sets it.
 * @returns The parsed JSON response.
 * @throws {HttpError} When the response status is not 2xx.
 */
export async function postJson<T = unknown, R = unknown>(
	url: string,
	body: T,
	options: RequestInit = {}
): Promise<R> {
	const headers = new Headers(options.headers)
	if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
	const response = await fetch(url, {
		...options,
		method: options.method ?? 'POST',
		headers,
		body: JSON.stringify(body),
	})
	return await (await ensureOk(response, url)).json()
}

/**
 * Sends a GET request and returns JSON.
 *
 * @example
 * ```typescript
 * const user = await getJson<{ id: number }>('https://api.example.com/users/42')
 * user.id // 42
 * ```
 *
 * @param url The URL to fetch.
 * @param options Additional fetch options.
 * @returns The parsed JSON response.
 * @throws {HttpError} When the response status is not 2xx.
 */
export async function getJson<T = unknown>(url: string, options: RequestInit = {}): Promise<T> {
	const response = await ensureOk(await fetch(url, { ...options, method: 'GET' }), url)
	return await response.json()
}

/**
 * Fetches a resource and returns the response as text.
 * @param url The URL to fetch.
 * @param options Fetch options.
 * @returns The response as text.
 * @throws {HttpError} When the response status is not 2xx.
 */
export async function fetchText(url: string, options: RequestInit = {}): Promise<string> {
	const response = await ensureOk(await fetch(url, options), url)
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
