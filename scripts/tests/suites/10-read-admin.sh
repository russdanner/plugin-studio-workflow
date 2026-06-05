#!/usr/bin/env bash
# shellcheck shell=bash

test_suite_begin "Read — admin"

api_get admin/schema/status
assert_http_2xx "GET admin/schema/status"
assert_result_has "schema status.installed" 'has("installed")'

api_get admin/workflow/list
assert_http_2xx "GET admin/workflow/list"
assert_result_has "workflow list has workflows" '(.workflows | type) == "array"'

api_get admin/workflow/get "workflowId=${WORKFLOW_ID}"
assert_http_2xx "GET admin/workflow/get"
assert_result_has "workflow get has workflow" '.workflow.id != null'

api_get admin/publishing/targets
assert_http_2xx "GET admin/publishing/targets"
assert_result_has "publishing targets has stagingEnabled" 'has("stagingEnabled")'
