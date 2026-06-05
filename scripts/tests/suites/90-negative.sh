#!/usr/bin/env bash
# shellcheck shell=bash

test_suite_begin "Negative — validation"

# Missing siteId
LAST_HTTP_BODY="$(curl --silent --show-error \
  --header "Authorization: Bearer ${CRAFTER_STUDIO_TOKEN}" \
  --write-out '%{http_code}' \
  --output - \
  "${STUDIO_URL}${PLUGIN_API_BASE}/workflow/board.json?workflowId=${WORKFLOW_ID}")"
LAST_HTTP_STATUS="${LAST_HTTP_BODY: -3}"
LAST_HTTP_BODY="${LAST_HTTP_BODY::-3}"
if [[ "${LAST_HTTP_STATUS}" =~ ^[45] ]]; then
  test_pass "GET workflow/board without siteId is rejected"
else
  test_fail "GET workflow/board without siteId is rejected" "got HTTP ${LAST_HTTP_STATUS}"
fi

api_get workflow-package/get "workflowPackageId=00000000-0000-0000-0000-000000000000"
if [[ ! "${LAST_HTTP_STATUS}" =~ ^2 ]]; then
  test_pass "GET workflow-package/get invalid id returns error status"
else
  # Some stacks return 200 with error payload — accept either.
  if api_response_code | grep -qE '^(4|5)'; then
    test_pass "GET workflow-package/get invalid id returns error payload"
  else
    test_fail "GET workflow-package/get invalid id" "expected error, got $(api_pretty_body)"
  fi
fi

api_post task/create "title="
if [[ ! "${LAST_HTTP_STATUS}" =~ ^2 ]]; then
  test_pass "POST task/create missing title rejected"
else
  test_fail "POST task/create missing title rejected" "got HTTP ${LAST_HTTP_STATUS}"
fi
