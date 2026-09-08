# Moon renderer

The host serves the committed runtime from `assets/moon-art/runtime/`; no Node installation is required for normal Avatar use.

To change its Three.js renderer, install dependencies in this directory and build:

```sh
npm ci --ignore-scripts
npm run build
```

`vite.config.js` outputs into `../assets/moon-art/runtime/`. Review the rebuilt runtime and the day/night, pointer-following and drag behavior before accepting changes. Three.js license: `THREE-LICENSE.txt`. Image rights remain separate; see root `ASSET_RIGHTS.md`.
