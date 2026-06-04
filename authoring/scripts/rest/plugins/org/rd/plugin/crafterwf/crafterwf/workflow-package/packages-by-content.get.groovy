import plugins.org.rd.plugin.crafterwf.WorkflowContext
import plugins.org.rd.plugin.crafterwf.model.CommentTargetType

def siteId = WorkflowContext.requireSiteId(params)
def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)

def contentPath = params.contentPath ?: params.path
if (!contentPath?.trim()) {
    throw new IllegalArgumentException('contentPath is required')
}

def includeResolved = params.includeResolved != 'false'
def includeArchived = params.includeArchived == 'true'
def path = contentPath.trim()

return [
    contentPath     : path,
    contentComments : ctx.commentService.listComments(
        siteId, CommentTargetType.CONTENT, path, includeResolved, includeArchived
    ),
    packages        : ctx.packageService.findPackagesWithCommentsByContentPath(
        siteId, path, includeResolved, includeArchived
    )
]
