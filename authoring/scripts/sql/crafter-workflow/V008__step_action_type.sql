ALTER TABLE wf_workflow_step ADD COLUMN step_action_type VARCHAR(64) NULL;
ALTER TABLE wf_workflow_step ADD COLUMN step_action_success_step_id CHAR(36) NULL;

UPDATE wf_workflow_step SET step_action_type = 'request_publish_staging'
  WHERE action_request_publish_staging = 1 AND (step_action_type IS NULL OR step_action_type = '');
UPDATE wf_workflow_step SET step_action_type = 'request_publish_live'
  WHERE action_request_publish_live = 1 AND (step_action_type IS NULL OR step_action_type = '');
UPDATE wf_workflow_step SET step_action_type = 'publish_staging'
  WHERE action_publish_staging = 1 AND (step_action_type IS NULL OR step_action_type = '');
UPDATE wf_workflow_step SET step_action_type = 'publish_live'
  WHERE action_publish_live = 1 AND (step_action_type IS NULL OR step_action_type = '');
