package plugins.org.rd.plugin.crafterwf.util

/**
 * Extracts @username tokens from comment text (not email addresses).
 */
class MentionParser {

    private static final java.util.regex.Pattern MENTION =
        ~/(?<![\w.@])@([\w][\w.\-]{0,63})/

    static List<String> extractUsernames(String text) {
        if (!text?.trim()) {
            return []
        }
        def found = [] as LinkedHashSet
        def matcher = MENTION.matcher(text)
        while (matcher.find()) {
            def username = matcher.group(1)
            if (username) {
                found << username
            }
        }
        return found.toList()
    }
}
