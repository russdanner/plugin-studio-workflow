#!/usr/bin/env bash
# shellcheck shell=bash

test_suite_begin "Cleanup"

if fixtures_cleanup; then
  test_pass "archive package / delete temp workflow"
else
  test_fail "archive package / delete temp workflow" "one or more cleanup steps failed (see log)"
fi
