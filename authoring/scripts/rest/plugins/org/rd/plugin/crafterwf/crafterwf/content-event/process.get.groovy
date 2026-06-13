import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def eventType = params.eventType ?: params.contentLifecycleOperation
def contentPath = params.contentPath ?: params.path
def contentType = params.contentType

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
