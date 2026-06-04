import plugins.org.rd.plugin.crafterwf.WorkflowContext
import plugins.org.rd.plugin.crafterwf.service.CommentService

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext, request)
def authorUsername = WorkflowContext.resolveUsername(applicationContext, request)

def target = CommentService.resolveTargetParams(params)
def body = params.body ?: params.comment

if (!target.targetType || !target.targetId) {
    throw new IllegalArgumentException('targetType and targetId are required')
}

def mentionedUserIds = []
if (params.mentionedUserIds) {
    params.mentionedUserIds.toString().split(',').each { part ->
        def trimmed = part?.trim()
        if (trimmed) {
            mentionedUserIds << Long.parseLong(trimmed)
        }
    }
}

return ctx.commentService.createComment(
    siteId, target.targetType, target.targetId, body, userId, authorUsername, mentionedUserIds ?: null
)
