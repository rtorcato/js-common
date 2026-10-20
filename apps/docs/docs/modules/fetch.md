---
title: Fetch
description: Utilities exported from @rtorcato/js-common/fetch.
---

**Runtime:** any — Node.js ≥ 24 or a modern browser

Small conveniences around the platform `fetch` — JSON GET and POST, plain text, a timeout wrapper and error handling. It stays a thin layer rather than an HTTP client: no retries, interceptors, base URLs or response caching, because those are application decisions (or a job for `ky`). `fetchWithTimeout` is built on `AbortController` with an 8 second default, so it composes with the `abortController` module.

## Example

```ts
import { fetchWithTimeout, getJson, postJson } from '@rtorcato/js-common/fetch'

const user = await getJson<User>('/api/users/1')
const created = await postJson<NewUser, User>('/api/users', { name: 'Ada' })

// Same request, abandoned after 2s instead of the 8s default.
const report = await fetchWithTimeout('/api/report', {}, 2_000)
```

Every helper checks `response.ok`: a non-2xx response throws an `HttpError` carrying `status`,
`statusText`, `url` and the response `body` text.

```ts
import { getJson, HttpError } from '@rtorcato/js-common/fetch'

async function findUser(id: string) {
	try {
		return await getJson<User>(`/api/users/${id}`)
	} catch (e) {
		if (e instanceof HttpError && e.status === 404) return null
		throw e
	}
}
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { HttpError, fetchText, fetchWithTimeout } from '@rtorcato/js-common/fetch'
```

## Exports

| Name | Summary |
| --- | --- |
| `HttpError` | Thrown by the fetch helpers when the response status is not 2xx. |
| `fetchText` | Fetches a resource and returns the response as text. |
| `fetchWithTimeout` | Fetches a resource with a timeout. |
| `getJson` | Sends a GET request and returns JSON. |
| `handleApiError` | Handles fetch errors and returns a fallback value or throws. |
| `postJson` | Sends a POST request with a JSON body. |

<!-- /generated:exports -->

## See also

- [promises](./promises.md) — timeout and error-tuple helpers
- [abortController](./abortController.md) — cancel in-flight work with an `AbortSignal`
- [json](./json.md) — safe parse/stringify and JSON deep clone
- [url](./url.md) — parse, validate and edit URLs and query params
