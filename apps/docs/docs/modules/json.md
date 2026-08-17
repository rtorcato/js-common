---
title: Json
description: Utilities exported from @rtorcato/js-common/json.
---

Parse, stringify, validate and deep-clone through JSON, with every operation returning a fallback instead of throwing. Parsing untrusted JSON is the classic case where a `try`/`catch` is pure noise, so `safeJsonParse` takes the fallback as an argument. Cloning through JSON was removed in 4.0 along with its `objects` counterpart: `structuredClone` is a global on every supported runtime and keeps `Date`s, `Map`s, `Set`s and cycles intact.

## Example

```ts
import { isValidJson, safeJsonParse, safeJsonStringify } from '@rtorcato/js-common/json'

// localStorage holds whatever the last version of the app wrote there.
const prefs = safeJsonParse<Prefs>(localStorage.getItem('prefs') ?? '', { theme: 'dark' })

safeJsonParse('{bad json')                 // null
safeJsonStringify({ self: circularRef })   // null instead of a thrown TypeError
isValidJson('[1,2,3]')                     // true
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { isValidJson, safeJsonParse, safeJsonStringify } from '@rtorcato/js-common/json'
```

## Exports

| Name | Summary |
| --- | --- |
| `isValidJson` | Checks if a string is valid JSON. |
| `safeJsonParse` | Safely parses a JSON string, returning a fallback value if parsing fails. |
| `safeJsonStringify` | Safely stringifies a value to JSON, returning a fallback value if stringification fails. |

<!-- /generated:exports -->

## See also

- [objects](./objects.md) — pick, omit, deepMerge, deepClone
- [fetch](./fetch.md) — JSON helpers and fetch with a timeout
- [validation](./validation.md) — type guards — `isString`, `isNumber`, `isUrl`
- [arrays](./arrays.md) — chunk, unique, groupBy and other array helpers
