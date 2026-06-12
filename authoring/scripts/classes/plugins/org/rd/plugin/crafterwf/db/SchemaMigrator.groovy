package plugins.org.rd.plugin.crafterwf.db

import org.slf4j.Logger
import org.slf4j.LoggerFactory

class SchemaMigrator {

    private static final Logger logger = LoggerFactory.getLogger(SchemaMigrator)
    private static final String LOCK_NAME = 'crafter_workflow_schema_migrate'
    private static final int LATEST_SCHEMA_VERSION = 14

    private final WorkflowDb db

    SchemaMigrator(WorkflowDb db) {
        this.db = db
    }

    void migrateIfNeeded() {
        db.withSql { sql ->
            if (isSchemaReady(sql)) {
                return
            }

            def locked = false
            for (int attempt = 0; attempt < 5 && !locked; attempt++) {
                locked = sql.firstRow('SELECT GET_LOCK(?, 10) AS acquired', [LOCK_NAME])?.acquired == 1
            }
            if (!locked) {
                if (isSchemaReady(sql)) {
                    return
                }
                logger.warn('Could not acquire schema migration lock for `{}`; deferring migration', db.schemaName)
                return
            }
            try {
                if (isSchemaReady(sql)) {
                    return
                }
                sql.execute('CREATE SCHEMA IF NOT EXISTS ' + db.qualifiedSchema())
                ensureVersionTable(sql)
                def current = currentVersion(sql)
                if (current < 1) {
                    applyV001(sql)
                    recordVersion(sql, 1, 'Initial workflow schema')
                }
                current = currentVersion(sql)
                if (current < 2 || !tableExists(sql, 'wf_comment')) {
                    applyV002(sql)
                }
                if (currentVersion(sql) < 2) {
                    recordVersion(sql, 2, 'Generic comment targets')
                }
                current = currentVersion(sql)
                if (current < 3 || !columnExists(sql, 'wf_comment', 'archived_on')) {
                    applyV003(sql)
                }
                if (currentVersion(sql) < 3) {
                    recordVersion(sql, 3, 'Comment archive support')
                }
                current = currentVersion(sql)
                if (current < 4 || !notificationTableReady(sql)) {
                    applyV004(sql)
                }
                if (currentVersion(sql) < 4) {
                    recordVersion(sql, 4, 'User notifications')
                }
                current = currentVersion(sql)
                if (current < 5 || !taskTableReady(sql)) {
                    applyV005(sql)
                }
                if (currentVersion(sql) < 5) {
                    recordVersion(sql, 5, 'Tasks')
                }
                current = currentVersion(sql)
                if (current < 6 || !auditTableReady(sql)) {
                    applyV006(sql)
                }
                if (currentVersion(sql) < 6) {
                    recordVersion(sql, 6, 'Audit log')
                }
                current = currentVersion(sql)
                if (current < 7 || !stepActionColumnsReady(sql)) {
                    applyV007(sql)
                }
                if (currentVersion(sql) < 7) {
                    recordVersion(sql, 7, 'Step publish actions')
                }
                current = currentVersion(sql)
                if (current < 8 || !stepActionTypeColumnsReady(sql)) {
                    applyV008(sql)
                }
                if (currentVersion(sql) < 8) {
                    recordVersion(sql, 8, 'Step action type and success step')
                }
                current = currentVersion(sql)
                if (current < 9 || !stepAllowAddPackageColumnReady(sql)) {
                    applyV009(sql)
                }
                if (currentVersion(sql) < 9) {
                    recordVersion(sql, 9, 'Step allow add package')
                }
                current = currentVersion(sql)
                if (current < 10 || !packageDueOnColumnReady(sql)) {
                    applyV010(sql)
                }
                if (currentVersion(sql) < 10) {
                    recordVersion(sql, 10, 'Package due date')
                }
                current = currentVersion(sql)
                if (current < 11 || !taskStartOnColumnReady(sql)) {
                    applyV011(sql)
                }
                if (currentVersion(sql) < 11) {
                    recordVersion(sql, 11, 'Task start date')
                }
                current = currentVersion(sql)
                if (current < 12 || !stepRulesColumnsReady(sql)) {
                    applyV012(sql)
                }
                if (currentVersion(sql) < 12) {
                    recordVersion(sql, 12, 'Step role and content rules')
                }
                current = currentVersion(sql)
                if (current < 13 || !recycleBinTableReady(sql)) {
                    applyV013(sql)
                }
                if (currentVersion(sql) < 13) {
                    recordVersion(sql, 13, 'Recycle bin')
                }
                current = currentVersion(sql)
                if (current < 14 || !recycleBinMetadataColumnsReady(sql)) {
                    applyV014(sql)
                }
                if (currentVersion(sql) < 14) {
                    recordVersion(sql, 14, 'Recycle bin metadata and purge audit')
                }
            } finally {
                sql.execute('SELECT RELEASE_LOCK(?)', [LOCK_NAME])
            }
        }
    }

