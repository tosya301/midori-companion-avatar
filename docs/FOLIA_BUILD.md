# Folia corresponding source and reproducible build procedure

## Status and boundaries

### Release 0.1 integration

The checkout now includes the accepted local-audition isolation change:
`lyricStage=1&localAudition=1` selects host-owned audio progress and supplied
lyrics, skipping connected-service progress probes and automatic lyric upgrades.
The rebuilt 105-file deployment matches the candidate build exactly. Typecheck
and Vite build passed; the selected suite reports 734 passed / 1 skipped across
89 passed / 1 skipped test files. Evidence: `local-audition-*.log` in the existing
build-evidence folder. All twelve modes were loaded with local audio in the
browser; this is not a sustained animation-performance or live Spotify test.

The corresponding source archive/manifest is refreshed for release 0.1.
The production-preservation comparisons and initial build logs below describe
the historical packaging baseline, not equality of this new runtime to it.

This distribution includes the modified Folia source used for the local Midori
lyric-stage candidate, not a pointer to a developer workspace. The working tree
is `vendor/folia/`; the downloadable source offer is `source/folia-source.zip`.
The ZIP preserves this relative layout under `folia-source/`, including this
document, the machine-readable manifest and license notices. No private Git
history, patch replay, credentials or developer-host symlinks are required.

**Full-asset public release; supplied-media permission is maintainer-confirmed.**
On 2026-09-08 the maintainer confirmed the permissions required to publicly
redistribute all supplied media and authorized the complete release. This is a
maintainer declaration, not an independent legal audit or official endorsement.
Folia's AGPL-3.0 and Original's MIT license do not themselves grant media rights
or override dependency obligations. Artwork is retained, not replaced with
placeholders. See [THIRD_PARTY.md](../lyrics-stage/THIRD_PARTY.md).

## Provenance and source selection

- Upstream: <https://github.com/chthollyphile/folia-major>.
- Recorded base: package **0.6.16**, commit
  `446e9038b8e43f44d4ed0628ce5b8fc8ad22538c`.
- Recorded selected v0.7.3 backports: commit
  `04d222779b2bd63fd04436cb7477c7de5dd5f008`.
  These are provenance identifiers carried forward from the existing integration,
  not a claim that every patch was newly audited against upstream Git objects.
- Author: chthollyphile and contributors. Original README, contributor records,
  package metadata and the upstream AGPL license are retained.
- Tim's already-applied renderer/embedding changes are described in
  [MIDORI_MODIFICATIONS.md](../vendor/folia/MIDORI_MODIFICATIONS.md).

Source selection was checked against the **current deployed production renderer**,
not merely the newest-named experiment folder. A September 7 flash/unified-lyrics
experiment contained changes to four runtime files and four extra source/test
files. The subsequent September 8 recovery record explicitly says that the failed
unified-lyrics changes, including Folia's deployed assets and editable source,
were reverted. That experiment is therefore **not** the production source to
publish. The recovered production source and candidate have identical runtime
source, tests, package/lockfile and renderer-asset bytes. Its release marker and
private development metadata are omitted. The only modified production build
input is `vite.config.ts`, which removes Git/CI/commit-name-service metadata
lookups and uses deterministic `Midori` / `source-distribution` labels.
Documentation and distribution/license-verification scripts are additional files.
No private originals were edited in preparing this offer.

The original production deployment and candidate each contain 105 files. Of
these, 96 have identical paths and bytes. The other nine are the HTML entry and
eight JS chunks whose content hashes changed. Comparing **all 105 files** after
normalizing their hashed asset filenames and the single informational version
label yields byte equality. Image pixels, CSS, renderer logic and playback
behavior are therefore retained at the artifact level; this is not a claim of
new live Spotify or visual acceptance testing. The successful candidate build's
`dist/` and deployed `lyrics-stage/folia/` match exactly, without normalization.

## Included source scope

