package plugins.org.rd.plugin.crafterwf.dao

import plugins.org.rd.plugin.crafterwf.db.WorkflowDb

class WorkflowPackageDao {

    private final WorkflowDb db

    WorkflowPackageDao(WorkflowDb db) {
        this.db = db
    }

    List<Map> findActiveByWorkflow(String siteId, String workflowId) {
        db.withSql { sql ->
            return sql.rows(
                'SELECT id, workflow_id, workflow_step_id, site_id, title, description, position, ' +
                'cover_color, due_on, status, created_by, created_on, modified_by, modified_on, closed_on FROM ' +
                db.table('wf_workflow_package') +
                ' WHERE site_id = ? AND workflow_id = ? AND status = \'active\' ' +
                'ORDER BY workflow_step_id, position ASC',
                [siteId, workflowId]
            ).collect { toMap(it) }
        }
    }

    Map findById(String siteId, String packageId) {
        db.withSql { sql ->
            def row = sql.firstRow(
                'SELECT id, workflow_id, workflow_step_id, site_id, title, description, position, ' +
                'cover_color, due_on, status, created_by, created_on, modified_by, modified_on, closed_on FROM ' +
                db.table('wf_workflow_package') + ' WHERE site_id = ? AND id = ?',
                [siteId, packageId]
            )
            return row ? toMap(row) : null
        }
    }

    Map insert(String siteId, String workflowId, String workflowStepId, String title, String description,
               String coverColor, BigDecimal position, Long userId) {
        def id = WorkflowDb.uuid()
        def now = WorkflowDb.now()
        db.withSql { sql ->
            sql.executeInsert(
                'INSERT INTO ' + db.table('wf_workflow_package') +
                ' (id, workflow_id, workflow_step_id, site_id, title, description, position, cover_color, ' +
                'status, created_by, created_on, modified_by, modified_on, closed_on) ' +
                'VALUES (?, ?, ?, ?, ?, ?, ?, ?, \'active\', ?, ?, ?, ?, NULL)',
                [id, workflowId, workflowStepId, siteId, title, description ?: '', position, coverColor,
                 userId, now, userId, now]
            )
        }
        return findById(siteId, id)
    }

    void move(String siteId, String packageId, String workflowStepId, BigDecimal position, Long userId) {
        def now = WorkflowDb.now()
        db.withSql { sql ->
            sql.executeUpdate(
                'UPDATE ' + db.table('wf_workflow_package') +
                ' SET workflow_step_id = ?, position = ?, modified_by = ?, modified_on = ? ' +
                'WHERE site_id = ? AND id = ?',
                [workflowStepId, position, userId, now, siteId, packageId]
            )
        }
    }

    void updateTitle(String siteId, String packageId, String title, Long userId) {
        def now = WorkflowDb.now()
        db.withSql { sql ->
            sql.executeUpdate(
                'UPDATE ' + db.table('wf_workflow_package') +
                ' SET title = ?, modified_by = ?, modified_on = ? WHERE site_id = ? AND id = ?',
                [title, userId, now, siteId, packageId]
            )
        }
    }

    List<Map> findScheduledForCalendar(String siteId) {
        db.withSql { sql ->
            return sql.rows(
                'SELECT id, workflow_id, site_id, title, due_on, status FROM ' +
                db.table('wf_workflow_package') +
                ' WHERE site_id = ? AND status = \'active\' AND due_on IS NOT NULL ' +
                'ORDER BY due_on ASC, title ASC',
                [siteId]
            ).collect {
                [
                    id          : it.id,
                    workflow_id : it.workflow_id,
                    site_id     : it.site_id,
                    title       : it.title,
                    due_on      : it.due_on,
                    status      : it.status
                ]
            }
        }
    }

    void updateDueOn(String siteId, String packageId, Date dueOn, Long userId) {
        def now = WorkflowDb.now()
        db.withSql { sql ->
            sql.executeUpdate(
                'UPDATE ' + db.table('wf_workflow_package') +
                ' SET due_on = ?, modified_by = ?, modified_on = ? WHERE site_id = ? AND id = ?',
                [dueOn, userId, now, siteId, packageId]
            )
        }
    }

    void updateDescription(String siteId, String packageId, String description, Long userId) {
        def now = WorkflowDb.now()
        db.withSql { sql ->
            sql.executeUpdate(
                'UPDATE ' + db.table('wf_workflow_package') +
                ' SET description = ?, modified_by = ?, modified_on = ? WHERE site_id = ? AND id = ?',
                [description ?: '', userId, now, siteId, packageId]
            )
        }
    }