    private boolean isSchemaReady(sql) {
        try {
            def schemaRow = sql.firstRow(
                'SELECT COUNT(*) AS c FROM information_schema.schemata WHERE LOWER(schema_name) = LOWER(?)',
                [db.schemaName]
            )
            if (!schemaRow || (schemaRow.c as int) == 0) {
                return false
            }
            if (!tableExists(sql, 'wf_comment')) {
                return false
            }
            if (!columnExists(sql, 'wf_comment', 'archived_on')) {
                return false
            }
            if (!notificationTableReady(sql)) {
                return false
            }
            if (!taskTableReady(sql)) {
                return false
            }
            if (!auditTableReady(sql)) {
                return false
            }
            if (!stepActionColumnsReady(sql)) {
                return false
            }
            if (!stepActionTypeColumnsReady(sql)) {
                return false
            }
            if (!stepAllowAddPackageColumnReady(sql)) {
                return false
            }
            if (!packageDueOnColumnReady(sql)) {
                return false
            }
            if (!taskStartOnColumnReady(sql)) {
                return false
            }
            def versionRow = sql.firstRow('SELECT MAX(version) AS v FROM ' + db.table('wf_schema_version'))
            def version = versionRow?.v != null ? versionRow.v as int : 0
            return version >= LATEST_SCHEMA_VERSION
        } catch (Exception ignored) {
            return false
        }
    }

    Map getStatus() {
        try {
            return db.withSql { sql ->
                def schemaRow = sql.firstRow(
                    'SELECT COUNT(*) AS c FROM information_schema.schemata WHERE LOWER(schema_name) = LOWER(?)',
                    [db.schemaName]
                )
                if (!schemaRow || (schemaRow.c as int) == 0) {
                    return [installed: false, schemaName: db.schemaName, version: 0]
                }
                try {
                    def versionRow = sql.firstRow(
                        'SELECT MAX(version) AS v FROM ' + db.table('wf_schema_version')
                    )
                    def version = versionRow?.v != null ? versionRow.v as int : 0
                    def commentTableReady = false
                    def archiveColumnsReady = false
                    try {
                        commentTableReady = tableExists(sql, 'wf_comment')
                        archiveColumnsReady = commentTableReady && columnExists(sql, 'wf_comment', 'archived_on')
                    } catch (Exception ignored) {
                        commentTableReady = false
                        archiveColumnsReady = false
                    }
                    def notificationReady = false
                    try {
                        notificationReady = notificationTableReady(sql)
                    } catch (Exception ignored) {
                        notificationReady = false
                    }
                    def taskReady = false
                    try {
                        taskReady = taskTableReady(sql)
                    } catch (Exception ignored) {
                        taskReady = false
                    }
                    def auditReady = false
                    try {
                        auditReady = auditTableReady(sql)
                    } catch (Exception ignored) {
                        auditReady = false
                    }
                    def stepActionsReady = false
                    try {
                        stepActionsReady = stepActionColumnsReady(sql)
                    } catch (Exception ignored) {
                        stepActionsReady = false
                    }
                    def stepActionTypeReady = false
                    try {
                        stepActionTypeReady = stepActionTypeColumnsReady(sql)
                    } catch (Exception ignored) {
                        stepActionTypeReady = false
                    }
                    def allowAddPackageReady = false
                    try {
                        allowAddPackageReady = stepAllowAddPackageColumnReady(sql)
                    } catch (Exception ignored) {
                        allowAddPackageReady = false
                    }
                    def packageDueOnReady = false
                    try {
                        packageDueOnReady = packageDueOnColumnReady(sql)
                    } catch (Exception ignored) {
                        packageDueOnReady = false
                    }
                    def taskStartReady = false
                    try {
                        taskStartReady = taskStartOnColumnReady(sql)
                    } catch (Exception ignored) {
                        taskStartReady = false
                    }
                    def stepRulesReady = false
                    try {
                        stepRulesReady = stepRulesColumnsReady(sql)
                    } catch (Exception ignored) {
                        stepRulesReady = false
                    }
                    return [
                        installed  : version >= LATEST_SCHEMA_VERSION && commentTableReady && archiveColumnsReady && notificationReady && taskReady && auditReady && stepActionsReady && stepActionTypeReady && allowAddPackageReady && packageDueOnReady && taskStartReady && stepRulesReady,
                        schemaName : db.schemaName,
                        version    : version
                    ]
                } catch (Exception tableError) {
                    return [installed: false, schemaName: db.schemaName, version: 0, detail: tableError.message]
                }
            }
        } catch (Exception e) {
            return [installed: false, schemaName: db.schemaName, version: 0, error: e.message]
        }
    }

