---
title: Url
description: Utilities exported from @rtorcato/js-common/url.
---

URL parsing and query-string editing built on the platform `URL` — hostname, params, joining segments, setting and removing query parameters. Delegating to `URL` means percent-encoding, internationalised domains and relative resolution are the platform's problem rather than a regex's; `isValidUrl` is literally an attempted `new URL()`. `joinUrl` is the exception — plain string joining with slash normalisation, for assembling a path before you have a base.

```ts
import { getHostname, getQueryParams, isValidUrl } from '@rtorcato/js-common/url'
```

## Exports

| Name | Summary |
| --- | --- |
| `getHostname` | Gets the hostname from a URL string. |
| `getQueryParams` | Gets the query parameters from a URL as an object. |
| `isValidUrl` | Checks if a string is a valid URL. |
| `joinUrl` | Joins multiple URL segments into a single URL, ensuring proper slashes. |
| `removeQueryParam` | Removes a query parameter from a URL. |
| `setQueryParam` | Adds or updates a query parameter in a URL. |

## See also

- [validation](./validation.md) — type guards — `isString`, `isNumber`, `isUrl`
- [security](./security.md) — password strength, secure tokens, sanitizing
- [emails](./emails.md) — validate, normalize and mask email addresses
- [fetch](./fetch.md) — JSON helpers and fetch with a timeout
