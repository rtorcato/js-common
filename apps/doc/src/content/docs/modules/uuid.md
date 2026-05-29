---
title: UUID
description: Generate and validate UUIDs.
sidebar:
  order: 5
---

```ts
import { generateUUID, isValidUUID } from '@rtorcato/js-common/uuid'

const id = generateUUID()
// "f47ac10b-58cc-4372-a567-0e02b2c3d479"

isValidUUID(id)        // true
isValidUUID('not-a-id') // false
```
