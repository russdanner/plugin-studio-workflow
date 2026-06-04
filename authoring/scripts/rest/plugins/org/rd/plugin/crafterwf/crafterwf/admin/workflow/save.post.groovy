import plugins.org.rd.plugin.crafterwf.WorkflowContext

def body = WorkflowContext.parseJsonBody(request)
if (body.__invalidJson) {
    throw new IllegalArgumentException("Invalid JSON body: ${body.detail}")
}

def siteId = WorkflowContext.requireSiteId(body.siteId ? [siteId: body.siteId] : params)
def workflowId = body.workflowId ?: params.workflowId
if (!workflowId) {
    throw new IllegalArgumentException('workflowId is required')
}

def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext)

def workflowFields = body.workflow ?: [
    name         : body.name,
    description  : body.description,
    backgroundUrl: body.backgroundUrl ?: body.backgroundColor
]
def steps = body.steps
if (!(steps instanceof List)) {
    throw new IllegalArgumentException('steps array is required')
}

return ctx.adminService.saveWorkflowDefinition(siteId, workflowId, workflowFields, steps, userId)
