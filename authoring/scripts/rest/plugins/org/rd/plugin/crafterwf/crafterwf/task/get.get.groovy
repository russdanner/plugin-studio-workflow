import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)

def taskId = params.taskId ?: params.task_id
if (!taskId) {
    throw new IllegalArgumentException('taskId is required')
}

return ctx.taskService.getTask(siteId, taskId as String)
