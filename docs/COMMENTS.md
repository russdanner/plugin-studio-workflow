# Comments

Threaded discussion stored in **`wf_comment`**. Comments are **independent** of workflow packages: they attach to an arbitrary **target** via `target_type` and `target_id`, not via a foreign key on the package row.

See [CANONICAL_MODEL.md](./CANONICAL_MODEL.md#independent-collaboration-entities) for the loose-coupling model shared with tasks and notifications.

## Model: `wf_comment`

| Column | Type | Description |
|--------|------|-------------|
| `id` | CHAR(36) | Primary key |
| `site_id` | VARCHAR(255) | Crafter site |
| `target_type` | VARCHAR(64) | `workflow_package` or `content` |
| `target_id` | VARCHAR(1024) | Package UUID or content sandbox path |
| `author_id` | BIGINT | Studio user |
| `author_username` | VARCHAR(255) | Username snapshot |
| `body` | TEXT | Comment text; supports `@username` mentions |
| `created_on` | DATETIME | Created timestamp |
| `resolved_on` | DATETIME | Set when resolved |
| `resolved_by` | BIGINT | User who resolved |
| `archived_on` | DATETIME | Soft archive |
| `archived_by` | BIGINT | User who archived |
| `workflow_id` | CHAR(36) | Optional snapshot when target is a package |
| `workflow_step_id` | CHAR(36) | Step at comment time (package targets only) |

There is **no** `workflow_package_id` column. Package association is expressed only through `target_type` + `target_id`.

### Target types

| `target_type` | `target_id` | Requires workflow? | Notes |
|---------------|-------------|--------------------|-------|
| `workflow_package` | Package UUID | Package must exist | Step snapshot stored on create |
| `content` | Content path | No | Used by content-comments widget; independent of board |

## API

Separate from `workflow-package/*`. See [API_CONTRACT.md](./API_CONTRACT.md):

- `comment/list.json` — by `targetType` + `targetId`
- `comment/create.json`, `comment/resolve.json`, `comment/archive.json`

Legacy params `workflowPackageId`, `cardId`, `contentPath`, and `path` are resolved by `CommentService.resolveTargetParams`.

Package detail responses may **embed** comments from `workflow-package/get.json`; the same rows are listed via `comment/list.json`.

## Service behavior

| Behavior | Detail |
|----------|--------|
| Package validation | Create/list on `workflow_package` verifies package exists |
| Content validation | No workflow or package check — path is the target |
| Mentions | `@username` triggers in-app notification via `NotificationService` |
| Compose UI | `CommentMentionInput` highlights `@mentions` while typing; picker inserts `@username` (stored in body) |
| Display UI | Submitted comments render mentions as bold blue display names (`CommentBodyWithMentions`) |
| Step name in DTO | Enriched from definition JSON when snapshot columns are set |

## UI

![Content comments panel on a preview page](./images/content-comments-panel.png)

| Widget | Target | Coupling |
|--------|--------|----------|
| `contentCommentsToolbarButton` / `contentCommentsPanel` | Current preview content path | **No workflow** |
| Package card detail (board) | `workflow_package` | Optional link to board context |

## Related documents

- [CANONICAL_MODEL.md](./CANONICAL_MODEL.md)
- [TASKS.md](./TASKS.md)
- [NOTIFICATIONS.md](./NOTIFICATIONS.md)
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
