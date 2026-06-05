#!/usr/bin/env bash
# shellcheck shell=bash

test_suite_begin "Mutations — notifications"

fixtures_create_notification || return 0

api_post notification/mark-read \
  "notificationId=${FIX_NOTIFICATION_ID}" \
  "read=true"
assert_http_2xx "POST notification/mark-read (single)"

api_post notification/mark-read "markAll=true" "read=true"
assert_http_2xx "POST notification/mark-read (mark all)"

api_post notification/resolve \
  "notificationId=${FIX_NOTIFICATION_ID}" \
  "resolved=true"
assert_http_2xx "POST notification/resolve (resolve)"

api_post notification/resolve \
  "notificationId=${FIX_NOTIFICATION_ID}" \
  "resolved=false"
assert_http_2xx "POST notification/resolve (reopen)"

api_post notification/archive \
  "notificationId=${FIX_NOTIFICATION_ID}" \
  "archived=true"
assert_http_2xx "POST notification/archive"
