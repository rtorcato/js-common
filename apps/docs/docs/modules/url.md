---
title: Url
description: Utilities exported from @rtorcato/js-common/url.
---

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
