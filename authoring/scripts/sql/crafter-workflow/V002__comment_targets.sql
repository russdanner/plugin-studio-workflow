-- Migrate package-scoped comments to generic wf_comment targets.
CREATE TABLE IF NOT EXISTS wf_comment (
  id CHAR(36) NOT NULL PRIMARY KEY,
  site_id VARCHAR(255) NOT NULL,
  target_id VARCHAR(1024) NOT NULL,
  target_type VARCHAR(64) NOT NULL,
  author_id BIGINT NOT NULL,
  author_username VARCHAR(255),
  body TEXT NOT NULL,
  created_on DATETIME NOT NULL,
  resolved_on DATETIME,
  resolved_by BIGINT,
  archived_on DATETIME,
  archived_by BIGINT,
  workflow_id CHAR(36),
  workflow_step_id CHAR(36),
  INDEX idx_comment_target (site_id, target_type, target_id(255), created_on),
  INDEX idx_comment_unresolved (site_id, target_type, target_id(255), resolved_on)
);

INSERT INTO wf_comment (
  id, site_id, target_id, target_type, author_id, author_username, body,
  created_on, resolved_on, resolved_by, workflow_id, workflow_step_id
)
SELECT
  id, site_id, workflow_package_id, 'workflow_package', author_id, author_username, body,
  created_on, resolved_on, resolved_by, workflow_id, workflow_step_id
FROM wf_workflow_package_comment;

DROP TABLE IF EXISTS wf_workflow_package_comment;
