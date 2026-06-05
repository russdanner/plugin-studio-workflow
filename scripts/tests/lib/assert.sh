#!/usr/bin/env bash
# shellcheck shell=bash
# jq-based assertions for plugin API responses.

assert_http_2xx() {
  local name="$1"
  if [[ ! "${LAST_HTTP_STATUS}" =~ ^2 ]]; then
    test_fail "${name}" "expected HTTP 2xx, got ${LAST_HTTP_STATUS}: $(api_pretty_body)"
    return 1
  fi
  test_pass "${name}"
  return 0
}

assert_http_status() {
  local name="$1"
  local expected="$2"
  if [[ "${LAST_HTTP_STATUS}" != "${expected}" ]]; then
    test_fail "${name}" "expected HTTP ${expected}, got ${LAST_HTTP_STATUS}: $(api_pretty_body)"
    return 1
  fi
  test_pass "${name}"
  return 0
}

assert_jq_true() {
  local name="$1"
  local filter="$2"
  local json="${3:-${LAST_HTTP_BODY}}"
  if printf '%s' "${json}" | jq -e "${filter}" >/dev/null 2>&1; then
    test_pass "${name}"
    return 0
  fi
  test_fail "${name}" "jq filter failed (${filter}): $(printf '%s' "${json}" | jq -c . 2>/dev/null || printf '%s' "${json}")"
  return 1
}

assert_result_has() {
  local name="$1"
  local filter="$2"
  local result
  result="$(api_result_json)"
  assert_jq_true "${name}" "${filter}" "${result}"
}

assert_result_field() {
  local name="$1"
  local jq_path="$2"
  local expected="$3"
  local actual
  actual="$(api_result_json | jq -r "${jq_path}")"
  if [[ "${actual}" == "${expected}" ]]; then
    test_pass "${name}"
    return 0
  fi
  test_fail "${name}" "expected ${jq_path}=${expected}, got ${actual}"
  return 1
}