    private void ensureVersionTable(sql) {
        sql.execute('CREATE TABLE IF NOT EXISTS ' + db.table('wf_schema_version') + ''' (
              version INT NOT NULL PRIMARY KEY,
              description VARCHAR(255),
              applied_on DATETIME NOT NULL
            )''')
    }

    private int currentVersion(sql) {
        def row = sql.firstRow('SELECT MAX(version) AS v FROM ' + db.table('wf_schema_version'))
        return row?.v != null ? row.v as int : 0
    }

    private void recordVersion(sql, int version, String description) {
        sql.executeInsert(
            'INSERT INTO ' + db.table('wf_schema_version') + ' (version, description, applied_on) VALUES (?, ?, ?)',
            [version, description, new Date()]
        )
    }

    private void applyV001(sql) {
        sql.execute('CREATE TABLE IF NOT EXISTS ' + db.table('wf_workflow') + ''' (
              id CHAR(36) NOT NULL PRIMARY KEY,
              site_id VARCHAR(255) NOT NULL,
              name VARCHAR(255) NOT NULL,
              description TEXT,
              background_url VARCHAR(512),
              position INT NOT NULL DEFAULT 0,
              is_default TINYINT(1) NOT NULL DEFAULT 0,
              created_by BIGINT,
              created_on DATETIME NOT NULL,
              modified_by BIGINT,
              modified_on DATETIME NOT NULL,
              INDEX idx_workflow_site (site_id)
            )''')
        sql.execute('CREATE TABLE IF NOT EXISTS ' + db.table('wf_workflow_step') + ''' (
              id CHAR(36) NOT NULL PRIMARY KEY,
              workflow_id CHAR(36) NOT NULL,
              site_id VARCHAR(255) NOT NULL,
              name VARCHAR(255) NOT NULL,
              description TEXT,
              position DECIMAL(20,10) NOT NULL,
              color VARCHAR(64),
              is_terminal TINYINT(1) NOT NULL DEFAULT 0,
              created_on DATETIME NOT NULL,
              modified_on DATETIME NOT NULL,
              INDEX idx_workflow_step_workflow (workflow_id, position)
            )''')
        sql.execute('CREATE TABLE IF NOT EXISTS ' + db.table('wf_workflow_package') + ''' (
              id CHAR(36) NOT NULL PRIMARY KEY,
              workflow_id CHAR(36) NOT NULL,
              workflow_step_id CHAR(36) NOT NULL,
              site_id VARCHAR(255) NOT NULL,
              title VARCHAR(512) NOT NULL,
              description TEXT,
              position DECIMAL(20,10) NOT NULL,
              cover_color VARCHAR(64),
              status VARCHAR(16) NOT NULL DEFAULT 'active',
              created_by BIGINT,
              created_on DATETIME NOT NULL,
              modified_by BIGINT,
              modified_on DATETIME NOT NULL,
              closed_on DATETIME,
              INDEX idx_workflow_package_step (workflow_step_id, position),
              INDEX idx_workflow_package_workflow_status (workflow_id, status)
            )''')
        sql.execute('CREATE TABLE IF NOT EXISTS ' + db.table('wf_workflow_package_content_ref') + ''' (
              id CHAR(36) NOT NULL PRIMARY KEY,
              workflow_package_id CHAR(36) NOT NULL,
              site_id VARCHAR(255) NOT NULL,
              content_path VARCHAR(1024) NOT NULL,
              display_name VARCHAR(512) NOT NULL,
              sort_order INT NOT NULL DEFAULT 0,
              created_by BIGINT,
              created_on DATETIME NOT NULL,
              UNIQUE KEY uk_content_ref (workflow_package_id, content_path(255)),
              INDEX idx_content_ref_package (workflow_package_id, sort_order)
            )''')
        sql.execute('CREATE TABLE IF NOT EXISTS ' + db.table('wf_workflow_package_link') + ''' (
              id CHAR(36) NOT NULL PRIMARY KEY,
              workflow_package_id CHAR(36) NOT NULL,
              site_id VARCHAR(255) NOT NULL,
              name VARCHAR(512) NOT NULL,
              url VARCHAR(2048) NOT NULL,
              sort_order INT NOT NULL DEFAULT 0,
              created_on DATETIME NOT NULL,
              INDEX idx_link_package (workflow_package_id, sort_order)
            )''')
        sql.execute('CREATE TABLE IF NOT EXISTS ' + db.table('wf_comment') + ''' (
              id CHAR(36) NOT NULL PRIMARY KEY,
              site_id VARCHAR(255) NOT NULL,
              target_id VARCHAR(1024) NOT NULL,
              target_type VARCHAR(64) NOT NULL,
              author_id BIGINT NOT NULL,
              author_username VARCHAR(255),
              body TEXT NOT NULL,
              created_on DATETIME NOT NULL,
              resolved_on DATETIME,
              resolved_by BIGINT,
              archived_on DATETIME,
              archived_by BIGINT,
              workflow_id CHAR(36),
              workflow_step_id CHAR(36),
              INDEX idx_comment_target (site_id, target_type, target_id(255), created_on),
              INDEX idx_comment_unresolved (site_id, target_type, target_id(255), resolved_on)
            )''')
        sql.execute('CREATE TABLE IF NOT EXISTS ' + db.table('wf_notification') + ''' (
              id CHAR(36) NOT NULL PRIMARY KEY,
              site_id VARCHAR(255) NOT NULL,
              user_id BIGINT NOT NULL,
              title VARCHAR(512) NOT NULL,
              message TEXT,
              target_type VARCHAR(64),
              target_id VARCHAR(1024),
              read_b TINYINT(1) NOT NULL DEFAULT 0,
              resolved_b TINYINT(1) NOT NULL DEFAULT 0,
              archived_b TINYINT(1) NOT NULL DEFAULT 0,
              created_on DATETIME NOT NULL,
              modified_on DATETIME NOT NULL,
              INDEX idx_notif_user_list (site_id, user_id, archived_b, created_on),
              INDEX idx_notif_user_unread (site_id, user_id, read_b, archived_b)
            )''')
        sql.execute('CREATE TABLE IF NOT EXISTS ' + db.table('wf_user_notification_preference') + ''' (
              site_id VARCHAR(255) NOT NULL,
              user_id BIGINT NOT NULL,
              delivery_mode VARCHAR(32) NOT NULL DEFAULT 'immediate',
              summary_time VARCHAR(16),
              email_enabled TINYINT(1) NOT NULL DEFAULT 1,
              modified_on DATETIME NOT NULL,
              PRIMARY KEY (site_id, user_id)
            )''')
        logger.info('Applied crafter-workflow schema migration V001 to `{}`', db.schemaName)
    }