    void archive(String siteId, String packageId, Long userId) {
        def now = WorkflowDb.now()
        db.withSql { sql ->
            sql.executeUpdate(
                'UPDATE ' + db.table('wf_workflow_package') +
                ' SET status = \'archived\', closed_on = ?, modified_by = ?, modified_on = ? ' +
                'WHERE site_id = ? AND id = ?',
                [now, userId, now, siteId, packageId]
            )
        }
    }

    Map countAttachments(String siteId, String packageId) {
        db.withSql { sql ->
            def content = sql.firstRow(
                'SELECT COUNT(*) AS c FROM ' + db.table('wf_workflow_package_content_ref') +
                ' WHERE site_id = ? AND workflow_package_id = ?',
                [siteId, packageId]
            )?.c ?: 0
            def links = sql.firstRow(
                'SELECT COUNT(*) AS c FROM ' + db.table('wf_workflow_package_link') +
                ' WHERE site_id = ? AND workflow_package_id = ?',
                [siteId, packageId]
            )?.c ?: 0
            def comments = sql.firstRow(
                'SELECT COUNT(*) AS c FROM ' + db.table('wf_comment') +
                ' WHERE site_id = ? AND target_type = ? AND target_id = ? AND archived_on IS NULL',
                [siteId, 'workflow_package', packageId]
            )?.c ?: 0
            return [attachments: (content as int) + (links as int), comments: comments as int]
        }
    }

    int countActiveByWorkflow(String siteId, String workflowId) {
        db.withSql { sql ->
            return (sql.firstRow(
                'SELECT COUNT(*) AS c FROM ' + db.table('wf_workflow_package') +
                ' WHERE site_id = ? AND workflow_id = ? AND status = \'active\'',
                [siteId, workflowId]
            )?.c ?: 0) as int
        }
    }

    int countActiveByStep(String siteId, String workflowStepId) {
        db.withSql { sql ->
            return (sql.firstRow(
                'SELECT COUNT(*) AS c FROM ' + db.table('wf_workflow_package') +
                ' WHERE site_id = ? AND workflow_step_id = ? AND status = \'active\'',
                [siteId, workflowStepId]
            )?.c ?: 0) as int
        }
    }

    Map findActiveByWorkflowAndTitle(String siteId, String workflowId, String title) {
        if (!title?.trim()) {
            return null
        }
        db.withSql { sql ->
            def row = sql.firstRow(
                'SELECT id, workflow_id, workflow_step_id, site_id, title, description, position, ' +
                'cover_color, due_on, status, created_by, created_on, modified_by, modified_on, closed_on FROM ' +
                db.table('wf_workflow_package') +
                ' WHERE site_id = ? AND workflow_id = ? AND status = \'active\' AND title = ? ' +
                'ORDER BY modified_on DESC LIMIT 1',
                [siteId, workflowId, title.trim()]
            )
            return row ? toMap(row) : null
        }
    }

    Map findActiveByWorkflowAndContentPath(String siteId, String workflowId, String contentPath) {
        if (!contentPath?.trim()) {
            return null
        }
        db.withSql { sql ->
            def row = sql.firstRow(
                'SELECT p.id, p.workflow_id, p.workflow_step_id, p.site_id, p.title, p.description, p.position, ' +
                'p.cover_color, p.due_on, p.status, p.created_by, p.created_on, p.modified_by, p.modified_on, p.closed_on ' +
                'FROM ' + db.table('wf_workflow_package') + ' p ' +
                'INNER JOIN ' + db.table('wf_workflow_package_content_ref') + ' r ' +
                'ON r.workflow_package_id = p.id AND r.site_id = p.site_id ' +
                'WHERE p.site_id = ? AND p.workflow_id = ? AND p.status = \'active\' AND r.content_path = ? ' +
                'ORDER BY p.modified_on DESC LIMIT 1',
                [siteId, workflowId, contentPath.trim()]
            )
            return row ? toMap(row) : null
        }
    }

    void reassignPackagesStep(String siteId, String fromStepId, String toStepId, Long userId) {
        def now = WorkflowDb.now()
        db.withSql { sql ->
            sql.executeUpdate(
                'UPDATE ' + db.table('wf_workflow_package') +
                ' SET workflow_step_id = ?, modified_by = ?, modified_on = ? ' +
                'WHERE site_id = ? AND workflow_step_id = ? AND status = \'active\'',
                [toStepId, userId, now, siteId, fromStepId]
            )
        }
    }

    private static Map toMap(row) {
        return [
            id               : row.id,
            workflow_id      : row.workflow_id,
            workflow_step_id : row.workflow_step_id,
            site_id          : row.site_id,
            title            : row.title,
            description      : row.description,
            position         : row.position,
            cover_color      : row.cover_color,
            due_on           : row.due_on,
            status           : row.status,
            created_by       : row.created_by,
            created_on       : row.created_on,
            modified_by      : row.modified_by,
            modified_on      : row.modified_on,
            closed_on        : row.closed_on
        ]
    }
}
