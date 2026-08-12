---
title: Strings
description: String utilities — slugify, truncate, casing.
sidebar_position: 4
---

Everyday string shaping — slugs, truncation, casing, padding, pluralisation. Every function returns a new string and leaves its input alone; `truncate` counts its ellipsis inside the requested length rather than adding to it. `slugify` strips diacritics and then keeps only `a-z0-9` and hyphens, which makes it URL-safe by construction but also means non-Latin scripts slug to an empty string — transliterate first if you need to support them.

```ts
import { slugify, truncate, capitalize, titleCase } from '@rtorcato/js-common/strings'

slugify('Hello World!')             // "hello-world"
truncate('Lorem ipsum dolor', 10)   // "Lorem ips…"
capitalize('hello world')           // "Hello world"
titleCase('hello world')            // "Hello World"
```

## See also

- [i18n](./i18n.md) — locale-aware number/date formatting and translation
- [regex](./regex.md) — escape patterns, match-all, split by regex
- [html](./html.md) — escape, unescape and strip HTML
- [validation](./validation.md) — type guards — `isString`, `isNumber`, `isUrl`
