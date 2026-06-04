package plugins.org.rd.plugin.crafterwf.service

import plugins.org.rd.plugin.crafterwf.model.CommentTargetType

class TaskNotificationSupport {

    private final NotificationService notificationService

    TaskNotificationSupport(NotificationService notificationService) {
        this.notificationService = notificationService
    }

    void onTaskCreated(String siteId, Map task, Long actorUserId, String actorUsername) {
        notifyAssignee(siteId, task, actorUserId, actorUsername, 'Task assigned to you',
            "${formatActor(actorUsername)} assigned you the task \"${task.title}\".")
    }

    void onTaskUpdated(String siteId, Map before, Map after, Map updates, Long actorUserId, String actorUsername) {
        if (updates.containsKey('assigneeId')) {
            def newAssigneeId = updates.assigneeId as Long
            def oldAssigneeId = before.assignee_id as Long
            if (newAssigneeId != null && newAssigneeId != oldAssigneeId && newAssigneeId != actorUserId) {
                safeNotify(siteId, newAssigneeId, 'Task assigned to you',
                    "${formatActor(actorUsername)} assigned you the task \"${after.title}\".",
                    notificationTarget(siteId, after))
            }
        }

        def assigneeId = after.assignee_id as Long
        if (assigneeId == null || assigneeId == actorUserId) {
            return
        }
        if (assigneeId != before.assignee_id as Long) {
            return
        }

        def detail = describeUpdates(before, updates)
        if (!detail) {
            return
        }
        safeNotify(siteId, assigneeId, 'Task updated',
            "${formatActor(actorUsername)} updated your task \"${after.title}\": ${detail}.",
            notificationTarget(siteId, after))
    }

    void onTaskCompleted(String siteId, Map task, boolean complete, Long actorUserId, String actorUsername) {
        def verb = complete ? 'completed' : 'reopened'
        notifyAssignee(siteId, task, actorUserId, actorUsername, "Task ${verb}",
            "${formatActor(actorUsername)} ${verb} your task \"${task.title}\".")
    }

    void onTaskArchived(String siteId, Map task, boolean archived, Long actorUserId, String actorUsername) {
        def verb = archived ? 'archived' : 'restored'
        notifyAssignee(siteId, task, actorUserId, actorUsername, "Task ${verb}",
            "${formatActor(actorUsername)} ${verb} your task \"${task.title}\".")
    }

    private void notifyAssignee(String siteId, Map task, Long actorUserId, String actorUsername,
                                String title, String message) {
        def assigneeId = task.assignee_id as Long
        if (assigneeId == null || assigneeId == actorUserId) {
            return
        }
        safeNotify(siteId, assigneeId, title, message, notificationTarget(siteId, task))
    }

    private void safeNotify(String siteId, Long userId, String title, String message, Map target) {
        if (userId == null) {
            return
        }
        try {
            notificationService.createNotification(
                siteId, userId, title, message, target?.type, target?.id
            )
        } catch (Exception ignored) {
        }
    }

    private Map notificationTarget(String siteId, Map task) {
        if (CommentTargetType.WORKFLOW_PACKAGE == task.target_type && task.target_id) {
            return [type: CommentTargetType.WORKFLOW_PACKAGE, id: task.target_id as String]
        }
        return [type: 'task', id: task.id as String]
    }

    private static String formatActor(String actorUsername) {
        def name = actorUsername?.trim()
        return name ? name : 'Someone'
    }

    private static String describeUpdates(Map before, Map updates) {
        def parts = []
        if (updates.containsKey('title')) {
            parts << 'title changed'
        }
        if (updates.containsKey('priority')) {
            parts << "priority set to ${updates.priority}"
        }
        if (updates.containsKey('dueOn')) {
            parts << 'due date changed'
        }
        if (updates.containsKey('assigneeId') || updates.containsKey('assigneeUsername')) {
            parts << 'assignee changed'
        }
        if (updates.containsKey('targetType') || updates.containsKey('targetId')) {
            parts << 'target changed'
        }
        return parts ? parts.join(', ') : null
    }
}
