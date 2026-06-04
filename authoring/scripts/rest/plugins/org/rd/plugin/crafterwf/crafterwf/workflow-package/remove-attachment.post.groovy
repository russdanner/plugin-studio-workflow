import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext)
def username = WorkflowContext.resolveUsername(applicationContext, request)

def workflowPackageId = params.workflowPackageId ?: params.cardId
def attachmentId = params.attachmentId
def attachmentType = params.attachmentType ?: 'content'

if (!workflowPackageId || !attachmentId) {
    throw new IllegalArgumentException('workflowPackageId and attachmentId are required')
}

ctx.packageService.removeAttachment(siteId, workflowPackageId, attachmentId, attachmentType, userId, username)
return [removed: true, attachmentId: attachmentId]
