package plugins.org.rd.plugin.crafterwf.model

class AuditOperation {

    static final String TASK_CREATED = 'task_created'
    static final String TASK_MODIFIED = 'task_modified'
    static final String PACKAGE_CREATED = 'package_created'
    static final String PACKAGE_STEP_CHANGED = 'package_step_changed'
    static final String PACKAGE_STEP_ACTION = 'package_step_action'
    static final String PACKAGE_MODIFIED = 'package_modified'
    static final String WORKFLOW_BYPASS_ACKNOWLEDGED = 'workflow_bypass_acknowledged'
    static final String WORKFLOW_BYPASS_ACTION = 'workflow_bypass_action'
    static final String RECYCLE_BIN_ITEM_BINNED = 'recycle_bin_item_binned'
    static final String RECYCLE_BIN_ITEM_RESTORED = 'recycle_bin_item_restored'
    static final String RECYCLE_BIN_ITEM_PURGED = 'recycle_bin_item_purged'
}
