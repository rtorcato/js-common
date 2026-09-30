---
title: Promises
description: Utilities exported from @rtorcato/js-common/promises.
---

**Runtime:** any — Node.js ≥ 22 or a modern browser

Three helpers the platform does not ship: `withTimeout`, `to` and `retry`. `to` returns an `[error, result]` tuple so a failure can be handled with an `if` instead of a `try`/`catch` block; `try`'s `Result` is the richer, type-narrowing version of the same idea. The pass-through wrappers over `Promise.all`/`allSettled`/`race`, and `delay`, were removed in 4.0 — call the statics directly, and use `sleep` for a plain wait. `withTimeout` is a `Promise.race`: it rejects on time but does not cancel, so the underlying work keeps running unless it honours an `AbortSignal`. `retry` re-runs a failing operation with exponential backoff and full jitter, stops early when `shouldRetry` says an error won't recover, and aborts both the wait and further attempts when its `signal` fires.

## Example

```ts
import { retry, to, withTimeout } from '@rtorcato/js-common/promises'

// Error as a value: handle failure with an `if` instead of a try/catch block.
const [err, user] = await to(getUser(id))
if (err) return reply.status(502).send('user service unavailable')
user.email

// Reject after 2s. The request itself is not cancelled — it keeps running.
await withTimeout(getUser(id), 2_000, new Error('user service slow'))

// Up to 4 attempts, waits capped at 100, 200, 400 ms (full jitter), cancellable.
const res = await retry((attempt, signal) => fetch('/api/report', { signal }), {
  signal: AbortSignal.timeout(10_000),
})
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { RetryOptions, retry, to } from '@rtorcato/js-common/promises'
```

## Exports

| Name | Summary |
| --- | --- |
| `RetryOptions` | Options for `retry`. |
| `retry` | Runs `fn` until it resolves, retrying rejections with exponential backoff and full jitter. |
| `to` | Wraps a promise and returns a tuple [error, result]. |
| `withTimeout` | Returns a promise that rejects after a timeout if the input promise does not resolve. |

<!-- /generated:exports -->

## See also

- [sleep](./sleep.md) — await a fixed or random delay
- [functions](./functions.md) — debounce, throttle, once, compose
- [try](./try.md) — `Result` tuples instead of thrown exceptions
- [abortController](./abortController.md) — cancel in-flight work with an `AbortSignal`
