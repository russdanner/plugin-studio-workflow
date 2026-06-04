package plugins.org.rd.plugin.crafterwf.service

import plugins.org.rd.plugin.crafterwf.dao.TaskDao
import plugins.org.rd.plugin.crafterwf.dao.WorkflowPackageDao
import plugins.org.rd.plugin.crafterwf.model.AuditOperation
import plugins.org.rd.plugin.crafterwf.model.AuditTargetType
import plugins.org.rd.plugin.crafterwf.model.CommentTargetType
import plugins.org.rd.plugin.crafterwf.model.TaskPriority
import plugins.org.rd.plugin.crafterwf.service.AuditLogService

class TaskService {

    private final TaskDao taskDao
    private final WorkflowPackageDao packageDao
    private final TaskNotificationSupport taskNotifications
    private final AuditLogService auditLogService

    TaskService(TaskDao taskDao, WorkflowPackageDao packageDao, TaskNotificationSupport taskNotifications,
                AuditLogService auditLogService) {
        this.taskDao = taskDao
        this.packageDao = packageDao
        this.taskNotifications = taskNotifications
        this.auditLogService = auditLogService
    }

    List<Map> listTasks(String siteId, Long assigneeId, boolean includeComplete = true,
                        boolean includeArchived = false, String targetType = null, String targetId = null) {
        requireAssigneeId(assigneeId)
        def rows = taskDao.findByAssignee(siteId, assigneeId, includeComplete, includeArchived, targetType, targetId)
        return toDtos(siteId, rows)
    }

    List<Map> listSiteTasks(String siteId, boolean includeComplete = true, boolean includeArchived = false) {
        def rows = taskDao.findBySite(siteId, includeComplete, includeArchived)
        return toDtos(siteId, rows)
    }

    List<Map> listTasksByTarget(String siteId, String targetType, String targetId,
                                boolean includeComplete = true, boolean includeArchived = false) {
        requireTarget(targetType, targetId)
        def rows = taskDao.findByTarget(siteId, targetType.trim(), targetId.trim(), includeComplete, includeArchived)
        return toDtos(siteId, rows)
    }

    int countOpenTasks(String siteId, Long assigneeId) {
        requireAssigneeId(assigneeId)
        return taskDao.countOpen(siteId, assigneeId)
    }

    int countOverdueTasks(String siteId, Long assigneeId) {
        requireAssigneeId(assigneeId)
        return taskDao.countOverdue(siteId, assigneeId)
    }

    Map createTask(String siteId, String title, String priority, Long assigneeId, String assigneeUsername,
                 Date startOn, Date dueOn, String targetType, String targetId,
                 Long actorUserId, String actorUsername) {
        def trimmedTitle = title?.trim()
        if (!trimmedTitle) {
            throw new IllegalArgumentException('title is required')
        }
        requireAssigneeId(assigneeId)
        validateTaskDates(startOn, dueOn)
        def task = taskDao.insert(
            siteId,
            trimmedTitle,
            TaskPriority.normalize(priority),
            assigneeId,
            assigneeUsername,
            startOn,
            dueOn,
            targetType?.trim(),
            targetId?.trim()
        )
        taskNotifications.onTaskCreated(siteId, task, actorUserId, actorUsername)
        auditLogService.record(
            siteId,
            actorUserId,
            actorUsername,
            AuditOperation.TASK_CREATED,
            AuditTargetType.TASK,
            task.id as String,
            "Created task \"${trimmedTitle}\""
        )
        return toDto(siteId, task)
    }

    Map updateTask(String siteId, String taskId, Map updates, Long actorUserId, String actorUsername) {
        def existing = requireTask(siteId, taskId)
        def fields = [:]
        if (updates.containsKey('title')) {
            def trimmedTitle = updates.title?.toString()?.trim()
            if (!trimmedTitle) {
                throw new IllegalArgumentException('title is required')
            }
            fields.title = trimmedTitle
        }
        if (updates.containsKey('priority')) {
            fields.priority = TaskPriority.normalize(updates.priority?.toString())
        }
        if (updates.containsKey('dueOn')) {
            fields.due_on = parseDueOn(updates.dueOn)
        }
        if (updates.containsKey('startOn')) {
            fields.start_on = parseDueOn(updates.startOn)
        }
        if (updates.containsKey('assigneeId')) {
            fields.assignee_id = updates.assigneeId as Long
        }
        if (updates.containsKey('assigneeUsername')) {
            fields.assignee_username = updates.assigneeUsername?.toString()?.trim()
        }
        if (updates.containsKey('targetType')) {
            fields.target_type = updates.targetType?.toString()?.trim()
        }
        if (updates.containsKey('targetId')) {
            fields.target_id = updates.targetId?.toString()?.trim()
        }
        if (fields) {
            validateTaskDates(
                fields.containsKey('start_on') ? fields.start_on : existing.start_on,
                fields.containsKey('due_on') ? fields.due_on : existing.due_on
            )
            taskDao.updateFields(siteId, taskId, fields)
        }
        def updated = taskDao.findById(siteId, taskId)
        taskNotifications.onTaskUpdated(siteId, existing, updated, updates, actorUserId, actorUsername)
        if (fields) {
            auditLogService.record(
                siteId,
                actorUserId,
                actorUsername,
                AuditOperation.TASK_MODIFIED,
                AuditTargetType.TASK,
                taskId,
                buildTaskUpdateNote(existing, updated, fields)
            )
        }
        return toDto(siteId, updated)
    }

