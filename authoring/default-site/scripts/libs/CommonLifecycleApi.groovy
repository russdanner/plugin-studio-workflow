/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * Crafter Workflow plugin: extended copy — invokes workflow content event listeners from execute().
 * Installed to Studio default-site/scripts/libs by scripts/install-plugin.sh (authoring restart required).
 */

package scripts.libs

import org.slf4j.LoggerFactory

class CommonLifecycleApi {
    static logger = LoggerFactory.getLogger(CommonLifecycleApi.class)
    def contentLifecycleParams

    CommonLifecycleApi(params) {
        contentLifecycleParams = params
    }

    def onCopy(site, path) {
        logger.debug("Run copy operation event on site '{}' path '{}'", site, path)
    }

    def onDelete(site, path) {
        logger.debug("Run delete operation event on site '{}' path '{}'", site, path)
    }

    def onDuplicate(site, path) {
        logger.debug("Run duplicate operation event on site '{}' path '{}'", site, path)
    }

    def onNew(site, path) {
        logger.debug("Run new operation event on site '{}' path '{}'", site, path)
    }

    def onRename(site, path) {
        logger.debug("Run rename operation event on site '{}' path '{}'", site, path)
    }

    def onRevert(site, path) {
        logger.debug("Run revert operation event on site '{}' path '{}'", site, path)
    }

    def onUpdate(site, path) {
        logger.debug("Run update operation event on site '{}' path '{}'", site, path)
    }

    private static String operationName(def contentLifecycleOperation) {
        if (!contentLifecycleOperation) {
            return null
        }
        try {
            if (contentLifecycleOperation.metaClass?.respondsTo(contentLifecycleOperation, 'name')) {
                return contentLifecycleOperation.name()?.toString()?.trim()?.toUpperCase()
            }
        } catch (Exception ignored) {
        }
        return contentLifecycleOperation?.toString()?.trim()?.toUpperCase()
    }

    def execute() {
        def op = contentLifecycleParams?.contentLifecycleOperation
        def site = contentLifecycleParams?.site
        def path = contentLifecycleParams?.path
        def opName = operationName(op)
        logger.info("[crafterwf] CommonLifecycleApi op={} site={} path={}", op, site, path)

        switch (opName) {
            case 'COPY':
                onCopy(contentLifecycleParams.site, contentLifecycleParams.path)
                break
            case 'DELETE':
                onDelete(contentLifecycleParams.site, contentLifecycleParams.path)
                break
            case 'DUPLICATE':
                onDuplicate(contentLifecycleParams.site, contentLifecycleParams.path)
                break
            case 'NEW':
                onNew(contentLifecycleParams.site, contentLifecycleParams.path)
                break
            case 'RENAME':
                onRename(contentLifecycleParams.site, contentLifecycleParams.path)
                break
            case 'REVERT':
                onRevert(contentLifecycleParams.site, contentLifecycleParams.path)
                break
            case 'UPDATE':
                onUpdate(contentLifecycleParams.site, contentLifecycleParams.path)
                break
            default:
                logger.info("Unknown operation '{}' on site '{}' path '{}'", op, site, path)
        }

        invokeWorkflowBridge()
    }

    private void invokeWorkflowBridge() {
        try {
            CrafterwfWorkflowLifecycleBridge.handle(
                contentLifecycleParams?.applicationContext,
                contentLifecycleParams?.site as String,
                contentLifecycleParams?.path as String,
                contentLifecycleParams?.contentType as String,
                contentLifecycleParams?.contentLifecycleOperation,
                contentLifecycleParams?.user
            )
        } catch (Exception e) {
            logger.warn(
                "[crafterwf] CommonLifecycleApi bridge failed path={}: {}",
                contentLifecycleParams?.path, e.message, e
            )
        }
    }
}
