---
title: Crypto
description: Utilities exported from @rtorcato/js-common/crypto.
---

**Runtime:** any — Web Crypto (`globalThis.crypto`), in Node.js ≥ 22, modern browsers and edge runtimes

Hashing, HMAC, base64 and random hex on top of Web Crypto, so it runs anywhere. `hashString` and `hmacHash` are async because `crypto.subtle` is, and they support SHA-1/256/384/512 only — Web Crypto has no md5. These are one-way digests and encodings, not encryption and not password storage: `hashString` with SHA-256 is the wrong tool for passwords (use argon2 or bcrypt). `randomHex` comes from `crypto.getRandomValues` — use it for tokens, session ids and reset links (`randomHex(32)` for 64 hex chars), unlike the `Math.random`-based helpers in `random`.

## Example

```ts
import { hashString, hmacHash } from '@rtorcato/js-common/crypto'

// Verify an inbound webhook by recomputing the signature over the raw body.
const expected = await hmacHash(rawBody, process.env.WEBHOOK_SECRET)
if (expected !== signatureHeader) throw new Error('bad signature')

await hashString('user-42:prefs') // 64 hex chars — a stable cache key
```

For an attacker-supplied signature, compare with `node:crypto`'s `timingSafeEqual` rather than
`!==`, which leaks how many characters matched.

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { base64Decode, base64Encode, hashString } from '@rtorcato/js-common/crypto'
```

## Exports

| Name | Summary |
| --- | --- |
| `base64Decode` | Decodes a base64 string to a UTF-8 string. |
| `base64Encode` | Encodes a string (as UTF-8) to base64. |
| `hashString` | Hashes a string using the specified algorithm. |
| `hmacHash` | Creates an HMAC hash of a string using a secret and algorithm. |
| `randomHex` | Generates a cryptographically secure random hex string of the specified length (in bytes). |

<!-- /generated:exports -->

## See also

- [security](./security.md) — password strength, script stripping
- [uuid](./uuid.md) — generate and validate UUIDs
- [random](./random.md) — random ints, floats, strings and array picks
