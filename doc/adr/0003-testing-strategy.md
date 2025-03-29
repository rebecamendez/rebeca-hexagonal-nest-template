# ADR 0002: Testing Strategy

## Status
Accepted

## Context
We need to establish a clear testing strategy for the backend that ensures code quality while maintaining development velocity. 🎯

We use [TestContainers](https://www.testcontainers.org/) for isolated test environments, which allows us to run tests in parallel with dedicated database instances.

## Decision
We will implement a layered testing approach with the following requirements:

### Unit Tests (Required) 🧪
- Each layer must mock its dependencies from the layer below
- Presentation layer (controllers) mocks services
- Application layer (services) mocks repositories

### Repository Tests (Required) 📚
- Must test all repository implementations
- Uses TestContainers for isolated databases and parallel execution
- Must verify CRUD operations and edge cases

#### Entity Builders 🏗️
- Located in `src/modules/shared/database/tests/`
- Implement the Builder pattern to create entities with sensible defaults
- Allow method chaining for easy test data customization
- Example: `await new TaskEntityBuilder().mock({ title: 'Custom Title' }).save(dataSource)`

### End-to-End Tests (Optional) 🌐
- Must test complete HTTP endpoints (request/response cycle)
- Uses TestContainers for isolated environments
- Recommended for critical user flows
- Should not duplicate unit test coverage
- Use entity builders for test data setup

## Consequences
### Positive
- Isolated test environments with TestContainers
- Reusable test data through entity builders
- Fast unit tests, flexible E2E tests

### Negative
- TestContainers setup and execution time
- Need to maintain mocks and builders
- Risk of test duplication in E2E
