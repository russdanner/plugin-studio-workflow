#!/usr/bin/env bash
# shellcheck shell=bash

test_suite_begin "Mutations — workflow packages"

fixtures_discover_board || return 0
fixtures_create_package || return 0

api_post workflow-package/update-title \
  "workflowPackageId=${FIX_PACKAGE_ID}" \
  "title=${TEST_PREFIX} updated"
assert_http_2xx "POST workflow-package/update-title"

api_post workflow-package/update-description \
  "workflowPackageId=${FIX_PACKAGE_ID}" \
  "description=updated by curl tests"
assert_http_2xx "POST workflow-package/update-description"

api_post workflow-package/update-due-on \
  "workflowPackageId=${FIX_PACKAGE_ID}" \
  "dueOn=2030-06-15"
assert_http_2xx "POST workflow-package/update-due-on"

api_post workflow-package/attach-content \
  "workflowPackageId=${FIX_PACKAGE_ID}" \
  "contentPath=${TEST_CONTENT_PATH}" \
  "displayName=Curl test content"
assert_http_2xx "POST workflow-package/attach-content"

api_get workflow-bypass/check \
  "contentPaths=${TEST_CONTENT_PATH}" \
  "action=publish"
assert_http_2xx "GET workflow-bypass/check (attached content)"
assert_result_has "bypass check has requiresAcknowledgement" 'has("requiresAcknowledgement")'
assert_result_has "bypass check has violations array" '(.violations | type) == "array"'

api_get workflow-package/get "workflowPackageId=${FIX_PACKAGE_ID}"
assert_http_2xx "GET workflow-package/get (after attach)"
assert_result_has "package has content refs" '(.contentRefs | length) >= 1'

api_get workflow-package/get "workflowPackageId=${FIX_PACKAGE_ID}"
assert_http_2xx "GET workflow-package/get"
assert_result_has "package get has workflowPackage" '.workflowPackage.id != null'

api_get workflow-package/details "workflowPackageId=${FIX_PACKAGE_ID}"
assert_http_2xx "GET workflow-package/details"
assert_result_has "package details has attachments" 'has("attachments")'

attachment_id="$(api_result_json | jq -r '(.attachments[0].id // empty)')"
if [[ -z "${attachment_id}" || "${attachment_id}" == "null" ]]; then
  api_get workflow-package/get "workflowPackageId=${FIX_PACKAGE_ID}"
  attachment_id="$(api_result_json | jq -r '(.contentRefs[0].id // empty)')"
fi
if [[ -n "${attachment_id}" && "${attachment_id}" != "null" ]]; then
  api_post workflow-package/remove-attachment \
    "workflowPackageId=${FIX_PACKAGE_ID}" \
    "attachmentId=${attachment_id}" \
    "attachmentType=content"
  assert_http_2xx "POST workflow-package/remove-attachment"
else
  test_skip "POST workflow-package/remove-attachment" "no attachment id from attach"
fi

# Move to in-progress if it exists on the board.
api_get workflow/board "workflowId=${WORKFLOW_ID}"
local_step="$(api_result_json | jq -r '.workflowSteps[1].id // empty')"
if [[ -n "${local_step}" && "${local_step}" != "null" ]]; then
  api_post workflow-package/move \
    "workflowPackageId=${FIX_PACKAGE_ID}" \
    "workflowId=${WORKFLOW_ID}" \
    "workflowStepId=${local_step}" \
    "index=0"
  assert_http_2xx "POST workflow-package/move"
fi
