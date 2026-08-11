---
title: Arrays
description: Utilities exported from @rtorcato/js-common/arrays.
---

Small, non-mutating helpers for everyday array work — chunking, grouping, deduping, taking the ends. Every function returns a new array and leaves its input untouched, including `shuffle`, which copies before running its Fisher-Yates pass. `unique` dedupes through a `Set`, so equality is SameValueZero — primitives compare by value, objects by reference, and two structurally identical objects both survive; use `groupBy` with a key function when you need value-based deduping.

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

## See also

- [objects](./objects.md) — pick, omit, deepMerge, deepClone
- [sets](./sets.md) — union, intersection, difference, subset checks
- [maps](./maps.md) — merge, invert and convert `Map`s
- [random](./random.md) — random ints, floats, strings and array picks
