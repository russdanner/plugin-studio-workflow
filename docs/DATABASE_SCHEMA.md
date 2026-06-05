# Database Schema — `crafter-workflow`

All plugin data lives in a dedicated MariaDB schema alongside Studio's `crafter` schema. Studio schema is **never modified**.

Canonical entity names: [CANONICAL_MODEL.md](./CANONICAL_MODEL.md).

## Schema isolation

| Item | Value |
|------|--------|
| Schema name | `` `crafter-workflow` `` (hardcoded in `WorkflowDb`) |
| DB user | Same as Studio (`crafter` or equivalent) |
| Table references | Fully qualified: `` `crafter-workflow`.wf_workflow `` |
| Latest version | **12** (`SchemaMigrator.LATEST_SCHEMA_VERSION`) |

### Database privileges

The Studio JDBC user needs privileges on `` `crafter-workflow` ``:

```bash
./scripts/grant-workflow-schema.sh
```

### Multi-tenancy

Every tenant-scoped table includes `site_id`. All queries **must** filter by `site_id` from the authenticated Studio request.

### Workflow definitions (not in this schema)

Workflow and step **definitions** are stored in the site repository as JSON under `/config/studio/workflow/definitions/`, not in `wf_workflow` / `wf_workflow_step`. Those tables remain for backward compatibility and historical migrations; the plugin reads and writes definitions via `WorkflowDefinitionService` and `contentService`. Package rows reference definition IDs in `workflow_id` and `workflow_step_id`. See [WORKFLOW_DEFINITIONS.md](./WORKFLOW_DEFINITIONS.md).

## Entity-relationship diagram

```mermaid
erDiagram
    wf_schema_version {
        int version PK
        varchar description
        datetime applied_on
    }

    wf_workflow {
        char36 id PK
        varchar site_id
        varchar name
        text description
        varchar background_url
        int position
        boolean is_default
        bigint created_by
        datetime created_on
        bigint modified_by
        datetime modified_on
    }

    wf_workflow_step {
        char36 id PK
        char36 workflow_id FK
        varchar site_id
        varchar name
        decimal position
        varchar color
        boolean is_terminal
        datetime created_on
        datetime modified_on
    }

    wf_workflow_package {
        char36 id PK
        char36 workflow_id FK
        char36 workflow_step_id FK
        varchar site_id
        varchar title
        text description
        decimal position
        varchar cover_color
        datetime due_on
        varchar status
        bigint created_by
        datetime created_on
        bigint modified_by
        datetime modified_on
        datetime closed_on
    }

    wf_workflow_package_content_ref {
        char36 id PK
        char36 workflow_package_id FK
        varchar site_id
        varchar content_path
        varchar display_name
        varchar content_type
        int sort_order
        bigint created_by
        datetime created_on
    }

    wf_workflow_package_link {
        char36 id PK
        char36 workflow_package_id FK
        varchar site_id
        varchar name
        varchar url
        int sort_order
        datetime created_on
    }

    wf_comment {
        char36 id PK
        varchar site_id
        varchar target_type
        varchar target_id
        bigint author_id
        varchar author_username
        text body
        datetime created_on
        datetime resolved_on
        bigint resolved_by
        datetime archived_on
        bigint archived_by
        char36 workflow_id
        char36 workflow_step_id
    }

    wf_notification {
        char36 id PK
        varchar site_id
        bigint user_id
        varchar title
        text message
        varchar target_type
        varchar target_id
        boolean read_b
        boolean resolved_b
        boolean archived_b
        datetime created_on
        datetime modified_on
    }

    wf_user_notification_preference {
        varchar site_id PK
        bigint user_id PK
        varchar delivery_mode
        varchar summary_time
        boolean email_enabled
        datetime modified_on
    }

    wf_task {
        char36 id PK
        varchar site_id
        varchar title
        varchar priority
        bigint assignee_id
        varchar assignee_username
        datetime start_on
        datetime due_on
        boolean complete_b
        boolean archived_b
        varchar target_type
        varchar target_id
        datetime created_on
        datetime modified_on
        datetime completed_on
    }

    wf_audit_log {
        char36 id PK
        varchar site_id
        bigint user_id
        varchar username
        varchar operation
        varchar target_type
        varchar target_id
        text note
        datetime created_on
    }

    wf_workflow ||--o{ wf_workflow_step : "ordered steps"
    wf_workflow ||--o{ wf_workflow_package : contains
    wf_workflow_step ||--o{ wf_workflow_package : holds
    wf_workflow_package ||--o{ wf_workflow_package_content_ref : content
    wf_workflow_package ||--o{ wf_workflow_package_link : links
    wf_workflow_package ||--o{ wf_comment : "logical target only"
    wf_task }o--o| wf_workflow_package : "optional target"
    wf_notification }o--o| wf_workflow_package : "optional target"
    wf_notification }o--o| wf_task : "optional target"
```

> **Note:** `wf_comment` and `wf_task` associate with packages through `target_type` + `target_id` only — **no foreign key**. Content-path comments (`target_type=content`) have no workflow relationship.

## Logical grouping

Collaboration tables are **peers** of the workflow core — not child tables of `wf_workflow_package`.

