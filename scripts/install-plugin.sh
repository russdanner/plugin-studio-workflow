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
  echo "  Builds src/ UI bundles into authoring/static-assets, then marketplace/copy." >&2
  echo "  Token: CRAFTER_STUDIO_TOKEN env or scripts/.studio-token (gitignored)." >&2
  echo "" >&2
  echo "  SKIP_YARN_DIST=1     Skip UI build (use when bundles are already fresh)." >&2
  echo "  SKIP_YARN_INSTALL=1  Skip 'yarn install' before dist (faster rebuild)." >&2
  exit 0
fi

PLUGIN_UI_DEPLOY="${PLUGIN_PATH}/authoring/static-assets/plugins/org/rd/plugin/crafterwf/apps/crafterwf"

if ! studio_require_token; then
  exit 2
fi
if ! studio_verify_token "${STUDIO_URL}"; then
  exit 2
fi

build_ui() {
  if [[ "${SKIP_YARN_DIST:-}" == "1" ]]; then
    echo "Skipping UI build (SKIP_YARN_DIST=1)."
    if [[ ! -f "${PLUGIN_UI_DEPLOY}/index.js" ]]; then
      echo "Error: ${PLUGIN_UI_DEPLOY}/index.js missing — run without SKIP_YARN_DIST first." >&2
      exit 1
    fi
    return 0
  fi
  local major=0
  major="$(node -p "parseInt(process.versions.node,10)||0" 2>/dev/null || echo 0)"
  local install_cmd="true"
  if [[ "${SKIP_YARN_INSTALL:-}" != "1" ]]; then
    install_cmd="yarn install"
  else
    echo "Skipping yarn install (SKIP_YARN_INSTALL=1)."
  fi
  if [[ "${major}" -ge 18 ]]; then
    echo "Building UI bundles (local Node ${major}) — board-components ~5min, app ~1min..."
    (
      cd "${PLUGIN_PATH}/src"
      eval "${install_cmd}"
      PLUGIN_DEPLOY_PATH="${PLUGIN_UI_DEPLOY}" yarn dist
    )
    return 0
  fi
  if command -v docker >/dev/null 2>&1; then
    local img="${PLUGIN_NODE_IMAGE:-node:20-bookworm}"
    echo "Building UI bundles via Docker (${img}; host Node is ${major:-unknown})..."
    docker run --rm \
      -v "${PLUGIN_PATH}:/work" \
      -w /work/src \
      -e "PLUGIN_DEPLOY_PATH=/work/authoring/static-assets/plugins/org/rd/plugin/crafterwf/apps/crafterwf" \
      "${img}" \
      bash -lc "corepack enable && ${install_cmd} && yarn dist"
    return 0
  fi
  echo "Error: Need Node 18+ to run 'yarn dist', or install Docker. Host Node major=${major}." >&2
  exit 1
}

build_ui

if [[ -f "${PLUGIN_UI_DEPLOY}/index.js" ]]; then
  echo "UI bundle: $(stat -c '%y (%s bytes)' "${PLUGIN_UI_DEPLOY}/index.js" 2>/dev/null || echo 'present')"
fi

echo "Installing plugin into site '${SITE_ID}' via marketplace/copy (may take 1–3 min)..."
curl --fail-with-body --show-error \
  --location \
  --max-time "${INSTALL_COPY_TIMEOUT_SEC:-600}" \
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
echo ""
echo "marketplace/copy finished."

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

SITE_REPO_ROOT="$(dirname "${SITE_REPO}")"
PUBLISHED_REPO="${SITE_REPO_ROOT}/published"

patch_lifecycle_controllers() {
  local repo_path="$1"
  local label="$2"
  if [[ -d "${repo_path}/config/studio/content-types" ]]; then
    echo "Normalizing ${label} content-type controllers (server hook is CommonLifecycleApi)..."
    python3 "${SCRIPT_DIR}/patch-content-lifecycle-controllers.py" "${repo_path}" || true
  fi
}

patch_lifecycle_controllers "${SITE_REPO}" "sandbox"
patch_lifecycle_controllers "${PUBLISHED_REPO}" "published"

# Lifecycle scripts run in Studio default-site Groovy classpath (not site plugin classes).
CRAFTER_AUTHORING="${CRAFTER_AUTHORING:-$(dirname "${CRAFTER_DATA}")}"
STUDIO_WEBAPP="${CRAFTER_AUTHORING}/bin/apache-tomcat/webapps/studio"
DEFAULT_SITE_LIBS="${STUDIO_WEBAPP}/default-site/scripts/libs"
STUDIO_GROOVY_WHITELIST="${STUDIO_WEBAPP}/WEB-INF/classes/crafter/studio/groovy/whitelist"
LIFECYCLE_MARKER="# Crafter Workflow lifecycle hook (org.rd.plugin.crafterwf)"

