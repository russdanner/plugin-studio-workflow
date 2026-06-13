#!/usr/bin/env bash
# shellcheck shell=bash

test_suite_begin "Mutations — content event listeners"

api_get content-event/process \
  "eventType=edit" \
  "contentPath=${TEST_CONTENT_PATH}"
assert_http_2xx "GET content-event/process (edit on test content)"
assert_result_has "content event returns results array" '(.results | type) == "array"'
assert_result_has "content event echoes contentPath" ".contentPath == \"${TEST_CONTENT_PATH}\""

# Folder paths are ignored (not enrollable content items).
folder_path="$(dirname "${TEST_CONTENT_PATH}")"
api_get content-event/process \
  "eventType=edit" \
  "contentPath=${folder_path}"
assert_http_2xx "GET content-event/process (folder path skipped)"
assert_result_has "folder path yields empty results" '(.results | length) == 0'

# Optional contentType hint — should not error when unknown placeholder is passed.
api_get content-event/process \
  "eventType=edit" \
  "contentPath=${TEST_CONTENT_PATH}" \
  "contentType=/page/unknown"
assert_http_2xx "GET content-event/process (unknown contentType re-resolved)"

# Create lifecycle alias.
api_get content-event/process \
  "eventType=create" \
  "contentPath=${TEST_CONTENT_PATH}"
assert_http_2xx "GET content-event/process (create event type)"
