# aip-repo-testing-bdd

> Scope: repo: this template and any project generated from it.

## Context

Specs are living documentation. Writing them as BDD sentences ("given X, when Y, should Z") in business language, with the expected HTTP status, makes each scenario readable and keeps the suite consistent across layers. The decision is recorded in [ADR-0005](../docs/adrs/0005-bdd-testing-convention.md).

## Rules

- [MUST] name the outer `describe` after the subject under test, without a leading article: `describe('Task controller', ...)`. { aip-repo-testing-bdd.subject }
- [MUST] state the precondition in a `describe('given <context>', ...)` block when the scenario has one. { aip-repo-testing-bdd.given }
- [MUST] wrap every scenario in a `describe('when <action>', ...)` block, even when it has a single test. { aip-repo-testing-bdd.when }
- [MUST] write every test as `it('should <outcome>', ...)`, describing the expected behavior. { aip-repo-testing-bdd.should }
- [MUST] write test names in business language: describe what the domain delivers, not the technical mechanics. { aip-repo-testing-bdd.business-language }
- [MUST] include the expected HTTP status in the `it` name of presentation and e2e tests, in the format `(201 Created)`. { aip-repo-testing-bdd.status-code }
- [MUST] in e2e specs, name the outer `describe` after the HTTP endpoint (`describe('GET /tasks (e2e)', ...)`) and write the whole scenario in business language, never naming the controller. { aip-repo-testing-bdd.e2e-endpoint }
- [MUST] test behavior, not implementation: exercise the public entry point (use case `execute()`, controller method, HTTP endpoint) and assert the observable outcome, never internals such as private methods, collaborators, or SQL. { aip-repo-testing-bdd.behavior }
- [MUST] keep test descriptions in English. { aip-repo-testing-bdd.english }
- [SHOULD] not repeat the action inside the `it` name; the `when` block already carries the context. { aip-repo-testing-bdd.no-repetition }
