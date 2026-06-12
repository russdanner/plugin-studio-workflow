# Functional Specification

Description of the Crafter Workflow plugin as implemented. Canonical names: [CANONICAL_MODEL.md](./CANONICAL_MODEL.md).

## Purpose

Provide a **visual workflow board inside CrafterCMS Studio** so editorial teams can:

- Define workflow steps by creating and arranging **WorkflowSteps** (kanban columns)
- Track work as **WorkflowPackages** moving between steps
- Link CrafterCMS content (pages, components, assets) to packages
- Attach **external links** to packages
- Discuss work via **comments** on packages and content paths
- Assign and track **tasks** with due dates and priorities
- Receive **in-app notifications** for task and mention events
- Review an **audit log** of task and package actions
- Perform CrafterCMS workflow actions (request review, reject, publish) on linked content
- Open linked content via deep links back into Studio preview/edit
- Administer workflows via **Project Tools**

The plugin is **Studio-only**. It does not render boards on the delivery site or define Crafter content types.

## Actors

| Actor | Role |
|-------|------|
| **Content author** | Uses board, moves packages, links content, comments, tasks |
| **Workflow admin** | Manages workflows and steps in Project Tools |
| **Site administrator** | Installs plugin, runs schema migration, grants DB privileges |
| **CrafterCMS Studio** | Hosts UI, content APIs, workflow dialogs, plugin REST scripts |

## Domain model

