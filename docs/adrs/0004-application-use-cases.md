# ADR-0004: Use-Case Orchestration in the Application Layer

## Status

Proposed

## Context

Each feature module used to expose a single application service (`TaskService`) that forwarded every operation to the repository port, one method per endpoint. As features grow, that shape becomes a dumping ground: orchestration, validation, and business rules pile up in the same class, the operations the product actually supports are implicit, and testing the logic means testing the whole service.

The template is the golden reference for every feature module, so the application layer should make each operation explicit and keep the domain honest about what it is today: a simple, anemic model (`Task` is a plain data holder) whose use cases are straightforward CRUD.

## Decision

Replace the application service with one use case class per operation, each exposing a single `execute()` method and depending only on the ports it needs. The presentation layer injects the use cases, and NestJS dependency injection wires them in the module.

### Use Cases

One class per operation in `application/use-cases/`:

- `GetTasksUseCase`, `GetTaskUseCase`, `CreateTaskUseCase`, `UpdateTaskUseCase`, `DeleteTaskUseCase`

Each use case is a thin orchestrator: it validates nothing (the presentation owns the HTTP contract), delegates to the `TaskRepository` port, and returns the domain result.

### Command Objects

Write operations receive an immutable input object instead of a growing parameter list:

```typescript
export class CreateTaskCommand {
  public constructor(
    public readonly title: string,
    public readonly description: string
  ) {}
}
```

Commands live in `application/commands/` and make the application boundary explicit and typed (`aip-scoped-typescript.explicit-boundaries`).

### The Repository Port Stays in the Application Layer

The `TaskRepository` interface stays in `application/ports/` and is not moved to the domain. While the domain is anemic there is no reason to move it:

- The `Task` model has no invariants and no behavior, so nothing in the domain needs to query or persist through a repository.
- Keeping the port in `application/` leaves the domain completely free of persistence vocabulary, stricter than DDD's default and aligned with `aip-repo-architecture.pure-domain`.
- The hexagon core still only depends on interfaces, so infrastructure remains replaceable.

### Evolution to Rich DDD

If the product grows a rich domain (aggregates with invariants that need persistence, real business rules), the following changes make sense and are contained:

- Move the repository interface into `domain/` (DDD repositories) and keep the adapter in `infrastructure/`.
- Replace anemic entities with value objects and aggregates that own their rules.
- Use cases stay as the orchestration layer, now delegating to the domain instead of the port directly.

That evolution is a small, well-scoped refactor per module, not a rewrite.

### Why Not the Alternatives

- **Keep the single service**: scales badly, hides the operations, and grows one method per endpoint.
- **Rich DDD now**: premature for CRUD tasks with no business rules; it adds aggregates, value objects, and domain repositories without a payoff. `aip-repo-code-style.simple` favors the minimal shape that the current need justifies.
- **Plain parameters instead of commands**: command objects give write operations an explicit, typed input and keep the controller clean when parameters grow.

## Consequences

### Positive

- Each operation is a first-class, independently testable unit.
- Unit tests stay honest: use case specs mock the port, controller specs mock the use cases (`aip-repo-testing`).
- The application layer has explicit boundaries with typed inputs.
- A clear, recorded path toward DDD if the domain becomes rich.

### Negative

- More files and boilerplate than a single service, plus more DI wiring in the module.
- One class per operation can feel like ceremony for very simple endpoints; accepted for consistency across the template.
- The anemic model keeps business rules out of the domain for now, so logic that appears before the DDD evolution lives in the use cases.

## References

- [ADR-0001: REST API Architecture](0001-rest-api-architecture.md)
- [ADR-0003: Testing Strategy](0003-testing-strategy.md)
- [aip-repo-architecture](../rules/aip-repo-architecture.md)
- [architecture-code.md](../architecture-code.md)

---

Last updated: 2026-08-15
