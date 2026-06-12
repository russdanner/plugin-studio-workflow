import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def username = WorkflowContext.resolveUsername(applicationContext, request)

return ctx.recycleBinService.canAccess(siteId, username)
