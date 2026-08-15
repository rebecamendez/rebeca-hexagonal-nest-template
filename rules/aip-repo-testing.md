# aip-repo-testing

> Scope: repo: this template and any project generated from it.

## Context

Hexagonal architecture only pays off if each layer is tested against the layer below it, so a change in infrastructure never breaks domain behavior silently.

## Rules

- [MUST] write unit tests for every layer; each layer mocks the layer below it. { aip-repo-testing.unit }
  - Presentation (controllers) mocks use cases.
  - Application (use cases) mocks repository ports.
- [MUST] test every repository adapter against a real database with TestContainers. { aip-repo-testing.repository }
- [MUST] create test data with entity builders located in `src/modules/shared/database/tests/`. { aip-repo-testing.builders }
- [SHOULD] write end-to-end tests for critical user flows; do not duplicate unit test coverage. { aip-repo-testing.e2e }
- [SHOULD] keep target coverage: domain 100%, application 90%, infrastructure 80%, presentation 80%. { aip-repo-testing.coverage }
