import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest
import zipfile

SCRIPT = Path(__file__).resolve().parents[1] / 'scripts/package_release.py'


class PackagingTests(unittest.TestCase):
    def test_clean_git_with_newline_conversion_is_rejected_until_bytes_preserved(self):
        with tempfile.TemporaryDirectory() as temp:
            parent = Path(temp)
            root = parent / 'repo'
            root.mkdir()
            (root / 'scripts').mkdir()
            shutil.copy2(SCRIPT, root / 'scripts/package_release.py')
            def git(*args):
                return subprocess.run(['git', *args], cwd=root, check=True, capture_output=True).stdout
            git('init', '-b', 'main')
            git('config', 'user.name', 'Packaging fixture')
            git('config', 'user.email', 'fixture@example.invalid')
            git('config', 'core.autocrlf', 'false')
            (root / '.gitattributes').write_text('* text=auto eol=lf\n')
            payload = b'license fixture\r\nsecond line\r\n'
            (root / 'NOTICE.txt').write_bytes(payload)
            git('add', '.gitattributes', 'NOTICE.txt', 'scripts/package_release.py')
            git('commit', '-m', 'fixture')
            self.assertEqual(git('status', '--porcelain'), b'')
            output = parent / 'candidate.zip'
            def package():
                return subprocess.run([sys.executable, str(root / 'scripts/package_release.py'), str(output)], cwd=root, capture_output=True, text=True)
            rejected = package()
            self.assertNotEqual(rejected.returncode, 0)
            self.assertIn('Committed bytes differ', rejected.stderr)
            self.assertFalse(output.exists())
            (root / '.gitattributes').write_text('* -text\n')
            git('add', '--renormalize', '.')
            git('commit', '-m', 'preserve original bytes')
            accepted = package()
            self.assertEqual(accepted.returncode, 0, accepted.stderr)
            with zipfile.ZipFile(output) as archive:
                self.assertEqual(archive.read('NOTICE.txt'), payload)
                manifest = json.loads(archive.read('RELEASE_MANIFEST.json'))
                for entry in manifest['files']:
                    self.assertEqual(hashlib.sha256(archive.read(entry['path'])).hexdigest(), entry['sha256'])
            receipt = json.loads(output.with_suffix('.zip.receipt.json').read_text())
            self.assertEqual(receipt['sha256'], hashlib.sha256(output.read_bytes()).hexdigest())
            self.assertEqual(receipt['tracked_files'], 3)
            self.assertEqual(receipt['archive_members'], 4)
            self.assertFalse(receipt['uploaded'])
            self.assertNotEqual(package().returncode, 0)


if __name__ == '__main__':
    unittest.main()
