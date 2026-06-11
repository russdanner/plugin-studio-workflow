import plugins.org.rd.plugin.crafterwf.WorkflowContext
import plugins.org.rd.plugin.crafterwf.util.RestParams

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext)
def username = WorkflowContext.resolveUsername(applicationContext, request)

// workflowId / boardId optional — WorkflowBoardService resolves the site default when omitted
def workflowId = RestParams.optionalString(params, 'workflowId')
    ?: RestParams.optionalString(params, 'boardId')

return ctx.boardService.getBoard(siteId, workflowId, userId, username)
