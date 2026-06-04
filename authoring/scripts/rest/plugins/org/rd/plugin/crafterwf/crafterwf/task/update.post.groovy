import plugins.org.rd.plugin.crafterwf.WorkflowContext
import plugins.org.rd.plugin.crafterwf.service.TaskService
import plugins.org.rd.plugin.crafterwf.util.RestParams

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)

def taskId = RestParams.requireOneOf(params, ['taskId', 'task_id'])
def updates = [:]
if (params.containsKey('title')) {
    updates.title = params.title
}
if (params.containsKey('priority')) {
    updates.priority = params.priority
}
if (params.containsKey('dueOn')) {
    updates.dueOn = RestParams.parseDueOn('dueOn', params.dueOn) { TaskService.parseDueOn(it) }
}
if (params.containsKey('startOn')) {
    updates.startOn = RestParams.parseDueOn('startOn', params.startOn) { TaskService.parseDueOn(it) }
}
if (params.containsKey('assigneeId')) {
    updates.assigneeId = RestParams.parseLong(params.assigneeId, 'assigneeId')
}
if (params.containsKey('assigneeUsername')) {
    updates.assigneeUsername = params.assigneeUsername
}
if (params.containsKey('targetType') || params.containsKey('target_type')) {
    updates.targetType = params.targetType ?: params.target_type
}
if (params.containsKey('targetId') || params.containsKey('target_id')) {
    updates.targetId = params.targetId ?: params.target_id
}

def actorUserId = WorkflowContext.resolveUserId(applicationContext, request)
def actorUsername = WorkflowContext.resolveUsername(applicationContext, request)

return ctx.taskService.updateTask(siteId, taskId, updates, actorUserId, actorUsername)
