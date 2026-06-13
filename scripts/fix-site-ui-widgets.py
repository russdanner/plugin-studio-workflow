#!/usr/bin/env python3
"""Fix stale Crafter Workflow widget ids in site ui.xml after plugin upgrades."""

from __future__ import annotations

import pathlib
import sys

REPLACEMENTS = {
    'org.rd.plugin.crafterwf.recycleBinPanel': 'org.rd.plugin.crafterwf.recycleBinDialog',
}


def patch_ui_xml(path: pathlib.Path) -> bool:
    text = path.read_text(encoding='utf-8')
    updated = text
    for old, new in REPLACEMENTS.items():
        updated = updated.replace(old, new)
    if updated == text:
        return False
    path.write_text(updated, encoding='utf-8')
    return True


def main() -> int:
    if len(sys.argv) < 2:
        print('Usage: fix-site-ui-widgets.py <site-sandbox-path>', file=sys.stderr)
        return 1
    ui_xml = pathlib.Path(sys.argv[1]).resolve() / 'config/studio/ui.xml'
    if not ui_xml.is_file():
        print(f'No ui.xml at {ui_xml}; skipped widget id patch.')
        return 0
    if patch_ui_xml(ui_xml):
        print(f'Patched stale widget ids in {ui_xml}')
    else:
        print(f'No stale widget ids found in {ui_xml}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
