import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext)
def username = WorkflowContext.resolveUsername(applicationContext, request)

def workflowPackageId = params.workflowPackageId ?: params.cardId
def contentPath = params.contentPath ?: params.contentId
def displayName = params.displayName ?: params.name
def server = params.server ?: ''

if (!workflowPackageId || !contentPath) {
    throw new IllegalArgumentException('workflowPackageId and contentPath are required')
}

return ctx.packageService.attachContent(
    siteId, workflowPackageId, contentPath, displayName ?: contentPath, server, userId, username
)
