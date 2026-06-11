# API Contract

Plugin REST scripts under:

```
/studio/api/2/plugin/script/plugins/org/rd/plugin/crafterwf/crafterwf/
```

All endpoints use **canonical names** only. See [CANONICAL_MODEL.md](./CANONICAL_MODEL.md).

Convention: required `siteId` on every call. Authorization: [AUTHORIZATION.md](./AUTHORIZATION.md).

**HTTP methods:** Crafter Studio plugin REST runs query-parameter mutations via **`*.get.groovy`** (call with HTTP GET). Only `admin/workflow/save` uses **`save.post.groovy`** with a JSON POST body. The UI (`pluginPost` / `pluginDelete`) and curl test harness use GET for all other state-changing endpoints.

**Script layout:** Each endpoint is a Groovy file under `authoring/scripts/rest/plugins/org/rd/plugin/crafterwf/crafterwf/` named `{endpoint}.get.groovy` (reads and most writes) or `{endpoint}.post.groovy` (JSON body save only).

Workflow and step **definitions** are stored in the site repo as JSON ([WORKFLOW_DEFINITIONS.md](./WORKFLOW_DEFINITIONS.md)). Admin and board APIs read/write definitions via `WorkflowDefinitionService`; `workflowId` and step `id` values are stable string slugs (for example `editorial`, `backlog`), not DB UUIDs.

## Workflow and WorkflowSteps

### `workflow/board.json`

Load full kanban view: one **Workflow**, ordered **WorkflowSteps**, and active **WorkflowPackages** per step.

| Param | Required | Description |
|-------|----------|-------------|
| `workflowId` | No | Workflow definition ID (slug); default workflow from JSON (`isDefault` or lowest `position`) |
| `since` | No | Optional ISO timestamp for conditional refresh |

**Response:**

```json
{
  "workflow": {
    "id": "uuid",
    "name": "News Editorial",
    "description": "...",
    "backgroundUrl": "...",
    "position": 0
  },
  "workflowSteps": [
    {
      "id": "in-progress",
      "name": "In Review",
      "position": 1.0,
      "color": "blue",
      "isTerminal": false,
      "workflowPackages": [
        {
          "id": "package-uuid",
          "title": "Q2 Launch",
          "description": "...",
          "position": 1.0,
          "coverColor": "blue",
          "status": "active",
          "attachmentCount": 3,
          "commentCount": 2
        }
      ]
    }
  ]
}
```

### `workflow-step/create.json`

| Param | Description |
|-------|-------------|
| `workflowId` | Parent workflow |
| `name` | WorkflowStep name |
| `position` | Optional; append if omitted |

**Requires:** site admin (see [AUTHORIZATION.md](./AUTHORIZATION.md))

### `workflow-step/update.json`

| Param | Description |
|-------|-------------|
| `workflowStepId` | Step to update |
| `name`, `color`, `isTerminal` | Fields to change |

**Requires:** site admin

### `workflow-step/delete.json`

| Param | Description |
|-------|-------------|
| `workflowStepId` | Step to delete |
| `packageDisposition` | `block` \| `move_to_step` (optional) |
| `targetWorkflowStepId` | Required when `packageDisposition=move_to_step` |

**Requires:** site admin

### `workflow-step/reorder.json`

| Param | Description |
|-------|-------------|
| `workflowId` | Workflow |
| `workflowStepIds` | Ordered list of step IDs |

**Requires:** site admin

## WorkflowPackages

### `workflow-package/create.json`

| Param | Description |
|-------|-------------|
| `workflowStepId` | Target WorkflowStep |
| `title` | Package title |
| `description` | Optional |
| `coverColor` | Optional |

**Requires:** site member

### `workflow-package/move.json`

| Param | Description |
|-------|-------------|
| `workflowId` | Workflow |
| `workflowStepId` | Target WorkflowStep |
| `workflowPackageId` | Package |
| `index` | Target position (0-based) |

**Requires:** site member

### `workflow-package/archive.json`

| Param | Description |
|-------|-------------|
| `workflowPackageId` | Package |

Sets `status = archived`. **Requires:** site member

### `workflow-package/get.json`

| Param | Description |
|-------|-------------|
| `workflowPackageId` | Package |

**Response:**

```json
{
  "workflowPackage": {
    "id": "package-uuid",
    "workflowId": "...",
    "workflowStepId": "...",
    "title": "Q2 Launch",
    "description": "...",
    "coverColor": "blue",
    "status": "active"
  },
  "contentRefs": [],
  "links": [],
  "comments": []
}
```

## Attachments

### `workflow-package/attach-content.json`

