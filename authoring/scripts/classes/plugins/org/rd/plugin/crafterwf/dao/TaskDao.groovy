package plugins.org.rd.plugin.crafterwf.dao

import plugins.org.rd.plugin.crafterwf.db.WorkflowDb

class TaskDao {

    private static final Set<String> ALLOWED_UPDATE_FIELDS = [
        'title', 'priority', 'assignee_id', 'assignee_username',
        'start_on', 'due_on', 'target_type', 'target_id'
    ] as Set

    private static final String TASK_COLUMNS =
        'id, site_id, title, priority, assignee_id, assignee_username, start_on, due_on, ' +
        'complete_b, archived_b, target_type, target_id, created_on, modified_on, completed_on'

    private final WorkflowDb db

    TaskDao(WorkflowDb db) {
        this.db = db
    }

    List<Map> findByAssignee(String siteId, Long assigneeId, boolean includeComplete = true,
                             boolean includeArchived = false, String targetType = null, String targetId = null) {
        db.withSql { sql ->
            def query = 'SELECT ' + TASK_COLUMNS + ' FROM ' +
                db.table('wf_task') + ' WHERE site_id = ? AND assignee_id = ?'
            def args = [siteId, assigneeId]
            if (!includeComplete) {
                query += ' AND complete_b = 0'
            }
            if (!includeArchived) {
                query += ' AND archived_b = 0'
            }
            if (targetType?.trim()) {
                query += ' AND target_type = ?'
                args << targetType.trim()
            }
            if (targetId?.trim()) {
                query += ' AND target_id = ?'
                args << targetId.trim()
            }
            query += ' ORDER BY complete_b ASC, start_on IS NULL, start_on ASC, due_on IS NULL, due_on ASC, created_on DESC'
            return sql.rows(query, args).collect { toMap(it) }
        }
    }

    List<Map> findBySite(String siteId, boolean includeComplete = true, boolean includeArchived = false) {
        db.withSql { sql ->
            def query = 'SELECT ' + TASK_COLUMNS + ' FROM ' +
                db.table('wf_task') + ' WHERE site_id = ?'
            def args = [siteId]
            if (!includeComplete) {
                query += ' AND complete_b = 0'
            }
            if (!includeArchived) {
                query += ' AND archived_b = 0'
            }
            query += ' ORDER BY start_on IS NULL, start_on ASC, due_on IS NULL, due_on ASC, complete_b ASC, created_on DESC'
            return sql.rows(query, args).collect { toMap(it) }
        }
    }

    List<Map> findByTarget(String siteId, String targetType, String targetId, boolean includeComplete = true,
                           boolean includeArchived = false) {
        db.withSql { sql ->
            def query = 'SELECT ' + TASK_COLUMNS + ' FROM ' +
                db.table('wf_task') + ' WHERE site_id = ? AND target_type = ? AND target_id = ?'
            def args = [siteId, targetType.trim(), targetId.trim()]
            if (!includeComplete) {
                query += ' AND complete_b = 0'
            }
            if (!includeArchived) {
                query += ' AND archived_b = 0'
            }
            query += ' ORDER BY complete_b ASC, start_on IS NULL, start_on ASC, due_on IS NULL, due_on ASC, created_on DESC'
            return sql.rows(query, args).collect { toMap(it) }
        }
    }

    int countOpen(String siteId, Long assigneeId) {
        db.withSql { sql ->
            return (sql.firstRow(
                'SELECT COUNT(*) AS c FROM ' + db.table('wf_task') +
                ' WHERE site_id = ? AND assignee_id = ? AND complete_b = 0 AND archived_b = 0',
                [siteId, assigneeId]
            )?.c ?: 0) as int
        }
    }

    int countOverdue(String siteId, Long assigneeId) {
        def now = WorkflowDb.now()
        db.withSql { sql ->
            return (sql.firstRow(
                'SELECT COUNT(*) AS c FROM ' + db.table('wf_task') +
                ' WHERE site_id = ? AND assignee_id = ? AND complete_b = 0 AND archived_b = 0' +
                ' AND due_on IS NOT NULL AND due_on < ?',
                [siteId, assigneeId, now]
            )?.c ?: 0) as int
        }
    }

    Map insert(String siteId, String title, String priority, Long assigneeId, String assigneeUsername,
               Date startOn, Date dueOn, String targetType, String targetId) {
        def id = WorkflowDb.uuid()
        def now = WorkflowDb.now()
        db.withSql { sql ->
            sql.executeInsert(
                'INSERT INTO ' + db.table('wf_task') +
                ' (id, site_id, title, priority, assignee_id, assignee_username, start_on, due_on, ' +
                'complete_b, archived_b, target_type, target_id, created_on, modified_on, completed_on) ' +
                'VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?, ?, ?, ?, NULL)',
                [id, siteId, title, priority, assigneeId, assigneeUsername, startOn, dueOn,
                 targetType, targetId, now, now]
            )
        }
        return findById(siteId, id)
    }

    Map findById(String siteId, String taskId) {
        db.withSql { sql ->
            def row = sql.firstRow(
                'SELECT ' + TASK_COLUMNS + ' FROM ' + db.table('wf_task') + ' WHERE site_id = ? AND id = ?',
                [siteId, taskId]
            )
            return row ? toMap(row) : null
        }
    }

    void updateFields(String siteId, String taskId, Map fields) {
        if (!fields) {
            return
        }
        def sets = []
        def args = []
        fields.each { key, value ->
            if (!ALLOWED_UPDATE_FIELDS.contains(key as String)) {
                throw new IllegalArgumentException("Invalid field name: ${key}")
            }
            sets << "${key} = ?"
            args << value
        }
        sets << 'modified_on = ?'
        args << WorkflowDb.now()
        args << siteId
        args << taskId
        db.withSql { sql ->
            sql.executeUpdate(
                'UPDATE ' + db.table('wf_task') + ' SET ' + sets.join(', ') +
                ' WHERE site_id = ? AND id = ?',
                args
            )
        }
    }

    void setComplete(String siteId, String taskId, boolean complete) {
        def now = WorkflowDb.now()
        db.withSql { sql ->
            if (complete) {
                sql.executeUpdate(
                    'UPDATE ' + db.table('wf_task') +
                    ' SET complete_b = 1, completed_on = ?, modified_on = ? WHERE site_id = ? AND id = ?',
                    [now, now, siteId, taskId]
                )
            } else {
                sql.executeUpdate(
                    'UPDATE ' + db.table('wf_task') +
                    ' SET complete_b = 0, completed_on = NULL, modified_on = ? WHERE site_id = ? AND id = ?',
                    [now, siteId, taskId]
                )
            }
        }
    }

    void setArchived(String siteId, String taskId, boolean archived) {
        db.withSql { sql ->
            sql.executeUpdate(
                'UPDATE ' + db.table('wf_task') +
                ' SET archived_b = ?, modified_on = ? WHERE site_id = ? AND id = ?',
                [archived ? 1 : 0, WorkflowDb.now(), siteId, taskId]
            )
        }
    }

    private static Map toMap(row) {
        return [
            id                   : row.id,
            site_id              : row.site_id,
            title                : row.title,
            priority             : row.priority,
            assignee_id          : row.assignee_id,
            assignee_username    : row.assignee_username,
            start_on             : row.start_on,
            due_on               : row.due_on,
            complete_b           : row.complete_b,
            archived_b           : row.archived_b,
            target_type          : row.target_type,
            target_id            : row.target_id,
            created_on           : row.created_on,
            modified_on          : row.modified_on,
            completed_on         : row.completed_on
        ]
    }
}
