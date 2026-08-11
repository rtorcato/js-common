---
title: AbortController
description: Utilities exported from @rtorcato/js-common/abortController.
---

Cancellation plumbing for anything that speaks `AbortSignal` — create a controller, abort it on a timer, or turn a signal into a promise that rejects. It wraps the platform `AbortController` instead of inventing a cancellation type, so the same signal works with `fetch`, stream readers and any third-party API that accepts one. Aborting rejects your wrapper immediately, but the underlying work only really stops if it honours the signal.

```ts
import { abortAfter, abortPromise, createAbortController } from '@rtorcato/js-common/abortController'
```

## Exports

| Name | Summary |
| --- | --- |
| `abortAfter` | Aborts the given controller after a timeout (ms). |
| `abortPromise` | Returns a promise that rejects when the given AbortSignal is aborted. |
| `createAbortController` | Creates a new AbortController and returns its controller and signal. |
| `withAbort` | Wraps a promise and rejects it if the signal is aborted. |

## See also

- [promises](./promises.md) — delay, timeout and settle helpers
- [sleep](./sleep.md) — await a fixed or random delay
- [fetch](./fetch.md) — JSON helpers and fetch with a timeout
- [try](./try.md) — `Result` tuples instead of thrown exceptions
