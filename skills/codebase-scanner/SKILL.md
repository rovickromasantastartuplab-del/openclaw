---
name: repo-reverse-engineer
description: >
  Analyze a GitHub repository and produce an architecture-grade markdown report 
  that explains how the system works, including structure, persistence, APIs, 
  business logic, async flows, integrations, auth, module boundaries, and inferred 
  workflows. Use when the user wants deep codebase understanding, onboarding, 
  architecture reconstruction, legacy repo analysis, or a trustworthy system map.
metadata:
  openclaw:
    requires:
      bins: ["node"]
    skills:
      - id: repo-reverse-engineer
        name: Repo Reverse Engineer
        version: 1.0.0
author: rvck
tags:
  - codebase
  - analysis
  - architecture
  - reverse-engineering
  - system-understanding
---

# Repo Reverse Engineer

Act like a senior engineer performing static architecture forensics on a repository.
**Your job is not to inventory files. Your job is to explain how the system works.**

## Confidence Labels

Always separate:
- **fact**: directly proven from code, routes, configs, migrations, or file contents
- **strong inference**: supported by multiple aligned signals
- **weak inference**: plausible but not provable from static analysis
- **unknown**: not resolved from static analysis

Never present inference as fact.

## Workflow

### 1. Intake
- Identify repo target, branch/ref, and scan boundary
- Detect dominant languages, frameworks, runtimes, and package managers
- Locate analyzable assets: routes, models, migrations, configs, services, jobs, events, listeners

### 2. Extraction
- Collect structured facts from framework-specific sources first
- Prefer framework-native signals over generic heuristics
- For Laravel, prioritize: routes, config/auth.php, migrations, models, EventServiceProvider, service classes, console commands, jobs
- For other frameworks, degrade gracefully and say what was and was not resolved

### 3. Normalization
- Deduplicate repeated entities
- Canonicalize names and paths
- Merge repeated migration touches into one table record
- Convert arrays and objects into readable strings before rendering

### 4. Synthesis
- Identify major subsystems
- Identify persistence domains
- Reconstruct likely runtime and async flows
- Infer module boundaries and likely business workflows
- Mark every synthesized conclusion with the correct confidence label

### 5. Rendering
- Output one strict markdown report
- Never leak raw runtime artifacts such as `undefined`, `null`, or `[object Object]`
- If extraction failed, say `not resolved from static analysis` or `extraction failed`, not a placeholder

## Non-negotiable Quality Rules

**Never allow these in the final report:**
- `undefined`
- `[object Object]`
- duplicate table rows
- empty event-listener mappings with no explanation
- mixed-up auth guards and providers
- fake claims of route coverage or runtime certainty

If a section is partially supported:
- Provide the supported facts
- Label unresolved fields clearly
- Continue with best-effort synthesis without bluffing

## Required Report Structure (15 sections)

1. **Executive summary** — summarize what the system appears to be, main domains, strongest findings
2. **Repository identity and scope** — define scan boundary, ref, dominant stack, confidence note
3. **Top-level system map** — show top folders/modules and what they own
4. **Runtime entrypoints** — how the system starts, where work enters
5. **API/interface surface** — routes, handlers, middleware, external interfaces
6. **Database and persistence model** — tables, key entities, schemas, persistence domains
7. **Domain models and relationships** — code-level models and how they relate to persistence
8. **Services and business logic** — service classes and likely responsibilities
9. **Jobs, events, listeners, observers** — async and event-driven behavior
10. **Auth, permissions, tenancy** — reconstruct access model
11. **Integrations and external systems** — external APIs, queues, storage, auth providers
12. **Module boundaries and dependency map** — which parts depend on which
13. **Inferred end-to-end workflows** — reconstruct likely business workflows
14. **Risks, unknowns, and confidence boundaries** — what static analysis cannot prove
15. **Appendices** — deduplicated inventories and long-form tables

## Report Writing Rules

- Prefer concrete names over counts
- Prefer merged, deduplicated entities over raw extraction spam
- Explain **what exists** and **how it likely works together**
- Use short evidence labels inline, e.g.:
  - `fact: route found in routes/web.php`
  - `strong inference: service + job + model names suggest async lead enrichment`
- Explicitly call out sub-applications or embedded systems when present
- If framework support is partial, say so in the report

## Laravel-Specific Expectations

When analyzing Laravel, resolve all of:
- Route → controller → middleware surface
- Migrations → tables → columns → foreign keys
- Model → table → fillable/guarded/casts → relationships
- EventServiceProvider event → listener mapping
- Jobs, console commands, notifications, mailables
- Auth guards/providers/password brokers from config/auth.php
- Services and likely responsibilities
- Subsystem boundaries across app/, modules/, packages/, or embedded sub-app folders

If some cannot be resolved, state exactly which ones failed and why.

## Auto-Save and Discord Delivery

After every scan:
1. Save report to `{project-name}-scan-{YYYY-MM-DD}.md` in project root
2. Copy to workspace `/root/.openclaw/workspace/`
3. Send to Discord so user can download directly

## Usage

```bash
node skills/codebase-scanner/scripts/scan.cjs --deep /path/to/project
node skills/codebase-scanner/scripts/scan.cjs --deep https://github.com/user/repo
node skills/codebase-scanner/scripts/scan.cjs --deep --full /path/to/project
```

## Validator

Run `scripts/validate_report.py` on generated markdown reports when possible.
Treat validator failures as report-quality bugs to fix.

## Goal

The report should feel like it was written by a capable staff engineer onboarding into the repo:
accurate, explicit, skeptical, and useful.