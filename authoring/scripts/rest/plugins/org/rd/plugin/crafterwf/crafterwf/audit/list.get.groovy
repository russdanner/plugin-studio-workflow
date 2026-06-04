import plugins.org.rd.plugin.crafterwf.WorkflowContext
import plugins.org.rd.plugin.crafterwf.service.AuditLogService
import plugins.org.rd.plugin.crafterwf.util.RestParams

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)

def page = RestParams.parseInt(params.page, 'page', 1)
def pageSize = RestParams.parseInt(params.pageSize, 'pageSize', 50)

def filters = [
    page      : page,
    pageSize  : pageSize,
    username  : params.username,
    operation : params.operation,
    targetType: params.targetType,
    targetId  : params.targetId,
    q         : params.q ?: params.query,
    sortBy    : params.sortBy,
    sortOrder : params.sortOrder
]

if (params.from) {
    filters.fromDate = AuditLogService.parseDateFilter(params.from)
}
if (params.to) {
    filters.toDate = AuditLogService.parseDateFilter(params.to)
}

return ctx.auditLogService.search(siteId, filters)
