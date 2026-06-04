package plugins.org.rd.plugin.crafterwf.dao

import plugins.org.rd.plugin.crafterwf.db.WorkflowDb
import plugins.org.rd.plugin.crafterwf.model.StepActionType
import plugins.org.rd.plugin.crafterwf.util.StepRuleJson

class WorkflowStepDao {

    private static final String STEP_COLUMNS =
        'id, workflow_id, site_id, name, description, position, color, is_terminal, allow_add_package, ' +
        'action_request_publish_staging, action_request_publish_live, action_publish_staging, action_publish_live, ' +
        'step_action_type, step_action_success_step_id, ' +
        'role_rule_mode, role_rule_roles, content_rule_mode, content_rule_paths, content_rule_types, ' +
        'created_on, modified_on'

    private final WorkflowDb db

    WorkflowStepDao(WorkflowDb db) {
        this.db = db
    }

    List<Map> findByWorkflow(String siteId, String workflowId) {
        db.withSql { sql ->
            return sql.rows(
                'SELECT ' + STEP_COLUMNS + ' FROM ' + db.table('wf_workflow_step') +
                ' WHERE site_id = ? AND workflow_id = ? ORDER BY position ASC',
                [siteId, workflowId]
            ).collect { toMap(it) }
        }
    }

    Map findById(String siteId, String stepId) {
        db.withSql { sql ->
            def row = sql.firstRow(
                'SELECT ' + STEP_COLUMNS + ' FROM ' + db.table('wf_workflow_step') +
                ' WHERE site_id = ? AND id = ?',
                [siteId, stepId]
            )
            return row ? toMap(row) : null
        }
    }

    Map insert(String siteId, String workflowId, String name, BigDecimal position, String color = null) {
        def id = WorkflowDb.uuid()
        def now = WorkflowDb.now()
        db.withSql { sql ->
            sql.executeInsert(
                'INSERT INTO ' + db.table('wf_workflow_step') +
                ' (id, workflow_id, site_id, name, description, position, color, is_terminal, created_on, modified_on) ' +
                'VALUES (?, ?, ?, ?, NULL, ?, ?, 0, ?, ?)',
                [id, workflowId, siteId, name, position, color, now, now]
            )
        }
        return findById(siteId, id)
    }

    void insertDefaults(String siteId, String workflowId) {
        def defaults = [
            [name: 'Backlog', position: new BigDecimal('1000'), color: 'blue'],
            [name: 'In Progress', position: new BigDecimal('2000'), color: 'orange'],
            [name: 'Done', position: new BigDecimal('3000'), color: 'green', isTerminal: true]
        ]
        defaults.eachWithIndex { step, index ->
            def id = WorkflowDb.uuid()
            def now = WorkflowDb.now()
            db.withSql { sql ->
                sql.executeInsert(
                    'INSERT INTO ' + db.table('wf_workflow_step') +
                    ' (id, workflow_id, site_id, name, description, position, color, is_terminal, allow_add_package, created_on, modified_on) ' +
                    'VALUES (?, ?, ?, ?, NULL, ?, ?, ?, ?, ?, ?)',
                    [id, workflowId, siteId, step.name, step.position, step.color, step.isTerminal ? 1 : 0, index == 0 ? 1 : 0, now, now]
                )
            }
        }
    }

    void update(String siteId, String stepId, String name, String color, boolean isTerminal, BigDecimal position,
                boolean allowAddPackage, Map stepActions = null, Map stepRules = null) {
        def now = WorkflowDb.now()
        def actionType = resolveStoredActionType(stepActions)
        def legacy = StepActionType.toLegacyFlags(actionType)
        def successStepId = stepActions?.actionSuccessStepId?.toString()?.trim() ?: null
        def rules = resolveStoredRules(stepRules)
        db.withSql { sql ->
            sql.executeUpdate(
                'UPDATE ' + db.table('wf_workflow_step') +
                ' SET name = ?, color = ?, is_terminal = ?, position = ?, allow_add_package = ?, ' +
                'action_request_publish_staging = ?, action_request_publish_live = ?, ' +
                'action_publish_staging = ?, action_publish_live = ?, ' +
                'step_action_type = ?, step_action_success_step_id = ?, ' +
                'role_rule_mode = ?, role_rule_roles = ?, content_rule_mode = ?, content_rule_paths = ?, content_rule_types = ?, ' +
                'modified_on = ? ' +
                'WHERE site_id = ? AND id = ?',
                [
                    name, color, isTerminal ? 1 : 0, position, allowAddPackage ? 1 : 0,
                    legacy.action_request_publish_staging,
                    legacy.action_request_publish_live,
                    legacy.action_publish_staging,
                    legacy.action_publish_live,
                    actionType,
                    successStepId,
                    rules.roleRuleMode,
                    rules.roleRuleRoles,
                    rules.contentRuleMode,
                    rules.contentRulePaths,
                    rules.contentRuleTypes,
                    now, siteId, stepId
                ]
            )
        }
    }

