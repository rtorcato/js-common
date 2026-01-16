# JavaScript Utilities Skills for GitHub Copilot

This document provides context and patterns for GitHub Copilot to better understand and suggest code for the `@rtorcato/js-common` utility library.

## Library Overview

`@rtorcato/js-common` is a comprehensive TypeScript utility library providing 30+ modules for common JavaScript operations. All functions are tree-shakeable, type-safe, and follow functional programming patterns.

## Core Patterns

### Array Utilities
```typescript
import { unique, chunk, flatten, groupBy } from '@rtorcato/js-common/arrays'

// Remove duplicates with type safety
const numbers = unique([1, 2, 2, 3]) // number[]
const strings = unique(['a', 'b', 'a']) // string[]

// Group arrays by key
const users = [{ id: 1, role: 'admin' }, { id: 2, role: 'user' }]
const grouped = groupBy(users, 'role') // { admin: [user], user: [user] }

// Chunk arrays into smaller pieces
const chunked = chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
```

### String Utilities
```typescript
import { capitalize, kebabCase, camelCase, truncate } from '@rtorcato/js-common/strings'

// Case transformations
const title = capitalize('hello world') // 'Hello World'
const kebab = kebabCase('Hello World') // 'hello-world'
const camel = camelCase('hello-world') // 'helloWorld'

// Text manipulation
const short = truncate('Long text here', 10) // 'Long te...'
```

### Validation Utilities
```typescript
import { isEmail, isUrl, isUuid, isEmpty } from '@rtorcato/js-common/validation'

// Type-safe validation
const email = isEmail('user@example.com') // boolean
const url = isUrl('https://example.com') // boolean
const uuid = isUuid('550e8400-e29b-41d4-a716-446655440000') // boolean
```

### Crypto Utilities
```typescript
import { hash, randomString, encrypt, decrypt } from '@rtorcato/js-common/crypto'

// Secure hashing and random generation
const hashed = await hash('password', 'sha256')
const token = randomString(32) // Random string of 32 characters
```

### Date/Time Utilities
```typescript
import { formatDate, parseDate, addDays, diffDays } from '@rtorcato/js-common/date'

// Date manipulation
const formatted = formatDate(new Date(), 'YYYY-MM-DD')
const future = addDays(new Date(), 7) // 7 days from now
const diff = diffDays(date1, date2) // Difference in days
```

## Common Usage Patterns

### Error Handling with Try Utilities
```typescript
import { attempt, trycatch } from '@rtorcato/js-common/try'

// Safe function execution
const result = await attempt(async () => {
  return await riskyOperation()
})
if (result.success) {
  console.log(result.data)
} else {
  console.error(result.error)
}

// Traditional try-catch wrapper
const [error, data] = await trycatch(riskyOperation())
```

### Environment Configuration
```typescript
import { getEnv, requireEnv } from '@rtorcato/js-common/env'

// Environment variables with defaults
const port = getEnv('PORT', '3000') // string
const apiKey = requireEnv('API_KEY') // throws if missing
```

### Number Utilities
```typescript
import { clamp, round, random, formatCurrency } from '@rtorcato/js-common/numbers'

// Math operations
const clamped = clamp(150, 0, 100) // 100
const rounded = round(3.14159, 2) // 3.14
const randomNum = random(1, 10) // Random number between 1 and 10
```

### Object Utilities
```typescript
import { pick, omit, deepMerge, deepClone } from '@rtorcato/js-common/objects'

// Object manipulation
const picked = pick(user, ['name', 'email'])
const without = omit(user, ['password'])
const merged = deepMerge(obj1, obj2)
const cloned = deepClone(complexObject)
```

## Copilot Suggestions

When suggesting code using this library:

1. **Always import specific functions** rather than the entire module
2. **Preserve TypeScript generics** for type safety
3. **Use descriptive variable names** that match the function purpose
4. **Chain utilities** when appropriate for functional composition
5. **Include error handling** for async operations using `try` utilities
6. **Suggest validation** before processing user input
7. **Recommend crypto utilities** for security-sensitive operations

## Integration Examples

### API Endpoint with Validation
```typescript
import { isEmail, isEmpty } from '@rtorcato/js-common/validation'
import { hash } from '@rtorcato/js-common/crypto'
import { attempt } from '@rtorcato/js-common/try'

async function createUser(data: CreateUserRequest) {
  // Validate input
  if (isEmpty(data.email) || !isEmail(data.email)) {
    throw new Error('Invalid email')
  }
  
  // Hash password securely
  const hashedPassword = await hash(data.password, 'sha256')
  
  // Safe database operation
  const result = await attempt(async () => {
    return await database.users.create({
      ...data,
      password: hashedPassword
    })
  })
  
  return result
}
```

### Data Processing Pipeline
```typescript
import { chunk, flatten } from '@rtorcato/js-common/arrays'
import { formatCurrency } from '@rtorcato/js-common/numbers'
import { formatDate } from '@rtorcato/js-common/date'

function processOrderData(orders: Order[]) {
  return orders
    .map(order => ({
      ...order,
      total: formatCurrency(order.amount),
      date: formatDate(order.createdAt, 'YYYY-MM-DD')
    }))
    .pipe(orders => chunk(orders, 50)) // Process in batches
    .pipe(flatten) // Flatten back to single array
}
```

This context helps GitHub Copilot understand the library's patterns and suggest appropriate utilities for common JavaScript/TypeScript development tasks.