    Map completeTask(String siteId, String taskId, boolean complete, Long actorUserId, String actorUsername) {
        def existing = requireTask(siteId, taskId)
        taskDao.setComplete(siteId, taskId, complete)
        def updated = taskDao.findById(siteId, taskId)
        taskNotifications.onTaskCompleted(siteId, updated, complete, actorUserId, actorUsername)
        auditLogService.record(
            siteId,
            actorUserId,
            actorUsername,
            AuditOperation.TASK_MODIFIED,
            AuditTargetType.TASK,
            taskId,
            complete ? 'Marked task complete' : 'Marked task incomplete'
        )
        return toDto(siteId, updated)
    }

    Map archiveTask(String siteId, String taskId, boolean archived, Long actorUserId, String actorUsername) {
        def existing = requireTask(siteId, taskId)
        taskDao.setArchived(siteId, taskId, archived)
        def updated = taskDao.findById(siteId, taskId)
        taskNotifications.onTaskArchived(siteId, updated, archived, actorUserId, actorUsername)
        auditLogService.record(
            siteId,
            actorUserId,
            actorUsername,
            AuditOperation.TASK_MODIFIED,
            AuditTargetType.TASK,
            taskId,
            archived ? 'Archived task' : 'Restored task from archive'
        )
        return toDto(siteId, updated)
    }

    Map getTask(String siteId, String taskId) {
        return toDto(siteId, requireTask(siteId, taskId))
    }

    static Date parseDueOn(value) {
        if (value == null || (value instanceof String && !value.trim())) {
            return null
        }
        if (value instanceof Date) {
            return value
        }
        def text = value.toString().trim()
        try {
            return javax.xml.bind.DatatypeConverter.parseDateTime(text.endsWith('Z') ? text : text + 'Z').time
        } catch (Exception ignored) {
        }
        try {
            return Date.parse('yyyy-MM-dd', text)
        } catch (Exception ignored) {
        }
        try {
            return Date.parse('yyyy-MM-dd\'T\'HH:mm', text)
        } catch (Exception ignored) {
        }
        try {
            return Date.parse('yyyy-MM-dd\'T\'HH:mm:ss', text)
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid due date: ${text}")
        }
    }

    private static String buildTaskUpdateNote(Map before, Map after, Map fields) {
        def parts = []
        if (fields.containsKey('title')) {
            parts << "Title changed to \"${after.title}\""
        }
        if (fields.containsKey('priority')) {
            parts << "Priority changed to ${after.priority}"
        }
        if (fields.containsKey('due_on')) {
            parts << after.due_on ? "Due date set to ${after.due_on}" : 'Due date cleared'
        }
        if (fields.containsKey('start_on')) {
            parts << after.start_on ? "Start date set to ${after.start_on}" : 'Start date cleared'
        }
        if (fields.containsKey('assignee_id') || fields.containsKey('assignee_username')) {
            def assignee = after.assignee_username ?: after.assignee_id
            parts << "Assignee changed to ${assignee}"
        }
        if (fields.containsKey('target_type') || fields.containsKey('target_id')) {
            parts << "Target changed to ${after.target_type ?: 'none'}:${after.target_id ?: 'none'}"
        }
        return parts ? parts.join('; ') : "Updated task \"${after.title}\""
    }

    private Map requireTask(String siteId, String taskId) {
        def existing = taskDao.findById(siteId, taskId)
        if (!existing) {
            throw new IllegalArgumentException("Task not found: ${taskId}")
        }
        return existing
    }

    private static void requireAssigneeId(Long assigneeId) {
        if (assigneeId == null) {
            throw new IllegalArgumentException('assigneeId is required')
        }
    }

    private static void requireTarget(String targetType, String targetId) {
        if (!targetType?.trim()) {
            throw new IllegalArgumentException('targetType is required')
        }
        if (!targetId?.trim()) {
            throw new IllegalArgumentException('targetId is required')
        }
    }

    private List<Map> toDtos(String siteId, List<Map> rows) {
        def packagesById = resolvePackagesById(siteId, rows)
        return rows.collect { row ->
            toDto(siteId, row, packagesById[row.target_id as String])
        }
    }

    private Map resolvePackagesById(String siteId, List<Map> rows) {
        def packageIds = rows.findAll {
            CommentTargetType.WORKFLOW_PACKAGE == it.target_type && it.target_id
        }.collect { it.target_id as String }.unique()
        def packagesById = [:]
        packageIds.each { id ->
            def pkg = packageDao.findById(siteId, id)
            if (pkg) {
                packagesById[id] = pkg
            }
        }
        return packagesById
    }

    private Map toDto(String siteId, Map row, Map pkg = null) {
        def dto = [
            id               : row.id,
            siteId           : row.site_id,
            title            : row.title,
            priority         : row.priority,
            assigneeId       : row.assignee_id,
            assigneeUsername : row.assignee_username,
            startOn          : row.start_on,
            dueOn            : row.due_on,
            complete         : isTrue(row.complete_b),
            archived         : isTrue(row.archived_b),
            targetType       : row.target_type,
            targetId         : row.target_id,
            createdOn        : row.created_on,
            modifiedOn       : row.modified_on,
            completedOn      : row.completed_on
        ]
        if (CommentTargetType.WORKFLOW_PACKAGE == row.target_type && row.target_id) {
            def resolved = pkg ?: packageDao.findById(siteId, row.target_id as String)
            if (resolved) {
                dto.targetTitle = resolved.title
                dto.targetWorkflowId = resolved.workflow_id
            }
        }
        return dto
    }

    private static void validateTaskDates(Date startOn, Date dueOn) {
        if (startOn && dueOn && startOn.after(dueOn)) {
            throw new IllegalArgumentException('Start date must be on or before due date')
        }
    }

    private static boolean isTrue(value) {
        if (value instanceof Boolean) {
            return value
        }
        if (value instanceof Number) {
            return (value as int) != 0
        }
        return value == true || value == 'true' || value == '1'
    }
}