    void updateActionSuccessStep(String siteId, String stepId, String successStepId) {
        def now = WorkflowDb.now()
        db.withSql { sql ->
            sql.executeUpdate(
                'UPDATE ' + db.table('wf_workflow_step') +
                ' SET step_action_success_step_id = ?, modified_on = ? WHERE site_id = ? AND id = ?',
                [successStepId, now, siteId, stepId]
            )
        }
    }

    void delete(String siteId, String stepId) {
        db.withSql { sql ->
            sql.execute(
                'DELETE FROM ' + db.table('wf_workflow_step') + ' WHERE site_id = ? AND id = ?',
                [siteId, stepId]
            )
        }
    }

    void deleteByWorkflow(String siteId, String workflowId) {
        db.withSql { sql ->
            sql.execute(
                'DELETE FROM ' + db.table('wf_workflow_step') + ' WHERE site_id = ? AND workflow_id = ?',
                [siteId, workflowId]
            )
        }
    }

    static boolean allowsAddPackage(Map step) {
        return asFlag(step?.allow_add_package)
    }

    static String resolveActionType(Map step) {
        def type = StepActionType.normalize(step?.step_action_type)
        if (type) {
            return type
        }
        return StepActionType.fromLegacyFlags(step)
    }

    private static Map toMap(row) {
        return [
            id                            : row.id,
            workflow_id                   : row.workflow_id,
            site_id                       : row.site_id,
            name                          : row.name,
            description                   : row.description,
            position                      : row.position,
            color                         : row.color,
            is_terminal                   : row.is_terminal,
            allow_add_package             : row.allow_add_package,
            action_request_publish_staging: row.action_request_publish_staging,
            action_request_publish_live   : row.action_request_publish_live,
            action_publish_staging        : row.action_publish_staging,
            action_publish_live           : row.action_publish_live,
            step_action_type              : row.step_action_type,
            step_action_success_step_id   : row.step_action_success_step_id,
            role_rule_mode                : row.role_rule_mode,
            role_rule_roles               : row.role_rule_roles,
            content_rule_mode             : row.content_rule_mode,
            content_rule_paths            : row.content_rule_paths,
            content_rule_types            : row.content_rule_types,
            created_on                    : row.created_on,
            modified_on                   : row.modified_on
        ]
    }

    private static Map resolveStoredRules(Map stepRules) {
        if (!stepRules) {
            return [
                roleRuleMode    : 'all',
                roleRuleRoles   : null,
                contentRuleMode : 'all',
                contentRulePaths: null,
                contentRuleTypes: null
            ]
        }
        def roleRule = stepRules.roleRule instanceof Map ? stepRules.roleRule : stepRules
        def contentRule = stepRules.contentRule instanceof Map ? stepRules.contentRule : stepRules
        return [
            roleRuleMode    : StepRuleJson.normalizeRoleMode(roleRule?.mode ?: roleRule?.roleRuleMode),
            roleRuleRoles   : StepRuleJson.encodeStringList(
                StepRuleJson.decodeStringList(roleRule?.roles ?: roleRule?.roleRuleRoles)
            ),
            contentRuleMode : StepRuleJson.normalizeContentMode(contentRule?.mode ?: contentRule?.contentRuleMode),
            contentRulePaths: StepRuleJson.encodeStringList(
                StepRuleJson.decodeStringList(contentRule?.pathPatterns ?: contentRule?.contentRulePaths)
            ),
            contentRuleTypes: StepRuleJson.encodeStringList(
                StepRuleJson.decodeStringList(contentRule?.contentTypes ?: contentRule?.contentRuleTypes)
            )
        ]
    }

    private static String resolveStoredActionType(Map stepActions) {
        if (!stepActions) {
            return null
        }
        def type = StepActionType.normalize(stepActions.actionType)
        if (type) {
            return type
        }
        if (asFlag(stepActions.actionRequestPublishStaging)) {
            return StepActionType.REQUEST_PUBLISH_STAGING
        }
        if (asFlag(stepActions.actionRequestPublishLive)) {
            return StepActionType.REQUEST_PUBLISH_LIVE
        }
        if (asFlag(stepActions.actionPublishStaging)) {
            return StepActionType.PUBLISH_STAGING
        }
        if (asFlag(stepActions.actionPublishLive)) {
            return StepActionType.PUBLISH_LIVE
        }
        return null
    }

    private static boolean asFlag(def value) {
        return value == true || value == 1 || value == '1' || value == 'true'
    }
}
