import plugins.org.rd.plugin.crafterwf.WorkflowContext
import plugins.org.rd.plugin.crafterwf.util.RestParams

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)

def taskId = RestParams.requireOneOf(params, ['taskId', 'task_id'])
def complete = params.complete != 'false'
def actorUserId = WorkflowContext.resolveUserId(applicationContext, request)
def actorUsername = WorkflowContext.resolveUsername(applicationContext, request)

return ctx.taskService.completeTask(siteId, taskId, complete, actorUserId, actorUsername)
