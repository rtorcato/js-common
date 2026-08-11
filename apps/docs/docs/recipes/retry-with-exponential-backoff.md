---
title: Retry an async operation with exponential backoff
description: A retry helper built from delay, clamp and tryCatch — with jitter, a cap, and a rule for which errors are worth retrying.
---

A flaky upstream deserves a second attempt; a `404` does not. This recipe builds
a retry helper from [`delay`](../modules/promises.md),
[`clamp`](../modules/numbers.md), [`randomInt`](../modules/random.md) and
[`tryCatch`](../modules/try.md) — about twenty lines, no dependency.

## The code

```ts
import { clamp } from '@rtorcato/js-common/numbers'
import { delay } from '@rtorcato/js-common/promises'
import { randomInt } from '@rtorcato/js-common/random'
import { type Result, tryCatch } from '@rtorcato/js-common/try'

export type RetryOptions = {
  /** Total attempts, including the first. Default 4. */
  attempts?: number
  /** Delay before the first retry, in ms. Doubles each round. Default 200. */
  baseMs?: number
  /** Upper bound on a single delay, in ms. Default 10_000. */
  maxMs?: number
  /** Return false to stop early — e.g. on a 4xx. Default: retry everything. */
  shouldRetry?: (error: unknown) => boolean
}

/**
 * Runs `fn`, retrying failures with exponential backoff and jitter.
 * Resolves to a `Result` — the last error if every attempt failed.
 */
export async function retry<T>(
  fn: () => Promise<T>,
  { attempts = 4, baseMs = 200, maxMs = 10_000, shouldRetry = () => true }: RetryOptions = {}
): Promise<Result<T>> {
  let last: Result<T> = { data: null, error: new Error('retry: attempts must be at least 1') }

  for (let attempt = 0; attempt < attempts; attempt++) {
    last = await tryCatch(fn)
    if (!last.error) return last
    if (attempt === attempts - 1 || !shouldRetry(last.error)) break

    const backoff = clamp(baseMs * 2 ** attempt, baseMs, maxMs)
    await delay(randomInt(Math.round(backoff / 2), backoff)) // jitter
  }

  return last
}
```

Call it and branch on the `Result` — no try/catch at the call site:

```ts
import { isSuccess } from '@rtorcato/js-common/try'

const result = await retry(() => getJson<Report>('/api/report'))

if (isSuccess(result)) {
  render(result.data)
} else {
  logger.error({ err: result.error }, 'report fetch failed after 4 attempts')
}
```

## Why jitter

Without it, every client that failed at the same moment retries at the same
moment — the thundering herd that keeps a recovering service down. Sleeping a
random amount between half the backoff and the full backoff spreads the retries
out. With the defaults, the waits are roughly 100–200 ms, 200–400 ms, then
400–800 ms.

`clamp` is what stops the doubling from running away: attempt 10 would otherwise
wait about 200 seconds.

## Retry the right errors

Retrying a `400` just fails four times more slowly. Pass `shouldRetry` to
retry only what a retry can fix — network failures, `429`, and `5xx`:

```ts
class HttpError extends Error {
  constructor(readonly status: number) {
    super(`HTTP ${status}`)
  }
}

const result = await retry(() => fetchReport(), {
  shouldRetry: (error) =>
    !(error instanceof HttpError) || error.status === 429 || error.status >= 500,
})
```

:::caution Only retry idempotent work
A `GET` or a `PUT` is safe to repeat. A `POST` that charges a card is not — a
timeout does not tell you whether the server processed the request. Retry those
only behind an idempotency key.
:::

## Bound each attempt

Backoff does not help if a single attempt hangs forever.
[`withTimeout`](../modules/promises.md) caps one attempt; the retry loop caps
the whole operation:

```ts
import { withTimeout } from '@rtorcato/js-common/promises'

const result = await retry(() => withTimeout(fetchReport(), 5_000), { attempts: 3 })
```

Worst case here is 3 × 5 s of work plus the backoff waits — a number you can
put in a timeout budget.

## Let the caller cancel

Pass an `AbortSignal` through to the work and check it between attempts, so a
cancelled request stops retrying instead of finishing its schedule:

```ts
import { createAbortController } from '@rtorcato/js-common/abortController'

const { controller, signal } = createAbortController()

const result = await retry(() => fetch('/api/report', { signal }), {
  shouldRetry: () => !signal.aborted,
})
```

## See also

- [promises](../modules/promises.md) — delay, timeout and settle helpers
- [try](../modules/try.md) — `Result` values instead of thrown exceptions
- [numbers](../modules/numbers.md) — sum, average, clamp, roundTo
- [abortController](../modules/abortController.md) — cancel in-flight work with an `AbortSignal`
- [Debounce a search input](./debounce-a-search-input.md)
