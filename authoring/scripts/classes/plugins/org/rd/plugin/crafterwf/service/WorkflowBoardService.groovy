package plugins.org.rd.plugin.crafterwf.service

import plugins.org.rd.plugin.crafterwf.dao.WorkflowPackageAttachmentDao
import plugins.org.rd.plugin.crafterwf.dao.WorkflowPackageDao
import plugins.org.rd.plugin.crafterwf.model.StepActionType
import plugins.org.rd.plugin.crafterwf.util.SiteGroupSupport
import plugins.org.rd.plugin.crafterwf.util.StepRuleJson
import plugins.org.rd.plugin.crafterwf.util.WorkflowDefinitionSupport

class WorkflowBoardService {

    private final WorkflowDefinitionService definitionService
    private final WorkflowPackageDao packageDao
    private final WorkflowPackageAttachmentDao attachmentDao
    private final StepRuleService stepRuleService
    private final SiteGroupSupport siteGroupSupport

    WorkflowBoardService(WorkflowDefinitionService definitionService, WorkflowPackageDao packageDao,
                         WorkflowPackageAttachmentDao attachmentDao = null, StepRuleService stepRuleService = null,
                         def applicationContext = null, def dataSource = null) {
        this.definitionService = definitionService
        this.packageDao = packageDao
        this.attachmentDao = attachmentDao
        this.stepRuleService = stepRuleService
        this.siteGroupSupport = applicationContext ? new SiteGroupSupport(applicationContext, dataSource) : null
    }

    Map getBoard(String siteId, String workflowId, Long userId, String username = null) {
        def definition = definitionService.resolveWorkflow(siteId, workflowId)
        if (!definition) {
            throw new IllegalStateException(
                'No workflow definitions found. Add a definition under /config/studio/workflow/definitions/ ' +
                'or create one in Project Tools → Crafter Workflow.'
            )
        }
        def resolvedWorkflowId = definition.id as String
        def steps = WorkflowDefinitionSupport.sortedSteps(definition)
        def packages = packageDao.findActiveByWorkflow(siteId, resolvedWorkflowId)
        def userGroups = username && siteGroupSupport ? siteGroupSupport.getUserGroupNames(username, siteId) : []

        def packagesByStep = packages.groupBy { it.workflow_step_id?.toString() }
        def packageAttachmentSummary = buildPackageAttachmentSummary(siteId, packages)

        return [
            workflow      : toWorkflowDto(definition),
            currentUser   : [
                username: username,
                groups  : userGroups
            ],
            workflowSteps : steps.collect { step ->
                def stepKey = step.id?.toString()
                def stepPackages = (packagesByStep[stepKey] ?: []).collect { pkg ->
                    def counts = packageDao.countAttachments(siteId, pkg.id)
                    def summary = packageAttachmentSummary[pkg.id as String] ?: [:]
                    toPackageSummaryDto(pkg, counts, summary)
                }
                toStepDto(step, stepPackages)
            }
        ]
    }

    private Map buildPackageAttachmentSummary(String siteId, List<Map> packages) {
        def summary = [:]
        if (!attachmentDao || !packages) {
            return summary
        }
        packages.each { pkg ->
            def refs = attachmentDao.findContentRefs(siteId, pkg.id as String)
            summary[pkg.id as String] = [
                contentPaths : refs.collect { it.content_path }.findAll { it },
                contentTypes : refs.collect { it.content_type ?: '' }.findAll { it }
            ]
        }
        return summary
    }

    private static Map toWorkflowDto(Map definition) {
        return [
            id            : definition.id,
            name          : definition.name,
            description   : definition.description,
            backgroundUrl : definition.backgroundUrl,
            position      : definition.position
        ]
    }

    private Map toStepDto(Map step, List packages) {
        return [
            id                : step.id,
            name              : step.name,
            position          : step.position != null ? step.position.doubleValue() : 0,
            color             : step.color,
            isTerminal        : step.isTerminal == true,
            actionType        : WorkflowDefinitionSupport.resolveActionType(step) ?: StepActionType.NONE,
            allowAddPackage   : WorkflowDefinitionSupport.allowsAddPackage(step),
            roleRule          : StepRuleJson.toRoleRuleDto(step),
            contentRule       : StepRuleJson.toContentRuleDto(step),
            workflowPackages  : packages
        ]
    }

    private static Map toPackageSummaryDto(Map pkg, Map counts, Map attachmentSummary = [:]) {
        return [
            id              : pkg.id,
            title           : pkg.title,
            description     : pkg.description,
            position        : pkg.position != null ? pkg.position.doubleValue() : 0,
            coverColor      : pkg.cover_color ?: 'blue',
            dueOn           : pkg.due_on,
            status          : pkg.status,
            attachmentCount : counts.attachments,
            commentCount    : counts.comments,
            contentPaths    : attachmentSummary.contentPaths ?: [],
            contentTypes    : attachmentSummary.contentTypes ?: []
        ]
    }
}