Workflow packages **do not own** comments or tasks. Those are independent entities linked optionally via `target_type` / `target_id`. See [CANONICAL_MODEL.md](./CANONICAL_MODEL.md#independent-collaboration-entities).

```mermaid
classDiagram
    class Workflow {
        +id, name
        +steps in JSON
    }
    class WorkflowStep {
        +id, name, position
        +roleRule, contentRule, actionType
    }
    class WorkflowPackage {
        +id, title, description
        +position, status, due_on
    }
    class WorkflowPackageContentRef {
        +contentPath, displayName
    }
    class Comment {
        +target_type, target_id
        +author, body
        +step snapshot, resolved, archived
    }
    class Task {
        +title, priority, assignee
        +due_on, complete, archived
        +target_type, target_id optional
    }
    class Notification {
        +user_id, title, message
        +target_type, target_id
    }
    class AuditLogEntry {
        +username, operation
        +target_type, target_id, note
    }
    Workflow "1" --> "*" WorkflowStep
    WorkflowStep "1" --> "*" WorkflowPackage
    WorkflowPackage "1" --> "*" WorkflowPackageContentRef
    Comment ..> WorkflowPackage : optional target
    Comment ..> ContentPath : optional target
    Task ..> WorkflowPackage : optional target
    Task ..> ContentPath : optional target
    Task --> Notification
    Comment --> Notification
    Task --> AuditLogEntry
    WorkflowPackage --> AuditLogEntry
    note for Comment "Independent table wf_comment"
    note for Task "Independent table wf_task; target nullable"
```

Crafter workflow state (`availableActionsMap`) is read at action time from linked content — **not** mirrored in the plugin database.

## Core capabilities

### C1 — Workflow board presentation

![Editorial Workflow kanban board](./images/workflow-kanban-board.png)

- Tools panel button opens kanban dialog
- Multiple workflows per site via widget `workflowId` or default workflow
- Drag-and-drop **WorkflowPackages** between **WorkflowSteps**
- Package detail: description, attachments, comments, tasks

Comments and tasks shown in package detail are loaded via `CommentService` / `TaskService` by target — not stored on the package row. The same comment and task rows are available from standalone widgets without opening the board.

### C2 — WorkflowPackage lifecycle

| Action | Behavior |
|--------|----------|
| Create | Title + description in a chosen WorkflowStep; audit `package_created` |
| Move | Drag or API; audit `package_step_changed` when step changes |
| Archive | Soft close (`status = archived`) |
| View details | Description, content refs, links, comments, tasks |

### C3 — Content and link attachments

From a package action menu:

1. **New page** — new-content dialog; on save, attach to package
2. **New component** — same, rooted at `/site/components`
3. **Existing content** — Site Search select mode
4. **External link** — URL with display name
5. **Remove attachment** — detach content ref or link

### C4 — Comments

| Action | Behavior |
|--------|----------|
| Add comment | On `workflow_package` or `content` target; step snapshot for packages |
| @mention | Autocomplete; notifies mentioned users |
| List / resolve / archive | Standard CRUD; archived hidden from default counts |

### C5 — Content preview

Deep link opens Studio preview by content type.

### C6 — CrafterCMS workflow actions

Package menu exposes Request Review, Reject, Publish based on linked items' `availableActionsMap`. Uses standard Studio dialogs.

## Publishing and Crafter Studio workflow

The plugin is an **editorial coordination superset** around Crafter’s built-in publish and workflow features — not a parallel publishing system.

### Manual actions from the board

When an author uses **Request Review**, **Reject**, or **Publish** on linked content from a package card, the plugin opens the **same Studio dialogs** driven by each item’s `availableActionsMap`. Behavior matches stock Studio: permissions, validation, iconography, scheduling, and **OOTB email/in-app notifications** from Crafter are unchanged.

### Automatic step publish actions

When a package **enters a step** with a configured `actionType` (see [WORKFLOW_DEFINITIONS.md](./WORKFLOW_DEFINITIONS.md)), `WorkflowStepActionService` calls Studio’s `workflowService` (`requestPublish` / `publish`) **as the user who moved the package**. That uses the same publishing pipeline as if the user had triggered the action manually in Studio — including environment targets (staging/live), dependency handling, and failure messages. On failure the package can revert to the previous step; success may advance to `actionSuccessStepId`.

| `actionType` | Studio API |
|--------------|------------|
| `request_publish_staging` | `workflowService.requestPublish` → staging target |
| `request_publish_live` | `workflowService.requestPublish` → live target |
| `publish_staging` | `workflowService.publish` → staging target |
| `publish_live` | `workflowService.publish` → live target |

### Delivery while content is in a package

Attaching sandbox content to a workflow package does **not** change Crafter’s publish model. **In-flight sandbox edits are not on delivery** until a successful Studio publish (manual or step action). Delivery continues to serve the **last published** version — the same rule as stock Studio without this plugin.

What the plugin adds: visibility (board, audit, comments, tasks), step rules, optional automation of Studio publish actions on step entry, and a **soft bypass guard** (block or acknowledge + audit + notify — see [WORKFLOW_BYPASS_GUARD.md](./WORKFLOW_BYPASS_GUARD.md)). What it does **not** add today: mandatory enrollment, content locks, or **server-side** publish blocking — see [Out of scope](#out-of-scope).

### C7 — Notifications (in-app)

![Notifications panel](./images/notifications-panel.png)

| Trigger | Recipient |
|---------|-----------|
| Task assigned / updated / completed / archived | Assignee (not actor) |
| Comment `@mention` | Mentioned users |

Bell widget with unread count; panel with navigation to package, task, or content preview.

**Email:** immediate delivery via Studio SMTP — see [NOTIFICATIONS.md](./NOTIFICATIONS.md). Daily digest deferred.

### C8 — Tasks

![Tasks panel](./images/tasks-panel.png)

![Site calendar](./images/site-calendar.png)

- Create from Tasks panel or package detail
- Assignee picker, priority, due date, inline edit
- Optional link to `workflow_package` or `content`
- Toolbar badge: open count; red when overdue
- See [TASKS.md](./TASKS.md)

### C9 — Audit log

- Records task create/modify and package create/step-change
- Project Tools → **Audit Log** tab with filters and pagination
- See [AUDIT_LOG.md](./AUDIT_LOG.md)

### C10 — Project Tools administration

| Tab | Purpose |
|-----|---------|
| **General** | Schema status and install |
| **Workflows** | Create, edit, delete workflows; visual flow editor (React Flow) for step layout, manual **Move** transitions, publish actions, role/content rules, and content event listeners |
| **Audit Log** | Search audit history |

### C11 — Content comments panel

![Content comments on preview content](./images/content-comments-panel.png)

Separate Tools panel widget for commenting on the currently selected content item in Studio.

## Studio widgets

| Widget ID | Purpose |
|-----------|---------|
| `openBoardButton` | Open kanban dialog (Tools panel; see [Tools panel workflow label](#tools-panel-workflow-label)) |
| `board` | Kanban board component |
| `notificationsToolbarButton` / `notificationsPanel` | Notification bell and inbox |
| `tasksToolbarButton` / `tasksPanel` | Tasks list |
| `contentCommentsToolbarButton` / `contentCommentsPanel` | Content-scoped comments |
| `projectToolsConfiguration` | Project Tools admin (General, Workflows, Audit Log) |

## User workflows

### Tools panel workflow label

The **Workflow** entry in the Studio **Tools** panel (left sidebar) opens the kanban board. Its label depends on how many workflows are configured for the site:

| Workflows on site | Tools panel label | Interaction |
|-------------------|-------------------|-------------|
| **One** | That workflow’s **name** (e.g. *Editorial Workflow*) | Click opens the board for that workflow directly. |
| **More than one** | **Workflow** | Click expands an accordion listing each workflow by name; choose one to open its board. |
| **None** | **Workflow** | Click opens the board shell (configure workflows in Project Tools → Crafter Workflow). |

This is separate from Crafter’s built-in **asset workflow** (publish states on content items). Preview toolbar widgets use distinct labels: **Page packages**, **Content comments**, **Tasks**, **Notifications**, **Calendar**.

### Open and use a workflow board

1. Author clicks Tools panel workflow button (or a workflow name in the accordion)
2. Board loads via `workflow/board.json`
3. Author drags packages, adds packages, opens details, comments, tasks

### Move package between WorkflowSteps

1. Drag-and-drop or API move
2. **Manual transitions** — if the source step defines `transitionStepIds`, only those target steps accept the drop (UI disables other columns while dragging; server rejects invalid targets)
3. **Step rules** validated (`roleRule`, `contentRule` from definition JSON); blocked moves return user-visible message
4. On step change: optional **publish action** runs; audit entry and DB update

## Configuration

- MariaDB schema: `` `crafter-workflow` ``
- Per-widget `ui.xml`: `title`, `icon.id`, `workflowId`
- Schema migration via Project Tools or lazy on first REST call

## CrafterCMS integration

| Integration | Usage |
|-------------|-------|
| `@craftercms/studio-ui` | Widgets, dialogs, content APIs |
| Studio site roles | Site membership (admin for workflow config) |
| `availableActionsMap` | Conditional publish/review menu |
| `userService` | Resolve user IDs for notifications and audit |
| Plugin REST scripts | All workflow operations |
| MariaDB | Schema `` `crafter-workflow` `` |

## Out of scope

- Modifying Crafter Studio schema or `permissions.xml`
- Mandatory content lifecycle workflow (100% page enrollment, content locks, publication gates)
- Content-item status machine (Draft / In Review / Approved on every page)
- Four-Eyes Principle enforcement
- Email notification delivery (designed, not shipped)
- Groovy hooks invocation, per-workflow WorkflowRole DB tables
- Terminal step runtime behavior (`is_terminal` is metadata only)

See [POTENTIAL_REQUIREMENTS.md](./POTENTIAL_REQUIREMENTS.md#plugin-remediation-analysis) for stakeholder PDF gap analysis and remediation backlog.

## Related documents

- [API_CONTRACT.md](./API_CONTRACT.md)
- [AUTHORIZATION.md](./AUTHORIZATION.md)
- [TASKS.md](./TASKS.md)
- [AUDIT_LOG.md](./AUDIT_LOG.md)
- [NOTIFICATIONS.md](./NOTIFICATIONS.md)
- [ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md)
