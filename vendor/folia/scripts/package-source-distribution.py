#!/usr/bin/env python3
"""Refresh this source offer without rebuilding Folia.

Requires an existing docs/FOLIA_SOURCE_MANIFEST.json with reviewed provenance.
Recomputes payload/artifact/evidence inventories; preserves reviewed claims.
Run verify-source-distribution.py after this script. This does not publish files.
"""
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import re
import zipfile

root = Path(__file__).resolve().parents[3]
manifest_path = root / 'docs/FOLIA_SOURCE_MANIFEST.json'
manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
excluded = set(manifest['archive']['excluded_directory_names'])

def files_under(folder):
    for base, directories, files in os.walk(root / folder):
        for name in directories + files:
            assert not (Path(base) / name).is_symlink(), 'Source offer cannot contain symlinks'
        directories[:] = sorted(d for d in directories if d not in excluded)
        for name in sorted(files):
            if name in manifest['archive']['excluded_file_names'] or name.endswith(('.log', '.pyc', '.tsbuildinfo')):
                continue
            if name.startswith('.env') and name != '.env.example':
                continue
            yield Path(base) / name

def record(path):
    data = path.read_bytes()
    return {'path': path.relative_to(root).as_posix(), 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()}

payload = list(files_under('vendor/folia')) + list(files_under('lyrics-stage/licenses'))
payload += [root / 'lyrics-stage/THIRD_PARTY.md', root / 'docs/FOLIA_BUILD.md']
payload.sort(key=lambda p: p.relative_to(root).as_posix())
assert len(payload) == len(set(payload))
# These identify developer-host locations or credential-shaped values; no logs,
# private repository history or installed dependency trees enter the payload.
secret_pattern = re.compile(rb'/home/[A-Za-z0-9_.-]+/|/mnt/[c-z]/|ghp_[A-Za-z0-9]{30,}|sk-proj-[A-Za-z0-9_-]{20,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----')
for path in payload:
    # Public upstream documentation uses this explicit fictional Linux example.
    scanned = path.read_bytes().replace(b'/home/yourname/', b'<example-home>/')
    assert not secret_pattern.search(scanned), 'Potential private data in ' + str(path.relative_to(root))
manifest['generated_at_utc'] = datetime.now(timezone.utc).isoformat()
manifest['source_payload'] = [record(p) for p in payload]
manifest['deployed_artifacts'] = [record(p) for p in sorted((root / 'lyrics-stage/folia').rglob('*')) if p.is_file()]
manifest['evidence_files'] = [record(p) for p in sorted((root / 'vendor/folia/build-evidence').glob('*.log'))]
manifest['counts'] = {'source_vendor_files': sum(r['path'].startswith('vendor/folia/') for r in manifest['source_payload']), 'payload_files_excluding_manifest': len(payload), 'archive_files': len(payload) + 1, 'deployed_files': len(manifest['deployed_artifacts']), 'source_payload_bytes_excluding_manifest': sum(r['bytes'] for r in manifest['source_payload'])}
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
archive_path = root / 'source/folia-source.zip'
archive_path.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(archive_path, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
    for path in sorted(payload + [manifest_path]):
        relative = path.relative_to(root).as_posix()
        info = zipfile.ZipInfo('folia-source/' + relative, date_time=(2026, 9, 8, 0, 0, 0))
        info.create_system = 3
        executable = path.suffix in {'.sh', '.py'}
        info.external_attr = (0o100755 if executable else 0o100644) << 16
        info.compress_type = zipfile.ZIP_DEFLATED
        archive.writestr(info, path.read_bytes(), compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
print(json.dumps({'counts': manifest['counts'], 'archive_bytes': archive_path.stat().st_size, 'archive_sha256': hashlib.sha256(archive_path.read_bytes()).hexdigest()}, indent=2))
