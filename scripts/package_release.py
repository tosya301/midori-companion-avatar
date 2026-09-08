"""Package only the reviewed Git tree, never the entire working directory."""
from pathlib import Path, PurePosixPath
import argparse
import hashlib
import json
import subprocess
import zipfile

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED = {'.git', '.local', 'node_modules', 'secrets', '__pycache__', '.venv', 'venv', 'test-results', 'playwright-report'}


def package(output):
    output = Path(output).resolve()
    if output == ROOT or ROOT in output.parents:
        raise SystemExit('Output must be outside the project directory.')
    if output.exists() or output.with_suffix(output.suffix + '.receipt.json').exists():
        raise SystemExit('Refusing to overwrite an existing release or receipt.')
    if subprocess.check_output(['git', 'status', '--porcelain', '--untracked-files=no'], cwd=ROOT).strip():
        raise SystemExit('Commit the reviewed tracked files before packaging.')
    revision = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip()
    paths = sorted(subprocess.check_output(['git', 'ls-files', '-z'], cwd=ROOT).decode().strip('\0').split('\0'))
    # A clean git status can hide newline-filter differences. Hash raw working
    # bytes without filters, then compare with the committed object IDs.
    committed = {}
    for record in subprocess.check_output(['git', 'ls-tree', '-rz', 'HEAD'], cwd=ROOT).split(b'\0'):
        if record:
            metadata, name = record.split(b'\t', 1)
            mode, kind, object_id = metadata.split()
            if kind != b'blob' or mode not in {b'100644', b'100755'}:
                raise SystemExit('Only committed regular files can be packaged.')
            committed[name.decode()] = object_id.decode()
    raw_ids = subprocess.check_output(['git', 'hash-object', '--no-filters', '--stdin-paths'], cwd=ROOT, input=('\n'.join(paths) + '\n').encode()).decode().splitlines()
    if set(committed) != set(paths) or len(raw_ids) != len(paths):
        raise SystemExit('Committed file set differs from package selection.')
    mismatches = [name for name, object_id in zip(paths, raw_ids) if committed[name] != object_id]
    if mismatches:
        raise SystemExit(f'Committed bytes differ from working files: {len(mismatches)} file(s). Preserve raw bytes before packaging.')
    manifest = []
    for name in paths:
        p = PurePosixPath(name)
        if p.is_absolute() or '..' in p.parts or EXCLUDED.intersection(p.parts) or (p.name.startswith('.env') and p.name != '.env.example') or p.suffix in {'.bundle', '.log'}:
            raise SystemExit(f'Excluded path was tracked: {name}')
        local = ROOT / name
        if local.is_symlink() or not local.is_file():
            raise SystemExit(f'Only regular files can be packaged: {name}')
        data = local.read_bytes()
        manifest.append({'path': name, 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()})
    packet = {'revision': revision, 'files': manifest, 'file_count': len(manifest), 'scope': 'Local public candidate; asset redistribution rights not cleared by this archive.'}
    output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output, 'x', zipfile.ZIP_DEFLATED, compresslevel=6) as z:
        for entry in manifest:
            z.write(ROOT / entry['path'], entry['path'])
        z.writestr('RELEASE_MANIFEST.json', json.dumps(packet, ensure_ascii=False, indent=2))
    with zipfile.ZipFile(output) as z:
        assert z.testzip() is None
        assert len(z.namelist()) == len(manifest) + 1
        assert len(set(z.namelist())) == len(z.namelist())
        for entry in manifest:
            assert hashlib.sha256(z.read(entry['path'])).hexdigest() == entry['sha256'], entry['path']
    receipt = {'archive': output.name, 'revision': revision, 'bytes': output.stat().st_size, 'sha256': hashlib.sha256(output.read_bytes()).hexdigest(), 'tracked_files': len(manifest), 'archive_members': len(manifest) + 1, 'full_read_and_hash_verification': 'PASS', 'contains_git_history': False, 'uploaded': False}
    output.with_suffix(output.suffix + '.receipt.json').write_text(json.dumps(receipt, indent=2) + '\n', encoding='utf-8')
    output.with_suffix(output.suffix + '.sha256').write_text(f"{receipt['sha256']}  {output.name}\n", encoding='ascii')
    print(json.dumps(receipt, indent=2))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('output', help='New ZIP path outside this repository')
    package(parser.parse_args().output)
