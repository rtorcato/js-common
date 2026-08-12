# JavaScript Utilities Skills for GitHub Copilot

This document provides context and patterns for GitHub Copilot to better understand and suggest code for the `@rtorcato/js-common` utility library.

## Library Overview

`@rtorcato/js-common` is a comprehensive TypeScript utility library providing 40+ modules for common JavaScript operations. All functions are tree-shakeable, type-safe, and follow functional programming patterns.

Every helper is imported from its module subpath — `@rtorcato/js-common/arrays`, not the package root. Each name has exactly one home (see `MODULE-BOUNDARIES.md`), so the subpath tells you where a helper lives.

## Core Patterns

### Array Utilities
```typescript
import { chunk, flatten, groupBy, unique } from '@rtorcato/js-common/arrays'

// Remove duplicates with type safety
const numbers = unique([1, 2, 2, 3]) // number[]
const strings = unique(['a', 'b', 'a']) // string[]

// Group arrays by a computed key — the second argument is a function
const users = [{ id: 1, role: 'admin' }, { id: 2, role: 'user' }]
const grouped = groupBy(users, (user) => user.role) // { admin: [...], user: [...] }

// Chunk arrays into smaller pieces
const chunked = chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]

// Flatten one level
const flat = flatten([[1, 2], [3, 4]]) // [1, 2, 3, 4]
```

### String Utilities
```typescript
import { camelCase, capitalize, isBlank, kebabCase, titleCase, truncate } from '@rtorcato/js-common/strings'

// Case transformations
const upperFirst = capitalize('hello world') // 'Hello world' — first character only
const title = titleCase('hello world') // 'Hello World'
const kebab = kebabCase('Hello World') // 'hello-world'
const camel = camelCase('hello-world') // 'helloWorld'

// Text manipulation
const short = truncate('Long text here', 10) // 'Long te...'

// Blank check — empty or whitespace-only
const blank = isBlank('   ') // true
```

### Validation Utilities
```typescript
import { isDefined, isEmail, isString, isUrl } from '@rtorcato/js-common/validation'

// Type-safe validation
const email = isEmail('user@example.com') // boolean
const url = isUrl('https://example.com') // boolean
const defined = isDefined(value) // narrows away null | undefined
```

UUIDs live in their own module:

```typescript
import { isUUID } from '@rtorcato/js-common/uuid'

const uuid = isUUID('550e8400-e29b-41d4-a716-446655440000') // boolean
```

### Crypto Utilities
```typescript
import { base64Encode, hashString, hmacHash, randomHex } from '@rtorcato/js-common/crypto'

// Hashing — synchronous, returns a hex digest
const hashed = hashString('password', 'sha256')
const signature = hmacHash('payload', process.env.SECRET)

// Random bytes as hex
const token = randomHex(32)
const encoded = base64Encode('hello')
```

For random strings from a chosen alphabet, use the `random` module instead:

```typescript
import { randomString } from '@rtorcato/js-common/random'

const id = randomString(32) // Random string of 32 characters
```

### Date/Time Utilities
```typescript
import { addDays, daysBetween, formatDate, parseDate } from '@rtorcato/js-common/date'

// Date manipulation
const formatted = formatDate(new Date()) // 'YYYY-MM-DD'
const parsed = parseDate('2023-05-26') // Date
const future = addDays(new Date(), 7) // 7 days from now
const diff = daysBetween(date1, date2) // Difference in days
```

## Common Usage Patterns

### Error Handling with Try Utilities
```typescript
import { isSuccess, tryCatch } from '@rtorcato/js-common/try'

// Safe async execution — returns a Go-style { data, error } Result
const result = await tryCatch(async () => {
  return await riskyOperation()
})
if (isSuccess(result)) {
  console.log(result.data)
} else {
  console.error(result.error)
}

// Destructuring reads well when you only need one branch
const { data, error } = await tryCatch(() => fetch('/api/user').then((r) => r.json()))
if (error) return console.error(error)
```

### Environment Configuration
```typescript
import { checkEnv, getENV } from '@rtorcato/js-common/env'

// Single variables — a default makes it optional, no default makes it required
const port = getENV('PORT', '3000') // string, falls back to '3000'
const apiKey = getENV('API_KEY') // throws if undefined

// Whole-environment validation against a Zod schema, throwing with every
// missing key listed at once
const env = checkEnv(schema, process.env)
```

### Number Utilities
```typescript
import { between, clamp, roundTo, sum } from '@rtorcato/js-common/numbers'

// Math operations
const clamped = clamp(150, 0, 100) // 100
const rounded = roundTo(3.14159, 2) // 3.14 — second argument is the decimal places, default 2
const inRange = between(5, 1, 10) // true
const total = sum([1, 2, 3]) // 6
```

Currency formatting lives in the `currency` module:

```typescript
import { formatPrice } from '@rtorcato/js-common/currency'

const price = formatPrice(1234.56, 'USD') // '$1,234.56'
```

### Object Utilities
```typescript
import { deepClone, deepMerge, omit, pick } from '@rtorcato/js-common/objects'

// Object manipulation
const picked = pick(user, ['name', 'email'])
const without = omit(user, ['password'])
const merged = deepMerge(obj1, obj2)
const cloned = deepClone(complexObject)
```

## Copilot Suggestions

When suggesting code using this library:

1. **Import from the module subpath**, never the package root — the root entry is intentionally empty
2. **Import specific functions** rather than the entire module
3. **Preserve TypeScript generics** for type safety
4. **Use descriptive variable names** that match the function purpose
5. **Chain utilities** when appropriate for functional composition
6. **Include error handling** for async operations using `try` utilities
7. **Suggest validation** before processing user input
8. **Recommend crypto utilities** for security-sensitive operations

## Integration Examples

### API Endpoint with Validation
```typescript
import { hashString } from '@rtorcato/js-common/crypto'
import { isBlank } from '@rtorcato/js-common/strings'
import { tryCatch } from '@rtorcato/js-common/try'
import { isEmail } from '@rtorcato/js-common/validation'

async function createUser(data: CreateUserRequest) {
  // Validate input
  if (isBlank(data.email) || !isEmail(data.email)) {
    throw new Error('Invalid email')
  }

  // Hash password
  const hashedPassword = hashString(data.password, 'sha256')

  // Safe database operation
  const { data: user, error } = await tryCatch(async () => {
    return await database.users.create({
      ...data,
      password: hashedPassword
    })
  })

  if (error) throw error
  return user
}
```

### Data Processing Pipeline
```typescript
import { chunk } from '@rtorcato/js-common/arrays'
import { formatPrice } from '@rtorcato/js-common/currency'
import { formatDate } from '@rtorcato/js-common/date'

function processOrderData(orders: Order[]) {
  const formatted = orders.map((order) => ({
    ...order,
    total: formatPrice(order.amount, 'USD'),
    date: formatDate(order.createdAt)
  }))

  return chunk(formatted, 50) // Process in batches
}
```

This context helps GitHub Copilot understand the library's patterns and suggest appropriate utilities for common JavaScript/TypeScript development tasks.
