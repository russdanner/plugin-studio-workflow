#!/usr/bin/env bash
# Run a CodeRabbit CLI review for uncommitted changes in the working tree.
#
# Requires: CodeRabbit CLI (https://docs.coderabbit.ai/cli)
#   curl -fsSL https://cli.coderabbit.ai/install.sh | sh
#   cr auth login
#
# Usage:
#   ./scripts/coderabbit-review-working-tree.sh [options] [-- extra cr args]
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

CODERABBIT_BIN="${CODERABBIT_BIN:-}"
MODE="plain"
BASE_BRANCH=""
REVIEW_DIR=""
SHOW_STATUS=1
SUBCOMMAND="review"
EXTRA_ARGS=()

usage() {
  cat <<'EOF' >&2
Run CodeRabbit on uncommitted (working tree) changes.

Usage:
  coderabbit-review-working-tree.sh [options] [-- extra cr review args]

Options:
  -h, --help          Show this help
  --agent             Structured JSON output for AI agents (cr --agent)
  --interactive       Full-screen review UI (cr --interactive)
  --plain             Plain-text output (default)
  --base BRANCH       Base branch for comparison (e.g. main, develop)
  --dir PATH          Review only changes under PATH (relative to repo root)
  --no-status         Do not print git status before the review
  --findings          Show findings from the last local review (no new review)
  --doctor            Run cr doctor and exit
  --                  Pass remaining args to cr review

Environment:
  CODERABBIT_BIN      Path to cr/coderabbit binary (auto-detected if unset)

Examples:
  ./scripts/coderabbit-review-working-tree.sh
  ./scripts/coderabbit-review-working-tree.sh --agent
  ./scripts/coderabbit-review-working-tree.sh --base develop
  ./scripts/coderabbit-review-working-tree.sh --dir authoring/scripts
  ./scripts/coderabbit-review-working-tree.sh -- --config docs/README.md

Setup:
  cr auth login
  cr doctor
EOF
}

resolve_coderabbit_bin() {
  if [[ -n "${CODERABBIT_BIN}" ]]; then
    if [[ ! -x "${CODERABBIT_BIN}" ]]; then
      echo "CODERABBIT_BIN is not executable: ${CODERABBIT_BIN}" >&2
      return 1
    fi
    echo "${CODERABBIT_BIN}"
    return 0
  fi
  if command -v cr >/dev/null 2>&1; then
    command -v cr
    return 0
  fi
  if command -v coderabbit >/dev/null 2>&1; then
    command -v coderabbit
    return 0
  fi
  echo "CodeRabbit CLI not found. Install: curl -fsSL https://cli.coderabbit.ai/install.sh | sh" >&2
  echo "Then authenticate: cr auth login" >&2
  return 1
}

detect_base_branch() {
  local candidate
  for candidate in main master develop; do
    if git -C "${REPO_ROOT}" show-ref --verify --quiet "refs/heads/${candidate}"; then
      echo "${candidate}"
      return 0
    fi
  done
  git -C "${REPO_ROOT}" symbolic-ref refs/remotes/origin/HEAD 2>/dev/null \
    | sed 's@^refs/remotes/origin/@@' || true
}

has_uncommitted_changes() {
  ! git -C "${REPO_ROOT}" diff --quiet
  return $?
}

has_staged_changes() {
  ! git -C "${REPO_ROOT}" diff --cached --quiet
  return $?
}

print_working_tree_summary() {
  local staged=0 unstaged=0 untracked=0
  if has_staged_changes; then staged=1; fi
  if has_uncommitted_changes; then unstaged=1; fi
  if [[ -n "$(git -C "${REPO_ROOT}" ls-files --others --exclude-standard)" ]]; then
    untracked=1
  fi

  echo "Working tree (uncommitted review scope):" >&2
  git -C "${REPO_ROOT}" status --short >&2
  echo >&2
  if [[ "${staged}" -eq 0 && "${unstaged}" -eq 0 && "${untracked}" -eq 0 ]]; then
    echo "No uncommitted changes detected. CodeRabbit will likely skip the review." >&2
    echo "Stage or edit files, then run this script again." >&2
    return 1
  fi
  return 0
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help)
      usage
      exit 0
      ;;
    --agent)
      MODE="agent"
      shift
      ;;
    --interactive)
      MODE="interactive"
      shift
      ;;
    --plain)
      MODE="plain"
      shift
      ;;
    --base)
      BASE_BRANCH="${2:?--base requires a branch name}"
      shift 2
      ;;
    --dir)
      REVIEW_DIR="${2:?--dir requires a path}"
      shift 2
      ;;
    --no-status)
      SHOW_STATUS=0
      shift
      ;;
    --findings)
      SUBCOMMAND="findings"
      shift
      ;;
    --doctor)
      SUBCOMMAND="doctor"
      shift
      ;;
    --)
      shift
      EXTRA_ARGS=("$@")
      break
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage
      exit 1
      ;;
  esac
done

CR="$(resolve_coderabbit_bin)" || exit 1

if ! git -C "${REPO_ROOT}" rev-parse --git-dir >/dev/null 2>&1; then
  echo "Not a git repository: ${REPO_ROOT}" >&2
  exit 1
fi

cd "${REPO_ROOT}"

if [[ "${SUBCOMMAND}" == "doctor" ]]; then
  exec "${CR}" doctor
fi

if [[ "${SUBCOMMAND}" == "findings" ]]; then
  exec "${CR}" review findings "${EXTRA_ARGS[@]}"
fi

if [[ "${SHOW_STATUS}" -eq 1 ]]; then
  print_working_tree_summary || true
fi

REVIEW_ARGS=(review --type uncommitted)

case "${MODE}" in
  agent) REVIEW_ARGS+=(--agent) ;;
  interactive) REVIEW_ARGS+=(--interactive) ;;
  plain) REVIEW_ARGS+=(--plain) ;;
esac

if [[ -z "${BASE_BRANCH}" ]]; then
  BASE_BRANCH="$(detect_base_branch || true)"
fi
if [[ -n "${BASE_BRANCH}" ]]; then
  REVIEW_ARGS+=(--base "${BASE_BRANCH}")
fi

if [[ -n "${REVIEW_DIR}" ]]; then
  if [[ "${REVIEW_DIR}" != /* ]]; then
    REVIEW_DIR="${REPO_ROOT}/${REVIEW_DIR}"
  fi
  REVIEW_ARGS+=(--dir "${REVIEW_DIR}")
fi

if [[ "${#EXTRA_ARGS[@]}" -gt 0 ]]; then
  REVIEW_ARGS+=("${EXTRA_ARGS[@]}")
fi

echo "Running: ${CR} ${REVIEW_ARGS[*]}" >&2
exec "${CR}" "${REVIEW_ARGS[@]}"
