package plugins.org.rd.plugin.crafterwf.dao

import plugins.org.rd.plugin.crafterwf.db.WorkflowDb

class AuditLogDao {

    private final WorkflowDb db

    AuditLogDao(WorkflowDb db) {
        this.db = db
    }

    Map insert(String siteId, Long userId, String username, String operation,
               String targetType, String targetId, String note) {
        def id = WorkflowDb.uuid()
        def now = WorkflowDb.now()
        db.withSql { sql ->
            sql.executeInsert(
                'INSERT INTO ' + db.table('wf_audit_log') +
                ' (id, site_id, user_id, username, operation, target_type, target_id, note, created_on) ' +
                'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [id, siteId, userId, username, operation, targetType, targetId, note, now]
            )
        }
        return findById(siteId, id)
    }

    Map findById(String siteId, String auditId) {
        db.withSql { sql ->
            def row = sql.firstRow(
                'SELECT id, site_id, user_id, username, operation, target_type, target_id, note, created_on FROM ' +
                db.table('wf_audit_log') + ' WHERE site_id = ? AND id = ?',
                [siteId, auditId]
            )
            return row ? toMap(row) : null
        }
    }

    Map search(String siteId, Map filters) {
        def page = Math.max((filters.page ?: 1) as int, 1)
        def pageSize = Math.min(Math.max((filters.pageSize ?: 50) as int, 1), 200)
        def offset = (page - 1) * pageSize

        def where = ['site_id = ?']
        def args = [siteId]

        if (filters.username?.trim()) {
            where << 'username = ?'
            args << filters.username.trim()
        }
        if (filters.operation?.trim()) {
            where << 'operation = ?'
            args << filters.operation.trim()
        }
        if (filters.targetType?.trim()) {
            where << 'target_type = ?'
            args << filters.targetType.trim()
        }
        if (filters.targetId?.trim()) {
            where << 'target_id = ?'
            args << filters.targetId.trim()
        }
        if (filters.fromDate) {
            where << 'created_on >= ?'
            args << filters.fromDate
        }
        if (filters.toDate) {
            where << 'created_on <= ?'
            args << filters.toDate
        }
        if (filters.q?.trim()) {
            def like = '%' + filters.q.trim() + '%'
            where << '(note LIKE ? OR username LIKE ? OR target_id LIKE ? OR operation LIKE ?)'
            args.addAll([like, like, like, like])
        }

        def whereClause = where.join(' AND ')
        def table = db.table('wf_audit_log')
        def sortColumn = resolveSortColumn(filters.sortBy)
        def sortOrder = resolveSortOrder(filters.sortOrder)

        return db.withSql { sql ->
            def total = (sql.firstRow(
                'SELECT COUNT(*) AS c FROM ' + table + ' WHERE ' + whereClause,
                args
            )?.c ?: 0) as int

            def rows = sql.rows(
                'SELECT id, site_id, user_id, username, operation, target_type, target_id, note, created_on FROM ' +
                table + ' WHERE ' + whereClause + " ORDER BY ${sortColumn} ${sortOrder} LIMIT ? OFFSET ?",
                args + [pageSize, offset]
            ).collect { toMap(it) }

            def totalPages = total > 0 ? (int) Math.ceil(total / pageSize) : 0
            return [
                entries    : rows,
                total      : total,
                page       : page,
                pageSize   : pageSize,
                totalPages : totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            ]
        }
    }

    private static String resolveSortColumn(value) {
        switch ((value ?: 'createdOn') as String) {
            case 'username':
                return 'username'
            case 'operation':
                return 'operation'
            case 'note':
                return 'note'
            case 'createdOn':
            default:
                return 'created_on'
        }
    }

    private static String resolveSortOrder(value) {
        return 'asc'.equalsIgnoreCase(value as String) ? 'ASC' : 'DESC'
    }

    private static Map toMap(row) {
        return [
            id         : row.id,
            siteId     : row.site_id,
            userId     : row.user_id,
            username   : row.username,
            operation  : row.operation,
            targetType : row.target_type,
            targetId   : row.target_id,
            note       : row.note,
            createdOn  : row.created_on
        ]
    }
}
