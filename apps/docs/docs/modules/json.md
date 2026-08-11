---
title: Json
description: Utilities exported from @rtorcato/js-common/json.
---

Parse, stringify, validate and deep-clone through JSON, with every operation returning a fallback instead of throwing. Parsing untrusted JSON is the classic case where a `try`/`catch` is pure noise, so `safeJsonParse` takes the fallback as an argument. `deepCloneJson` inherits JSON's limits — `undefined`, functions, `Date`s, `Map`s and cycles do not survive the round trip — so prefer `objects.deepClone` unless you specifically want the JSON-shaped result.

```ts
import { deepCloneJson, isValidJson, safeJsonParse } from '@rtorcato/js-common/json'
```

## Exports

| Name | Summary |
| --- | --- |
| `deepCloneJson` | Deep clones a value using JSON serialization. |
| `isValidJson` | Checks if a string is valid JSON. |
| `safeJsonParse` | Safely parses a JSON string, returning a fallback value if parsing fails. |
| `safeJsonStringify` | Safely stringifies a value to JSON, returning a fallback value if stringification fails. |

## See also

- [objects](./objects.md) — pick, omit, deepMerge, deepClone
- [fetch](./fetch.md) — JSON helpers and fetch with a timeout
- [validation](./validation.md) — type guards — `isString`, `isNumber`, `isUrl`
- [arrays](./arrays.md) — chunk, unique, groupBy and other array helpers
