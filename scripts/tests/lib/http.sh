#!/usr/bin/env bash
# shellcheck shell=bash
# curl helpers for plugin REST endpoints.

LAST_HTTP_STATUS=""
LAST_HTTP_BODY=""
LAST_HTTP_HEADERS=""

_urlencode() {
  python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1], safe=""))' "$1"
}

_build_query() {
  local query="siteId=$(_urlencode "${SITE_ID}")"
  while [[ $# -gt 0 ]]; do
    local pair="$1"
    shift
    local key="${pair%%=*}"
    local value="${pair#*=}"
    query+="&$(_urlencode "${key}")=$(_urlencode "${value}")"
  done
  printf '%s' "$query"
}

_api_endpoint_url() {
  local endpoint="$1"
  shift
  local query
  query="$(_build_query "$@")"
  printf '%s%s/%s.json?%s' "${STUDIO_URL}" "${PLUGIN_API_BASE}" "${endpoint}" "$query"
}

_api_request() {
  local method="$1"
  local endpoint="$2"
  shift 2
  local url
  url="$(_api_endpoint_url "${endpoint}" "$@")"

  local body_file headers_file
  body_file="$(mktemp)"
  headers_file="$(mktemp)"

  local curl_args=(
    --silent --show-error
    --request "${method}"
    --url "${url}"
    --header "Authorization: Bearer ${CRAFTER_STUDIO_TOKEN}"
    --header "Accept: application/json"
    --write-out '%{http_code}'
    --output "${body_file}"
    --dump-header "${headers_file}"
  )

  LAST_HTTP_STATUS="$(curl "${curl_args[@]}")"
  LAST_HTTP_BODY="$(cat "${body_file}")"
  LAST_HTTP_HEADERS="$(cat "${headers_file}")"
  rm -f "${body_file}" "${headers_file}"
}

api_get() {
  local endpoint="$1"
  shift
  _api_request GET "${endpoint}" "$@"
}

api_post() {
  local endpoint="$1"
  shift
  # Crafter Studio plugin REST serves query-param mutations via *.get.groovy.
  _api_request GET "${endpoint}" "$@"
}

api_delete() {
  local endpoint="$1"
  shift
  _api_request GET "${endpoint}" "$@"
}

api_post_json() {
  local endpoint="$1"
  local json_body="$2"
  shift 2
  local url
  url="$(_api_endpoint_url "${endpoint}" "$@")"

  local body_file headers_file
  body_file="$(mktemp)"
  headers_file="$(mktemp)"

  local curl_args=(
    --silent --show-error
    --request POST
    --url "${url}"
    --header "Authorization: Bearer ${CRAFTER_STUDIO_TOKEN}"
    --header "Accept: application/json"
    --header "Content-Type: application/json"
    --data "${json_body}"
    --write-out '%{http_code}'
    --output "${body_file}"
    --dump-header "${headers_file}"
  )

  LAST_HTTP_STATUS="$(curl "${curl_args[@]}")"
  LAST_HTTP_BODY="$(cat "${body_file}")"
  LAST_HTTP_HEADERS="$(cat "${headers_file}")"
  rm -f "${body_file}" "${headers_file}"
}

api_result_json() {
  printf '%s' "${LAST_HTTP_BODY}" | jq -c '
    if (.response.code // 0) != 0 then .response
    elif .result != null then .result
    elif .response != null then .response
    else . end
  '
}

api_response_code() {
  printf '%s' "${LAST_HTTP_BODY}" | jq -r '.response.code // empty'
}

api_pretty_body() {
  printf '%s' "${LAST_HTTP_BODY}" | jq -c . 2>/dev/null || printf '%s' "${LAST_HTTP_BODY}"
}
