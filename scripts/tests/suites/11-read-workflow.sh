#!/usr/bin/env bash
# shellcheck shell=bash

test_suite_begin "Read — workflow board & packages"

api_get workflow/board "workflowId=${WORKFLOW_ID}"
assert_http_2xx "GET workflow/board"
assert_result_has "board has workflow" '.workflow.id != null'
assert_result_has "board has workflowSteps" '(.workflowSteps | type) == "array"'

api_get workflow/board
assert_http_2xx "GET workflow/board (default workflow, no workflowId)"
assert_result_has "default board has workflow" '.workflow.id != null'

api_get workflow-package/calendar-list
assert_http_2xx "GET workflow-package/calendar-list"
assert_result_has "calendar-list has packages" '(.packages | type) == "array"'

api_get workflow-package/packages-by-content "contentPath=${TEST_CONTENT_PATH}"
assert_http_2xx "GET workflow-package/packages-by-content"
assert_result_has "packages-by-content has packages" '(.packages | type) == "array"'

# Package-specific reads run after fixtures when FIX_PACKAGE_ID is set.
if [[ -n "${FIX_PACKAGE_ID}" ]]; then
  api_get workflow-package/get "workflowPackageId=${FIX_PACKAGE_ID}"
  assert_http_2xx "GET workflow-package/get"
  assert_result_has "package get has workflowPackage" '.workflowPackage.id != null'

  api_get workflow-package/details "workflowPackageId=${FIX_PACKAGE_ID}"
  assert_http_2xx "GET workflow-package/details"
  assert_result_has "package details has attachments" 'has("attachments")'
fi
