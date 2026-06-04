package plugins.org.rd.plugin.crafterwf.util

import groovy.json.JsonOutput
import groovy.json.JsonSlurper

class StepRuleJson {

    static String encodeStringList(List<String> values) {
        def cleaned = (values ?: [])
            .collect { it?.toString()?.trim() }
            .findAll { it }
            .unique()
        return cleaned.isEmpty() ? null : JsonOutput.toJson(cleaned)
    }

    static List<String> decodeStringList(def raw) {
        if (!raw) {
            return []
        }
        if (raw instanceof List) {
            return raw.collect { it?.toString()?.trim() }.findAll { it }.unique()
        }
        def text = raw.toString().trim()
        if (!text) {
            return []
        }
        try {
            def parsed = new JsonSlurper().parseText(text)
            if (parsed instanceof List) {
                return parsed.collect { it?.toString()?.trim() }.findAll { it }.unique()
            }
        } catch (Exception ignored) {
        }
        return [text]
    }

    static String normalizeRoleMode(def raw) {
        def mode = raw?.toString()?.trim()?.toLowerCase()
        if (mode in ['include', 'exclude']) {
            return mode
        }
        return 'all'
    }

    static String normalizeContentMode(def raw) {
        def mode = raw?.toString()?.trim()?.toLowerCase()
        if (mode in ['any', 'restricted']) {
            return 'any'
        }
        return 'all'
    }

    static Map parseRoleRule(Map step) {
        if (step?.roleRule instanceof Map) {
            return [
                mode : normalizeRoleMode(step.roleRule.mode),
                roles: normalizeRoleList(step.roleRule.roles)
            ]
        }
        return [
            mode : normalizeRoleMode(step?.role_rule_mode ?: step?.roleRuleMode),
            roles: decodeStringList(step?.role_rule_roles ?: step?.roleRuleRoles)
        ]
    }

    static Map parseContentRule(Map step) {
        if (step?.contentRule instanceof Map) {
            return [
                mode        : normalizeContentMode(step.contentRule.mode),
                pathPatterns: normalizeStringList(step.contentRule.pathPatterns),
                contentTypes: normalizeStringList(step.contentRule.contentTypes)
            ]
        }
        return [
            mode        : normalizeContentMode(step?.content_rule_mode ?: step?.contentRuleMode),
            pathPatterns: decodeStringList(step?.content_rule_paths ?: step?.contentRulePaths),
            contentTypes: decodeStringList(step?.content_rule_types ?: step?.contentRuleTypes)
        ]
    }

    private static List<String> normalizeRoleList(def raw) {
        if (raw instanceof List) {
            return raw.collect { it?.toString()?.trim() }.findAll { it }.unique()
        }
        return []
    }

    private static List<String> normalizeStringList(def raw) {
        if (raw instanceof List) {
            return raw.collect { it?.toString()?.trim() }.findAll { it }.unique()
        }
        return []
    }

    static Map toRoleRuleDto(Map step) {
        def rule = parseRoleRule(step)
        return [
            mode : rule.mode,
            roles: rule.roles
        ]
    }

    static Map toContentRuleDto(Map step) {
        def rule = parseContentRule(step)
        return [
            mode        : rule.mode,
            pathPatterns: rule.pathPatterns,
            contentTypes: rule.contentTypes
        ]
    }
}
