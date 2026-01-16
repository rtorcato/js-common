# [1.6.0](https://github.com/rtorcato/js-common/compare/v1.5.0...v1.6.0) (2026-01-16)


### Bug Fixes

* added dev branch to CI ([751f124](https://github.com/rtorcato/js-common/commit/751f124d48e40452c43f70ce05239f220bd30c63))
* update packages and add fix for biome sorting ([0ed384c](https://github.com/rtorcato/js-common/commit/0ed384cfed2e4b285752a8e22f59aebd8ccb19c9))


### Features

* **uuid:** add v7, version detection, and short UUID conversion ([d304168](https://github.com/rtorcato/js-common/commit/d304168206152b125ffb2269c1c0cc448f266d76))

# [1.5.0](https://github.com/rtorcato/js-common/compare/v1.4.2...v1.5.0) (2026-01-16)


### Features

* **currency:** add lazy loading and new features ([e9369a8](https://github.com/rtorcato/js-common/commit/e9369a8af5355cea9d348c94776037158680f30d))

## [1.4.2](https://github.com/rtorcato/js-common/compare/v1.4.1...v1.4.2) (2026-01-16)


### Bug Fixes

* update benchmark imports to use correct module paths ([0713f23](https://github.com/rtorcato/js-common/commit/0713f23f03826546718f6d7667aea09bf14b26ce))

## [1.4.1](https://github.com/rtorcato/js-common/compare/v1.4.0...v1.4.1) (2026-01-16)


### Bug Fixes

* add build step to performance benchmarks job ([e3a9020](https://github.com/rtorcato/js-common/commit/e3a9020d17d6cf00feb95055c7d483cd190ca30d))
* add vitest coverage-istanbul dependency ([498b6fb](https://github.com/rtorcato/js-common/commit/498b6fbd41bc262ea00bb42d0bc2c97e4393f13c))

# [1.4.0](https://github.com/rtorcato/js-common/compare/v1.3.1...v1.4.0) (2026-01-16)


### Bug Fixes

* resolve lint errors for unused variables and isNaN usage ([e47b644](https://github.com/rtorcato/js-common/commit/e47b644d4e15b134aaeb2583bc8d97ea1e51e6bb))
* trigger release for lint and template fixes ([51888fd](https://github.com/rtorcato/js-common/commit/51888fdf6d0d063a6e605e248e214d895125ce2b))
* update CodeQL workflow to v4 and fix invalid query pack ([15c4868](https://github.com/rtorcato/js-common/commit/15c4868e4f1d23eaaf79cd5fc3c427ed81193c72))
* update performance workflow with correct pnpm setup order ([908fb60](https://github.com/rtorcato/js-common/commit/908fb60e25f4416b91f0bad4dc77ae66ce81894f))


### Features

* Enable TypeScript type definitions for package consumers ([70eb162](https://github.com/rtorcato/js-common/commit/70eb162bb556164432762f382470ff28a3ec0251))

# [1.4.0](https://github.com/rtorcato/js-common/compare/v1.3.1...v1.4.0) (2026-01-16)


### Bug Fixes

* resolve lint errors for unused variables and isNaN usage ([e47b644](https://github.com/rtorcato/js-common/commit/e47b644d4e15b134aaeb2583bc8d97ea1e51e6bb))
* trigger release for lint and template fixes ([51888fd](https://github.com/rtorcato/js-common/commit/51888fdf6d0d063a6e605e248e214d895125ce2b))
* update CodeQL workflow to v4 and fix invalid query pack ([15c4868](https://github.com/rtorcato/js-common/commit/15c4868e4f1d23eaaf79cd5fc3c427ed81193c72))
* update performance workflow with correct pnpm setup order ([908fb60](https://github.com/rtorcato/js-common/commit/908fb60e25f4416b91f0bad4dc77ae66ce81894f))


### Features

* Enable TypeScript type definitions for package consumers ([70eb162](https://github.com/rtorcato/js-common/commit/70eb162bb556164432762f382470ff28a3ec0251))

## [1.3.1](https://github.com/rtorcato/js-common/compare/v1.3.0...v1.3.1) (2025-10-24)


### Bug Fixes

* Correct import paths in CLI for proper TypeScript compilation ([24221d5](https://github.com/rtorcato/js-common/commit/24221d5622fa70dabe78166c7266c825686466ab))

# [1.3.0](https://github.com/rtorcato/js-common/compare/v1.2.0...v1.3.0) (2025-10-24)


### Features

* Add modern interactive CLI with developer integration ([8ffb144](https://github.com/rtorcato/js-common/commit/8ffb144dfb9b1c13a6a40df7c2dee98623c8a936))

# [1.2.0](https://github.com/rtorcato/js-common/compare/v1.1.0...v1.2.0) (2025-10-24)


### Bug Fixes

* remove commitlint dependency from release job ([dbf2795](https://github.com/rtorcato/js-common/commit/dbf27956698b40d68c29dcaba62c5498b8bb7f52))


### Features

* modernize CI/CD workflow with js-tooling structure ([a46b6bf](https://github.com/rtorcato/js-common/commit/a46b6bf73696def0be74136d872ece3a0447ce2d))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-24

### Added
- Initial public release on GitHub and npm
- Comprehensive JavaScript/TypeScript utilities library
- Support for arrays, strings, dates, validation, crypto, and more
- Full TypeScript support with type definitions
- Modular imports for tree-shaking optimization

### Changed
- Migrated from GitLab to GitHub
- Changed from private to public package
- Updated to MIT license
