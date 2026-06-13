#!/usr/bin/env bash
# Run TypeScript unit tests for crafterwf-board-components (no Studio required).
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT}/src"
yarn test:unit
