# AI Agent & Developer Governance (`AGENTS.md`)

This repository contains the **Doomsday Clock Live Global Threat & History Observatory**. Every human developer or AI coding agent working in this repository MUST read and follow these rules before modifying any code or content.

## 1. Repository Map & Multi-Page Synchronization Rule

The site consists of **6 HTML pages** sharing 1 stylesheet and 2 JavaScript engines:
- **Pages:** `index.html`, `intelligence.html`, `map.html`, `simulator.html`, `timeline.html`, `about.html`
- **Stylesheet:** `styles.css`
- **Scripts:** `app.js` (core clock, timeline, live auto-sync, news & sensors) and `features.js` (world map, city visualizer, birth year time machine, arsenal/treaty matrix, poll, PNG exporter).

### Critical Rule: Header & Footer Synchronization
Whenever you add, rename, or reorder a top-level page in `<header class="site-header">` or `<footer class="site-footer">`, you **MUST** update the navigation markup across all 6 `.html` files so the user experience remains uniform across the entire observatory.

## 2. Defensive DOM Guard Rule

Because `app.js` and `features.js` are loaded on pages that only mount a subset of DOM containers:
- **NEVER** assume an element ID exists on the current page.
- **ALWAYS** guard DOM lookups before mutating properties or attaching listeners:
  ```javascript
  const el = document.getElementById("target-id");
  if (!el) return;
  ```
- Use optional chaining (`document.getElementById("btn")?.addEventListener(...)`) for event bindings.

## 3. Historical & Scientific Groundedness Rule

1. **Official Clock Settings (`TIMELINE_DATA`):** Never fabricate or alter historical Doomsday Clock readings. All 27 historical settings (1947–2026) must match the official records of the Bulletin of the Atomic Scientists (1947: 7m, 1953: 2m, 1991: 17m, 2020: 100s, 2023: 90s, 2025: 89s, 2026: 85s).
2. **Verified Source Links:** Every historical card, threat pillar dossier, and baseline news item must carry a verified clickable source URL (`SOURCES.WIKI`, `SOURCES.BRITANNICA`, `SOURCES.ALJAZEERA_2026`).
3. **Live API Resilience:** Every live `fetch()` call (Wikipedia MediaWiki API, NASA EONET v3, USGS GeoJSON, Open-Meteo) must be wrapped in `try / catch` and fall back gracefully to verified offline baseline data.

## 4. Zero-Dependency & Security Constraints

- **No Build Step Required:** Do not introduce npm/webpack/vite build requirements unless explicitly requested by the repository owner. The project must remain runnable via direct browser open (`file://`) or `python3 -m http.server`.
- **No Secret Keys in Client Code:** Only use keyless, CORS-enabled public APIs in `app.js` and `features.js`. Never commit private API keys or tokens.
- **Pre-Commit Verification Checklist:**
  1. Run `git status` and `git diff` to verify no unintended truncations occurred.
  2. Confirm all 6 `.html` files load `styles.css`, `app.js`, and `features.js` without console errors.
  3. Update `CHANGELOG.md` when adding new features or official Clock settings.
