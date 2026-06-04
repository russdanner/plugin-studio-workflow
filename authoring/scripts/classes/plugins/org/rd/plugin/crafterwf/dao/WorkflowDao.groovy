package plugins.org.rd.plugin.crafterwf.dao

import plugins.org.rd.plugin.crafterwf.db.WorkflowDb

class WorkflowDao {

    private final WorkflowDb db

    WorkflowDao(WorkflowDb db) {
        this.db = db
    }

    Map findById(String siteId, String workflowId) {
        db.withSql { sql ->
            def row = sql.firstRow(
                'SELECT id, site_id, name, description, background_url, position, is_default, ' +
                'created_by, created_on, modified_by, modified_on FROM ' + db.table('wf_workflow') +
                ' WHERE site_id = ? AND id = ?',
                [siteId, workflowId]
            )
            return row ? toMap(row) : null
        }
    }

    Map findDefaultForSite(String siteId) {
        db.withSql { sql ->
            def row = sql.firstRow(
                'SELECT id, site_id, name, description, background_url, position, is_default, ' +
                'created_by, created_on, modified_by, modified_on FROM ' + db.table('wf_workflow') +
                ' WHERE site_id = ? AND is_default = 1 ORDER BY position ASC LIMIT 1',
                [siteId]
            )
            if (row) {
                return toMap(row)
            }
            row = sql.firstRow(
                'SELECT id, site_id, name, description, background_url, position, is_default, ' +
                'created_by, created_on, modified_by, modified_on FROM ' + db.table('wf_workflow') +
                ' WHERE site_id = ? ORDER BY position ASC LIMIT 1',
                [siteId]
            )
            return row ? toMap(row) : null
        }
    }

    Map insert(String siteId, String name, String description, Long userId) {
        def id = WorkflowDb.uuid()
        def now = WorkflowDb.now()
        db.withSql { sql ->
            sql.executeInsert(
                'INSERT INTO ' + db.table('wf_workflow') +
                ' (id, site_id, name, description, background_url, position, is_default, ' +
                'created_by, created_on, modified_by, modified_on) ' +
                'VALUES (?, ?, ?, ?, NULL, 0, 1, ?, ?, ?, ?)',
                [id, siteId, name, description, userId, now, userId, now]
            )
        }
        return findById(siteId, id)
    }

    List<Map> findAllBySite(String siteId) {
        db.withSql { sql ->
            return sql.rows(
                'SELECT id, site_id, name, description, background_url, position, is_default, ' +
                'created_by, created_on, modified_by, modified_on FROM ' + db.table('wf_workflow') +
                ' WHERE site_id = ? ORDER BY position ASC, name ASC',
                [siteId]
            ).collect { toMap(it) }
        }
    }

    void update(String siteId, String workflowId, String name, String description, String backgroundUrl, Long userId) {
        def now = WorkflowDb.now()
        db.withSql { sql ->
            sql.executeUpdate(
                'UPDATE ' + db.table('wf_workflow') +
                ' SET name = ?, description = ?, background_url = ?, modified_by = ?, modified_on = ? ' +
                'WHERE site_id = ? AND id = ?',
                [name, description, backgroundUrl, userId, now, siteId, workflowId]
            )
        }
    }

    void delete(String siteId, String workflowId) {
        db.withSql { sql ->
            sql.execute(
                'DELETE FROM ' + db.table('wf_workflow') + ' WHERE site_id = ? AND id = ?',
                [siteId, workflowId]
            )
        }
    }

    private static Map toMap(row) {
        return [
            id             : row.id,
            site_id        : row.site_id,
            name           : row.name,
            description    : row.description,
            background_url : row.background_url,
            position       : row.position,
            is_default     : row.is_default,
            created_by     : row.created_by,
            created_on     : row.created_on,
            modified_by    : row.modified_by,
            modified_on    : row.modified_on
        ]
    }
}
