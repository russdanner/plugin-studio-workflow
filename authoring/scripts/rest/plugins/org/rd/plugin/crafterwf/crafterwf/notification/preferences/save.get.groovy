import plugins.org.rd.plugin.crafterwf.WorkflowContext
import plugins.org.rd.plugin.crafterwf.util.RestParams

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext, request)

def deliveryMode = params.deliveryMode
def summaryTime = params.summaryTime
def emailEnabledRaw = params.emailEnabled
if (emailEnabledRaw == null) {
    throw new IllegalArgumentException('emailEnabled is required')
}
def emailEnabled = RestParams.parseBoolean(emailEnabledRaw)

return ctx.notificationService.savePreferences(siteId, userId, deliveryMode, summaryTime, emailEnabled)
