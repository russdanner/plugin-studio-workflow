import plugins.org.rd.plugin.crafterwf.WorkflowContext
import plugins.org.rd.plugin.crafterwf.util.RestParams

def body = WorkflowContext.parseJsonBody(request)
if (body.__invalidJson) {
    throw new IllegalArgumentException("Invalid JSON body: ${body.detail}")
}

def siteId = WorkflowContext.requireSiteId(body.siteId ? [siteId: body.siteId] : params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext, request)

def deliveryMode = body.deliveryMode ?: params.deliveryMode
def summaryTime = body.summaryTime != null ? body.summaryTime : params.summaryTime
def emailEnabledRaw = body.containsKey('emailEnabled') ? body.emailEnabled : params.emailEnabled
if (emailEnabledRaw == null) {
    throw new IllegalArgumentException('emailEnabled is required')
}
def emailEnabled = RestParams.parseBoolean(emailEnabledRaw)

return ctx.notificationService.savePreferences(siteId, userId, deliveryMode, summaryTime, emailEnabled)