The archive includes the complete retained Folia project source: `src/`, `public/`,
`assets/`, `build/` (required desktop/icon assets, not disposable build output),
`api/`, `api-ts/`, `shared/`, `electron/`, `worker/`, `sync-server/`, packaging and
deployment files, scripts, tests, HTML entry points, TypeScript/Vite/Vitest/
Playwright configuration, package manifest and lockfile, upstream documentation,
contributors, licenses and public project configuration. `.env.example` is an
example, not a configured credential file. `.github/` contains retained public
workflow source, not repository history. All twelve visualizer entries remain:

`classic`, `cadenza`, `partita`, `tilt`, `fume`, `monet`, `claddagh`, `pendolo`,
`diorama`, `sonnet`, `cappella`, `tempera`.

Excluded from the source ZIP: `.git`, installed `node_modules`, compiled `dist`,
private agent/index metadata, runtime `.env` files, release-marker metadata,
caches, coverage/test reports and build logs. The upstream `public/icon.svg.bak`
asset is intentionally retained: Vite copies the public directory verbatim, so
removing it would change output membership even though it is not the active icon.
The manifest separates source payload from deployed artifacts.

## Build from the ZIP or checkout

Requirements: Node.js **24 or newer** (upstream `engines` and `.nvmrc`), npm,
Python 3 for integrity checks, network access to pinned dependency sources, and a
modern browser with WebGL/WebGPU capabilities as appropriate to the visualizer.
The build environment inspected during this handoff has Node **v24.16.0** and npm
**11.17.0** on Linux/WSL. These versions are observed environment information,
not proof of a cross-platform bit-for-bit reproducibility guarantee.

After extracting the archive, use its `folia-source/` directory as the root.
Commands below are POSIX-shell commands; the public checkout has the same layout.

```sh
cd vendor/folia
npm ci --ignore-scripts
npm run typecheck
MIDORI_LYRIC_STAGE_BUILD=1 ELECTRON=true node node_modules/vite/bin/vite.js build
npm run test:unit -- --maxWorkers=2 --testTimeout=20000 \
  test/unit/visualizer test/unit/lyrics \
  test/unit/hooks/nowPlayingClock.test.ts \
  test/unit/services/nowPlayingProvider.test.ts
```

`npm ci --ignore-scripts` uses the existing lockfile and avoids unnecessary
Electron downloads/install hooks. This static renderer does not need the desktop
runtime. The lockfile includes a root-declared GitHub tarball; retain `.npmrc` and
the exact lockfile rather than replacing dependencies with `npm install`.
`MIDORI_LYRIC_STAGE_BUILD=1` disables PWA generation; `ELECTRON=true` selects
relative `./` asset URLs and **does not start Electron**. Invoke Vite directly for
this target: upstream `npm run build` additionally compiles Vercel API code and
is not the recorded embedded-renderer build command. No secrets are required for
compiling the static renderer. Network lyric providers are separate runtime
services, not build prerequisites.

The static output is `vendor/folia/dist/`. To deploy it, copy the **entire** output
into the host's `lyrics-stage/folia/`, replacing stale hashed assets as a set.
Do not copy `node_modules` or run the Electron package/deploy scripts. The source
ZIP itself is not the full Midori host application; embed it using the public
host project, or supply an equivalent same-origin parent message bridge.

## Runtime interface

Open the Folia entry inside a same-origin iframe with `?lyricStage=1`. Bootstrap
logic lives in `src/index.tsx`; the transport implementation and envelope types
are in `src/services/nowPlayingProvider.ts` and `src/types.ts`.

- Child sends `{ type: 'midori-lyrics-ready', engine: 'folia' }` to its parent.
- Parent sends `{ type: 'midori-lyrics-events', events: [...] }` using the
  renderer's typed Now Playing event envelopes, not a newly invented protocol.
- The child accepts messages only from `window.parent` with the same origin.
- In embedded lyric-stage mode this transport replaces the legacy localhost
  WebSocket connection. Opening Folia standalone is not equivalent to exercising
  the host integration and may enable different upstream application behavior.

