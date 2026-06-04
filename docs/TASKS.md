# Tasks

User-assigned work items with optional links to workflow packages, content paths, or other targets.

## Model: `wf_task`

| Column | Type | Description |
|--------|------|-------------|
| `id` | CHAR(36) | Primary key |
| `site_id` | VARCHAR(255) | Crafter site |
| `title` | VARCHAR(512) | Task title |
| `priority` | VARCHAR(16) | `high`, `medium`, or `low` (default `medium`) |
| `assignee_id` | BIGINT | Assigned Studio user |
| `assignee_username` | VARCHAR(255) | Username snapshot |
| `due_on` | DATETIME | Optional due date |
| `complete_b` | TINYINT(1) | Completion flag |
| `archived_b` | TINYINT(1) | Archive flag |
| `target_type` | VARCHAR(64) | Optional link target type |
| `target_id` | VARCHAR(1024) | Optional link target ID |
| `created_on` | DATETIME | Created timestamp |
| `modified_on` | DATETIME | Last modified |
| `completed_on` | DATETIME | When marked complete |

### Common target types

| `target_type` | `target_id` | UI behavior |
|----------------|-------------|-------------|
| `workflow_package` | Package UUID | Shows package title; click opens board with package expanded |
| `content` | Content path | Content comments context |

## API

See [API_CONTRACT.md](./API_CONTRACT.md) — `task/*` endpoints:

- `task/list.json` — list by assignee with optional target filter; pass `allTasks=true` (or `scope=all`) for all site tasks
- `task/get.json` — single task by ID
- `task/create.json`, `task/update.json`, `task/complete.json`, `task/archive.json`
- `task/open-count.json` — returns `{ openCount, overdueCount }` for toolbar badge

Task DTOs may include enriched fields when linked to a package: `targetTitle`, `targetWorkflowId`.

## Notifications

**`TaskNotificationSupport`** creates in-app notifications for the assignee (not the actor) on:

- Task created (assigned)
- Task updated (assignee unchanged)
- Reassignment to a new user
- Task completed / reopened
- Task archived / restored

Each audit-worthy task event also writes to **`wf_audit_log`** (see [AUDIT_LOG.md](./AUDIT_LOG.md)).

## UI

| Widget | Purpose |
|--------|---------|
| `tasksToolbarButton` / `tasksPanel` | Tasks list (assignee-scoped) with optional calendar tab |
| `calendarToolbarButton` / `calendarPanel` | Site calendar (day view default, today’s events); aggregates date-based items from multiple sources |

The calendar uses a generic `CalendarEvent` model. Tasks are the first source (`sourceId: task`); additional sources (e.g. campaigns) can be registered in `loadSiteCalendarEvents`.

Tasks can also be created from a **WorkflowPackage** card detail dialog.

## Related documents

- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
- [NOTIFICATIONS.md](./NOTIFICATIONS.md)
- [AUDIT_LOG.md](./AUDIT_LOG.md)