| Param | Description |
|-------|-------------|
| `workflowPackageId` | Package |
| `contentPath` | Crafter content path |
| `displayName` | Display name |

**Requires:** site member

### `workflow-package/attach-link.json`

| Param | Description |
|-------|-------------|
| `workflowPackageId` | Package |
| `name` | Display name |
| `url` | External URL |

**Requires:** site member

### `workflow-package/remove-attachment.json`

| Param | Description |
|-------|-------------|
| `workflowPackageId` | Package |
| `attachmentId` | Content ref or link ID |
| `attachmentType` | `content` \| `link` |

**Requires:** site member

## Comments

### `comment/list.json`

| Param | Description |
|-------|-------------|
| `targetType` | `workflow_package` \| `content` |
| `targetId` | Package UUID or content path |
| `workflowPackageId` | Legacy alias for package `targetId` |
| `contentPath` | Legacy alias for content `targetId` |
| `includeResolved` | `true` \| `false` (default: true) |
| `includeArchived` | `true` \| `false` (default: false) |

**Requires:** site member

### `comment/create.json`

| Param | Description |
|-------|-------------|
| `targetType` | `workflow_package` \| `content` |
| `targetId` | Package UUID or content path |
| `workflowPackageId` | Legacy alias for package `targetId` |
| `contentPath` | Legacy alias for content `targetId` |
| `body` | Comment text |
| `mentionedUserIds` | Comma-separated Studio user IDs to notify |

Sets `workflow_step_id` from the package’s current step when `targetType=workflow_package`. **Requires:** site member

### `comment/resolve.json`

| Param | Description |
|-------|-------------|
| `commentId` | Comment UUID |
| `resolved` | `true` to resolve, `false` to reopen |

**Requires:** site member

### `comment/archive.json`

| Param | Description |
|-------|-------------|
| `commentId` | Comment UUID |
| `archived` | `true` to archive, `false` to restore |

Archived comments are hidden from default lists and board comment counts.

**Requires:** site member

## Notifications

See [NOTIFICATIONS.md](./NOTIFICATIONS.md).

### `notification/list.json`

| Param | Description |
|-------|-------------|
| `unreadOnly` | `true` \| `false` (default: false) |
| `includeResolved` | `true` \| `false` (default: true) |
| `includeArchived` | `true` \| `false` (default: false) |
| `markDisplayedAsRead` | `true` \| `false` (default: true) — marks listed notifications read when the panel loads them |

Returns `{ notifications: [...] }` for the current user.

### `notification/unread-count.json`

Badge count for current user (unread, non-archived).

### `notification/create.json`

| Param | Description |
|-------|-------------|
| `userId` | Recipient (defaults to current user) |
| `title` | Required |
| `message` | Notification body |
| `targetType` | Optional target type |
| `targetId` | Optional target id |

### `notification/mark-read.json`

| Param | Description |
|-------|-------------|
| `notificationId` | Single notification |
| `markAll` | `true` to mark all read |
| `read` | `true` \| `false` (default: true) |

### `notification/resolve.json`

| Param | Description |
|-------|-------------|
| `notificationId` | Notification UUID |
| `resolved` | `true` to resolve, `false` to reopen |

### `notification/archive.json`

| Param | Description |
|-------|-------------|
| `notificationId` | Notification UUID |
| `archived` | `true` to archive, `false` to restore |

### `notification/preferences/get.json`

Returns current user's delivery preference for the site.

Response: `{ siteId, userId, deliveryMode, summaryTime, emailEnabled, modifiedOn }`.

### `notification/preferences/save.json` (POST)

Body JSON:

| Field | Description |
|-------|-------------|
| `siteId` | Site ID |
| `deliveryMode` | `immediate` \| `daily_summary` |
| `summaryTime` | Optional digest time |
| `emailEnabled` | `true` \| `false` |

Returns saved preference object (same shape as get).

## Tasks

User tasks with optional links to arbitrary targets (`targetType` / `targetId`). See [TASKS.md](./TASKS.md).

### `task/list.json`

| Param | Description |
|-------|-------------|
| `assigneeId` | Defaults to current user |
| `includeComplete` | `true` \| `false` (default: true) |
| `includeArchived` | `true` \| `false` (default: false) |
| `targetType` | Optional filter |
| `targetId` | Optional filter |
| `allTasks` | `true` to list all tasks for the site (ignores assignee filter). Alias: `scope=all` |

Returns `{ tasks: [...] }`.

Task object fields: `id`, `siteId`, `title`, `priority` (`high` \| `medium` \| `low`), `assigneeId`, `assigneeUsername`, `dueOn`, `complete`, `archived`, `targetType`, `targetId`, `targetTitle`, `targetWorkflowId`, `createdOn`, `modifiedOn`, `completedOn`.

