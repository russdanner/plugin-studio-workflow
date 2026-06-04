import plugins.org.rd.plugin.crafterwf.WorkflowContext
import plugins.org.rd.plugin.crafterwf.service.CommentService

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)

def target = CommentService.resolveTargetParams(params)
if (!target.targetType || !target.targetId) {
    throw new IllegalArgumentException('targetType and targetId are required')
}

def includeResolved = params.includeResolved != 'false'
def includeArchived = params.includeArchived == 'true'

return [
    comments: ctx.commentService.listComments(
        siteId, target.targetType, target.targetId, includeResolved, includeArchived
    )
]
