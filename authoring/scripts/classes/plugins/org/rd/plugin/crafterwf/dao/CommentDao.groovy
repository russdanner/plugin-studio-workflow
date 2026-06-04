package plugins.org.rd.plugin.crafterwf.dao

import plugins.org.rd.plugin.crafterwf.db.WorkflowDb

class CommentDao {

    private final WorkflowDb db

    CommentDao(WorkflowDb db) {
        this.db = db
    }

    List<Map> findByTarget(String siteId, String targetType, String targetId,
                          boolean includeResolved = true, boolean includeArchived = false) {
        db.withSql { sql ->
            def query = 'SELECT id, site_id, target_id, target_type, author_id, author_username, body, ' +
                'created_on, resolved_on, resolved_by, archived_on, archived_by, workflow_id, workflow_step_id FROM ' +
                db.table('wf_comment') +
                ' WHERE site_id = ? AND target_type = ? AND target_id = ?'
            if (!includeResolved) {
                query += ' AND resolved_on IS NULL'
            }
            if (!includeArchived) {
                query += ' AND archived_on IS NULL'
            }
            query += ' ORDER BY created_on ASC'
            return sql.rows(query, [siteId, targetType, targetId]).collect { toMap(it) }
        }
    }

    int countByTarget(String siteId, String targetType, String targetId) {
        db.withSql { sql ->
            return (sql.firstRow(
                'SELECT COUNT(*) AS c FROM ' + db.table('wf_comment') +
                ' WHERE site_id = ? AND target_type = ? AND target_id = ? AND archived_on IS NULL',
                [siteId, targetType, targetId]
            )?.c ?: 0) as int
        }
    }

    Map insert(String siteId, String targetType, String targetId, String body,
               Long authorId, String authorUsername, String workflowId = null, String workflowStepId = null) {
        def id = WorkflowDb.uuid()
        def now = WorkflowDb.now()
        db.withSql { sql ->
            sql.executeInsert(
                'INSERT INTO ' + db.table('wf_comment') +
                ' (id, site_id, target_id, target_type, author_id, author_username, body, created_on, ' +
                'resolved_on, resolved_by, archived_on, archived_by, workflow_id, workflow_step_id) ' +
                'VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL, NULL, NULL, ?, ?)',
                [id, siteId, targetId, targetType, authorId, authorUsername, body, now, workflowId, workflowStepId]
            )
        }
        return findById(siteId, id)
    }

    Map findById(String siteId, String commentId) {
        db.withSql { sql ->
            def row = sql.firstRow(
                'SELECT id, site_id, target_id, target_type, author_id, author_username, body, created_on, ' +
                'resolved_on, resolved_by, archived_on, archived_by, workflow_id, workflow_step_id FROM ' +
                db.table('wf_comment') + ' WHERE site_id = ? AND id = ?',
                [siteId, commentId]
            )
            return row ? toMap(row) : null
        }
    }

    void setResolved(String siteId, String commentId, boolean resolved, Long userId) {
        def now = WorkflowDb.now()
        db.withSql { sql ->
            if (resolved) {
                sql.executeUpdate(
                    'UPDATE ' + db.table('wf_comment') +
                    ' SET resolved_on = ?, resolved_by = ? WHERE site_id = ? AND id = ?',
                    [now, userId, siteId, commentId]
                )
            } else {
                sql.executeUpdate(
                    'UPDATE ' + db.table('wf_comment') +
                    ' SET resolved_on = NULL, resolved_by = NULL WHERE site_id = ? AND id = ?',
                    [siteId, commentId]
                )
            }
        }
    }

    void setArchived(String siteId, String commentId, boolean archived, Long userId) {
        def now = WorkflowDb.now()
        db.withSql { sql ->
            if (archived) {
                sql.executeUpdate(
                    'UPDATE ' + db.table('wf_comment') +
                    ' SET archived_on = ?, archived_by = ? WHERE site_id = ? AND id = ?',
                    [now, userId, siteId, commentId]
                )
            } else {
                sql.executeUpdate(
                    'UPDATE ' + db.table('wf_comment') +
                    ' SET archived_on = NULL, archived_by = NULL WHERE site_id = ? AND id = ?',
                    [siteId, commentId]
                )
            }
        }
    }

    private static Map toMap(row) {
        return [
            id               : row.id,
            site_id          : row.site_id,
            target_id        : row.target_id,
            target_type      : row.target_type,
            author_id        : row.author_id,
            author_username  : row.author_username,
            body             : row.body,
            created_on       : row.created_on,
            resolved_on      : row.resolved_on,
            resolved_by      : row.resolved_by,
            archived_on      : row.archived_on,
            archived_by      : row.archived_by,
            workflow_id      : row.workflow_id,
            workflow_step_id : row.workflow_step_id
        ]
    }
}
