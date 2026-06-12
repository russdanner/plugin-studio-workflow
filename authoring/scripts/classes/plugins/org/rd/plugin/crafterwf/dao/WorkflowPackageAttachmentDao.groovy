package plugins.org.rd.plugin.crafterwf.dao

import plugins.org.rd.plugin.crafterwf.db.WorkflowDb

class WorkflowPackageAttachmentDao {

    private final WorkflowDb db

    WorkflowPackageAttachmentDao(WorkflowDb db) {
        this.db = db
    }

    List<Map> findContentRefs(String siteId, String packageId) {
        db.withSql { sql ->
            return sql.rows(
                'SELECT id, workflow_package_id, site_id, content_path, content_type, display_name, sort_order, created_by, created_on FROM ' +
                db.table('wf_workflow_package_content_ref') +
                ' WHERE site_id = ? AND workflow_package_id = ? ORDER BY sort_order ASC, created_on ASC',
                [siteId, packageId]
            ).collect { toContentRef(it) }
        }
    }

    List<Map> findPackagesByContentPath(String siteId, String contentPath) {
        def pathVariants = expandContentPathVariants(contentPath)
        if (!pathVariants) {
            return []
        }
        def placeholders = pathVariants.collect { '?' }.join(', ')
        db.withSql { sql ->
            return sql.rows(
                'SELECT p.id AS workflow_package_id, p.title, p.cover_color, p.workflow_step_id, p.workflow_id, p.due_on ' +
                'FROM ' + db.table('wf_workflow_package_content_ref') + ' r ' +
                'INNER JOIN ' + db.table('wf_workflow_package') + ' p ' +
                'ON p.id = r.workflow_package_id AND p.site_id = r.site_id ' +
                "WHERE r.site_id = ? AND r.content_path IN (${placeholders}) AND p.status = 'active' " +
                'ORDER BY p.modified_on DESC',
                ([siteId] + pathVariants)
            ).collect { row ->
                [
                    workflow_package_id : row.workflow_package_id,
                    workflow_id         : row.workflow_id,
                    title               : row.title,
                    cover_color         : row.cover_color,
                    workflow_step_id    : row.workflow_step_id,
                    due_on              : row.due_on
                ]
            }
        }
    }

    private static List<String> expandContentPathVariants(String contentPath) {
        def path = contentPath?.toString()?.trim()
        if (!path) {
            return []
        }
        def variants = [] as LinkedHashSet
        variants << path
        if (path.endsWith('/index.xml')) {
            def folderPath = path.replaceAll(/\/index\.xml$/, '')
            if (folderPath) {
                variants << folderPath
            }
        } else if (!path.contains('.')) {
            variants << "${path}/index.xml"
        }
        return variants.toList()
    }

    List<Map> findLinks(String siteId, String packageId) {
        db.withSql { sql ->
            return sql.rows(
                'SELECT id, workflow_package_id, site_id, name, url, sort_order, created_on FROM ' +
                db.table('wf_workflow_package_link') +
                ' WHERE site_id = ? AND workflow_package_id = ? ORDER BY sort_order ASC, created_on ASC',
                [siteId, packageId]
            ).collect { toLink(it) }
        }
    }

    Map insertContentRef(String siteId, String packageId, String contentPath, String displayName, Long userId,
                         String contentType = null) {
        def id = WorkflowDb.uuid()
        def now = WorkflowDb.now()
        db.withSql { sql ->
            def sort = (sql.firstRow(
                'SELECT COALESCE(MAX(sort_order), -1) + 1 AS next_order FROM ' +
                db.table('wf_workflow_package_content_ref') +
                ' WHERE site_id = ? AND workflow_package_id = ?',
                [siteId, packageId]
            )?.next_order ?: 0) as int
            sql.executeInsert(
                'INSERT INTO ' + db.table('wf_workflow_package_content_ref') +
                ' (id, workflow_package_id, site_id, content_path, content_type, display_name, sort_order, created_by, created_on) ' +
                'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [id, packageId, siteId, contentPath, contentType, displayName, sort, userId, now]
            )
        }
        return findContentRefById(siteId, id)
    }

    Map findContentRefById(String siteId, String refId) {
        db.withSql { sql ->
            def row = sql.firstRow(
                'SELECT id, workflow_package_id, site_id, content_path, content_type, display_name, sort_order, created_by, created_on FROM ' +
                db.table('wf_workflow_package_content_ref') + ' WHERE site_id = ? AND id = ?',
                [siteId, refId]
            )
            return row ? toContentRef(row) : null
        }
    }

    Map findLinkById(String siteId, String linkId) {
        db.withSql { sql ->
            def row = sql.firstRow(
                'SELECT id, workflow_package_id, site_id, name, url, sort_order, created_on FROM ' +
                db.table('wf_workflow_package_link') + ' WHERE site_id = ? AND id = ?',
                [siteId, linkId]
            )
            return row ? toLink(row) : null
        }
    }

    void deleteContentRef(String siteId, String refId) {
        db.withSql { sql ->
            sql.executeUpdate(
                'DELETE FROM ' + db.table('wf_workflow_package_content_ref') + ' WHERE site_id = ? AND id = ?',
                [siteId, refId]
            )
        }
    }

    void deleteContentRefsByPath(String siteId, String contentPath) {
        if (!siteId?.trim() || !contentPath?.trim()) {
            return
        }
        db.withSql { sql ->
            sql.executeUpdate(
                'DELETE FROM ' + db.table('wf_workflow_package_content_ref') +
                ' WHERE site_id = ? AND content_path = ?',
                [siteId, contentPath.trim()]
            )
        }
    }

    void deleteLink(String siteId, String linkId) {
        db.withSql { sql ->
            sql.executeUpdate(
                'DELETE FROM ' + db.table('wf_workflow_package_link') + ' WHERE site_id = ? AND id = ?',
                [siteId, linkId]
            )
        }
    }

    private static Map toContentRef(row) {
        return [
            id                  : row.id,
            workflow_package_id : row.workflow_package_id,
            site_id             : row.site_id,
            content_path        : row.content_path,
            content_type        : row.content_type,
            display_name        : row.display_name,
            sort_order          : row.sort_order,
            created_by          : row.created_by,
            created_on          : row.created_on
        ]
    }

    private static Map toLink(row) {
        return [
            id                  : row.id,
            workflow_package_id : row.workflow_package_id,
            site_id             : row.site_id,
            name                : row.name,
            url                 : row.url,
            sort_order          : row.sort_order,
            created_on          : row.created_on
        ]
    }
}
