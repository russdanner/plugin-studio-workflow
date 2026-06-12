package plugins.org.rd.plugin.crafterwf.util

import org.slf4j.Logger
import org.slf4j.LoggerFactory

class RecycleBinPermissionSupport {

    static final String RECYCLE_BIN_ROOT = '/recyclebin'

    /** Crafter Studio permission names (see StudioPermissionsConstants). */
    private static final List<String> WRITE_PERMISSION_NAMES = [
        'content_write',
        'write'
    ]

    private static final List<String> DELETE_PERMISSION_NAMES = [
        'content_delete',
        'delete',
        'content_write'
    ]

    private static final Logger logger = LoggerFactory.getLogger(RecycleBinPermissionSupport)

    private final def applicationContext

    RecycleBinPermissionSupport(def applicationContext) {
        this.applicationContext = applicationContext
    }

    boolean canAccessRecycleBin(String siteId, String username) {
        return hasContentWritePermission(siteId, username, RECYCLE_BIN_ROOT)
    }

    boolean canBinContent(String siteId, String username, String contentPath) {
        if (!canAccessRecycleBin(siteId, username)) {
            return false
        }
        return hasContentDeletePermission(siteId, username, normalizePath(contentPath))
    }

    boolean canRestore(String siteId, String username) {
        return canAccessRecycleBin(siteId, username)
    }

    boolean hasContentWritePermission(String siteId, String username, String path) {
        return hasAnyPermission(siteId, username, normalizePath(path), WRITE_PERMISSION_NAMES)
    }

    boolean hasContentDeletePermission(String siteId, String username, String path) {
        return hasAnyPermission(siteId, username, normalizePath(path), DELETE_PERMISSION_NAMES)
    }

    private boolean hasAnyPermission(String siteId, String username, String path, List<String> permissionNames) {
        if (!siteId?.trim() || !username?.trim() || !path?.trim()) {
            return false
        }
        if (isSiteOrSystemAdmin(username, siteId)) {
            return true
        }
        def fromHasPermission = resolveFromHasPermission(siteId, username, path, permissionNames)
        if (fromHasPermission != null) {
            return fromHasPermission
        }
        def fromSecurity = resolveFromSecurityServicePermissions(siteId, username, path, permissionNames)
        if (fromSecurity != null) {
            return fromSecurity
        }
        def fromLegacy = resolveFromLegacyPermissions(siteId, username, path, permissionNames)
        if (fromLegacy != null) {
            return fromLegacy
        }
        logger.debug('Could not resolve {} for {} on {}; denying access', permissionNames, username, path)
        return false
    }

    void requireRecycleBinAccess(String siteId, String username) {
        if (!canAccessRecycleBin(siteId, username)) {
            throw new SecurityException('content_write permission on /recyclebin is required')
        }
    }

    void requireBinContent(String siteId, String username, String contentPath) {
        if (!canBinContent(siteId, username, contentPath)) {
            throw new SecurityException("Insufficient permission to recycle ${contentPath}")
        }
    }

    private boolean isSiteOrSystemAdmin(String username, String siteId) {
        def securityService = WorkflowBeanLookup.resolve(applicationContext, 'securityService')
        if (!securityService) {
            return false
        }
        try {
            if (securityService.metaClass.respondsTo(securityService, 'isSystemAdmin', String)) {
                if (securityService.isSystemAdmin(username)) {
                    return true
                }
            }
            if (securityService.metaClass.respondsTo(securityService, 'isSiteAdmin', String, String)) {
                return securityService.isSiteAdmin(username, siteId) as boolean
            }
        } catch (Exception e) {
            logger.debug('Admin check failed for {}: {}', username, e.message)
        }
        return false
    }

    private Boolean resolveFromSecurityServicePermissions(String siteId, String username, String path,
                                                          List<String> permissionNames) {
        for (def beanName in ['cstudioSecurityService', 'securityService']) {
            def service = WorkflowBeanLookup.resolve(applicationContext, beanName)
            if (!service) {
                continue
            }
            try {
                if (service.metaClass.respondsTo(service, 'getUserPermissions', String, String, String)) {
                    def perms = service.getUserPermissions(siteId, path, username)
                    def allowed = permissionGrantAllows(perms, permissionNames)
                    logger.debug('{} getUserPermissions({}, {}) for {} => {}', beanName, path, username, perms, allowed)
                    return allowed
                }
            } catch (Exception e) {
                logger.debug('{}.getUserPermissions failed: {}', beanName, e.message)
            }
        }
        return null
    }

    private Boolean resolveFromHasPermission(String siteId, String username, String path,
                                             List<String> permissionNames) {
        for (def beanName in ['cstudioSecurityService', 'securityService', 'permissionService', 'cstudioPermissionsService']) {
            def service = WorkflowBeanLookup.resolve(applicationContext, beanName)
            if (!service) {
                continue
            }
            for (def permName in permissionNames) {
                try {
                    if (service.metaClass.respondsTo(service, 'hasPermission', String, String, String, String)) {
                        if (service.hasPermission(siteId, path, username, permName) as boolean) {
                            return true
                        }
                    }
                } catch (Exception e) {
                    logger.debug('{} hasPermission({}) failed: {}', beanName, permName, e.message)
                }
            }
        }
        return null
    }

    private Boolean resolveFromLegacyPermissions(String siteId, String username, String path,
                                                 List<String> permissionNames) {
        def service = WorkflowBeanLookup.resolve(applicationContext, 'cstudioPermissionsService')
        if (!service) {
            return null
        }
        try {
            def groupSupport = new SiteGroupSupport(applicationContext)
            def groups = groupSupport.getUserGroupNames(username, siteId)
            if (service.metaClass.respondsTo(service, 'getPermissions', String, List, List, String)) {
                def perms = service.getPermissions(siteId, [path], groups ?: [], username)
                def allowed = permissionGrantAllows(perms, permissionNames)
                return allowed
            }
        } catch (Exception e) {
            logger.debug('cstudioPermissionsService.getPermissions failed: {}', e.message)
        }
        return null
    }

    private static boolean permissionGrantAllows(def permissions, List<String> permissionNames) {
        return permissionGrantAllows(permissions, permissionNames, 0)
    }

    private static boolean permissionGrantAllows(def permissions, List<String> permissionNames, int depth) {
        if (!permissions || depth > 8) {
            return false
        }
        def wanted = permissionNames.collect { it?.toLowerCase() } as Set
        if (permissions instanceof Map) {
            return permissions.values()?.any { value ->
                permissionGrantAllows(value, permissionNames, depth + 1)
            } ?: false
        }
        if (permissions instanceof Collection) {
            return permissions.any { entry ->
                permissionNameMatches(entry, wanted) ||
                    permissionGrantAllows(entry, permissionNames, depth + 1)
            }
        }
        return permissionNameMatches(permissions, wanted)
    }

    private static boolean permissionNameMatches(def entry, Set<String> wanted) {
        def name = entry?.toString()?.trim()?.toLowerCase()
        if (!name) {
            return false
        }
        return wanted.contains(name) || name.endsWith('_write') || name.endsWith('_delete')
    }

    static String normalizePath(String path) {
        def trimmed = path?.trim()
        if (!trimmed) {
            return ''
        }
        return trimmed.startsWith('/') ? trimmed : "/${trimmed}"
    }
}
