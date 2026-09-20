---
title: Arrays
description: Utilities exported from @rtorcato/js-common/arrays.
---

Small, non-mutating helpers for everyday array work — chunking, deduping, compacting, shuffling, splitting, sorting and pairing. Every function returns a new array and leaves its input untouched, including `shuffle`, which copies before running its Fisher-Yates pass. `unique` dedupes through a `Set`, so equality is SameValueZero — primitives compare by value, objects by reference, and two structurally identical objects both survive.

`sortBy` reads its key once per element and falls back to the original index for ties, so it is stable and — unlike `Array#sort`, which stringifies — numeric keys sort numerically.

`first`, `last`, `flatten` and `groupBy` were removed in 4.0 in favour of `at(0)`, `at(-1)`, `flat()` and `Object.groupBy`, and they stay removed: the platform covers them exactly. Group with `Object.groupBy(items, keyFn)` (Node 22+).

## Example

```ts
import { chunk, compact, partition, sortBy, unique, zip } from '@rtorcato/js-common/arrays'

// Send 500 ids to an API that accepts 50 at a time.
for (const batch of chunk(unique(ids), 50)) {
  await api.post('/bulk', { ids: batch })
}

compact([1, 0, 2, null, 3]) // [1, 2, 3] — every falsy value dropped, including 0

const [active, archived] = partition(users, (u) => u.active)
sortBy(candles, (c) => c.date) // stable, non-mutating, chronological
zip(labels, values) // [['a', 1], ['b', 2]]
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { chunk, compact, partition } from '@rtorcato/js-common/arrays'
```

## Exports

| Name | Summary |
| --- | --- |
| `chunk` | Chunks an array into smaller arrays of a specified size. |
| `compact` | Removes all falsy values from an array. |
| `partition` | Splits an array into two arrays: the elements that satisfy the predicate and the ones that do not. |
| `shuffle` | Shuffles an array using the Fisher-Yates algorithm. |
| `sortBy` | Sorts an array by a derived key, without mutating the input. |
| `unique` | Removes duplicate values from an array while preserving order. |
| `zip` | Pairs up two arrays element by element. |

<!-- /generated:exports -->

## See also

- [objects](./objects.md) — pick, omit, deepMerge and other object helpers
- [maps](./maps.md) — merge, invert and convert `Map`s
- [random](./random.md) — random ints, floats, strings and array picks
