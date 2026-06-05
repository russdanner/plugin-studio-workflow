#!/usr/bin/env bash
# shellcheck shell=bash

test_suite_begin "Mutations — tasks"

[[ -n "${FIX_PACKAGE_ID}" ]] || { test_skip "task mutations" "no FIX_PACKAGE_ID"; return 0; }

fixtures_create_task || return 0

api_get task/get "taskId=${FIX_TASK_ID}"
assert_http_2xx "GET task/get"
assert_result_has "task get has id" '.id != null'

api_post task/update \
  "taskId=${FIX_TASK_ID}" \
  "title=${TEST_PREFIX} task updated" \
  "priority=high"
assert_http_2xx "POST task/update"

api_post task/complete \
  "taskId=${FIX_TASK_ID}" \
  "complete=true"
assert_http_2xx "POST task/complete (complete)"

api_post task/complete \
  "taskId=${FIX_TASK_ID}" \
  "complete=false"
assert_http_2xx "POST task/complete (reopen)"

api_post task/archive \
  "taskId=${FIX_TASK_ID}" \
  "archived=true"
assert_http_2xx "POST task/archive"

api_get task/list "allTasks=true"
assert_http_2xx "GET task/list?allTasks=true"
