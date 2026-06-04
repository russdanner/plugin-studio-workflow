import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext)
def username = WorkflowContext.resolveUsername(applicationContext, request)

def workflowPackageId = params.workflowPackageId ?: params.cardId
def description = params.description
if (description == null) {
    description = ''
}
if (!workflowPackageId) {
    throw new IllegalArgumentException('workflowPackageId is required')
}

return ctx.packageService.updatePackageDescription(
    siteId, workflowPackageId as String, description as String, userId, username
)
