package plugins.org.rd.plugin.crafterwf.util

import org.slf4j.Logger
import org.slf4j.LoggerFactory

class ContentTypeSupport {

    private static final Logger logger = LoggerFactory.getLogger(ContentTypeSupport)

    private final def applicationContext

    ContentTypeSupport(def applicationContext) {
        this.applicationContext = applicationContext
    }

    String resolveContentType(String siteId, String contentPath) {
        if (!siteId?.trim() || !contentPath?.trim()) {
            return null
        }
        def path = contentPath.trim()
        if (path.startsWith('/static-assets/')) {
            return '/asset/static'
        }
        def fromService = resolveFromServices(siteId, path)
        if (fromService) {
            return fromService
        }
        return inferFromPath(path)
    }

    private String resolveFromServices(String siteId, String contentPath) {
        def beans = [
            'contentService',
            'cstudioContentService',
            'contentRepository',
            'contentStore'
        ]
        for (def beanName in beans) {
            try {
                def service = WorkflowBeanLookup.resolve(applicationContext, beanName)
                if (!service) {
                    continue
                }
                def item = null
                if (service.metaClass.respondsTo(service, 'getContent', String, String)) {
                    item = service.getContent(siteId, contentPath)
                } else if (service.metaClass.respondsTo(service, 'getItem', String, String)) {
                    item = service.getItem(siteId, contentPath)
                } else if (service.metaClass.respondsTo(service, 'readContent', String, String)) {
                    item = service.readContent(siteId, contentPath)
                }
                if (item) {
                    def type = item.contentTypeId ?: item.contentType ?: item['content-type'] ?: item.content_type
                    if (type) {
                        return type.toString().trim()
                    }
                }
            } catch (Exception e) {
                logger.debug('Could not resolve content type from {}: {}', beanName, e.message)
            }
        }
        return null
    }

    private static String inferFromPath(String contentPath) {
        if (!contentPath?.contains('/')) {
            return null
        }
        if (contentPath.contains('/site/website/')) {
            return '/page/unknown'
        }
        if (contentPath.contains('/site/components/')) {
            return '/component/unknown'
        }
        return null
    }
}