    private void applyV002(sql) {
        def commentTable = db.table('wf_comment')
        def legacyTable = db.table('wf_workflow_package_comment')
        def commentExists = tableExists(sql, 'wf_comment')
        def legacyExists = tableExists(sql, 'wf_workflow_package_comment')

        if (!commentExists) {
            sql.execute('CREATE TABLE IF NOT EXISTS ' + commentTable + ''' (
                  id CHAR(36) NOT NULL PRIMARY KEY,
                  site_id VARCHAR(255) NOT NULL,
                  target_id VARCHAR(1024) NOT NULL,
                  target_type VARCHAR(64) NOT NULL,
                  author_id BIGINT NOT NULL,
                  author_username VARCHAR(255),
                  body TEXT NOT NULL,
                  created_on DATETIME NOT NULL,
                  resolved_on DATETIME,
                  resolved_by BIGINT,
                  archived_on DATETIME,
                  archived_by BIGINT,
                  workflow_id CHAR(36),
                  workflow_step_id CHAR(36),
                  INDEX idx_comment_target (site_id, target_type, target_id(255), created_on),
                  INDEX idx_comment_unresolved (site_id, target_type, target_id(255), resolved_on)
                )''')
        }

        if (legacyExists) {
            def existingCount = sql.firstRow('SELECT COUNT(*) AS c FROM ' + commentTable)?.c ?: 0
            if ((existingCount as int) == 0) {
                sql.execute(
                    'INSERT INTO ' + commentTable +
                    ' (id, site_id, target_id, target_type, author_id, author_username, body, created_on, ' +
                    'resolved_on, resolved_by, workflow_id, workflow_step_id) ' +
                    'SELECT id, site_id, workflow_package_id, \'workflow_package\', author_id, author_username, body, ' +
                    'created_on, resolved_on, resolved_by, workflow_id, workflow_step_id FROM ' + legacyTable
                )
            }
            sql.execute('DROP TABLE ' + legacyTable)
        }

        logger.info('Applied crafter-workflow schema migration V002 to `{}`', db.schemaName)
    }

