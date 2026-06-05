#!/usr/bin/env bash
# shellcheck shell=bash
# Shared counters, result tracking, and logging for curl API tests.

TEST_PASS=0
TEST_FAIL=0
TEST_SKIP=0
TEST_START_TS="$(date +%s)"

# Result ledger: parallel arrays (bash 4+).
TEST_RESULT_NAMES=()
TEST_RESULT_STATUS=()   # pass | fail | skip
TEST_RESULT_TYPES=()    # auth | read | mutation | negative | cleanup | config
TEST_RESULT_DETAILS=()
TEST_RESULT_SUITES=()

TEST_CURRENT_SUITE=""
TEST_CURRENT_TYPE="general"

_cwf_red() { printf '\033[0;31m'; }
_cwf_green() { printf '\033[0;32m'; }
_cwf_yellow() { printf '\033[0;33m'; }
_cwf_cyan() { printf '\033[0;36m'; }
_cwf_dim() { printf '\033[0;2m'; }
_cwf_reset() { printf '\033[0m'; }

# Icons for test categories.
_test_type_icon() {
  case "$1" in
    auth)     printf '🛡️' ;;
    read)     printf '📖' ;;
    mutation) printf '✏️' ;;
    negative) printf '⚡' ;;
    cleanup)  printf '🧹' ;;
    config)   printf '⚙️' ;;
    *)        printf '📋' ;;
  esac
}

_test_status_icon() {
  case "$1" in
    pass) printf '✅' ;;
    fail) printf '❌' ;;
    skip) printf '⏭️' ;;
    *)    printf '•' ;;
  esac
}

_test_infer_type() {
  local name="$1"
  if [[ "${name}" =~ ^GET[[:space:]] ]]; then
    printf 'read'
  elif [[ "${name}" =~ ^POST[[:space:]]|^DELETE[[:space:]] ]]; then
    printf 'mutation'
  elif [[ "${name}" =~ [Rr]eject|[Ii]nvalid|[Mm]issing|[Ww]ithout ]]; then
    printf 'negative'
  elif [[ "${name}" =~ [Cc]leanup|[Aa]rchive ]]; then
    printf 'cleanup'
  elif [[ "${name}" =~ [Ss]ession|[Ss]chema|[Pp]rereq|jq[[:space:]] ]]; then
    printf 'auth'
  else
    printf '%s' "${TEST_CURRENT_TYPE}"
  fi
}

_test_record() {
  local status="$1"
  local name="$2"
  local detail="${3:-}"
  local type="${4:-$(_test_infer_type "${name}")}"

  TEST_RESULT_NAMES+=("${name}")
  TEST_RESULT_STATUS+=("${status}")
  TEST_RESULT_TYPES+=("${type}")
  TEST_RESULT_DETAILS+=("${detail}")
  TEST_RESULT_SUITES+=("${TEST_CURRENT_SUITE}")
}

test_suite_begin() {
  local name="$1"
  local type="${2:-}"
  TEST_CURRENT_SUITE="${name}"
  if [[ -n "${type}" ]]; then
    TEST_CURRENT_TYPE="${type}"
  fi
  printf '\n'
  _cwf_cyan
  printf '━━━ %s %s ━━━\n' "$(_test_type_icon "${TEST_CURRENT_TYPE}")" "$name"
  _cwf_reset
}

test_log() {
  printf '  %s\n' "$*"
}

test_skip() {
  local name="$1"
  local reason="${2:-skipped}"
  TEST_SKIP=$((TEST_SKIP + 1))
  _test_record skip "${name}" "${reason}"
  _cwf_yellow
  printf '  ⏭️  SKIP  %s — %s\n' "$name" "$reason"
  _cwf_reset
}

test_pass() {
  local name="$1"
  TEST_PASS=$((TEST_PASS + 1))
  _test_record pass "${name}" ""
  _cwf_green
  printf '  ✅ PASS  %s\n' "$name"
  _cwf_reset
}

test_fail() {
  local name="$1"
  local detail="${2:-}"
  TEST_FAIL=$((TEST_FAIL + 1))
  _test_record fail "${name}" "${detail}"
  _cwf_red
  printf '  ❌ FAIL  %s\n' "$name"
  if [[ -n "$detail" ]]; then
    printf '          %s\n' "$detail"
  fi
  _cwf_reset
}

