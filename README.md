# js-common

[![npm version](https://badge.fury.io/js/%40rtorcato%2Fjs-common.svg)](https://badge.fury.io/js/%40rtorcato%2Fjs-common)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/badge/Bundle%20Size-277%20bytes-green.svg)](https://bundlejs.com/?q=@rtorcato/js-common)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

A comprehensive set of common JavaScript and TypeScript utilities for Node.js projects.

## ✨ Features

- 🚀 **Ultra-lightweight** - Only 277 bytes main bundle
- 📦 **Tree-shakeable** - Import only what you need
- 🔧 **TypeScript** - Full type safety and IntelliSense
- 🖥️ **CLI included** - Use utilities from command line
- 📚 **Modular** - Import individual modules
- ⚡ **Zero dependencies** - Core library has no external deps
- 🧪 **Well tested** - Comprehensive test coverage

## Installation

```bash
npm install @rtorcato/js-common
```

## CLI Usage

This package includes a command-line interface for many utilities:

```bash
# Install globally to use the CLI
npm install -g @rtorcato/js-common

# Or use with npx
npx @rtorcato/js-common --help

# Examples
npx @rtorcato/js-common date today
npx @rtorcato/js-common math sum 1 2 3 4 5
npx @rtorcato/js-common text capitalize "hello world"
npx @rtorcato/js-common security token
```

See [CLI.md](./CLI.md) for complete CLI documentation.

## Library Usage

```typescript
// 🎯 Import specific modules (recommended for tree-shaking)
import { formatDate, today, daysBetween } from '@rtorcato/js-common/date'
import { validateEmail, isValidEmail } from '@rtorcato/js-common/emails'
import { generateUUID, isValidUUID } from '@rtorcato/js-common/uuid'
import { sum, average, roundTo } from '@rtorcato/js-common/numbers'
import { capitalize, toTitleCase } from '@rtorcato/js-common/formatting'

// 📦 Or import everything (larger bundle)
import * as jsCommon from '@rtorcato/js-common'

// Example usage
console.log(today()) // "2025-10-24"
console.log(sum([1, 2, 3, 4, 5])) // 15
console.log(capitalize('hello world')) // "Hello world"
console.log(generateUUID()) // "f47ac10b-58cc-4372-a567-0e02b2c3d479"
```

### Bundle Size Impact

The main library bundle is only **277 bytes**! Individual module imports are even smaller:

```typescript
// This adds ~50 bytes to your bundle
import { today } from '@rtorcato/js-common/date'

// This adds ~100 bytes to your bundle  
import { sum, average } from '@rtorcato/js-common/numbers'
```

### 🎯 **TypeScript Support**

This package is built with TypeScript and includes complete type definitions out of the box:

- ✅ **Full type safety** - All functions have accurate TypeScript types
- ✅ **Generic support** - Functions like `unique<T>()` preserve your data types  
- ✅ **JSDoc integration** - Rich documentation in your IDE
- ✅ **Tree-shakable** - Import only what you need with perfect type inference

```typescript
// TypeScript automatically infers types
const numbers = [1, 2, 3, 4, 5]
const result: number = sum(numbers)  // ✅ Type: number

const users = [{ name: 'John' }, { name: 'Jane' }]
const uniqueUsers = unique(users)    // ✅ Type: { name: string }[]

// IDE shows full documentation and type hints
import { today } from '@rtorcato/js-common/date'
//      ^ JSDoc: Returns today's date as YYYY-MM-DD string
```

## Available Modules

### 📅 **Date & Time**
```typescript
import { today, formatDate, daysBetween, isLeapYear } from '@rtorcato/js-common/date'
import { nowIso, formatDateTimeLocal, unixTimestamp } from '@rtorcato/js-common/datetime'
import { nowTime, parseTime, secondsBetween } from '@rtorcato/js-common/time'
```

### 🔢 **Numbers & Math**
```typescript
import { sum, average, roundTo, clamp, getRandomInt } from '@rtorcato/js-common/numbers'
import { add, subtract, multiply, divide } from '@rtorcato/js-common/math'
```

### 📝 **Text & Strings**
```typescript
import { capitalize, toTitleCase, padZero } from '@rtorcato/js-common/formatting'
import { slugify, truncate, removeEmojis } from '@rtorcato/js-common/strings'
```

### 🔐 **Security & Validation**
```typescript
import { isStrongPassword, generateSecureToken } from '@rtorcato/js-common/security'
import { isValidEmail, validateEmail } from '@rtorcato/js-common/emails'
import { isValidUrl } from '@rtorcato/js-common/url'
import { isString, isNumber, isArray, isObject } from '@rtorcato/js-common/validation'
```

### 🗂️ **Data Structures**
```typescript
import { flatten, unique, chunk, groupBy } from '@rtorcato/js-common/arrays'
import { deepMerge, pick, omit, deepClone } from '@rtorcato/js-common/objects'
import { safeJsonParse, safeJsonStringify } from '@rtorcato/js-common/json'
```

### 🔄 **Async & Control Flow**
```typescript
import { delay, timeout, retry } from '@rtorcato/js-common/promises'
import { debounce, throttle, once } from '@rtorcato/js-common/functions'
import { sleep } from '@rtorcato/js-common/sleep'
```

### 🌈 **And More...**
- **Colors** - Color manipulation and conversion
- **Console** - Enhanced console utilities  
- **Crypto** - Cryptographic functions
- **Currency** - Currency formatting and conversion
- **Events** - Event handling utilities
- **Fetch** - HTTP request utilities
- **File** - File system utilities
- **UUID** - UUID generation and validation
- **Process** - Process and environment utilities
- **Geometry** - 2D geometry calculations

## Requirements

- **Node.js** >= 18.0.0
- **TypeScript** >= 5.0.0 (for TypeScript projects)

## Why This Library?

### 🎯 **Focused & Lightweight**
Unlike larger utility libraries, js-common is designed for modern applications:
- **Tiny bundle size** - Won't bloat your application
- **Tree-shakeable** - Only import what you use
- **CLI included** - Use utilities in scripts and terminal

### 📦 **Bundle Size Comparison**
```
lodash: ~70KB (full) / ~25KB (common functions)
ramda: ~60KB (full) / ~15KB (common functions)
js-common: 277 bytes (full) / ~50-200 bytes (individual modules)
```

### 🛠️ **Modern Development**
- Built with **TypeScript** for excellent DX
- **ESM-first** with CommonJS compatibility
- **Zero dependencies** in core library
- Comprehensive **test coverage**

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Build the project
pnpm run build-prod

# Build development version
pnpm run build-dev

# Lint and format
pnpm run check:fix

# Type checking
pnpm run typecheck
```

## Contributing

Contributions are welcome! Please read [CONTRIBUTORS.md](./CONTRIBUTORS.md) for guidelines.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes with tests
4. Run the test suite: `pnpm test`
5. Submit a pull request

## License

MIT © [Richard Torcato](https://github.com/rtorcato)


