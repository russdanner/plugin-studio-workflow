import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext, request)

def notificationId = params.notificationId
def resolved = params.resolved == 'true'

if (!notificationId) {
    throw new IllegalArgumentException('notificationId is required')
}

return ctx.notificationService.resolveNotification(siteId, userId, notificationId, resolved)