```mermaid
flowchart TB
    subgraph Core["Core workflow"]
        W[wf_workflow]
        S[wf_workflow_step]
        P[wf_workflow_package]
        W --> S --> P
    end

    subgraph PackageContents["Package-owned"]
        CR[wf_workflow_package_content_ref]
        LK[wf_workflow_package_link]
        P --> CR
        P --> LK
    end

    subgraph Collaboration["Collaboration — independent"]
        CM[wf_comment]
        TK[wf_task]
        N[wf_notification]
        NP[wf_user_notification_preference]
    end

    subgraph Compliance["Compliance"]
        AL[wf_audit_log]
    end

    subgraph Migrations["Migrations"]
        V[wf_schema_version]
    end

    P -.->|optional target| CM
    P -.->|optional target| TK
    TK --> N
    CM --> N
    P --> AL
    TK --> AL
```

## Table reference

### `wf_workflow`

A **Workflow** (kanban board definition).

### `wf_workflow_step`

**Legacy table** — step definitions live in site JSON ([WORKFLOW_DEFINITIONS.md](./WORKFLOW_DEFINITIONS.md)). Columns from V007–V012 remain for upgraded databases but are not written by current definition CRUD.

| Column | Notes |
|--------|-------|
| `position` | `DECIMAL(20,10)` for insert-between ordering |
| `is_terminal` | “Done” step flag; stored in JSON; no auto-archive behavior yet |
| V007–V008 | Legacy publish-action booleans / `step_action_type`, `step_action_success_step_id` |
| V009 | `allow_add_package` (superseded by JSON `allowAddPackage`) |
| V012 | `role_rule_*`, `content_rule_*` (superseded by JSON `roleRule` / `contentRule`) |

### `wf_workflow_package`

A **WorkflowPackage** in one step at a time.

| Column | Notes |
|--------|-------|
| `workflow_step_id` | Current step (definition slug) |
| `due_on` | Optional due date (V010); used by calendar |
| `status` | `active` \| `archived` |

### `wf_workflow_package_content_ref` / `wf_workflow_package_link`

Crafter content paths and external URLs linked to a package.

| Column | Notes |
|--------|-------|
| `content_type` | Resolved Crafter content type path (V012); used by step content rules |

### `wf_comment`

Generic **Comment** targets (`workflow_package`, `content`).

| Column | Notes |
|--------|-------|
| `target_type`, `target_id` | Polymorphic target |
| `workflow_step_id` | Step snapshot for package comments |
| `resolved_on`, `archived_on` | Resolution and archive |

> **Note:** `wf_workflow_package_comment` was migrated to `wf_comment` in V002 and dropped.

### `wf_notification` / `wf_user_notification_preference`

See [NOTIFICATIONS.md](./NOTIFICATIONS.md).

### `wf_task`

See [TASKS.md](./TASKS.md).

### `wf_audit_log`

See [AUDIT_LOG.md](./AUDIT_LOG.md).

### `wf_schema_version`

Plugin migration version tracking.

## Schema evolution

| Version | Migration | Description |
|---------|-----------|-------------|
| 1 | V001 | Core workflow, package, comment, notification tables |
| 2 | V002 | Generic `wf_comment`; migrate from package-only comments |
| 3 | V003 | `archived_on`, `archived_by` on comments |
| 4 | V004 | Replace notification table with target-based model |
| 5 | V005 | `wf_task` |
| 6 | V006 | `wf_audit_log` |
| 7 | V007 | Legacy step publish-action flags on `wf_workflow_step` |
| 8 | V008 | `step_action_type`, `step_action_success_step_id` on `wf_workflow_step` |
| 9 | V009 | `allow_add_package` on `wf_workflow_step` |
| 10 | V010 | `due_on` on `wf_workflow_package` + calendar index |
| 11 | V011 | `start_on` on `wf_task` |
| 12 | V012 | `content_type` on content refs; legacy step rule columns on `wf_workflow_step` |

Migrations are applied in `SchemaMigrator.groovy` (embedded SQL, not separate `.sql` files).

```mermaid
flowchart TB
    API[Plugin REST call] --> LOCK[GET_LOCK crafter_workflow_schema_migrate]
    LOCK --> MIG[SchemaMigrator.migrateIfNeeded]
    MIG --> V1[V001 … V012]
    V1 --> RUN[Continue request]
```

Lazy migrate on first API call. Install explicitly via **Project Tools → General** or `admin/schema/install.json` (HTTP GET).

## Deferred tables (future)

- `wf_workflow_role`, `wf_site_role_template` — per-workflow capabilities beyond JSON step `roleRule`
- `wf_workflow_hook` — Groovy hook registry

## Prior design draft names (do not use)

| Draft name | Canonical table |
|------------|-------------------|
| `wf_stage` | `wf_workflow_step` |
| `wf_package` | `wf_workflow_package` |
| `wf_workflow_package_comment` | `wf_comment` |

## Related documents

- [CANONICAL_MODEL.md](./CANONICAL_MODEL.md)
- [TASKS.md](./TASKS.md)
- [AUDIT_LOG.md](./AUDIT_LOG.md)
- [NOTIFICATIONS.md](./NOTIFICATIONS.md)
