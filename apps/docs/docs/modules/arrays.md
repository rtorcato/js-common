---
title: Arrays
description: Utilities exported from @rtorcato/js-common/arrays.
---

Small, non-mutating helpers for everyday array work — chunking, deduping, compacting, shuffling. Every function returns a new array and leaves its input untouched, including `shuffle`, which copies before running its Fisher-Yates pass. `unique` dedupes through a `Set`, so equality is SameValueZero — primitives compare by value, objects by reference, and two structurally identical objects both survive.

`first`, `last`, `flatten` and `groupBy` were removed in 4.0 in favour of `at(0)`, `at(-1)`, `flat()` and `Object.groupBy`.

## Example

```ts
import { chunk, compact, unique } from '@rtorcato/js-common/arrays'

// Send 500 ids to an API that accepts 50 at a time.
for (const batch of chunk(unique(ids), 50)) {
  await api.post('/bulk', { ids: batch })
}

compact([1, 0, 2, null, 3]) // [1, 2, 3] — every falsy value dropped, including 0
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { chunk, compact, shuffle } from '@rtorcato/js-common/arrays'
```

## Exports

| Name | Summary |
| --- | --- |
| `chunk` | Chunks an array into smaller arrays of a specified size. |
| `compact` | Removes all falsy values from an array. |
| `shuffle` | Shuffles an array using the Fisher-Yates algorithm. |
| `unique` | Removes duplicate values from an array while preserving order. |

<!-- /generated:exports -->

## See also

- [objects](./objects.md) — pick, omit, deepMerge, deepClone
- [maps](./maps.md) — merge, invert and convert `Map`s
- [random](./random.md) — random ints, floats, strings and array picks
