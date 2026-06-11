package plugins.org.rd.plugin.crafterwf.util

class EventListenerJson {

    static List<Map> normalizeListeners(def raw, List<Map> steps, String fieldName) {
        if (!(raw instanceof List)) {
            return []
        }
        def stepIds = (steps ?: []).collect { it?.id?.toString()?.trim() }.findAll { it } as Set
        def usedIds = [] as Set
        def normalized = []
        raw.eachWithIndex { item, index ->
            if (!(item instanceof Map)) {
                return
            }
            def listener = normalizeListener(item, stepIds, usedIds, index, fieldName)
            if (listener) {
                normalized << listener
                usedIds << listener.id
            }
        }
        return normalized
    }

    private static Map normalizeListener(Map item, Set stepIds, Set usedIds, int index, String fieldName) {
        def contentType = item.contentType?.toString()?.trim() ?: ''
        def pathRegex = item.pathRegex?.toString()?.trim() ?: ''
        def packageNamePrefix = item.packageNamePrefix?.toString()?.trim() ?: ''
        def stepId = item.stepId?.toString()?.trim()
        if (!packageNamePrefix) {
            throw new IllegalArgumentException("${fieldName}[${index}]: packageNamePrefix is required")
        }
        if (!stepId || !stepIds.contains(stepId)) {
            throw new IllegalArgumentException("${fieldName}[${index}]: stepId must reference a workflow step")
        }
        if (pathRegex && !PathRegexMatcher.isValidPattern(pathRegex)) {
            throw new IllegalArgumentException("${fieldName}[${index}]: pathRegex is not a valid regular expression")
        }
        def listenerId = item.id?.toString()?.trim()
        if (!listenerId) {
            listenerId = "listener-${index + 1}"
        }
        listenerId = ensureUniqueListenerId(listenerId, usedIds)
        return [
            id               : listenerId,
            contentType      : contentType,
            pathRegex        : pathRegex,
            packageNamePrefix: packageNamePrefix,
            stepId           : stepId
        ]
    }

    private static String ensureUniqueListenerId(String listenerId, Set usedIds) {
        def candidate = listenerId
        def counter = 2
        while (usedIds.contains(candidate)) {
            candidate = "${listenerId}-${counter}"
            counter++
        }
        return candidate
    }

    static List<Map> toListenerDtos(def raw) {
        if (!(raw instanceof List)) {
            return []
        }
        return raw.collect { item ->
            if (!(item instanceof Map)) {
                return null
            }
            [
                id               : item.id,
                contentType      : item.contentType ?: '',
                pathRegex        : item.pathRegex ?: '',
                packageNamePrefix: item.packageNamePrefix ?: '',
                stepId           : item.stepId
            ]
        }.findAll { it }
    }

    static boolean matchesListener(Map listener, String contentType, String contentPath) {
        if (!listener) {
            return false
        }
        def configuredType = listener.contentType?.toString()?.trim()
        if (configuredType && configuredType != '*' && contentType) {
            def typeMatch = contentType == configuredType || contentType.endsWith(configuredType)
            if (!typeMatch) {
                return false
            }
        } else if (configuredType && configuredType != '*' && !contentType) {
            return false
        }
        def pathRegex = listener.pathRegex?.toString()?.trim()
        if (pathRegex) {
            return PathRegexMatcher.matches(contentPath, pathRegex)
        }
        return true
    }
}
