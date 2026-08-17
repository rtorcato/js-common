---
title: Objects
description: Utilities exported from @rtorcato/js-common/objects.
---

Plain-object helpers — `pick`, `omit`, `deepMerge` and a plain-object guard. `pick` and `omit` return shallow copies, and `deepMerge` recurses only into plain objects: arrays and class instances are replaced wholesale rather than merged.

`deepClone` was removed in 4.0; call the `structuredClone` global directly.

## Example

```ts
import { deepMerge, omit, pick } from '@rtorcato/js-common/objects'

// Layer environment config over defaults.
deepMerge({ retries: 3, db: { host: 'localhost', port: 5432 } }, { db: { host: 'prod.db' } })
// { retries: 3, db: { host: 'prod.db', port: 5432 } }

omit(user, ['passwordHash'])   // safe to serialise
pick(user, ['id', 'email'])    // exactly what the client needs

```

`deepMerge` recurses into plain objects only: arrays and class instances are replaced wholesale,
never concatenated.

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { deepMerge, isPlainObject, omit } from '@rtorcato/js-common/objects'
```

## Exports

| Name | Summary |
| --- | --- |
| `deepMerge` | Deeply merges two objects. |
| `isPlainObject` | Returns true if the value is a plain object (not null, not array, not function). |
| `omit` | Returns a shallow copy of an object with the given keys omitted. |
| `pick` | Returns a shallow copy of an object with only the given keys. |

<!-- /generated:exports -->

## See also

- [arrays](./arrays.md) — chunk, unique, groupBy and other array helpers
- [maps](./maps.md) — merge, invert and convert `Map`s
- [json](./json.md) — safe parse/stringify and JSON deep clone
