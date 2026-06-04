#!/usr/bin/env bash
# Grant Studio's JDBC user access to the crafter-workflow schema (one-time per MariaDB instance).
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CRAFTER_AUTHORING="${CRAFTER_AUTHORING:-/home/russdanner/crafter-installs/4-x/craftercms/crafter-authoring}"

MARIADB_HOST="${MARIADB_HOST:-127.0.0.1}"
MARIADB_PORT="${MARIADB_PORT:-33306}"
MARIADB_ROOT_USER="${MARIADB_ROOT_USER:-root}"
MARIADB_ROOT_PASSWD="${MARIADB_ROOT_PASSWD:-root}"
MARIADB_USER="${MARIADB_USER:-crafter}"

MYSQL_BIN="${CRAFTER_AUTHORING}/bin/dbms/bin/mariadb"
if [[ ! -x "${MYSQL_BIN}" ]]; then
  echo "Error: mariadb client not found at ${MYSQL_BIN}" >&2
  echo "Set CRAFTER_AUTHORING to your crafter-authoring directory." >&2
  exit 1
fi

export MYSQL_PWD="${MARIADB_ROOT_PASSWD}"

echo "Creating schema crafter-workflow and granting ${MARIADB_USER}@${MARIADB_HOST} ..."

"${MYSQL_BIN}" -u"${MARIADB_ROOT_USER}" -h"${MARIADB_HOST}" -P"${MARIADB_PORT}" <<SQL
CREATE DATABASE IF NOT EXISTS \`crafter-workflow\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON \`crafter-workflow\`.* TO '${MARIADB_USER}'@'localhost';
FLUSH PRIVILEGES;
SQL

export MYSQL_PWD="${MARIADB_PASSWD:-crafter}"
"${MYSQL_BIN}" -u"${MARIADB_USER}" -h"${MARIADB_HOST}" -P"${MARIADB_PORT}" -e "USE \`crafter-workflow\`; SELECT 'OK: crafter can use crafter-workflow' AS status;"

echo "Done. Retry Install in Project Tools → Crafter Workflow → General."
