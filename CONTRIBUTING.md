# Contributing

Thanks for contributing to this template. The workflow follows the rules in [rules/index.md](rules/index.md).

## Branching

- Branch off `main` with a conventional prefix: `feat/...`, `fix/...`, `docs/...`, `chore/...`, `refactor/...`.
- Keep branches short-lived and delete them after the pull request is merged.

## Commits

- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`.
- Make atomic commits: one responsibility per commit.
- Add a scope when it adds context, for example `feat(api): add task search`.

## Development Workflow

1. Create a branch: `git checkout -b feat/your-change`
2. Make your change in small, tested increments.
3. Run the checks before pushing:
   ```bash
   pnpm lint
   pnpm test
   pnpm build
   ```
4. Rebase on `main` (`git pull --ff-only`) before opening the pull request.
5. Open a pull request and fill in the template in [.github/pull_request_template.md](.github/pull_request_template.md).

## Code Conventions

- Follow [rules/aip-repo-code-style.md](rules/aip-repo-code-style.md) for language, imports, and formatting.
- Follow [rules/aip-repo-architecture.md](rules/aip-repo-architecture.md) for module boundaries and contracts.
- Add tests following [rules/aip-repo-testing.md](rules/aip-repo-testing.md).

## Documentation

- Update the README only when the user-facing setup changes.
- Record architectural decisions as ADRs in [docs/adrs/index.md](docs/adrs/index.md) using the [template](docs/adrs/template.md).

## License

By contributing, you agree that your contributions are licensed under the project's MIT license.
