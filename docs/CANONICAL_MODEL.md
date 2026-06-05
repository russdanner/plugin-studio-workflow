# Canonical Model

Authoritative names for the Crafter Workflow domain. Use these in code, database tables, API, and UI.

## Entity glossary

| Canonical name | Former names | Description |
|----------------|--------------|-------------|
| **Workflow** | Board | A named editorial process for a site. Contains ordered **WorkflowSteps**. |
| **WorkflowStep** | List, Stage, Column | One step in a workflow. WorkflowPackages sit in exactly one step at a time. |
| **WorkflowPackage** | Card, Package | A unit of work moving through workflow steps. Owns **content refs** and **external links** only — not comments or tasks (those link via optional targets). |
| **WorkflowPackageContentRef** | Content attachment | Reference to a Crafter CMS content item (sandbox path). |
| **WorkflowPackageLink** | Document attachment | External URL attached to a package. |
| **Comment** | WorkflowPackageComment | User comment on a **target** (`workflow_package` or `content`). Package comments capture step snapshot. |
| **Task** | — | Assignable work item with optional `target_type` / `target_id` link. |
| **Notification** | — | In-app alert to a Studio user. See [NOTIFICATIONS.md](./NOTIFICATIONS.md). |
| **AuditLogEntry** | — | Append-only audit record. See [AUDIT_LOG.md](./AUDIT_LOG.md). |

## Independent collaboration entities

**Comments**, **tasks**, **notifications**, and **audit log entries** are first-class entities. They are **not owned by** `WorkflowPackage` or `Workflow`. A package may *reference* them only in the sense that UI and APIs can attach optional `target_type` / `target_id` links.

### Design rules

| Rule | Implementation |
|------|----------------|
| Separate tables | `wf_comment`, `wf_task`, `wf_notification`, `wf_audit_log` — no FK to `wf_workflow_package` |
| Polymorphic optional link | `target_type` + `target_id` on comment, task, notification (audit uses its own target for the audited entity) |
| Separate REST namespaces | `comment/*`, `task/*`, `notification/*`, `audit/*` vs `workflow-package/*` |
| Separate services | `CommentService`, `TaskService`, `NotificationService`, `AuditLogService` |
| Separate Studio widgets | Tasks panel, content-comments panel, notifications bell — independent of the board |
| Tasks without workflow | `target_type` / `target_id` nullable; task create does not require a package |
| Content without workflow | Comments with `target_type=content` need no package or workflow |
| No lifecycle cascade | Archiving a package does **not** delete or update linked comments/tasks |

### Target types (collaboration link)

| `target_type` | `target_id` | Used by |
|---------------|-------------|---------|
| `workflow_package` | Package UUID | Comment, task, notification (optional) |
| `content` | Sandbox content path | Comment, task (optional) |
| `task` | Task UUID | Notification, audit |
| `package` | Package UUID | Audit (`AuditTargetType.PACKAGE`) |
| `workflow` | Workflow definition id | Audit (admin events) |

