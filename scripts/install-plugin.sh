#!/usr/bin/env bash
set -euo pipefail

# Install org.rd.plugin.crafterwf into a CrafterCMS site via marketplace/copy.
# Builds UI bundles first, then POST /studio/api/2/marketplace/copy.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PLUGIN_PATH="$(cd "${SCRIPT_DIR}/.." && pwd)"
SITE_ID="${1:-workflow}"
STUDIO_URL="${2:-http://localhost:8080}"
# Edit if your authoring data path differs (see official/ai-assistant-plugin/scripts/install-plugin.sh)
CRAFTER_DATA="${CRAFTER_DATA:-/home/russdanner/crafter-installs/4-x/craftercms/crafter-authoring/data}"

# shellcheck source=lib/studio-auth.sh
source "${SCRIPT_DIR}/lib/studio-auth.sh"

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  echo "Usage: $0 [siteId=workflow] [studioUrl=http://localhost:8080]" >&2
  echo "  Builds src/ UI bundles, then installs plugin via marketplace/copy." >&2
  echo "  Token: CRAFTER_STUDIO_TOKEN env or scripts/.studio-token (gitignored)." >&2
  exit 0
fi

if ! studio_require_token; then
  exit 2
fi
if ! studio_verify_token "${STUDIO_URL}"; then
  exit 2
fi

build_ui() {
  if [[ "${SKIP_YARN_DIST:-}" == "1" ]]; then
    echo "Skipping UI build (SKIP_YARN_DIST=1)."
    return 0
  fi
  local major=0
  major="$(node -p "parseInt(process.versions.node,10)||0" 2>/dev/null || echo 0)"
  if [[ "${major}" -ge 18 ]]; then
    echo "Building UI bundles (local Node ${major})..."
    (cd "${PLUGIN_PATH}/src" && yarn install && yarn dist)
    return 0
  fi
  if command -v docker >/dev/null 2>&1; then
    local img="${PLUGIN_NODE_IMAGE:-node:20-bookworm}"
    echo "Building UI bundles via Docker (${img}; host Node is ${major:-unknown})..."
    docker run --rm \
      -v "${PLUGIN_PATH}:/work" \
      -w /work/src \
      "${img}" \
      bash -lc 'corepack enable && yarn install && yarn dist'
    return 0
  fi
  echo "Error: Need Node 18+ to run 'yarn dist', or install Docker. Host Node major=${major}." >&2
  exit 1
}

build_ui

echo "Installing plugin into site '${SITE_ID}' via marketplace/copy..."
curl --fail-with-body --silent --show-error \
  --location \
  --request POST "${STUDIO_URL}/studio/api/2/marketplace/copy" \
  --header "Authorization: Bearer ${CRAFTER_STUDIO_TOKEN}" \
  --header "Content-Type: application/json" \
  --data-raw "$(cat <<EOF
{
  "siteId": "${SITE_ID}",
  "path": "${PLUGIN_PATH}",
  "parameters": {}
}
EOF
)"

SITE_REPO="${CRAFTER_DATA}/repos/sites/${SITE_ID}/sandbox"

UI_XML="${SITE_REPO}/config/studio/ui.xml"
TOOLS_XML="${SITE_REPO}/config/studio/administration/site-config-tools.xml"
PATCH_FILES=()
[[ -f "${UI_XML}" ]] && PATCH_FILES+=("${UI_XML}")
[[ -f "${TOOLS_XML}" ]] && PATCH_FILES+=("${TOOLS_XML}")
if [[ ${#PATCH_FILES[@]} -gt 0 ]]; then
  echo "Patching Project Tools title (formatjs id) in site config..."
  python3 "${SCRIPT_DIR}/fix-project-tools-intl.py" "${PATCH_FILES[@]}" || true
  if git -C "${SITE_REPO}" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    for f in "${PATCH_FILES[@]}"; do
      git -C "${SITE_REPO}" add "${f#${SITE_REPO}/}" 2>/dev/null || true
    done
  fi
  echo "Commit the site in Studio (or git commit sandbox) so the fix is active."
else
  echo "Note: site ui.xml not found under ${SITE_REPO} — patch title manually if formatjs errors persist."
fi

DEF_SRC="${PLUGIN_PATH}/authoring/config/studio/workflow/definitions"
DEF_DST="${SITE_REPO}/config/studio/workflow/definitions"
if [[ -d "${DEF_SRC}" ]]; then
  mkdir -p "${DEF_DST}"
  echo "Syncing workflow definition JSON into site sandbox..."
  for def in "${DEF_SRC}"/*.workflow.json; do
    [[ -f "${def}" ]] || continue
    base="$(basename "${def}")"
    if [[ -f "${DEF_DST}/${base}" ]]; then
      echo "Keeping existing site definition (not overwriting): ${base}"
      continue
    fi
    cp -f "${def}" "${DEF_DST}/${base}"
  done
  if git -C "${SITE_REPO}" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    git -C "${SITE_REPO}" add "config/studio/workflow/definitions" 2>/dev/null || true
  fi
  echo "Commit site repo so definitions are versioned (see docs/WORKFLOW_DEFINITIONS.md)."
fi

WHITELIST="${SITE_REPO}/config/studio/extension/groovy/whitelist"
WHITELIST_APPEND="${PLUGIN_PATH}/authoring/config/studio/extension/groovy/crafterwf-plugin-whitelist.append"
MARKER="# Crafter Workflow plugin (org.rd.plugin.crafterwf)"
if [[ -f "${WHITELIST_APPEND}" && -f "${WHITELIST}" ]]; then
  if ! grep -qF "${MARKER}" "${WHITELIST}" 2>/dev/null; then
    echo "Appending Crafter Workflow Groovy sandbox whitelist entries..."
    {
      echo ""
      echo "${MARKER}"
      grep -v '^#' "${WHITELIST_APPEND}" | grep -v '^[[:space:]]*$' || true
    } >> "${WHITELIST}"
    if git -C "${SITE_REPO}" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
      git -C "${SITE_REPO}" add "config/studio/extension/groovy/whitelist" 2>/dev/null || true
    fi
    echo "Commit site config if studio.scripting.sandbox.whitelist.enable is true."
  else
    added=0
    while IFS= read -r line; do
      [[ -z "${line}" ]] && continue
      if ! grep -qF "${line}" "${WHITELIST}" 2>/dev/null; then
        echo "${line}" >> "${WHITELIST}"
        added=1
      fi
    done < <(grep -v '^#' "${WHITELIST_APPEND}" | grep -v '^[[:space:]]*$' || true)
    if [[ "${added}" -eq 1 ]]; then
      echo "Merged missing Crafter Workflow whitelist entries into site whitelist."
      if git -C "${SITE_REPO}" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        git -C "${SITE_REPO}" add "config/studio/extension/groovy/whitelist" 2>/dev/null || true
      fi
    fi
  fi
fi

echo
echo "Done. Open Studio → site '${SITE_ID}' → Project Tools → Crafter Workflow."
