package plugins.org.rd.plugin.crafterwf.service

import org.craftercms.commons.mail.EmailUtils
import org.craftercms.commons.mail.impl.EmailFactoryImpl
import org.slf4j.LoggerFactory
import plugins.org.rd.plugin.crafterwf.dao.NotificationPreferenceDao
import plugins.org.rd.plugin.crafterwf.model.CommentTargetType
import plugins.org.rd.plugin.crafterwf.util.WorkflowBeanLookup

class NotificationEmailService {

    private static final def LOGGER = LoggerFactory.getLogger(NotificationEmailService)
    private static final String MODE_IMMEDIATE = 'immediate'
    private static final String FROM_NAME = 'Crafter Workflow'
    private static final String MAIL_FROM_KEY = 'studio.mail.from.default'
    private static final String MAIL_SMTP_AUTH_KEY = 'studio.mail.smtp.auth'

    private final def applicationContext
    private final NotificationPreferenceDao preferenceDao

    NotificationEmailService(def applicationContext, NotificationPreferenceDao preferenceDao) {
        this.applicationContext = applicationContext
        this.preferenceDao = preferenceDao
    }

    void maybeSendNotificationEmail(String siteId, Long userId, Map notification) {
        def notificationId = notification?.id
        def title = notification?.title?.toString()?.trim()
        def targetType = notification?.targetType
        def targetId = notification?.targetId

        if (!siteId || userId == null || userId <= 0L || !notification) {
            LOGGER.info(
                '[crafterwf] Workflow notification email skipped — invalid args site={} userId={} notificationId={}',
                siteId, userId, notificationId
            )
            return
        }

        LOGGER.info(
            '[crafterwf] Evaluating workflow notification email (plugin direct SMTP, NOT Studio EmailMessageSender): ' +
            'site={} userId={} notificationId={} title="{}" targetType={} targetId={}',
            siteId, userId, notificationId, title, targetType, targetId
        )

        def preference = preferenceDao.find(siteId, userId)
        if (!isTrue(preference.email_enabled)) {
            LOGGER.info(
                '[crafterwf] Workflow notification email skipped — email disabled in user prefs site={} userId={} notificationId={}',
                siteId, userId, notificationId
            )
            return
        }
        def deliveryMode = preference.delivery_mode?.toString() ?: MODE_IMMEDIATE
        if (deliveryMode != MODE_IMMEDIATE) {
            LOGGER.info(
                '[crafterwf] Workflow notification email skipped — deliveryMode={} (only immediate sends email) site={} userId={} notificationId={}',
                deliveryMode, siteId, userId, notificationId
            )
            return
        }

        def recipientEmail = resolveUserEmail(userId)
        if (!isValidRecipientEmail(recipientEmail)) {
            LOGGER.warn(
                '[crafterwf] Workflow notification email skipped — no valid email on Studio user profile site={} userId={} notificationId={}',
                siteId, userId, notificationId
            )
            return
        }

        def subject = title
        if (!subject) {
            LOGGER.info(
                '[crafterwf] Workflow notification email skipped — empty title site={} userId={} notificationId={}',
                siteId, userId, notificationId
            )
            return
        }
        if (!subject.startsWith('[Crafter Workflow]')) {
            subject = "[Crafter Workflow] ${subject}"
        }

        def fromAddress = resolveFromAddress()
        if (!isValidRecipientEmail(fromAddress)) {
            LOGGER.warn(
                '[crafterwf] Workflow notification email skipped — studio.mail.from.default is missing or invalid site={} userId={} notificationId={}',
                siteId, userId, notificationId
            )
            return
        }

        def mailSender = resolveMailSender()
        if (!mailSender) {
            LOGGER.warn(
                '[crafterwf] Workflow notification email skipped — mailSender bean not available site={} userId={} notificationId={}',
                siteId, userId, notificationId
            )
            return
        }

        def openUrl = buildOpenUrl(siteId, notification)
        def htmlBody = buildHtmlBody(siteId, notification, openUrl)
        LOGGER.info(
            '[crafterwf] Sending workflow notification email via direct SMTP: from={} to={} userId={} site={} notificationId={} subject="{}" openUrl={}',
            fromAddress, recipientEmail, userId, siteId, notificationId, subject, openUrl
        )
        try {
            def emailFactory = new EmailFactoryImpl(mailSender)
            def email = emailFactory.getEmail(
                fromAddress,
                [recipientEmail] as String[],
                null,
                null,
                subject,
                htmlBody,
                true
            )
            email.send()
            LOGGER.info(
                '[crafterwf] Workflow notification email sent successfully: to={} userId={} site={} notificationId={}',
                recipientEmail, userId, siteId, notificationId
            )
        } catch (Exception e) {
            LOGGER.error(
                '[crafterwf] Workflow notification email send failed: to={} userId={} site={} notificationId={} error={}',
                recipientEmail, userId, siteId, notificationId, e.message, e
            )
        }
    }

