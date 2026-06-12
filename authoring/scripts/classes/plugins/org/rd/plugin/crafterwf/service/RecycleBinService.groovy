package plugins.org.rd.plugin.crafterwf.service

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import plugins.org.rd.plugin.crafterwf.dao.RecycleBinDao
import plugins.org.rd.plugin.crafterwf.dao.WorkflowPackageAttachmentDao
import plugins.org.rd.plugin.crafterwf.model.AuditOperation
import plugins.org.rd.plugin.crafterwf.model.AuditTargetType
import plugins.org.rd.plugin.crafterwf.model.RecycleBinState
import plugins.org.rd.plugin.crafterwf.util.RecycleBinPermissionSupport
import plugins.org.rd.plugin.crafterwf.util.WorkflowBeanLookup

class RecycleBinService {

    private static final Logger logger = LoggerFactory.getLogger(RecycleBinService)

    private final RecycleBinDao recycleBinDao
    private final WorkflowPackageAttachmentDao attachmentDao
    private final AuditLogService auditLogService
    private final RecycleBinPermissionSupport permissionSupport
    private final def applicationContext

    RecycleBinService(RecycleBinDao recycleBinDao, WorkflowPackageAttachmentDao attachmentDao,
                      AuditLogService auditLogService, def applicationContext) {
        this.recycleBinDao = recycleBinDao
        this.attachmentDao = attachmentDao
        this.auditLogService = auditLogService
        this.applicationContext = applicationContext
        this.permissionSupport = new RecycleBinPermissionSupport(applicationContext)
    }

    Map canAccess(String siteId, String username) {
        return [allowed: permissionSupport.canAccessRecycleBin(siteId, username)]
    }

    Map listItems(String siteId, String username, String state = RecycleBinState.BINNED,
                  Integer page = 1, Integer pageSize = 10, String sortBy = 'binnedOn',
                  String sortOrder = 'desc', String q = null) {
        permissionSupport.requireRecycleBinAccess(siteId, username)
        def result = recycleBinDao.listPaged(
            siteId,
            state,
            page ?: 1,
            pageSize ?: 10,
            sortBy ?: 'binnedOn',
            sortOrder ?: 'desc',
            q
        )
        return [
            items      : result.items.collect { toDto(it) },
            total      : result.total,
            page       : result.page,
            pageSize   : result.pageSize,
            totalPages : result.totalPages
        ]
    }

    Map binPaths(String siteId, List<String> paths, Long userId, String username) {
        permissionSupport.requireRecycleBinAccess(siteId, username)
        def normalized = normalizePaths(paths)
        if (!normalized) {
            throw new IllegalArgumentException('At least one content path is required')
        }
        ensureRecycleBinRoot(siteId)
        def results = []
        def errors = []
        normalized.each { originalPath ->
            try {
                results << binSinglePath(siteId, originalPath, userId, username)
            } catch (Exception e) {
                logger.warn('[crafterwf] Failed to recycle {}: {}', originalPath, e.message)
                errors << [path: originalPath, message: e.message ?: 'Unable to recycle item']
            }
        }
        if (!results && errors) {
            throw new IllegalStateException(errors[0].message)
        }
        return [items: results, errors: errors]
    }

    Map checkRestore(String siteId, String id, String username) {
        permissionSupport.requireRecycleBinAccess(siteId, username)
        def row = requireBinnedItem(siteId, id)
        def collision = contentExists(siteId, row.originalPath)
        return [
            collision    : collision,
            originalPath : row.originalPath,
            existingPath : collision ? row.originalPath : null
        ]
    }

