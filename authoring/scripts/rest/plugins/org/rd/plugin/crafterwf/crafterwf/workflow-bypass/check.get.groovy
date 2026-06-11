import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)

def pathsParam = params.contentPaths ?: params.contentPath ?: params.paths
def paths = []
if (pathsParam instanceof Collection) {
    paths = pathsParam.collect { it?.toString()?.trim() }.findAll { it }
} else if (pathsParam) {
    paths = pathsParam.toString().split(',').collect { it.trim() }.findAll { it }
}
if (!paths) {
    throw new IllegalArgumentException('contentPaths is required')
}

def action = params.action ?: 'publish'
return ctx.bypassService.check(siteId, paths, action)
