import plugins.org.rd.plugin.crafterwf.WorkflowContext
import plugins.org.rd.plugin.crafterwf.util.RestParams

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext)
def username = WorkflowContext.resolveUsername(applicationContext, request)

def workflowPackageId = RestParams.requireOneOf(params, ['workflowPackageId', 'cardId'], 'workflowPackageId is required')
def workflowStepId = RestParams.requireOneOf(params, ['workflowStepId', 'listId'], 'workflowStepId is required')
def index = RestParams.parseInt(params.index, 'index', 0)

return ctx.packageService.movePackage(siteId, workflowPackageId, workflowStepId, index, userId, username)
