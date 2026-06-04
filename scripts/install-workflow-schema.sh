#!/usr/bin/env bash
# Apply crafter-workflow DDL directly in MariaDB (bootstrap when Studio auto-migrate is unavailable).
# Prerequisite: scripts/grant-workflow-schema.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PLUGIN_PATH="$(cd "${SCRIPT_DIR}/.." && pwd)"
CRAFTER_AUTHORING="${CRAFTER_AUTHORING:-/home/russdanner/crafter-installs/4-x/craftercms/crafter-authoring}"

MARIADB_HOST="${MARIADB_HOST:-127.0.0.1}"
MARIADB_PORT="${MARIADB_PORT:-33306}"
MARIADB_USER="${MARIADB_USER:-crafter}"
MARIADB_PASSWD="${MARIADB_PASSWD:-crafter}"
SCHEMA_NAME="${WORKFLOW_SCHEMA_NAME:-crafter-workflow}"

SQL_V001="${PLUGIN_PATH}/authoring/scripts/sql/crafter-workflow/V001__initial_schema.sql"
SQL_V003="${PLUGIN_PATH}/authoring/scripts/sql/crafter-workflow/V003__comment_archive.sql"
SQL_V004="${PLUGIN_PATH}/authoring/scripts/sql/crafter-workflow/V004__notifications.sql"
SQL_V005="${PLUGIN_PATH}/authoring/scripts/sql/crafter-workflow/V005__tasks.sql"
MYSQL_BIN="${CRAFTER_AUTHORING}/bin/dbms/bin/mariadb"

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  cat <<EOF
Usage: $(basename "$0")

Creates tables in \`${SCHEMA_NAME}\` from V001 SQL and records schema versions 1–5.
Run ${SCRIPT_DIR}/grant-workflow-schema.sh first if the database does not exist.

Environment:
  CRAFTER_AUTHORING, MARIADB_HOST, MARIADB_PORT, MARIADB_USER, MARIADB_PASSWD
  WORKFLOW_SCHEMA_NAME (default: crafter-workflow)
EOF
  exit 0
fi

if [[ ! -x "${MYSQL_BIN}" ]]; then
  echo "Error: mariadb client not found at ${MYSQL_BIN}" >&2
  exit 1
fi
if [[ ! -f "${SQL_V001}" ]]; then
  echo "Error: ${SQL_V001} not found" >&2
  exit 1
fi

export MYSQL_PWD="${MARIADB_PASSWD}"

echo "Applying V001 schema to \`${SCHEMA_NAME}\` on ${MARIADB_HOST}:${MARIADB_PORT} ..."

"${MYSQL_BIN}" -u"${MARIADB_USER}" -h"${MARIADB_HOST}" -P"${MARIADB_PORT}" "${SCHEMA_NAME}" < "${SQL_V001}"

# Legacy upgrade: migrate wf_workflow_package_comment → wf_comment if present
"${MYSQL_BIN}" -u"${MARIADB_USER}" -h"${MARIADB_HOST}" -P"${MARIADB_PORT}" "${SCHEMA_NAME}" <<'SQL'
SET @legacy := (
  SELECT COUNT(*) FROM information_schema.tables
  WHERE LOWER(table_schema) = LOWER(DATABASE()) AND LOWER(table_name) = 'wf_workflow_package_comment'
);
SET @sql := IF(
  @legacy > 0,
  'INSERT IGNORE INTO wf_comment (id, site_id, target_id, target_type, author_id, author_username, body, created_on, resolved_on, resolved_by, workflow_id, workflow_step_id)
   SELECT id, site_id, workflow_package_id, ''workflow_package'', author_id, author_username, body, created_on, resolved_on, resolved_by, workflow_id, workflow_step_id
   FROM wf_workflow_package_comment',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @drop := IF(
  @legacy > 0,
  'DROP TABLE wf_workflow_package_comment',
  'SELECT 1'
);
PREPARE stmt FROM @drop;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

INSERT IGNORE INTO wf_schema_version (version, description, applied_on) VALUES
  (1, 'Initial workflow schema', NOW()),
  (2, 'Generic comment targets', NOW());
SQL

if [[ -f "${SQL_V003}" ]]; then
  echo "Applying V003 comment archive columns ..."
  "${MYSQL_BIN}" -u"${MARIADB_USER}" -h"${MARIADB_HOST}" -P"${MARIADB_PORT}" "${SCHEMA_NAME}" < "${SQL_V003}"
  "${MYSQL_BIN}" -u"${MARIADB_USER}" -h"${MARIADB_HOST}" -P"${MARIADB_PORT}" "${SCHEMA_NAME}" -e \
    "INSERT IGNORE INTO wf_schema_version (version, description, applied_on) VALUES (3, 'Comment archive support', NOW());"
fi

if [[ -f "${SQL_V004}" ]]; then
  echo "Applying V004 notifications ..."
  "${MYSQL_BIN}" -u"${MARIADB_USER}" -h"${MARIADB_HOST}" -P"${MARIADB_PORT}" "${SCHEMA_NAME}" < "${SQL_V004}"
  "${MYSQL_BIN}" -u"${MARIADB_USER}" -h"${MARIADB_HOST}" -P"${MARIADB_PORT}" "${SCHEMA_NAME}" -e \
    "INSERT IGNORE INTO wf_schema_version (version, description, applied_on) VALUES (4, 'User notifications', NOW());"
fi

if [[ -f "${SQL_V005}" ]]; then
  echo "Applying V005 tasks ..."
  "${MYSQL_BIN}" -u"${MARIADB_USER}" -h"${MARIADB_HOST}" -P"${MARIADB_PORT}" "${SCHEMA_NAME}" < "${SQL_V005}"
  "${MYSQL_BIN}" -u"${MARIADB_USER}" -h"${MARIADB_HOST}" -P"${MARIADB_PORT}" "${SCHEMA_NAME}" -e \
    "INSERT IGNORE INTO wf_schema_version (version, description, applied_on) VALUES (5, 'Workflow tasks', NOW());"
fi

echo "Verifying schema ..."
"${MYSQL_BIN}" -u"${MARIADB_USER}" -h"${MARIADB_HOST}" -P"${MARIADB_PORT}" "${SCHEMA_NAME}" -e \
  "SELECT version, description FROM wf_schema_version ORDER BY version; SHOW COLUMNS FROM wf_task LIKE 'complete_b';"

echo "Done. Reload the workflow board in Studio (plugin reinstall recommended for auto-migrate fixes)."
