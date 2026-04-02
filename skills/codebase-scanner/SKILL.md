---
name: codebase-scanner
version: 1.0.0
description: >
  Comprehensive codebase analysis. Scans any directory and produces a structured
  system analysis report: project overview, tech stack, folder structure, entry
  points, code metrics, and dependency breakdown. Zero external dependencies —
  runs on native Node.js built-ins only.
metadata:
  openclaw:
    requires:
      bins: ["node"]
    skills:
      - id: codebase-scanner
        name: Codebase Scanner
        version: 1.0.0
author: rvck
tags:
  - codebase
  - analysis
  - documentation
  - system-analyst
  - architecture
---

# Codebase Scanner

## When to use

Run a codebase scan whenever you need to:
- Onboard to an unfamiliar project quickly
- Document a repository's architecture
- Audit what tech stack is in use before making changes
- Generate a structured summary for AI context or reporting
- Understand folder layout, entry points, and key dependencies at a glance
- Create system analysis documentation

## Prerequisites

- **Node.js ≥ 14** (no external dependencies)

## Usage

### Quick scan (recommended starting point)

```bash
node skills/codebase-scanner/scripts/scan.cjs
```

Scans the current working directory. Outputs: project overview, tech stack,
entry points, code metrics, dependencies, and folder structure (depth ≤ 4).

### Scan a specific directory

```bash
node skills/codebase-scanner/scripts/scan.cjs /path/to/your/project
```

### Full scan (deeper, more detail)

```bash
node skills/codebase-scanner/scripts/scan.cjs --full
```

Increases tree depth to 6, shows all dependencies, and more granular breakdowns.

### Focused scans

```bash
node skills/codebase-scanner/scripts/scan.cjs --structure   # Folder tree only
node skills/codebase-scanner/scripts/scan.cjs --stack       # Tech stack only
node skills/codebase-scanner/scripts/scan.cjs --dependencies # Dependency analysis
node skills/codebase-scanner/scripts/scan.cjs --metrics     # Code metrics only
node skills/codebase-scanner/scripts/scan.cjs --entrypoints # Entry points only
```

Flags can be combined:

```bash
node skills/codebase-scanner/scripts/scan.cjs --stack --metrics
node skills/codebase-scanner/scripts/scan.cjs /path/to/project --full --dependencies
```

### Short flags

```bash
node skills/codebase-scanner/scripts/scan.cjs -f -s -m    # full + structure + metrics
node skills/codebase-scanner/scripts/scan.cjs -j           # JSON output
```

### Machine-readable output (JSON)

```bash
node skills/codebase-scanner/scripts/scan.cjs --json
node skills/codebase-scanner/scripts/scan.cjs --full --json > report.json
```

### Custom options

```bash
node skills/codebase-scanner/scripts/scan.cjs --depth=8          # Custom tree depth
node skills/codebase-scanner/scripts/scan.cjs --exclude=tmp,data # Exclude dirs
```

## Output

The scanner produces a structured report with:

| Section | Description |
|---|---|
| 📋 Project Overview | Name, description, version, type, author, license |
| 🛠️ Tech Stack | Languages, frameworks, databases, tools, devops, runtimes, package managers |
| 🚪 Entry Points | Main files, CLI bins, npm scripts, framework layouts |
| 📊 Code Metrics | File counts, total size, line counts, language breakdown, largest files, test files |
| 📦 Dependencies | Node, Python, Go, Rust dependency summaries with full lists |
| 📁 Folder Structure | ASCII tree of the project layout |

## What is detected

### Languages (30+)
JavaScript, TypeScript, JSX, Python, Rust, Go, Java, Kotlin, Swift, C, C++,
C#, Ruby, PHP, Dart, Elixir, Haskell, Scala, Lua, Shell, PowerShell, HTML, CSS,
SCSS, LESS, Vue, Svelte, YAML, JSON, TOML, Markdown, SQL, GraphQL, Terraform, Docker

### Frameworks
**JavaScript/TypeScript:** Next.js, Nuxt, React, Vue, Svelte, Angular, SolidJS,
Astro, Remix, Gatsby, Express, Fastify, Koa, Hapi, NestJS, Hono, Elysia,
tRPC, GraphQL, Apollo, Socket.io, Electron, Tauri, React Native

**Python:** Django, Flask, FastAPI, Starlette, Tornado, aiohttp, Streamlit,
LangChain, Anthropic SDK, OpenAI SDK

### Databases & ORMs
MongoDB, PostgreSQL, MySQL, SQLite, Redis, Prisma, Drizzle, TypeORM, Sequelize,
Supabase, Firebase, PlanetScale, Convex, SQLAlchemy

### DevOps & Infrastructure
Docker, Docker Compose, GitHub Actions, GitLab CI, Jenkins, CircleCI,
Terraform, Vercel, Netlify, Fly.io, Render, Railway, Cloudflare Workers,
Serverless Framework, Kubernetes, Ansible

### Package Managers
npm, Yarn, pnpm, Bun, pip, Pipenv, Poetry, Cargo, Go Modules, Bundler, Maven, Gradle

### Tools & Build
Vite, Webpack, Rollup, Parcel, esbuild, Turbopack, TypeScript, ESLint,
Prettier, Husky, Tailwind CSS, Material UI, Chakra UI, shadcn/ui, Zod,
T3 Stack, Vitest, Jest, Mocha, Playwright, Cypress, Storybook,
Turborepo, Lerna, Nx, Anthropic SDK, OpenAI SDK, LangChain

### Entry Points
Detects `main`, `bin`, `index.{js,ts}`, `src/index.*`, `src/main.*`,
`src/app.*`, `src/server.*`, `server.*`, `app.*`, Next.js app/pages directories,
Python `main.py`/`app.py`/`manage.py`, Go `main.go`, Rust `src/main.rs`,
Dockerfile, and all `package.json` npm scripts.

## Ignored directories

The following are automatically excluded:

`node_modules`, `.git`, `dist`, `build`, `.next`, `.nuxt`, `coverage`,
`.cache`, `__pycache__`, `venv`, `.venv`, `vendor`, `target`, `bin`, `obj`,
`.terraform`, `tmp`, `logs`, `.turbo`, `out`, `Pods`, `.gradle`, `.svelte-kit`,
`.output`, `.vercel`, `.netlify`, `elm-stuff`, `_build`, `deps`, `.tox`,
`.mypy_cache`, `.pytest_cache`, `site-packages`, `eggs`, `.eggs`

## Examples

```bash
# Scan a Next.js app and get full JSON report
node skills/codebase-scanner/scripts/scan.cjs ~/projects/my-app --full --json > report.json

# Quick overview of current project
node skills/codebase-scanner/scripts/scan.cjs

# Just the tech stack and dependencies for a Python service
node skills/codebase-scanner/scripts/scan.cjs /srv/api --stack --dependencies

# Structure-only output for a monorepo
node skills/codebase-scanner/scripts/scan.cjs /repos/monorepo --structure --full

# Custom depth and exclusions
node skills/codebase-scanner/scripts/scan.cjs --depth=8 --exclude=fixtures,mocks
```

## Related skills

- `security-audit` — Scan for exposed credentials, weak configs, and vulnerabilities
- `security-monitor` — Real-time monitoring
