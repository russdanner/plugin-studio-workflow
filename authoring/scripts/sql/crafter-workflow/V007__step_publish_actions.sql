ALTER TABLE wf_workflow_step ADD COLUMN action_request_publish_staging TINYINT(1) NOT NULL DEFAULT 0;
ALTER TABLE wf_workflow_step ADD COLUMN action_request_publish_live TINYINT(1) NOT NULL DEFAULT 0;
ALTER TABLE wf_workflow_step ADD COLUMN action_publish_staging TINYINT(1) NOT NULL DEFAULT 0;
ALTER TABLE wf_workflow_step ADD COLUMN action_publish_live TINYINT(1) NOT NULL DEFAULT 0;
