# Midori changes to Folia

Upstream: chthollyphile/folia-major, AGPL-3.0; base package 0.6.16, recorded
commit `446e9038b8e43f44d4ed0628ce5b8fc8ad22538c`. Selected v0.7.3 backports
come from `04d222779b2bd63fd04436cb7477c7de5dd5f008`. Upstream authorship,
license and contributor notices are retained. Tim's adaptations are already
applied in this source distribution; it is not an unmodified upstream release.

## Renderer adaptations retained

## Local audition integration (local checkout; not yet released)

An explicit `lyricStage=1&localAudition=1` iframe mode now uses host-supplied
audio progress and line lyrics, without Spotify progress probes or automatic
online lyric replacement. Pending requests are invalidated on source changes
and teardown; same-origin parent validation is unchanged. Renderer designs and
all twelve mode entries are preserved. See `LOCAL_AUDITION.md` for evidence.
This adds runtime changes beyond the historical source-distribution-only
preparation described below; that earlier byte-equality claim is historical.

- Embedded `lyricStage=1` bootstrap and same-origin parent-message Now Playing
  transport, progress clock and word-timed lyric matching; the deployed behavior
  is retained rather than the subsequently abandoned unified-lyrics experiment.
- Transparent host composition and twelve mode entries, including Tempera with
  its original opaque visual treatment and lazy renderer boundary.
- Monet free-space cover placement, host transform timeline/reversal matching,
  88px audio rail, last-good-cover crossfade and descender clipping; Day title
  and artist use white fill with soft grey-green shadow. No new PCM/FFT capture.
- Pendolo Day central-gradient suppression and grey-green clockwork/context
  lyric fill with the retained shadow and no outline; Night unchanged.
- Sonnet clipping/filter padding, high-precision Pixi initialization and wash;
  selected Pendolo bounding-box optimization. This is not the broader upstream
  Sonnet transition rewrite or the full v0.7.3 application update.
- Cappella Midori-only fixed left 奶黑 / right 阿绿, two supplied avatar images and
  three supplied transparent stickers. Standalone preferences stay unchanged.

## Source-distribution preparation — 2026-09-08

The only change to the recovered production build inputs is `vite.config.ts`:
replace optional Git/CI commit, branch, release-label and commit-name-service
metadata with deterministic source-distribution labels. No Git command or
commit-name network request is performed by this build configuration. This
changes bundle hashes and the informational version label, not visuals or
playback logic. All recovered `src/`, assets, package and lockfile bytes were
retained. Supporting source-offer, license-inventory and verification scripts
and documentation were added. Git objects, private agent workspace metadata,
installed dependencies, compiled output and caches are not part of the source
archive. Upstream project documentation, tests, licenses and contributors remain.

Full provenance, build evidence and limitations are in `docs/FOLIA_BUILD.md` and
`docs/FOLIA_SOURCE_MANIFEST.json` at the distribution root. Artwork rights remain
separate from the code license: see `lyrics-stage/THIRD_PARTY.md`. This notice
does not claim permission to publish the supplied character artwork.
