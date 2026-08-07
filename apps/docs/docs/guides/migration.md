---
title: Migrating to 2.x
description: Upgrading from 1.x to 2.x.
sidebar_position: 3
---

The only breaking change in 2.0 is a rename in the `errors` module.

## `errors.tryCatch` → `errors.tryWithFallback`

```ts
// 1.x — swallow errors and fall back to a default value
import { tryCatch } from '@rtorcato/js-common/errors'
const data = await tryCatch(() => fetchData(), [])

// 2.x — same function, renamed for clarity
import { tryWithFallback } from '@rtorcato/js-common/errors'
const data = await tryWithFallback(() => fetchData(), [])
```

The name `tryCatch` is now reserved for the Result-pattern helper in `@rtorcato/js-common/try`, which returns `{ data, error }` instead of swallowing:

```ts
import { tryCatch } from '@rtorcato/js-common/try'
const { data, error } = await tryCatch(() => fetchData())
if (error) { /* handle */ }
```

Prefer the Result-style `tryCatch` for new code; reserve `tryWithFallback` for cases where the fallback is genuinely safe.
