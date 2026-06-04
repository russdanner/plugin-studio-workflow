# Potential Requirements

Single-line inventory derived from the CrafterCMS Workflow Requirements document. Each item is a candidate requirement for evaluation against the `crafter-workflow` design.

## Executive & strategic objectives

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
