# Architecture Diagrams

Visual reference for the Crafter Workflow plugin. All diagrams use [Mermaid](https://mermaid.js.org/).

## Implementation stack

```mermaid
flowchart TB
    subgraph StudioUI["CrafterCMS Studio UI"]
        BOARD[Board dialog]
        PT[Project Tools]
        NB[Notifications bell]
        TP[Tasks panel]
        CC[Content comments]
    end

    subgraph PluginREST["Plugin REST — authoring/scripts/rest/.../crafterwf/"]
        R1[workflow/*]
        R2[workflow-package/*]
        R3[comment/*]
        R4[notification/*]
        R5[task/*]
        R6[audit/*]
        R7[admin/*]
    end

    subgraph Services["Service layer — WorkflowContext"]
        CTX[WorkflowContext]
        WDS[WorkflowDefinitionService]
        BS[WorkflowBoardService]
        PS[WorkflowPackageService]
        CS[CommentService]
        NS[NotificationService]
        TS[TaskService]
        ALS[AuditLogService]
        ADM[WorkflowAdminService]
        SRS[StepRuleService]
        SAS[WorkflowStepActionService]
    end

    subgraph Repo["Site sandbox"]
        DEF["/config/studio/workflow/definitions/*.workflow.json"]
    end

    subgraph DAO["DAO layer"]
        PD[WorkflowPackageDao]
        AD[WorkflowPackageAttachmentDao]
        CD[CommentDao]
        ND[NotificationDao]
        TD[TaskDao]
        ALD[AuditLogDao]
    end

    subgraph DB["MariaDB crafter-workflow"]
        SCHEMA[(wf_* runtime tables)]
    end

    StudioUI --> PluginREST
    PluginREST --> CTX
    CTX --> BS & PS & CS & NS & TS & ALS & ADM & WDS
    PS --> SRS & SAS
    WDS --> DEF
    BS --> WDS & PD
    PS --> PD & AD & CS & ALS & WDS
    CS --> CD & NS & WDS
    ADM --> WDS & PD
    TS --> TD & ALS
    NS --> ND & PD & TD
    ALS --> ALD
    DAO --> SCHEMA
```

## Studio widgets

```mermaid
flowchart LR
    subgraph Widgets["org.rd.plugin.crafterwf widgets"]
        B1[openBoardButton]
        B2[board]
        B3[notificationsToolbarButton]
        B4[notificationsPanel]
        B5[tasksToolbarButton]
        B6[tasksPanel]
        B7[contentCommentsToolbarButton]
        B8[contentCommentsPanel]
        B9[projectToolsConfiguration]
    end

    B1 --> B2
    B3 --> B4
    B5 --> B6
    B7 --> B8
    B9 --> PT[General / Workflows / Audit Log tabs]
```

## Domain model (canonical entities)

Workflow-owned data (solid) vs independent collaboration entities (dashed optional links):

```mermaid
flowchart TB
    W[Workflow]
    W --> WS[WorkflowStep]
    WS --> WP[WorkflowPackage]
    WP --> CR[ContentRef]
    WP --> LK[Link]

    CM[Comment]
    TK[Task]
    N[Notification]
    AL[AuditLogEntry]
    CONTENT[Content path]

    WP -.->|optional target| CM
    WP -.->|optional target| TK
    CONTENT -.->|optional target| CM
    CONTENT -.->|optional target| TK
    TK --> N
    CM --> N
    WP --> AL
    TK --> AL
```

## Authorization flow

```mermaid
flowchart TD
    REQ[REST request with siteId] --> AUTH{Authenticated Studio session?}
    AUTH -->|no| E403[403 Forbidden]
    AUTH -->|yes| SITE{User has access to siteId?}
    SITE -->|no| E403
    SITE -->|yes| OP{Operation tier}
    OP -->|Read / Operate| OK[Allow]
    OP -->|Administer workflows| ADMIN{Site admin or developer?}
    ADMIN -->|yes| OK
    ADMIN -->|no| E403
```

Per-workflow RBAC (`WorkflowRole`) is **deferred**. See [AUTHORIZATION.md](./AUTHORIZATION.md).

## Audit recording flow

```mermaid
flowchart TD
    A[Task or package service action] --> B{Audit-worthy event?}
    B -->|task create/update/complete/archive| C[AuditLogService.record]
    B -->|package create| C
    B -->|package step change| C
    B -->|other| D[No audit row]
    C --> E[INSERT wf_audit_log]
```

## Notification flow (implemented)

```mermaid
flowchart TD
    E1[Task lifecycle event] --> TN[TaskNotificationSupport]
    E2[Comment @mention] --> CS[CommentService]
    TN --> NS[NotificationService.createNotification]
    CS --> NS
    NS --> INS[INSERT wf_notification]
    INS --> UI[NotificationsPanel / bell badge]
```

Email branch is **not implemented** — see [NOTIFICATIONS.md](./NOTIFICATIONS.md).

## Schema migrations

```mermaid
flowchart LR
    V1[V001 Core] --> V2[V002 Comments]
    V2 --> V3[V003 Comment archive]
    V3 --> V4[V004 Notifications]
    V4 --> V5[V005 Tasks]
    V5 --> V6[V006 Audit log]
    V6 --> V7[V007 Step actions]
    V7 --> V8[V008 Action type]
    V8 --> V9[V009 allowAddPackage]
    V9 --> V10[V010 Package due_on]
    V10 --> V11[V011 Task start_on]
    V11 --> V12[V012 Content type + legacy step rules]
```

Current target: **V12**. See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md).

## Implementation phases

```mermaid
flowchart LR
    P1[Phase 1 Foundation] --> P2[Phase 2 Attachments]
    P2 --> P3[Phase 3 Comments]
    P3 --> P4[Phase 4 Notifications]
    P4 --> P5[Phase 5 Tasks]
    P5 --> P6[Phase 6 Audit log]
    P6 --> P7[Phase 7 Step rules and actions]
    P7 --> P8[Phase 8 Email / RBAC DB / hooks]
```

| Phase | Status |
|-------|--------|
| 1 — Foundation | ✅ |
| 2 — Attachments | ✅ |
| 3 — Comments | ✅ |
| 4 — Notifications (in-app) | ✅ |
| 5 — Tasks | ✅ |
| 6 — Audit log | ✅ |
| 7 — Step rules, publish actions, calendar | ✅ |
| 8 — Email, hooks, WorkflowRole (DB) | ❌ deferred |

## Deferred (future)

```mermaid
flowchart TB
    subgraph Current["Implemented"]
        W[Workflow / Step / Package]
        N[Notifications in-app]
        T[Tasks]
        A[Audit log]
    end

    subgraph Deferred["Deferred"]
        E[Email delivery]
        WR[WorkflowRole DB tables]
        WH[WorkflowHook]
    end
```

## Document map

```mermaid
flowchart LR
    README[docs/README.md]
    README --> CM[CANONICAL_MODEL]
    README --> FS[FUNCTIONAL_SPEC]
    README --> DS[DATABASE_SCHEMA]
    README --> AC[API_CONTRACT]
    README --> TASKS[TASKS]
    README --> AUDIT[AUDIT_LOG]
    README --> NOTIF[NOTIFICATIONS]
    README --> AD[ARCHITECTURE_DIAGRAM]
```

## Related documents

- [CANONICAL_MODEL.md](./CANONICAL_MODEL.md)
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
- [FUNCTIONAL_SPEC.md](./FUNCTIONAL_SPEC.md)
- [API_CONTRACT.md](./API_CONTRACT.md)
