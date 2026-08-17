---
title: Promises
description: Utilities exported from @rtorcato/js-common/promises.
---

Two adapters the platform does not ship: `withTimeout` and `to`. `to` returns an `[error, result]` tuple so a failure can be handled with an `if` instead of a `try`/`catch` block; `try`'s `Result` is the richer, type-narrowing version of the same idea. The pass-through wrappers over `Promise.all`/`allSettled`/`race`, and `delay`, were removed in 4.0 — call the statics directly, and use `sleep` for a plain wait. `withTimeout` is a `Promise.race`: it rejects on time but does not cancel, so the underlying work keeps running unless it honours an `AbortSignal`.

## Example

```ts
import { to, withTimeout } from '@rtorcato/js-common/promises'

// Error as a value: handle failure with an `if` instead of a try/catch block.
const [err, user] = await to(getUser(id))
if (err) return reply.status(502).send('user service unavailable')
user.email

// Reject after 2s. The request itself is not cancelled — it keeps running.
await withTimeout(getUser(id), 2_000, new Error('user service slow'))
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { to, withTimeout } from '@rtorcato/js-common/promises'
```

## Exports

| Name | Summary |
| --- | --- |
| `to` | Wraps a promise and returns a tuple [error, result]. |
| `withTimeout` | Returns a promise that rejects after a timeout if the input promise does not resolve. |

<!-- /generated:exports -->

## See also

- [sleep](./sleep.md) — await a fixed or random delay
- [functions](./functions.md) — debounce, throttle, once, compose
- [try](./try.md) — `Result` tuples instead of thrown exceptions
- [abortController](./abortController.md) — cancel in-flight work with an `AbortSignal`
