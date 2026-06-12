import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def username = WorkflowContext.resolveUsername(applicationContext, request)
def id = params.id ?: params.itemId
if (!id?.trim()) {
    throw new IllegalArgumentException('id is required')
}

return ctx.recycleBinService.checkRestore(siteId, id.trim(), username)
