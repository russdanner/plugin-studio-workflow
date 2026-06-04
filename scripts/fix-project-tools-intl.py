#!/usr/bin/env python3
"""Ensure Crafter Workflow Project Tools <title> has a formatjs id (or plain text)."""
from __future__ import annotations

import re
import sys
from pathlib import Path

MSG_ID = "org.rd.plugin.crafterwf.projectTools.title"
DEFAULT_LABEL = "Crafter Workflow"
TOOL_MARKERS = (
    "crafter-workflow-config",
    "org.rd.plugin.crafterwf.ProjectToolsConfiguration",
)

# Crafter merges Project Tools into ui.xml (reference craftercms.siteTools), not only site-config-tools.xml.


def _tool_blocks(xml: str) -> list[tuple[int, int, str]]:
    blocks: list[tuple[int, int, str]] = []
    for m in re.finditer(r"<tool\b[^>]*>.*?</tool>", xml, flags=re.DOTALL | re.IGNORECASE):
        block = m.group(0)
        if any(marker in block for marker in TOOL_MARKERS):
            blocks.append((m.start(), m.end(), block))
    return blocks


def _fix_title_in_block(block: str) -> str:
    if MSG_ID in block:
        return block

    # Self-closing or open title with defaultMessage but no id
    updated = re.sub(
        r"<title\b(?![^>]*\bid=)(?=[^>]*\bdefaultMessage=)([^>]*)/>",
        rf'<title id="{MSG_ID}"\1/>',
        block,
        count=1,
        flags=re.IGNORECASE,
    )
    if updated != block:
        return updated

    # <title defaultMessage="..." /> without id (alternate attribute order)
    updated = re.sub(
        r'<title\s+defaultMessage="([^"]*)"\s*/>',
        rf'<title id="{MSG_ID}" defaultMessage="\1"/>',
        block,
        count=1,
        flags=re.IGNORECASE,
    )
    if updated != block:
        return updated

    # Nested <title><defaultMessage>...</defaultMessage></title>
    updated = re.sub(
        r"<title>\s*<defaultMessage>([^<]*)</defaultMessage>\s*</title>",
        rf'<title id="{MSG_ID}" defaultMessage="\1"/>',
        block,
        count=1,
        flags=re.DOTALL | re.IGNORECASE,
    )
    if updated != block:
        return updated

    # Plain text title (already safe) — leave as-is
    if re.search(rf"<title>\s*{re.escape(DEFAULT_LABEL)}\s*</title>", block, re.IGNORECASE):
        return block

    return block


def fix_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    blocks = _tool_blocks(text)
    if not blocks:
        return False

    out = text
    offset = 0
    changed = False
    for start, end, block in blocks:
        new_block = _fix_title_in_block(block)
        if new_block == block:
            continue
        changed = True
        s = start + offset
        e = end + offset
        out = out[:s] + new_block + out[e:]
        offset += len(new_block) - len(block)

    if changed:
        path.write_text(out, encoding="utf-8")
    return changed


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("Usage: fix-project-tools-intl.py <site-config-tools.xml> [...]", file=sys.stderr)
        return 1

    fixed_any = False
    for arg in argv[1:]:
        path = Path(arg)
        if not path.is_file():
            print(f"Skip (not found): {path}", file=sys.stderr)
            continue
        if fix_file(path):
            print(f"Fixed Project Tools title in {path}")
            fixed_any = True
        else:
            print(f"No change needed in {path}")
    return 0 if fixed_any or len(argv) > 1 else 1


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
