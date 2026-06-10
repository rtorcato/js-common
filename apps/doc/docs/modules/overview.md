---
title: Module overview
description: All subpath modules exported by @rtorcato/js-common.
sidebar_position: 1
---

Every module is exported under its own subpath so bundlers can tree-shake unused code:

| Category | Subpath | Highlights |
| --- | --- | --- |
| Dates | `@rtorcato/js-common/date` | `today`, `formatDate`, `daysBetween`, `isLeapYear` |
| Date-time | `@rtorcato/js-common/datetime` | `nowIso`, `formatDateTimeLocal`, `unixTimestamp` |
| Time | `@rtorcato/js-common/time` | `nowTime`, `parseTime`, `secondsBetween` |
| Numbers | `@rtorcato/js-common/numbers` | `sum`, `average`, `roundTo`, `clamp`, `getRandomInt` |
| Math | `@rtorcato/js-common/math` | `add`, `subtract`, `multiply`, `divide` |
| Strings | `@rtorcato/js-common/strings` | `slugify`, `truncate`, `removeEmojis`, `capitalize` |
| Arrays | `@rtorcato/js-common/arrays` | `flatten`, `unique`, `chunk`, `groupBy` |
| Objects | `@rtorcato/js-common/objects` | `deepMerge`, `pick`, `omit`, `deepClone` |
| JSON | `@rtorcato/js-common/json` | `safeJsonParse`, `safeJsonStringify` |
| Emails | `@rtorcato/js-common/emails` | `validateEmail`, `isValidEmail` |
| URL | `@rtorcato/js-common/url` | `isValidUrl` |
| UUID | `@rtorcato/js-common/uuid` | `generateUUID`, `isValidUUID` |
| Security | `@rtorcato/js-common/security` | `isStrongPassword`, `generateSecureToken` |
| Validation | `@rtorcato/js-common/validation` | `isString`, `isNumber`, `isArray`, `isObject` |
| Promises | `@rtorcato/js-common/promises` | `delay`, `timeout`, `retry` |
| Functions | `@rtorcato/js-common/functions` | `debounce`, `throttle`, `once` |
| Sleep | `@rtorcato/js-common/sleep` | `sleep` |

The full list of subpaths is in the package's [`exports`](https://github.com/rtorcato/js-common/blob/main/package.json) field.
