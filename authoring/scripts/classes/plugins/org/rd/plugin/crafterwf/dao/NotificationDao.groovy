package plugins.org.rd.plugin.crafterwf.dao

import plugins.org.rd.plugin.crafterwf.db.WorkflowDb

class NotificationDao {

    private final WorkflowDb db

    NotificationDao(WorkflowDb db) {
        this.db = db
    }

    List<Map> findByUser(String siteId, Long userId, boolean unreadOnly = false,
                        boolean includeResolved = true, boolean includeArchived = false) {
        db.withSql { sql ->
            def query = 'SELECT id, site_id, user_id, title, message, target_type, target_id, ' +
                'read_b, resolved_b, archived_b, created_on, modified_on FROM ' +
                db.table('wf_notification') +
                ' WHERE site_id = ? AND user_id = ?'
            if (unreadOnly) {
                query += ' AND read_b = 0'
            }
            if (!includeResolved) {
                query += ' AND resolved_b = 0'
            }
            if (!includeArchived) {
                query += ' AND archived_b = 0'
            }
            query += ' ORDER BY created_on DESC'
            return sql.rows(query, [siteId, userId]).collect { toMap(it) }
        }
    }

    int countUnread(String siteId, Long userId) {
        db.withSql { sql ->
            return (sql.firstRow(
                'SELECT COUNT(*) AS c FROM ' + db.table('wf_notification') +
                ' WHERE site_id = ? AND user_id = ? AND read_b = 0 AND archived_b = 0',
                [siteId, userId]
            )?.c ?: 0) as int
        }
    }

    Map insert(String siteId, Long userId, String title, String message,
               String targetType = null, String targetId = null) {
        def id = WorkflowDb.uuid()
        def now = WorkflowDb.now()
        db.withSql { sql ->
            sql.executeInsert(
                'INSERT INTO ' + db.table('wf_notification') +
                ' (id, site_id, user_id, title, message, target_type, target_id, ' +
                'read_b, resolved_b, archived_b, created_on, modified_on) ' +
                'VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?, ?)',
                [id, siteId, userId, title, message, targetType, targetId, now, now]
            )
        }
        return findById(siteId, userId, id)
    }

    Map findById(String siteId, Long userId, String notificationId) {
        db.withSql { sql ->
            def row = sql.firstRow(
                'SELECT id, site_id, user_id, title, message, target_type, target_id, ' +
                'read_b, resolved_b, archived_b, created_on, modified_on FROM ' +
                db.table('wf_notification') +
                ' WHERE site_id = ? AND user_id = ? AND id = ?',
                [siteId, userId, notificationId]
            )
            return row ? toMap(row) : null
        }
    }

    void setRead(String siteId, Long userId, String notificationId, boolean read) {
        db.withSql { sql ->
            sql.executeUpdate(
                'UPDATE ' + db.table('wf_notification') +
                ' SET read_b = ?, modified_on = ? WHERE site_id = ? AND user_id = ? AND id = ?',
                [read ? 1 : 0, WorkflowDb.now(), siteId, userId, notificationId]
            )
        }
    }

    void markAllRead(String siteId, Long userId) {
        db.withSql { sql ->
            sql.executeUpdate(
                'UPDATE ' + db.table('wf_notification') +
                ' SET read_b = 1, modified_on = ? WHERE site_id = ? AND user_id = ? AND read_b = 0',
                [WorkflowDb.now(), siteId, userId]
            )
        }
    }

    void markReadByIds(String siteId, Long userId, List<String> notificationIds) {
        if (!notificationIds) {
            return
        }
        def now = WorkflowDb.now()
        db.withSql { sql ->
            notificationIds.each { notificationId ->
                sql.executeUpdate(
                    'UPDATE ' + db.table('wf_notification') +
                    ' SET read_b = 1, modified_on = ? WHERE site_id = ? AND user_id = ? AND id = ? AND read_b = 0',
                    [now, siteId, userId, notificationId]
                )
            }
        }
    }

    void setResolved(String siteId, Long userId, String notificationId, boolean resolved) {
        db.withSql { sql ->
            sql.executeUpdate(
                'UPDATE ' + db.table('wf_notification') +
                ' SET resolved_b = ?, modified_on = ? WHERE site_id = ? AND user_id = ? AND id = ?',
                [resolved ? 1 : 0, WorkflowDb.now(), siteId, userId, notificationId]
            )
        }
    }

    void setArchived(String siteId, Long userId, String notificationId, boolean archived) {
        db.withSql { sql ->
            sql.executeUpdate(
                'UPDATE ' + db.table('wf_notification') +
                ' SET archived_b = ?, modified_on = ? WHERE site_id = ? AND user_id = ? AND id = ?',
                [archived ? 1 : 0, WorkflowDb.now(), siteId, userId, notificationId]
            )
        }
    }

    private static Map toMap(row) {
        return [
            id           : row.id,
            site_id      : row.site_id,
            user_id      : row.user_id,
            title        : row.title,
            message      : row.message,
            target_type  : row.target_type,
            target_id    : row.target_id,
            read_b       : row.read_b,
            resolved_b   : row.resolved_b,
            archived_b   : row.archived_b,
            created_on   : row.created_on,
            modified_on  : row.modified_on
        ]
    }
}
