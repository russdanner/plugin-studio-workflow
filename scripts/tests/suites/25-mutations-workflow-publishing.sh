#!/usr/bin/env bash
# shellcheck shell=bash
# Publishing-related API: targets + optional step-action move (opt-in).

test_suite_begin "Mutations — workflow publishing"

api_get admin/publishing/targets
assert_http_2xx "GET admin/publishing/targets"
assert_result_has "publishing targets has live" 'has("live")'

if [[ "${RUN_STEP_ACTION_TEST:-}" != "1" ]]; then
  test_skip "POST workflow-package/move (step publish action)" "set RUN_STEP_ACTION_TEST=1 to run (invokes Studio publish)"
  return 0
fi

fixtures_discover_board || return 0
fixtures_create_package || return 0

api_post workflow-package/attach-content \
  "workflowPackageId=${FIX_PACKAGE_ID}" \
  "contentPath=${TEST_CONTENT_PATH}" \
  "displayName=Step action curl test"
assert_http_2xx "POST workflow-package/attach-content (step action fixture)"

# Find a step with a non-none actionType on the configured workflow.
api_get workflow/board "workflowId=${WORKFLOW_ID}"
action_step="$(api_result_json | jq -r '
  .workflowSteps[]? | select(.actionType != null and .actionType != "" and .actionType != "none") | .id
' | head -n1)"

if [[ -z "${action_step}" || "${action_step}" == "null" ]]; then
  test_skip "POST workflow-package/move (step publish action)" "no action step on workflow ${WORKFLOW_ID}"
  return 0
fi

api_post workflow-package/move \
  "workflowPackageId=${FIX_PACKAGE_ID}" \
  "workflowId=${WORKFLOW_ID}" \
  "workflowStepId=${action_step}" \
  "index=0"
assert_http_2xx "POST workflow-package/move (into action step)"
assert_result_has "move response documents step action outcome" \
  '(has("stepActionFailed") or has("stepActionSucceeded") or has("moveBlocked"))'
