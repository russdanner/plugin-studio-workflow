#!/usr/bin/env bash
# shellcheck shell=bash
#
# Crafter Workflow plugin — curl API test runner.
#
# Usage:
#   ./scripts/tests/run-all.sh [--smoke] [--suite NAME] [--keep-fixtures]
#   RUN_SCHEMA_INSTALL=1 ./scripts/tests/run-all.sh --suite admin
#
set -euo pipefail

TESTS_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# shellcheck source=lib/common.sh
source "${TESTS_ROOT}/lib/common.sh"
# shellcheck source=lib/env.sh
source "${TESTS_ROOT}/lib/env.sh"
# shellcheck source=lib/http.sh
source "${TESTS_ROOT}/lib/http.sh"
# shellcheck source=lib/assert.sh
source "${TESTS_ROOT}/lib/assert.sh"
# shellcheck source=lib/fixtures.sh
source "${TESTS_ROOT}/lib/fixtures.sh"

RUN_SMOKE=0
RUN_SUITE=""
KEEP_FIXTURES=0

usage() {
  cat <<'EOF'
Crafter Workflow API tests (curl + jq)

Usage:
  run-all.sh [options]

Options:
  --smoke          Read-only smoke tests (GET endpoints + auth)
  --suite NAME     Run one suite: auth, read, mutations, negative, cleanup, all
  --keep-fixtures  Skip cleanup suite (leave test package/workflow on site)
  -h, --help       Show this help

Environment:
  STUDIO_URL              Default: http://localhost:8080
  SITE_ID                 Default: workflow
  WORKFLOW_ID             Default: editorial
  WORKFLOW_STEP_ID        Default: backlog
  TEST_CONTENT_PATH       Default: /site/website/index.xml
  CRAFTER_STUDIO_TOKEN    Bearer token (or scripts/.studio-token)
  RUN_SCHEMA_INSTALL=1    Run admin/schema/install (destructive/idempotent)
  RUN_STEP_ACTION_TEST=1  Move package into action step (invokes Studio publish)

Examples:
  ./scripts/tests/run-all.sh --smoke
  SITE_ID=demo ./scripts/tests/run-all.sh --suite mutations
  ./scripts/run-api-tests.sh
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --smoke) RUN_SMOKE=1; shift ;;
    --suite) RUN_SUITE="${2:-}"; shift 2 ;;
    --keep-fixtures) KEEP_FIXTURES=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) printf 'Unknown option: %s\n' "$1" >&2; usage >&2; exit 2 ;;
  esac
done

[[ -z "${RUN_SUITE}" ]] && RUN_SUITE="all"
if [[ "${RUN_SMOKE}" -eq 1 ]]; then
  RUN_SUITE="smoke"
fi

require_cmd curl
require_cmd jq
require_cmd python3

if ! env_load; then
  exit 2
fi

if ! studio_verify_token "${STUDIO_URL}"; then
  exit 2
fi

TEST_CURRENT_TYPE="config"
TEST_CURRENT_SUITE="Configuration"
test_suite_begin "Configuration" "config"
env_print

_cleanup_on_exit() {
  if [[ "${KEEP_FIXTURES:-0}" -eq 1 ]]; then
    return 0
  fi
  if [[ -n "${FIX_PACKAGE_ID:-}" || -n "${FIX_TEMP_WORKFLOW_ID:-}" ]]; then
    fixtures_cleanup || true
  fi
}
trap _cleanup_on_exit EXIT

_suite_type_from_file() {
  local base="$1"
  case "${base}" in
    00-auth) printf 'auth' ;;
    10-read-*|11-read-*|12-read-*) printf 'read' ;;
    20-mutations-*|21-mutations-*|22-mutations-*|23-mutations-*|24-mutations-*|25-mutations-*|26-mutations-*) printf 'mutation' ;;
    30-cleanup) printf 'cleanup' ;;
    90-negative|91-negative-*) printf 'negative' ;;
    *) printf 'general' ;;
  esac
}

