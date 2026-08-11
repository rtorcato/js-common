---
title: Validation
description: Utilities exported from @rtorcato/js-common/validation.
---

Runtime type guards for values arriving from outside the program — JSON bodies, query params, config files. Each one returns a TypeScript type predicate, so a check narrows the type at the call site instead of merely returning `true`; `isNumber` also rejects `NaN`, which `typeof` will happily call a number. This is a guard set, not a schema validator — for object shapes, coercion and useful error messages, reach for Zod, as the `env` module does.

## Example

```ts
import { isDefined, isNumber, isString } from '@rtorcato/js-common/validation'

// A request body is `unknown` until something narrows it.
if (!isString(body.name) || !isNumber(body.age)) {
  return reply.status(400).send('name and age required')
}
body.name.trim() // string — narrowed by the guard above

const ids = [1, undefined, 2].filter(isDefined) // number[], not (number | undefined)[]
```

`isNumber` rejects `NaN`, which `typeof` happily calls a number.

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { isArray, isBoolean, isDefined } from '@rtorcato/js-common/validation'
```

## Exports

| Name | Summary |
| --- | --- |
| `isArray` | Checks if a value is an array. |
| `isBoolean` | Checks if a value is a boolean. |
| `isDefined` | Checks if a value is defined (not null or undefined). |
| `isEmail` | Checks if a string is a valid email address (simple regex). |
| `isNumber` | Checks if a value is a number (and not NaN). |
| `isObject` | Checks if a value is an object (but not null or array). |
| `isString` | Check if a value is a string. |
| `isUrl` | Checks if a string is a valid URL. |

<!-- /generated:exports -->

## See also

- [boolean](./boolean.md) — logical operators and boolean coercion
- [emails](./emails.md) — validate, normalize and mask email addresses
- [url](./url.md) — parse, validate and edit URLs and query params
- [strings](./strings.md) — slugify, truncate, casing, emoji stripping
