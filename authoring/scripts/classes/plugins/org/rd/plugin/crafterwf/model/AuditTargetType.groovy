package plugins.org.rd.plugin.crafterwf.model

class AuditTargetType {

    static final String WORKFLOW = 'workflow'
    static final String PACKAGE = 'package'
    static final String TASK = 'task'

    static String normalize(String value) {
        def trimmed = value?.trim()
        if (!trimmed) {
            return null
        }
        switch (trimmed.toLowerCase()) {
            case WORKFLOW:
            case PACKAGE:
            case TASK:
                return trimmed.toLowerCase()
            default:
                throw new IllegalArgumentException("Invalid audit target type: ${value}")
        }
    }
}
