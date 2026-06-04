# Notifications

How workflow events reach users via **in-app** inbox in the Studio Tools panel. **Email delivery is designed but not yet implemented.**

## Channels

| Channel | Status |
|---------|--------|
| **In-app** | ✅ Persistent inbox, bell badge, clickable navigation to package/task/content |
| **Email** | ❌ Deferred — preference table exists; no send/digest job |

Every notifiable event creates an **in-app** row in `wf_notification`.

## Model: `wf_notification`

| Column | Notes |
|--------|-------|
| `id` | UUID |
| `site_id` | Crafter site |
| `user_id` | Recipient Studio user ID |
| `title` | Short headline |
| `message` | Body text |
| `target_type` | e.g. `task`, `workflow_package`, `content` |
| `target_id` | Target entity ID or content path |
| `read_b` | `0` = unread |
| `resolved_b` | User-resolved flag |
| `archived_b` | Hidden from default lists when set |
| `created_on`, `modified_on` | Timestamps |

List API enriches notifications with navigation context where possible: `targetTitle`, `targetWorkflowId`, `targetPackageId`.

### User preference: `wf_user_notification_preference`

| Column | Notes |
|--------|-------|
| `delivery_mode` | `immediate` \| `daily_summary` (not yet honored) |
| `summary_time` | Optional digest time |
| `email_enabled` | Master email toggle (not yet honored) |

**API (planned):** `notification/preferences/get.json`, `notification/preferences/save.json` — documented in [API_CONTRACT.md](./API_CONTRACT.md) but **not implemented**.

## Implemented event triggers

| Event | Recipients | Source |
|-------|------------|--------|
| Task assigned / updated / completed / archived | Assignee (not actor) | `TaskNotificationSupport` |
| Comment `@mention` | Mentioned users | `CommentService.notifyMentionedUsers` |

Package move and generic comment-added notifications are **not** yet implemented.

## UI widgets

| Widget ID | Purpose |
|-----------|---------|
| `org.rd.plugin.crafterwf.notificationsToolbarButton` | Bell with unread count; polls every 30s |
| `org.rd.plugin.crafterwf.notificationsPanel` | Inbox with labeled links (Content / Workflow Package / Task) |

Click-through uses `notificationNavigation.ts` to open preview, board (package expanded), or tasks panel.

## API (implemented)

See [API_CONTRACT.md](./API_CONTRACT.md):

- `notification/list.json`
- `notification/unread-count.json`
- `notification/mark-read.json`
- `notification/resolve.json`
- `notification/archive.json`
- `notification/create.json` (manual/test)

## Planned email flow

```mermaid
flowchart TD
    A[NotificationService.create event] --> B[INSERT wf_notification in-app]
    B --> C[Read wf_user_notification_preference]
    C --> D{email_enabled?}
    D -->|no| E[Done]
    D -->|yes| F{delivery_mode}
    F -->|immediate| G[sendNow via Studio email]
    F -->|daily_summary| H[Queue for digest job]
```

## Related documents

- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
- [TASKS.md](./TASKS.md)
- [API_CONTRACT.md](./API_CONTRACT.md)
- [EXTENSIONS.md](./EXTENSIONS.md)
