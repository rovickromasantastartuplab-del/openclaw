---
name: codebase-scanner
version: 3.0.0
description: >
  Exhaustive system reverse-engineering for software repositories. Produces a strict 
  markdown report that explains HOW the system works, not just what files exist.
  Best for: codebase onboarding, architecture documentation, database/API mapping,
  auth/permission analysis, event/job tracing, integration discovery, module boundaries,
  and request/data flow reconstruction across any framework.
metadata:
  openclaw:
    requires:
      bins: ["node"]
    skills:
      - id: codebase-scanner
        name: Codebase Scanner
        version: 3.0.0
author: rvck
tags:
  - codebase
  - analysis
  - documentation
  - system-analyst
  - architecture
  - reverse-engineering
---

# Codebase Scanner (System Understanding)

Produce a report that helps an engineer understand HOW a system works after scanning its codebase.

**This is not a pretty overview. This is reverse-engineering.**

## Operating Stance

Work like a careful staff engineer doing technical discovery.

### Priorities, in order:
1. Gather direct evidence from the repository
2. Enumerate real artifacts before summarizing them
3. Connect artifacts into flows, ownership boundaries, and runtime behavior
4. Mark every non-trivial conclusion as either **fact**, **strong inference**, or **weak inference**
5. Never present speculation as fact

### Never say:
- "fully understands"
- "complete end-to-end certainty"
- "all workflows are covered"
- "supports every framework equally well"

Instead, state coverage honestly. If something cannot be proven, say so.

## Evidence Labels

Use these labels everywhere they matter:

- **fact**: directly supported by code, configuration, schema, routes, imports, tests, or generated build/runtime files
- **strong inference**: strongly implied by multiple pieces of evidence, but not explicitly stated in one place
- **weak inference**: plausible interpretation with limited evidence

### Examples:
- `fact: routes/api.php registers POST /payments/webhook to WebhookController@handle`
- `strong inference: the billing module is tenant-scoped because middleware, model fields, and query filters all reference tenant identifiers`
- `weak inference: this service may be legacy because it is imported nowhere and has no route, job, listener, or test references`

## Accepted Inputs

Support these inputs:
- GitHub repository URL or connected GitHub repository
- Local project directory
- Uploaded repository zip or extracted code folder
- A specific branch, subdirectory, or commit when the user provides one

## Output Contract

**Default output: exhaustive markdown report**

The report must help a reader answer:
- What is this system made of?
- What are the important modules and responsibilities?
- How does data move through the system?
- What is the database model?
- How do requests enter and get processed?
- What background work happens asynchronously?
- How do auth, permissions, and integrations work?
- What is proven versus inferred?

**Must include an executive summary**, but do not let it replace the exhaustive sections.

## Analysis Workflow

### 1. Intake and Boundary Setting
Determine:
- Source of truth for the scan
- Branch, ref, or directory being scanned
- Dominant languages and frameworks
- Whether the repo is monolithic, modular monorepo, or multi-app

If the repo is very large, still provide complete report for the most important system surfaces first.

### 2. Structural Inventory
Enumerate:
- Top-level directories
- Major apps or packages
- Entrypoints
- Build files
- Dependency manifests
- Infrastructure and deployment files
- Test directories
- Config directories

### 3. Runtime Surface Mapping
Map all runtime entry surfaces:
- HTTP routes and controllers
- GraphQL schemas and resolvers
- CLI commands
- Scheduled jobs
- Queue workers and async consumers
- Event handlers and listeners
- Cron and background automation
- Webhooks
- Frontend entrypoints and route trees

### 4. Persistence Model Reconstruction
Reconstruct the data layer:
- Tables, columns, types, nullability, defaults
- Foreign keys, indexes, unique constraints
- ORM models and relationships
- Schema migrations chronology
- Seeders and fixtures when they reveal real workflows
- Lifecycle transitions across entities when provable

### 5. Request and Data Flow Reconstruction
For important workflows, trace the path across layers:
- Entry surface → controller/handler → validation → service/domain action → model/database write → events/jobs/notifications → external calls → response

