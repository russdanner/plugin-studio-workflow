import plugins.org.rd.plugin.crafterwf.WorkflowContext
import plugins.org.rd.plugin.crafterwf.service.TaskService
import plugins.org.rd.plugin.crafterwf.util.RestParams

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)

def assigneeId = params.assigneeId ?
    RestParams.parseLong(params.assigneeId, 'assigneeId') :
    WorkflowContext.resolveUserId(applicationContext, request)
def assigneeUsername = params.assigneeUsername ?: WorkflowContext.resolveUsername(applicationContext, request)
def actorUserId = WorkflowContext.resolveUserId(applicationContext, request)
def actorUsername = WorkflowContext.resolveUsername(applicationContext, request)
def title = RestParams.requireString(params, 'title')
def priority = params.priority
def startOn = params.startOn ? RestParams.parseDueOn('startOn', params.startOn) { TaskService.parseDueOn(it) } : null
def dueOn = params.dueOn ? RestParams.parseDueOn('dueOn', params.dueOn) { TaskService.parseDueOn(it) } : null
def targetType = params.targetType ?: params.target_type
def targetId = params.targetId ?: params.target_id

return ctx.taskService.createTask(
    siteId, title, priority, assigneeId, assigneeUsername, startOn, dueOn,
    targetType, targetId, actorUserId, actorUsername
)