    Map restoreItem(String siteId, String id, Long userId, String username, boolean confirmCollision = false) {
        permissionSupport.requireRecycleBinAccess(siteId, username)
        def row = requireBinnedItem(siteId, id)
        if (contentExists(siteId, row.originalPath) && !confirmCollision) {
            throw new IllegalStateException(
                "Path already exists: ${row.originalPath}. Confirm collision to restore."
            )
        }
        if (!contentExists(siteId, row.binPath)) {
            throw new IllegalStateException("Binned content no longer exists at ${row.binPath}")
        }
        moveContent(siteId, row.binPath, row.originalPath)
        recycleBinDao.markRestored(siteId, id, userId, username)
        auditLogService.record(
            siteId, userId, username, AuditOperation.RECYCLE_BIN_ITEM_RESTORED,
            AuditTargetType.CONTENT, row.originalPath, "Restored from ${row.binPath}"
        )
        def updated = recycleBinDao.findById(siteId, id)
        return [item: toDto(updated)]
    }

    Map purgeItem(String siteId, String id, Long userId, String username) {
        permissionSupport.requireRecycleBinAccess(siteId, username)
        def row = requireBinnedItem(siteId, id)
        permissionSupport.requireBinContent(siteId, username, row.binPath)
        if (contentExists(siteId, row.binPath)) {
            deleteContent(siteId, row.binPath)
        }
        recycleBinDao.markPurged(siteId, id, userId, username)
        auditLogService.record(
            siteId, userId, username, AuditOperation.RECYCLE_BIN_ITEM_PURGED,
            AuditTargetType.CONTENT, row.originalPath, "Permanently deleted from ${row.binPath}"
        )
        def updated = recycleBinDao.findById(siteId, id)
        return [item: toDto(updated)]
    }

    private Map binSinglePath(String siteId, String originalPath, Long userId, String username) {
        if (originalPath.startsWith(RecycleBinPermissionSupport.RECYCLE_BIN_ROOT + '/')) {
            throw new IllegalArgumentException('Item is already in the recycle bin')
        }
        if (recycleBinDao.findActiveByOriginalPath(siteId, originalPath)) {
            throw new IllegalStateException("Item is already in the recycle bin: ${originalPath}")
        }
        permissionSupport.requireBinContent(siteId, username, originalPath)
        if (!contentExists(siteId, originalPath)) {
            throw new IllegalArgumentException("Content not found: ${originalPath}")
        }
        def metadata = readContentMetadata(siteId, originalPath)
        def binId = UUID.randomUUID().toString()
        def binPath = "${RecycleBinPermissionSupport.RECYCLE_BIN_ROOT}/${binId}${originalPath}".toString()
        ensureBinUuidFolder(siteId, binId)
        moveContent(siteId, originalPath, binPath)
        def row = recycleBinDao.insert([
            id                    : binId,
            siteId                : siteId,
            binPath               : binPath,
            internalName          : metadata.internalName,
            originalPath          : originalPath,
            originalLastModifier  : metadata.lastModifier,
            originalModifiedOn    : metadata.modifiedOn,
            originalCreatedOn     : metadata.createdOn,
            originalCreatedBy     : metadata.createdBy,
            originalSandboxState  : metadata.sandboxState,
            state                 : RecycleBinState.BINNED,
            binnedOn              : new Date(),
            binnedByUserId        : userId,
            binnedByUsername      : username
        ])
        attachmentDao.deleteContentRefsByPath(siteId, originalPath)
        auditLogService.record(
            siteId, userId, username, AuditOperation.RECYCLE_BIN_ITEM_BINNED,
            AuditTargetType.CONTENT, originalPath, "Moved to ${binPath}"
        )
        return toDto(row)
    }

    private Map requireBinnedItem(String siteId, String id) {
        def row = recycleBinDao.findById(siteId, id?.trim())
        if (!row) {
            throw new IllegalArgumentException('Recycle bin item not found')
        }
        if (row.state != RecycleBinState.BINNED) {
            throw new IllegalStateException("Item is not in binned state (state=${row.state})")
        }
        return row
    }

