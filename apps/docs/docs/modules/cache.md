---
title: Cache
description: Utilities exported from @rtorcato/js-common/cache.
---

**Runtime:** any — Node.js ≥ 24 or a modern browser

An in-memory TTL cache keyed by string. `createTtlCache` takes a freshness window and a `load` function per call: a value younger than `ttlMs` is served without calling `load`, and concurrent calls for one key share a single `load`.

Set `staleOnError` for upstreams that fail now and then. When a refresh throws, the last good value is returned (however old) and kept, so the next `get` tries again. With no good value yet, or without `staleOnError`, the error is rethrown. Entries are replaced, never evicted by age, so bound the key space yourself or call `delete` / `clear`.

## Example

```ts
import { createTtlCache } from '@rtorcato/js-common/cache'

const quotes = createTtlCache<Quote>({ ttlMs: 60_000, staleOnError: true })

// Served from memory for a minute; if the refresh then fails, the old quote is returned.
const quote = await quotes.get('AAPL', () => fetchQuote('AAPL'))
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { TtlCache, TtlCacheOptions, createTtlCache } from '@rtorcato/js-common/cache'
```

## Exports

| Name | Summary |
| --- | --- |
| `TtlCache` | — |
| `TtlCacheOptions` | — |
| `createTtlCache` | In-memory TTL cache with optional stale-on-error. |

<!-- /generated:exports -->

## See also

- [functions](./functions.md) — `once`, debounce, throttle
- [promises](./promises.md) — timeout and retry helpers for the `load` function
