# Pull Request

## 📝 Description

<!-- Describe your changes in detail -->

## 🔗 Related Issue

<!-- Link to the issue this PR addresses -->
Fixes #<!-- issue number -->

## 🧪 Type of Change

- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that causes existing functionality to change)
- [ ] 📚 Documentation update
- [ ] 🔧 Internal change (refactoring, build, etc.)

## ✅ Checklist

### Code Quality
- [ ] My code follows the existing code style
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings or errors

### Testing
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] I have tested this change in a real-world scenario

### Documentation
- [ ] I have made corresponding changes to the documentation
- [ ] I have added/updated JSDoc comments for new/modified functions
- [ ] I have updated TypeScript definitions if needed

### Build & Dependencies
- [ ] My changes don't introduce new dependencies unnecessarily
- [ ] The build passes (`pnpm run build-prod`)
- [ ] All linting passes (`pnpm run check`)
- [ ] All tests pass (`pnpm run test`)

## 🧪 How Has This Been Tested?

<!-- Describe the tests you ran and how to reproduce them -->

```typescript
// Test examples
import { newFunction } from '@rtorcato/js-common/module'

// Test case 1
const result1 = newFunction(input1)
expect(result1).toBe(expected1)

// Test case 2  
const result2 = newFunction(input2)
expect(result2).toBe(expected2)
```

## 📸 Screenshots (if applicable)

<!-- Add screenshots for UI changes, CLI output, etc. -->

## 🚀 Performance Impact

- [ ] No performance impact
- [ ] Performance improvement
- [ ] Potential performance regression (explain below)

<!-- If performance impact, provide benchmarks -->

## 🔄 Breaking Changes

<!-- List any breaking changes and migration instructions -->

## 📚 Additional Context

<!-- Any additional context, related issues, or helpful information -->

---

### For Reviewers

- **Focus Areas**: <!-- Specific areas you'd like reviewers to pay attention to -->
- **Testing Instructions**: <!-- How reviewers can test your changes -->
- **Documentation**: <!-- Links to related documentation -->

Thank you for contributing to `@rtorcato/js-common`! 🎉