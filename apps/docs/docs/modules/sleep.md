---
title: Sleep
description: Utilities exported from @rtorcato/js-common/sleep.
---

```ts
import { sleep, sleepRandom, sleepSync } from '@rtorcato/js-common/sleep'
```

## Exports

| Name | Summary |
| --- | --- |
| `sleep` | Returns a promise that resolves after the specified number of milliseconds. |
| `sleepRandom` | Returns a promise that resolves after a random delay between min and max milliseconds. |
| `sleepSync` | Blocks the event loop for the specified number of milliseconds (synchronous sleep). |
| `sleepWithAbort` | Returns a promise that resolves after ms, or rejects if aborted via AbortSignal. |

## See also

- [promises](./promises.md) — delay, timeout and settle helpers
- [interval](./interval.md) — run something repeatedly on a timer
- [functions](./functions.md) — debounce, throttle, once, compose
- [abortController](./abortController.md) — cancel in-flight work with an `AbortSignal`
