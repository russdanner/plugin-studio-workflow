import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext, request)
def username = WorkflowContext.resolveUsername(applicationContext, request)
def id = params.id?.trim()
if (!id) {
    throw new IllegalArgumentException('id is required')
}

return ctx.recycleBinService.purgeItem(siteId, id, userId, username)
