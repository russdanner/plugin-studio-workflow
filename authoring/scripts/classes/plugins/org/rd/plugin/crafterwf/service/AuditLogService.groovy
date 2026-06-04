package plugins.org.rd.plugin.crafterwf.service

import plugins.org.rd.plugin.crafterwf.dao.AuditLogDao
import plugins.org.rd.plugin.crafterwf.model.AuditTargetType

class AuditLogService {

    private final AuditLogDao auditLogDao

    AuditLogService(AuditLogDao auditLogDao) {
        this.auditLogDao = auditLogDao
    }

    Map record(String siteId, Long userId, String username, String operation,
               String targetType, String targetId, String note) {
        def safeUsername = username?.trim() ?: 'unknown'
        def safeOperation = operation?.trim()
        if (!safeOperation) {
            throw new IllegalArgumentException('operation is required')
        }
        def safeTargetType = AuditTargetType.normalize(targetType)
        def safeTargetId = targetId?.trim()
        if (!safeTargetId) {
            throw new IllegalArgumentException('targetId is required')
        }
        def entry = auditLogDao.insert(
            siteId,
            userId,
            safeUsername,
            safeOperation,
            safeTargetType,
            safeTargetId,
            note?.trim()
        )
        return toDto(entry)
    }

    Map search(String siteId, Map filters) {
        def result = auditLogDao.search(siteId, filters ?: [:])
        return [
            entries          : result.entries.collect { toDto(it) },
            total            : result.total,
            page             : result.page,
            pageSize         : result.pageSize,
            totalPages       : result.totalPages,
            hasNextPage      : result.hasNextPage,
            hasPreviousPage  : result.hasPreviousPage
        ]
    }

    private static Map toDto(Map row) {
        return [
            id         : row.id,
            siteId     : row.siteId,
            userId     : row.userId,
            username   : row.username,
            operation  : row.operation,
            targetType : row.targetType,
            targetId   : row.targetId,
            note       : row.note,
            createdOn  : row.createdOn
        ]
    }

    static Date parseDateFilter(value) {
        if (value == null || (value instanceof String && !value.trim())) {
            return null
        }
        if (value instanceof Date) {
            return value
        }
        def text = value.toString().trim()
        try {
            return javax.xml.bind.DatatypeConverter.parseDateTime(text.endsWith('Z') ? text : text + 'Z').time
        } catch (Exception ignored) {
        }
        try {
            return Date.parse('yyyy-MM-dd', text)
        } catch (Exception ignored) {
        }
        try {
            return Date.parse('yyyy-MM-dd\'T\'HH:mm:ss', text)
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid date filter: ${text}")
        }
    }
}
