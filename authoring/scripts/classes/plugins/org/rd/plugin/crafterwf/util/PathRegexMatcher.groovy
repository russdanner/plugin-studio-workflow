package plugins.org.rd.plugin.crafterwf.util

import java.util.regex.Pattern
import java.util.regex.PatternSyntaxException

class PathRegexMatcher {

    static boolean matches(String path, String regex) {
        def pattern = regex?.trim()
        if (!pattern || !path?.trim()) {
            return false
        }
        def normalized = PathPatternMatcher.normalizePath(path)
        try {
            return normalized ==~ Pattern.compile(pattern)
        } catch (PatternSyntaxException ignored) {
            return false
        }
    }

    static boolean isValidPattern(String regex) {
        def pattern = regex?.trim()
        if (!pattern) {
            return true
        }
        try {
            Pattern.compile(pattern)
            return true
        } catch (PatternSyntaxException ignored) {
            return false
        }
    }
}
