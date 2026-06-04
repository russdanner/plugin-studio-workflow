#!/usr/bin/env bash
# Drop the crafter-workflow MariaDB schema (all workflows, packages, comments, etc.).
# Re-create with: scripts/grant-workflow-schema.sh then Project Tools → Crafter Workflow → Install schema.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CRAFTER_AUTHORING="${CRAFTER_AUTHORING:-/home/russdanner/crafter-installs/4-x/craftercms/crafter-authoring}"

MARIADB_HOST="${MARIADB_HOST:-127.0.0.1}"
MARIADB_PORT="${MARIADB_PORT:-33306}"
MARIADB_ROOT_USER="${MARIADB_ROOT_USER:-root}"
MARIADB_ROOT_PASSWD="${MARIADB_ROOT_PASSWD:-root}"
SCHEMA_NAME="${WORKFLOW_SCHEMA_NAME:-crafter-workflow}"

MYSQL_BIN="${CRAFTER_AUTHORING}/bin/dbms/bin/mariadb"
if [[ ! -x "${MYSQL_BIN}" ]]; then
  echo "Error: mariadb client not found at ${MYSQL_BIN}" >&2
  echo "Set CRAFTER_AUTHORING to your crafter-authoring directory." >&2
  exit 1
fi

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  cat <<EOF
Usage: $(basename "$0") [--yes]

Drops the \`${SCHEMA_NAME}\` database and all plugin data.

Environment (same as grant-workflow-schema.sh):
  CRAFTER_AUTHORING   Path to crafter-authoring (default: ${CRAFTER_AUTHORING})
  MARIADB_HOST        Default: ${MARIADB_HOST}
  MARIADB_PORT        Default: ${MARIADB_PORT}
  MARIADB_ROOT_USER   Default: ${MARIADB_ROOT_USER}
  MARIADB_ROOT_PASSWD Default: (root)
  WORKFLOW_SCHEMA_NAME Default: crafter-workflow

After drop, run:
  ${SCRIPT_DIR}/grant-workflow-schema.sh
  Then in Studio: Project Tools → Crafter Workflow → Install schema
EOF
  exit 0
fi

CONFIRM="${1:-}"
if [[ "${CONFIRM}" != "--yes" ]]; then
  echo "This will permanently delete the \`${SCHEMA_NAME}\` database and ALL workflow data."
  read -r -p "Type ${SCHEMA_NAME} to confirm: " typed
  if [[ "${typed}" != "${SCHEMA_NAME}" ]]; then
    echo "Aborted."
    exit 1
  fi
fi

export MYSQL_PWD="${MARIADB_ROOT_PASSWD}"

echo "Dropping schema \`${SCHEMA_NAME}\` on ${MARIADB_HOST}:${MARIADB_PORT} ..."

"${MYSQL_BIN}" -u"${MARIADB_ROOT_USER}" -h"${MARIADB_HOST}" -P"${MARIADB_PORT}" <<SQL
DROP DATABASE IF EXISTS \`${SCHEMA_NAME}\`;
SQL

echo "Done. Schema \`${SCHEMA_NAME}\` dropped."
echo "Reinstall:"
echo "  ${SCRIPT_DIR}/grant-workflow-schema.sh"
echo "  ${SCRIPT_DIR}/install-workflow-schema.sh   # or Install schema in Project Tools"
echo "  ${SCRIPT_DIR}/install-plugin.sh workflow   # deploy latest plugin Groovy"
