#!/usr/bin/env bash
# shellcheck shell=bash

test_suite_begin "Negative — content event validation"

api_get content-event/process "contentPath=${TEST_CONTENT_PATH}"
if [[ ! "${LAST_HTTP_STATUS}" =~ ^2 ]]; then
  test_pass "GET content-event/process without eventType rejected"
else
  if api_response_code | grep -qE '^(4|5)'; then
    test_pass "GET content-event/process without eventType returns error payload"
  else
    test_fail "GET content-event/process without eventType" "expected error, got $(api_pretty_body)"
  fi
fi

api_get content-event/process "eventType=edit"
if [[ ! "${LAST_HTTP_STATUS}" =~ ^2 ]]; then
  test_pass "GET content-event/process without contentPath rejected"
else
  if api_response_code | grep -qE '^(4|5)'; then
    test_pass "GET content-event/process without contentPath returns error payload"
  else
    test_fail "GET content-event/process without contentPath" "expected error, got $(api_pretty_body)"
  fi
fi
