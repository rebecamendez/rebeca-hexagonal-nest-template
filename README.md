# 🎯 rebeca-hexagonal-nest-template

> [!NOTE]
> This is a template repository that evolved from a personal project. It provides a foundation for building scalable applications using NestJS and Hexagonal Architecture. Feel free to use this template as a starting point for your own projects!

A template for building scalable and maintainable applications using NestJS, TypeScript, and Hexagonal Architecture. This template evolved from a personal project and incorporates best practices for sustainable code development.

## 🏗️ Project Structure

```
rebeca-hexagonal-nest-template/
├── 📦 packages/           # Shared packages
│   └── 📝 api-contract/  # API contracts
├── 🚀 apps/              # Applications
│   └── 🔧 api/          # Backend (NestJS)
├── ⚙️ .github/          # GitHub Actions
└── 📜 scripts/          # Utility scripts
```

## 🎯 Purpose

This template provides a foundation for building applications with:
- 🏗️ Hexagonal Architecture (Ports & Adapters)
- 📦 Clean Code principles
- 🔄 SOLID principles
- 🧪 Test-driven development
- 📝 Clear documentation practices

## 🚀 Quick Start

From root repository folder

1. Install dependencies:
```bash
nvm use  # Uses version from .nvmrc
pnpm install
```

### 🐳 Docker Setup

1. Initialize Docker environment:
```bash
pnpm docker:init  # Copies docker-compose.yml.example to docker-compose.yml
```

2. Start services:
```bash
pnpm docker:start
```

### 🔧 API Setup

1. Initialize development environment:
```bash
pnpm dev:init  # Creates .env file and runs database migrations
```

2. Start development server:
```bash
pnpm dev
```

📚 API documentation available at http://localhost:3000/api/  
📁 Bruno collection available in `apps/api/bruno/`

## 📚 Documentation

### Architecture Decisions
We document architectural decisions using Architecture Decision Records (ADRs). Each ADR includes:
- Problem context and statement
- Decision rationale
- Consequences and trade-offs
- Implementation details

See our [ADR Index](doc/adr/index.md) for a complete list of architectural decisions.

## 🛠️ Development

### Tech Stack
- Node.js (version in `.nvmrc`)
- PNPM package manager
- TypeScript with strict mode
- NestJS backend framework
- PostgreSQL database

### Development Guidelines
- Follow TypeScript best practices
- Maintain strict type safety
- Write meaningful logs
- Keep code clean and documented
- Follow hexagonal architecture principles

## 🎮 Available Scripts

### Development Scripts
- `pnpm dev` 🚀 - Development server
- `pnpm build` 🏗️ - Project build
- `pnpm test` 🧪 - Test suite
- `pnpm lint` 🔍 - Code linting
- `pnpm format` ✨ - Code formatting

### Docker Scripts
- `pnpm docker:init` 🐳 - Docker environment setup
- `pnpm docker:start` 🚀 - Docker services

> 💡 See package-specific READMEs for additional scripts

## 👷‍♀️ TODO
- Doppler support
- Dockerfile for API
- Structurizr Doc
- Sample Domain Diagram
- Improve dependency-cruiser rules
- Feature flags support
- Instrumentation support
- Monitoring support (Datadog / New Relic)
- Deploy support 
- ...

## 📄 License

This project is licensed under the MIT License. This means:

- ✅ You can use, modify, and distribute the code
- ✅ You can use it for commercial purposes
- ✅ You can create derivative works
- ✅ You can use it privately
- ✅ You only need to include the original copyright and license notice

See [LICENSE](LICENSE) for full details.
