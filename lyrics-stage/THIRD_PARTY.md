# Lyric-stage authorship, source and licenses

## Original: Tim's own renderer (MIT)

`original/` is Tim's self-developed lyric renderer, not an unrelated upstream or
third-party project. It retains six modes: `luminous`, `blueprint`, `cinema`,
`pixel`, `cloud`, and `mindscape`. Copyright (c) 2026 Tim and contributors.
See [the MIT notice](licenses/original-MIT.txt). Its code license does not grant
rights to independent artwork, music, lyrics or other supplied media.

## Folia: modified AGPL code, complete corresponding source

Folia is derived from [chthollyphile/folia-major](https://github.com/chthollyphile/folia-major),
base package version **0.6.16**, recorded base commit
`446e9038b8e43f44d4ed0628ce5b8fc8ad22538c`. Selected changes were backported from
[v0.7.3](https://github.com/chthollyphile/folia-major/releases/tag/v0.7.3), commit
`04d222779b2bd63fd04436cb7477c7de5dd5f008`; this is **not** a full v0.7.3 upgrade.
Upstream author chthollyphile and contributors remain credited in
`vendor/folia/package.json`, `CONTRIBUTORS.md`, `.all-contributorsrc` and the
unmodified upstream README. Folia code remains under its supplied
**AGPL-3.0** notice: [full license](licenses/folia-AGPL-3.0.txt), also retained as
`vendor/folia/LICENSE`. It is not relicensed under the host's MIT license.

Tim's Midori adaptations include the same-origin parent-message lyric transport,
transparent embedded document, all twelve registered visualizers, Monet geometry
and shared host motion, Pendolo Day styling, selected Sonnet/Monet/Pendolo fixes,
Tempera and the Cappella conversation pack. The source-distribution preparation
on 2026-09-08 changes build metadata only, not renderer code, timing, colors,
geometry or image pixels. See `vendor/folia/MIDORI_MODIFICATIONS.md`.

Retained modes: `classic`, `cadenza`, `partita`, `tilt`, `fume`, `monet`,
`claddagh`, `pendolo`, `diorama`, `sonnet`, `cappella`, `tempera`.
Tempera retains its intentional opaque painters and default effect; its optional
editor/settings UI is not newly integrated. Monet's host-only audio rail uses
simulated breathing when no local audio analysis exists, not Spotify PCM/FFT.
Cappella retains fixed left 奶黑 and right 阿绿 with the supplied two avatars and
three stickers, without replacing them with placeholders. Day/Night adaptations
and the deployed track-transition behavior are retained.

**Corresponding source is included**, not an external private workspace pointer:
[`vendor/folia/`](../vendor/folia/), with lockfile, build configuration, renderer
assets, tests and upstream supporting source. A downloadable source offer is
[`source/folia-source.zip`](../source/folia-source.zip). The exact reconstruction,
verification evidence and limitations are in [FOLIA_BUILD.md](../docs/FOLIA_BUILD.md)
and [FOLIA_SOURCE_MANIFEST.json](../docs/FOLIA_SOURCE_MANIFEST.json).
No patch replay, private archive or private Git history is needed. The former
incomplete incremental patch recipe is superseded; do not apply old host/duo
patches to this already-modified source tree.

The build is a static embedded web renderer. It does not start Folia's Electron
shell, library/account services, development server or legacy localhost WebSocket
bridge. `MIDORI_LYRIC_STAGE_BUILD=1` disables PWA generation; `ELECTRON=true` sets
relative asset URLs and does not itself start Electron.

## Dependency notices

`licenses/folia-dependencies/index.json` inventories the clean-installed lockfile
packages (including development tools) and links copied package-supplied license
and notice texts. This is not a runtime-only dependency graph or a legal approval.
Some packages provide a declared license but no separate notice file; platform-
specific packages not installed on this Linux build are listed separately. The
lockfile records their pinned resolutions. Upstream dependencies may impose
additional obligations; this candidate does not certify exhaustive license
compatibility or complete source compliance for every bundled dependency.

## Character artwork and other media: separate, unresolved rights

This is a **local full-asset candidate, not a cleared public release**. Supplied
Mingqian Nailv / 明前奶绿 character artwork and related Cappella images are
credited to Mingqian Nailv / 明前奶绿 and their respective creators/rightsholders.
Other character art, icons, photographs, stock assets and preview media remain
with their respective owners. Exact original illustrators and redistribution
permissions have not all been established. User supply, local possession,
credit, fan intent and an AGPL/MIT code license are **not** proof of permission
to redistribute the images. No official authorization or endorsement is claimed.

The full images are deliberately retained for the requested local candidate.
Before publishing the repository, downloadable source archive or built assets,
resolve the artwork/media permissions and remaining dependency-license questions.
The project's noncommercial fan intention is a description of intent, **not** a
new noncommercial restriction on MIT- or AGPL-licensed code. Music, lyric text,
album art and remotely loaded content retain their own rights and service terms.
No publication, account action or upload was performed in preparing this source.
