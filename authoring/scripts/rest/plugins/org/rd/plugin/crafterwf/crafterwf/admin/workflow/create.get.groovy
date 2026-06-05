import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext)

def name = params.name ?: 'New Workflow'
def description = params.description ?: ''
def withDefaultSteps = params.withDefaultSteps != 'false'

return ctx.adminService.createWorkflow(siteId, name, description, withDefaultSteps, userId)
