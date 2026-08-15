# AGENTS.md

This file is the navigation map for agents working in this repository. Every task starts here.

## Rules

Read [rules/index.md](rules/index.md) first. It is the only gateway to the rules:

- Global rules (git, documentation) apply always.
- Scoped rules apply to TypeScript and to shell scripts.
- Repo rules ([aip-repo-code-style](rules/aip-repo-code-style.md), [aip-repo-architecture](rules/aip-repo-architecture.md), [aip-repo-testing](rules/aip-repo-testing.md)) define this project's conventions.

## Documentation

The full map is in [docs/index.md](docs/index.md). Read the essential docs in this order:

1. [docs/onboarding.md](docs/onboarding.md): how to get set up and productive.
2. ⭐ [docs/architecture-system.md](docs/architecture-system.md): the big picture.
3. ⭐ [docs/architecture-code.md](docs/architecture-code.md): module boundaries and golden samples.
4. ⭐ [docs/architecture-testing.md](docs/architecture-testing.md): testing strategy by layer.
5. [docs/context/domain.md](docs/context/domain.md): why the project exists.
6. [docs/context/modules.md](docs/context/modules.md): the app, shared modules, packages, and per-module deep dives.
7. [docs/adrs/index.md](docs/adrs/index.md): recorded decisions.

## Before You Commit

1. Follow the rules in [rules/index.md](rules/index.md).
2. Run `pnpm lint`, `pnpm test`, and `pnpm build`.
3. Write a Conventional Commit message (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`).
