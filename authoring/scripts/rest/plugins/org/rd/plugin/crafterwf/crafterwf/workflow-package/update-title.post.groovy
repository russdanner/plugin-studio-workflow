import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext)
def username = WorkflowContext.resolveUsername(applicationContext, request)

def workflowPackageId = params.workflowPackageId ?: params.cardId
def title = params.title
if (!workflowPackageId) {
    throw new IllegalArgumentException('workflowPackageId is required')
}
if (title == null) {
    throw new IllegalArgumentException('title is required')
}

return ctx.packageService.updatePackageTitle(siteId, workflowPackageId as String, title as String, userId, username)
