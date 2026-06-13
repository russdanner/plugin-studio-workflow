package scripts.libs

import org.slf4j.LoggerFactory

/**
 * Lifecycle-safe entry point for Crafter Workflow content event listeners.
 * Content-type controller.groovy scripts run in the lifecycle Groovy sandbox whose classpath
 * is default-site only — they cannot import site plugin classes directly.
 */
class CrafterwfWorkflowLifecycleBridge {

    private static final def LOGGER = LoggerFactory.getLogger(CrafterwfWorkflowLifecycleBridge)

    static void handle(def applicationContext, String site, String path, String contentType,
                       def contentLifecycleOperation, def user) {
        LOGGER.info(
            "[crafterwf] lifecycle site={} path={} op={} type={}",
            site, path, contentLifecycleOperation, contentType
        )
        if (!applicationContext || !site?.trim() || !path?.trim()) {
            LOGGER.info("[crafterwf] lifecycle skip: missing applicationContext, site, or path")
            return
        }
        try {
            def manager = applicationContext.getBean('scriptEngineManager')
            if (!manager) {
                LOGGER.info("[crafterwf] lifecycle skip: scriptEngineManager bean not available")
                return
            }
            def engine = manager.getScriptEngine(site)
            if (!engine) {
                LOGGER.info("[crafterwf] lifecycle skip: scriptEngine not available for site {}", site)
                return
            }
            def bridgeClass = engine.groovyClassLoader.loadClass(
                'plugins.org.rd.plugin.crafterwf.WorkflowContentLifecycleBridge'
            )
            bridgeClass.handle(applicationContext, site, path, contentType, contentLifecycleOperation, user)
        } catch (Exception e) {
            LOGGER.warn(
                "[crafterwf] lifecycle delegate failed path={}: {}: {}",
                path, e.class.simpleName, e.message, e
            )
        }
    }
}
