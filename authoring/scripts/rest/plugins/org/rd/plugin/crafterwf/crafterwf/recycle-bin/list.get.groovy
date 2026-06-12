import plugins.org.rd.plugin.crafterwf.WorkflowContext

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
def username = WorkflowContext.resolveUsername(applicationContext, request)
def state = params.state ?: 'binned'
def page = params.page ? params.page as int : 1
def pageSize = params.pageSize ? params.pageSize as int : 10
def sortBy = params.sortBy ?: 'binnedOn'
def sortOrder = params.sortOrder ?: 'desc'
def q = params.q ?: params.keyword

return ctx.recycleBinService.listItems(siteId, username, state, page, pageSize, sortBy, sortOrder, q)
