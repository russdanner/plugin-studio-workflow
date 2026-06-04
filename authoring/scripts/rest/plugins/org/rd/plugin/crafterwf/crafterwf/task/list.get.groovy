import plugins.org.rd.plugin.crafterwf.WorkflowContext
import plugins.org.rd.plugin.crafterwf.util.RestParams

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)

def includeComplete = params.includeComplete != 'false'
def includeArchived = params.includeArchived == 'true'
def targetType = params.targetType ?: params.target_type
def targetId = params.targetId ?: params.target_id

if (targetType?.trim() && targetId?.trim()) {
    return [
        tasks: ctx.taskService.listTasksByTarget(
            siteId, targetType, targetId, includeComplete, includeArchived
        )
    ]
}

def allTasks = params.allTasks == 'true' || params.scope == 'all'
if (allTasks) {
    return [
        tasks: ctx.taskService.listSiteTasks(siteId, includeComplete, includeArchived)
    ]
}

def assigneeId = params.assigneeId ?
    RestParams.parseLong(params.assigneeId, 'assigneeId') :
    WorkflowContext.resolveUserId(applicationContext, request)

return [
    tasks: ctx.taskService.listTasks(
        siteId, assigneeId, includeComplete, includeArchived, targetType, targetId
    )
]
