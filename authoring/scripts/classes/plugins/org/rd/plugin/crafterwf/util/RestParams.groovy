package plugins.org.rd.plugin.crafterwf.util

class RestParams {

    static String requireString(Map params, String name, String message = null) {
        def value = params[name]
        if (value == null || value.toString().trim().isEmpty()) {
            throw new IllegalArgumentException(message ?: "${name} is required")
        }
        return value.toString().trim()
    }

    static String optionalString(Map params, String name, String defaultValue = null) {
        def value = params[name]
        if (value == null || value.toString().trim().isEmpty()) {
            return defaultValue
        }
        return value.toString().trim()
    }

    static String requireOneOf(Map params, List<String> names, String message = null) {
        for (String name : names) {
            def value = params[name]
            if (value != null && value.toString().trim()) {
                return value.toString().trim()
            }
        }
        throw new IllegalArgumentException(message ?: "${names.join(' or ')} is required")
    }

    static Long parseLong(def value, String fieldName = 'value') {
        try {
            return Long.parseLong(value as String)
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid ${fieldName}: must be a number")
        }
    }

    static Long optionalLong(Map params, String name) {
        if (!params.containsKey(name) || params[name] == null || params[name].toString().trim().isEmpty()) {
            return null
        }
        return parseLong(params[name], name)
    }

    static int parseInt(def value, String fieldName = 'value', int defaultValue = 0) {
        if (value == null || value.toString().trim().isEmpty()) {
            return defaultValue
        }
        try {
            return Integer.parseInt(value as String)
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid ${fieldName}: must be an integer")
        }
    }

    static boolean parseBoolean(def value, boolean defaultValue = false) {
        if (value == null) {
            return defaultValue
        }
        return value == true || value == 'true' || value == 1 || value == '1'
    }

    static Date parseDueOn(String paramName, def value, Closure<Date> parser) {
        if (value == null || value.toString().trim().isEmpty()) {
            return null
        }
        try {
            return parser(value)
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid ${paramName} format: ${value}")
        }
    }
}
