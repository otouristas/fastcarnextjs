#!/usr/bin/env python3
"""
Extract the SEO blueprint workbook into reviewable JSON.

An .xlsx is a zipped OOXML package, so this needs nothing outside the standard
library — no openpyxl, no pandas, no lockfile churn for a script that runs a
handful of times a year.

    python3 scripts/extract-blueprint.py [workbook.xlsx] [--out docs/seo/blueprint]

Each sheet becomes one JSON file: a `title`, a `note` (the sheet's subtitle row),
the `columns` header row, and `rows` as a list of dicts keyed by column name.
Sheets whose first rows are not a title/note/header triple fall back to raw
`values`. Commit the output so the numbers behind the plan show up in diffs.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
RNS = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"

DEFAULT_WORKBOOK = "naxos_carrentals_complete_seo_blueprint_2026-08-22.xlsx"
DEFAULT_OUT = "docs/seo/blueprint"


def col_index(ref: str) -> int:
    """'AB12' -> 27 (zero-based column number)."""
    letters = re.match(r"([A-Z]+)", ref).group(1)
    n = 0
    for ch in letters:
        n = n * 26 + (ord(ch) - 64)
    return n - 1


def slugify(name: str) -> str:
    s = name.strip().lower().replace("&", "and")
    s = re.sub(r"[^a-z0-9]+", "_", s)
    return s.strip("_")


def shared_strings(zf: zipfile.ZipFile) -> list[str]:
    try:
        root = ET.fromstring(zf.read("xl/sharedStrings.xml"))
    except KeyError:
        return []
    return ["".join(t.text or "" for t in si.iter(NS + "t")) for si in root.findall(NS + "si")]


def cell_value(c: ET.Element, strings: list[str]) -> str:
    inline = c.find(NS + "is")
    if inline is not None:
        return "".join(t.text or "" for t in inline.iter(NS + "t"))
    v = c.find(NS + "v")
    if v is None or v.text is None:
        return ""
    if c.get("t") == "s":
        idx = int(v.text)
        return strings[idx] if idx < len(strings) else ""
    text = v.text
    # Excel stores every number as a float; integers read better as integers.
    if re.fullmatch(r"-?\d+\.0+", text):
        text = text.split(".")[0]
    return text


def read_sheet(zf: zipfile.ZipFile, target: str, strings: list[str]) -> list[list[str]]:
    root = ET.fromstring(zf.read(f"xl/{target}"))
    rows: list[list[str]] = []
    for r in root.iter(NS + "row"):
        cells: dict[int, str] = {}
        for c in r.findall(NS + "c"):
            ref = c.get("r")
            if not ref:
                continue
            value = cell_value(c, strings)
            if value:
                cells[col_index(ref)] = value
        if cells:
            width = max(cells) + 1
            rows.append([cells.get(i, "") for i in range(width)])
        else:
            rows.append([])
    return rows


def sheet_targets(zf: zipfile.ZipFile) -> list[tuple[str, str]]:
    """[(sheet name, worksheet path)] in workbook order."""
    rels = ET.fromstring(zf.read("xl/_rels/workbook.xml.rels"))
    by_id = {rel.get("Id"): rel.get("Target") for rel in rels}
    wb = ET.fromstring(zf.read("xl/workbook.xml"))
    out = []
    for sheet in wb.iter(NS + "sheet"):
        target = by_id.get(sheet.get(RNS + "id"), "")
        if target:
            out.append((sheet.get("name", "sheet"), target.lstrip("/")))
    return out


def structure(name: str, rows: list[list[str]]) -> dict:
    """Most sheets are title / note / header / data. Keep raw values otherwise."""
    doc: dict = {"sheet": name, "title": "", "note": "", "columns": [], "rows": []}
    non_empty = [r for r in rows if any(cell.strip() for cell in r)]
    if not non_empty:
        return doc

    doc["title"] = non_empty[0][0] if non_empty[0] else ""
    body = non_empty[1:]
    if body and len(body[0]) == 1:
        doc["note"] = body[0][0]
        body = body[1:]

    # The header is the first row with more than one populated cell.
    header_at = next((i for i, r in enumerate(body) if sum(1 for c in r if c.strip()) > 1), None)
    if header_at is None:
        doc["values"] = body
        return doc

    header = [c.strip() for c in body[header_at]]
    if any(not h for h in header):
        header = [h or f"col_{i + 1}" for i, h in enumerate(header)]
    doc["columns"] = header

    for row in body[header_at + 1:]:
        if not any(c.strip() for c in row):
            continue
        record = {header[i]: (row[i] if i < len(row) else "") for i in range(len(header))}
        extra = row[len(header):]
        if any(c.strip() for c in extra):
            record["_overflow"] = [c for c in extra if c.strip()]
        doc["rows"].append(record)
    return doc


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("workbook", nargs="?", default=DEFAULT_WORKBOOK)
    ap.add_argument("--out", default=DEFAULT_OUT)
    args = ap.parse_args()

    src = Path(args.workbook)
    if not src.exists():
        print(f"workbook not found: {src}", file=sys.stderr)
        return 1

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    index = []
    with zipfile.ZipFile(src) as zf:
        strings = shared_strings(zf)
        for position, (name, target) in enumerate(sheet_targets(zf), start=1):
            doc = structure(name, read_sheet(zf, target, strings))
            doc["source"] = src.name
            filename = f"{position:02d}_{slugify(name)}.json"
            (out_dir / filename).write_text(
                json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
            )
            count = len(doc.get("rows") or doc.get("values") or [])
            index.append({"file": filename, "sheet": name, "rows": count})
            print(f"{filename:<40} {name:<24} {count:>4} rows")

    (out_dir / "index.json").write_text(
        json.dumps({"source": src.name, "sheets": index}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"\n{len(index)} sheets -> {out_dir}/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
