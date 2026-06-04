import plugins.org.rd.plugin.crafterwf.WorkflowContext
import plugins.org.rd.plugin.crafterwf.util.RestParams

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext, request)

def commentId = RestParams.requireString(params, 'commentId')
def resolved = RestParams.parseBoolean(params.resolved)

return ctx.commentService.resolveComment(siteId, commentId, resolved, userId)
