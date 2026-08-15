# Domain

This template demonstrates task management: a user creates tasks, lists them, updates them, and deletes them. The domain is deliberately small so the architecture is easy to follow and to copy into a real product.

## Why It Exists

The template exists to give teams a proven starting point for a NestJS backend. The task domain is the vehicle that shows how domain, application, infrastructure, and presentation layers fit together.

## Actors

- **API consumer**: the frontend or external client that calls the REST endpoints through `@rebeca-hexagonal-nest-template/api-contract`.
- **Maintainer**: the developer who extends the template and turns it into a real product.

## Rules

- Tasks belong to no owner in the current model: every consumer sees the same task list.
- A task has a title and a description. The application validates input through the contract DTOs before a task is created or updated.
- The API contract is the single source of truth for how tasks travel over the wire.

## Out of Scope

- Users, roles, and authentication.
- Projects and task ownership.
