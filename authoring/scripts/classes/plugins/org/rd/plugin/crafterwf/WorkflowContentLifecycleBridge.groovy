package plugins.org.rd.plugin.crafterwf

import org.slf4j.Logger
import org.slf4j.LoggerFactory
/**
 * Invoked from site content-type controller.groovy scripts on content lifecycle events.
 */
class WorkflowContentLifecycleBridge {

    private static final Logger logger = LoggerFactory.getLogger(WorkflowContentLifecycleBridge)

    static void handle(def applicationContext, String site, String path, String contentType,
                       def contentLifecycleOperation, def user) {
        if (!site?.trim() || !path?.trim()) {
            return
        }
        def eventType = resolveEventType(contentLifecycleOperation)
        if (!eventType) {
            logger.debug(
                "Skipping workflow lifecycle for {} on {} (operation={})",
                path, site, contentLifecycleOperation
            )
            return
        }
        logger.info(
            "Workflow lifecycle event: site={} path={} operation={} eventType={} contentType={}",
            site, path, contentLifecycleOperation, eventType, contentType
        )
        System.out.println(
            "[crafterwf] bridge event site=${site} path=${path} op=${contentLifecycleOperation} eventType=${eventType} type=${contentType}"
        )
        try {
            def ctx = WorkflowContext.create(applicationContext, null, false)
            def username = resolveUsername(user)
            def userId = WorkflowContext.resolveUserIdByUsername(applicationContext, username) ?: 0L
            def results = ctx.contentEventService.processContentEvent(
                site, eventType, path, contentType, userId, username
            )
            logger.info(
                "Workflow lifecycle processed {} on {}: {} listener result(s)",
                path, site, results?.size() ?: 0
            )
        } catch (Exception e) {
            logger.warn(
                "Workflow content lifecycle bridge failed for {} on {}: {}",
                path, site, e.message ?: e.class.simpleName, e
            )
        }
    }

    private static String resolveEventType(def contentLifecycleOperation) {
        if (!contentLifecycleOperation) {
            return null
        }
        def opName = null
        try {
            if (contentLifecycleOperation.metaClass?.respondsTo(contentLifecycleOperation, 'name')) {
                opName = contentLifecycleOperation.name()?.toString()?.trim()?.toUpperCase()
            }
        } catch (Exception ignored) {
        }
        def value = (opName ?: contentLifecycleOperation?.toString()?.trim()?.toUpperCase())
        if (value in ['NEW', 'CREATE', 'CREATED', 'DUPLICATE', 'COPY']) {
            return 'create'
        }
        if (value in ['UPDATE', 'EDIT', 'UPDATED']) {
            return 'edit'
        }
        return null
    }

    private static String resolveUsername(def user) {
        if (user instanceof String && user.trim()) {
            return user.trim()
        }
        if (user?.username) {
            return user.username as String
        }
        return 'system'
    }
}
