# UUID Module

A comprehensive UUID utilities module wrapping the `uuid` and `short-uuid` libraries with convenient helper functions.

## Features

- 🎲 **UUID v4 Generation** - Cryptographically secure random UUIDs
- ⏱️ **UUID v7 Generation** - Time-ordered UUIDs (ideal for databases)
- 🔗 **Short UUIDs** - Compact URL-friendly identifiers
- 🔄 **Bidirectional Conversion** - Convert between standard and short UUIDs
- ✅ **Validation** - Check if strings are valid UUIDs
- 🔢 **Version Detection** - Get UUID version number
- 📦 **Zero Config** - Works out of the box

## Installation

```typescript
import {
  getUUID,
  getUUIDv7,
  getShortUUID,
  toShortUUID,
  fromShortUUID,
  isUUID,
  isUUIDv4,
  isNilUUID,
  getUUIDVersion,
  getNilUUID,
  uuidToBytes,
  bytesToUUID,
} from '@rtorcato/js-common/uuid'
```

## API Reference

### `getUUID(): string`

Generates a cryptographically secure UUID v4 string.

```typescript
getUUID() // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
getUUID() // '550e8400-e29b-41d4-a716-446655440000'
```

### `getUUIDv7(): string`

Generates a time-ordered UUID v7 string. These embed a Unix timestamp, making them **sortable** and ideal for database primary keys.

```typescript
getUUIDv7() // '018e5e2c-7c0a-7000-8000-0e02b2c3d479'
getUUIDv7() // '018e5e2c-7c0b-7001-8001-1f13c4d5e680'

// UUIDs generated later will sort after earlier ones
const id1 = getUUIDv7()
const id2 = getUUIDv7()
id2 > id1 // true
```

### `getShortUUID(): string`

Generates a short, URL-friendly UUID using base57 encoding.

```typescript
getShortUUID() // 'mhvXdrZT4jP5T8vBxuvm75'
getShortUUID() // 'wpsB5YJtRv5nC9T5GFH7Yf'
```

### `toShortUUID(uuid: string): string`

Converts a standard UUID to a short UUID.

```typescript
toShortUUID('f47ac10b-58cc-4372-a567-0e02b2c3d479') // 'mhvXdrZT4jP5T8vBxuvm75'
```

### `fromShortUUID(short: string): string`

Converts a short UUID back to a standard UUID.

```typescript
fromShortUUID('mhvXdrZT4jP5T8vBxuvm75') // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
```

### `isUUID(id: string): boolean`

Validates if a string is a valid UUID (any version).

```typescript
isUUID('f47ac10b-58cc-4372-a567-0e02b2c3d479') // true
isUUID('not-a-uuid')                            // false
isUUID('00000000-0000-0000-0000-000000000000')  // true (nil UUID)
```

### `isUUIDv4(id: string): boolean`

Validates if a string is specifically a valid UUID v4.

```typescript
isUUIDv4('f47ac10b-58cc-4372-a567-0e02b2c3d479') // true
isUUIDv4('018e5e2c-7c0a-7000-8000-0e02b2c3d479') // false (v7)
isUUIDv4('00000000-0000-0000-0000-000000000000') // false (nil)
```

### `isNilUUID(id: string): boolean`

Checks if a UUID is the nil UUID (all zeros).

```typescript
isNilUUID('00000000-0000-0000-0000-000000000000') // true
isNilUUID('f47ac10b-58cc-4372-a567-0e02b2c3d479') // false
```

### `getUUIDVersion(id: string): number`

Gets the version number of a UUID. Throws if invalid.

```typescript
getUUIDVersion('f47ac10b-58cc-4372-a567-0e02b2c3d479') // 4
getUUIDVersion('018e5e2c-7c0a-7000-8000-0e02b2c3d479') // 7
getUUIDVersion('00000000-0000-0000-0000-000000000000') // 0 (nil)
getUUIDVersion('invalid') // throws Error
```

### `getNilUUID(): string`

Returns the nil UUID (all zeros). Useful as a placeholder or default value.

```typescript
getNilUUID() // '00000000-0000-0000-0000-000000000000'
```

### `uuidToBytes(id: string): Uint8Array`

Converts a UUID string to a 16-byte Uint8Array.

```typescript
const bytes = uuidToBytes('f47ac10b-58cc-4372-a567-0e02b2c3d479')
// Uint8Array(16) [244, 122, 193, 11, 88, 204, 67, 114, ...]
```

### `bytesToUUID(bytes: Uint8Array): string`

Converts a 16-byte Uint8Array back to a UUID string.

```typescript
const uuid = bytesToUUID(new Uint8Array([244, 122, 193, 11, ...]))
// 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
```

## Use Cases

### Database Primary Keys

```typescript
// Use v7 for time-sortable, index-friendly keys
const user = {
  id: getUUIDv7(),
  name: 'John Doe',
  createdAt: new Date()
}
```

### URL-Friendly Identifiers

```typescript
const id = getUUID()
const shortId = toShortUUID(id)
const url = `https://example.com/share/${shortId}`
// https://example.com/share/mhvXdrZT4jP5T8vBxuvm75

// Later, restore the full UUID
const fullId = fromShortUUID(shortId)
```

### Input Validation

```typescript
function getUser(id: string) {
  if (!isUUID(id)) {
    throw new Error('Invalid user ID format')
  }
  if (isNilUUID(id)) {
    throw new Error('Cannot use nil UUID')
  }
  // ... fetch user
}
```

### Version-Specific Handling

```typescript
function processUUID(id: string) {
  const version = getUUIDVersion(id)
  if (version === 7) {
    // Can extract timestamp from v7
    console.log('Time-ordered UUID')
  } else if (version === 4) {
    console.log('Random UUID')
  }
}
```

## UUID v4 vs v7

| Feature | v4 | v7 |
|---------|----|----|
| Generation | Random | Timestamp + Random |
| Sortable | ❌ | ✅ |
| Time-extractable | ❌ | ✅ |
| Database indexes | Good | **Excellent** |
| Use case | General purpose | Database PKs, logs |

**Recommendation**: Use `getUUIDv7()` for database primary keys and `getUUID()` (v4) for general-purpose identifiers.

## UUID Versions

| Version | Description | This Module |
|---------|-------------|-------------|
| v1 | Timestamp + MAC address | ❌ |
| v4 | Random | ✅ `getUUID()` |
| v5 | Namespace + SHA-1 | ❌ |
| v7 | Timestamp + Random | ✅ `getUUIDv7()` |
| Nil | All zeros | ✅ `getNilUUID()` |

## Dependencies

- [`uuid`](https://www.npmjs.com/package/uuid) - RFC4122 UUID generation (v11+)
- [`short-uuid`](https://www.npmjs.com/package/short-uuid) - Short UUID encoding

## Notes

- UUID v4 is cryptographically secure and suitable for most use cases
- UUID v7 is recommended for database primary keys (better index performance)
- Short UUIDs are ~40% shorter but still map 1:1 with standard UUIDs
- Nil UUID is useful as a sentinel/placeholder value
- Byte conversion is useful for binary protocols or compact storage
