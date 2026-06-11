package plugins.org.rd.plugin.crafterwf.util

import org.slf4j.LoggerFactory

/**
 * Resolves Spring beans from either ApplicationContextAccessor ({@code get}) or a raw
 * {@code ApplicationContext} ({@code getBean}) — lifecycle hooks pass the latter.
 */
class WorkflowBeanLookup {

    private static final def LOGGER = LoggerFactory.getLogger(WorkflowBeanLookup)

    static Object resolve(def applicationContext, String beanName) {
        if (applicationContext == null || !beanName?.trim()) {
            return null
        }
        try {
            def bean = applicationContext.get(beanName)
            if (bean != null) {
                return bean
            }
        } catch (Exception e) {
            LOGGER.trace('applicationContext.get({}) failed: {}', beanName, e.message)
        }
        try {
            return applicationContext.getBean(beanName)
        } catch (Exception e) {
            LOGGER.trace('applicationContext.getBean({}) failed: {}', beanName, e.message)
        }
        return null
    }
}
