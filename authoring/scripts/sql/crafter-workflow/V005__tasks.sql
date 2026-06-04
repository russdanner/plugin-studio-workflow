-- Workflow tasks linked to arbitrary targets.
CREATE TABLE IF NOT EXISTS wf_task (
  id CHAR(36) NOT NULL PRIMARY KEY,
  site_id VARCHAR(255) NOT NULL,
  title VARCHAR(512) NOT NULL,
  priority VARCHAR(16) NOT NULL DEFAULT 'medium',
  assignee_id BIGINT NOT NULL,
  assignee_username VARCHAR(255),
  due_on DATETIME NULL,
  complete_b TINYINT(1) NOT NULL DEFAULT 0,
  archived_b TINYINT(1) NOT NULL DEFAULT 0,
  target_type VARCHAR(64),
  target_id VARCHAR(1024),
  created_on DATETIME NOT NULL,
  modified_on DATETIME NOT NULL,
  completed_on DATETIME NULL,
  INDEX idx_task_assignee (site_id, assignee_id, archived_b, complete_b, due_on),
  INDEX idx_task_target (site_id, target_type, target_id(255), archived_b)
);