_suite_name_from_file() {
  local base="$1"
  case "${base}" in
    00-auth) printf 'Auth & prerequisites' ;;
    10-read-admin) printf 'Read — admin' ;;
    11-read-workflow) printf 'Read — workflow board & packages' ;;
    12-read-comments-tasks-notifications) printf 'Read — comments, tasks, notifications, audit' ;;
    20-mutations-workflow-package) printf 'Mutations — workflow packages' ;;
    21-mutations-comments) printf 'Mutations — comments' ;;
    22-mutations-tasks) printf 'Mutations — tasks' ;;
    23-mutations-notifications) printf 'Mutations — notifications' ;;
    24-mutations-admin) printf 'Mutations — admin workflows' ;;
    25-mutations-workflow-publishing) printf 'Mutations — publishing & step actions' ;;
    26-mutations-content-events) printf 'Mutations — content event listeners' ;;
    30-cleanup) printf 'Cleanup' ;;
    90-negative) printf 'Negative — validation' ;;
    91-negative-content-events) printf 'Negative — content events' ;;
    *) printf '%s' "${base}" ;;
  esac
}

_run_suite_file() {
  local file="$1"
  if [[ ! -f "${file}" ]]; then
    test_fail "suite file exists: ${file}"
    return 1
  fi
  local base
  base="$(basename "${file}" .sh)"
  TEST_CURRENT_TYPE="$(_suite_type_from_file "${base}")"
  TEST_CURRENT_SUITE="$(_suite_name_from_file "${base}")"
  # Do not let set -e abort the runner on assertion failures inside suites.
  set +e
  # shellcheck source=/dev/null
  source "${file}"
  set -e
}

run_auth() { _run_suite_file "${TESTS_ROOT}/suites/00-auth.sh"; }
run_read() {
  _run_suite_file "${TESTS_ROOT}/suites/10-read-admin.sh"
  _run_suite_file "${TESTS_ROOT}/suites/11-read-workflow.sh"
  _run_suite_file "${TESTS_ROOT}/suites/12-read-comments-tasks-notifications.sh"
}
run_mutations() {
  _run_suite_file "${TESTS_ROOT}/suites/20-mutations-workflow-package.sh"
  _run_suite_file "${TESTS_ROOT}/suites/21-mutations-comments.sh"
  _run_suite_file "${TESTS_ROOT}/suites/22-mutations-tasks.sh"
  _run_suite_file "${TESTS_ROOT}/suites/23-mutations-notifications.sh"
  _run_suite_file "${TESTS_ROOT}/suites/24-mutations-admin.sh"
  _run_suite_file "${TESTS_ROOT}/suites/25-mutations-workflow-publishing.sh"
  _run_suite_file "${TESTS_ROOT}/suites/26-mutations-content-events.sh"
}
run_negative() {
  _run_suite_file "${TESTS_ROOT}/suites/90-negative.sh"
  _run_suite_file "${TESTS_ROOT}/suites/91-negative-content-events.sh"
}
run_cleanup() {
  [[ "${KEEP_FIXTURES}" -eq 1 ]] && { test_skip "cleanup suite" "--keep-fixtures"; return 0; }
  _run_suite_file "${TESTS_ROOT}/suites/30-cleanup.sh"
}

case "${RUN_SUITE}" in
  smoke)
    run_auth
    run_read
    ;;
  auth) run_auth ;;
  read) run_auth; run_read ;;
  mutations) run_auth; run_mutations ;;
  negative) run_auth; run_negative ;;
  cleanup) run_cleanup ;;
  admin)
    run_auth
    _run_suite_file "${TESTS_ROOT}/suites/10-read-admin.sh"
    _run_suite_file "${TESTS_ROOT}/suites/24-mutations-admin.sh"
    ;;
  all)
    run_auth
    run_read
    run_mutations
    run_negative
    run_cleanup
    ;;
  *)
    printf 'Unknown suite: %s\n' "${RUN_SUITE}" >&2
    usage >&2
    exit 2
    ;;
esac

test_summary
