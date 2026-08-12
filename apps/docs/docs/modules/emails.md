---
title: Emails
description: Utilities exported from @rtorcato/js-common/emails.
---

Everyday address handling — validate, normalize, mask for display, extract the domain, flag free providers. Validation is a deliberately simple regex rather than RFC 5322: it catches typos and obvious junk, and the only real proof an address exists is delivering mail to it. `normalizeEmail` only trims and lowercases — it does not strip Gmail dots or `+` tags, because those rules are provider-specific and throw away information the user may have meant.

## Example

```ts
import {
  getEmailDomain,
  isFreeEmailProvider,
  maskEmail,
  normalizeEmail,
} from '@rtorcato/js-common/emails'

// Sign-up: store one canonical form, show a masked one, flag consumer domains.
const email = normalizeEmail('  Ada.Lovelace@Gmail.com ') // 'ada.lovelace@gmail.com'

maskEmail(email)            // 'a***********@gmail.com'
getEmailDomain(email)       // 'gmail.com'
isFreeEmailProvider(email)  // true — not a work address
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { getEmailDomain, isFreeEmailProvider, isValidEmail } from '@rtorcato/js-common/emails'
```

## Exports

| Name | Summary |
| --- | --- |
| `getEmailDomain` | Extracts the domain from an email address. |
| `isFreeEmailProvider` | Checks if an email address is from a free provider (e.g., gmail, yahoo, outlook). |
| `isValidEmail` | Validates if a string is a valid email address (simple regex). |
| `maskEmail` | Masks an email address for privacy (e.g., j***@domain.com). |
| `normalizeEmail` | Normalizes an email address by trimming and converting to lowercase. |

<!-- /generated:exports -->

## See also

- [validation](./validation.md) — type guards — `isString`, `isNumber`, `isUrl`
- [security](./security.md) — password strength, secure tokens, sanitizing
- [url](./url.md) — parse, validate and edit URLs and query params
- [strings](./strings.md) — slugify, truncate, casing, emoji stripping
