ALTER TABLE wf_workflow_step ADD COLUMN role_rule_mode VARCHAR(16) NOT NULL DEFAULT 'all';
ALTER TABLE wf_workflow_step ADD COLUMN role_rule_roles TEXT NULL;
ALTER TABLE wf_workflow_step ADD COLUMN content_rule_mode VARCHAR(16) NOT NULL DEFAULT 'all';
ALTER TABLE wf_workflow_step ADD COLUMN content_rule_paths TEXT NULL;
ALTER TABLE wf_workflow_step ADD COLUMN content_rule_types TEXT NULL;

ALTER TABLE wf_workflow_package_content_ref ADD COLUMN content_type VARCHAR(255) NULL;
