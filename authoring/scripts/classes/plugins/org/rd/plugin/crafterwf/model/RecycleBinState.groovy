package plugins.org.rd.plugin.crafterwf.model

class RecycleBinState {

    static final String BINNED = 'binned'
    static final String RESTORED = 'restored'
    static final String PURGED = 'purged'

    static String normalize(String value) {
        def trimmed = value?.trim()?.toLowerCase()
        if (!trimmed) {
            return BINNED
        }
        switch (trimmed) {
            case BINNED:
            case RESTORED:
            case PURGED:
                return trimmed
            default:
                throw new IllegalArgumentException("Invalid recycle bin state: ${value}")
        }
    }
}
