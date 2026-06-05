import plugins.org.rd.plugin.crafterwf.WorkflowContext
import plugins.org.rd.plugin.crafterwf.service.TaskService
import plugins.org.rd.plugin.crafterwf.util.RestParams

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext)
def username = WorkflowContext.resolveUsername(applicationContext, request)

def workflowPackageId = RestParams.requireOneOf(params, ['workflowPackageId', 'cardId'], 'workflowPackageId is required')

def dueOn = null
if (params.containsKey('dueOn')) {
    dueOn = RestParams.parseDueOn('dueOn', params.dueOn) { TaskService.parseDueOn(it) }
}

return ctx.packageService.updatePackageDueOn(siteId, workflowPackageId, dueOn, userId, username)
