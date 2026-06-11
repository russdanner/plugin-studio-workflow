#!/usr/bin/env python3
"""Normalize content-type controllers to stock CommonLifecycleApi (workflow hook lives in default-site)."""

from __future__ import annotations

import pathlib
import re
import sys

STOCK_CONTROLLER = """\
/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import scripts.libs.CommonLifecycleApi

def contentLifecycleParams =[:]
contentLifecycleParams.site = site
contentLifecycleParams.path = path
contentLifecycleParams.user = user
contentLifecycleParams.contentType = contentType
contentLifecycleParams.contentLifecycleOperation = contentLifecycleOperation
contentLifecycleParams.contentLoader = contentLoader
contentLifecycleParams.applicationContext = applicationContext

def controller = new CommonLifecycleApi(contentLifecycleParams)
controller.execute()
"""

MARKERS = (
    "crafterwf-workflow-lifecycle",
    "CrafterwfWorkflowLifecycleBridge",
    "WorkflowContentLifecycleBridge",
    "crafterwf-workflow-lifecycle.groovy",
)


def needs_normalize(text: str) -> bool:
    if any(marker in text for marker in MARKERS):
        return True
    if re.search(r": \$\{e\.message\}", text):
        return True
    if "controller.execute()" not in text:
        return True
    tail = text.split("controller.execute()", 1)[-1].strip()
    return bool(tail)


def patch_controller(path: pathlib.Path) -> bool:
    original = path.read_text(encoding="utf-8")
    if not needs_normalize(original):
        return False
    path.write_text(STOCK_CONTROLLER, encoding="utf-8")
    return True


def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: patch-content-lifecycle-controllers.py <site-repo-path>", file=sys.stderr)
        return 1

    site_repo = pathlib.Path(sys.argv[1]).resolve()
    controllers_root = site_repo / "config/studio/content-types"
    if not controllers_root.is_dir():
        print(f"No content-types folder under {site_repo}; skipped controller patch.")
        return 0

    patched = 0
    for controller in controllers_root.rglob("controller.groovy"):
        if patch_controller(controller):
            patched += 1

    print(f"Normalized {patched} content-type controller(s) (workflow hook is in CommonLifecycleApi)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
