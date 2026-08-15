# Onboarding

Welcome! 👋 This template gives you a NestJS monorepo with a simple hexagonal architecture. Everything you need to be productive is right here.

## Where to Start

1. Read [rules/index.md](../rules/index.md) to know the rules that apply. The global and scoped rules come from the [ai-principles](https://github.com/rebecamendez/ai-principles) repository.
2. Read [context/domain.md](context/domain.md) to understand what the template is for.
3. Read [architecture-system.md](architecture-system.md) to see how the system is built.
4. Read [architecture-code.md](architecture-code.md) for the golden samples that show the canonical way to add a feature.

## Prerequisites

- Node.js 24 (pinned in `.nvmrc`, enforced by `scripts/check-node-version.js`).
- pnpm 8.
- Docker and Docker Compose for the database and test containers.

## Setup

```bash
nvm use
npm install -g pnpm
pnpm install
pnpm docker:init    # copies docker-compose.yml.example to docker-compose.yml
pnpm docker:start   # starts PostgreSQL
pnpm dev:init       # creates .env and runs migrations
pnpm dev            # starts the API
```

The API runs at http://localhost:3000. The OpenAPI docs are at http://localhost:3000/api when `ENABLE_OPENAPI=true`. A Bruno collection lives in `apps/api/bruno/`.

## Day to Day

- Branch off `main` with a conventional prefix (`feat/...`, `fix/...`).
- Commit with Conventional Commits, one responsibility per commit.
- Run `pnpm lint`, `pnpm test`, and `pnpm build` before pushing.
- Open a PR and fill in [the template](../.github/pull_request_template.md).

That's it, build something great! 🚀

## Who to Ask

- For architecture questions, check the ADRs in [adrs/index.md](adrs/index.md).
- For the module layout, see [architecture-code.md](architecture-code.md).
