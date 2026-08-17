# CLI Documentation

The `@rtorcato/js-common` package provides a beautiful, modern command-line interface to access utility functions directly from the terminal.

## ✨ Features

- 🔧 **Developer Integration** - Generate import statements and usage examples
- 🎮 **Interactive Mode** - Guided prompts with beautiful animations
- 📋 **Function Listing** - Browse all available functions by category  
- 🌈 **Colorful Output** - Enhanced visual experience with chalk colors
- 🚀 **Fast & Lightweight** - No global installation required via npx
- 📚 **Comprehensive Help** - Detailed help at every level

## Installation

The CLI is automatically available when you install the package. You can run it without global installation using `npx`:

```bash
npx @rtorcato/js-common <command>
```

Or install globally:

```bash
npm install -g @rtorcato/js-common
js-common <command>
```

## 🎮 Interactive Mode

Launch interactive mode for a guided experience:

```bash
npx @rtorcato/js-common interactive
# or
npx @rtorcato/js-common i
```

Interactive mode features:
- Beautiful ASCII art welcome screen
- Category-based function browsing
- Animated prompts and transitions
- Command generation with examples

## 📋 List All Functions

View all available functions organized by category:

```bash
npx @rtorcato/js-common --list
# or
npx @rtorcato/js-common list
```

## 🔧 Add Functions to Your Project

Get help integrating specific utility functions into your codebase:

```bash
npx @rtorcato/js-common add
# or
npx @rtorcato/js-common a
```

This command provides:
- Interactive function selection with checkboxes
- Generated import statements for your project
- Real usage examples with expected outputs
- Direct links to documentation
- Integration tips and best practices

## Available Commands

### Date & Time Utilities

```bash
# Get today's date (YYYY-MM-DD)
js-common date today

# Get current timestamp (epoch milliseconds)
js-common date now
js-common date now --iso     # ISO format
js-common date now --time    # Time, e.g. 14:32:07 GMT+0000 (Coordinated Universal Time)

# Calculate days between dates
js-common date between 2025-01-01 2025-12-31
```

### Mathematical Operations

```bash
# Sum numbers
js-common math sum 1 2 3 4 5

# Calculate average
js-common math avg 10 20 30 40 50

# Generate random number
js-common math random 1 100

# Round number to decimal places
js-common math round 3.14159 2

# Clamp number between min/max
js-common math clamp 150 0 100
```

### Text Formatting

```bash
# Capitalize first letter
js-common text capitalize "hello world"

# Convert to title case
js-common text title "hello world from javascript"
```

### System Information

```bash
# Get process ID
js-common system pid

# Get process uptime in seconds
js-common system uptime

# Get the full Node.js version string, e.g. v22.23.1
js-common system node-version
```

Note the CLI verbs and the library exports are deliberately different things, and
`js-common add` prints the export, not the verb. `system node-version` prints
`process.version` in full; the export it points you at, `getNodeMajorVersion`,
returns just the major as a number (`22`).

That is the whole command surface. The CLI is a shop window for the library, not a
port of it — most of the package (`file`, `security`, `validation`, and the rest of
the 44 modules) is import-only. Use `js-common add` to get the import statement.

## 💡 Developer Integration Examples

### Using the Add Command

The `add` command helps developers discover and integrate functions:

```bash
npx @rtorcato/js-common add

# Interactive workflow:
# 1. Select category (e.g., "🔢 Mathematical")
# 2. Choose functions (e.g., sum, avg, random)
# 3. Get generated import statements — note these are the *export* names, which
#    differ from the CLI verbs, and one import per module the category spans:
#    import { sum, average } from '@rtorcato/js-common/numbers'
#    import { randomInt } from '@rtorcato/js-common/random'
# 4. See usage examples:
#    const total = sum([1, 2, 3, 4, 5]) // 15
#    const mean = average([10, 20, 30]) // 20
#    const num = randomInt(1, 100) // 42
```

### CLI Usage Examples

```bash
# Interactive mode with animations
npx @rtorcato/js-common interactive

# Browse all available functions
npx @rtorcato/js-common --list

# Quick utility calls
npx @rtorcato/js-common date today         # 2024-10-24
npx @rtorcato/js-common math sum 1 2 3 4 5 # 15
npx @rtorcato/js-common text capitalize "hello" # Hello
npx @rtorcato/js-common system pid         # 12345
```

## Examples in Scripts

```bash
#!/bin/bash

# Calculate project statistics
TOTAL_FILES=$(find . -name "*.js" | wc -l)
echo "Total JS files: $TOTAL_FILES"

# Check if today is a specific date
TODAY=$(js-common date today)
if [ "$TODAY" = "2025-01-01" ]; then
    echo "Happy New Year!"
fi
```