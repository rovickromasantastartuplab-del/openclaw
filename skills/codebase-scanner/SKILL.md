---
name: codebase-scanner
version: 2.0.0
description: >
  Comprehensive codebase analysis with deep analysis modules. Scans any directory
  and produces a structured system analysis report: project overview, tech stack,
  folder structure, entry points, code metrics, dependency breakdown, API endpoints,
  database schema, environment variables, architecture patterns, authentication,
  events, services, and module boundaries. Zero external dependencies — runs on
  native Node.js built-ins only.
metadata:
  openclaw:
    requires:
      bins: ["node"]
    skills:
      - id: codebase-scanner
        name: Codebase Scanner
        version: 2.0.0
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

### Deep analysis

```bash
node skills/codebase-scanner/scripts/scan.cjs --deep
node skills/codebase-scanner/scripts/scan.cjs --deep --stack --metrics /path/to/project
```

The `--deep` flag enables 10 deep analysis modules that extract real data from the codebase.
Automatically sets `--full` mode (depth 6). Works best with Laravel/PHP projects but supports
Express, Next.js, Django, Rails, and Go projects too.

```bash
# Deep scan with JSON output
node skills/codebase-scanner/scripts/scan.cjs --deep --json > deep-report.json

# Deep scan of a Laravel CRM
node skills/codebase-scanner/scripts/scan.cjs --deep /path/to/laravel-project
```

## Output

The scanner produces a structured report with:

### Basic Output

| Section | Description |
|---|---|
| 📋 Project Overview | Name, description, version, type, author, license |
| 🛠️ Tech Stack | Languages, frameworks, databases, tools, devops, runtimes, package managers |
| 🚪 Entry Points | Main files, CLI bins, npm scripts, framework layouts |
| 📊 Code Metrics | File counts, total size, line counts, language breakdown, largest files, test files |
| 📦 Dependencies | Node, PHP/Composer, Python, Go, Rust dependency summaries with full lists |
| 📁 Folder Structure | ASCII tree of the project layout |

### Deep Output (`--deep`)

| Section | Description |
|---|---|
| 🌐 API Endpoints | All HTTP routes with method, path, controller, action, middleware |
| 🗄️ Database Schema | Migration tables with columns (name, type, nullable, default), foreign keys, indexes, Eloquent models with relationships |
| 🔧 Environment Variables | All env vars from .env.example and code scans (process.env, env()) with usage locations |
| 🏗️ Architecture Patterns | Detected patterns: MVC, Service Layer, Event-Driven, Observer, RBAC, Multi-Tenancy, etc. |
| 🔐 Authentication | Auth mechanism (Sanctum, Passport, JWT, session), guards, providers, middleware |
| 📄 Key File Summaries | Entry points, configs, base classes summarized with methods, imports, namespaces |
| ⚡ Event System | Events, Listeners, Jobs, Observers, Notifications, Mail classes with event→listener mapping |
| ⚙️ Configuration | Config files parsed with top-level keys and env() variable defaults |
| 🔌 Service Layer | Services with methods, constructor dependencies, imports, responsibility descriptions |
| 🧩 Module Boundaries | Module dependency graph showing how app/ subdirectories connect |

## Deep Analysis Modules

When `--deep` is enabled, the scanner runs these 10 modules:

### 1. 🌐 API Endpoint Map
Scans route files for all HTTP endpoints. Extracts method, path, controller, action, and middleware.
- **Laravel:** Parses `Route::get()`, `Route::post()`, `Route::resource()`, `Route::apiResource()`, `Route::group()`, `Route::prefix()`, `Route::middleware()` with group nesting and inline middleware
- **Express/Fastify:** Parses `router.get()`, `app.post()`, etc.
- **Next.js:** Detects exported `GET`, `POST`, etc. from `app/api/` and `pages/api/` route handlers
- **Go:** Parses `http.HandleFunc`, Gin/Echo/Chi route registrations
- Also parses all Controllers with their public methods

### 2. 🗄️ Database Schema
Parses migration files to extract the complete database structure.
- **Laravel:** Parses `Schema::create()`, `Schema::table()`, column definitions (`$table->string()`, `$table->integer()`, etc.), nullable, defaults, foreign keys (`foreignId()->constrained()`), indexes
- Extracts all Eloquent models with `$fillable`, `$guarded`, `$casts`, `$table`, and relationships (`hasMany`, `belongsTo`, `hasOne`, `belongsToMany`, `morphTo`, `morphMany`)

