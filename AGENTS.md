# Agent entrypoint

Read `README.md`, then `AGENT_INTEGRATION.md`. For floating app connections read `docs/FLOATING_ICONS.md` and `docs/app-integrations.json`. `docs/API_CONTRACT.md` is the public runtime contract; source and actual tests govern if documentation disagrees.

This is an independent public-candidate project. Do not import a developer's private agent profiles, credentials, sessions, logs, generated speech or old Git history. The application is an original unofficial AI fan companion, not the real streamer and not an official character agent.

Preserve the current artwork geometry, SVG selection order, Gachi positioning, theme behavior, icon physics and lyric mode adaptations unless explicitly asked to change them. New app integrations must be opt-in and use the receiving user's own auth/configuration. A visible icon or Context token is not proof of an available tool.

Use loopback-only interfaces. Never put provider keys into frontend code or commit runtime secrets. Perform account writes, spending, public publishing and filesystem-sensitive actions only under explicit user authority; uncertain writes must not be blindly retried.

Host/Original code licensing, Folia AGPL obligations and character asset rights are separate. This candidate is not a redistribution-rights clearance; see `ASSET_RIGHTS.md` and `LICENSE_SCOPE.md`. Do not publish the candidate or add a Git remote without the maintainer's explicit request.

Verify changes with Python runtime tests and real browser interactions. The builtin tone verifies the audio path and mouth response, not synthesis quality. A mock provider test is not a real cloud/harness compatibility test. Report limitations honestly.
