# Contributors

Thank you to all the people who have contributed to this project! 🎉

## Core Contributors

- **Richard Torcato** ([@rtorcato](https://github.com/rtorcato)) - Creator and maintainer

## How to Contribute

We welcome contributions from everyone! Here's how you can help:

### 🐛 Bug Reports
- Check if the issue already exists in [GitHub Issues](https://github.com/rtorcato/js-common/issues)
- Create a new issue with a clear description and reproduction steps
- Include relevant code examples and error messages

### 💡 Feature Requests
- Open an issue to discuss new features before implementing
- Explain the use case and benefits
- Consider backward compatibility

### 🔧 Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our coding standards
4. Add tests for new functionality
5. Ensure all tests pass (`pnpm test`)
6. Run linting and formatting (`pnpm run check:fix`)
7. Commit your changes (`git commit -m 'feat: add amazing feature'`)
8. Push to your branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

Adding a helper? Check [MODULE-BOUNDARIES.md](MODULE-BOUNDARIES.md) first. It
records which module owns what, and the rule that no name is exported from two
modules — module paths are frozen, so a helper in the wrong place is expensive
to move later.

### 📝 Documentation
- Improve README.md, code comments, or JSDoc
- Add examples for existing functions
- Fix typos or clarify explanations

### 🧪 Testing
- Add test cases for existing functions
- Improve test coverage
- Report test failures

## Development Setup

```bash
# Clone the repository
git clone https://github.com/rtorcato/js-common.git
cd js-common

# Install dependencies
pnpm install

# Run tests
pnpm test

# Build the project
pnpm run build-prod

# Run linting and formatting
pnpm run check:fix
```

## Code Style

This project uses:
- **Biome** for linting and formatting
- **TypeScript** for type safety
- **Vitest** for testing
- **Conventional Commits** for commit messages

## Commit Message Convention

We follow [Conventional Commits](https://conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Recognition

All contributors will be:
- Listed in this file
- Mentioned in release notes for their contributions
- Given credit in the project's acknowledgments

## Questions?

Feel free to open an issue or reach out to the maintainers if you have any questions about contributing!

---

*This project follows the [Contributor Covenant](https://www.contributor-covenant.org/) Code of Conduct.*