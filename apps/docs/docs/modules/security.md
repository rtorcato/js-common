---
title: Security
description: Utilities exported from @rtorcato/js-common/security.
---

A small set of security-adjacent helpers: password-strength checks, cryptographically secure tokens from `node:crypto`, and coarse string sanitisation. `generateSecureToken` uses `randomBytes` — the `Math.random` helpers in `random` are never an acceptable substitute here. `sanitizeString` strips only `<script>` blocks and inline `on*` handlers with regexes, so treat it as defence in depth: escape untrusted values with `html.escapeHtml`, or run a real sanitizer such as DOMPurify when markup must survive.

## Example

```ts
import { generateSecureToken, isStrongPassword } from '@rtorcato/js-common/security'

isStrongPassword('hunter2')   // false — needs 8+ chars, upper, lower, digit, symbol
isStrongPassword('Hunter2!x') // true

// Password-reset link: randomBytes, never Math.random.
const token = generateSecureToken(32) // 64 hex characters
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { generateSecureToken, isStrongPassword, sanitizeString } from '@rtorcato/js-common/security'
```

## Exports

| Name | Summary |
| --- | --- |
| `generateSecureToken` | Generates a cryptographically secure random token (hex string). |
| `isStrongPassword` | Checks if a password is strong (min 8 chars, upper, lower, number, special char). |
| `sanitizeString` | Sanitizes a string by removing script tags and event handlers. |

<!-- /generated:exports -->

## See also

- [emails](./emails.md) — validate, normalize and mask email addresses
- [url](./url.md) — parse, validate and edit URLs and query params
- [validation](./validation.md) — type guards — `isString`, `isNumber`, `isUrl`
- [crypto](./crypto.md) — hashing, HMAC, base64, random hex
