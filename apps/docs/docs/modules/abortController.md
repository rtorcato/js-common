---
title: AbortController
description: Utilities exported from @rtorcato/js-common/abortController.
---

Cancellation plumbing for anything that speaks `AbortSignal` — create a controller, abort it on a timer, or turn a signal into a promise that rejects. It wraps the platform `AbortController` instead of inventing a cancellation type, so the same signal works with `fetch`, stream readers and any third-party API that accepts one. Aborting rejects your wrapper immediately, but the underlying work only really stops if it honours the signal.

## Example

```ts
import { abortAfter, createAbortController, withAbort } from '@rtorcato/js-common/abortController'

// Give a slow upload five seconds, then stop waiting on it either way.
const { controller, signal } = createAbortController()
abortAfter(controller, 5_000)

try {
  const res = await withAbort(fetch('/api/upload', { method: 'POST', body, signal }), signal)
  console.log(await res.json())
} catch (err) {
  if ((err as Error).name === 'AbortError') console.warn('upload gave up')
}
```

`fetch` honours the signal, so the request is genuinely cancelled. `withAbort` only guarantees
that *your* promise settles — wrap work that ignores the signal and it keeps running in the
background.

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

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

<!-- /generated:exports -->

## See also

- [promises](./promises.md) — delay, timeout and settle helpers
- [sleep](./sleep.md) — await a fixed or random delay
- [fetch](./fetch.md) — JSON helpers and fetch with a timeout
- [try](./try.md) — `Result` tuples instead of thrown exceptions
