---
title: Arrays
description: Utilities exported from @rtorcato/js-common/arrays.
---

Small, non-mutating helpers for everyday array work — chunking, grouping, deduping, taking the ends. Every function returns a new array and leaves its input untouched, including `shuffle`, which copies before running its Fisher-Yates pass. `unique` dedupes through a `Set`, so equality is SameValueZero — primitives compare by value, objects by reference, and two structurally identical objects both survive; use `groupBy` with a key function when you need value-based deduping.

## Example

```ts
import { chunk, compact, groupBy, unique } from '@rtorcato/js-common/arrays'

const rows = [
  { id: 1, team: 'red' },
  { id: 2, team: 'blue' },
  { id: 3, team: 'red' },
]

groupBy(rows, (r) => r.team) // { red: [{ id: 1, … }, { id: 3, … }], blue: [{ id: 2, … }] }

// Send 500 ids to an API that accepts 50 at a time.
for (const batch of chunk(unique(ids), 50)) {
  await api.post('/bulk', { ids: batch })
}

compact([1, 0, 2, null, 3]) // [1, 2, 3] — every falsy value dropped, including 0
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { chunk, compact, first } from '@rtorcato/js-common/arrays'
```

## Exports

| Name | Summary |
| --- | --- |
| `chunk` | Chunks an array into smaller arrays of a specified size. |
| `compact` | Removes all falsy values from an array. |
| `first` | Returns the first element of an array, or undefined if the array is empty. |
| `flatten` | Flattens an array one level deep. |
| `groupBy` | Groups array elements by a key derived from each element. |
| `last` | Returns the last element of an array, or undefined if the array is empty. |
| `shuffle` | Shuffles an array using the Fisher-Yates algorithm. |
| `unique` | Removes duplicate values from an array while preserving order. |

<!-- /generated:exports -->

## See also

- [objects](./objects.md) — pick, omit, deepMerge, deepClone
- [maps](./maps.md) — merge, invert and convert `Map`s
- [random](./random.md) — random ints, floats, strings and array picks