### `task/get.json`

| Param | Description |
|-------|-------------|
| `taskId` | Required |

Returns a single task DTO.

### `task/open-count.json`

Open (incomplete, non-archived) task count for badge display.

**Response:** `{ openCount, overdueCount }` — badge turns red when `overdueCount > 0`.

### `task/create.json`

| Param | Description |
|-------|-------------|
| `title` | Required |
| `priority` | `high` \| `medium` \| `low` (default: medium) |
| `dueOn` | ISO date or `yyyy-MM-dd` |
| `assigneeId` | Defaults to current user |
| `assigneeUsername` | Defaults to current username |
| `targetType` | Optional |
| `targetId` | Optional |

### `task/update.json`

| Param | Description |
|-------|-------------|
| `taskId` | Required |
| `title`, `priority`, `dueOn`, `assigneeId`, `assigneeUsername`, `targetType`, `targetId` | Optional updates |

### `task/complete.json`

| Param | Description |
|-------|-------------|
| `taskId` | Required |
| `complete` | `true` \| `false` (default: true) |

### `task/archive.json`

| Param | Description |
|-------|-------------|
| `taskId` | Required |
| `archived` | `true` \| `false` (default: true) |

## Audit log

See [AUDIT_LOG.md](./AUDIT_LOG.md).

### `audit/list.json`

| Param | Description |
|-------|-------------|
| `username` | Filter by username |
| `operation` | e.g. `task_created`, `task_modified`, `package_created`, `package_step_changed` |
| `targetType` | `task`, `package`, `workflow` |
| `targetId` | Exact target ID |
| `q` / `query` | Search note, username, target_id, operation |
| `from`, `to` | Date range |
| `page`, `pageSize` | Pagination |

**Response:** `{ entries, total, page, pageSize, totalPages, hasNextPage, hasPreviousPage }`

## Administration

### `admin/schema/status.json`

Returns `{ installed, schemaName, version }`.

### `admin/schema/install.json`

Runs schema migration to latest version.

### `admin/workflow/list.json`

List workflows for site with step/package counts.

### `admin/workflow/get.json`

| Param | `workflowId` |

### `admin/workflow/create.json`

| Param | Description |
|-------|-------------|
| `name`, `description` | Workflow metadata |
| `withDefaultSteps` | `true` to provision Backlog / In Progress / Done |

### `admin/workflow/save.post.json`

POST body: workflow metadata + ordered `steps` array (`id`, `name`, `color`, `isTerminal`).

### `admin/workflow/delete.json`

| Param | `workflowId` |

### `workflow-bypass/check.json`

| Param | Description |
|-------|-------------|
| `contentPaths` | Comma-separated content store paths |
| `action` | `publish` \| `request_publish` \| `reject` |

Returns `{ requiresAcknowledgement, violations[] }` when content is in an active package off an action step.

### `workflow-bypass/acknowledge.json` (POST)

Body: `{ siteId, action, violations[] }` — records `workflow_bypass_acknowledged` audit entries.

### `workflow-bypass/record-action.json` (POST)

Body: `{ siteId, action, violations[] }` — records `workflow_bypass_action` audit entries and sends notifications.

## Error responses

| Code | Meaning |
|------|---------|
| 403 | Not authorized for site or operation |
| 404 | Entity not found or wrong `site_id` |
| 409 | Conflict (e.g. delete step with packages and `packageDisposition=block`) |
| 422 | Validation error |

## Service layer (internal)

```mermaid
flowchart TB
    REST[REST scripts] --> CTX[WorkflowContext]
    CTX --> BS[WorkflowBoardService]
    CTX --> PS[WorkflowPackageService]
    CTX --> CS[CommentService]
    CTX --> NS[NotificationService]
    CTX --> TS[TaskService]
    CTX --> ALS[AuditLogService]
    CTX --> ADM[WorkflowAdminService]
    BS --> DAO[DAO layer]
    PS --> DAO
    CS --> DAO
    NS --> DAO
    TS --> DAO
    ALS --> DAO
    ADM --> DAO
    DAO --> DB[(crafter-workflow)]
```

See [ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md) for the full implementation stack.

## Deferred endpoints

These may be added later:

- `notification/preferences/*` — email preference UI/API
- `admin/roles/*` — per-workflow WorkflowRole

## Superseded by this spec

| Old (removed) | New |
|----------------------|-----|
| `board/lists.json` | `workflow/board.json` |
| `stage/*` | `workflow-step/*` (via board payload) |
| `card/*` | `workflow-package/*` |
| Trello webhooks / hook console | Removed |
