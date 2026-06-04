ALTER TABLE wf_workflow_package ADD COLUMN due_on DATETIME NULL;
CREATE INDEX idx_workflow_package_due ON wf_workflow_package (site_id, status, due_on);
