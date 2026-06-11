package plugins.org.rd.plugin.crafterwf.db

import groovy.sql.Sql
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import plugins.org.rd.plugin.crafterwf.util.WorkflowBeanLookup

/**
 * JDBC access via Studio's connection pool. All plugin SQL uses fully qualified table names.
 *
 * Resolves {@code dataSource} via {@link WorkflowBeanLookup} ({@code get} or {@code getBean}).
 */
class WorkflowDb {

    private static final Logger logger = LoggerFactory.getLogger(WorkflowDb)
    private static final String SCHEMA_NAME = 'crafter-workflow'
    private static final List<String> DATA_SOURCE_BEANS = ['dataSource', 'studioDataSource', 'cstudioDataSource']

    final String schemaName
    /** JDBC pool — field name avoids Groovy getter recursion on {@code getDataSource()}. */
    final Object jdbcDataSource
    private final SchemaMigrator migrator

    WorkflowDb(def applicationContext) {
        this.schemaName = SCHEMA_NAME
        this.jdbcDataSource = resolveDataSource(applicationContext)
        this.migrator = new SchemaMigrator(this)
    }

    /**
     * Fully qualified table name as a plain String (not a GString).
     * Never embed via {@code "${db.table(...)}"} in SQL passed to groovy.sql.Sql — interpolated
     * GStrings become JDBC {@code ?} placeholders, which is invalid for identifiers.
     */
    String table(String tableName) {
        return '`' + schemaName + '`.' + tableName
    }

    String qualifiedSchema() {
        return '`' + schemaName + '`'
    }

    void migrate() {
        migrator.migrateIfNeeded()
    }

    Map getSchemaStatus() {
        return migrator.getStatus()
    }

    void installSchema() {
        migrator.migrateIfNeeded()
    }

    def <T> T withSql(Closure<T> work) {
        def sql = new Sql(jdbcDataSource)
        try {
            return work(sql)
        } finally {
            sql.close()
        }
    }

    def <T> T inTransaction(Closure<T> work) {
        def conn = null
        Sql sql = null
        try {
            conn = jdbcDataSource.getConnection()
            conn.autoCommit = false
            sql = new Sql(conn)
            def result = work(sql)
            conn.commit()
            return result
        } catch (Exception e) {
            if (conn != null) {
                try {
                    conn.rollback()
                } catch (Exception ignored) {
                }
            }
            throw e
        } finally {
            if (sql != null) {
                try {
                    sql.close()
                } catch (Exception ignored) {
                }
            } else if (conn != null) {
                try {
                    conn.close()
                } catch (Exception ignored) {
                }
            }
        }
    }

    static String uuid() {
        return UUID.randomUUID().toString()
    }

    static Date now() {
        return new Date()
    }

    private static Object resolveDataSource(def applicationContext) {
        if (applicationContext == null) {
            throw new IllegalStateException('applicationContext is required for database access')
        }

        for (String beanName : DATA_SOURCE_BEANS) {
            def bean = WorkflowBeanLookup.resolve(applicationContext, beanName)
            if (bean != null && isJdbcDataSource(bean)) {
                logger.debug('Using JDBC pool bean: {}', beanName)
                return bean
            }
        }

        throw new IllegalStateException(
            "Studio DataSource bean not found (tried ${DATA_SOURCE_BEANS.join(', ')}). " +
            'If studio.scripting.restrictBeans is enabled, add dataSource to studio.scripting.allowedBeans.'
        )
    }

    private static boolean isJdbcDataSource(def bean) {
        def conn = null
        try {
            conn = bean.getConnection()
            return conn != null
        } catch (Exception ignored) {
            return false
        } finally {
            if (conn != null) {
                try {
                    conn.close()
                } catch (Exception ignored) {
                }
            }
        }
    }
}
