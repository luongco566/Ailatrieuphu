# GH Pages PWA Pack
Use these files when deploying to **GitHub Pages (project site)** where your app lives under `/REPO_NAME/`.
All paths are **relative**; SW is registered as `./sw.js` with scope `./`.

Steps:
1) Put these files into your repo's `public/`.
2) In `index.html`, paste the head & script from `index-head-snippet.html`.
3) In `vite.config.ts`, set `base: ''` (or `base: './'`) for relative assets, then rebuild.
4) Enable GitHub Pages (Settings → Pages → Build from `gh-pages` or `docs/`).
5) Visit your site → DevTools → Application → Service Workers to confirm it's active.