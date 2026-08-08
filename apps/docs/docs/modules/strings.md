---
title: Strings
description: String utilities — slugify, truncate, casing.
sidebar_position: 4
---

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
