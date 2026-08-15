# Tasks Module

The tasks module is the reference feature module of the template. It implements task management with full CRUD and shows the canonical hexagonal layout.

## Use-Cases

| Use-case | Endpoint | Description |
|---|---|---|
| List tasks | `GET /tasks` | Returns all tasks. |
| Get a task | `GET /tasks/:id` | Returns one task by id. |
| Create a task | `POST /tasks` | Creates a task from a `TaskRequest` body. |
| Update a task | `PUT /tasks/:id` | Replaces the title and description of a task. |
| Delete a task | `DELETE /tasks/:id` | Removes a task. |

## Layout

```
tasks/
  ├── domain/          # Task entity, framework-free
  ├── application/     # Use cases, commands, and the TaskRepository port
  ├── infrastructure/  # TypeORM adapter and providers
  └── presentation/    # TaskController and mappers
```

## Boundaries

- `domain/task.ts`: the `Task` model with `id`, `title`, and `description`. No NestJS or TypeORM imports.
- `application/ports/task.repository.ts`: the `TaskRepository` interface and its DI token `TASK_REPOSITORY`, both owned by the application layer.
- `application/use-cases/*.ts`: one class per operation (`GetTasksUseCase`, `CreateTaskUseCase`, ...), each with a single `execute()` method that orchestrates through the port.
- `application/commands/*.ts`: immutable input objects for the write operations (`CreateTaskCommand`, `UpdateTaskCommand`).
- `infrastructure/repositories/task.repository.adapter.ts`: implements the port with TypeORM and maps entities through `TaskEntityMapper`.
- `infrastructure/repositories/task.repository.provider.ts`: binds the port to the adapter for dependency injection.
- `presentation/task.controller.ts`: maps contract DTOs (`TaskRequest`, `TaskResponse`) to and from the use cases.

The golden sample in [architecture-code.md](../../architecture-code.md) walks through this layout step by step. The decision to use use cases instead of a single service is recorded in [ADR-0004](../../adrs/0004-application-use-cases.md). The boundary rules live in [rules/aip-repo-architecture.md](../../../rules/aip-repo-architecture.md).

## Testing

- Unit tests: controller mocks the use cases, use cases mock the repository port.
- Repository tests: the adapter runs against PostgreSQL through TestContainers.
- E2E tests: complete request/response cycles.

See [architecture-testing.md](../../architecture-testing.md) for the strategy and test data builders.
