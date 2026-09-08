#!/usr/bin/env python3
"""Verify source-offer payload hashes, optionally its ZIP and deployed artifacts.
Run from any directory. Uses only Python's standard library.
"""
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import stat
import zipfile

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--archive', type=Path, help='Verify the source ZIP as well')
parser.add_argument('--artifacts', action='store_true', help='Require and verify deployed renderer files')
args = parser.parse_args()
root = Path(__file__).resolve().parents[3]
manifest_path = root / 'docs/FOLIA_SOURCE_MANIFEST.json'
manifest = json.loads(manifest_path.read_text(encoding='utf-8'))

def check(data, record):
    assert len(data) == record['bytes'], record['path'] + ': size mismatch'
    assert hashlib.sha256(data).hexdigest() == record['sha256'], record['path'] + ': hash mismatch'

for record in manifest['source_payload']:
    target = root / record['path']
    assert not target.is_symlink(), record['path'] + ': symlink not allowed'
    check(target.read_bytes(), record)
print('Source payload verified:', len(manifest['source_payload']), 'files (manifest itself excluded)')
if args.artifacts:
    artifact_root = root / 'lyrics-stage/folia'
    actual = {str(p.relative_to(root)) for p in artifact_root.rglob('*') if p.is_file()}
    assert actual == {r['path'] for r in manifest['deployed_artifacts']}, 'Artifact file set mismatch'
    for record in manifest['deployed_artifacts']:
        check((root / record['path']).read_bytes(), record)
    print('Deployed artifacts verified:', len(actual), 'files')
if args.archive:
    prefix = 'folia-source/'
    expected = {prefix + r['path'] for r in manifest['source_payload']} | {prefix + 'docs/FOLIA_SOURCE_MANIFEST.json'}
    with zipfile.ZipFile(args.archive) as archive:
        names = archive.namelist()
        assert len(names) == len(set(names)), 'Duplicate archive entries'
        assert set(names) == expected, 'Archive file set mismatch'
        assert archive.testzip() is None, 'Archive CRC failure'
        for info in archive.infolist():
            p = PurePosixPath(info.filename)
            assert not p.is_absolute() and '..' not in p.parts, 'Unsafe archive member'
            assert not stat.S_ISLNK(info.external_attr >> 16), 'Archive symlink'
        for record in manifest['source_payload']:
            check(archive.read(prefix + record['path']), record)
        assert archive.read(prefix + 'docs/FOLIA_SOURCE_MANIFEST.json') == manifest_path.read_bytes(), 'Manifest differs'
    print('Archive verified:', len(expected), 'regular files; SHA-256', hashlib.sha256(args.archive.read_bytes()).hexdigest())
