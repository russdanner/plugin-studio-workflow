import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)

def workflowPackageId = params.workflowPackageId ?: params.cardId
if (!workflowPackageId) {
    throw new IllegalArgumentException('workflowPackageId is required')
}

def server = params.server ?: ''
return ctx.packageService.getAttachmentsForUi(siteId, workflowPackageId, server)
