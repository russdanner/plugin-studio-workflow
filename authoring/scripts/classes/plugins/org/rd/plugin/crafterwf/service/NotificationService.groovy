package plugins.org.rd.plugin.crafterwf.service

import org.slf4j.LoggerFactory
import plugins.org.rd.plugin.crafterwf.dao.NotificationDao
import plugins.org.rd.plugin.crafterwf.dao.NotificationPreferenceDao
import plugins.org.rd.plugin.crafterwf.dao.TaskDao
import plugins.org.rd.plugin.crafterwf.dao.WorkflowPackageDao
import plugins.org.rd.plugin.crafterwf.model.CommentTargetType

class NotificationService {

    private static final def LOGGER = LoggerFactory.getLogger(NotificationService)

    private final NotificationDao notificationDao
    private final NotificationPreferenceDao preferenceDao
    private final NotificationEmailService emailService
    private final WorkflowPackageDao packageDao
    private final TaskDao taskDao

    NotificationService(NotificationDao notificationDao, NotificationPreferenceDao preferenceDao,
                        NotificationEmailService emailService, WorkflowPackageDao packageDao, TaskDao taskDao) {
        this.notificationDao = notificationDao
        this.preferenceDao = preferenceDao
        this.emailService = emailService
        this.packageDao = packageDao
        this.taskDao = taskDao
    }

    List<Map> listNotifications(String siteId, Long userId, boolean unreadOnly = false,
                                boolean includeResolved = true, boolean includeArchived = false,
                                boolean markDisplayedAsRead = false) {
        requireUserId(userId)
        def rows = notificationDao.findByUser(siteId, userId, unreadOnly, includeResolved, includeArchived)
        if (markDisplayedAsRead) {
            def unreadIds = rows.findAll { row -> !isTrue(row.read_b) }*.id
            if (unreadIds) {
                notificationDao.markReadByIds(siteId, userId, unreadIds)
                rows = notificationDao.findByUser(siteId, userId, unreadOnly, includeResolved, includeArchived)
            }
        }
        return rows.collect { toDto(siteId, it) }
    }

    int countUnread(String siteId, Long userId) {
        requireUserId(userId)
        return notificationDao.countUnread(siteId, userId)
    }

    Map createNotification(String siteId, Long userId, String title, String message,
                           String targetType = null, String targetId = null) {
        requireUserId(userId)
        def trimmedTitle = title?.trim()
        if (!trimmedTitle) {
            throw new IllegalArgumentException('title is required')
        }
        def notification = notificationDao.insert(
            siteId, userId, trimmedTitle, message?.trim(), targetType?.trim(), targetId?.trim()
        )
        def dto = toDto(siteId, notification)
        LOGGER.info(
            '[crafterwf] In-app notification created id={} site={} userId={} title="{}" targetType={} targetId={}',
            dto.id, siteId, userId, trimmedTitle, targetType, targetId
        )
        try {
            emailService.maybeSendNotificationEmail(siteId, userId, dto)
        } catch (Exception e) {
            LOGGER.error(
                '[crafterwf] Unexpected error while evaluating workflow notification email id={} site={} userId={}: {}',
                dto.id, siteId, userId, e.message, e
            )
        }
        return dto
    }

    Map getPreferences(String siteId, Long userId) {
        requireUserId(userId)
        return toPreferenceDto(preferenceDao.find(siteId, userId))
    }

    Map savePreferences(String siteId, Long userId, String deliveryMode, String summaryTime, Boolean emailEnabled) {
        requireUserId(userId)
        if (emailEnabled == null) {
            throw new IllegalArgumentException('emailEnabled is required')
        }
        def saved = preferenceDao.save(siteId, userId, deliveryMode, summaryTime, emailEnabled)
        return toPreferenceDto(saved)
    }

    Map markRead(String siteId, Long userId, String notificationId, boolean read) {
        requireUserId(userId)
        requireNotification(siteId, userId, notificationId)
        notificationDao.setRead(siteId, userId, notificationId, read)
        return toDto(siteId, notificationDao.findById(siteId, userId, notificationId))
    }

    Map markAllRead(String siteId, Long userId) {
        requireUserId(userId)
        notificationDao.markAllRead(siteId, userId)
        return [updated: true, unreadCount: countUnread(siteId, userId)]
    }

    Map resolveNotification(String siteId, Long userId, String notificationId, boolean resolved) {
        requireUserId(userId)
        requireNotification(siteId, userId, notificationId)
        notificationDao.setResolved(siteId, userId, notificationId, resolved)
        return toDto(siteId, notificationDao.findById(siteId, userId, notificationId))
    }

    Map archiveNotification(String siteId, Long userId, String notificationId, boolean archived) {
        requireUserId(userId)
        requireNotification(siteId, userId, notificationId)
        notificationDao.setArchived(siteId, userId, notificationId, archived)
        return toDto(siteId, notificationDao.findById(siteId, userId, notificationId))
    }

    private Map requireNotification(String siteId, Long userId, String notificationId) {
        def existing = notificationDao.findById(siteId, userId, notificationId)
        if (!existing) {
            throw new IllegalArgumentException("Notification not found: ${notificationId}")
        }
        return existing
    }

    private static void requireUserId(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException('userId is required')
        }
    }

    private Map toDto(String siteId, Map row) {
        def dto = [
            id         : row.id,
            siteId     : row.site_id,
            userId     : row.user_id,
            title      : row.title,
            message    : row.message,
            targetType : row.target_type,
            targetId   : row.target_id,
            read       : isTrue(row.read_b),
            resolved   : isTrue(row.resolved_b),
            archived   : isTrue(row.archived_b),
            createdOn  : row.created_on,
            modifiedOn : row.modified_on
        ]
        enrichTarget(siteId, dto)
        return dto
    }

    private void enrichTarget(String siteId, Map dto) {
        if (!dto.targetType || !dto.targetId) {
            return
        }
        if (CommentTargetType.WORKFLOW_PACKAGE == dto.targetType) {
            def pkg = packageDao.findById(siteId, dto.targetId as String)
            if (pkg) {
                dto.targetTitle = pkg.title
                dto.targetWorkflowId = pkg.workflow_id
            }
            return
        }
        if (CommentTargetType.CONTENT == dto.targetType) {
            dto.targetTitle = dto.targetId
            return
        }
        if ('task' == dto.targetType) {
            def task = taskDao.findById(siteId, dto.targetId as String)
            if (task) {
                dto.targetTitle = task.title
                if (CommentTargetType.WORKFLOW_PACKAGE == task.target_type && task.target_id) {
                    def pkg = packageDao.findById(siteId, task.target_id as String)
                    if (pkg) {
                        dto.targetWorkflowId = pkg.workflow_id
                        dto.targetPackageId = pkg.id
                    }
                }
            }
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

    private static Map toPreferenceDto(Map row) {
        return [
            siteId       : row.site_id,
            userId       : row.user_id,
            deliveryMode : row.delivery_mode ?: 'immediate',
            summaryTime  : row.summary_time,
            emailEnabled : isTrue(row.email_enabled),
            modifiedOn   : row.modified_on
        ]
    }
}