    private static List<String> normalizePaths(List<String> paths) {
        if (!paths) {
            return []
        }
        def seen = [] as LinkedHashSet
        paths.each { raw ->
            def path = RecycleBinPermissionSupport.normalizePath(raw?.toString())
            if (path && !path.startsWith(RecycleBinPermissionSupport.RECYCLE_BIN_ROOT)) {
                seen << path
            }
        }
        return seen.toList()
    }

    private void ensureRecycleBinRoot(String siteId) {
        def legacy = requireLegacyContentService()
        def root = RecycleBinPermissionSupport.RECYCLE_BIN_ROOT
        if (contentExists(siteId, root)) {
            return
        }
        try {
            legacy.createFolder(siteId, '/', 'recyclebin')
        } catch (Exception e) {
            logger.debug('createFolder recyclebin: {}', e.message)
            if (!contentExists(siteId, root)) {
                throw new IllegalStateException('Unable to create /recyclebin folder')
            }
        }
    }

    private void ensureBinUuidFolder(String siteId, String binId) {
        ensureRecycleBinRoot(siteId)
        def uuidPath = "${RecycleBinPermissionSupport.RECYCLE_BIN_ROOT}/${binId}".toString()
        if (contentExists(siteId, uuidPath)) {
            return
        }
        def legacy = requireLegacyContentService()
        try {
            legacy.createFolder(siteId, RecycleBinPermissionSupport.RECYCLE_BIN_ROOT, binId)
        } catch (Exception e) {
            logger.debug('createFolder recycle bin uuid {}: {}', binId, e.message)
            if (!contentExists(siteId, uuidPath)) {
                throw new IllegalStateException("Unable to create recycle bin folder ${uuidPath}")
            }
        }
    }

    /** @deprecated Pre-creating mirrored path segments caused nested page folders on move. */
    private void ensureParentFolders(String siteId, String binPath) {
        def legacy = requireLegacyContentService()
        def segments = binPath.split('/').findAll { it?.trim() }
        if (segments.size() <= 2) {
            return
        }
        def current = ''
        for (int i = 0; i < segments.size() - 1; i++) {
            current += "/${segments[i]}"
            if (contentExists(siteId, current)) {
                continue
            }
            def parent = current.lastIndexOf('/') > 0 ? current.substring(0, current.lastIndexOf('/')) : '/'
            def name = segments[i]
            try {
                legacy.createFolder(siteId, parent == '' ? '/' : parent, name)
            } catch (Exception e) {
                logger.debug('createFolder {} under {}: {}', name, parent, e.message)
            }
        }
    }

    private boolean contentExists(String siteId, String path) {
        try {
            def v2 = WorkflowBeanLookup.resolve(applicationContext, 'contentService')
            if (v2?.metaClass?.respondsTo(v2, 'contentExists', String, String)) {
                return v2.contentExists(siteId, path) as boolean
            }
        } catch (Exception ignored) {
        }
        try {
            def legacy = requireLegacyContentService()
            if (legacy.metaClass.respondsTo(legacy, 'contentExists', String, String)) {
                return legacy.contentExists(siteId, path) as boolean
            }
        } catch (Exception ignored) {
        }
        return false
    }

    private void moveContent(String siteId, String fromPath, String toPath) {
        def legacy = requireLegacyContentService()
        if (!legacy.metaClass.respondsTo(legacy, 'moveContent', String, String, String)) {
            throw new IllegalStateException('Studio content move is not available')
        }
        def result = legacy.moveContent(siteId, fromPath, toPath)
        if (!result) {
            throw new IllegalStateException("Failed to move ${fromPath} to ${toPath}")
        }
    }

    private void deleteContent(String siteId, String path) {
        def v2 = WorkflowBeanLookup.resolve(applicationContext, 'contentService')
        if (v2?.metaClass?.respondsTo(v2, 'deleteContent', String, String, String)) {
            v2.deleteContent(siteId, path, 'Permanently deleted from recycle bin')
            return
        }
        def legacy = requireLegacyContentService()
        if (legacy.metaClass.respondsTo(legacy, 'deleteContent', String, String, String)) {
            legacy.deleteContent(siteId, path, 'Permanently deleted from recycle bin')
            return
        }
        throw new IllegalStateException('Studio content delete is not available')
    }

