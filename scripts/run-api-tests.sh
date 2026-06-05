#!/usr/bin/env bash
# shellcheck shell=bash
# Convenience wrapper for Crafter Workflow curl API tests.
exec "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/tests/run-all.sh" "$@"
