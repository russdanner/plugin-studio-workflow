package plugins.org.rd.plugin.crafterwf.util

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import plugins.org.rd.plugin.crafterwf.service.WorkflowDefinitionService

class ContentTypeSupport {

    private static final Logger logger = LoggerFactory.getLogger(ContentTypeSupport)

    private final def applicationContext

    ContentTypeSupport(def applicationContext) {
        this.applicationContext = applicationContext
    }

    static boolean isUnknownPlaceholder(String contentType) {
        def value = contentType?.trim()
        return value in ['/page/unknown', '/component/unknown']
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
        if (fromService && !isUnknownPlaceholder(fromService)) {
            return fromService
        }
        def fromXml = resolveFromContentXml(siteId, path)
        if (fromXml) {
            return fromXml
        }
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

    private String resolveFromContentXml(String siteId, String contentPath) {
        if (!contentPath?.trim()?.endsWith('.xml')) {
            return null
        }
        def text = readContentXmlText(siteId, contentPath.trim())
        if (!text?.trim()) {
            return null
        }
        def matcher = (text =~ /<content-type>\s*([^<\s]+)\s*<\/content-type>/)
        if (matcher.find()) {
            def type = matcher.group(1).trim()
            if (type && !isUnknownPlaceholder(type)) {
                return type
            }
        }
        return null
    }

    private String readContentXmlText(String siteId, String path) {
        def contentService = WorkflowBeanLookup.resolve(applicationContext, 'contentService')
        if (contentService?.metaClass?.respondsTo(contentService, 'contentExists', String, String)) {
            try {
                if (!contentService.contentExists(siteId, path)) {
                    return null
                }
            } catch (Exception ignored) {
            }
        }
        if (contentService?.metaClass?.respondsTo(contentService, 'getContentAsResource', String, String)) {
            try {
                def resource = contentService.getContentAsResource(siteId, path)
                def text = WorkflowDefinitionService.readUtf8FromResource(resource, path, 'getContentAsResource')
                if (text?.trim()) {
                    return text
                }
            } catch (Exception e) {
                logger.debug('Could not read content xml via getContentAsResource: {}', e.message)
            }
        }
        def legacy = WorkflowBeanLookup.resolve(applicationContext, 'cstudioContentService')
        if (legacy?.metaClass?.respondsTo(legacy, 'getContentAsString', String, String)) {
            try {
                def text = legacy.getContentAsString(siteId, path)
                if (text?.trim()) {
                    return text
                }
            } catch (Exception e) {
                logger.debug('Could not read content xml via cstudioContentService: {}', e.message)
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
