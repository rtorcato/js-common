---
title: Strings
description: String utilities — slugify, truncate, casing.
sidebar_position: 4
---

Everyday string shaping — slugs, truncation, casing, emoji stripping. Every function returns a new string and leaves its input alone; `truncate` counts its ellipsis inside the requested length rather than adding to it. `slugify` strips diacritics and then keeps only `a-z0-9` and hyphens, which makes it URL-safe by construction but also means non-Latin scripts slug to an empty string — transliterate first if you need to support them.

```ts
import { slugify, truncate, capitalize, removeEmojis } from '@rtorcato/js-common/strings'

slugify('Hello World!')             // "hello-world"
truncate('Lorem ipsum dolor', 10)   // "Lorem ips…"
capitalize('hello world')           // "Hello world"
removeEmojis('hi 👋 there 🎉')      // "hi  there "
```

## See also

- [formatting](./formatting.md) — padding, thousands separators, percentages
- [regex](./regex.md) — escape patterns, match-all, split by regex
- [html](./html.md) — escape, unescape and strip HTML
- [validation](./validation.md) — type guards — `isString`, `isNumber`, `isUrl`
