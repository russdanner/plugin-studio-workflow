# Workflow bypass guard (FB-014)

UI enforcement when authors use **stock Crafter Studio** publish, request-review, or reject actions while content is in an active workflow package **not** on a step configured for that action.

Does **not** block Studio APIs server-side — behavior is controlled in the Preview UI.

## When the guard applies

All must be true:

1. Content path is attached to an **active** workflow package.
2. The workflow definition has at least one **action step** — a step with `actionType` other than `none` (`request_publish_*` or `publish_*`).
3. The package’s **current step is not** one of those action steps.
4. The user opens Studio **Publish**, **Request publish**, or **Reject** (not a step action triggered by moving the package).

**Correct path:** move the package into the step that runs the publish/review action (`package_step_action` audit).

## User experience

Behavior depends on **`allowUiBypass`** on the workflow (default **false**).

### Block mode (`allowUiBypass: false`, default)

1. Studio opens the publish or reject dialog.
2. The guard closes it and shows a **Workflow step required** dialog (no continue option).
3. User closes the dialog; the Studio action is cancelled.
4. Move the package to the correct step, then publish/reject from Studio or via the step action.

### Acknowledge mode (`allowUiBypass: true`)

1. Studio opens the publish or reject dialog.
2. The guard closes it and shows a **Workflow bypass warning** with required acknowledgement.
3. User must check the acknowledgement box and click **Continue**, or **Cancel** to abort.
4. After acknowledgement, the original Studio dialog reopens.
5. When the Studio action completes, audit entries and notifications are sent (see below).

If content matches packages on multiple workflows, **block mode wins** when any involved workflow has `allowUiBypass: false`.

## Workflow configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `allowUiBypass` | boolean | `false` | When true, authors may acknowledge and continue. When false, publish/reject is blocked in the UI. |
| `bypassWarningMessage` | string | (empty) | Optional custom message in the guard dialog. Empty = plugin default (wording differs for block vs acknowledge mode). |

Configured in **Project Tools → Workflows → Edit workflow**.

## Audit trail

| Operation | When |
|-----------|------|
| `workflow_bypass_acknowledged` | User confirms the acknowledgement dialog (**acknowledge mode only**) |
| `workflow_bypass_action` | User completes the Studio publish / request-review / reject action (**acknowledge mode only**) |

Both target the **package** and include workflow name, step, content paths, and action type in the note.

Complements existing package history: `package_created`, `package_step_changed`, `package_modified` (archive/attach), `package_step_action`.

## Notifications

**Only on completed bypass action** (not on acknowledge).

Recipients:

- Users **referenced on the package** — creator, last modifier, task assignees, comment authors, `@mention` targets in package comments
- **Site admins** (`securityService.isSiteAdmin`) and **system admins**

Excludes the acting user.

## API

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `workflow-bypass/check.json` | GET | `contentPaths` (comma-separated), `action` (`publish` \| `request_publish` \| `reject`) |
| `workflow-bypass/acknowledge.json` | POST | Body: `{ siteId, action, violations[] }` — audit acknowledge |
| `workflow-bypass/record-action.json` | POST | Body: `{ siteId, action, violations[] }` — audit action + notify |

## UI mounting

Headless Studio hooks mount **once** when the plugin bundle loads (`mountWorkflowStudioHooks()` in `index.tsx`):

| Component | Role |
|-----------|------|
| `WorkflowBypassGuard` | Watches Studio Redux publish/reject dialogs via `store.subscribe()` |
| `WorkflowContentEventBridge` | Bridges preview saves to `content-event/process.json` |

Both run inside a hidden `CrafterCMSNextBridge` container (no extra toolbar UI). The legacy widget id `org.rd.plugin.crafterwf.workflowBypassGuard` (`WorkflowBypassGuardHost`) remains registered for site `ui.xml` compatibility but renders nothing — hooks are global, not per-toolbar.

Intercept flow: close Studio dialog immediately → check API → block or acknowledgement dialog → resume Studio dialog on allow → on successful submit, record action + notify (acknowledge mode only).

**Path handling:** the guard sends raw sandbox paths (`/site/...`) to `workflow-bypass/check.json`. The server expands path variants in `WorkflowPackageAttachmentDao.findPackagesByContentPath` — the client does not duplicate variants.

**Valid paths only:** only `/site/...` and `/static-assets/...` paths from publish dialog items (`path`, `localId`) or preview guest path are checked — numeric ids and bare URLs are ignored.

## Related documents

- [WORKFLOW_DEFINITIONS.md](./WORKFLOW_DEFINITIONS.md) — step `actionType`
- [AUDIT_LOG.md](./AUDIT_LOG.md)
- [NOTIFICATIONS.md](./NOTIFICATIONS.md)
- [FUNCTIONAL_SPEC.md](./FUNCTIONAL_SPEC.md)
