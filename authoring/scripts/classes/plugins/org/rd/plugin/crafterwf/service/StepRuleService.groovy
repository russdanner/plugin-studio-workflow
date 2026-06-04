package plugins.org.rd.plugin.crafterwf.service

import plugins.org.rd.plugin.crafterwf.dao.WorkflowPackageAttachmentDao
import plugins.org.rd.plugin.crafterwf.util.ContentTypeSupport
import plugins.org.rd.plugin.crafterwf.util.PathPatternMatcher
import plugins.org.rd.plugin.crafterwf.util.SiteGroupSupport
import plugins.org.rd.plugin.crafterwf.util.StepRuleJson

class StepRuleService {

    static final String CONTENT_BLOCKED_MESSAGE =
        'Content associated with package not allowed in Step'
    static final String ROLE_BLOCKED_MESSAGE =
        'Your role is not allowed to move packages into this step'

    private final SiteGroupSupport siteGroupSupport
    private final ContentTypeSupport contentTypeSupport
    private final WorkflowPackageAttachmentDao attachmentDao

    StepRuleService(def applicationContext, WorkflowPackageAttachmentDao attachmentDao, def dataSource = null) {
        this.siteGroupSupport = new SiteGroupSupport(applicationContext, dataSource)
        this.contentTypeSupport = new ContentTypeSupport(applicationContext)
        this.attachmentDao = attachmentDao
    }

    Map validateMoveToStep(String siteId, Map step, String workflowPackageId, String username) {
        def roleResult = validateRoleRule(siteId, step, username)
        if (!roleResult.allowed) {
            return roleResult
        }
        return validateContentRule(siteId, step, workflowPackageId)
    }

    Map validateRoleRule(String siteId, Map step, String username) {
        def rule = StepRuleJson.parseRoleRule(step)
        if (rule.mode == 'all') {
            return [allowed: true]
        }
        def userGroups = siteGroupSupport.getUserGroupNames(username, siteId)
        def normalizedUserGroups = userGroups.collect { it?.toLowerCase() } as Set
        def configured = rule.roles.collect { it?.toLowerCase() } as Set
        if (rule.mode == 'include') {
            if (!configured) {
                return [allowed: true]
            }
            def matched = configured.any { normalizedUserGroups.contains(it) }
            if (!matched) {
                return blocked(ROLE_BLOCKED_MESSAGE, 'role', rule)
            }
            return [allowed: true]
        }
        if (rule.mode == 'exclude') {
            if (!configured) {
                return [allowed: true]
            }
            def blockedRole = configured.find { normalizedUserGroups.contains(it) }
            if (blockedRole) {
                return blocked(ROLE_BLOCKED_MESSAGE, 'role', rule)
            }
            return [allowed: true]
        }
        return [allowed: true]
    }

    Map validateContentRule(String siteId, Map step, String workflowPackageId) {
        def rule = StepRuleJson.parseContentRule(step)
        if (rule.mode == 'all') {
            return [allowed: true]
        }
        def paths = rule.pathPatterns
        def types = rule.contentTypes
        if (!paths && !types) {
            return [allowed: true]
        }
        def refs = attachmentDao.findContentRefs(siteId, workflowPackageId)
        if (!refs) {
            return [allowed: true]
        }
        for (def ref in refs) {
            def contentPath = ref.content_path as String
            if (!contentPath?.trim()) {
                continue
            }
            def contentType = ref.content_type ?: contentTypeSupport.resolveContentType(siteId, contentPath)
            def pathMatch = paths ? PathPatternMatcher.matchesAny(contentPath, paths) : false
            def typeMatch = types && contentType ? types.any { configured ->
                contentType == configured || contentType.endsWith(configured)
            } : false
            if (!pathMatch && !typeMatch) {
                return blocked(
                    CONTENT_BLOCKED_MESSAGE,
                    'content',
                    rule,
                    contentPath,
                    contentType
                )
            }
        }
        return [allowed: true]
    }

    boolean isStepAllowedForPackage(String siteId, Map step, String workflowPackageId, String username) {
        return validateMoveToStep(siteId, step, workflowPackageId, username).allowed == true
    }

    private static Map blocked(String message, String ruleType, Map rule, String contentPath = null, String contentType = null) {
        def result = [
            allowed      : false,
            reason       : message,
            userMessage  : message,
            ruleType     : ruleType,
            rule         : rule
        ]
        if (contentPath) {
            result.contentPath = contentPath
        }
        if (contentType) {
            result.contentType = contentType
        }
        return result
    }
}
