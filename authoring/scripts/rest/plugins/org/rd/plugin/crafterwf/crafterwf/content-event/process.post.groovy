import plugins.org.rd.plugin.crafterwf.WorkflowContext

def body = WorkflowContext.parseJsonBody(request)
if (body.__invalidJson) {
    throw new IllegalArgumentException("Invalid JSON body: ${body.detail}")
}

def siteId = WorkflowContext.requireSiteId(body.siteId ? [siteId: body.siteId] : params)
def eventType = body.eventType ?: body.contentLifecycleOperation ?: params.eventType
def contentPath = body.contentPath ?: body.path ?: params.contentPath ?: params.path
def contentType = body.contentType ?: params.contentType

if (!eventType) {
    throw new IllegalArgumentException('eventType is required (create or edit)')
}
if (!contentPath) {
    throw new IllegalArgumentException('contentPath is required')
}

def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext, request)
def username = WorkflowContext.resolveUsername(applicationContext, request)

def results = ctx.contentEventService.processContentEvent(
    siteId, eventType as String, contentPath as String, contentType as String, userId, username
)

return [
    siteId     : siteId,
    eventType  : eventType,
    contentPath: contentPath,
    results    : results
]
