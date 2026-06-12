import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def userId = WorkflowContext.resolveUserId(applicationContext, request)
def username = WorkflowContext.resolveUsername(applicationContext, request)

def pathsParam = params.paths ?: params.path
if (!pathsParam?.trim()) {
    throw new IllegalArgumentException('paths parameter is required')
}
def paths = pathsParam.split(',').collect { it?.trim() }.findAll { it }

return ctx.recycleBinService.binPaths(siteId, paths, userId, username)
