-- Reference DDL for crafter-workflow schema V014 (applied by SchemaMigrator.groovy)

ALTER TABLE `crafter-workflow`.wf_recycle_bin_item
  ADD COLUMN original_created_by VARCHAR(255) NULL,
  ADD COLUMN original_sandbox_state VARCHAR(64) NULL,
  ADD COLUMN purged_on DATETIME NULL,
  ADD COLUMN purged_by_user_id BIGINT NULL,
  ADD COLUMN purged_by_username VARCHAR(255) NULL;
