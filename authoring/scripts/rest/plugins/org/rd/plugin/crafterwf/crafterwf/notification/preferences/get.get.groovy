import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext, request)

return ctx.notificationService.getPreferences(siteId, userId)
