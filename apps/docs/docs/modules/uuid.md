---
title: UUID
description: Generate and validate UUIDs.
sidebar_position: 5
---

UUID generation, validation and conversion, wrapping the `uuid` and `short-uuid` packages rather than hand-rolling either. Generation draws from a CSPRNG and validation is version-aware, so a plausible-looking but malformed id is rejected instead of slipping through a loose regex. v7 is here for time-ordered ids that index well as database primary keys, and the short forms are the same value in a shorter alphabet, not a different id. For a plain v4 call the `crypto.randomUUID()` global — the `getUUID` wrapper over it was removed in 4.0.

```ts
import { getUUIDv7, isUUID } from '@rtorcato/js-common/uuid'

const id = getUUIDv7()
// "018e5e2c-7c0a-7000-8000-0e02b2c3d479"

isUUID(id)              // true
isUUID('not-a-id')      // false
isUUID(crypto.randomUUID()) // true — plain v4 comes from the platform
```

## See also

- [crypto](./crypto.md) — hashing, HMAC, base64, random hex
- [random](./random.md) — random ints, floats, strings and array picks
- [security](./security.md) — password strength, secure tokens, sanitizing