_test_print_grouped_results() {
  local status="$1"
  local heading="$2"
  local icon="$3"
  local count=0
  local i

  for i in "${!TEST_RESULT_STATUS[@]}"; do
    [[ "${TEST_RESULT_STATUS[$i]}" == "${status}" ]] && count=$((count + 1))
  done
  [[ "${count}" -eq 0 ]] && return 0

  printf '\n%s %s (%s)\n' "${icon}" "${heading}" "${count}"
  printf '%s\n' '────────────────────────────────────────────────────────'

  local last_suite=""
  for i in "${!TEST_RESULT_STATUS[@]}"; do
    [[ "${TEST_RESULT_STATUS[$i]}" != "${status}" ]] && continue
    local suite="${TEST_RESULT_SUITES[$i]}"
    if [[ "${suite}" != "${last_suite}" ]]; then
      printf '  %s %s\n' "$(_test_type_icon "${TEST_RESULT_TYPES[$i]}")" "${suite}"
      last_suite="${suite}"
    fi
    printf '    %s %s\n' "$(_test_status_icon "${status}")" "${TEST_RESULT_NAMES[$i]}"
    if [[ -n "${TEST_RESULT_DETAILS[$i]}" ]]; then
      _cwf_dim
      printf '       ↳ %s\n' "${TEST_RESULT_DETAILS[$i]}"
      _cwf_reset
    fi
  done
}

test_summary() {
  local elapsed=$(( $(date +%s) - TEST_START_TS ))
  local total=$(( TEST_PASS + TEST_FAIL + TEST_SKIP ))

  printf '\n'
  _cwf_cyan
  printf '════════════════════════════════════════════════════════\n'
  printf '📋  TEST RESULTS REPORT\n'
  printf '════════════════════════════════════════════════════════\n'
  _cwf_reset

  # Full ledger grouped by suite (all results).
  local last_suite=""
  local i
  for i in "${!TEST_RESULT_NAMES[@]}"; do
    local suite="${TEST_RESULT_SUITES[$i]}"
    if [[ "${suite}" != "${last_suite}" ]]; then
      printf '\n%s %s\n' "$(_test_type_icon "${TEST_RESULT_TYPES[$i]}")" "${suite}"
      last_suite="${suite}"
    fi
    local status="${TEST_RESULT_STATUS[$i]}"
    printf '  %s %s\n' "$(_test_status_icon "${status}")" "${TEST_RESULT_NAMES[$i]}"
    if [[ "${status}" == "fail" && -n "${TEST_RESULT_DETAILS[$i]}" ]]; then
      _cwf_dim
      printf '     ↳ %s\n' "${TEST_RESULT_DETAILS[$i]}"
      _cwf_reset
    elif [[ "${status}" == "skip" && -n "${TEST_RESULT_DETAILS[$i]}" ]]; then
      _cwf_dim
      printf '     ↳ %s\n' "${TEST_RESULT_DETAILS[$i]}"
      _cwf_reset
    fi
  done

  printf '\n'
  _cwf_cyan
  printf '────────────────────────────────────────────────────────\n'
  printf '📊  SUMMARY\n'
  printf '────────────────────────────────────────────────────────\n'
  _cwf_reset

  printf '  ✅  Passed  : %s\n' "${TEST_PASS}"
  printf '  ❌  Failed  : %s\n' "${TEST_FAIL}"
  printf '  ⏭️   Skipped : %s\n' "${TEST_SKIP}"
  printf '  📦  Total   : %s\n' "${total}"
  printf '  ⏱️   Duration: %ss\n' "${elapsed}"

  # Breakdown by test type.
  printf '\n'
  _cwf_cyan
  printf '🏷️   BY TYPE\n'
  _cwf_reset
  local t
  for t in auth read mutation negative cleanup config general; do
    local p=0 f=0 s=0
    for i in "${!TEST_RESULT_TYPES[@]}"; do
      [[ "${TEST_RESULT_TYPES[$i]}" != "${t}" ]] && continue
      case "${TEST_RESULT_STATUS[$i]}" in
        pass) p=$((p + 1)) ;;
        fail) f=$((f + 1)) ;;
        skip) s=$((s + 1)) ;;
      esac
    done
    local n=$((p + f + s))
    [[ "${n}" -eq 0 ]] && continue
    printf '  %s %-10s  ✅ %s  ❌ %s  ⏭️  %s  (total %s)\n' \
      "$(_test_type_icon "${t}")" "${t}:" "${p}" "${f}" "${s}" "${n}"
  done

  _test_print_grouped_results fail "FAILURES" "❌"
  _test_print_grouped_results skip "SKIPPED" "⏭️"

  printf '\n'
  if [[ "${TEST_FAIL}" -gt 0 ]]; then
    _cwf_red
    printf '════════════════════════════════════════════════════════\n'
    printf '💥  TEST RUN FAILED — %s failure(s)\n' "${TEST_FAIL}"
    printf '════════════════════════════════════════════════════════\n'
    _cwf_reset
    return 1
  fi
  _cwf_green
  printf '════════════════════════════════════════════════════════\n'
  printf '🎉  ALL TESTS PASSED'
  if [[ "${TEST_SKIP}" -gt 0 ]]; then
    printf ' (%s skipped)' "${TEST_SKIP}"
  fi
  printf '\n'
  printf '════════════════════════════════════════════════════════\n'
  _cwf_reset
  return 0
}

require_cmd() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    printf 'Error: required command not found: %s\n' "$cmd" >&2
    exit 2
  fi
}
