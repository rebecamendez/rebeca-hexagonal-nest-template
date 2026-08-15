# Modules

The template is a monorepo: one application and shared packages.

## Applications

### api

The NestJS backend. It exposes a REST API for tasks and hosts the shared infrastructure (database, logging, graceful shutdown).

### tasks module

The only feature module, task management with full CRUD. See [tasks.md](modules/tasks.md) for the use-cases, layout, and testing.

## Shared modules
- `shared/database`: TypeORM data source, entities, and the entity builders used in tests.
- `shared/errors`: error types shared across modules, such as `EntityModelNotFoundError`.
- `root`: the root endpoint (`GET /`) that greets the API consumer.
- `shutdown`: graceful shutdown on process signals.

## Packages

- `@rebeca-hexagonal-nest-template/api-contract`: the request and response DTOs, the single source of truth for the API shape.
- `@rebeca-hexagonal-nest-template/lint-config`: shared ESLint, Prettier, and dependency-cruiser configuration.

