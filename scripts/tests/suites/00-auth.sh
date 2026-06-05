#!/usr/bin/env bash
# shellcheck shell=bash

test_suite_begin "Auth & prerequisites" "auth"

api_get admin/schema/status
assert_http_2xx "GET admin/schema/status"

assert_result_has "schema status has installed flag" 'has("installed")'

# Verify Studio session (not plugin API, but required for all tests).
LAST_HTTP_BODY="$(curl --silent --show-error \
  --header "Authorization: Bearer ${CRAFTER_STUDIO_TOKEN}" \
  --write-out '%{http_code}' \
  --output - \
  "${STUDIO_URL}/studio/api/2/users/me")"
LAST_HTTP_STATUS="${LAST_HTTP_BODY: -3}"
LAST_HTTP_BODY="${LAST_HTTP_BODY::-3}"
assert_http_2xx "Studio session GET /users/me"
assert_jq_true "Studio session has user identity" '.username // .email // .' "${LAST_HTTP_BODY}"
