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

    def execute() {
        def op = contentLifecycleParams?.contentLifecycleOperation
        def site = contentLifecycleParams?.site
        def path = contentLifecycleParams?.path
        System.out.println("[crafterwf] CommonLifecycleApi op=${op} site=${site} path=${path}")

        if (contentLifecycleParams.contentLifecycleOperation == "COPY") {
            onCopy(contentLifecycleParams.site, contentLifecycleParams.path)
        } else if (contentLifecycleParams.contentLifecycleOperation == "DELETE") {
            onDelete(contentLifecycleParams.site, contentLifecycleParams.path)
        } else if (contentLifecycleParams.contentLifecycleOperation == "DUPLICATE") {
            onDuplicate(contentLifecycleParams.site, contentLifecycleParams.path)
        } else if (contentLifecycleParams.contentLifecycleOperation == "NEW") {
            onNew(contentLifecycleParams.site, contentLifecycleParams.path)
        } else if (contentLifecycleParams.contentLifecycleOperation == "RENAME") {
            onRename(contentLifecycleParams.site, contentLifecycleParams.path)
        } else if (contentLifecycleParams.contentLifecycleOperation == "REVERT") {
            onRevert(contentLifecycleParams.site, contentLifecycleParams.path)
        } else if (contentLifecycleParams.contentLifecycleOperation == "UPDATE") {
            onUpdate(contentLifecycleParams.site, contentLifecycleParams.path)
        } else {
            logger.info("Unknown operation '{}' on site '{}' path '{}'",
                    contentLifecycleParams.contentLifecycleOperation,
                    contentLifecycleParams.site,
                    contentLifecycleParams.path)
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
            System.out.println(
                "[crafterwf] CommonLifecycleApi bridge failed path=${contentLifecycleParams?.path}: ${e.message}"
            )
            logger.warn(
                "Crafterwf workflow bridge failed for {}: {}",
                contentLifecycleParams?.path, e.message, e
            )
        }
    }
}
