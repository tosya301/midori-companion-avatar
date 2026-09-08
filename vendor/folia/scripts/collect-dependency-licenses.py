#!/usr/bin/env python3
"""Inventory installed Folia dependency licenses without copying dependencies.

Run after npm ci --ignore-scripts from this source tree. This records package
metadata and supplied notice files, not a legal compatibility determination.
"""
from pathlib import Path
import hashlib
import json
import re
import shutil

SOURCE = Path(__file__).resolve().parents[1]
DEST = SOURCE.parents[1] / "lyrics-stage" / "licenses" / "folia-dependencies"
LOCK = json.loads((SOURCE / "package-lock.json").read_text())
DEST.mkdir(parents=True, exist_ok=True)
records = []
missing_installs = []
for key, locked in sorted(LOCK["packages"].items()):
    if not key:
        continue
    package = SOURCE / key
    metadata_file = package / "package.json"
    if not metadata_file.is_file():
        missing_installs.append({"path": key, "optional": bool(locked.get("optional")), "os": locked.get("os"), "cpu": locked.get("cpu")})
        continue
    metadata = json.loads(metadata_file.read_text())
    name = metadata.get("name", key.split("node_modules/")[-1])
    version = metadata.get("version", locked.get("version"))
    folder = re.sub(r"[^A-Za-z0-9._-]", "_", name) + "@" + str(version)
    notices = []
    # Root licenses are package-author-supplied. Also retain named notice files
    # immediately under LICENSES, used by some packages for bundled components.
    candidates = [p for p in package.iterdir() if p.is_file() and re.match(r"^(licen[cs]e|copying|copyright|notice)([._-]|$)", p.name, re.I)]
    for directory in ("LICENSES", "licenses"):
        if (package / directory).is_dir():
            candidates.extend(p for p in (package / directory).rglob("*") if p.is_file() and not p.is_symlink())
    for notice in sorted(set(candidates)):
        relative = notice.relative_to(package)
        output = DEST / folder / relative
        output.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(notice, output)
        notices.append({"file": str(output.relative_to(DEST)), "sha256": hashlib.sha256(output.read_bytes()).hexdigest()})
    records.append({"name": name, "version": version, "installed_path": key, "declared_license": metadata.get("license", locked.get("license")), "repository": metadata.get("repository"), "notice_files": notices})
result = {"scope": "All packages installed by the supplied lockfile on this build platform (includes development/build dependencies); not a runtime-only SBOM or legal approval.", "package_count": len(records), "packages_without_notice_files": [r["installed_path"] for r in records if not r["notice_files"]], "not_installed_platform_packages": missing_installs, "packages": records}
(DEST / "index.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
print(json.dumps({"installed_packages": len(records), "without_notice_files": len(result["packages_without_notice_files"]), "not_installed": len(missing_installs), "notice_files": len({n["file"] for r in records for n in r["notice_files"]})}))
