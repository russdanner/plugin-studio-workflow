import plugins.org.rd.plugin.crafterwf.WorkflowContext
import plugins.org.rd.plugin.crafterwf.util.RestParams

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext, request)

def notificationId = params.notificationId
def markAll = params.markAll == 'true'
def read = RestParams.parseBoolean(params.read, true)

if (markAll) {
    return ctx.notificationService.markAllRead(siteId, userId)
}

if (!notificationId) {
    throw new IllegalArgumentException('notificationId is required unless markAll=true')
}

return ctx.notificationService.markRead(siteId, userId, notificationId, read)
