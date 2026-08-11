---
title: Safely parse untrusted JSON
description: Parse JSON from a request body, a webhook, or localStorage without throwing — and without trusting the shape that comes back.
---

`JSON.parse` fails two ways on untrusted input: it throws on malformed text, and
it happily returns `{"id": "not-a-number"}` typed as whatever you asserted.
[`safeJsonParse`](../modules/json.md) handles the first;
[`validation`](../modules/validation.md) type guards handle the second.

## The code

```ts
import { safeJsonParse } from '@rtorcato/js-common/json'
import { isNumber, isObject, isString } from '@rtorcato/js-common/validation'

export type User = { id: number; email: string }

function isUser(value: unknown): value is User {
  if (!isObject(value)) return false
  const candidate = value as Record<string, unknown>
  return isNumber(candidate.id) && isString(candidate.email)
}

/**
 * Parses a JSON string into a `User`, or returns `null` if the text is not
 * valid JSON or does not have the expected shape.
 */
export function parseUser(raw: string): User | null {
  const parsed = safeJsonParse<unknown>(raw)
  return isUser(parsed) ? parsed : null
}
```

```ts
parseUser('{"id":1,"email":"a@b.com"}') // { id: 1, email: "a@b.com" }
parseUser('{"id":"1","email":"a@b.com"}') // null — id is a string
parseUser('{ not json') // null
parseUser('null') // null
```

`safeJsonParse` never throws: it returns the fallback (`null` by default) when
parsing fails. Pass your own fallback when a default value beats a null check:

```ts
const settings = safeJsonParse(localStorage.getItem('settings') ?? '', {
  theme: 'system',
})
```

## Telling "invalid" from "the value was null"

`safeJsonParse('null')` returns `null` — the parse succeeded and the value *is*
null. If that distinction matters, check validity first:

```ts
import { isValidJson, safeJsonParse } from '@rtorcato/js-common/json'

if (!isValidJson(raw)) {
  throw new Error('Malformed JSON body')
}
const value = safeJsonParse<unknown>(raw)
```

`isValidJson` parses the string a second time, so use it where correctness
matters more than the extra pass, not in a hot loop.

## Reject oversized payloads first

A 50 MB body will block the event loop inside `JSON.parse` before any of your
validation runs. Cap the size at the edge:

```ts
const MAX_BODY_BYTES = 1024 * 100 // 100 KB

export function parseBody(raw: string): User | null {
  if (raw.length > MAX_BODY_BYTES) return null
  return parseUser(raw)
}
```

## Watch what you do with the parsed object

`JSON.parse` itself is safe — a `"__proto__"` key becomes an own property, not a
prototype change. The risk arrives when you *merge* that object into something
trusted. Copy the fields you expect rather than spreading an untrusted object
into config or defaults:

```ts
// ✅ only the fields you asked for
const user: User = { id: parsed.id, email: parsed.email }

// ❌ carries along whatever the sender added
const user = { ...defaults, ...parsed }
```

## When the shape grows

Hand-written guards stay readable for two or three fields. Past that, use a
schema library — [zod](https://zod.dev/) is already a dependency of this
package, so it costs you nothing extra:

```ts
import { z } from 'zod'

const UserSchema = z.object({ id: z.number(), email: z.email() })

export function parseUser(raw: string): User | null {
  const result = UserSchema.safeParse(safeJsonParse<unknown>(raw))
  return result.success ? result.data : null
}
```

## See also

- [json](../modules/json.md) — safe parse/stringify and JSON deep clone
- [validation](../modules/validation.md) — type guards — `isString`, `isNumber`, `isObject`
- [try](../modules/try.md) — `Result` values instead of thrown exceptions
- [security](../modules/security.md) — string sanitizing, secure tokens, password strength
