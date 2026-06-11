# Potential Requirements

Stakeholder requirements from the **CrafterCMS Workflow Requirements** document, evaluated against the **`crafter-workflow`** Studio plugin (`org.rd.plugin.crafterwf`).

This document has two parts:

1. **[Plugin remediation analysis](#plugin-remediation-analysis)** — how the plugin maps to each requirement theme (implemented, partial, gap, remediation).
2. **[Requirements inventory](#requirements-inventory)** — single-line list of candidate requirements from the PDF.

---

## Plugin remediation analysis

**Last reviewed:** schema **V012**, plugin REST + kanban board + Project Tools admin.

### Status legend

| Status | Meaning |
|--------|---------|
| ✅ **Implemented** | Delivered in the plugin today |
| 🟡 **Partial** | Some capability exists; stakeholder requirement not fully met |
| ❌ **Gap** | Not implemented; no current workaround |
| ⏸ **Deferred** | Designed or stubbed; explicitly postponed |
| 🚫 **Out of scope** | Intentionally not in this plugin phase (see [FUNCTIONAL_SPEC.md](./FUNCTIONAL_SPEC.md)) |

### Executive summary

The plugin is a **coordination layer** (kanban packages, tasks, comments, audit, in-app notifications) integrated with Crafter Studio publish/review actions. It is **not** a mandatory content lifecycle engine: it does not lock content items, enforce per-page workflow status, gate publication site-wide, or send email.

| Theme | Overall | Notes |
|-------|---------|-------|
| Workflow definition & admin | ✅ | JSON definitions in site repo; Project Tools editor |
| Kanban / package movement | ✅ | Drag-and-drop + REST; step rules on move |
| Publish integration | ✅ | Step `actionType` and board menus delegate to stock Studio `workflowService` as the acting user; delivery unchanged until publish succeeds. UI bypass guard ✅ (**FB-014**); server-side API block still ❌. |
| Tasks & dashboards | 🟡 | Tasks panel + board filters; not a full enterprise task dashboard |
| Notifications | 🟡 | In-app only; email deferred |
| Audit & compliance logging | 🟡 | Append-only audit log; not full content revision history |
| Content lock / write protection | ❌ | No repository-level lock |
| Mandatory enrollment / Four-Eyes | 🚫 | Out of scope for this plugin |
| Email / LDAP / corporate integration | ⏸ / external | Uses Studio auth; email not shipped |
| AI / accessibility automation | ❌ | Not in plugin |

### Remediation by requirement theme

#### Executive & strategic objectives

| Requirement (summary) | Status | Plugin coverage | Remediation / notes |
|----------------------|--------|-----------------|---------------------|
| System-integrated workflow engine in CMS | 🟡 | Kanban + packages + Studio widgets | Position as editorial coordination; not replacement for Studio workflow state |
| Structure/automate/document editorial steps | 🟡 | Steps, moves, audit, comments | Add email + stronger gates if stakeholder needs mandatory process |
| Audit-compliant lifecycle documentation | 🟡 | `wf_audit_log`, package/task events | Extend audit to all content mutations; export/report UI |
| Three-stage Author/Editor/Approver | 🟡 | Step `roleRule` + Studio roles | Map roles in workflow JSON; no built-in role templates |
| 100% pages through mandatory workflow | 🚫 | — | Requires content lock + enrollment (out of scope) |
| 30% throughput reduction | ❌ | — | Product metric; not measurable in plugin alone |
| 100% content assigned a status | 🚫 | Package status only | Crafter content has no plugin-owned page status |
| Status dashboard with filter/search | 🟡 | Board + active workflows toolbar | Add cross-workflow reporting if required |
| Automated email on status change | ⏸ | In-app notifications only | Implement `wf_user_notification_preference` + mailer |
| 90% fewer manual reminder emails | ⏸ | — | Depends on email delivery |
| 100% status changes logged | 🟡 | Package moves, tasks, comments in audit | Does not log every CMS content save |
| API email triggers | ⏸ | REST exists; no outbound email | Integrate corporate SMTP/API |
| Task dashboard for all team members | 🟡 | Tasks panel widget | Expand filters, assignment views, SLA |

#### Market / capability targets

| Requirement | Status | Plugin coverage | Remediation |
|-------------|--------|-----------------|-------------|
| Predefined workflow statuses | ✅ | Workflow steps in JSON | — |
| Custom status creation | ✅ | Admin workflow editor | — |
| Detailed action protocol/logging | 🟡 | Audit log | Broader event types, export |
| Graphical workflow representation | ✅ | Kanban board + admin step editor | Optional BPMN-style diagram |
| Config-time validation | 🟡 | Admin UI validation (steps, rules) | Deeper validation (unreachable states) |
| Unlimited approval depth | ✅ | Arbitrary steps in JSON | — |
| AI-prompt integration | ❌ | — | Future / separate initiative |

#### Usage scenarios

| Scenario | Status | How the plugin helps | Gap |
|----------|--------|----------------------|-----|
| Editorial release (create → review → approve → publish) | 🟡 | Package moves + publish actions + audit | No automatic task-per-step; no content lock |
| Multi-stage legal approval chain | 🟡 | Multi-step workflow + role rules | No parallel steps; no org-wide publication block |
| Change management with versioning | 🟡 | Content refs on packages; Crafter Git versioning | Plugin does not version content itself |
| Accessibility check before publish | ❌ | — | External tool or Studio hook |
| Media / legal asset gating | ❌ | — | Asset workflow not implemented |

#### §5.1 Workflow definition & configuration

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Configure, edit, copy, delete workflows | ✅ | Project Tools → Workflows; `admin/workflow/*` REST |
| Modular steps, conditions, roles, actions | ✅ | JSON: steps, `roleRule`, `contentRule`, `actionType` |
| Sequential steps | ✅ | Ordered `steps[]` |
| Parallel steps | ❌ | Single active step per package |
| Arbitrary approval depth | ✅ | Unlimited steps in definition |
| Assign by content type (auto/manual) | 🟡 | `contentRule` on steps; manual package creation | Auto-assign on content create not implemented |
| Workflow-exempt content types | 🚫 | — | No global enrollment model |

#### §5.2 Content lock mechanism

| Requirement | Status | Remediation |
|-------------|--------|-------------|
| Write-protection when in review | ❌ | Would need Studio/repository interceptors or permissions |
| Reviewer-only edit during review | ❌ | Same |
| Permission-layer enforcement (not UI-only) | ❌ | Same |
| Auto-release lock on reject/reset | ❌ | Same |
| Field-level lock | 🚫 | Not required by PDF; N/A |
| Non-involved users see last published version | ❌ | Crafter preview behavior; not plugin-controlled |
| Component lock vs parent page publish | ❌ | Not implemented |

#### §5.3 Task & status management

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Auto-generate tasks on workflow/step | 🟡 | Manual tasks + notifications on comments/assign | Auto-task rules deferred |
| Assign to roles or users | ✅ | Task assignees; step `roleRule` for moves |
| Standard statuses (Draft, In Review, …) | 🟡 | Step names are configurable | Not synced to content item metadata |
| Automated state transitions | 🟡 | `actionSuccessStepId` after publish action | Not full rules engine |
| Immediate transition logging | ✅ | Audit on package move / step action |

#### §5.4 Notification framework

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Notify on new tasks / status changes | 🟡 | In-app: tasks, comments, @mentions | Package move does not notify all role members |
| Email + in-app | ⏸ | In-app only | Email table exists; send logic deferred |
| Title, link, required action in notification | 🟡 | Notification payload with deep links | Email channel missing |

#### §5.5 Content control & versioning

| Requirement | Status | Notes |
|-------------|--------|-------|
| Revision-secure audit (user, time, status, comments) | 🟡 | `wf_audit_log` for plugin events | Not a substitute for Crafter content history |
| Auto-version content during workflow | 🚫 | Crafter Git handles content versions | Plugin does not trigger versioning |
| Block publish when steps incomplete | 🟡 | Step rules block *moves*; publish via Studio actions | No site-wide publish gate |
| Publication lock isolated to item | ❌ | No content-item lock model |

#### §5.6 Search & reporting

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Filter by item, creator, status, assignee | 🟡 | Board scoped to workflow; tasks/notifications panels | Cross-site workflow search limited |
| Full-text search on logs / task descriptions | ❌ | — | Add OpenSearch or DB full-text on audit/tasks |
| Central open-task dashboard | 🟡 | Tasks panel | Aggregate dashboard / reporting UI |

#### §6.1 Technical integration

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Crafter REST for status/metadata | 🟡 | Plugin REST + Studio content APIs for publish/review | Plugin API documented in [API_CONTRACT.md](./API_CONTRACT.md) |
| Compatibility with CMS version / content types | ✅ | Additive MariaDB schema; JSON definitions in site repo | — |
| Additive workflow metadata | ✅ | Separate schema `` `crafter-workflow` ``; JSON definitions | No change to content type fields |

#### §6.2 Infrastructure

| Requirement | Status | Notes |
|-------------|--------|-------|
| LDAP / AD / SSO | ✅ (Studio) | Plugin uses Studio authentication | No separate auth |
| Corporate email for notifications | ⏸ | Not implemented | Remediation: SMTP/API integration |
| Cloud / on-prem | ✅ | Standard Crafter plugin deployment | — |

#### §6.3 Performance

| Requirement | Status | Notes |
|-------------|--------|-------|
| Status change &lt; 5s | ✅ | Typical REST move/publish paths | Load testing not formalized |
| History &lt; 10s | ✅ | Audit list paginated | Large sites may need tuning |
| Non-disruptive deployment | ✅ | Plugin install/migrate lazy or via Project Tools | — |

#### §6.4 Compliance

| Requirement | Status | Notes |
|-------------|--------|-------|
| GDPR for user logging | 🟡 | Stores Studio user IDs in audit/tasks/comments | Data retention/export policy is operational |
| No new security vulnerabilities | 🟡 | Groovy sandbox, parameterized SQL, step rule checks | Ongoing review; see [GROOVY_SANDBOX.md](./GROOVY_SANDBOX.md) |
| Central Crafter permission model | ✅ | Studio site roles; admin for workflow config | No parallel plugin RBAC tables yet |

#### §8 User roles & permissions

| Requirement | Status | Notes |
|-------------|--------|-------|
| Author / Editor / Approver / Admin | 🟡 | Mapped via Studio roles + step `roleRule` | No fixed role enum in plugin |
| Multiple roles per user | ✅ | Studio supports multiple roles | — |
| Four-Eyes (creator ≠ approver) | 🚫 | Out of scope | Would need content-level rules |
| Configurable Four-Eyes per workflow/type | 🚫 | Out of scope | — |

#### §9 Acceptance criteria & use cases

| ID | Status | Plugin behavior | Remediation |
|----|--------|-----------------|-------------|
| UC1 Submit for review | 🟡 | Move package to review step; step rules | Content lock + auto-task |
| UC2 Approve/Reject | 🟡 | Move + comment + audit; in-app notify | Email; reject workflow template |
| UC3 Revision after rejection | 🟡 | Move back + comment thread | Automated re-submit rules |
| UC4 View workflow log | 🟡 | Audit log tab + package history | Per-content-item log in Studio |
| UC5 Workflow definition | ✅ | Project Tools admin | — |
| UC6 Automated notifications | ⏸ | In-app partial | Email delivery |
| UC7 Content-type workflow selection | ❌ | Manual package + `contentRule` | Hook on content create |
| UC8 Admin reset/abort | 🟡 | Move/delete package; audit retained | Explicit “reset workflow” action |

| Mandatory test | Status | Notes |
|----------------|--------|-------|
| Draft → Review → Approve + log | 🟡 | Package flow + audit | Content “Draft” status not on item |
| Unauthorized transition blocked | ✅ | Step `roleRule` / `contentRule` → HTTP 409 | Studio admin bypass |
| Notification on In Review | ⏸ | In-app if task/comment triggered | Role-wide notify on move |
| Invalid transition error message | ✅ | Step rules return user-visible errors | — |

### Prioritized remediation backlog

Items below close the largest gaps between the stakeholder PDF and current plugin behavior. Order is suggested, not committed roadmap.

| Priority | Item | Closes gap | Effort (rough) |
|----------|------|------------|----------------|
| P1 | Email notification delivery (preferences + templates) | §5.4, UC6, email test case | Medium |
| P2 | Notify role members on package step change | §5.4, UC1/UC2 | Small |
| P3 | Auto-task creation rules (on enter step / on create package) | §5.3, editorial scenarios | Medium |
| P4 | Content-create hook: suggest/auto-assign workflow package | UC7, content-type assignment | Medium |
| P5 | Cross-workflow search & reporting (audit + tasks) | §5.6 | Medium |
| P6 | Explicit workflow reset action + audit reason | UC8 | Small |
| P7 | Terminal step behavior (`is_terminal` enforcement) | Done-column semantics | Small |
| P8 | Content lock / publish gate (Studio integration) | §5.2, §5.5, mandatory workflow | Large — likely core/permissions |
| P9 | Four-Eyes and mandatory enrollment | §8, strategic objectives | Large — out of scope unless rescoped |
| P10 | Parallel workflow branches | §5.1 sequential/parallel | Large |

### Related implementation docs

| Topic | Document |
|-------|----------|
| What is implemented today | [docs/README.md](./README.md), [EXTENSIONS.md](./EXTENSIONS.md) |
| Out of scope (explicit) | [FUNCTIONAL_SPEC.md](./FUNCTIONAL_SPEC.md) |
| Workflow JSON & step rules | [WORKFLOW_DEFINITIONS.md](./WORKFLOW_DEFINITIONS.md) |
| REST API | [API_CONTRACT.md](./API_CONTRACT.md) |
| API regression tests | [../scripts/tests/README.md](../scripts/tests/README.md) |

---

## Requirements inventory

- Transition from manual external processes to a system-integrated workflow engine within Crafter CMS.
- Structure, automate, and document all editorial steps (creation, review, release) in the CMS.
- Provide system-supported process control for transparency, efficiency, and audit-compliant content lifecycle documentation.
- Implement a three-stage approval process with Author, Editor, and Approver roles.
- Ensure 100% of newly created pages in configured paths go through mandatory workflow.
- Reduce average content throughput time (creation to publication) by at least 30%.
- Assign 100% of content to a defined status (e.g., Draft, In Review, Approved).
- Provide a status overview dashboard with filter and search functions.
- Implement automated email notifications for status changes.
- Eliminate 90% of manual reminder emails via automation.
- Log 100% of status changes with timestamps, responsible user, and comments (revision-secure).
- Connect the workflow to existing email systems via APIs with demonstrable API-based email triggers.
- Map roles, tasks, and responsibilities clearly within the CMS.
- Provide a task dashboard for all team members.

## Market / capability targets

- Support predefined workflow statuses.
- Support custom status creation.
- Provide detailed protocol/logging of workflow actions.
- Provide graphical representation of workflows.
- Provide workflow validation at configuration time (invalid transitions, missing roles, unreachable states).
- Support theoretically unlimited approval depth.
- Support AI-prompt integration in workflow (leading-edge target noted in PDF).

## Usage scenarios

- Editorial release: Editor creates article → second Editor reviews → Approver sign-off → publication with full step logging.
- Multi-stage legal approval: Business Unit → Legal → Compliance chain with publication blocked until complete.
- Change management: Editor initiates update → Business Unit or QA review/approve before go-live with full versioning.
- Accessibility review: Automated accessibility check before publication; errors must be resolved before release (WCAG).
- Media release: Legal verifies licenses and corporate design when media is used in placeholders; asset gated until approved.

## Workflow definition & configuration (§5.1)

- Authorized users can configure, edit, copy, and delete workflows.
- Workflows are built from modular building blocks: steps, conditions, roles, and actions.
- Support sequential process steps.
- Support parallel process steps.
- Support arbitrary approval depths.
- Assign workflows to content types automatically or manually (e.g., News vs. Product pages).
- Allow content types or elements to be flagged workflow-exempt for direct save/publish by authorized roles (nice-to-have).

## Content lock mechanism (§5.2)

- Enforce write-protection on content when it enters workflow (e.g., "In Review").
- Restrict editing during review to the assigned reviewer and Administrator only.
- Enforce locks at the permission layer, not UI only (prevent API/repository circumvention).
- Automatically release lock when content is returned for revision (Rejected) or reset by Administrator.
- Lock applies to the entire content item (field-level locking not required).
- Non-involved users see the last approved (published) version, or no version if never published.
- Workflow state of a component must not block publication of parent page using last approved component version.

## Task & status management (§5.3)

- Automatically generate tasks when a workflow starts or a step is reached.
- Assign steps to specific roles or individual users.
- Provide standard statuses: Draft, In Review, Pending Approval, Rejected, Completed.
- Automate state transitions where configured.
- Immediately log all state transitions.

## Notification framework (§5.4)

- Trigger notifications on new tasks and status changes.
- Deliver notifications via email and in-app alerts.
- Include title, content link, and required action in notifications.

## Content control & versioning (§5.5)

- Store revision-secure audit log of all actions: User ID, timestamp, status change, comments.
- Automatically version all content changes made during workflow.
- Prevent publication of item under review when mandatory workflow steps are incomplete.
- Publication lock applies to the item itself, not other content or parent pages referencing last approved version.

## Search & reporting (§5.6)

- Filter workflows by content item, creator, status, and responsible party.
- Full-text search across workflow logs and task descriptions.
- Central task dashboard showing all open tasks and current states.

## Technical integration (§6.1)

- Use existing Crafter CMS REST APIs for status changes and metadata queries.
- Maintain full compatibility with deployed Crafter CMS version and existing content types.
- Store workflow metadata as separate additive descriptors (XML sidecar or dedicated fields) without altering existing field structures (preferred).
- Justify any deviation from additive-metadata approach explicitly.

## Infrastructure (§6.2)

- Integrate authentication with existing LDAP, Active Directory, and SSO.
- Use corporate email systems for automated notification triggers.
- Support current Cloud or On-Premise hosting environments.

## Performance (§6.3)

- Process status changes within 5 seconds.
- Display complete workflow history within 10 seconds.
- Implement and deploy without interrupting daily CMS editorial operations.

## Compliance (§6.4)

- Adhere to GDPR (DSGVO) for user logging and personal data processing.
- Workflow modules must not introduce new security vulnerabilities.
- Utilize the central Crafter permission model.

## Business process architecture

- Content creation as draft as structured quality-control entry point.
- Review and approval as primary quality gatekeeper (Approve / Reject / Request Changes).
- Revision loop after rejection with clear correction assignment and iteration history.
- Publication via existing Crafter mechanisms (manual or scheduled); automation desirable but not required.
- Workflow definition and management by administrators for organizational flexibility.
- Task and notification step to identify next actions and inform responsible parties.
- Revision and documentation of every status change for audit and compliance.
- Content archiving at end of lifecycle (nice-to-have; Git versioning noted as baseline).

## User roles & permissions (§8)

- Author: create content and save as Draft.
- Editor: manage content, submit for review, handle revisions; act as reviewing party in editorial step.
- Approver: final review and grant publication release.
- Administrator: configure workflows, reset stuck workflows, manage global settings.
- Allow single user to hold multiple roles simultaneously (not one role per account).
- Enforce Four-Eyes Principle: content creator and final Approver cannot be the same person.
- Make Four-Eyes configurable per workflow or content type; allow disable for non-critical content.

## Functional acceptance (§9.1)

- Non-technical users can create workflows with states, transitions, roles, and conditions.
- Every status change is logged with timestamp and user ID.
- Unauthorized users are blocked from performing status transitions.
- Workflow status is clearly visible within the Crafter CMS UI.

## Technical acceptance (§9.2)

- Provide full REST API documentation.
- Ensure complete compatibility with existing content types and global permissions.
- Achieve 95% test case pass rate without critical errors in staging.
- Generate meaningful error messages for invalid transitions (e.g., Draft to Published).

## Documentation & training (§9.3)

- Provide user manual for Authors, Editors, and Reviewers.
- Provide technical spec: architecture, API, example configurations.
- Conduct training for Administrators and lead Editors.

## Use cases & test scenarios

- **UC1 Submit for Review:** Editor moves draft to review; status becomes In Review; item appears on Reviewer dashboard; submitting Editor cannot edit content.
- **UC2 Approve/Reject:** Reviewer opens task, reviews, approves or requests changes; action logged; Editor notified on revision request.
- **UC3 Revision after rejection:** Editor receives notification, edits, re-submits; history tracks iteration; status returns to In Review.
- **UC4 View workflow log:** User opens content History/Workflow area; sees chronological status changes, users, timestamps.
- **UC5 Workflow definition:** Administrator defines steps, transitions, roles; activates template; workflow available for selection or auto-assignment.
- **UC6 Automated notifications:** On status change, system identifies responsible role and sends notification with title, link, and required action.
- **UC7 Content-type workflow selection:** On create, system auto-assigns or offers filtered workflow by content type (e.g., News vs. Legal).
- **UC8 Workflow reset/abort:** Administrator resets stuck workflow; content returns to initial status; audit log retained showing reset.

## Mandatory test cases (tech-lead)

- Standard flow: Create (Draft) → Review → Approve → verify log and publication eligibility.
- Permissions: unauthorized user attempts status change → system blocks.
- Notification: status to In Review → verify email/in-app delivery to correct Reviewer.
- Error handling: Draft to Published direct transition → meaningful error message.

## Project constraints & risks

- Implementation must not interrupt daily CMS operations; staging-to-production deployment must be seamless.
- Solution must be modular and update-friendly; avoid customizations that block Crafter CMS core upgrades.
- Four-Eyes Principle must be enforceable as configurable system rule per workflow or content type.
- Technical implementation must accommodate existing role models without forcing editorial department restructuring.