    private String resolveFromAddress() {
        def studioConfiguration = WorkflowBeanLookup.resolve(applicationContext, 'studioConfiguration')
        if (!studioConfiguration) {
            return null
        }
        try {
            return normalizeEmail(studioConfiguration.getProperty(MAIL_FROM_KEY))
        } catch (Exception e) {
            LOGGER.trace('resolveFromAddress failed: {}', e.message)
            return null
        }
    }

    private Object resolveMailSender() {
        def studioConfiguration = WorkflowBeanLookup.resolve(applicationContext, 'studioConfiguration')
        def useAuth = false
        if (studioConfiguration) {
            try {
                useAuth = isTrue(studioConfiguration.getProperty(MAIL_SMTP_AUTH_KEY))
            } catch (Exception ignored) {
            }
        }
        if (useAuth) {
            return WorkflowBeanLookup.resolve(applicationContext, 'mailSender')
        }
        def noAuth = WorkflowBeanLookup.resolve(applicationContext, 'mailSenderNoAuth')
        return noAuth ?: WorkflowBeanLookup.resolve(applicationContext, 'mailSender')
    }

    private String resolveUserEmail(Long userId) {
        if (userId == null || userId <= 0L) {
            return null
        }
        try {
            def user = lookupUser(userId)
            def email = normalizeEmail(user?.email)
            if (!email && user?.username) {
                email = emailFromUserProfile(user.username.toString().trim())
            }
            return isValidRecipientEmail(email) ? email : null
        } catch (Exception e) {
            LOGGER.trace('resolveUserEmail failed for userId {}: {}', userId, e.message)
        }
        return null
    }

    private Object lookupUser(Long userId) {
        def userService = WorkflowBeanLookup.resolve(applicationContext, 'userService')
        if (!userService) {
            userService = WorkflowBeanLookup.resolve(applicationContext, 'userServiceInternal')
        }
        if (!userService) {
            return null
        }
        def user = userService.getUserByIdOrUsername(userId, null)
        if (!user) {
            user = userService.getUserByIdOrUsername(userId, '')
        }
        return user
    }

    private String emailFromUserProfile(String username) {
        if (!username) {
            return null
        }
        def securityService = WorkflowBeanLookup.resolve(applicationContext, 'securityService')
        if (!securityService) {
            return null
        }
        try {
            def profile = securityService.getUserProfile(username)
            if (!profile) {
                return null
            }
            def email = normalizeEmail(profile.email)
            if (!email && profile instanceof Map) {
                email = normalizeEmail(profile.get('email'))
            }
            return email
        } catch (Exception e) {
            LOGGER.trace('getUserProfile failed for {}: {}', username, e.message)
            return null
        }
    }

    private static String normalizeEmail(def value) {
        def email = value?.toString()?.trim()
        return email ?: null
    }

    private static boolean isValidRecipientEmail(String email) {
        def normalized = normalizeEmail(email)
        return normalized && EmailUtils.validateEmail(normalized)
    }