The existing provider tests cover transport behavior. No live account actions,
Spotify playback operations or remote lyric-provider availability checks were
performed for this packaging handoff. Monet's breathing rail is not newly added
Spotify PCM/FFT analysis. Tempera retains its opaque treatment; its optional
editor is not newly integrated. Cappella retains the supplied two avatars and
three stickers, fixed left 奶黑 / right 阿绿, with independent media rights.

## Existing build and test evidence (2026-09-08)

No needless rebuild or test rerun was performed in the final packaging pass.
Existing logs were inspected and their output checked against the deployed files:

| Evidence in `vendor/folia/build-evidence/` | Result |
| --- | --- |
| `typecheck.log` | `tsc --noEmit`, exit 0 |
| `vite-build.log` | Vite 8.2.1, 3,639 modules, built in 14.17 s, exit 0 |
| `unit-tests-final.log` | **711 passed, 1 skipped**; **87 files passed, 1 skipped**; exit 0; 73.72 s |
| `unit-tests-limited-workers.log` | Earlier attempt: 710 passed, 1 failed, 1 skipped; exit 1 |
| `unit-tests.log` | Earlier attempt: 700 passed, 1 failed, 1 skipped; exit 1; two requested test paths were incorrect |

The latest successful command is the bounded-worker, 20-second-timeout command
above. Earlier runs timed out in `temperaPixiCompatibility.test.ts` under the
default 5-second test timeout. They are **not** concealed or described as passes.
An earlier artifact-comparison operation also exceeded its tool timeout; the
later completed normalized byte comparison described above supersedes it.
The upstream test selection intentionally skips one test. This is a targeted
renderer/lyrics/clock/provider suite, **not the full repository unit suite**, E2E
browser suite, Electron build or visual/real-audio validation.

Vite warns about chunks over 500 kB and reports plugin timing information. These
warnings are retained; they did not fail the build. Large lazy/runtime bundles
are not newly optimized here. Build logs are sanitized in the working tree and
excluded from the source ZIP; their actual hashes and results are recorded in
the manifest so the self-contained source documentation does not require logs.

## Integrity and license verification

`FOLIA_SOURCE_MANIFEST.json` contains SHA-256 and byte counts for every source ZIP
payload file (except the manifest itself, to avoid a self-hash cycle), every
deployed renderer file, and recorded evidence. It records exclusions and source
selection. The manifest is identical inside/outside the ZIP. The ZIP is not
listed inside its own manifest, avoiding a recursive archive checksum.

From the distribution root, with no Node dependencies installed:

```sh
python3 vendor/folia/scripts/verify-source-distribution.py
# In the public checkout containing the offered ZIP and compiled deployment:
python3 vendor/folia/scripts/verify-source-distribution.py \
  --archive source/folia-source.zip --artifacts
```

The verifier checks all payload hashes, ZIP membership/duplicates/CRC/path safety,
absence of archive symlinks, identical manifest bytes and optionally exact
artifact membership/hashes. It is an integrity check, not a digital signature.

`lyrics-stage/licenses/folia-dependencies/index.json` inventories **1,157**
installed packages (including build/development dependencies), with **1,011**
distinct copied notice files. **51** installed packages have no separate notice
file; **88** uninstalled entries are optional platform packages. This is not a
runtime-only SBOM, a complete transitive corresponding-source audit, a security
audit or legal clearance. Regenerate the inventory after an intentional dependency
change with `python3 scripts/collect-dependency-licenses.py` from `vendor/folia/`.
After reviewing any source/build changes and updating provenance and evidence,
run `python3 scripts/package-source-distribution.py` from that same directory,
then run the verifier above. Packaging refreshes the inventories and ZIP; it does
not rerun tests or independently validate preserved provenance claims. The archive preserves the
full Folia AGPL text, Tim's Original MIT notice and existing dependency notices.
Never apply the host MIT license to Folia or to independently owned images.
