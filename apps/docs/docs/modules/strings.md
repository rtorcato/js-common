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