    private void applyV003(sql) {
        def commentTable = db.table('wf_comment')
        if (!columnExists(sql, 'wf_comment', 'archived_on')) {
            sql.execute('ALTER TABLE ' + commentTable + ' ADD COLUMN archived_on DATETIME NULL')
        }
        if (!columnExists(sql, 'wf_comment', 'archived_by')) {
            sql.execute('ALTER TABLE ' + commentTable + ' ADD COLUMN archived_by BIGINT NULL')
        }
        logger.info('Applied crafter-workflow schema migration V003 to `{}`', db.schemaName)
    }

    private void applyV004(sql) {
        def table = db.table('wf_notification')
        if (tableExists(sql, 'wf_notification') && !notificationTableReady(sql)) {
            sql.execute('DROP TABLE ' + table)
        }
        if (!tableExists(sql, 'wf_notification')) {
            sql.execute('CREATE TABLE ' + table + ''' (
                  id CHAR(36) NOT NULL PRIMARY KEY,
                  site_id VARCHAR(255) NOT NULL,
                  user_id BIGINT NOT NULL,
                  title VARCHAR(512) NOT NULL,
                  message TEXT,
                  target_type VARCHAR(64),
                  target_id VARCHAR(1024),
                  read_b TINYINT(1) NOT NULL DEFAULT 0,
                  resolved_b TINYINT(1) NOT NULL DEFAULT 0,
                  archived_b TINYINT(1) NOT NULL DEFAULT 0,
                  created_on DATETIME NOT NULL,
                  modified_on DATETIME NOT NULL,
                  INDEX idx_notif_user_list (site_id, user_id, archived_b, created_on),
                  INDEX idx_notif_user_unread (site_id, user_id, read_b, archived_b)
                )''')
        }
        logger.info('Applied crafter-workflow schema migration V004 to `{}`', db.schemaName)
    }

    private void applyV005(sql) {
        def table = db.table('wf_task')
        if (!tableExists(sql, 'wf_task')) {
            sql.execute('CREATE TABLE ' + table + ''' (
                  id CHAR(36) NOT NULL PRIMARY KEY,
                  site_id VARCHAR(255) NOT NULL,
                  title VARCHAR(512) NOT NULL,
                  priority VARCHAR(16) NOT NULL DEFAULT 'medium',
                  assignee_id BIGINT NOT NULL,
                  assignee_username VARCHAR(255),
                  due_on DATETIME NULL,
                  complete_b TINYINT(1) NOT NULL DEFAULT 0,
                  archived_b TINYINT(1) NOT NULL DEFAULT 0,
                  target_type VARCHAR(64),
                  target_id VARCHAR(1024),
                  created_on DATETIME NOT NULL,
                  modified_on DATETIME NOT NULL,
                  completed_on DATETIME NULL,
                  INDEX idx_task_assignee (site_id, assignee_id, archived_b, complete_b, due_on),
                  INDEX idx_task_target (site_id, target_type, target_id(255), archived_b)
                )''')
        }
        logger.info('Applied crafter-workflow schema migration V005 to `{}`', db.schemaName)
    }

