# ADR-0002: Git Workflow

## Status

Accepted

## Context

The team needs a clear workflow for branches, commits, and reviews so the history stays readable and integration stays safe.

## Decision

Use trunk-based development with strict branch and commit discipline.

### Branch Management

- Work on `main` as the only long-lived branch.
- Create short-lived branches for every change, named with a conventional prefix: `feat/...`, `fix/...`, `chore/...`, `docs/...`, `refactor/...`.
- Never commit directly to `main`; integrate through a pull request.
- Keep branches short-lived and delete them after merge.

### Commits

- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`.
- Add a scope when it adds context, for example `feat(auth): add login endpoint`.
- Make atomic commits: one responsibility per commit.
- Prefer small, frequent commits over one large commit.

### Integration

- Rebase feature branches on `main` before merging and integrate with fast-forward, avoiding merge commits.
- Pull with `git pull --ff-only` to keep history linear.

### Continuous Integration

- Every pull request runs `.github/workflows/pr-verify.yml` with type checking, linting, tests, build, and a dependency audit.
- Turborepo runs the checks in parallel with caching.

### Cache Strategy

- A single cache is maintained from `main` only, through `.github/workflows/cache-main.yml`.
- All branches and PRs restore the same cache and never modify it.
- The cache key is `${{ runner.os }}-main-cache-${{ hashFiles('**/pnpm-lock.yaml') }}`, and it updates on pushes to `main`.

### Code Review

- Every pull request uses the template in `.github/pull_request_template.md`, which asks for context, manual testing steps, and breaking changes.

## Consequences

### Positive

- Fast development cycle with automated quality checks.
- Linear, readable history.
- Standardized reviews.

### Negative

- Strict branch and commit discipline is required.
- Cache maintenance adds a small operational overhead.
