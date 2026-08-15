# Rules index

A quick map of every rule and when it applies. This is the only gateway to `rules/`. The global and scoped rules come from the [ai-principles](https://github.com/rebecamendez/ai-principles) repository.

## Rule stack

1. Global: always apply.
2. Scoped: apply only when the project matches the declared scope.
3. Repo: this project's own rules, defined in this folder. They win over global and scoped rules.

## Global rules

Applied from the user-level rules directory, outside this repository.

| Rule | What it covers |
|---|---|
| aip-global-git | Conventional Commits, branches, safe integration |
| aip-global-documentation | README, ADRs, writing style |

## Scoped rules that apply here

| Rule | Scope | What it covers |
|---|---|---|
| aip-scoped-typescript | typescript | strict TypeScript, explicit types |
| aip-scoped-bash | bash | safe shell scripts (`set -euo pipefail`) |

## Repo rules

| Rule | What it covers |
|---|---|
| [aip-repo-code-style](aip-repo-code-style.md) | language, imports, monorepo conventions |
| [aip-repo-architecture](aip-repo-architecture.md) | hexagonal layers, shared contracts, ADRs |
| [aip-repo-testing](aip-repo-testing.md) | testing strategy and requirements |

## How to add a rule

1. Add a prefixed file `aip-<repo>-<topic>.md`.
2. Link it in this index.
3. Point to it from [AGENTS.md](../AGENTS.md).