    private void applyV006(sql) {
        def table = db.table('wf_audit_log')
        if (!tableExists(sql, 'wf_audit_log')) {
            sql.execute('CREATE TABLE ' + table + ''' (
                  id CHAR(36) NOT NULL PRIMARY KEY,
                  site_id VARCHAR(255) NOT NULL,
                  user_id BIGINT,
                  username VARCHAR(255) NOT NULL,
                  operation VARCHAR(64) NOT NULL,
                  target_type VARCHAR(64) NOT NULL,
                  target_id VARCHAR(1024) NOT NULL,
                  note TEXT,
                  created_on DATETIME NOT NULL,
                  INDEX idx_audit_site_created (site_id, created_on DESC),
                  INDEX idx_audit_target (site_id, target_type, target_id(255), created_on),
                  INDEX idx_audit_user (site_id, username, created_on),
                  INDEX idx_audit_operation (site_id, operation, created_on)
                )''')
        }
        logger.info('Applied crafter-workflow schema migration V006 to `{}`', db.schemaName)
    }

    private void applyV007(sql) {
        def table = db.table('wf_workflow_step')
        if (!columnExists(sql, 'wf_workflow_step', 'action_request_publish_staging')) {
            sql.execute('ALTER TABLE ' + table + ' ADD COLUMN action_request_publish_staging TINYINT(1) NOT NULL DEFAULT 0')
        }
        if (!columnExists(sql, 'wf_workflow_step', 'action_request_publish_live')) {
            sql.execute('ALTER TABLE ' + table + ' ADD COLUMN action_request_publish_live TINYINT(1) NOT NULL DEFAULT 0')
        }
        if (!columnExists(sql, 'wf_workflow_step', 'action_publish_staging')) {
            sql.execute('ALTER TABLE ' + table + ' ADD COLUMN action_publish_staging TINYINT(1) NOT NULL DEFAULT 0')
        }
        if (!columnExists(sql, 'wf_workflow_step', 'action_publish_live')) {
            sql.execute('ALTER TABLE ' + table + ' ADD COLUMN action_publish_live TINYINT(1) NOT NULL DEFAULT 0')
        }
        logger.info('Applied crafter-workflow schema migration V007 to `{}`', db.schemaName)
    }

    private boolean stepActionColumnsReady(sql) {
        return columnExists(sql, 'wf_workflow_step', 'action_request_publish_staging') &&
            columnExists(sql, 'wf_workflow_step', 'action_request_publish_live') &&
            columnExists(sql, 'wf_workflow_step', 'action_publish_staging') &&
            columnExists(sql, 'wf_workflow_step', 'action_publish_live')
    }

    private void applyV008(sql) {
        def table = db.table('wf_workflow_step')
        if (!columnExists(sql, 'wf_workflow_step', 'step_action_type')) {
            sql.execute('ALTER TABLE ' + table + ' ADD COLUMN step_action_type VARCHAR(64) NULL')
        }
        if (!columnExists(sql, 'wf_workflow_step', 'step_action_success_step_id')) {
            sql.execute('ALTER TABLE ' + table + ' ADD COLUMN step_action_success_step_id CHAR(36) NULL')
        }
        sql.execute(
            'UPDATE ' + table + ' SET step_action_type = ? WHERE action_request_publish_staging = 1 AND (step_action_type IS NULL OR step_action_type = \'\')',
            ['request_publish_staging']
        )
        sql.execute(
            'UPDATE ' + table + ' SET step_action_type = ? WHERE action_request_publish_live = 1 AND (step_action_type IS NULL OR step_action_type = \'\')',
            ['request_publish_live']
        )
        sql.execute(
            'UPDATE ' + table + ' SET step_action_type = ? WHERE action_publish_staging = 1 AND (step_action_type IS NULL OR step_action_type = \'\')',
            ['publish_staging']
        )
        sql.execute(
            'UPDATE ' + table + ' SET step_action_type = ? WHERE action_publish_live = 1 AND (step_action_type IS NULL OR step_action_type = \'\')',
            ['publish_live']
        )
        logger.info('Applied crafter-workflow schema migration V008 to `{}`', db.schemaName)
    }

    private boolean stepActionTypeColumnsReady(sql) {
        return columnExists(sql, 'wf_workflow_step', 'step_action_type') &&
            columnExists(sql, 'wf_workflow_step', 'step_action_success_step_id')
    }

    private void applyV009(sql) {
        def table = db.table('wf_workflow_step')
        def addedColumn = false
        if (!columnExists(sql, 'wf_workflow_step', 'allow_add_package')) {
            sql.execute('ALTER TABLE ' + table + ' ADD COLUMN allow_add_package TINYINT(1) NOT NULL DEFAULT 0')
            addedColumn = true
        }
        if (addedColumn) {
            sql.execute(
                'UPDATE ' + table + ' s ' +
                'INNER JOIN (' +
                '  SELECT workflow_id, site_id, MIN(position) AS min_pos ' +
                '  FROM ' + table + ' ' +
                '  GROUP BY workflow_id, site_id' +
                ') first_step ON s.workflow_id = first_step.workflow_id ' +
                '  AND s.site_id = first_step.site_id ' +
                '  AND s.position = first_step.min_pos ' +
                'SET s.allow_add_package = 1'
            )
        }
        logger.info('Applied crafter-workflow schema migration V009 to `{}`', db.schemaName)
    }

