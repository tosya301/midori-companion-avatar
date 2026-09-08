# License scope

This is a mixed-license distribution, not a blanket MIT license for everything.

- **Project-authored host code and documentation**, including the public runtime, agent helper, host UI integration and Original lyric renderer: MIT, see root `LICENSE` and `lyrics-stage/licenses/original-MIT.txt`.
- **Folia and modifications to Folia**: AGPL-3.0, see `vendor/folia/LICENSE` (or the upstream license filename preserved there) and `lyrics-stage/licenses/folia-AGPL-3.0.txt`. The preferred form for modification is distributed in `vendor/folia/`, with rebuild instructions in `docs/FOLIA_BUILD.md`. Bundling an MIT host does not relicense Folia or waive applicable copyleft obligations.
- **Three.js**: MIT; retained notice in `moon/THREE-LICENSE.txt`. Other dependencies retain their own licenses and notices in their respective packages/source trees.
- **Original generated demo tone** (`audio/demo-tone.wav`): MIT.
- **Character artwork, voice identity, stickers, product logos and other non-code assets**: excluded from the root code license; see `ASSET_RIGHTS.md`. The fact that an SVG contains animation instructions does not convert the underlying character artwork into MIT artwork.

The creator's noncommercial fan-project intent is not an extra noncommercial restriction on MIT or AGPL code. Third-party service terms, trademark rights and personality/voice rights remain separate.

This local candidate retains full artwork for review. It does not assert that redistribution of every asset has been cleared. Do not publish until that boundary has been resolved.
