# rebeca-hexagonal-nest-template

A template for building scalable applications with NestJS and hexagonal architecture. It is a modular monolith with clear layers, shared API contracts, and a testing strategy that keeps each layer honest.

> This is a template repository. It evolved from a personal project and is meant to be a starting point for your own products.

## Project Structure

```
├── apps/
│   └── api/              # Backend (NestJS)
├── packages/
│   ├── api-contract/     # Shared request and response DTOs
│   └── lint-config/      # Shared ESLint, Prettier, dependency-cruiser config
├── scripts/              # Utility scripts
├── rules/                # Project rules for agents
└── docs/                 # Documentation map
```

## What You Get

- Hexagonal architecture with domain, application, infrastructure, and presentation layers per module.
- TypeScript in strict mode, shared API contracts, and dependency injection wiring.
- TestContainers for isolated, parallel database tests.
- Automatic OpenAPI documentation.

## Quick Start

From the repository root:

```bash
nvm use              # Node version from .nvmrc
npm install -g pnpm  # pnpm 8
pnpm install
pnpm docker:init     # docker-compose.yml from the example
pnpm docker:start    # start PostgreSQL
pnpm dev:init        # create .env and run migrations
pnpm dev             # start the API
```

The API runs at http://localhost:3000. OpenAPI docs are at http://localhost:3000/api when `ENABLE_OPENAPI=true`. A Bruno collection is available in `apps/api/bruno/`.

## Available Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Start the API in watch mode |
| `pnpm build` | Build all packages and apps |
| `pnpm test` | Run the test suite |
| `pnpm lint` | Lint all projects |
| `pnpm format` | Format code and docs |
| `pnpm diagrams` | Serve the LikeC4 diagrams with live reload |
| `pnpm diagrams:build` | Build a static version of the diagrams |
| `pnpm deps:audit` | Audit dependencies |
| `pnpm docker:start` | Start Docker services |

## Documentation

Read the docs in this order:

1. [docs/onboarding.md](docs/onboarding.md): how to get set up and productive.
2. ⭐ [docs/architecture-system.md](docs/architecture-system.md): the big picture.
3. ⭐ [docs/architecture-code.md](docs/architecture-code.md): module boundaries and golden samples.
4. ⭐ [docs/architecture-testing.md](docs/architecture-testing.md): testing strategy by layer.
5. [docs/index.md](docs/index.md): map of the whole documentation folder.
6. [docs/context/domain.md](docs/context/domain.md): what the template does and who uses it.
7. [docs/context/modules.md](docs/context/modules.md): the app, shared modules, packages, and per-module deep dives.
8. [docs/adrs/index.md](docs/adrs/index.md): recorded architectural decisions.

## Rules for Agents

Agents and AI tools must start at [rules/index.md](rules/index.md), the single gateway to the global, scoped, and project rules. The global and scoped rules come from the [ai-principles](https://github.com/rebecamendez/ai-principles) repository.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow and [rules/aip-repo-code-style.md](rules/aip-repo-code-style.md) for code conventions.

## License

MIT. See [LICENSE](LICENSE).
