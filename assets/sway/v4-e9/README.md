# E9 green-outfit runtime (isolated adapter)

## Host API

```js
import { createTalkingSway } from './sway-expressions.mjs';
const avatar = await createTalkingSway({ audio, readEnergy, contextRunning, boundsSrc });
// After the existing host swap token wins:
container.append(avatar.element);
avatar.start();
// On replacement, or when a prepared swap loses:
avatar.dispose();
```

`audio` is the existing HTMLAudioElement; `readEnergy()` returns the existing
analyser's RMS energy; `contextRunning()` reports the existing graph's readiness.
There is **no new AudioContext, MediaElementSource, analyser, or AudioLipSync**.
The wrapper keeps `#avatarSwayFrame`, `avatar-frame avatar-sway-frame is-active`,
`aria-hidden=true` and `data-bounds-src` for existing layout/calibration code.
All assets resolve relative to this module. Only the green host route should
import this adapter; the legacy adapter and all other outfits remain independent.

Preparation fetches/parses a paused SVG only. No controller, event listener, rAF
or queue clock is started until `start()`. Both start and dispose are idempotent.
Disposal cancels the host rAF, removes all listeners (including the packaged
ExpressionRig's media-query listener), restores its detached eye animations,
disposes the single MouthRig, and pauses SVG animation. BFCache pagehide is not
permanent disposal; non-persisted pagehide is.

## State and timing

- Normal smiles blend `rest` → the E9 **original closed-mouth `closedSmile`** →
  `rest` using the retained v4-r4 `smile-keyframes.json` cubic-bezier sampler.
  It has three smiles in its authored 64.8-second cycle. These are not the new
  eyes-closed/open-mouth `smileReference` expression.
- Each round completes **three** normal smiles. One random completed-smile slot
  (1/2/3) is drawn per round. Exactly one native wink starts at that completion.
  The normal-smile sampler pauses for the wink. The wink lasts 1320ms and its
  native eye return gets the full 360ms; the mouth returns over native 280ms.
  Slot 3 cannot start a special until the actual eye return has settled.
- Specials cycle **round / round / smile**, repeating. Entry is 420ms, then a
  full **8000 / 8000 / 6000ms** plateau, then 420ms return. The plateau starts
  only after the real expression entry has settled. Frame overshoot is never
  subtracted from the plateau. The next round restarts the authored smile clock.
- Speech owns the mouth exclusively. ExpressionRig is subclassed only to disable
  its mouth writes and private rAF; its native eye rendering/actions remain in
  use. The queue issues one mouth command per host step to a single MouthRig.
  Eyes can continue the current expression while speech is active.
- An interrupted normal smile is **not** credited. Completed earlier smiles
  survive an ordinary speech interruption; the normal sampler restarts at zero.
  If voice interrupts a special's entry/hold, idle resume starts a new entry and
  full plateau. A wink may finish during voice, but cannot launch the next idle
  action until idle is genuinely permitted.
- `play`/`playing` establish a voice session. Pause, waiting, seeking, insufficient
  media data or a suspended graph are **held, not idle**. Ended/error/abort/emptied
  release the session. A pre-existing paused, partially played clip is held too.
  A host that intentionally abandons a clip should end/reset its media session;
  a bare pause intentionally remains held rather than manufacturing idle credits.
- 180000ms without trusted **mouse** activity anywhere in this document enters
  sleepy indefinitely and cancels pending actions. Hidden/outside time counts;
  the first resumed frame/visibility event resolves the deadline. TTS, focus,
  visibility, touch and synthetic pointer events never wake it.
- Trusted document `pointermove`, or document entry via `pointerover` with a null
  relatedTarget, wakes sleepy to **neutral immediately**, resets smile counts,
  the wink lottery and the entire round/round/smile cycle. Subsequent ticks keep
  neutral; they do not restore the cancelled expression. Ordinary mouse movement
  while awake resets only the inactivity deadline.
- Hidden time does not advance idle smiles. Gaps over 250ms also discard partial
  smile progress instead of replaying unseen cycles after a throttled/frozen tab.
  Full holds may therefore be longer under jank, never shorter. Native eyes/body
  may resume at their authored phase; no hidden smile credits are accumulated.
- Reduced motion pauses the body SVG and suppresses idle/speech mouth animation
  and queued winks. Sleepy state still persists, shown with static 0.7-open eyes
  and rest mouth; removing reduced motion restores the sleepy mouth/eye cycle.

## Read-only DOM observability

Attributes are on the inline root SVG, not the wrapper. There are no production
console globals, mutation/debug APIs, clock overrides or test hooks.

| `svg.dataset` key | Meaning |
| --- | --- |
| `controllerState` | `idle`, `wink`, `round`, `smile`, `sleepy`, `speaking`, or `held`; speaking wins while voice runs, sleepy wins over ordinary held state |
| `queuePhase` | `normal`, `wink`, `enter`, `hold`, `exit`, or `sleepy`; remains independent of audio ownership |
| `expression` | Native eye state: `neutral`, `wink`, `smile`, or `sleepy`; round uses neutral eyes |
| `completedSmiles` | Completed normal smiles in the current round, 0–3 |
| `specialIndex` | 0 = first round, 1 = second round, 2 = smile |
| `special` | Current/next special name, `round` or `smile` |
| `winkAt` / `winkSlot` | Chosen completed-smile index, 1–3 (aliases) |
| `winkDone` | Whether this round's wink has been launched |
| `sleepy` / `reducedMotion` | Boolean strings |
| `mouthPose` / `mouthOpen` | Native MouthRig pose label and normalized openness |
| `mouthOwner` | `speech`, `idle`, `sleepy`, or `held` |
| `eyeOpenLeft` / `eyeOpenRight` | Native normalized eye geometry openness |
| `expressionSpeaking` | Native ExpressionRig speech-ownership flag |

For full-hold assertions, observe `queuePhase=hold`, not merely
`controllerState=round/smile`. Native `expression=neutral` during a round is
intentional. Native `expression=neutral` after the wink's 1320ms action does not
mean its 360ms return has finished: the queue waits for the real transition.

## Asset integrity and provenance

Source: approved `milky-green-v4-e9-windows-handoff` package. Controllers are
byte-identical packaged copies. Rig geometry and pose definitions are unchanged;
only absolute author-machine provenance strings in JSON were reduced to basenames.
`provenance.json` records source and installed SHA-256 hashes without local paths.

`avatar.svg` differs from packaged `milky-green-v4-talking.svg` **only** in the
root width, height and viewBox copied from accepted v4-r4 `combined.svg`:

- width: `1914`
- height: `1989`
- viewBox: `-10.569900886802 17.650234741784 1910.006259780908 1984.849765258216`

All source children, artwork, gradients, IDs and authored animation bytes are
unchanged. There is no `mg4-idle-mouth` legacy renderer or second mouth group.

## Verification

From the project root:

```sh
node --test tests/e9-expression-queue.test.mjs
node --check assets/sway/v4-e9/sway-expressions.mjs
node --check assets/sway/v4-e9/expression-queue.mjs
```

The deterministic suite covers all wink slots/return gating, authored sampler
parity, full hold durations and order, interrupted smiles, speech, pause/buffering/
seeking, sleepy deadlines/voice persistence/mouse reset, hidden/reduced handling,
asset hashes/calibration, and real controller lifecycle through a minimal DOM
harness. The harness executes the packaged rigs, not fake controller replacements.
Browser visual geometry, real audio and public promotion remain host-integration
verification responsibilities; this directory does not modify routing or services.
