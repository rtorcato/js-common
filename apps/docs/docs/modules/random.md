---
title: Random
description: Utilities exported from @rtorcato/js-common/random.
---

Random integers, floats, booleans, strings and array picks. All of it is `Math.random` — fast, seedless and not cryptographically secure — which makes it right for test fixtures, sampling, jitter and visuals, and wrong for tokens, session ids or anything an attacker would like to predict (use `crypto.randomHex` or `security.generateSecureToken`). Note the asymmetry: `randomInt` includes both bounds, `randomFloat` excludes its maximum.

## Example

```ts
import { randomElement, randomFloat, randomInt, randomString } from '@rtorcato/js-common/random'
import { sleep } from '@rtorcato/js-common/sleep'

// Test fixtures, sampling and jitter — never tokens or ids.
randomInt(1, 6)                 // 1–6, both bounds included
randomFloat(0, 1)               // 0 ≤ n < 1, maximum excluded
randomElement(['red', 'green']) // one of them, or undefined for an empty array
randomString(8)                 // e.g. 'a7Kd0Pq2'

await sleep(randomInt(100, 400)) // retry jitter
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { randomBool, randomElement, randomFloat } from '@rtorcato/js-common/random'
```

## Exports

| Name | Summary |
| --- | --- |
| `randomBool` | Returns a random boolean value. |
| `randomElement` | Returns a random element from an array. |
| `randomFloat` | Returns a random float between min (inclusive) and max (exclusive). |
| `randomInt` | Returns a random integer between min (inclusive) and max (inclusive). |
| `randomString` | Returns a random string of the given length using the given characters. |

<!-- /generated:exports -->

## See also

- [numbers](./numbers.md) — sum, average, clamp, roundTo
- [arrays](./arrays.md) — chunk, unique, groupBy and other array helpers
- [uuid](./uuid.md) — generate and validate UUIDs
- [crypto](./crypto.md) — hashing, HMAC, base64, random hex