    private String buildOpenUrl(String siteId, Map notification) {
        def authoringUrl = resolveAuthoringUrl(siteId)
        if (!authoringUrl) {
            return null
        }
        def base = authoringUrl.replaceAll(/\/+$/, '')
        def targetType = notification.targetType?.toString()
        def targetId = notification.targetId?.toString()
        def page = '/'
        if (CommentTargetType.CONTENT == targetType && targetId) {
            page = contentPathToPreviewPage(targetId)
        }
        return "${base}/studio/preview#/?page=${encode(page)}&site=${encode(siteId)}"
    }

    /**
     * Maps a sandbox content path to the Studio preview {@code page} query param
     * (same rules as crafterwf-app preview handler).
     */
    private static String contentPathToPreviewPage(String contentPath) {
        if (!contentPath?.trim()) {
            return '/'
        }
        def path = contentPath.trim()
        if (!path.startsWith('/site/website/')) {
            return '/'
        }
        def page = path.replaceFirst('^/site/website/', '')
        page = page.replace('/index.xml', '')
        page = page.replace('.xml', '.html')
        if (!page?.trim()) {
            return '/'
        }
        page.startsWith('/') ? page : "/${page}"
    }

    private String resolveAuthoringUrl(String siteId) {
        try {
            def servicesConfig = WorkflowBeanLookup.resolve(applicationContext, 'cstudioServicesConfig')
            if (servicesConfig) {
                def url = servicesConfig.getAuthoringUrl(siteId)
                if (url?.trim()) {
                    return url.trim()
                }
            }
        } catch (Exception e) {
            LOGGER.trace('getAuthoringUrl failed for site {}: {}', siteId, e.message)
        }
        return null
    }

    private static String buildHtmlBody(String siteId, Map notification, String openUrl) {
        def title = escapeHtml(notification.title?.toString() ?: 'Workflow notification')
        def message = escapeHtml(notification.message?.toString() ?: '')
        def targetLine = buildTargetLine(notification)
        def openButton = openUrl ?
            "<p style=\"margin:24px 0 0;\"><a href=\"${escapeHtml(openUrl)}\" " +
            'style="display:inline-block;padding:10px 18px;background:#1976d2;color:#ffffff;' +
            'text-decoration:none;border-radius:4px;font-weight:600;">Open in Crafter Studio</a></p>' :
            ''

        return """<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:8px;padding:32px;max-width:600px;">
        <tr><td>
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#666;">Crafter Workflow · ${escapeHtml(siteId)}</p>
          <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#111;">${title}</h1>
          ${message ? "<p style=\"margin:0 0 16px;font-size:15px;line-height:1.5;color:#333;white-space:pre-wrap;\">${message}</p>" : ''}
          ${targetLine}
          ${openButton}
          <p style="margin:24px 0 0;font-size:12px;line-height:1.5;color:#888;">You received this because email notifications are enabled for your Crafter Workflow inbox on this site.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>"""
    }

    private static String buildTargetLine(Map notification) {
        def targetType = notification.targetType?.toString()
        def targetId = notification.targetId?.toString()
        if (!targetType || !targetId) {
            return ''
        }
        def label = targetTypeLabel(targetType)
        def display = escapeHtml(notification.targetTitle?.toString() ?: targetId)
        return "<p style=\"margin:0 0 8px;font-size:14px;color:#555;\"><strong>${label}:</strong> ${display}</p>"
    }

    private static String targetTypeLabel(String targetType) {
        switch (targetType) {
            case CommentTargetType.CONTENT: return 'Content'
            case CommentTargetType.WORKFLOW_PACKAGE: return 'Workflow package'
            case 'task': return 'Task'
            default: return 'Related item'
        }
    }

    private static String escapeHtml(String value) {
        if (!value) {
            return ''
        }
        return value
            .replace('&', '&amp;')
            .replace('<', '&lt;')
            .replace('>', '&gt;')
            .replace('"', '&quot;')
    }

    private static String encode(String value) {
        if (!value) {
            return ''
        }
        return java.net.URLEncoder.encode(value, 'UTF-8')
    }

    private static boolean isTrue(value) {
        if (value instanceof Boolean) {
            return value
        }
        if (value instanceof Number) {
            return (value as int) != 0
        }
        return value == true || value == 'true' || value == '1'
    }
}