Backend constant: `CommentTargetType` (`workflow_package`, `content`). Tasks and notifications reuse the same string values; a shared `CollaborationTargetType` would be clearer — see [coupling notes](#coupling-notes-known-gaps).

### How entities relate (loose coupling)

```mermaid
flowchart TB
    subgraph WorkflowDomain["Workflow domain"]
        W[Workflow definition JSON]
        WS[WorkflowStep]
        WP[WorkflowPackage]
        CR[ContentRef]
        LK[Link]
        W --> WS --> WP
        WP --> CR
        WP --> LK
    end

    subgraph Collaboration["Collaboration domain — independent tables"]
        CM[Comment]
        TK[Task]
        N[Notification]
        AL[AuditLogEntry]
    end

    CONTENT[Content path]

    WP -.->|optional target| CM
    WP -.->|optional target| TK
    CONTENT -.->|optional target| CM
    CONTENT -.->|optional target| TK
    TK --> N
    CM --> N
    TK --> AL
    WP --> AL

    linkStyle 6,7,8,9 stroke-dasharray: 5 5
```

Solid arrows = composition (owned children). Dashed arrows = optional polymorphic association — **not** database foreign keys.

### Aggregate reads vs ownership

`WorkflowPackageService.getPackage` **embeds** comments in its response for board UI convenience. That is a read-model aggregate only; comments remain rows in `wf_comment` and are also reachable via `comment/list.json` without loading the package.

## Relationships (workflow-owned data only)

```mermaid
flowchart TB
    W[Workflow]
    W --> WS[WorkflowStep]
    WS --> WP[WorkflowPackage]
    WP --> CR[WorkflowPackageContentRef]
    WP --> LK[WorkflowPackageLink]
```

Comments, tasks, notifications, and audit entries are documented above and in [COMMENTS.md](./COMMENTS.md), [TASKS.md](./TASKS.md), [NOTIFICATIONS.md](./NOTIFICATIONS.md), [AUDIT_LOG.md](./AUDIT_LOG.md).

## Coupling notes (known gaps)

These are intentional or minor inconsistencies — not violations of the independent-entity model, but worth knowing when extending the plugin.

| Gap | Severity | Detail |
|-----|----------|--------|
| **Task target not validated** | Low | `CommentService` verifies a package exists when `target_type=workflow_package`; `TaskService.createTask` does not — tasks can point at missing package IDs |
| **Shared `CommentTargetType` for tasks** | Low | Backend tasks import `CommentTargetType`; name suggests comment-only scope |
| **Package archive leaves dangling targets** | By design | Archived packages remain valid target IDs; comments/tasks are not auto-archived or re-linked |
| **Step snapshot on package comments only** | By design | `wf_comment.workflow_id` / `workflow_step_id` populated only for `workflow_package` targets — metadata, not a FK |
| **Board UI entry points** | UX | Primary create flows for package comments/tasks live in the card detail dialog; standalone widgets exist for tasks and content comments |

No code change required for loose coupling to hold; tighten validation or rename `CommentTargetType` only if you want stricter symmetry.

- A **Workflow** contains ordered **WorkflowSteps** (definition JSON).
- A **WorkflowPackage** belongs to one **WorkflowStep** at a time (and one **Workflow**).
- Moving a package changes its **WorkflowStep** and position within that step.
- **Comments** and **tasks** may optionally reference a package or content path via `target_type` / `target_id` — see [Independent collaboration entities](#independent-collaboration-entities).
- **AuditLogEntry** records selected task and package lifecycle events on its own table.

## WorkflowPackage contents

| Child | Purpose |
|-------|---------|
| **Content references** | Crafter content paths (pages, components, assets) |
| **External links** | Non-CMS URLs (docs, tickets, etc.) |
| **Comments** | Discussion thread (via generic `wf_comment`) |
| **Tasks** | Assignable work items linked to the package |

## Comment

Comments are stored in **`wf_comment`** with polymorphic targets.

| Attribute | Description |
|-----------|-------------|
| **target_type** | `workflow_package` or `content` |
| **target_id** | Package UUID or content path |
| **Author** | `author_id`, optional `author_username` snapshot |
| **Created at** | `created_on` |
| **WorkflowStep at comment time** | `workflow_step_id` snapshot for package comments only |
| **Body** | Comment text; supports `@username` mentions |
| **Resolved** | `resolved_on`, `resolved_by`; `NULL` = open |
| **Archived** | `archived_on`, `archived_by`; hidden from default lists when set |

### Comment rules

1. **Step snapshot:** For `workflow_package` targets, `workflow_step_id` is set at create time from the package’s current step.
2. **Mentions:** `@username` in body can notify mentioned users (via `mentionedUserIds` on create API).
3. **Resolution / archive:** Both are reversible.

## WorkflowStep.is_terminal

Boolean flag (`is_terminal`) marking a step as a completion/done column. Default **Done** step is created with `isTerminal: true`. **Not yet consumed** by board behavior (no auto-archive, publish gate, or visual indicator).

## Definition vs runtime storage

| Canonical entity | Definition (git) | Runtime (MariaDB) |
|------------------|------------------|-------------------|
| **Workflow** | `{workflowId}.workflow.json` under `/config/studio/workflow/definitions/` | — (metadata not stored in DB) |
| **WorkflowStep** | `steps[]` in the same JSON file | — (step IDs referenced by packages) |
| **WorkflowPackage** | — | `wf_workflow_package` (`workflow_id`, `workflow_step_id` = definition slugs) |

See [WORKFLOW_DEFINITIONS.md](./WORKFLOW_DEFINITIONS.md).

## Database table mapping

| Canonical entity | Table name | Notes |
|------------------|------------|-------|
| Workflow | `wf_workflow` | **Legacy** — definitions use JSON; table unused for CRUD |
| WorkflowStep | `wf_workflow_step` | **Legacy** — step config lives in JSON |
| WorkflowPackage | `wf_workflow_package` | Active |
| WorkflowPackageContentRef | `wf_workflow_package_content_ref` |
| WorkflowPackageLink | `wf_workflow_package_link` |
| Comment | `wf_comment` |
| Task | `wf_task` |
| Notification | `wf_notification` |
| User notification preference | `wf_user_notification_preference` |
| AuditLogEntry | `wf_audit_log` |
| Schema version | `wf_schema_version` |

## Out of scope (deferred)

| Deferred | Description |
|----------|-------------|
| Per-workflow role capabilities | `WorkflowRole`, `SiteRoleTemplate` (DB tables) |
| Groovy hooks | Post-commit `package.moved` / `package.modified` scripts |
| Email notification delivery | Preference table exists; send logic not implemented |

**Implemented (not deferred):** Step **roleRule** / **contentRule** and publish **actionType** on definition JSON — enforced by `StepRuleService` and `WorkflowStepActionService`. See [WORKFLOW_DEFINITIONS.md](./WORKFLOW_DEFINITIONS.md).

May be added without renaming core entities.

## Historical names (reference only)

The original Trello-based plugin used different terms. All REST APIs use canonical `workflow-package/*` paths; legacy `card/*`, `board/lists`, and Trello webhook endpoints were removed.

| Historical | Canonical |
|------------|-----------|
| Board | Workflow |
| List / Stage | WorkflowStep |
| Card | WorkflowPackage |

## Related documents

- [COMMENTS.md](./COMMENTS.md)
- [TASKS.md](./TASKS.md)
- [NOTIFICATIONS.md](./NOTIFICATIONS.md)
- [AUDIT_LOG.md](./AUDIT_LOG.md)
- [WORKFLOW_DEFINITIONS.md](./WORKFLOW_DEFINITIONS.md)
- [ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md)
