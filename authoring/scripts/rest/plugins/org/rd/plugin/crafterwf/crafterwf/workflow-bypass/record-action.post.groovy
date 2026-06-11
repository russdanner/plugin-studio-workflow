import plugins.org.rd.plugin.crafterwf.WorkflowContext

def body = WorkflowContext.parseJsonBody(request)
if (body.__invalidJson) {
    throw new IllegalArgumentException("Invalid JSON body: ${body.detail}")
}

def siteId = WorkflowContext.requireSiteId(body.siteId ? [siteId: body.siteId] : params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext, request)
def username = WorkflowContext.resolveUsername(applicationContext, request)

def violations = body.violations
if (!(violations instanceof List) || violations.isEmpty()) {
    throw new IllegalArgumentException('violations array is required')
}
def action = body.action ?: 'publish'

return [
    entries: ctx.bypassService.recordBypassActions(siteId, violations, action, userId, username)
]
