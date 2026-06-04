import plugins.org.rd.plugin.crafterwf.WorkflowContext
import plugins.org.rd.plugin.crafterwf.util.RestParams

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext)
def username = WorkflowContext.resolveUsername(applicationContext, request)

def workflowId = RestParams.requireOneOf(params, ['workflowId', 'boardId'], 'workflowId or boardId is required')

return ctx.boardService.getBoard(siteId, workflowId, userId, username)
