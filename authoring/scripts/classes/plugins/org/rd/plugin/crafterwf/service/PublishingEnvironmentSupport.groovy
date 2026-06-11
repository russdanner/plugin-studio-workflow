package plugins.org.rd.plugin.crafterwf.service

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import plugins.org.rd.plugin.crafterwf.util.WorkflowBeanLookup

class PublishingEnvironmentSupport {

    private static final Logger logger = LoggerFactory.getLogger(PublishingEnvironmentSupport)

    private static final List<String> WORKFLOW_SERVICE_BEANS = [
        'studio.workflowService',
        'workflowService'
    ]

    private static final List<String> PUBLISH_SERVICE_BEANS = [
        'publishService',
        'studio.publishService'
    ]

    private static final List<String> SERVICES_CONFIG_BEANS = [
        'cstudioServicesConfig',
        'servicesConfig'
    ]

    static Map resolvePublishingEnvironments(def applicationContext, String siteId) {
        def publishService = resolveBean(applicationContext, PUBLISH_SERVICE_BEANS)
        if (publishService) {
            try {
                def targets = publishService.getAvailablePublishingTargets(siteId) ?: []
                def names = targets.collect { target ->
                    target?.name ?: target?.environment ?: target?.toString()
                }.findAll { it }.collect { it.toString() }
                if (!names.isEmpty()) {
                    return [
                        live           : names[0],
                        staging        : names.size() > 1 ? names[1] : null,
                        stagingEnabled : names.size() > 1
                    ]
                }
            } catch (Exception e) {
                logger.debug('Could not resolve publishing targets from publishService for site {}: {}', siteId, e.message)
            }
        }

        def servicesConfig = resolveBean(applicationContext, SERVICES_CONFIG_BEANS)
        if (servicesConfig) {
            try {
                def live = servicesConfig.getLiveEnvironment(siteId) ?: 'live'
                def stagingEnabled = servicesConfig.isStagingEnvironmentEnabled(siteId)
                def staging = stagingEnabled ? (servicesConfig.getStagingEnvironment(siteId) ?: 'staging') : null
                return [live: live, staging: staging, stagingEnabled: stagingEnabled]
            } catch (Exception e) {
                logger.debug('Could not resolve publishing targets from servicesConfig for site {}: {}', siteId, e.message)
            }
        }

        return [live: 'live', staging: 'staging', stagingEnabled: false]
    }

    static def resolveWorkflowService(def applicationContext) {
        return resolveBean(applicationContext, WORKFLOW_SERVICE_BEANS)
    }

    private static def resolveBean(def applicationContext, List<String> beanNames) {
        if (!applicationContext || !beanNames) {
            return null
        }

        for (String beanName : beanNames) {
            def bean = WorkflowBeanLookup.resolve(applicationContext, beanName)
            if (bean) {
                logger.debug('Resolved Spring bean: {}', beanName)
                return bean
            }
        }

        logger.debug('Spring bean not found (tried {})', beanNames.join(', '))
        return null
    }
}
