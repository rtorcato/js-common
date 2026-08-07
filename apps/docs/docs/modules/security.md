---
title: Security
description: Utilities exported from @rtorcato/js-common/security.
---

```ts
import { generateSecureToken, isStrongPassword, sanitizeString } from '@rtorcato/js-common/security'
```

## Exports

| Name | Summary |
| --- | --- |
| `generateSecureToken` | Generates a cryptographically secure random token (hex string). |
| `isStrongPassword` | Checks if a password is strong (min 8 chars, upper, lower, number, special char). |
| `sanitizeString` | Sanitizes a string by removing script tags and event handlers. |