### 6. Cross-Cutting System Analysis
Inspect and report:
- Authentication and authorization
- Roles and permissions
- Tenancy and account scoping
- Configuration and environment variables
- Feature flags
- Caching
- Error handling
- External integrations and SDK usage

### 7. Architecture Judgment
Write architecture observations with evidence labels:
- Module boundaries
- Dominant patterns (MVC, service layer, CQRS, event-driven, repository pattern)
- Tight coupling or god objects
- Dead or likely stale areas
- Operational risks

## Framework Coverage

Adapt the scan to the ecosystem:

| Framework | Inspect |
|-----------|---------|
| Laravel | routes, controllers, middleware, requests, service providers, eloquent models, migrations, jobs, events, listeners, notifications, policies, commands |
| Express/Fastify | route registration, middleware chains, handlers, service modules, env usage |
| Next.js | app router, pages router, api handlers, server actions, middleware, config, frontend route structure |
| Django | urls, views, serializers, models, migrations, management commands, celery |
| Rails | routes, controllers, models, migrations, active job, concerns, initializers |
| Go | main packages, router setup, handlers, services, repositories, structs, interfaces |
| Monorepo | packages, apps, workspace boundaries, shared libraries, build graph |

## Required Report Structure

Use this section order exactly:

```markdown
# {project name} — system understanding report

> scanned source: {repo url or path}
> scanned ref: {branch, commit, or unknown}
> scan mode: exhaustive markdown report
> confidence note: {1-3 sentence honesty statement}

## executive summary

## repository identity and scope

## top-level structure

## runtime entrypoints

## api and interface surface

## database and persistence model

## auth, permissions, and tenancy

## services, jobs, events, and automation

## integrations and external dependencies

## important end-to-end flows

## module boundaries and dependency map

## frontend and backend interaction

## configuration and environment

## testing and operational signals

## architecture observations

## unknowns and confidence boundaries

## appendices
```

## Formatting Rules

### Do:
- Use markdown tables for scanability
- Enumerate ONE real artifact per row
- Write file paths, class names, route paths exactly

### Don't:
- Write "many controllers" — write actual controller names
- Write "multiple tables" — write actual table names
- Write "several services" — write actual service names

### Good:
- `InvoiceController`
- `POST /api/invoices`
- `users`, `workspaces`, `memberships`

### Bad:
- "billing-related controllers"
- "invoice endpoints exist"
- "there are user tables"

## Inference Rules

When reconstructing behavior:
- Cite specific evidence sources in plain language
- Explain why the conclusion follows
- Downgrade confidence when evidence is partial

## Failure Behavior

If a section cannot be completed:
1. Say exactly what was inspected
2. Say what evidence was missing
3. Provide the best partial report without inventing artifacts
4. Keep the output useful

**Never fabricate:**
- routes
- tables
- relationships
- services
- job behavior
- architecture patterns
- integration details

## Auto-Save and Discord Delivery

After every scan:
1. Save report to `{project-name}-scan-{YYYY-MM-DD}.md` in project root
2. Copy to workspace `/root/.openclaw/workspace/`
3. Send to Discord so user can download directly

## Usage

### Scan a repository
```bash
node skills/codebase-scanner/scripts/scan.cjs --deep /path/to/project
```

### Scan GitHub repository
```bash
node skills/codebase-scanner/scripts/scan.cjs --deep https://github.com/user/repo
```

### Full exhaustive scan
```bash
node skills/codebase-scanner/scripts/scan.cjs --deep --full /path/to/project
```

### Quick scan (less thorough)
```bash
node skills/codebase-scanner/scripts/scan.cjs /path/to/project
```

## Output

The scanner produces a markdown report following the required structure above, with:
- Evidence-labeled conclusions (fact/strong inference/weak inference)
- Exhaustive enumeration of real artifacts
- Executive summary
- Confidence boundaries
- Appendices with full inventories