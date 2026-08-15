# ADR-0003: Testing Strategy

## Status

Accepted

## Context

The backend needs a testing strategy that keeps quality high without slowing development. Tests must run in parallel and in isolation, which requires a real database for repository tests.

## Decision

Use a layered testing approach with TestContainers for isolated database environments.

### Unit Tests

Required for every layer. Each layer mocks the layer below it:

- Presentation (controllers) mocks services.
- Application (services) mocks repository ports.

### Repository Tests

Required for every repository adapter. They run against a real database through TestContainers, so databases stay isolated and tests run in parallel. They verify CRUD operations and edge cases.

#### Entity Builders

Test data is created with entity builders in `src/modules/shared/database/tests/`. Builders implement the Builder pattern with sensible defaults and method chaining:

```typescript
await new TaskEntityBuilder().mock({ title: 'Custom Title' }).save(dataSource);
```

### End-to-End Tests

Optional, recommended for critical user flows. They exercise the complete HTTP request/response cycle using TestContainers, and should not duplicate unit test coverage.

### Coverage Targets

- Domain: 100%
- Application: 90%
- Infrastructure: 80%
- Presentation: 80%

## Consequences

### Positive

- Isolated, parallel test environments with TestContainers.
- Reusable test data through entity builders.
- Fast unit tests with flexible E2E coverage.

### Negative

- TestContainers setup and execution time.
- Mocks and builders need maintenance.
- Risk of E2E tests duplicating unit coverage.
