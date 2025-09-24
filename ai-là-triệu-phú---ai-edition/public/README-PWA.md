# PWA Public Pack — Triệu Phú AI
Generated: 2025-09-24T10:53:10

This `public/` folder contains:
- `manifest.webmanifest` (PWA manifest)
- `icons/` (PWA icons including maskable)
- `sw.js` (basic offline service worker: cache-first with runtime caching)
- `register-sw.js` (helper to register the service worker)
- `index-head-snippet.html` (snippet to paste into your index.html)

## How to use
1) Copy this entire `public/` folder into the **root** of your Vite/React project (beside `index.html`, `package.json`).
2) Ensure your HTML includes the manifest and registers the service worker:
   - Open `index-head-snippet.html` and copy to your `index.html` (`<head>` + the module script).
   - Or import and call `registerServiceWorker()` from your app entry (e.g., `main.tsx`).
3) Commit & push to GitHub. Deploy to static hosting (Netlify/Vercel/GitHub Pages).

## Notes
- If your app uses client-side routing, consider adding an `offline.html` and update `PRECACHE_URLS` in `sw.js`.
- For landscape-first UX, you can set `"orientation": "landscape"` in `manifest.webmanifest` if desired.
- PWABuilder checks should pass for manifest + icons + SW presence.
- Vite will serve files in `public/` at the root (`/`).

Good luck!