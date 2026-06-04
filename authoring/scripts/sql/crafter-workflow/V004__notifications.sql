-- Replace legacy wf_notification with target-based user notifications.
DROP TABLE IF EXISTS wf_notification;

CREATE TABLE wf_notification (
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