    private boolean stepAllowAddPackageColumnReady(sql) {
        return columnExists(sql, 'wf_workflow_step', 'allow_add_package')
    }

    private void applyV010(sql) {
        def table = db.table('wf_workflow_package')
        if (!columnExists(sql, 'wf_workflow_package', 'due_on')) {
            sql.execute('ALTER TABLE ' + table + ' ADD COLUMN due_on DATETIME NULL')
        }
        def indexName = 'idx_workflow_package_due'
        def indexRow = sql.firstRow(
            'SELECT COUNT(*) AS c FROM information_schema.statistics ' +
            'WHERE LOWER(table_schema) = LOWER(?) AND LOWER(table_name) = LOWER(?) AND LOWER(index_name) = LOWER(?)',
            [db.schemaName, 'wf_workflow_package', indexName]
        )
        if (!indexRow || (indexRow.c as int) == 0) {
            sql.execute('CREATE INDEX ' + indexName + ' ON ' + table + ' (site_id, status, due_on)')
        }
        logger.info('Applied crafter-workflow schema migration V010 to `{}`', db.schemaName)
    }

    private boolean packageDueOnColumnReady(sql) {
        return columnExists(sql, 'wf_workflow_package', 'due_on')
    }

    private void applyV011(sql) {
        def table = db.table('wf_task')
        if (!columnExists(sql, 'wf_task', 'start_on')) {
            sql.execute('ALTER TABLE ' + table + ' ADD COLUMN start_on DATETIME NULL')
        }
        logger.info('Applied crafter-workflow schema migration V011 to `{}`', db.schemaName)
    }

    private boolean taskStartOnColumnReady(sql) {
        return columnExists(sql, 'wf_task', 'start_on')
    }

    private void applyV012(sql) {
        def stepTable = db.table('wf_workflow_step')
        if (!columnExists(sql, 'wf_workflow_step', 'role_rule_mode')) {
            sql.execute('ALTER TABLE ' + stepTable + ' ADD COLUMN role_rule_mode VARCHAR(16) NOT NULL DEFAULT \'all\'')
        }
        if (!columnExists(sql, 'wf_workflow_step', 'role_rule_roles')) {
            sql.execute('ALTER TABLE ' + stepTable + ' ADD COLUMN role_rule_roles TEXT NULL')
        }
        if (!columnExists(sql, 'wf_workflow_step', 'content_rule_mode')) {
            sql.execute('ALTER TABLE ' + stepTable + ' ADD COLUMN content_rule_mode VARCHAR(16) NOT NULL DEFAULT \'all\'')
        }
        if (!columnExists(sql, 'wf_workflow_step', 'content_rule_paths')) {
            sql.execute('ALTER TABLE ' + stepTable + ' ADD COLUMN content_rule_paths TEXT NULL')
        }
        if (!columnExists(sql, 'wf_workflow_step', 'content_rule_types')) {
            sql.execute('ALTER TABLE ' + stepTable + ' ADD COLUMN content_rule_types TEXT NULL')
        }
        def refTable = db.table('wf_workflow_package_content_ref')
        if (!columnExists(sql, 'wf_workflow_package_content_ref', 'content_type')) {
            sql.execute('ALTER TABLE ' + refTable + ' ADD COLUMN content_type VARCHAR(255) NULL')
        }
        logger.info('Applied crafter-workflow schema migration V012 to `{}`', db.schemaName)
    }

