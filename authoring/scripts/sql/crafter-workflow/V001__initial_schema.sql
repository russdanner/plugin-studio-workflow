CREATE TABLE IF NOT EXISTS wf_schema_version (
  version INT NOT NULL PRIMARY KEY,
  description VARCHAR(255),
  applied_on DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS wf_workflow (
  id CHAR(36) NOT NULL PRIMARY KEY,
  site_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  background_url VARCHAR(512),
  position INT NOT NULL DEFAULT 0,
  is_default TINYINT(1) NOT NULL DEFAULT 0,
  created_by BIGINT,
  created_on DATETIME NOT NULL,
  modified_by BIGINT,
  modified_on DATETIME NOT NULL,
  INDEX idx_workflow_site (site_id)
);

CREATE TABLE IF NOT EXISTS wf_workflow_step (
  id CHAR(36) NOT NULL PRIMARY KEY,
  workflow_id CHAR(36) NOT NULL,
  site_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  position DECIMAL(20,10) NOT NULL,
  color VARCHAR(64),
  is_terminal TINYINT(1) NOT NULL DEFAULT 0,
  created_on DATETIME NOT NULL,
  modified_on DATETIME NOT NULL,
  INDEX idx_workflow_step_workflow (workflow_id, position)
);

CREATE TABLE IF NOT EXISTS wf_workflow_package (
  id CHAR(36) NOT NULL PRIMARY KEY,
  workflow_id CHAR(36) NOT NULL,
  workflow_step_id CHAR(36) NOT NULL,
  site_id VARCHAR(255) NOT NULL,
  title VARCHAR(512) NOT NULL,
  description TEXT,
  position DECIMAL(20,10) NOT NULL,
  cover_color VARCHAR(64),
  status VARCHAR(16) NOT NULL DEFAULT 'active',
  created_by BIGINT,
  created_on DATETIME NOT NULL,
  modified_by BIGINT,
  modified_on DATETIME NOT NULL,
  closed_on DATETIME,
  INDEX idx_workflow_package_step (workflow_step_id, position),
  INDEX idx_workflow_package_workflow_status (workflow_id, status)
);

CREATE TABLE IF NOT EXISTS wf_workflow_package_content_ref (
  id CHAR(36) NOT NULL PRIMARY KEY,
  workflow_package_id CHAR(36) NOT NULL,
  site_id VARCHAR(255) NOT NULL,
  content_path VARCHAR(1024) NOT NULL,
  display_name VARCHAR(512) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_by BIGINT,
  created_on DATETIME NOT NULL,
  UNIQUE KEY uk_content_ref (workflow_package_id, content_path(255)),
  INDEX idx_content_ref_package (workflow_package_id, sort_order)
);

CREATE TABLE IF NOT EXISTS wf_workflow_package_link (
  id CHAR(36) NOT NULL PRIMARY KEY,
  workflow_package_id CHAR(36) NOT NULL,
  site_id VARCHAR(255) NOT NULL,
  name VARCHAR(512) NOT NULL,
  url VARCHAR(2048) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_on DATETIME NOT NULL,
  INDEX idx_link_package (workflow_package_id, sort_order)
);

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

CREATE TABLE IF NOT EXISTS wf_notification (
  id CHAR(36) NOT NULL PRIMARY KEY,
  site_id VARCHAR(255) NOT NULL,
  user_id BIGINT NOT NULL,
  title VARCHAR(512) NOT NULL,
  message TEXT,
  target_type VARCHAR(64),
  target_id VARCHAR(1024),
  read_b TINYINT(1) NOT NULL DEFAULT 0,
  resolved_b TINYINT(1) NOT NULL DEFAULT 0,
  archived_b TINYINT(1) NOT NULL DEFAULT 0,
  created_on DATETIME NOT NULL,
  modified_on DATETIME NOT NULL,
  INDEX idx_notif_user_list (site_id, user_id, archived_b, created_on),
  INDEX idx_notif_user_unread (site_id, user_id, read_b, archived_b)
);

CREATE TABLE IF NOT EXISTS wf_user_notification_preference (
  site_id VARCHAR(255) NOT NULL,
  user_id BIGINT NOT NULL,
  delivery_mode VARCHAR(32) NOT NULL DEFAULT 'immediate',
  summary_time VARCHAR(16),
  email_enabled TINYINT(1) NOT NULL DEFAULT 1,
  modified_on DATETIME NOT NULL,
  PRIMARY KEY (site_id, user_id)
);
