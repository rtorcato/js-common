---
title: Maps
description: Utilities exported from @rtorcato/js-common/maps.
---

Conversions and transforms for the native `Map` — to and from plain objects, merge, invert, map values. `Map` is the right structure for non-string keys, guaranteed insertion order and frequent adds and deletes, but it has none of the spread-and-merge ergonomics objects enjoy, which is the gap these fill. Every helper returns a new `Map`; later maps win on key collisions in `mergeMaps`, matching object spread.

```ts
import { invertMap, mapToObject, mapValues } from '@rtorcato/js-common/maps'
```

## Exports

| Name | Summary |
| --- | --- |
| `invertMap` | Inverts a Map (swaps keys and values). |
| `mapToObject` | Converts a Map to an object. |
| `mapValues` | Maps the values of a Map using a function. |
| `mergeMaps` | Merges two or more maps. |
| `objectToMap` | Converts an object to a Map. |

## See also

- [objects](./objects.md) — pick, omit, deepMerge, deepClone
- [sets](./sets.md) — union, intersection, difference, subset checks
- [arrays](./arrays.md) — chunk, unique, groupBy and other array helpers
- [json](./json.md) — safe parse/stringify and JSON deep clone
