package plugins.org.rd.plugin.crafterwf.service

import org.slf4j.LoggerFactory
import plugins.org.rd.plugin.crafterwf.WorkflowContext
import plugins.org.rd.plugin.crafterwf.dao.CommentDao
import plugins.org.rd.plugin.crafterwf.dao.WorkflowPackageDao
import plugins.org.rd.plugin.crafterwf.model.CommentTargetType
import plugins.org.rd.plugin.crafterwf.util.MentionParser

class CommentService {

    private static final def LOGGER = LoggerFactory.getLogger(CommentService)

    private final CommentDao commentDao
    private final WorkflowPackageDao packageDao
    private final WorkflowDefinitionService definitionService
    private final NotificationService notificationService
    private final def applicationContext

    CommentService(CommentDao commentDao, WorkflowPackageDao packageDao, WorkflowDefinitionService definitionService,
                   NotificationService notificationService, def applicationContext) {
        this.commentDao = commentDao
        this.packageDao = packageDao
        this.definitionService = definitionService
        this.notificationService = notificationService
        this.applicationContext = applicationContext
    }

    List<Map> listComments(String siteId, String targetType, String targetId,
                           boolean includeResolved = true, boolean includeArchived = false) {
        requireTarget(targetType, targetId)
        if (CommentTargetType.WORKFLOW_PACKAGE == targetType) {
            requirePackage(siteId, targetId)
        }
        return commentDao.findByTarget(siteId, targetType, targetId, includeResolved, includeArchived)
            .collect { toCommentDto(siteId, it) }
    }

    Map createComment(String siteId, String targetType, String targetId, String body,
                      Long userId, String authorUsername, List<Long> mentionedUserIds = null) {
        requireTarget(targetType, targetId)
        def trimmed = body?.trim()
        if (!trimmed) {
            throw new IllegalArgumentException('Comment body is required')
        }

        String workflowId = null
        String workflowStepId = null
        if (CommentTargetType.WORKFLOW_PACKAGE == targetType) {
            def pkg = requirePackage(siteId, targetId)
            workflowId = pkg.workflow_id
            workflowStepId = pkg.workflow_step_id
        }

        def comment = commentDao.insert(
            siteId, targetType, targetId, trimmed, userId, authorUsername, workflowId, workflowStepId
        )
        notifyMentionedUsers(siteId, targetType, targetId, trimmed, userId, authorUsername, mentionedUserIds)
        return toCommentDto(siteId, comment)
    }

    Map resolveComment(String siteId, String commentId, boolean resolved, Long userId) {
        def existing = commentDao.findById(siteId, commentId)
        if (!existing) {
            throw new IllegalArgumentException("Comment not found: ${commentId}")
        }
        commentDao.setResolved(siteId, commentId, resolved, userId)
        return toCommentDto(siteId, commentDao.findById(siteId, commentId))
    }

    Map archiveComment(String siteId, String commentId, boolean archived, Long userId) {
        def existing = commentDao.findById(siteId, commentId)
        if (!existing) {
            throw new IllegalArgumentException("Comment not found: ${commentId}")
        }
        commentDao.setArchived(siteId, commentId, archived, userId)
        return toCommentDto(siteId, commentDao.findById(siteId, commentId))
    }

    int countComments(String siteId, String targetType, String targetId) {
        return commentDao.countByTarget(siteId, targetType, targetId)
    }

    /** Backward-compatible resolution for legacy API params. */
    static Map resolveTargetParams(Map params) {
        def targetType = params.targetType ?: params.target_type
        def targetId = params.targetId ?: params.target_id

        if (!targetId && (params.workflowPackageId || params.cardId)) {
            targetId = params.workflowPackageId ?: params.cardId
            targetType = CommentTargetType.WORKFLOW_PACKAGE
        }
        if (!targetId && (params.contentPath || params.path)) {
            targetId = params.contentPath ?: params.path
            targetType = CommentTargetType.CONTENT
        }

        return [targetType: targetType, targetId: targetId]
    }

    private void notifyMentionedUsers(String siteId, String targetType, String targetId, String body,
                                     Long authorId, String authorUsername, List<Long> mentionedUserIds = null) {
        def recipientIds = [] as LinkedHashSet<Long>
        if (mentionedUserIds) {
            mentionedUserIds.each { id ->
                if (id != null) {
                    recipientIds << (id as Long)
                }
            }
        }
        MentionParser.extractUsernames(body).each { username ->
            def mentionedUserId = WorkflowContext.resolveUserIdByUsername(applicationContext, username)
            if (mentionedUserId != null) {
                recipientIds << mentionedUserId
            }
        }
        if (!recipientIds) {
            LOGGER.info(
                '[crafterwf] Comment @mention notification skipped — no resolved recipients site={} targetType={} targetId={}',
                siteId, targetType, targetId
            )
            return
        }
        def targetLabel = resolveTargetLabel(siteId, targetType, targetId)
        def actor = authorUsername?.trim() ?: 'Someone'
        def snippet = body.length() > 120 ? body.substring(0, 117) + '...' : body

        LOGGER.info(
            '[crafterwf] Comment @mention notifying {} user(s) site={} targetType={} targetId={} author={} recipients={}',
            recipientIds.size(), siteId, targetType, targetId, actor, recipientIds
        )

        recipientIds.each { mentionedUserId ->
            if (mentionedUserId == authorId) {
                LOGGER.info(
                    '[crafterwf] Comment @mention skipped self-notification userId={} site={}',
                    mentionedUserId, siteId
                )
                return
            }
            try {
                notificationService.createNotification(
                    siteId,
                    mentionedUserId,
                    'You were mentioned in a comment',
                    "${actor} mentioned you on ${targetLabel}: \"${snippet}\"",
                    targetType,
                    targetId
                )
            } catch (Exception ignored) {
            }
        }
    }

    private String resolveTargetLabel(String siteId, String targetType, String targetId) {
        if (CommentTargetType.WORKFLOW_PACKAGE == targetType) {
            def pkg = packageDao.findById(siteId, targetId)
            if (pkg?.title) {
                return "package \"${pkg.title}\""
            }
            return 'a workflow package'
        }
        if (CommentTargetType.CONTENT == targetType) {
            return "content \"${targetId}\""
        }
        return 'a comment thread'
    }

    private static void requireTarget(String targetType, String targetId) {
        if (!targetType?.trim()) {
            throw new IllegalArgumentException('targetType is required')
        }
        if (!targetId?.trim()) {
            throw new IllegalArgumentException('targetId is required')
        }
    }

    private Map requirePackage(String siteId, String workflowPackageId) {
        def pkg = packageDao.findById(siteId, workflowPackageId)
        if (!pkg) {
            throw new IllegalArgumentException("WorkflowPackage not found: ${workflowPackageId}")
        }
        return pkg
    }

    private Map toCommentDto(String siteId, Map comment) {
        def stepName = null
        if (comment.workflow_step_id && comment.workflow_id) {
            stepName = definitionService.findStepName(
                siteId, comment.workflow_id as String, comment.workflow_step_id as String
            )
        }
        return [
            id               : comment.id,
            targetId         : comment.target_id,
            targetType       : comment.target_type,
            body             : comment.body,
            authorId         : comment.author_id,
            authorUsername   : comment.author_username,
            workflowStepId   : comment.workflow_step_id,
            workflowStepName : stepName,
            createdOn        : comment.created_on,
            resolvedOn       : comment.resolved_on,
            resolved         : comment.resolved_on != null,
            archivedOn       : comment.archived_on,
            archived         : comment.archived_on != null
        ]
    }
}
