---
title: Quick start
description: Import a module and call a utility in under a minute.
sidebar_position: 2
---

Import named functions from a subpath export to keep your bundle tiny.

```ts
import { today, daysBetween } from '@rtorcato/js-common/date'
import { sum, average } from '@rtorcato/js-common/numbers'
import { capitalize } from '@rtorcato/js-common/strings'
import { generateUUID } from '@rtorcato/js-common/uuid'

today() // "2026-05-28"
sum([1, 2, 3, 4, 5]) // 15
average([10, 20, 30]) // 20
capitalize('hello world') // "Hello world"
generateUUID() // "f47ac10b-58cc-4372-a567-0e02b2c3d479"
```

## Tree-shaking

Always prefer subpath imports over the root entry point:

```ts
// ✅ Adds ~50–200 bytes
import { today } from '@rtorcato/js-common/date'

// ⚠️ Pulls in the full module graph
import * as jsCommon from '@rtorcato/js-common'
```
