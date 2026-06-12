package plugins.org.rd.plugin.crafterwf

import groovy.json.JsonSlurper
import plugins.org.rd.plugin.crafterwf.dao.AuditLogDao
import plugins.org.rd.plugin.crafterwf.dao.CommentDao
import plugins.org.rd.plugin.crafterwf.dao.NotificationDao
import plugins.org.rd.plugin.crafterwf.dao.NotificationPreferenceDao
import plugins.org.rd.plugin.crafterwf.dao.RecycleBinDao
import plugins.org.rd.plugin.crafterwf.dao.TaskDao
import plugins.org.rd.plugin.crafterwf.dao.WorkflowPackageAttachmentDao
import plugins.org.rd.plugin.crafterwf.dao.WorkflowPackageDao
import plugins.org.rd.plugin.crafterwf.db.WorkflowDb
import plugins.org.rd.plugin.crafterwf.service.AuditLogService
import plugins.org.rd.plugin.crafterwf.service.CommentService
import plugins.org.rd.plugin.crafterwf.service.NotificationEmailService
import plugins.org.rd.plugin.crafterwf.service.NotificationService
import plugins.org.rd.plugin.crafterwf.service.RecycleBinService
import plugins.org.rd.plugin.crafterwf.service.TaskNotificationSupport
import plugins.org.rd.plugin.crafterwf.service.TaskService
import plugins.org.rd.plugin.crafterwf.service.WorkflowAdminService
import plugins.org.rd.plugin.crafterwf.service.WorkflowBoardService
import plugins.org.rd.plugin.crafterwf.service.WorkflowDefinitionService
import plugins.org.rd.plugin.crafterwf.service.WorkflowPackageService
import plugins.org.rd.plugin.crafterwf.service.StepRuleService
import plugins.org.rd.plugin.crafterwf.service.WorkflowBypassService
import plugins.org.rd.plugin.crafterwf.service.WorkflowContentEventService
import plugins.org.rd.plugin.crafterwf.service.WorkflowStepActionService
import plugins.org.rd.plugin.crafterwf.util.WorkflowBeanLookup

/**
 * Factory for plugin services backed by Studio's JDBC pool.
 */
class WorkflowContext {

    final WorkflowDb db
    final WorkflowBoardService boardService
    final WorkflowPackageService packageService
    final CommentService commentService
    final NotificationService notificationService
    final TaskService taskService
    final AuditLogService auditLogService
    final WorkflowAdminService adminService
    final StepRuleService stepRuleService
    final WorkflowContentEventService contentEventService
    final WorkflowBypassService bypassService
    final RecycleBinService recycleBinService

    private WorkflowContext(WorkflowDb db, def applicationContext) {
        this.db = db
        def packageDao = new WorkflowPackageDao(db)
        def definitionService = new WorkflowDefinitionService(applicationContext)
        def attachmentDao = new WorkflowPackageAttachmentDao(db)
        def commentDao = new CommentDao(db)
        def notificationDao = new NotificationDao(db)
        def preferenceDao = new NotificationPreferenceDao(db)
        def taskDao = new TaskDao(db)
        def auditLogDao = new AuditLogDao(db)
        this.auditLogService = new AuditLogService(auditLogDao)
        def emailService = new NotificationEmailService(applicationContext, preferenceDao)
        this.notificationService = new NotificationService(
            notificationDao, preferenceDao, emailService, packageDao, taskDao
        )
        def taskNotifications = new TaskNotificationSupport(notificationService)
        this.taskService = new TaskService(taskDao, packageDao, taskNotifications, auditLogService)
        this.commentService = new CommentService(commentDao, packageDao, definitionService, notificationService, applicationContext)
        this.stepRuleService = new StepRuleService(applicationContext, attachmentDao, db.jdbcDataSource)
        this.boardService = new WorkflowBoardService(
            definitionService, packageDao, attachmentDao, stepRuleService, applicationContext, db.jdbcDataSource
        )
        this.packageService = new WorkflowPackageService(
            packageDao, attachmentDao, commentService, definitionService, auditLogService, stepRuleService,
            applicationContext
        )
        def stepActionService = new WorkflowStepActionService(
            definitionService, packageDao, attachmentDao, auditLogService, applicationContext, packageService
        )
        packageService.setStepActionService(stepActionService)
        this.adminService = new WorkflowAdminService(db, packageDao, definitionService, applicationContext)
        this.contentEventService = new WorkflowContentEventService(definitionService, packageService, applicationContext)
        this.bypassService = new WorkflowBypassService(
            definitionService,
            packageDao,
            attachmentDao,
            taskDao,
            commentDao,
            auditLogService,
            notificationService,
            applicationContext
        )
        this.recycleBinService = new RecycleBinService(
            new RecycleBinDao(db),
            attachmentDao,
            auditLogService,
            applicationContext
        )
    }

    static WorkflowContext create(def applicationContext, def pluginConfig = null, boolean ignoredAutoMigrate = true) {
        def db = new WorkflowDb(applicationContext)
        db.migrate()
        return new WorkflowContext(db, applicationContext)
    }

    static Map parseJsonBody(def request) {
        try {
            def text = request?.reader?.text
            if (!text?.trim()) {
                return [:]
            }
            return new JsonSlurper().parseText(text) as Map
        } catch (Exception e) {
            return [__invalidJson: true, detail: e.message]
        }
    }

    static Long resolveUserId(def applicationContext, def request = null) {
        def username = resolveUsername(applicationContext, request)
        def userId = resolveUserIdByUsername(applicationContext, username)
        return userId != null ? userId : 0L
    }

    static String resolveUsername(def applicationContext, def request = null) {
        try {
            def fromRequest = request?.remoteUser
            if (!fromRequest && request != null) {
                fromRequest = request.getRemoteUser()
            }
            if (fromRequest instanceof String && fromRequest.trim()) {
                return fromRequest.trim()
            }
        } catch (Exception ignored) {
        }

        try {
            def securityService = WorkflowBeanLookup.resolve(applicationContext, 'securityService')
                ?: WorkflowBeanLookup.resolve(applicationContext, 'cstudioSecurityService')
            if (securityService != null) {
                def current = securityService.getCurrentUser()
                if (current instanceof String && current.trim()) {
                    return current.trim()
                }
                if (current?.username) {
                    return current.username as String
                }
                if (current?.name) {
                    return current.name as String
                }
                def auth = securityService.getAuthentication()
                def principal = auth?.principal
                if (principal instanceof String && principal.trim()) {
                    return principal.trim()
                }
                if (principal?.username) {
                    return principal.username as String
                }
            }
        } catch (Exception ignored) {
        }
        return 'unknown'
    }

    static Long resolveUserIdByUsername(def applicationContext, String username) {
        if (!username?.trim() || username.trim() == 'unknown') {
            return null
        }
        try {
            def userService = WorkflowBeanLookup.resolve(applicationContext, 'userService')
            if (userService != null) {
                def user = userService.getUserByIdOrUsername(-1L, username.trim())
                if (user?.id != null) {
                    return user.id as Long
                }
            }
        } catch (Exception ignored) {
        }
        return null
    }

    static String requireSiteId(params) {
        def siteId = params.siteId
        if (!siteId) {
            throw new IllegalArgumentException('siteId is required')
        }
        return siteId as String
    }
}
