---
title: Objects
description: Utilities exported from @rtorcato/js-common/objects.
---

Plain-object helpers — `pick`, `omit`, `deepMerge`, `deepClone` and a plain-object guard. `deepClone` is `structuredClone`, so `Date`s, `Map`s, `Set`s, typed arrays and cycles all survive while functions and class prototypes do not — that is the deliberate difference from `json.deepCloneJson`. `pick` and `omit` return shallow copies, and `deepMerge` recurses only into plain objects: arrays and class instances are replaced wholesale rather than merged.

```ts
import { deepClone, deepMerge, isPlainObject } from '@rtorcato/js-common/objects'
```

## Exports

| Name | Summary |
| --- | --- |
| `deepClone` | Deep clones a value using the native structuredClone algorithm. |
| `deepMerge` | Deeply merges two objects. |
| `isPlainObject` | Returns true if the value is a plain object (not null, not array, not function). |
| `omit` | Returns a shallow copy of an object with the given keys omitted. |
| `pick` | Returns a shallow copy of an object with only the given keys. |

## See also

- [arrays](./arrays.md) — chunk, unique, groupBy and other array helpers
- [maps](./maps.md) — merge, invert and convert `Map`s
- [json](./json.md) — safe parse/stringify and JSON deep clone
- [sets](./sets.md) — union, intersection, difference, subset checks
