# ADR-0005: BDD Test Naming Convention

## Status

Accepted

## Context

Specs double as living documentation: developers, reviewers, and new joiners read test names to understand behavior. The existing suite mixed naming styles — `describe('The CreateTask use case', ...)`, `describe('A Task controller', ...)`, and bare top-level `it` blocks — so a spec did not reveal the scenario structure at a glance. A consistent, behavior-focused naming convention keeps the suite uniform across every layer (presentation, application, infrastructure, e2e).

## Decision

Adopt a BDD naming convention without adding a library. Structure every spec as a sentence that reads "given X, when Y, should Z":

- `describe('<subject>')` names the unit under test, without a leading article.
- `describe('given <context>')` states the precondition of the scenario.
- `describe('when <action>')` states the scenario being exercised.
- `it('should <outcome>')` states the expected behavior.

Test names use business language — what the domain delivers, not the technical mechanics — and presentation and e2e tests append the expected HTTP status between parentheses. E2e specs name the outer `describe` after the endpoint and never mention the controller:

```typescript
describe("GET /tasks (e2e)", () => {
  describe("given tasks exist in the system", () => {
    describe("when a client requests the task list", () => {
      it("should return all tasks (200 OK)", async () => {
        // ...
      });
    });
  });
});
```

Presentation specs follow the same shape with the controller as subject:

```typescript
describe("Task controller", () => {
  describe("given an existing task", () => {
    describe("when viewing a task", () => {
      it("should return the task (200 OK)", async () => {
        // ...
      });
    });
  });
});
```

Every test asserts behavior, not implementation: it goes through the public entry point — the use case `execute()`, the controller method, or the HTTP endpoint — and checks the observable outcome, never internals such as private methods, collaborators, or SQL.

The convention is recorded as a repo rule in [aip-repo-testing-bdd](../rules/aip-repo-testing-bdd.md) and this ADR.

### Alternatives Rejected

- **jest-bdd / gherkin-style helpers:** adds a dependency and a larger migration for the same readability gain; the naming convention alone is enough.
- **Bare top-level `it` blocks:** readable for single-behavior units, but inconsistent once a unit has several scenarios.

### Implementation Details

- Rewrite the eight specs under `apps/api/src/modules/tasks/` to the convention.
- Regenerate the snapshots for the repository, controller, and e2e specs, since snapshots embed the test names.
- Update the golden samples in [architecture-testing.md](../architecture-testing.md).

## Consequences

### Positive

- Specs read as behavior sentences, so they document the system.
- Tests assert behavior through the public contract, so refactoring internals does not break them.
- Uniform scenario structure across layers makes review and onboarding easier.
- No new dependency.

### Negative

- Renaming tests invalidates existing snapshots (one-time churn).
- Two nested `describe` blocks add nesting to small specs; accepted for consistency.

## References

- [ADR-0003: Testing Strategy](0003-testing-strategy.md)
- [aip-repo-testing-bdd](../rules/aip-repo-testing-bdd.md)
- [Architecture Testing](../architecture-testing.md)

---

Last updated: 2026-08-15
