---
title: Crypto
description: Utilities exported from @rtorcato/js-common/crypto.
---

Hashing, HMAC, base64 and random hex on top of `node:crypto` — which makes this module Node-only; it will not run in a browser or on an edge runtime. These are one-way digests and encodings, not encryption and not password storage: `hashString` with SHA-256 is the wrong tool for passwords (use argon2 or bcrypt). `randomHex` comes from `randomBytes`, unlike the `Math.random`-based helpers in `random`.

```ts
import { base64Decode, base64Encode, hashString } from '@rtorcato/js-common/crypto'
```

## Exports

| Name | Summary |
| --- | --- |
| `base64Decode` | Decodes a base64 string. |
| `base64Encode` | Encodes a string to base64. |
| `hashString` | Hashes a string using the specified algorithm. |
| `hmacHash` | Creates an HMAC hash of a string using a secret and algorithm. |
| `randomHex` | Generates a random hex string of the specified length (in bytes). |

## See also

- [security](./security.md) — password strength, secure tokens, sanitizing
- [uuid](./uuid.md) — generate and validate UUIDs
- [random](./random.md) — random ints, floats, strings and array picks
