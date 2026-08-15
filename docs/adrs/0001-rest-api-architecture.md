# ADR-0001: REST API Architecture

## Status

Accepted

## Context

The product needs a REST API for task and project management that is scalable, testable, and maintainable as the product grows. The team is small and the product is new, so the architecture must avoid premature complexity while leaving a clear path to evolve.

## Decision

Build a modular monolith with a simple hexagonal architecture.

### Modular Monolith

- Start as a single deployable application: faster development, simpler operations, and lower cost while the team validates the product.
- Split the codebase into self-contained feature modules, each owning its domain, application, infrastructure, and presentation layers.
- Each module behaves as a bounded context: it encapsulates its logic and exposes explicit interfaces to the rest of the system.
- Leave room to evolve: extract modules into services later if scale demands it, or introduce CQRS and event-driven flows at module level.

### Hexagonal Layers

- Domain: business entities and rules, free of framework and database concerns.
- Application: services and ports (interfaces) that orchestrate domain operations.
- Infrastructure: adapters that implement the ports, such as the database repository.
- Presentation: HTTP controllers and mappers.
- Wire everything through NestJS dependency injection so layers never depend on implementations directly.

### Shared Contracts

Frontend and backend communicate through `@rebeca-hexagonal-nest-template/api-contract`, a shared package with the request and response DTOs. This gives type safety across the stack, lets frontend and backend move in parallel, and keeps a single source of truth for the API shape.

### Why These Choices

- Hexagonal architecture keeps business logic independent of infrastructure, which makes testing easy and infrastructure replaceable.
- NestJS provides dependency injection, modular structure, strong TypeScript support, and built-in OpenAPI support.
- PostgreSQL offers ACID guarantees, a rich ecosystem, and a cost-effective fit for the current scale.
- TypeORM has native TypeScript support and integrates well with NestJS.

### Module Layout

```
modules/
  ├── feature/             # Feature module
  │   ├── domain/          # Business entities
  │   ├── application/     # Business logic and ports
  │   ├── infrastructure/  # Adapters and repositories
  │   └── presentation/    # Controllers and mappers
  ├── shared/              # Shared modules
  └── root/                # Root module
```

### Golden Sample

Presentation maps between contract DTOs and domain objects:

```typescript
// presentation/task.controller.ts
@Injectable()
export class TaskController {
  public constructor(private readonly taskService: TaskService) {}

  @Get()
  public async getTasks(): Promise<TaskResponse[]> {
    const tasks = await this.taskService.getTasks();
    return tasks.map((task) => TaskMapper.toResponse(task));
  }
}
```

Application defines the port and orchestrates through it:

```typescript
// application/ports/task.repository.ts
export interface TaskRepository {
  getTasks(): Promise<Task[]>;
  getTask(id: number): Promise<Task>;
}
```

Infrastructure implements the port as an adapter against the shared `DataSource`:

```typescript
// infrastructure/repositories/task.repository.adapter.ts
@Injectable()
export class TaskRepositoryAdapter implements TaskRepository {
  public constructor(private readonly dataSource: DataSource) {}

  public async getTasks(): Promise<Task[]> {
    const repository = this.dataSource.getRepository(TaskEntity);
    const entities = await repository.find();
    return entities.map((entity) => TaskEntityMapper.toDomain(entity));
  }
}
```

### Error Handling

Each layer owns its errors: domain errors in the domain layer, application errors in the application layer, HTTP mapping in the presentation layer. The client receives meaningful messages without internal details, and errors are logged with context and severity.

## Consequences

### Positive

- Clear separation of concerns, which makes each layer independently testable.
- Infrastructure is replaceable without touching business logic.
- Type safety and automatic API documentation through shared contracts and OpenAPI.
- Pragmatic starting point with a defined evolution path.

### Negative

- More boilerplate than a single-layer design.
- A learning curve for the layered structure.
- Shared contracts need maintenance as the API evolves.

## References

- [NestJS Documentation](https://docs.nestjs.com/)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TypeORM Documentation](https://typeorm.io/)
- [Architecture overview diagram](../architecture-diagrams/api-architecture.drawio.png)
