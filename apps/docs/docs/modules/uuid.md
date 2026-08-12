---
title: UUID
description: Generate and validate UUIDs.
sidebar_position: 5
---

UUID generation, validation and conversion, wrapping the `uuid` and `short-uuid` packages rather than hand-rolling either. Generation draws from a CSPRNG and validation is version-aware, so a plausible-looking but malformed id is rejected instead of slipping through a loose regex. v4 is the default when you want no embedded information; v7 is there when you want time-ordered ids that index well as database primary keys, and the short forms are the same value in a shorter alphabet, not a different id.

```ts
import { getUUID, isUUID } from '@rtorcato/js-common/uuid'

const id = getUUID()
// "f47ac10b-58cc-4372-a567-0e02b2c3d479"

isUUID(id)         // true
isUUID('not-a-id') // false
```

## See also

- [crypto](./crypto.md) — hashing, HMAC, base64, random hex
- [random](./random.md) — random ints, floats, strings and array picks
- [security](./security.md) — password strength, secure tokens, sanitizing
