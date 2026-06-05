#!/usr/bin/env bash
# shellcheck shell=bash
# Create and tear down entities used by mutation/integration suites.

fixtures_discover_board() {
  api_get workflow/board "workflowId=${WORKFLOW_ID}"
  if [[ ! "${LAST_HTTP_STATUS}" =~ ^2 ]]; then
    test_fail "fixtures: load board" "HTTP ${LAST_HTTP_STATUS}"
    return 1
  fi
  local step
  step="$(api_result_json | jq -r --arg sid "${WORKFLOW_STEP_ID}" '
    .workflowSteps[]? | select(.id == $sid) | .id
  ' | head -n1)"
  if [[ -n "${step}" && "${step}" != "null" ]]; then
    WORKFLOW_STEP_ID="${step}"
    export WORKFLOW_STEP_ID
  fi
  return 0
}

fixtures_create_package() {
  local title="${1:-${TEST_PREFIX} package}"
  api_post workflow-package/create \
    "workflowStepId=${WORKFLOW_STEP_ID}" \
    "title=${title}" \
    "description=created by curl tests"
  if [[ ! "${LAST_HTTP_STATUS}" =~ ^2 ]]; then
    test_fail "fixtures: create package" "HTTP ${LAST_HTTP_STATUS}: $(api_pretty_body)"
    return 1
  fi
  FIX_PACKAGE_ID="$(api_result_json | jq -r '.id // .workflowPackage.id // empty')"
  if [[ -z "${FIX_PACKAGE_ID}" || "${FIX_PACKAGE_ID}" == "null" ]]; then
    test_fail "fixtures: create package" "missing package id in response"
    return 1
  fi
  export FIX_PACKAGE_ID
  test_log "fixture package: ${FIX_PACKAGE_ID}"
  return 0
}

fixtures_archive_package() {
  [[ -n "${FIX_PACKAGE_ID}" ]] || return 0
  api_post workflow-package/archive "workflowPackageId=${FIX_PACKAGE_ID}"
}

fixtures_create_task() {
  local title="${1:-${TEST_PREFIX} task}"
  api_post task/create \
    "title=${title}" \
    "priority=medium" \
    "targetType=workflow_package" \
    "targetId=${FIX_PACKAGE_ID}"
  if [[ ! "${LAST_HTTP_STATUS}" =~ ^2 ]]; then
    test_fail "fixtures: create task" "HTTP ${LAST_HTTP_STATUS}: $(api_pretty_body)"
    return 1
  fi
  FIX_TASK_ID="$(api_result_json | jq -r '.id // empty')"
  export FIX_TASK_ID
  test_log "fixture task: ${FIX_TASK_ID}"
  return 0
}

fixtures_create_comment() {
  local body="${1:-${TEST_PREFIX} comment}"
  api_post comment/create \
    "targetType=workflow_package" \
    "targetId=${FIX_PACKAGE_ID}" \
    "body=${body}"
  if [[ ! "${LAST_HTTP_STATUS}" =~ ^2 ]]; then
    test_fail "fixtures: create comment" "HTTP ${LAST_HTTP_STATUS}: $(api_pretty_body)"
    return 1
  fi
  FIX_COMMENT_ID="$(api_result_json | jq -r '.id // .comment.id // empty')"
  export FIX_COMMENT_ID
  test_log "fixture comment: ${FIX_COMMENT_ID}"
  return 0
}

fixtures_create_notification() {
  local title="${1:-${TEST_PREFIX} notification}"
  api_post notification/create \
    "title=${title}" \
    "message=created by curl tests"
  if [[ ! "${LAST_HTTP_STATUS}" =~ ^2 ]]; then
    test_fail "fixtures: create notification" "HTTP ${LAST_HTTP_STATUS}: $(api_pretty_body)"
    return 1
  fi
  FIX_NOTIFICATION_ID="$(api_result_json | jq -r '.id // .notification.id // empty')"
  export FIX_NOTIFICATION_ID
  test_log "fixture notification: ${FIX_NOTIFICATION_ID}"
  return 0
}

fixtures_create_temp_workflow() {
  api_post admin/workflow/create \
    "name=${TEST_PREFIX}" \
    "description=curl test workflow" \
    "withDefaultSteps=true"
  if [[ ! "${LAST_HTTP_STATUS}" =~ ^2 ]]; then
    test_fail "fixtures: create temp workflow" "HTTP ${LAST_HTTP_STATUS}: $(api_pretty_body)"
    return 1
  fi
  FIX_TEMP_WORKFLOW_ID="$(api_result_json | jq -r '.workflow.id // empty')"
  export FIX_TEMP_WORKFLOW_ID
  test_log "fixture workflow: ${FIX_TEMP_WORKFLOW_ID}"
  return 0
}

fixtures_delete_temp_workflow() {
  [[ -n "${FIX_TEMP_WORKFLOW_ID}" ]] || return 0
  api_delete admin/workflow/delete "workflowId=${FIX_TEMP_WORKFLOW_ID}"
}

fixtures_cleanup() {
  local failed=0
  fixtures_archive_package || failed=1
  fixtures_delete_temp_workflow || failed=1
  FIX_PACKAGE_ID=""
  FIX_TEMP_WORKFLOW_ID=""
  export FIX_PACKAGE_ID FIX_TEMP_WORKFLOW_ID
  return "${failed}"
}
