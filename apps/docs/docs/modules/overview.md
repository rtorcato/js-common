---
title: Module overview
description: All subpath modules exported by @rtorcato/js-common.
sidebar_position: 1
---

Every module is exported under its own subpath so bundlers can tree-shake unused code. The **Runtime** column says where each one runs; every module page repeats it under its title.

| Category | Subpath | Runtime | Highlights |
| --- | --- | --- | --- |
| Dates | `@rtorcato/js-common/date` | any | `today`, `formatDate`, `daysBetween`, `isLeapYear` |
| Date-time | `@rtorcato/js-common/datetime` | any | `nowIso`, `formatDateTimeLocal`, `unixTimestamp` |
| Time | `@rtorcato/js-common/time` | any | `nowTime`, `parseTime`, `secondsBetween` |
| Numbers | `@rtorcato/js-common/numbers` | any | `sum`, `average`, `median`, `stdDev`, `percentile`, `clamp` |
| Random | `@rtorcato/js-common/random` | any | `randomInt`, `randomFloat`, `randomBool`, `randomString` |
| Strings | `@rtorcato/js-common/strings` | any | `slugify`, `truncate`, `titleCase`, `capitalize` |
| Arrays | `@rtorcato/js-common/arrays` | any | `unique`, `chunk`, `compact`, `shuffle`, `partition`, `sortBy`, `zip` |
| Objects | `@rtorcato/js-common/objects` | any | `deepMerge`, `pick`, `omit`, `isPlainObject` |
| JSON | `@rtorcato/js-common/json` | any | `safeJsonParse`, `safeJsonStringify` |
| Emails | `@rtorcato/js-common/emails` | any | `isValidEmail`, `normalizeEmail`, `maskEmail` |
| URL | `@rtorcato/js-common/url` | any | `isValidUrl` |
| UUID | `@rtorcato/js-common/uuid` | any | `getUUIDv7`, `getShortUUID`, `isUUID` |
| Security | `@rtorcato/js-common/security` | any | `isStrongPassword`, `stripScriptish` |
| Validation | `@rtorcato/js-common/validation` | any | `isString`, `isNumber`, `isArray`, `isObject` |
| Promises | `@rtorcato/js-common/promises` | any | `withTimeout`, `to` |
| Functions | `@rtorcato/js-common/functions` | any | `debounce`, `throttle`, `once` |
| Sleep | `@rtorcato/js-common/sleep` | any | `sleep` |

The full list of subpaths is in the package's [`exports`](https://github.com/rtorcato/js-common/blob/main/package.json) field. Which module owns a given helper — and why no name is exported from two of them — is recorded in [MODULE-BOUNDARIES.md](https://github.com/rtorcato/js-common/blob/main/MODULE-BOUNDARIES.md).

