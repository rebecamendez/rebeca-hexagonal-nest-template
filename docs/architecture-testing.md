# Architecture Testing

The testing strategy is a direct consequence of the [simple hexagonal architecture](architecture-code.md#hexagonal-architecture-ports-and-adapters): the core talks to the outside only through ports, so every layer can be tested against the layer below it by mocking those ports. Repository adapters run against a real database. The decision is recorded in [ADR-0003](adrs/0003-testing-strategy.md). The repo rules are in [rules/aip-repo-testing.md](../rules/aip-repo-testing.md).

## Strategy by Layer

| Layer | Test type | What it mocks | Tooling |
|---|---|---|---|
| Presentation | Unit | Services | Jest |
| Application | Unit | Repository ports | Jest |
| Infrastructure | Repository tests | Real database | Jest + TestContainers |
| Full stack | E2E (optional) | Real stack | Jest + TestContainers |

A test never crosses more than one boundary: a controller test never touches a repository, a service test never touches the database, and a repository test only exercises the adapter.

## Running the Suite

Jest is split into three targets in `apps/api/`:

| Command | Config | Runs |
|---|---|---|
| `pnpm test:unit` | `jest.config.unit.js` | `*.spec.ts`, ignoring repository and e2e specs |
| `pnpm test:repository` | `jest.config.repository.js` | `*.repository.adapter.spec.ts` only |
| `pnpm test:e2e` | `jest.config.e2e.js` | `*.e2e.spec.ts` only |
| `pnpm test` | `jest.config.js` | Everything |

All configs extend `jest.config.js`, which uses `ts-jest`, collects coverage, and ignores mocks, migrations, and the tests folder itself. Run these commands from `apps/api/`.

## Test Data

Mocks and builders keep the specs deterministic.

### Domain mocks

`createTaskMock()` builds a `Task` with sensible defaults and lets a spec override fields:

```typescript
const task = createTaskMock({ title: 'Custom Title' });
```

### Entity builders

`TaskEntityBuilder` builds a `TaskEntity`, lets a spec override fields, and persists it through the given `DataSource`:

```typescript
// apps/api/src/modules/tasks/infrastructure/repositories/task.repository.adapter.spec.ts
await new TaskEntityBuilder().mock({ title: 'Custom Title' }).save(dataSource);
```

## Case 1: Unit Test for the Application Service

The service depends only on the port, so the spec mocks the port with `jest-mock-extended`. No database is involved. This test proves orchestration: the service forwards the call and returns the domain result.

```typescript
// apps/api/src/modules/tasks/application/task.service.spec.ts
const repository = mock<TaskRepository>();
const service = new TaskService(repository);

it('should create a task', async () => {
  const task = createTaskMock();

  repository.createTask.calledWith(task.title, task.description).mockResolvedValue(task);

  const result = await service.createTask(task.title, task.description);

  expect(result).toEqual(task);
});

it('should remove a task', async () => {
  const task = createTaskMock();

  await service.deleteTask(task.id);

  expect(repository.deleteTask).toHaveBeenCalledWith(task.id);
});
```

Note the two assertions styles: mock the return value and compare the result, or verify the mock was called with the right arguments. `mockReset(repository)` runs before each test to keep scenarios isolated.

## Case 2: Unit Test for the Controller

The controller mocks the service and asserts the HTTP contract through snapshots. The mapper runs for real, so the snapshot captures the exact response shape a consumer sees.

```typescript
// apps/api/src/modules/tasks/presentation/task.controller.spec.ts
const service = mock<TaskService>();
const controller = new TaskController(service);

it('should create a task', async () => {
  const request = createTaskRequestMock();
  const task = createTaskMock();

  service.createTask.calledWith(request.title, request.description).mockResolvedValue(task);

  const result = await controller.createTask(request);
  expect(result).toMatchSnapshot();
});
```

The mock request comes from the contract package (`createTaskRequestMock`), so the test uses the same data shape as Swagger examples.

## Case 3: Repository Test with TestContainers

The adapter is tested against a real PostgreSQL instance in a container. `containerSetup` starts the container, creates a `DataSource`, and runs the migrations, so the schema matches production.

```typescript
// apps/api/src/tests/test-containers.setup.ts
export const containerSetup = async (databaseName: string): Promise<ContainerSetup> => {
  const container = await createPostgresContainer(databaseName);
  const dataSource = await createDataSource(container, databaseName);
  return { container, dataSource };
};
```

The spec starts the container once, prepares a row with the entity builder, and exercises every CRUD path against the real adapter:

```typescript
// apps/api/src/modules/tasks/infrastructure/repositories/task.repository.adapter.spec.ts
beforeAll(async () => {
  ({ container, dataSource } = await containerSetup('task-repository-test'));
  repository = new TaskRepositoryAdapter(dataSource);
  await prepareScenario(dataSource); // seeds one TaskEntity via the builder
});

describe('when deleting a task', () => {
  it('should delete a task', async () => {
    await repository.deleteTask(taskEntity.id);
    await expect(repository.getTask(taskEntity.id)).rejects.toThrow(EntityModelNotFoundError);
  });
});
```

This is the only place that asserts real SQL behavior. Each repository spec uses its own database name, so specs run in parallel without colliding.

## Case 4: End-to-End Test

An e2e test boots the real `AppModule`, but points its `ConfigService` at the test container. This exercises the full stack: HTTP, validation, DI, TypeORM, and the database.

```typescript
// apps/api/src/modules/tasks/presentation/task.controller.e2e.spec.ts
const mockedConfig = jest.fn((key: string) => {
  switch (key) {
    case 'DB_HOST':
      return container.getHost();
    case 'DB_PORT':
      return container.getMappedPort(5432);
    case 'DB_USER':
      return 'the-user';
    case 'DB_PASSWORD':
      return 'the-password';
    case 'DB_DATABASE':
      return databaseName;
  }
  return process.env[key];
});

const moduleFixture: TestingModule = await Test.createTestingModule({
  imports: [AppModule]
})
  .overrideProvider(ConfigService)
  .useValue({ get: mockedConfig, getOrThrow: mockedConfig })
  .compile();

app = moduleFixture.createNestApplication();
setupNestApp(app, 3000, false);
await app.init();
```

Then the test makes a real HTTP call with `supertest`:

```typescript
const response = await request(app.getHttpServer()).get('/tasks').send();

expect(response.status).toBe(200);
expect(response.body).toMatchSnapshot();
```

E2E is optional and should cover complete user flows only. It must not duplicate the assertions already covered by unit tests.

## Case 5: Snapshots

Repository, controller, and e2e specs assert responses with `toMatchSnapshot`. Snapshots are stored next to the spec in `__snapshots__/` and are reviewed on every change. When a shape changes intentionally, update the snapshot instead of weakening the assertion.

## Coverage Targets

The agreed targets per layer, recorded in [ADR-0003](adrs/0003-testing-strategy.md) and [aip-repo-testing](../rules/aip-repo-testing.md):

- Domain: 100%
- Application: 90%
- Infrastructure: 80%
- Presentation: 80%

Coverage is reported with `--coverage`, and each Jest config scopes what is measured through its `collectCoverageFrom` list. The targets are not hard-enforced by Jest or CI yet.
