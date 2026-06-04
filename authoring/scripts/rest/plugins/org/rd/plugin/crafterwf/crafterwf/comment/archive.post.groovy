import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext, request)

def commentId = params.commentId
def archived = params.archived == 'true'

if (!commentId) {
    throw new IllegalArgumentException('commentId is required')
}

return ctx.commentService.archiveComment(siteId, commentId, archived, userId)
