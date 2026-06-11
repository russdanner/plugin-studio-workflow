package plugins.org.rd.plugin.crafterwf.service

import plugins.org.rd.plugin.crafterwf.dao.WorkflowPackageDao
import plugins.org.rd.plugin.crafterwf.db.WorkflowDb
import plugins.org.rd.plugin.crafterwf.util.WorkflowDefinitionSupport

class WorkflowAdminService {

    private final WorkflowDb db
    private final WorkflowPackageDao packageDao
    private final WorkflowDefinitionService definitionService
    private final def applicationContext

    WorkflowAdminService(WorkflowDb db, WorkflowPackageDao packageDao,
                         WorkflowDefinitionService definitionService, def applicationContext = null) {
        this.db = db
        this.packageDao = packageDao
        this.definitionService = definitionService
        this.applicationContext = applicationContext
    }

    Map getSchemaStatus() {
        return db.getSchemaStatus()
    }

    Map installSchema() {
        try {
            db.installSchema()
            def status = db.getSchemaStatus()
            status.installed = status.installed == true
            return status
        } catch (Exception e) {
            return schemaInstallFailure(e)
        }
    }

    private static Map schemaInstallFailure(Exception e) {
        def msg = e.message ?: e.class.simpleName
        def accessDenied = msg?.toLowerCase()?.contains('access denied') ||
            msg?.contains('1044')
        return [
            installed       : false,
            schemaName      : 'crafter-workflow',
            version         : 0,
            error           : accessDenied
                ? 'The Studio database user cannot create or use the crafter-workflow schema.'
                : 'Schema installation failed.',
            remedialAction  : accessDenied
                ? 'As MariaDB root, run: ./scripts/grant-workflow-schema.sh (or see docs/DATABASE_SCHEMA.md).'
                : 'Check Studio logs for the underlying SQL error.',
            detail          : msg
        ]
    }

    List<Map> listWorkflows(String siteId) {
        return definitionService.listDefinitionSummaries(siteId) { workflowId ->
            packageDao.countActiveByWorkflow(siteId, workflowId)
        }
    }

    Map getWorkflow(String siteId, String workflowId) {
        return definitionService.getWorkflowDetail(siteId, workflowId)
    }

    Map createWorkflow(String siteId, String name, String description, boolean withDefaultSteps, Long userId) {
        def definition = definitionService.createWorkflow(siteId, name, description, withDefaultSteps)
        return definitionService.getWorkflowDetail(siteId, definition.id as String)
    }

    Map updateWorkflow(String siteId, String workflowId, String name, String description, String backgroundUrl, Long userId) {
        def existing = definitionService.loadDefinition(siteId, workflowId)
        def steps = WorkflowDefinitionSupport.sortedSteps(existing)
        return saveWorkflowDefinition(
            siteId,
            workflowId,
            [
                name          : name,
                description   : description,
                backgroundUrl : backgroundUrl,
                isDefault     : existing.isDefault
            ],
            steps,
            userId
        )
    }

    Map saveWorkflowDefinition(String siteId, String workflowId, Map workflowFields, List stepsInput, Long userId,
                               List createListeners = null, List editListeners = null) {
        definitionService.loadDefinition(siteId, workflowId)
        if (!stepsInput || stepsInput.isEmpty()) {
            throw new IllegalArgumentException('At least one workflow step is required')
        }
        definitionService.saveWorkflowDefinition(
            siteId, workflowId, workflowFields, stepsInput, userId,
            { removedId, firstKeptStepId, uid ->
                if (packageDao.countActiveByStep(siteId, removedId) > 0) {
                    packageDao.reassignPackagesStep(siteId, removedId, firstKeptStepId, uid)
                }
            },
            createListeners,
            editListeners
        )
        return getWorkflow(siteId, workflowId)
    }

    void deleteWorkflow(String siteId, String workflowId) {
        definitionService.loadDefinition(siteId, workflowId)
        def activePackages = packageDao.countActiveByWorkflow(siteId, workflowId)
        if (activePackages > 0) {
            throw new IllegalStateException("Cannot delete workflow with ${activePackages} active packages. Archive packages first.")
        }
        definitionService.deleteWorkflow(siteId, workflowId)
    }

    Map getPublishingTargets(String siteId) {
        def environments = PublishingEnvironmentSupport.resolvePublishingEnvironments(applicationContext, siteId)
        def targets = [environments.live]
        if (environments.staging) {
            targets << environments.staging
        }
        return [
            stagingEnabled: environments.stagingEnabled as boolean,
            targets       : targets,
            live          : environments.live,
            staging       : environments.staging
        ]
    }
}
