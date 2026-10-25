---
name: doomsday-site-manager
description: Manage, audit, update, and extend the Doomsday Clock Live Observatory multi-page web application. Use when the user asks to update the Doomsday Clock reading, add features or pages to the Doomsday Clock site, sync navigation across HTML pages, audit site health, or prepare the site for deployment.
allowed-tools: client google
---
# Doomsday Site Manager

Manage and extend the multi-page Doomsday Clock Live Global Threat and History Observatory while preserving zero-dependency portability, historical accuracy, and cross-page consistency.

## When to Use

- The user wants to add a newly announced official Doomsday Clock setting or verify the live auto-sync engine.
- The user wants to add or modify features, simulators, map nodes, or pages across the observatory (`index.html`, `intelligence.html`, `map.html`, `simulator.html`, `timeline.html`, `about.html`).
- The user asks to audit site maintainability, fix broken links, update SEO/sitemap files, or prepare a release in `CHANGELOG.md`.

## Steps

1. **Read Project Governance First**
   - Inspect `AGENTS.md`, `RULES.md`, and `ARCHITECTURE.md` in the project root before making structural changes.

2. **Enforce Cross-Page Navigation Synchronization**
   - Whenever modifying `<header class="site-header">`, `<footer class="site-footer">`, or shared script tags (`app.js`, `features.js`), apply the exact same update across all 6 HTML entry points (`index.html`, `intelligence.html`, `map.html`, `simulator.html`, `timeline.html`, `about.html`) and update `sitemap.xml` if pages are added or renamed.

3. **Maintain Defensive DOM Hydration in Shared Scripts**
   - Because `app.js` and `features.js` run across all 6 pages, guard every DOM lookup (`const el = document.getElementById(...); if (!el) return;`) so missing page-specific containers never throw runtime errors.

4. **Preserve Grounded Data and API Fallbacks**
   - Verify any historical Clock setting or treaty fact against official Bulletin of the Atomic Scientists, Wikipedia, or Encyclopaedia Britannica records.
   - Wrap every `fetch()` call (Wikipedia API, NASA EONET, USGS GeoJSON, Open-Meteo) in a `try / catch` block that falls back to verified baseline data (`TIMELINE_DATA`, `CURATED_INTEL`, `CITIES_DATA`).

5. **Run Post-Change Verification**
   - Check that all modified `.html`, `.css`, and `.js` files are free of syntax issues and record notable additions in `CHANGELOG.md`.

## Gotchas

- Never introduce private API keys into client-side scripts; use only keyless CORS-enabled endpoints.
- Never assume `#doomsday-svg` or `#world-threat-map` exists on every sub-page without a null check.
- Keep audio synthesis (`Web Audio API`) muted by default until the user clicks the toggle button.
