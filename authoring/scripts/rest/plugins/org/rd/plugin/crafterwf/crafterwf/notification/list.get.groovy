import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext, request)

def unreadOnly = params.unreadOnly == 'true'
def includeResolved = params.includeResolved != 'false'
def includeArchived = params.includeArchived == 'true'
def markDisplayedAsRead = params.markDisplayedAsRead != 'false'

return [
    notifications: ctx.notificationService.listNotifications(
        siteId, userId, unreadOnly, includeResolved, includeArchived, markDisplayedAsRead
    )
]
