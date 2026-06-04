package plugins.org.rd.plugin.crafterwf.util

import org.slf4j.Logger
import org.slf4j.LoggerFactory

class SiteGroupSupport {

    private static final Logger logger = LoggerFactory.getLogger(SiteGroupSupport)

    private final def applicationContext
    private final def dataSource

    SiteGroupSupport(def applicationContext, def dataSource = null) {
        this.applicationContext = applicationContext
        this.dataSource = dataSource
    }

    List<String> getUserGroupNames(String username, String siteId = null) {
        if (!username?.trim()) {
            return []
        }
        def fromUserService = resolveFromUserService(username)
        if (fromUserService != null) {
            return fromUserService
        }
        def fromService = resolveFromGroupService(username, siteId)
        if (fromService != null) {
            return fromService
        }
        return resolveFromSql(username, siteId)
    }

    private List<String> resolveFromUserService(String username) {
        try {
            def userService = applicationContext?.get('userService')
            if (!userService) {
                return null
            }
            def groups = userService.getUserGroups(-1L, username)
            return normalizeGroupList(groups)
        } catch (Exception e) {
            logger.debug('Could not resolve groups from userService: {}', e.message)
            return null
        }
    }

    private List<String> resolveFromGroupService(String username, String siteId) {
        def serviceNames = ['groupService', 'cstudioGroupService']
        for (def beanName in serviceNames) {
            try {
                def service = applicationContext?.get(beanName)
                if (!service) {
                    continue
                }
                def groups = null
                if (siteId) {
                    try {
                        groups = service.getGroupsByUser(siteId, username)
                    } catch (Exception ignored) {
                    }
                }
                if (groups == null) {
                    try {
                        groups = service.getGroupsByUser(username)
                    } catch (Exception ignored) {
                    }
                }
                if (groups == null) {
                    try {
                        groups = service.getGroupsForUser(username)
                    } catch (Exception ignored) {
                    }
                }
                if (groups != null) {
                    return normalizeGroupList(groups)
                }
            } catch (Exception e) {
                logger.debug('Could not resolve groups from {}: {}', beanName, e.message)
            }
        }
        return null
    }

    private List<String> resolveFromSql(String username, String siteId) {
        if (!dataSource) {
            return []
        }
        def sql = null
        try {
            sql = new groovy.sql.Sql(dataSource)
            if (!sqlTableExists(sql, 'group_user')) {
                return []
            }
            def query =
                'SELECT g.group_name AS group_name FROM `group` g ' +
                'INNER JOIN group_user gu ON g.id = gu.group_id ' +
                'INNER JOIN `user` u ON u.id = gu.user_id ' +
                'WHERE u.username = ?'
            def rows = sql.rows(query, [username])
            if (!rows) {
                return []
            }
            return rows.collect { row ->
                (row.group_name ?: row.name ?: row.groupName)?.toString()?.trim()
            }.findAll { it }.unique()
        } catch (Exception e) {
            logger.debug('Could not resolve groups from SQL: {}', e.message)
            return []
        } finally {
            try {
                sql?.close()
            } catch (Exception ignored) {
            }
        }
    }

    private static boolean sqlTableExists(groovy.sql.Sql sql, String tableName) {
        try {
            def row = sql.firstRow(
                'SELECT 1 AS ok FROM information_schema.tables ' +
                'WHERE table_schema = DATABASE() AND table_name = ? LIMIT 1',
                [tableName]
            )
            return row != null
        } catch (Exception ignored) {
            return false
        }
    }

    private static List<String> normalizeGroupList(def groups) {
        if (!groups) {
            return []
        }
        if (groups instanceof Collection) {
            return groups.collect { entry ->
                if (entry instanceof Map) {
                    return (entry.name ?: entry.groupName ?: entry.group_name ?: entry.id)?.toString()?.trim()
                }
                if (entry?.metaClass?.respondsTo(entry, 'getName')) {
                    return entry.name?.toString()?.trim()
                }
                return entry?.toString()?.trim()
            }.findAll { it }.unique()
        }
        return []
    }
}