    private void applyV013(sql) {
        def table = db.table('wf_recycle_bin_item')
        if (!tableExists(sql, 'wf_recycle_bin_item')) {
            sql.execute('CREATE TABLE ' + table + ''' (
                  id CHAR(36) NOT NULL PRIMARY KEY,
                  site_id VARCHAR(255) NOT NULL,
                  bin_path VARCHAR(1024) NOT NULL,
                  internal_name VARCHAR(512) NULL,
                  original_path VARCHAR(1024) NOT NULL,
                  original_last_modifier VARCHAR(255) NULL,
                  original_modified_on DATETIME NULL,
                  original_created_on DATETIME NULL,
                  state VARCHAR(32) NOT NULL DEFAULT 'binned',
                  binned_on DATETIME NOT NULL,
                  binned_by_user_id BIGINT NOT NULL,
                  binned_by_username VARCHAR(255) NOT NULL,
                  restored_on DATETIME NULL,
                  restored_by_user_id BIGINT NULL,
                  restored_by_username VARCHAR(255) NULL,
                  KEY idx_recycle_bin_site_state (site_id, state),
                  KEY idx_recycle_bin_original (site_id, original_path(255))
                )''')
        }
        logger.info('Applied crafter-workflow schema migration V013 to `{}`', db.schemaName)
    }

    private boolean recycleBinTableReady(sql) {
        return tableExists(sql, 'wf_recycle_bin_item') &&
            columnExists(sql, 'wf_recycle_bin_item', 'bin_path')
    }

    private boolean recycleBinMetadataColumnsReady(sql) {
        return columnExists(sql, 'wf_recycle_bin_item', 'original_created_by') &&
            columnExists(sql, 'wf_recycle_bin_item', 'original_sandbox_state') &&
            columnExists(sql, 'wf_recycle_bin_item', 'purged_on')
    }

    private void applyV014(sql) {
        def table = db.table('wf_recycle_bin_item')
        if (!columnExists(sql, 'wf_recycle_bin_item', 'original_created_by')) {
            sql.execute('ALTER TABLE ' + table + ' ADD COLUMN original_created_by VARCHAR(255) NULL')
        }
        if (!columnExists(sql, 'wf_recycle_bin_item', 'original_sandbox_state')) {
            sql.execute('ALTER TABLE ' + table + ' ADD COLUMN original_sandbox_state VARCHAR(64) NULL')
        }
        if (!columnExists(sql, 'wf_recycle_bin_item', 'purged_on')) {
            sql.execute('ALTER TABLE ' + table + ' ADD COLUMN purged_on DATETIME NULL')
        }
        if (!columnExists(sql, 'wf_recycle_bin_item', 'purged_by_user_id')) {
            sql.execute('ALTER TABLE ' + table + ' ADD COLUMN purged_by_user_id BIGINT NULL')
        }
        if (!columnExists(sql, 'wf_recycle_bin_item', 'purged_by_username')) {
            sql.execute('ALTER TABLE ' + table + ' ADD COLUMN purged_by_username VARCHAR(255) NULL')
        }
        logger.info('Applied crafter-workflow schema migration V014 to `{}`', db.schemaName)
    }

    private boolean stepRulesColumnsReady(sql) {
        return columnExists(sql, 'wf_workflow_step', 'role_rule_mode') &&
            columnExists(sql, 'wf_workflow_step', 'content_rule_mode') &&
            columnExists(sql, 'wf_workflow_package_content_ref', 'content_type')
    }

    private boolean notificationTableReady(sql) {
        return tableExists(sql, 'wf_notification') &&
            columnExists(sql, 'wf_notification', 'target_type') &&
            columnExists(sql, 'wf_notification', 'read_b')
    }

    private boolean taskTableReady(sql) {
        return tableExists(sql, 'wf_task') &&
            columnExists(sql, 'wf_task', 'priority') &&
            columnExists(sql, 'wf_task', 'complete_b')
    }

    private boolean auditTableReady(sql) {
        return tableExists(sql, 'wf_audit_log') &&
            columnExists(sql, 'wf_audit_log', 'operation') &&
            columnExists(sql, 'wf_audit_log', 'target_type')
    }

    private boolean columnExists(sql, String tableName, String columnName) {
        def row = sql.firstRow(
            'SELECT COUNT(*) AS c FROM information_schema.columns ' +
            'WHERE LOWER(table_schema) = LOWER(?) AND LOWER(table_name) = LOWER(?) AND LOWER(column_name) = LOWER(?)',
            [db.schemaName, tableName, columnName]
        )
        return row && (row.c as int) > 0
    }

    private boolean tableExists(sql, String tableName) {
        def row = sql.firstRow(
            'SELECT COUNT(*) AS c FROM information_schema.tables ' +
            'WHERE LOWER(table_schema) = LOWER(?) AND LOWER(table_name) = LOWER(?)',
            [db.schemaName, tableName]
        )
        return row && (row.c as int) > 0
    }
}
