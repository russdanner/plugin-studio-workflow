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
        System.out.println(
            "[crafterwf] lifecycle site=${site} path=${path} op=${contentLifecycleOperation} type=${contentType}"
        )
        if (!applicationContext || !site?.trim() || !path?.trim()) {
            System.out.println("[crafterwf] lifecycle skip: missing applicationContext, site, or path")
            return
        }
        try {
            def manager = applicationContext.getBean('scriptEngineManager')
            if (!manager) {
                System.out.println("[crafterwf] lifecycle skip: scriptEngineManager bean not available")
                return
            }
            def engine = manager.getScriptEngine(site)
            if (!engine) {
                System.out.println("[crafterwf] lifecycle skip: scriptEngine not available for site ${site}")
                return
            }
            def bridgeClass = engine.groovyClassLoader.loadClass(
                'plugins.org.rd.plugin.crafterwf.WorkflowContentLifecycleBridge'
            )
            bridgeClass.handle(applicationContext, site, path, contentType, contentLifecycleOperation, user)
        } catch (Exception e) {
            System.out.println(
                "[crafterwf] lifecycle delegate failed path=${path}: ${e.class.simpleName}: ${e.message}"
            )
            LOGGER.warn("Crafterwf workflow lifecycle delegate failed for {}: {}", path, e.message, e)
        }
    }
}
