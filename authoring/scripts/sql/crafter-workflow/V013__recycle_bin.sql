-- Reference DDL for crafter-workflow schema V013 (applied by SchemaMigrator.groovy)

CREATE TABLE IF NOT EXISTS `crafter-workflow`.wf_recycle_bin_item (
  id CHAR(36) NOT NULL PRIMARY KEY,
  site_id VARCHAR(255) NOT NULL,
  bin_path VARCHAR(1024) NOT NULL,
  internal_name VARCHAR(512) NULL,
  original_path VARCHAR(1024) NOT NULL,
  original_last_modifier VARCHAR(255) NULL,
  original_modified_on DATETIME NULL,
  original_created_on DATETIME NULL,
  state VARCHAR(32) NOT NULL DEFAULT 'binned',
  binned_on DATETIME NOT NULL,
  binned_by_user_id BIGINT NOT NULL,
  binned_by_username VARCHAR(255) NOT NULL,
  restored_on DATETIME NULL,
  restored_by_user_id BIGINT NULL,
  restored_by_username VARCHAR(255) NULL,
  KEY idx_recycle_bin_site_state (site_id, state),
  KEY idx_recycle_bin_original (site_id, original_path(255))
);