    private Map readContentMetadata(String siteId, String path) {
        def metadata = [
            internalName  : path.substring(path.lastIndexOf('/') + 1),
            lastModifier  : null,
            modifiedOn    : null,
            createdOn     : null,
            createdBy     : null,
            sandboxState  : null
        ]
        try {
            def legacy = requireLegacyContentService()
            if (!legacy.metaClass.respondsTo(legacy, 'getContent', String, String)) {
                return metadata
            }
            def item = legacy.getContent(siteId, path)
            if (!item) {
                return metadata
            }
            metadata.internalName = item.internalName ?: item.name ?: item.label ?: metadata.internalName
            metadata.lastModifier = item.userLastModifier ?: item.lastModifier ?: item.user ?: item.modifier
            metadata.createdBy = item.userCreate ?: item.userCreator ?: item.creator ?: item.createdBy ?: item.owner
            metadata.modifiedOn = parseDate(item.dateModified ?: item.lastModifiedDate ?: item.modifiedDate)
            metadata.createdOn = parseDate(item.dateCreated ?: item.createdDate ?: item.createDate)
            metadata.sandboxState = resolveSandboxStateSnapshot(item)
        } catch (Exception e) {
            logger.debug('Could not read metadata for {}: {}', path, e.message)
        }
        return metadata
    }

    private static String resolveSandboxStateSnapshot(def item) {
        if (!item) {
            return null
        }
        def flags = [
            deleted            : item.deleted,
            systemProcessing   : item.systemProcessing,
            locked             : item.locked,
            disabled           : item.disabled,
            submittedToLive    : item.submittedToLive,
            submittedToStaging : item.submittedToStaging,
            submitted          : item.submitted,
            scheduled          : item.scheduled,
            new                : item.new,
            modified           : item.modified,
            publishing         : item.publishing,
            staged             : item.staged,
            live               : item.live
        ]
        def active = flags.find { key, value -> value == true || value?.toString() == 'true' }
        if (active) {
            return active.key.toString()
        }
        if (item.state) {
            return item.state.toString()
        }
        return 'unpublished'
    }

    private static Date parseDate(value) {
        if (!value) {
            return null
        }
        if (value instanceof Date) {
            return value
        }
        try {
            return javax.xml.bind.DatatypeConverter.parseDateTime(value.toString()).time
        } catch (Exception ignored) {
        }
        return null
    }

    private def requireLegacyContentService() {
        def service = WorkflowBeanLookup.resolve(applicationContext, 'cstudioContentService')
        if (!service) {
            throw new IllegalStateException('cstudioContentService bean is not available')
        }
        return service
    }

    private static Map toDto(Map row) {
        return [
            id                    : row.id,
            siteId                : row.siteId,
            binPath               : row.binPath,
            internalName          : row.internalName,
            originalPath          : row.originalPath,
            originalLastModifier  : row.originalLastModifier,
            originalModifiedOn    : row.originalModifiedOn,
            originalCreatedOn     : row.originalCreatedOn,
            originalCreatedBy     : row.originalCreatedBy,
            originalSandboxState  : row.originalSandboxState,
            state                 : row.state,
            binnedOn              : row.binnedOn,
            binnedByUserId        : row.binnedByUserId,
            binnedByUsername      : row.binnedByUsername,
            restoredOn            : row.restoredOn,
            restoredByUserId      : row.restoredByUserId,
            restoredByUsername    : row.restoredByUsername,
            purgedOn              : row.purgedOn,
            purgedByUserId        : row.purgedByUserId,
            purgedByUsername      : row.purgedByUsername
        ]
    }
}
