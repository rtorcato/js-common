---
title: Json
description: Utilities exported from @rtorcato/js-common/json.
---

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
