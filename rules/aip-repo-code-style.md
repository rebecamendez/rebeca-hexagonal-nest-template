# aip-repo-code-style

> Scope: repo: this template and any project generated from it.

## Context

A template is only useful if the code it produces is consistent. These rules keep every project generated from this template uniform.

## Rules

- [MUST] write code, commit messages, and documentation in English. { aip-repo-code-style.english }
- [MUST] write self-documenting code: no comments unless a decision is not obvious from the code. { aip-repo-code-style.no-comments }
- [MUST] keep TypeScript strict mode enabled and the ESLint config green. { aip-repo-code-style.strict-ts }
- [MUST] use this monorepo layout: Turborepo for orchestration, pnpm for packages. { aip-repo-code-style.monorepo }
- [MUST] pin dependencies with exact versions (`save-exact=true` in `.npmrc`); never commit a floating range. { aip-repo-code-style.fixed-versions }
- [MUST] import in this order: internal packages (`@rebeca-hexagonal-nest-template/*`), external packages, then relative imports. { aip-repo-code-style.import-order }
- [MUST] reference other packages by their `@rebeca-hexagonal-nest-template/*` name, never by relative path. { aip-repo-code-style.no-relative-packages }
- [MUST] prefer simple, concise solutions; avoid complexity that the current need does not justify. { aip-repo-code-style.simple }
- [SHOULD] run formatter and linter before committing. { aip-repo-code-style.lint }
- [SHOULD] log with meaningful context and a clear message. { aip-repo-code-style.logging }
