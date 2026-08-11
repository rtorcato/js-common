---
title: Sets
description: Utilities exported from @rtorcato/js-common/sets.
---

Set algebra over the native `Set` — union, intersection, difference, subset and superset — plus array conversions. Membership is SameValueZero, so primitives compare by value and objects by reference; map objects to a key first if you need structural comparison. Every operation returns a new `Set` and leaves its inputs alone, and these exist for runtimes that do not yet ship the equivalent `Set` methods natively.

```ts
import { arrayToSet, difference, intersection } from '@rtorcato/js-common/sets'
```

## Exports

| Name | Summary |
| --- | --- |
| `arrayToSet` | Converts an array to a set. |
| `difference` | Returns the difference of two sets (elements in a not in b). |
| `intersection` | Returns the intersection of two sets. |
| `isSubset` | Returns true if set a is a subset of set b. |
| `isSuperset` | Returns true if set a is a superset of set b. |
| `setToArray` | Converts a set to an array. |
| `union` | Returns the union of two sets. |

## See also

- [arrays](./arrays.md) — chunk, unique, groupBy and other array helpers
- [objects](./objects.md) — pick, omit, deepMerge, deepClone
- [maps](./maps.md) — merge, invert and convert `Map`s
