# Extensions

Cross-cutting features beyond the core workflow aggregate.

## Implemented

| Feature | Document | Status |
|---------|----------|--------|
| **Comments** | [COMMENTS.md](./COMMENTS.md) | ✅ Package + content targets; independent of workflow |
| **Notifications (in-app)** | [NOTIFICATIONS.md](./NOTIFICATIONS.md) | ✅ Bell widget, panel, task/comment/@mention triggers |
| **Tasks** | [TASKS.md](./TASKS.md) | ✅ Tasks panel; optional targets; no workflow required |
| **Audit log** | [AUDIT_LOG.md](./AUDIT_LOG.md) | ✅ Task + package events; Project Tools tab |
| **Step rules** | [WORKFLOW_DEFINITIONS.md](./WORKFLOW_DEFINITIONS.md) | ✅ JSON `roleRule` / `contentRule`; enforced on move |
| **Step publish actions** | [WORKFLOW_DEFINITIONS.md](./WORKFLOW_DEFINITIONS.md) | ✅ `actionType` on steps; runs on package move |
| **Content event listeners** | [WORKFLOW_DEFINITIONS.md](./WORKFLOW_DEFINITIONS.md) | ✅ `createListeners` / `editListeners` in workflow JSON; server enrollment on content save |
| **Workflow bypass guard** | [WORKFLOW_BYPASS_GUARD.md](./WORKFLOW_BYPASS_GUARD.md) | ✅ Warn + audit + notify on Studio publish/reject outside action steps |

```mermaid
flowchart TB
    subgraph Implemented["Implemented"]
        CM[Comments]
        N[Notifications in-app]
        T[Tasks]
        A[Audit log]
        SR[Step rules JSON]
        SA[Step publish actions]
        EL[Content event listeners]
    end

    subgraph Deferred["Deferred"]
        E[Email delivery]
        H[Groovy hooks]
        WR[WorkflowRole DB]
    end

    CORE[Core workflow model] --> CM
    CORE --> N
    CORE --> T
    CORE --> A
    CORE --> EL
    N -.-> E
    CORE -.-> H
    CORE -.-> R
    CORE -.-> WR
```

## Deferred

| Feature | Description |
|---------|-------------|
| **Daily email digest** | Scheduled `daily_summary` delivery job not yet implemented (`email_enabled` + immediate send ✅ via direct SMTP) |
| **Groovy hooks** | Post-commit `package.moved` / `package.modified` scripts (not implemented) |
| **WorkflowRole (DB)** | Per-workflow Studio role → capabilities tables (step `roleRule` in JSON is implemented) |
| **Terminal step behavior** | `is_terminal` flag stored but not enforced in board logic |

## Related documents

- [CANONICAL_MODEL.md](./CANONICAL_MODEL.md)
- [COMMENTS.md](./COMMENTS.md)
- [TASKS.md](./TASKS.md)
- [NOTIFICATIONS.md](./NOTIFICATIONS.md)
- [AUDIT_LOG.md](./AUDIT_LOG.md)
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
