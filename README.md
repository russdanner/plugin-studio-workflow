# Crafter Workflow Plugin for CrafterCMS

Kanban workflow board inside CrafterCMS Studio, backed by MariaDB.

## Screenshots

### Workflow

**Kanban board** — authors open a workflow from the Tools panel and drag packages between steps:

![Editorial Workflow kanban board in CrafterCMS Studio](./docs/images/workflow-kanban-board.png)

**Flow editor** — admins configure steps, transitions, and publish actions in Project Tools:

![Workflow flow diagram editor](./docs/images/workflow-flow-editor.png)

### Collaboration widgets

**Content comments** — discuss the page or component open in preview; supports `@mentions`:

![Content comments panel in CrafterCMS Studio](./docs/images/content-comments-panel.png)

**Notifications** — in-app inbox for mentions, tasks, and bypass alerts; optional immediate email:

![Notifications panel in CrafterCMS Studio](./docs/images/notifications-panel.png)

**Tasks** — assignable work items with priority, dates, and optional package/content links:

![Tasks panel in CrafterCMS Studio](./docs/images/tasks-panel.png)

**Site calendar** — month/week/day view of tasks and package due dates across the site:

![Site calendar in CrafterCMS Studio](./docs/images/site-calendar.png)

## CrafterCMS 4.x Compatibility

This plugin is modernized for CrafterCMS 4.x and uses the `@craftercms/studio-ui` 4.x SDK.
It is intended for CrafterCMS `4.0` through `4.4`.

## Design documentation

The **`crafter-workflow`** plugin (MariaDB schema, Groovy services, Studio UI) is documented in [docs/README.md](./docs/README.md).

Implemented features include kanban workflows, comments, in-app notifications, tasks, audit log, and Project Tools administration. See [docs/FUNCTIONAL_SPEC.md](./docs/FUNCTIONAL_SPEC.md) for the full capability list.

### Workflow flow editor

In **Project Tools → Crafter Workflow → Workflows → Edit workflow**, admins use a **React Flow** diagram to:

- Drag steps into a custom layout (saved as `flowLayout` in the workflow JSON)
- Connect steps with **Move** arrows that define which columns accept package drags on the board (`transitionStepIds`)
- Configure step publish actions (dashed action edges) separately from manual moves
- Zoom and pan the canvas (saved as `flowViewport`)

The kanban board enforces `transitionStepIds` when authors drag packages between columns. See [docs/WORKFLOW_DEFINITIONS.md](./docs/WORKFLOW_DEFINITIONS.md#workflow-flow-editor) for JSON fields and behavior.

## Build

```bash
cd src
yarn install
yarn dist
```

Or build packages individually:

```bash
yarn workspace crafterwf-board-components dist
yarn workspace crafterwf-app dist
```

## Installation

Install the plugin via Studio's Plugin Management UI under **Site Tools → Plugin Management**, or use:

```bash
./scripts/install-plugin.sh [siteId] [studioUrl]
```

After install:

1. Grant the Studio DB user access to the `crafter-workflow` schema if needed (`./scripts/grant-workflow-schema.sh`).
2. Open **Project Tools → Crafter Workflow** and install the schema from the General tab.
3. Open the **Workflow** sidebar widget to use the board.

Optional widget configuration — pin a specific workflow by id (legacy config key `boardId` is still accepted as an alias for `workflowId`):

```xml
<widget id="org.rd.plugin.crafterwf.openBoardButton">
    <plugin
        id="org.rd.plugin.crafterwf"
        site="{site}"
        type="apps"
        name="crafterwf"
        file="index.js"
    />
    <configuration>
        <title>Editorial Workflow</title>
        <icon id="@mui/icons-material/AccountTreeOutlined"/>
        <workflowId>editorial</workflowId>
    </configuration>
</widget>
```

See [docs/DATABASE_SCHEMA.md](./docs/DATABASE_SCHEMA.md) and [docs/WORKFLOW_DEFINITIONS.md](./docs/WORKFLOW_DEFINITIONS.md) for database (schema **V012**) and workflow setup.

## API testing

curl-based integration tests for all plugin REST services:

```bash
./scripts/run-api-tests.sh --smoke   # read-only GET smoke
./scripts/run-api-tests.sh           # full suite
```

Requires a valid `CRAFTER_STUDIO_TOKEN` (or `scripts/.studio-token`). See [scripts/tests/README.md](./scripts/tests/README.md).
