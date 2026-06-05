#!/usr/bin/env bash
# shellcheck shell=bash

test_suite_begin "Read — comments, tasks, notifications, audit"

api_get comment/list "targetType=content" "targetId=${TEST_CONTENT_PATH}"
assert_http_2xx "GET comment/list (content)"
assert_result_has "comment list has comments" '(.comments | type) == "array"'

if [[ -n "${FIX_PACKAGE_ID}" ]]; then
  api_get comment/list "targetType=workflow_package" "targetId=${FIX_PACKAGE_ID}"
  assert_http_2xx "GET comment/list (package)"
fi

api_get task/list
assert_http_2xx "GET task/list"
assert_result_has "task list has tasks" '(.tasks | type) == "array"'

api_get task/open-count
assert_http_2xx "GET task/open-count"
assert_result_has "task open-count has openCount" 'has("openCount")'

if [[ -n "${FIX_TASK_ID}" ]]; then
  api_get task/get "taskId=${FIX_TASK_ID}"
  assert_http_2xx "GET task/get"
  assert_result_has "task get has id" '.id != null'
fi

api_get notification/list
assert_http_2xx "GET notification/list"
assert_result_has "notification list has notifications" '(.notifications | type) == "array"'

api_get notification/unread-count
assert_http_2xx "GET notification/unread-count"
assert_result_has "notification unread-count has unreadCount" 'has("unreadCount")'

api_get audit/list "page=1" "pageSize=10"
assert_http_2xx "GET audit/list"
assert_result_has "audit list has entries" '(.entries | type) == "array"'
