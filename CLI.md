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

# Get current timestamp
js-common date now
js-common date now --iso     # ISO format
js-common date now --time    # Time only (HH:MM:SS)

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
js-common math random --min 1 --max 100

# Round number to decimal places
js-common math round 3.14159 --decimals 2

# Clamp number between min/max
js-common math clamp 150 0 100
```

### Text Formatting

```bash
# Capitalize first letter
js-common text capitalize "hello world"

# Convert to title case
js-common text title "hello world from javascript"

# Pad with leading zeros
js-common text pad 5 --length 3
```

### File Operations

```bash
# Check if file exists (exit code 0 = exists, 1 = doesn't exist)
js-common file exists package.json

# Get file extension
js-common file ext myfile.txt
```

### Security Utilities

```bash
# Check password strength (exit code 0 = strong, 1 = weak)
js-common security password "MyStr0ng!Pass"

# Generate secure random token
js-common security token --length 32
```

### Validation

```bash
# Validate URL (exit code 0 = valid, 1 = invalid)
js-common validate url "https://example.com"
```

### System Information

```bash
# Get process ID
js-common system pid

# Get process uptime in seconds
js-common system uptime

# Check if running in CI environment
js-common system ci

# Get Node.js major version
js-common system node-version
```

## Exit Codes

Many validation commands use exit codes to indicate success/failure:
- `0`: Success/Valid/True
- `1`: Failure/Invalid/False

This makes them useful in shell scripts:

```bash
if js-common validate url "https://example.com"; then
    echo "Valid URL"
else
    echo "Invalid URL"
fi
```

## 💡 Developer Integration Examples

### Using the Add Command

The `add` command helps developers discover and integrate functions:

```bash
npx @rtorcato/js-common add

# Interactive workflow:
# 1. Select category (e.g., "🔢 Mathematical")
# 2. Choose functions (e.g., sum, avg, random)
# 3. Get generated import statement:
#    import { sum, avg, random } from '@rtorcato/js-common/math'
# 4. See usage examples:
#    const total = sum([1, 2, 3, 4, 5]); // 15
#    const average = avg([10, 20, 30]); // 20
#    const num = randomBetween(1, 100); // 42
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

# Generate a secure token for API keys
API_KEY=$(js-common security token --length 16)
echo "Generated API Key: $API_KEY"

# Calculate project statistics
TOTAL_FILES=$(find . -name "*.js" | wc -l)
echo "Total JS files: $TOTAL_FILES"

# Check if today is a specific date
TODAY=$(js-common date today)
if [ "$TODAY" = "2025-01-01" ]; then
    echo "Happy New Year!"
fi
```