package plugins.org.rd.plugin.crafterwf.service

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import plugins.org.rd.plugin.crafterwf.dao.WorkflowPackageAttachmentDao
import plugins.org.rd.plugin.crafterwf.dao.WorkflowPackageDao
import plugins.org.rd.plugin.crafterwf.util.WorkflowDefinitionSupport
import plugins.org.rd.plugin.crafterwf.model.AuditOperation
import plugins.org.rd.plugin.crafterwf.model.AuditTargetType
import plugins.org.rd.plugin.crafterwf.model.StepActionType

import java.time.ZonedDateTime

/**
 * Executes a configured publish/request-publish action when a package enters a workflow step.
 * On success, moves the package to the configured success step.
 * On failure, reverts the package to the previous step and notifies the user.
 */
class WorkflowStepActionService {

    private static final Logger logger = LoggerFactory.getLogger(WorkflowStepActionService)
    private static final String AUTO_COMMENT = 'Crafter Workflow automated step action'

    private final WorkflowDefinitionService definitionService
    private final WorkflowPackageDao packageDao
    private final WorkflowPackageAttachmentDao attachmentDao
    private final AuditLogService auditLogService
    private final def applicationContext
    private final WorkflowPackageService packageService

    WorkflowStepActionService(WorkflowDefinitionService definitionService, WorkflowPackageDao packageDao,
                              WorkflowPackageAttachmentDao attachmentDao, AuditLogService auditLogService,
                              def applicationContext, WorkflowPackageService packageService) {
        this.definitionService = definitionService
        this.packageDao = packageDao
        this.attachmentDao = attachmentDao
        this.auditLogService = auditLogService
        this.applicationContext = applicationContext
        this.packageService = packageService
    }

    Map onPackageEnteredStep(String siteId, String workflowPackageId, Long userId, String username,
                             String previousStepId = null) {
        def pkg = packageDao.findById(siteId, workflowPackageId)
        if (!pkg) {
            return [stepActionFailed: false]
        }

        def workflowId = pkg.workflow_id as String
        def stepId = pkg.workflow_step_id as String
        Map step
        try {
            step = definitionService.findStep(siteId, workflowId, stepId)
        } catch (Exception ignored) {
            return [stepActionFailed: false]
        }

        def actionType = WorkflowDefinitionSupport.resolveActionType(step)
        if (!actionType || actionType == StepActionType.NONE) {
            return [stepActionFailed: false]
        }

        def actionLabel = StepActionType.displayLabel(actionType)
        def environments = PublishingEnvironmentSupport.resolvePublishingEnvironments(applicationContext, siteId)
        if (StepActionType.requiresStaging(actionType) && !environments.stagingEnabled) {
            return failAndRevert(
                siteId, workflowPackageId, userId, username, previousStepId, pkg, step, actionLabel,
                "Staging is not enabled. Cannot run \"${actionLabel}\"."
            )
        }

        def paths = contentPaths(siteId, workflowPackageId)
        if (paths.isEmpty()) {
            return failAndRevert(
                siteId, workflowPackageId, userId, username, previousStepId, pkg, step, actionLabel,
                "Package has no content attachments. Cannot run \"${actionLabel}\"."
            )
        }

        def actionResult = executeAction(siteId, actionType, paths, environments)
        if (!actionResult.success) {
            logger.warn(
                'Step action {} did not complete for package {} on step {}: {}',
                actionType, workflowPackageId, step.name, actionResult.errorMessage
            )
            return failAndRevert(
                siteId, workflowPackageId, userId, username, previousStepId, pkg, step, actionLabel,
                actionResult.errorMessage ?: "Step action \"${actionLabel}\" failed."
            )
        }

        recordStepActionAudit(
            siteId, userId, username, workflowPackageId, pkg.title as String, step.name as String,
            actionLabel, paths.size(), true, null
        )

        def successStepId = step.actionSuccessStepId as String
        if (!successStepId?.trim()) {
            logger.info('Step action {} succeeded for package {} but no success step is configured', actionType, workflowPackageId)
            return [stepActionFailed: false, stepActionSucceeded: true]
        }

        if (successStepId == step.id) {
            return [stepActionFailed: false, stepActionSucceeded: true]
        }

        Map successStep
        try {
            successStep = definitionService.findStep(siteId, workflowId, successStepId)
        } catch (Exception ignored) {
            successStep = null
        }
        if (!successStep) {
            logger.warn('Invalid success step {} configured for step {}', successStepId, step.id)
            return failAndRevert(
                siteId, workflowPackageId, userId, username, previousStepId, pkg, step, actionLabel,
                "Step action completed but the configured success step is invalid.",
                false
            )
        }

        packageService.movePackage(siteId, workflowPackageId, successStepId, 0, userId, username, false)
        return [stepActionFailed: false, stepActionSucceeded: true]
    }

