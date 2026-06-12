package plugins.org.rd.plugin.crafterwf.dao

import plugins.org.rd.plugin.crafterwf.db.WorkflowDb
import plugins.org.rd.plugin.crafterwf.model.RecycleBinState

class RecycleBinDao {

    private static final String COLUMNS =
        'id, site_id, bin_path, internal_name, original_path, original_last_modifier, ' +
        'original_modified_on, original_created_on, original_created_by, original_sandbox_state, ' +
        'state, binned_on, binned_by_user_id, binned_by_username, ' +
        'restored_on, restored_by_user_id, restored_by_username, ' +
        'purged_on, purged_by_user_id, purged_by_username'

    private static final Map SORT_COLUMNS = [
        binnedOn             : 'binned_on',
        internalName         : 'internal_name',
        originalPath         : 'original_path',
        originalModifiedOn   : 'original_modified_on',
        originalCreatedOn    : 'original_created_on',
        originalLastModifier : 'original_last_modifier',
        binnedByUsername     : 'binned_by_username'
    ]

    private final WorkflowDb db

    RecycleBinDao(WorkflowDb db) {
        this.db = db
    }

    Map findById(String siteId, String id) {
        db.withSql { sql ->
            def row = sql.firstRow(
                'SELECT ' + COLUMNS + ' FROM ' + db.table('wf_recycle_bin_item') +
                ' WHERE site_id = ? AND id = ?',
                [siteId, id]
            )
            return row ? toMap(row) : null
        }
    }

    Map findActiveByOriginalPath(String siteId, String originalPath) {
        db.withSql { sql ->
            def row = sql.firstRow(
                'SELECT ' + COLUMNS + ' FROM ' + db.table('wf_recycle_bin_item') +
                ' WHERE site_id = ? AND original_path = ? AND state = ? ORDER BY binned_on DESC LIMIT 1',
                [siteId, originalPath, RecycleBinState.BINNED]
            )
            return row ? toMap(row) : null
        }
    }

    List<Map> listBySite(String siteId, String state = RecycleBinState.BINNED) {
        return listPaged(siteId, state, 1, Integer.MAX_VALUE, 'binnedOn', 'desc').items
    }

    Map listPaged(String siteId, String state, int page, int pageSize, String sortBy, String sortOrder, String q = null) {
        db.withSql { sql ->
            def where = ' WHERE site_id = ?'
            def args = [siteId]
            if (state?.trim()) {
                where += ' AND state = ?'
                args << RecycleBinState.normalize(state)
            }
            if (q?.trim()) {
                def like = '%' + q.trim() + '%'
                where += ' AND (' +
                    'internal_name LIKE ? OR original_path LIKE ? OR bin_path LIKE ? OR ' +
                    'original_last_modifier LIKE ? OR original_created_by LIKE ? OR binned_by_username LIKE ? OR ' +
                    'original_sandbox_state LIKE ? OR ' +
                    'CAST(original_modified_on AS CHAR) LIKE ? OR ' +
                    'CAST(original_created_on AS CHAR) LIKE ? OR ' +
                    'CAST(binned_on AS CHAR) LIKE ?' +
                    ')'
                args.addAll([like, like, like, like, like, like, like, like, like, like])
            }
            def total = (sql.firstRow(
                'SELECT COUNT(*) AS c FROM ' + db.table('wf_recycle_bin_item') + where,
                args
            )?.c ?: 0) as int

            def safePage = Math.max(page, 1)
            def safePageSize = Math.min(Math.max(pageSize, 1), 100)
            def offset = (safePage - 1) * safePageSize
            def orderColumn = SORT_COLUMNS.get(sortBy, 'binned_on')
            def orderDir = sortOrder?.toLowerCase() == 'asc' ? 'ASC' : 'DESC'
            def query = 'SELECT ' + COLUMNS + ' FROM ' + db.table('wf_recycle_bin_item') +
                where + " ORDER BY ${orderColumn} ${orderDir} LIMIT ? OFFSET ?"
            def rows = sql.rows(query, args + [safePageSize, offset]).collect { toMap(it) }
            def totalPages = safePageSize > 0 ? (int) Math.ceil(total / safePageSize) : 0
            return [
                items      : rows,
                total      : total,
                page       : safePage,
                pageSize   : safePageSize,
                totalPages : totalPages
            ]
        }
    }

    Map insert(Map fields) {
        db.withSql { sql ->
            sql.executeInsert(
                'INSERT INTO ' + db.table('wf_recycle_bin_item') +
                ' (id, site_id, bin_path, internal_name, original_path, original_last_modifier, ' +
                'original_modified_on, original_created_on, original_created_by, original_sandbox_state, ' +
                'state, binned_on, binned_by_user_id, binned_by_username) ' +
                'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    sqlString(fields.id),
                    sqlString(fields.siteId),
                    sqlString(fields.binPath),
                    sqlString(fields.internalName),
                    sqlString(fields.originalPath),
                    sqlString(fields.originalLastModifier),
                    fields.originalModifiedOn,
                    fields.originalCreatedOn,
                    sqlString(fields.originalCreatedBy),
                    sqlString(fields.originalSandboxState),
                    sqlString(fields.state ?: RecycleBinState.BINNED),
                    fields.binnedOn ?: new Date(),
                    fields.binnedByUserId ?: 0L,
                    sqlString(fields.binnedByUsername ?: 'unknown')
                ]
            )
        }
        return findById(sqlString(fields.siteId), sqlString(fields.id))
    }

    void markRestored(String siteId, String id, Long userId, String username, Date restoredOn = new Date()) {
        db.withSql { sql ->
            sql.executeUpdate(
                'UPDATE ' + db.table('wf_recycle_bin_item') +
                ' SET state = ?, restored_on = ?, restored_by_user_id = ?, restored_by_username = ? ' +
                'WHERE site_id = ? AND id = ?',
                [RecycleBinState.RESTORED, restoredOn, userId, sqlString(username), sqlString(siteId), sqlString(id)]
            )
        }
    }

    void markPurged(String siteId, String id, Long userId, String username, Date purgedOn = new Date()) {
        db.withSql { sql ->
            sql.executeUpdate(
                'UPDATE ' + db.table('wf_recycle_bin_item') +
                ' SET state = ?, purged_on = ?, purged_by_user_id = ?, purged_by_username = ? ' +
                'WHERE site_id = ? AND id = ?',
                [RecycleBinState.PURGED, purgedOn, userId, sqlString(username), sqlString(siteId), sqlString(id)]
            )
        }
    }

    /** JDBC does not accept Groovy GString — coerce to java.lang.String. */
    private static String sqlString(value) {
        return value == null ? null : value.toString()
    }

    private static Map toMap(row) {
        return [
            id                    : row.id,
            siteId                : row.site_id,
            binPath               : row.bin_path,
            internalName          : row.internal_name,
            originalPath          : row.original_path,
            originalLastModifier  : row.original_last_modifier,
            originalModifiedOn    : row.original_modified_on,
            originalCreatedOn     : row.original_created_on,
            originalCreatedBy     : row.original_created_by,
            originalSandboxState  : row.original_sandbox_state,
            state                 : row.state,
            binnedOn              : row.binned_on,
            binnedByUserId        : row.binned_by_user_id,
            binnedByUsername      : row.binned_by_username,
            restoredOn            : row.restored_on,
            restoredByUserId      : row.restored_by_user_id,
            restoredByUsername    : row.restored_by_username,
            purgedOn              : row.purged_on,
            purgedByUserId        : row.purged_by_user_id,
            purgedByUsername      : row.purged_by_username
        ]
    }
}
