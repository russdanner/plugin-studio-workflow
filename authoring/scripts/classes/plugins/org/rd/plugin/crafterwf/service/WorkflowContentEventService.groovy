package plugins.org.rd.plugin.crafterwf.service

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import plugins.org.rd.plugin.crafterwf.model.AuditOperation
import plugins.org.rd.plugin.crafterwf.model.AuditTargetType
import plugins.org.rd.plugin.crafterwf.util.ContentTypeSupport
import plugins.org.rd.plugin.crafterwf.util.EventListenerJson
import plugins.org.rd.plugin.crafterwf.util.WorkflowDefinitionSupport

class WorkflowContentEventService {

    private static final Logger logger = LoggerFactory.getLogger(WorkflowContentEventService)

    private final WorkflowDefinitionService definitionService
    private final WorkflowPackageService packageService
    private final ContentTypeSupport contentTypeSupport

    WorkflowContentEventService(WorkflowDefinitionService definitionService,
                                WorkflowPackageService packageService,
                                def applicationContext) {
        this.definitionService = definitionService
        this.packageService = packageService
        this.contentTypeSupport = new ContentTypeSupport(applicationContext)
    }

    List<Map> processContentEvent(String siteId, String eventType, String contentPath, String contentType,
                                  Long userId, String username) {
        if (!siteId?.trim() || !contentPath?.trim()) {
            return []
        }
        if (!isEnrollableContentPath(contentPath)) {
            logger.debug("Skipping workflow content event for non-content path: {}", contentPath)
            return []
        }
        def normalizedEvent = normalizeEventType(eventType)
        if (!normalizedEvent) {
            logger.info("Ignoring workflow content event with unsupported type: {}", eventType)
            return []
        }
        def resolvedType = resolveEffectiveContentType(contentType, siteId, contentPath)
        def workflowIds = definitionService.listWorkflowIds(siteId)
        logger.info(
            "Processing workflow content event: site={} event={} path={} contentType={} workflows={}",
            siteId, normalizedEvent, contentPath, resolvedType, workflowIds
        )
        def results = []
        for (String workflowId in workflowIds) {
            def definition = definitionService.tryLoadDefinition(siteId, workflowId)
            if (!definition) {
                continue
            }
            def listeners = resolveListeners(definition, normalizedEvent)
            logger.info(
                "Workflow {} has {} listener(s) for {}",
                workflowId, listeners?.size() ?: 0, normalizedEvent
            )
            for (def listener in listeners) {
                if (!EventListenerJson.matchesListener(listener, resolvedType, contentPath)) {
                    logger.info(
                        "Listener {} skipped for {} (type={} path={}, configuredType={})",
                        listener.id, workflowId, resolvedType, contentPath, listener.contentType
                    )
                    continue
                }
                logger.info(
                    "Listener {} matched on {} for {}",
                    listener.id, workflowId, contentPath
                )
                try {
                    def outcome = packageService.enrollContentFromListener(
                        siteId,
                        workflowId as String,
                        listener,
                        contentPath.trim(),
                        resolvedType,
                        userId,
                        username
                    )
                    if (outcome) {
                        results << outcome + [workflowId: workflowId, listenerId: listener.id, eventType: normalizedEvent]
                    }
                } catch (Exception e) {
                    logger.warn(
                        "Workflow listener {} on {} failed for {}: {}",
                        listener.id, workflowId, contentPath, e.message ?: e.class.simpleName
                    )
                    results << [
                        workflowId : workflowId,
                        listenerId : listener.id,
                        eventType  : normalizedEvent,
                        contentPath: contentPath,
                        error      : e.message ?: e.class.simpleName
                    ]
                }
            }
        }
        return results
    }

    private static List<Map> resolveListeners(Map definition, String normalizedEvent) {
        def editListeners = EventListenerJson.toListenerDtos(definition.editListeners)
        def createListeners = EventListenerJson.toListenerDtos(definition.createListeners)
        if (normalizedEvent == 'create') {
            return createListeners
        }
        if (editListeners) {
            return editListeners
        }
        // Content saves fire UPDATE; fall back to create listeners when no edit rules exist.
        return createListeners
    }

    private String resolveEffectiveContentType(String passed, String siteId, String path) {
        def trimmed = passed?.trim()
        if (trimmed && !ContentTypeSupport.isUnknownPlaceholder(trimmed)) {
            return trimmed
        }
        return contentTypeSupport.resolveContentType(siteId, path)
    }

    private static boolean isEnrollableContentPath(String contentPath) {
        def path = contentPath?.trim()
        if (!path) {
            return false
        }
        return path.endsWith('.xml') || path.endsWith('.html')
    }

    private static String normalizeEventType(String eventType) {
        def value = eventType?.toString()?.trim()?.toUpperCase()
        if (value in ['NEW', 'CREATE', 'CREATED', 'DUPLICATE', 'COPY']) {
            return 'create'
        }
        if (value in ['UPDATE', 'EDIT', 'UPDATED']) {
            return 'edit'
        }
        if (value in ['create', 'edit']) {
            return value
        }
        return null
    }
}
