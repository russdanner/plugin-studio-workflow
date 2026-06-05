# Crafter Workflow API tests

curl-based integration tests for every **implemented** plugin REST endpoint under:

```
/studio/api/2/plugin/script/plugins/org/rd/plugin/crafterwf/crafterwf/
```

See [endpoints.manifest.json](./endpoints.manifest.json) for the full endpoint catalog and [../../docs/API_CONTRACT.md](../../docs/API_CONTRACT.md) for request/response shapes.

## Prerequisites

| Requirement | Notes |
|-------------|--------|
| Running Crafter Studio | Plugin installed on target site |
| Schema installed | Project Tools → Crafter Workflow → General → Install schema |
| `curl`, `jq`, `python3` | Used for HTTP, JSON assertions, URL encoding |
| Studio Bearer token | `CRAFTER_STUDIO_TOKEN` or `scripts/.studio-token` |

Copy the token example:

```bash
cp scripts/.studio-token.example scripts/.studio-token
# Paste a fresh Bearer token from Studio DevTools → Application → Cookies (or network tab)
```

Tokens expire quickly and invalidate after Studio restarts.

## Quick start

```bash
# Read-only smoke (GET endpoints + auth)
./scripts/run-api-tests.sh --smoke

# Full suite: reads, mutations, negative cases, cleanup
./scripts/run-api-tests.sh

# Single area
./scripts/run-api-tests.sh --suite read
./scripts/run-api-tests.sh --suite mutations
./scripts/run-api-tests.sh --suite admin
```

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `STUDIO_URL` | `http://localhost:8080` | Studio base URL |
| `SITE_ID` | `workflow` | Target site |
| `WORKFLOW_ID` | `editorial` | Workflow slug for board tests |
| `WORKFLOW_STEP_ID` | `backlog` | Step for new packages (auto-resolved from board) |
| `TEST_CONTENT_PATH` | `/site/website/index.xml` | Content path for attach tests |
| `CRAFTER_STUDIO_TOKEN` | — | Bearer token (required) |
| `RUN_SCHEMA_INSTALL` | unset | Set to `1` to run `admin/schema/install` |
| `TEST_RUN_ID` | timestamp | Prefix for created entities |
| `TEST_PREFIX` | `curl-test-<runId>` | Human-readable test label prefix |

Example against another site:

```bash
SITE_ID=demo WORKFLOW_ID=editorial ./scripts/run-api-tests.sh --smoke
```

## Suites

| Suite | Flag | What it covers |
|-------|------|----------------|
| `smoke` | `--smoke` | Auth + all GET read endpoints |
| `auth` | `--suite auth` | Token and schema status |
| `read` | `--suite read` | Admin, board, packages, comments, tasks, notifications, audit (GET) |
| `mutations` | `--suite mutations` | Create/update packages, comments, tasks, notifications, admin workflow CRUD |
| `admin` | `--suite admin` | Admin workflow read + create/save/delete |
| `negative` | `--suite negative` | Missing params, invalid IDs |
| `cleanup` | `--suite cleanup` | Archive test package, delete temp workflow |
| `all` | (default) | Everything above in order |

Use `--keep-fixtures` to leave the test package on the site (skips cleanup).

## Layout

```
scripts/tests/
├── run-all.sh              # Main runner
├── endpoints.manifest.json # Endpoint → suite mapping
├── README.md
├── lib/
│   ├── common.sh           # Pass/fail/skip counters
│   ├── env.sh              # Defaults + token load
│   ├── http.sh             # api_get/post/delete/post_json
│   ├── assert.sh           # HTTP + jq assertions
│   └── fixtures.sh         # Package/task/comment/workflow fixtures
└── suites/
    ├── 00-auth.sh
    ├── 10-read-admin.sh
    ├── 11-read-workflow.sh
    ├── 12-read-comments-tasks-notifications.sh
    ├── 20-mutations-workflow-package.sh
    ├── 21-mutations-comments.sh
    ├── 22-mutations-tasks.sh
    ├── 23-mutations-notifications.sh
    ├── 24-mutations-admin.sh
    ├── 30-cleanup.sh
    └── 90-negative.sh
```

## Adding tests

1. Add or update a REST script under `authoring/scripts/rest/plugins/org/rd/plugin/crafterwf/crafterwf/`.
2. Register it in `endpoints.manifest.json`.
3. Add assertions to the appropriate `suites/*.sh` file using `api_get` / `api_post` / `api_delete` and `assert_*` helpers.
4. If the endpoint creates data, add fixture helpers in `lib/fixtures.sh` and cleanup in `30-cleanup.sh`.

### Helper patterns

```bash
api_get workflow/board "workflowId=${WORKFLOW_ID}"
assert_http_2xx "GET workflow/board"
assert_result_has "board has workflowSteps" '(.workflowSteps | type) == "array"'

api_post task/create "title=My task" "priority=medium"
assert_http_2xx "POST task/create"
```

`api_post_json` uses real HTTP POST for `admin/workflow/save` (JSON body). All other mutations use HTTP GET against `*.get.groovy` scripts — Crafter Studio plugin REST does not reliably execute query-parameter mutations via POST/DELETE.

## Report output

At the end of every run, the framework prints a full **TEST RESULTS REPORT**:

- **Complete ledger** — every test grouped by suite with status icons (`✅` pass, `❌` fail, `⏭️` skip)
- **Type icons** — `🛡️` auth, `📖` read, `✏️` mutation, `⚡` negative, `🧹` cleanup, `⚙️` config
- **Summary counts** — passed, failed, skipped, total, duration
- **By-type breakdown** — pass/fail/skip per category
- **Failure & skip sections** — failed tests with error details; skipped tests with reasons
- **Final banner** — `🎉 ALL TESTS PASSED` or `💥 TEST RUN FAILED`

## CI / automation

Exit code is `0` when all non-skipped tests pass, `1` when any fail, `2` for setup errors (missing token, jq, etc.).

```bash
#!/bin/bash
set -euo pipefail
export CRAFTER_STUDIO_TOKEN="${STUDIO_TOKEN_FROM_CI}"
./scripts/run-api-tests.sh --smoke
```

For full regression after deploy:

```bash
./scripts/run-api-tests.sh
```

## Coverage notes

- **39 endpoints** are implemented and covered by this suite (see manifest).
- **Documented but not implemented** (skipped): `workflow-step/*`, `workflow-package/attach-link`, `notification/preferences/*`.
- `admin/schema/install` runs only when `RUN_SCHEMA_INSTALL=1` (idempotent but intentionally opt-in).
