# Crafter Workflow — Design Documentation

Design and implementation reference for the first-party **`crafter-workflow`** database and service layer inside the Studio plugin (`org.rd.plugin.crafterwf`).

These documents describe **what** the system does and **how** it is structured. **All diagrams use [Mermaid](https://mermaid.js.org/).**

| UI | Screenshot |
|----|------------|
| Kanban board (authors) | [workflow-kanban-board.png](./images/workflow-kanban-board.png) |
| Flow editor (admins) | [workflow-flow-editor.png](./images/workflow-flow-editor.png) |

## Documents

| Document | Description |
|----------|-------------|
| [CANONICAL_MODEL.md](./CANONICAL_MODEL.md) | **Authoritative glossary** — core entities and deferred features |
| [WORKFLOW_DEFINITIONS.md](./WORKFLOW_DEFINITIONS.md) | Workflow/step definitions in site repo JSON vs runtime DB state |
| [WORKFLOW_BYPASS_GUARD.md](./WORKFLOW_BYPASS_GUARD.md) | Soft guard when Studio publish/reject bypasses workflow steps |
| [FUNCTIONAL_SPEC.md](./FUNCTIONAL_SPEC.md) | Behavior, Studio UI widgets, and CrafterCMS integration |
| [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) | MariaDB schema `crafter-workflow`, ER diagrams, migrations |
| [ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md) | Stack, domain, services, widgets, migrations |
| [API_CONTRACT.md](./API_CONTRACT.md) | Plugin REST API — endpoints and payloads |
| [AUTHORIZATION.md](./AUTHORIZATION.md) | Studio site roles (no plugin permission tables in current phase) |
| [NOTIFICATIONS.md](./NOTIFICATIONS.md) | In-app + email notifications (Studio SMTP) |
| [COMMENTS.md](./COMMENTS.md) | Comment threads — polymorphic targets, independent of workflow |
| [TASKS.md](./TASKS.md) | User tasks — optional links, independent of workflow |
| [AUDIT_LOG.md](./AUDIT_LOG.md) | Append-only audit trail |
| [EXTENSIONS.md](./EXTENSIONS.md) | Cross-cutting features index |
| [GROOVY_SANDBOX.md](./GROOVY_SANDBOX.md) | Studio Groovy sandbox rules and whitelist |
| [POTENTIAL_REQUIREMENTS.md](./POTENTIAL_REQUIREMENTS.md) | Stakeholder requirements + **plugin remediation analysis** |
| [../scripts/tests/README.md](../scripts/tests/README.md) | curl API test suite (all REST endpoints) |

## Design principles

```mermaid
flowchart TB
    P1[Do not modify Crafter Studio schema]
    P2[Single schema, many sites via site_id]
    P3[Studio roles for access control]
    P4[Workflow defined by ordered WorkflowSteps]
    P5[Greenfield — canonical names only]
    P6[Comments and tasks independent — optional targets]
```

1. **Do not modify Crafter Studio schema** — all plugin data lives in schema `` `crafter-workflow` ``.
2. **Single schema, many sites** — row-level isolation via `site_id`.
3. **Studio roles for access control** — no plugin permission tables in the current phase.
4. **Workflow defined by steps** — **WorkflowSteps** are ordered columns on a **Workflow**.
5. **Greenfield rewrite** — canonical MariaDB-backed API only; legacy Trello/card/board REST shims have been removed.
6. **Loose coupling** — **Comments** and **tasks** are separate entities with optional `target_type` / `target_id` links; they are not owned by **WorkflowPackage**. See [CANONICAL_MODEL.md](./CANONICAL_MODEL.md#independent-collaboration-entities).

## Current domain model

Workflow **packages** own content refs and links only. Comments, tasks, notifications, and audit entries are **separate** collaboration entities that may optionally reference a package or content path.

```mermaid
flowchart TB
    W[Workflow] --> WS[WorkflowStep]
    WS --> WP[WorkflowPackage]
    WP --> CR[Content refs / links]

    CM[Comment]
    TK[Task]
    N[Notification]
    AL[AuditLogEntry]
    CONTENT[Content path]

    WP -.->|optional target| CM
    WP -.->|optional target| TK
    CONTENT -.->|optional target| CM
    CONTENT -.->|optional target| TK
    TK --> N
    CM --> N
    WP --> AL
    TK --> AL
```

| Entity | Meaning |
|--------|---------|
| **Workflow** | Named editorial process; definition in `/config/studio/workflow/definitions/*.workflow.json` |
| **WorkflowStep** | Ordered kanban column (in definition JSON); packages sit in one step at a time |
| **WorkflowPackage** | Unit of work in one step; owns content refs and external links |
| **Comment** | Independent thread on `workflow_package` or `content` target — [COMMENTS.md](./COMMENTS.md) |
| **Task** | Independent assignable item; optional target link — [TASKS.md](./TASKS.md) |
| **Notification** | In-app alert to a Studio user |
| **AuditLogEntry** | Append-only record of task/package actions |

**Deferred:** WorkflowRole (DB tables), WorkflowHook, email notification delivery. Step **roleRule** / **contentRule** live in definition JSON — see [WORKFLOW_DEFINITIONS.md](./WORKFLOW_DEFINITIONS.md).

See [CANONICAL_MODEL.md](./CANONICAL_MODEL.md) and [ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md).

## Implemented capabilities (summary)

| Area | Status |
|------|--------|
| Kanban board (workflows, steps, packages) | ✅ |
| Content/link attachments, Crafter publish/review | ✅ |
| Generic comments (package + content), @mentions | ✅ |
| In-app notifications + bell widget | ✅ |
| Tasks panel + package tasks | ✅ |
| Audit log + Project Tools tab | ✅ |
| Project Tools workflow admin | ✅ |
| Visual workflow flow editor (React Flow, transitions, layout) | ✅ |
| Step role/content rules (JSON) | ✅ |
| Step publish actions on package move | ✅ |
| Package due dates / site calendar | ✅ |
| Email notifications / preferences UI | ✅ immediate email + preferences panel |
| Per-workflow RBAC tables, Groovy hooks | ❌ deferred |

## Schema version

Current migration target: **V012**. Check status via **Project Tools → General → Schema status**, or `admin/schema/status.json` (returns `{ installed, schemaName, version }`).
