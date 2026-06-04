import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def assigneeId = params.assigneeId ? Long.parseLong(params.assigneeId as String) : WorkflowContext.resolveUserId(applicationContext, request)

return [
    openCount    : ctx.taskService.countOpenTasks(siteId, assigneeId),
    overdueCount : ctx.taskService.countOverdueTasks(siteId, assigneeId)
]
