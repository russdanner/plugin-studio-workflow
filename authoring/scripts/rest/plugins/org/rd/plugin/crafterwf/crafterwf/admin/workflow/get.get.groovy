import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def workflowId = params.workflowId
if (!workflowId) {
    throw new IllegalArgumentException('workflowId is required')
}

def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
return ctx.adminService.getWorkflow(siteId, workflowId)