install_default_site_lifecycle() {
  local src_dir="${PLUGIN_PATH}/authoring/default-site/scripts/libs"
  local whitelist_append="${PLUGIN_PATH}/authoring/default-site/groovy/crafterwf-lifecycle-whitelist.append"
  if [[ ! -d "${DEFAULT_SITE_LIBS}" ]]; then
    echo "Note: Studio default-site libs not found at ${DEFAULT_SITE_LIBS} — lifecycle hook not installed."
    return 0
  fi
  for lib in CommonLifecycleApi.groovy CrafterwfWorkflowLifecycleBridge.groovy; do
    if [[ -f "${src_dir}/${lib}" ]]; then
      cp -f "${src_dir}/${lib}" "${DEFAULT_SITE_LIBS}/${lib}"
      echo "Installed ${lib} to Studio default-site."
    fi
  done
  if [[ -f "${whitelist_append}" && -f "${STUDIO_GROOVY_WHITELIST}" ]]; then
    if ! grep -qF "${LIFECYCLE_MARKER}" "${STUDIO_GROOVY_WHITELIST}" 2>/dev/null; then
      {
        echo ""
        echo "${LIFECYCLE_MARKER}"
        grep -v '^#' "${whitelist_append}" | grep -v '^[[:space:]]*$' || true
      } >> "${STUDIO_GROOVY_WHITELIST}"
      echo "Appended Crafter Workflow entries to Studio lifecycle Groovy whitelist."
    else
      while IFS= read -r line; do
        [[ -z "${line}" || "${line}" =~ ^# ]] && continue
        if ! grep -qF "${line}" "${STUDIO_GROOVY_WHITELIST}" 2>/dev/null; then
          echo "${line}" >> "${STUDIO_GROOVY_WHITELIST}"
        fi
      done < "${whitelist_append}"
    fi
  fi
  echo "Restart Crafter authoring (Tomcat) so lifecycle Groovy classes reload."
}

install_default_site_lifecycle

sync_repo_tree() {
  local src="$1"
  local dst="$2"
  local label="$3"
  if [[ -d "${src}" ]]; then
    mkdir -p "${dst}"
    cp -a "${src}/." "${dst}/"
    echo "Synced ${label} to published layer."
  fi
}

# Studio may execute lifecycle controllers and load plugin classes from published.
sync_repo_tree "${SITE_REPO}/config/studio/scripts/classes" \
  "${PUBLISHED_REPO}/config/studio/scripts/classes" \
  "plugin Groovy classes"
sync_repo_tree "${SITE_REPO}/config/studio/workflow/definitions" \
  "${PUBLISHED_REPO}/config/studio/workflow/definitions" \
  "workflow definitions"

# Studio may serve plugin JS from the published layer; keep it in sync with sandbox.
PUBLISHED_PLUGIN="${SITE_REPO_ROOT}/published/config/studio/static-assets/plugins/org/rd/plugin/crafterwf/apps/crafterwf"
SANDBOX_PLUGIN="${SITE_REPO}/config/studio/static-assets/plugins/org/rd/plugin/crafterwf/apps/crafterwf"
if [[ -f "${SANDBOX_PLUGIN}/index.js" ]]; then
  mkdir -p "${PUBLISHED_PLUGIN}"
  cp -f "${SANDBOX_PLUGIN}/index.js" "${PUBLISHED_PLUGIN}/index.js"
  [[ -f "${SANDBOX_PLUGIN}/app.js" ]] && cp -f "${SANDBOX_PLUGIN}/app.js" "${PUBLISHED_PLUGIN}/app.js"
  echo "Synced plugin UI bundle to published layer."
fi

SITE_PLUGIN="${SANDBOX_PLUGIN}/index.js"
if [[ -f "${SITE_PLUGIN}" ]]; then
  echo "Site UI bundle: $(stat -c '%y (%s bytes)' "${SITE_PLUGIN}")"
else
  echo "Note: site plugin bundle not found at expected path — hard-refresh Studio (Ctrl+Shift+R)."
fi

echo
echo "Done. Open Studio → site '${SITE_ID}' → hard-refresh preview (Ctrl+Shift+R) to load new JS."
