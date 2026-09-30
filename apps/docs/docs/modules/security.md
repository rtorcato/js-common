---
title: Security
description: Utilities exported from @rtorcato/js-common/security.
---

**Runtime:** any — Node.js ≥ 22 or a modern browser

A small set of security-adjacent helpers: password-strength checks and coarse script stripping. For secure random tokens use `crypto.randomHex` (`generateSecureToken` lived here until 5.0) — the `Math.random` helpers in `random` are never an acceptable substitute. `stripScriptish` (called `sanitizeString` before 3.0) removes only `<script>` blocks and inline `on*` handlers, so treat it as defence in depth: escape untrusted values with `html.escapeHtml`, or run a real sanitizer such as DOMPurify when markup must survive. It was renamed precisely because the old name promised a guarantee it never delivered.

## Example

```ts
import { randomHex } from '@rtorcato/js-common/crypto'
import { isStrongPassword } from '@rtorcato/js-common/security'

isStrongPassword('hunter2')   // false — needs 8+ chars, upper, lower, digit, symbol
isStrongPassword('Hunter2!x') // true

// Password-reset link: crypto.getRandomValues, never Math.random.
const token = randomHex(32) // 64 hex characters
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { isStrongPassword, stripScriptish } from '@rtorcato/js-common/security'
```

## Exports

| Name | Summary |
| --- | --- |
| `isStrongPassword` | Checks if a password is strong (min 8 chars, upper, lower, number, special char). |
| `stripScriptish` | Removes `<script>` blocks and inline `on*=` event-handler attributes from a string. |

<!-- /generated:exports -->

## See also

- [emails](./emails.md) — validate, normalize and mask email addresses
- [url](./url.md) — parse, validate and edit URLs and query params
- [validation](./validation.md) — type guards — `isString`, `isNumber`, `isDefined`
- [crypto](./crypto.md) — hashing, HMAC, base64, random hex
