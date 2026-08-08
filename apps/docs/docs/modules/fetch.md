---
title: Fetch
description: Utilities exported from @rtorcato/js-common/fetch.
---

```ts
import { fetchText, fetchWithTimeout, getJson } from '@rtorcato/js-common/fetch'
```

## Exports

| Name | Summary |
| --- | --- |
| `fetchText` | Fetches a resource and returns the response as text. |
| `fetchWithTimeout` | Fetches a resource with a timeout. |
| `getJson` | Sends a GET request and returns JSON. |
| `handleApiError` | Handles fetch errors and returns a fallback value or throws. |
| `postJson` | Sends a POST request with a JSON body. |

## See also

- [promises](./promises.md) — delay, timeout and settle helpers
- [abortController](./abortController.md) — cancel in-flight work with an `AbortSignal`
- [json](./json.md) — safe parse/stringify and JSON deep clone
- [url](./url.md) — parse, validate and edit URLs and query params
