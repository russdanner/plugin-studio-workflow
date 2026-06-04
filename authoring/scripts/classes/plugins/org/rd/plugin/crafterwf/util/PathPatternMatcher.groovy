package plugins.org.rd.plugin.crafterwf.util

class PathPatternMatcher {

    static boolean matchesAny(String path, List<String> patterns) {
        if (!path?.trim() || !patterns) {
            return false
        }
        def normalizedPath = normalizePath(path)
        return patterns.any { pattern -> matches(normalizedPath, pattern) }
    }

    static String normalizePath(String path) {
        def trimmed = path?.trim() ?: ''
        if (!trimmed.startsWith('/')) {
            trimmed = '/' + trimmed
        }
        return trimmed
    }

    static boolean matches(String path, String pattern) {
        def p = pattern?.trim()
        if (!p || !path) {
            return false
        }
        if (p == '*' || p == '**' || p == '/*') {
            return true
        }
        def normalizedPattern = normalizePath(p)
        if (normalizedPattern.endsWith('/**')) {
            def prefix = normalizedPattern[0..-4]
            return path == prefix || path.startsWith(prefix + '/')
        }
        if (normalizedPattern.endsWith('/*')) {
            def prefix = normalizedPattern[0..-2]
            if (path == prefix) {
                return true
            }
            if (!path.startsWith(prefix + '/')) {
                return false
            }
            def remainder = path.substring(prefix.length() + 1)
            return !remainder.contains('/')
        }
        if (normalizedPattern.contains('*')) {
            def regex = normalizedPattern
                .replace('\\', '\\\\')
                .replace('.', '\\.')
                .replace('**', '<<DOUBLESTAR>>')
                .replace('*', '[^/]*')
                .replace('<<DOUBLESTAR>>', '.*')
            return path ==~ /^${regex}$/
        }
        return path == normalizedPattern || path.startsWith(normalizedPattern + '/')
    }
}
