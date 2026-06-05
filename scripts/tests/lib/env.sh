#!/usr/bin/env bash
# shellcheck shell=bash
# Environment defaults for Crafter Workflow API tests.

TESTS_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPTS_ROOT="$(cd "${TESTS_ROOT}/.." && pwd)"

# shellcheck source=../../lib/studio-auth.sh
source "${SCRIPTS_ROOT}/lib/studio-auth.sh"

STUDIO_URL="${STUDIO_URL:-http://localhost:8080}"
STUDIO_URL="${STUDIO_URL%/}"
SITE_ID="${SITE_ID:-workflow}"
WORKFLOW_ID="${WORKFLOW_ID:-editorial}"
WORKFLOW_STEP_ID="${WORKFLOW_STEP_ID:-backlog}"
TEST_CONTENT_PATH="${TEST_CONTENT_PATH:-/site/website/index.xml}"
TEST_RUN_ID="${TEST_RUN_ID:-$(date +%Y%m%d%H%M%S)}"
TEST_PREFIX="${TEST_PREFIX:-curl-test-${TEST_RUN_ID}}"

PLUGIN_API_BASE="/studio/api/2/plugin/script/plugins/org/rd/plugin/crafterwf/crafterwf"

# Populated by fixtures during mutation/integration suites.
FIX_PACKAGE_ID=""
FIX_TASK_ID=""
FIX_COMMENT_ID=""
FIX_NOTIFICATION_ID=""
FIX_TEMP_WORKFLOW_ID=""

env_load() {
  studio_load_token
  if [[ -z "${CRAFTER_STUDIO_TOKEN:-}" ]]; then
    printf 'Error: CRAFTER_STUDIO_TOKEN is required. Set env or scripts/.studio-token\n' >&2
    return 2
  fi
  export STUDIO_URL SITE_ID WORKFLOW_ID WORKFLOW_STEP_ID TEST_CONTENT_PATH TEST_RUN_ID TEST_PREFIX
  export PLUGIN_API_BASE
  return 0
}

env_print() {
  test_log "Studio URL : ${STUDIO_URL}"
  test_log "Site ID    : ${SITE_ID}"
  test_log "Workflow   : ${WORKFLOW_ID} (step ${WORKFLOW_STEP_ID})"
  test_log "Run ID     : ${TEST_RUN_ID}"
}
