import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext)
def username = WorkflowContext.resolveUsername(applicationContext, request)

def workflowStepId = params.workflowStepId ?: params.listId
if (!workflowStepId) {
    throw new IllegalArgumentException('workflowStepId is required')
}

return ctx.packageService.createPackage(
    siteId,
    workflowStepId,
    params.title ?: 'New Package',
    params.description ?: '',
    params.coverColor ?: params.color ?: 'blue',
    userId,
    username
)
