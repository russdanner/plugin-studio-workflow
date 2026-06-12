import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext, request)
def username = WorkflowContext.resolveUsername(applicationContext, request)
def id = params.id ?: params.itemId
if (!id?.trim()) {
    throw new IllegalArgumentException('id is required')
}
def confirmCollision = params.confirmCollision == 'true' || params.confirmCollision == true

return ctx.recycleBinService.restoreItem(siteId, id.trim(), userId, username, confirmCollision)
