import plugins.org.rd.plugin.crafterwf.WorkflowContext
import plugins.org.rd.plugin.crafterwf.util.RestParams

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)

def targetUserId = params.userId ?
    RestParams.parseLong(params.userId, 'userId') :
    WorkflowContext.resolveUserId(applicationContext, request)
def title = RestParams.requireString(params, 'title')
def message = params.message ?: params.body
def targetType = params.targetType ?: params.target_type
def targetId = params.targetId ?: params.target_id

return ctx.notificationService.createNotification(
    siteId, targetUserId, title, message, targetType, targetId
)
