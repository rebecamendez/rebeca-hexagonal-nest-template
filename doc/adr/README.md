# Architecture Decision Records (ADRs) 📚

## What are ADRs? 🤔

ADRs are documents that capture important architectural decisions, including:
- The context and problem being solved
- The decision made and its rationale
- The consequences of the decision
- Relevant references

## Folder Structure 📁

```
doc/adr/
├── README.md           # This file
├── [index.md](./index.md)           # Index of all ADRs
├── template.md        # Template for new ADRs
└── 0001-api-architecture.md
```

## ADR Categories 🏷️

ADRs are organized into three categories:

1. **Backend ADRs** 🏗️
   - Decisions related to server architecture
   - Design patterns, frameworks, databases, etc.

2. **Frontend ADRs** 🎨
   - Decisions related to client architecture
   - Frameworks, libraries, UI/UX patterns, etc.

3. **Transversal ADRs** 🔄
   - Decisions affecting the entire project
   - Monorepo structure, shared contracts, etc.

## ADR Creation Process 📝

1. Identify the need to document an architectural decision
2. Create a new ADR using the template in `template.md`
3. Document the decision following the established guidelines
4. Review with the team
5. Update status when accepted
6. Keep updated if the decision changes

## Guidelines for Writing ADRs ✍️

- Focus on significant architectural decisions
- Include code examples when relevant
- Document both positive and negative consequences
- Maintain a technical but accessible tone
- Use emojis for better readability
- Include references to external documentation when needed

## Maintenance 🔧

- Periodically review ADRs to ensure relevance
- Update status when decisions change
- Keep the index updated
- Ensure code examples remain valid

## All ADRs 📋

All architectural decisions are documented and organized in our [index](./index.md). Here you'll find:

- Complete list of all ADRs
- Current status of each decision
- Categories (Backend, Frontend, Transversal)
- Links to detailed documentation
- Last update dates

Each ADR is marked with ⭐ if it represents a fundamental architectural decision that defines our system's core structure.

## Useful References 📚

- [ADR GitHub](https://github.com/joelparkerhenderson/architecture-decision-record)
- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) 
