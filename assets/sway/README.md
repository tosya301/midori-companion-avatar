# Swimsuit SVG provenance

Updated 2026-09-08 from the user-supplied archive `奶绿泳装-摇晃重制版.zip`, member `奶绿泳装-摇晃重制版/swim-milky-green-animated.svg`, copied byte-for-byte to `swim-milky-green-animated.svg`.

- SVG SHA-256: `18827d027154de29313f9bf49ca0a6fb41be1145d90fc07d2443b8b13e7815ad`
- SVG size: 6,660,986 bytes.
- Archive SHA-256: `fe054e948dafc879c0879e71a18221909f0d01eaab4484f6ad4173eedaa99e4a`
- Replaced SVG SHA-256: `2d0bd8fc3670b466ca09416f280edd6d5331649f61b5581d1d64efd98278e876`

Only the supplied translation/rotation groups and their two SMIL transform nodes differ from the prior asset: 5.8-second endpoint-only round trip, ±1° rotation, revised translation/pivot. Root/viewBox and artwork, including all 51 blink/morph animations, remain unchanged; total SMIL count remains 53. No scripts or external asset references are present. Static SVG is not required by the runtime and was not installed; package scripts were not executed.

Verification: local private/public pages served the exact SHA-256 and passed the unchanged native-document and transparency browser tests. Checks covered source-DOM identity, Freeze/Gachi document lifetime, failure/retry/cancellation/timeout, reduced motion, local sample audio, Night/narrow rendering and transparent-corner pixels (delta 0). A separate native-document probe verified actual running/paused/resumed clocks, blink opacity, ±1° extrema and continuous center/loop motion. Host JS/CSS/backend, geometry (including Gachi 105% / 110px upward calibration), native `color-scheme: normal` and mode order were not edited.

Scope: headless Chromium functional compatibility, not sustained Windows hardware smoothness acceptance. The archive's own performance measurements are supplier evidence, not a new local benchmark. No claim of universal smoothness is made.
