---
title: Promises
description: Utilities exported from @rtorcato/js-common/promises.
---

```ts
import { all, allSettled, delay } from '@rtorcato/js-common/promises'
```

## Exports

| Name | Summary |
| --- | --- |
| `all` | Returns a promise that resolves when all promises resolve, or rejects on the first rejection (like Promise.all). |
| `allSettled` | Returns a promise that resolves when all promises settle (like Promise.allSettled). |
| `delay` | Returns a promise that resolves after a given delay (ms). |
| `race` | Returns a promise that resolves or rejects as soon as one of the promises resolves or rejects (like Promise.race). |
| `to` | Wraps a promise and returns a tuple [error, result]. |
| `withTimeout` | Returns a promise that rejects after a timeout if the input promise does not resolve. |

## See also

- [sleep](./sleep.md) — await a fixed or random delay
- [functions](./functions.md) — debounce, throttle, once, compose
- [try](./try.md) — `Result` tuples instead of thrown exceptions
- [abortController](./abortController.md) — cancel in-flight work with an `AbortSignal`