### 3. 🔧 Environment Variables
Scans for all environment variables used across the project.
- Parses `.env.example`, `.env.sample`, `.env.template` for defined variables
- Scans all PHP files for `env('KEY')` calls with default values
- Scans JS/TS files for `process.env.KEY` references
- Reports each variable with its example value, source file, and usage locations

### 4. 🏗️ Architecture Patterns
Detects architectural patterns from directory structure and code:
- MVC (Model-View-Controller)
- Service Layer
- Event-Driven Architecture
- Observer Pattern
- Repository Pattern
- Job Queue / Async Processing
- Multi-Tenancy (package-based and company-scoped)
- Role-Based Access Control (RBAC)
- Modular Architecture
- REST API
- SPA Frontend

### 5. 🔐 Authentication Flow
Identifies the authentication mechanism and configuration:
- Detects Sanctum, Passport, JWT, Session auth from composer dependencies
- Extracts all auth guards and providers from `config/auth.php`
- Lists auth-related middleware
- Checks for social auth (Socialite), email verification, impersonation, API tokens

### 6. 📄 Key File Summaries
Reads and summarizes the most important files:
- Entry points (artisan, public/index.php, routes)
- Configuration files (composer.json, package.json)
- Base classes (BaseModel, BaseController, BaseAuthenticatable)
- Service providers
- Build configs (vite.config.ts, tsconfig.json)
- Extracts class names, namespaces, public methods, key imports, and brief excerpts

### 7. ⚡ Event System
Maps the complete event-driven architecture:
- **Events:** Lists all event classes with properties
- **Listeners:** Maps listeners to their handled events
- **Jobs:** Queue jobs with queue name, tries, timeout
- **Observers:** Eloquent observers with lifecycle events (creating, updating, deleting, etc.)
- **Notifications:** Laravel notification classes
- **Mail:** Mailable classes
- **Event→Listener Map:** Parsed from `EventServiceProvider::$listen`

### 8. ⚙️ Configuration
Summarizes all configuration files:
- Lists top-level config keys per file
- Extracts all `env()` calls with their default values
- Shows config file sizes for complexity assessment

### 9. 🔌 Service Layer Map
Identifies services and their responsibilities:
- Public methods with parameters
- Constructor-injected dependencies
- Key imports (non-framework dependencies)
- Docblock responsibility descriptions
- Supports nested service directories (e.g., `Services/Omnichannel/`)

### 10. 🧩 Module Boundaries
Maps how different parts of the system connect:
- Lists all `app/` subdirectories as modules with file counts
- Scans `use` statements to detect cross-module dependencies
- Builds a dependency graph (who depends on whom)
- Identifies most-depended-on modules
- Treats `help/` subdirectory as a separate sub-application

## Supported Frameworks

| Framework | Basic | Deep |
|---|---|---|
| **Laravel** | ✅ Full | ✅ Full (routes, migrations, models, events, services, etc.) |
| **Express/Fastify/Koa** | ✅ Full | ⚡ Routes, env vars |
| **Next.js** | ✅ Full | ⚡ API routes, env vars |
| **Django** | ✅ Full | ⚡ Basic (urls, models) |
| **Rails** | ✅ Full | ⚡ Basic (routes, models) |
| **Go** | ✅ Full | ⚡ HTTP handlers |
| **Any Node.js** | ✅ Full | ⚡ Env vars, config |
| **Any Python** | ✅ Full | — |
| **Any Rust/Go** | ✅ Full | — |

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

# Deep analysis of a Laravel CRM
node skills/codebase-scanner/scripts/scan.cjs --deep /path/to/laravel-crm

# Deep analysis with JSON for programmatic consumption
node skills/codebase-scanner/scripts/scan.cjs --deep --json /path/to/project > deep-report.json

# Deep + specific flags (stack and metrics only, plus deep)
node skills/codebase-scanner/scripts/scan.cjs --deep --stack --metrics /path/to/project
```

## Related skills

- `security-audit` — Scan for exposed credentials, weak configs, and vulnerabilities
- `security-monitor` — Real-time monitoring
