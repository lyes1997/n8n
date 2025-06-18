# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

n8n is a workflow automation platform built as a TypeScript monorepo. It provides both visual workflow editing and code-based automation with 400+ integrations, AI capabilities, and enterprise features.

## Development Commands

### Core Development
```bash
pnpm dev              # Start all services (backend + frontend)
pnpm dev:be           # Backend only (Express API + worker)
pnpm dev:fe           # Frontend only (Vue.js editor)
pnpm dev:ai           # AI/LangChain node development
```

### Building
```bash
pnpm build            # Build all packages
pnpm build:backend    # Build backend services only
pnpm build:frontend   # Build Vue.js frontend only
pnpm build:nodes      # Build integration nodes
```

### Testing
```bash
pnpm test             # Run all tests
pnpm test:backend     # Jest tests (backend)
pnpm test:frontend    # Vitest tests (frontend)
pnpm test:nodes       # Node integration tests
pnpm dev:e2e          # Cypress E2E tests
```

### Code Quality
```bash
pnpm lint             # ESLint all packages
pnpm lintfix          # Auto-fix linting issues
pnpm format           # Biome code formatting
pnpm typecheck        # TypeScript validation
```

## Architecture Overview

### Monorepo Structure
- **packages/cli/** - Main n8n server (Express.js, TypeORM)
- **packages/core/** - Workflow execution engine
- **packages/frontend/editor-ui/** - Vue.js 3 workflow editor
- **packages/nodes-base/** - 400+ integration nodes
- **packages/workflow/** - Workflow definition and execution logic
- **packages/@n8n/*** - Shared utilities, types, and configurations

### Key Technologies
- **Backend**: Node.js 22+, TypeScript 5.8, Express.js 5, TypeORM
- **Frontend**: Vue.js 3, Pinia, Vite 6, Element Plus
- **Database**: SQLite/PostgreSQL/MySQL support
- **Testing**: Jest (backend), Vitest (frontend), Cypress (E2E)
- **Tooling**: pnpm, Turbo, Biome, ESLint

### Enterprise Features
All enterprise features have been made freely available without license restrictions. Files with `.ee.` suffix (SAML, LDAP, RBAC, source control, variables, external secrets, etc.) are now accessible without licensing checks.

### Node Development
- Custom nodes go in **packages/nodes-base/nodes/**
- Credentials in **packages/nodes-base/credentials/**
- Use **packages/node-dev/** tooling for development
- Follow the plugin architecture pattern with TypeScript decorators

### Database Layer
- TypeORM entities in **packages/@n8n/db/entities/**
- Migrations in **packages/cli/src/databases/migrations/**
- Support for SQLite (development) and PostgreSQL/MySQL (production)

### Event System
The codebase uses an event-driven architecture with typed events. Look for EventBus usage and custom event definitions in **packages/core/**.

### Testing Patterns
- Unit tests alongside source files or in **__tests__/** directories
- Integration tests in **test/** directories at package level
- E2E tests in **cypress/** using workflow scenarios
- Use factories and mocks extensively for workflow testing

### TypeScript Configuration
- Shared configs in **packages/@n8n/typescript-config/**
- Strict mode enabled with custom ESLint rules
- Heavy use of decorators and dependency injection patterns