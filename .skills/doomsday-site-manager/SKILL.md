---
name: doomsday-site-manager
description: Manage, audit, update, and extend the Doomsday Clock Live Observatory multi-page web application. Use when the user asks to update the Doomsday Clock reading, add features or pages to the Doomsday Clock site, sync navigation across HTML pages, update About/Privacy/Terms/Disclaimers, audit site health, or prepare the site for deployment.
allowed-tools: client google
---
# Doomsday Site Manager

Manage and extend the 7-page Doomsday Clock Live Global Threat and History Observatory while preserving zero-dependency portability, historical accuracy, cross-page consistency, and living legal/documentation synchronization.

## When to Use

- The user wants to add a newly announced official Doomsday Clock setting or modify the Autonomous Live Clock (`ODC-LIVE v3.0`) rules.
- The user wants to add or modify features, simulators, map/globe layers, or pages across the observatory (`index.html`, `intelligence.html`, `map.html`, `simulator.html`, `timeline.html`, `about.html`, `legal.html`).
- The user asks to audit site maintainability, update About/Privacy/Terms/Disclaimers, or prepare a release in `CHANGELOG.md`.

## Steps

1. **Read Project Governance First**
   - Inspect `AGENTS.md`, `RULES.md`, `LEGAL_COMPLIANCE.md`, and `ARCHITECTURE.md` in the project root before making structural changes.

2. **Enforce Cross-Page Navigation Synchronization**
   - Whenever modifying `<header class="site-header">`, `<footer class="site-footer">`, or shared script tags (`app.js`, `features.js`, `live-clock-engine.js`), apply the exact same update across all 7 HTML entry points (`index.html`, `intelligence.html`, `map.html`, `simulator.html`, `timeline.html`, `about.html`, `legal.html`).

3. **Enforce Living About, Privacy Policy, Terms & Disclaimers In-Place Sync (CRITICAL)**
   - Whenever adding or modifying any feature, live API endpoint, simulator, mathematical clock rule, or browser storage mechanism (`localStorage`), evaluate whether `about.html`, `legal.html`, `LEGAL_COMPLIANCE.md`, `RULES.md`, or `SECURITY.md` require updating.
   - Always **update those sections in-place** (never duplicate sections) so the About page, Privacy Policy, Terms and Conditions, and Disclaimers remain 100% accurate to the current features of the website.

4. **Maintain Defensive DOM Hydration in Shared Scripts**
   - Because `app.js`, `features.js`, and `live-clock-engine.js` run across multiple pages, guard every DOM lookup (`const el = document.getElementById(...); if (!el) return;`) so missing page-specific containers never throw runtime errors.

5. **Preserve Grounded Data and API Fallbacks**
   - Verify any historical Clock setting or treaty fact against official Bulletin of the Atomic Scientists, Wikipedia, or Encyclopaedia Britannica records.
   - Wrap every `fetch()` call (Wikipedia API, NASA EONET, USGS GeoJSON, Open-Meteo, jsDelivr Natural Earth TopoJSON) in a `try / catch` block that falls back to verified baseline data.

6. **Run Post-Change Verification**
   - Check that all modified `.html`, `.css`, and `.js` files are free of syntax issues and record notable additions in `CHANGELOG.md`.

## Gotchas

- Never introduce private API keys into client-side scripts; use only keyless CORS-enabled endpoints.
- Never assume `#doomsday-svg`, `#odc-live-svg`, or `#world-threat-map` exists on every sub-page without a null check.
- Keep audio synthesis (`Web Audio API`) muted by default until the user clicks the toggle button.
