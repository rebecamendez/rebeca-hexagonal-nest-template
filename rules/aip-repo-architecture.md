# aip-repo-architecture

> Scope: repo: this template and any project generated from it.

## Context

The template implements a modular monolith with hexagonal architecture. Keeping the boundaries honest is what makes the code testable and the infrastructure replaceable.

## Rules

- [MUST] keep modules self-contained: each feature module owns its `domain`, `application`, `infrastructure`, and `presentation` folders. { aip-repo-architecture.module-structure }
- [MUST] keep the domain layer pure: no framework imports, no database concerns. { aip-repo-architecture.pure-domain }
- [MUST] define ports (interfaces) in the `application` layer and implement them with adapters in `infrastructure`. { aip-repo-architecture.ports-adapters }
- [MUST] use `@rebeca-hexagonal-nest-template/api-contract` for every API request and response; never define DTOs in the app that duplicate the contract. { aip-repo-architecture.shared-contracts }
- [MUST] go through NestJS dependency injection for every wiring; no service locators or manual singletons. { aip-repo-architecture.dependency-injection }
- [MUST] record architectural decisions as ADRs in `docs/adrs/` following the [template](../docs/adrs/template.md). { aip-repo-architecture.adr }
- [MUST] keep diagram sources in `docs/architecture-diagrams/`. { aip-repo-architecture.diagrams }
- [SHOULD] map entities to domain objects at the repository boundary; do not leak entities outside `infrastructure`. { aip-repo-architecture.anti-corruption }
