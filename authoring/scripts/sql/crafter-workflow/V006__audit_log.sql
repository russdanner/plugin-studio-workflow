-- Audit log for workflow, package, and task actions.
CREATE TABLE IF NOT EXISTS wf_audit_log (
  id CHAR(36) NOT NULL PRIMARY KEY,
  site_id VARCHAR(255) NOT NULL,
  user_id BIGINT,
  username VARCHAR(255) NOT NULL,
  operation VARCHAR(64) NOT NULL,
  target_type VARCHAR(64) NOT NULL,
  target_id VARCHAR(1024) NOT NULL,
  note TEXT,
  created_on DATETIME NOT NULL,
  INDEX idx_audit_site_created (site_id, created_on DESC),
  INDEX idx_audit_target (site_id, target_type, target_id(255), created_on),
  INDEX idx_audit_user (site_id, username, created_on),
  INDEX idx_audit_operation (site_id, operation, created_on)
);
