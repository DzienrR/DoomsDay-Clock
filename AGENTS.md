# AI Agent & Developer Governance (`AGENTS.md`)

This repository contains the **Doomsday Clock Live Global Threat & History Observatory**. Every human developer or AI coding agent working in this repository MUST read and follow these rules before and after modifying any code or content.

## 1. Repository Map & Multi-Page Synchronization Rule

The site consists of **7 HTML pages** sharing 1 stylesheet and 3 JavaScript engines:
- **Pages:** `index.html`, `intelligence.html`, `map.html`, `simulator.html`, `timeline.html`, `about.html`, `legal.html`
- **Stylesheet:** `styles.css`
- **Scripts:** `app.js` (Official Clock, 1947–2026 timeline, live auto-sync, news & sensors), `features.js` (Real Natural Earth 2D World Map & 3D Interactive Globe, city visualizer, birth year time machine, arsenal/treaty matrix, poll, PNG exporter), and `live-clock-engine.js` (Autonomous Live Data-Driven Doomsday Clock `ODC-LIVE v3.0`).

### Critical Rule 1: Header & Footer Synchronization
Whenever you add, rename, or reorder a top-level page in `<header class="site-header">` or `<footer class="site-footer">`, you **MUST** update the navigation markup across all 7 `.html` files so the user experience remains uniform across the entire observatory.

### Critical Rule 2: Living About, Privacy Policy, Terms & Disclaimers Sync (Update In-Place)
Whenever you add or modify any feature, live API, simulator, storage mechanism, or algorithmic rule on the website, you **MUST** evaluate whether it affects the site's **About page (`about.html`)**, **Privacy Policy**, **Terms & Conditions**, or **Disclaimers (`legal.html` & `LEGAL_COMPLIANCE.md`)**:
- **Modify In-Place, Never Duplicate:** Always update the existing sections in `about.html`, `legal.html`, `LEGAL_COMPLIANCE.md`, `RULES.md`, and `CHANGELOG.md` so legal notices, data-source disclosures, and feature documentation stay 100% synchronized with the live codebase.

## 2. Defensive DOM Guard Rule

Because `app.js`, `features.js`, and `live-clock-engine.js` are loaded across multiple pages that only mount a subset of DOM containers:
- **NEVER** assume an element ID exists on the current page.
- **ALWAYS** guard DOM lookups before mutating properties or attaching listeners:
  ```javascript
  const el = document.getElementById("target-id");
  if (!el) return;
  ```
- Use optional chaining (`document.getElementById("btn")?.addEventListener(...)`) for event bindings.

## 3. Historical & Scientific Groundedness Rule

1. **Official Clock Settings (`TIMELINE_DATA`):** Never fabricate or alter historical Doomsday Clock readings. All historical settings (1947–2026, 85s) must match the official records of the Bulletin of the Atomic Scientists.
2. **Verified Source Links:** Every historical card, threat pillar dossier, and baseline news item must carry a verified clickable source URL (`SOURCES.WIKI`, `SOURCES.BRITANNICA`, `SOURCES.ALJAZEERA_2026`).
3. **Live API Resilience:** Every live `fetch()` call (Wikipedia MediaWiki API, NASA EONET v3, USGS GeoJSON, Open-Meteo, Natural Earth `world-atlas`) must be wrapped in `try / catch` and fall back gracefully to verified offline baseline data.
