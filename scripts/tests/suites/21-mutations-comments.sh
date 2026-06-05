#!/usr/bin/env bash
# shellcheck shell=bash

test_suite_begin "Mutations — comments"

[[ -n "${FIX_PACKAGE_ID}" ]] || { test_skip "comment mutations" "no FIX_PACKAGE_ID"; return 0; }

fixtures_create_comment || return 0

api_post comment/resolve \
  "commentId=${FIX_COMMENT_ID}" \
  "resolved=true"
assert_http_2xx "POST comment/resolve (resolve)"

api_post comment/resolve \
  "commentId=${FIX_COMMENT_ID}" \
  "resolved=false"
assert_http_2xx "POST comment/resolve (reopen)"

api_post comment/archive \
  "commentId=${FIX_COMMENT_ID}" \
  "archived=true"
assert_http_2xx "POST comment/archive (archive)"

api_post comment/archive \
  "commentId=${FIX_COMMENT_ID}" \
  "archived=false"
assert_http_2xx "POST comment/archive (restore)"

api_post comment/create \
  "targetType=content" \
  "targetId=${TEST_CONTENT_PATH}" \
  "body=${TEST_PREFIX} content comment"
assert_http_2xx "POST comment/create (content target)"
