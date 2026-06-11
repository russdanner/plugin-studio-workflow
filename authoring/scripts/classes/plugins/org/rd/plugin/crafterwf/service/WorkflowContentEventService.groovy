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
        def normalizedEvent = normalizeEventType(eventType)
        if (!normalizedEvent) {
            logger.info("Ignoring workflow content event with unsupported type: {}", eventType)
            return []
        }
        def resolvedType = contentType?.trim() ?: contentTypeSupport.resolveContentType(siteId, contentPath)
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
                    logger.debug(
                        "Listener {} skipped for {} (type={} path={})",
                        listener.id, workflowId, resolvedType, contentPath
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
