package plugins.org.rd.plugin.crafterwf.dao

import plugins.org.rd.plugin.crafterwf.db.WorkflowDb

class NotificationPreferenceDao {

    private static final String MODE_IMMEDIATE = 'immediate'
    private static final String MODE_DAILY_SUMMARY = 'daily_summary'

    private final WorkflowDb db

    NotificationPreferenceDao(WorkflowDb db) {
        this.db = db
    }

    Map find(String siteId, Long userId) {
        db.withSql { sql ->
            def row = sql.firstRow(
                'SELECT site_id, user_id, delivery_mode, summary_time, email_enabled, modified_on FROM ' +
                db.table('wf_user_notification_preference') +
                ' WHERE site_id = ? AND user_id = ?',
                [siteId, userId]
            )
            return row ? toMap(row) : defaultRow(siteId, userId)
        }
    }

    Map save(String siteId, Long userId, String deliveryMode, String summaryTime, boolean emailEnabled) {
        def mode = normalizeDeliveryMode(deliveryMode)
        def now = WorkflowDb.now()
        db.withSql { sql ->
            sql.execute(
                'INSERT INTO ' + db.table('wf_user_notification_preference') +
                ' (site_id, user_id, delivery_mode, summary_time, email_enabled, modified_on) ' +
                'VALUES (?, ?, ?, ?, ?, ?) ' +
                'ON DUPLICATE KEY UPDATE delivery_mode = VALUES(delivery_mode), ' +
                'summary_time = VALUES(summary_time), email_enabled = VALUES(email_enabled), ' +
                'modified_on = VALUES(modified_on)',
                [siteId, userId, mode, summaryTime?.trim(), emailEnabled ? 1 : 0, now]
            )
        }
        return find(siteId, userId)
    }

    private static Map defaultRow(String siteId, Long userId) {
        return [
            site_id      : siteId,
            user_id      : userId,
            delivery_mode: MODE_IMMEDIATE,
            summary_time : null,
            email_enabled: 1,
            modified_on  : null
        ]
    }

    private static String normalizeDeliveryMode(String deliveryMode) {
        def mode = deliveryMode?.trim()?.toLowerCase()
        if (mode == MODE_DAILY_SUMMARY) {
            return MODE_DAILY_SUMMARY
        }
        return MODE_IMMEDIATE
    }

    private static Map toMap(row) {
        return [
            site_id      : row.site_id,
            user_id      : row.user_id,
            delivery_mode: row.delivery_mode,
            summary_time : row.summary_time,
            email_enabled: row.email_enabled,
            modified_on  : row.modified_on
        ]
    }
}
