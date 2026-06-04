package plugins.org.rd.plugin.crafterwf.model

class TaskPriority {
    static final String HIGH = 'high'
    static final String MEDIUM = 'medium'
    static final String LOW = 'low'

    private static final List<String> ALLOWED = [HIGH, MEDIUM, LOW]

    static String normalize(String value) {
        def normalized = value?.trim()?.toLowerCase()
        if (!normalized) {
            return MEDIUM
        }
        if (ALLOWED.contains(normalized)) {
            return normalized
        }
        throw new IllegalArgumentException("Invalid task priority: ${value}. Allowed: high, medium, low")
    }
}