    private Map failAndRevert(String siteId, String workflowPackageId, Long userId, String username,
                              String previousStepId, Map pkg, Map step, String actionLabel, String reason,
                              boolean recordFailureAudit = true) {
        def currentStepId = pkg.workflow_step_id as String
        def reverted = false
        def resultingStepId = currentStepId

        if (recordFailureAudit) {
            recordStepActionAudit(
                siteId, userId, username, workflowPackageId, pkg.title as String, step.name as String,
                actionLabel, 0, false, reason
            )
        }

        if (previousStepId?.trim() && previousStepId != currentStepId) {
            packageService.movePackage(siteId, workflowPackageId, previousStepId, 0, userId, username, false, false)
            reverted = true
            resultingStepId = previousStepId
        }

        def message = reverted
            ? "${reason} The package was moved back to the previous step."
            : reason

        return [
            stepActionFailed: true,
            message           : message,
            reverted          : reverted,
            workflowStepId    : resultingStepId
        ]
    }

    private void recordStepActionAudit(String siteId, Long userId, String username, String workflowPackageId,
                                       String packageTitle, String stepName, String actionLabel, int itemCount,
                                       boolean succeeded, String failureReason) {
        def note = succeeded
            ? "Automatically performed \"${actionLabel}\" for ${itemCount} content item(s) in step \"${stepName}\""
            : "Automatic step action \"${actionLabel}\" failed in step \"${stepName}\": ${failureReason}"
        auditLogService.record(
            siteId,
            userId,
            username,
            AuditOperation.PACKAGE_STEP_ACTION,
            AuditTargetType.PACKAGE,
            workflowPackageId,
            note
        )
    }

    private List<String> contentPaths(String siteId, String workflowPackageId) {
        return attachmentDao.findContentRefs(siteId, workflowPackageId)
            .collect { it.content_path as String }
            .findAll { path -> path?.startsWith('/site/') }
    }

    private Map executeAction(String siteId, String actionType, List<String> paths, Map environments) {
        def workflowService = PublishingEnvironmentSupport.resolveWorkflowService(applicationContext)
        if (!workflowService) {
            logger.error(
                'studio.workflowService not available (tried studio.workflowService, workflowService); ' +
                'cannot run step actions for site {}. ' +
                'If studio.scripting.restrictBeans is enabled, add studio.workflowService to studio.scripting.allowedBeans.',
                siteId
            )
            return [
                success     : false,
                errorMessage: 'Publishing service is not available. Contact your administrator.'
            ]
        }

        def liveTarget = environments.live as String
        def stagingTarget = environments.staging as String
        def schedule = ZonedDateTime.now()
        def deps = [] as List<String>

        try {
            switch (actionType) {
                case StepActionType.REQUEST_PUBLISH_STAGING:
                    logger.info('Requesting publish to {} for {} item(s) on site {}', stagingTarget, paths.size(), siteId)
                    workflowService.requestPublish(siteId, paths, deps, stagingTarget, schedule, AUTO_COMMENT, false)
                    return [success: true]
                case StepActionType.REQUEST_PUBLISH_LIVE:
                    logger.info('Requesting publish to {} for {} item(s) on site {}', liveTarget, paths.size(), siteId)
                    workflowService.requestPublish(siteId, paths, deps, liveTarget, schedule, AUTO_COMMENT, false)
                    return [success: true]
                case StepActionType.PUBLISH_STAGING:
                    logger.info('Publishing to {} for {} item(s) on site {}', stagingTarget, paths.size(), siteId)
                    workflowService.publish(siteId, paths, deps, stagingTarget, schedule, AUTO_COMMENT)
                    return [success: true]
                case StepActionType.PUBLISH_LIVE:
                    logger.info('Publishing to {} for {} item(s) on site {}', liveTarget, paths.size(), siteId)
                    workflowService.publish(siteId, paths, deps, liveTarget, schedule, AUTO_COMMENT)
                    return [success: true]
                default:
                    return [success: false, errorMessage: "Unsupported step action: ${actionType}"]
            }
        } catch (Exception e) {
            logger.warn('Step action {} failed for site {}: {}', actionType, siteId, e.message, e)
            return [success: false, errorMessage: e.message ?: 'Step action failed unexpectedly.']
        }
    }
}
