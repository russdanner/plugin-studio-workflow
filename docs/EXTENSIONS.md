# Extensions

Cross-cutting features beyond the core workflow aggregate.

## Implemented

| Feature | Document | Status |
|---------|----------|--------|
| **Notifications (in-app)** | [NOTIFICATIONS.md](./NOTIFICATIONS.md) | ✅ Bell widget, panel, task/comment/@mention triggers |
| **Tasks** | [TASKS.md](./TASKS.md) | ✅ Tasks panel, package tasks, assignee notifications |
| **Audit log** | [AUDIT_LOG.md](./AUDIT_LOG.md) | ✅ Task + package events; Project Tools tab |
| **Step rules** | [WORKFLOW_DEFINITIONS.md](./WORKFLOW_DEFINITIONS.md) | ✅ JSON `roleRule` / `contentRule`; enforced on move |
| **Step publish actions** | [WORKFLOW_DEFINITIONS.md](./WORKFLOW_DEFINITIONS.md) | ✅ `actionType` on steps; runs on package move |

```mermaid
flowchart TB
    subgraph Implemented["Implemented"]
        N[Notifications in-app]
        T[Tasks]
        A[Audit log]
        SR[Step rules JSON]
        SA[Step publish actions]
    end

    subgraph Deferred["Deferred"]
        E[Email delivery]
        H[Groovy hooks]
        WR[WorkflowRole DB]
    end

    CORE[Core workflow model] --> N
    CORE --> T
    CORE --> A
    N -.-> E
    CORE -.-> H
    CORE -.-> R
    CORE -.-> WR
```

## Deferred

| Feature | Description |
|---------|-------------|
| **Email notifications** | `wf_user_notification_preference` table exists; immediate/digest send not implemented |
| **Groovy hooks** | Post-commit `package.moved` / `package.modified` scripts (not implemented) |
| **WorkflowRole (DB)** | Per-workflow Studio role → capabilities tables (step `roleRule` in JSON is implemented) |
| **Terminal step behavior** | `is_terminal` flag stored but not enforced in board logic |

## Related documents

- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
- [NOTIFICATIONS.md](./NOTIFICATIONS.md)
- [TASKS.md](./TASKS.md)
- [AUDIT_LOG.md](./AUDIT_LOG.md)
