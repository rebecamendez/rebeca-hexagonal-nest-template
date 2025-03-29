# ADR 0002: Git Workflow 🔄

## Status
Accepted ✅

## Context
We need to establish a clear strategy for transversal project development, focusing on:
- Branch management 🌿
- CI/CD process 🚀
- Cache strategy 💾
- Code review process 👀

## Decision
We implement the following strategies:

### 1. Branch Management (Trunk Based Development) 🌳
- Single `main` branch for development
- Feature branches for PRs only
- No long-lived branches
- Direct PRs to `main`

### 2. CI/CD 🔄
- Automated PR checks via `.github/workflows/pr-verify.yml`
- Checks include:
  - Type checking & linting
  - Tests & build
  - Dependency audit
- Turborepo for parallel execution & caching

### 3. Cache Strategy 💾
- Single cache strategy managed by `.github/workflows/cache-main.yml`
- Cache behavior:
  - Only `main` branch can update the cache
  - All branches and PRs use the same cache from `main`
  - Cache is updated only when changes are pushed to `main`
  - No branch-specific caches are created
  - No additional caching mechanisms used
- Cached items:
  - pnpm dependencies (`~/.pnpm-store`)
  - Turborepo cache (`.turbo` and `node_modules/.cache/turbo`)
  - node_modules
- Cache key: `${{ runner.os }}-main-cache-${{ hashFiles('**/pnpm-lock.yaml') }}`
- Auto-updates on `main` pushes
- Manual trigger available via workflow_dispatch
- PRs and branches can only restore the cache, not modify it

### 4. Code Review Process 👀
- Standard PR template with:
  - Change context
  - Testing steps
  - Important warnings
  - Optional details

## Consequences
### Positive ✨
- Faster development cycle
- Automated quality checks
- Standardized reviews
- Optimized CI/CD

### Negative ⚠️
- Strict branch discipline required
- Cache maintenance needed
- Initial setup overhead 
