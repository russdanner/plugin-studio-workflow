#!/usr/bin/env bash
# shellcheck shell=bash

test_suite_begin "Mutations — admin workflows"

fixtures_create_temp_workflow || return 0

api_get admin/workflow/get "workflowId=${FIX_TEMP_WORKFLOW_ID}"
assert_http_2xx "GET admin/workflow/get (temp workflow)"

# save.post expects JSON body with workflow + steps.
steps_json="$(api_result_json | jq -c '.steps')"
workflow_json="$(api_result_json | jq -c '.workflow | .name = (.name + " saved")')"

api_post_json admin/workflow/save \
  "$(jq -nc --arg sid "${SITE_ID}" --arg wid "${FIX_TEMP_WORKFLOW_ID}" --argjson wf "${workflow_json}" --argjson steps "${steps_json}" \
    '{siteId:$sid, workflowId:$wid, workflow:$wf, steps:$steps}')"
assert_http_2xx "POST admin/workflow/save"

api_delete admin/workflow/delete "workflowId=${FIX_TEMP_WORKFLOW_ID}"
assert_http_2xx "DELETE admin/workflow/delete"
FIX_TEMP_WORKFLOW_ID=""
export FIX_TEMP_WORKFLOW_ID

# install is destructive/idempotent — skip unless explicitly requested.
if [[ "${RUN_SCHEMA_INSTALL:-}" == "1" ]]; then
  api_post admin/schema/install
  assert_http_2xx "POST admin/schema/install"
else
  test_skip "POST admin/schema/install" "set RUN_SCHEMA_INSTALL=1 to run"
fi
