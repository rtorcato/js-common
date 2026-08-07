---
title: Emails
description: Utilities exported from @rtorcato/js-common/emails.
---

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
