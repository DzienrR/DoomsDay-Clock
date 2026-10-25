# Changelog (`CHANGELOG.md`)

All notable architectural, feature, and historical data updates to the **Doomsday Clock Live Observatory** are documented in this file.

## [3.0.0] — 2026-10-25 — Multi-Page Observatory & World-Class Engineering Governance Suite
### Added
- **Multi-Page Specialized Architecture:** Expanded the observatory into 6 dedicated HTML workspaces (`index.html`, `intelligence.html`, `map.html`, `simulator.html`, `timeline.html`, `about.html`) connected via a unified header navigation and portal hub.
- **Complete Web Engineering Governance Suite:**
  - `REQUIREMENTS.md` (Product Requirements Document / PRD)
  - `ARCHITECTURE.md` (System Architecture, Data Flow & Mathematical SVG Models)
  - `DESIGN_SYSTEM.md` (UI Tokens, Color Semantics & Accessibility Spec)
  - `AGENTS.md` & `RULES.md` (Developer & AI Agent Rules)
  - `CONTRIBUTING.md`, `OPERATIONS_RUNBOOK.md`, and `SECURITY.md`
- **SEO & PWA Production Assets:** Added `manifest.json` and `robots.txt`.
- **Dedicated Project Management Skill:** Created `.skills/doomsday-site-manager/SKILL.md` and registered the `doomsday-site-manager` skill for automated site auditing, official Clock updates, and multi-page sync.

## [2.0.0] — 2026-10-25 — 8-Module Interactive Expansion Pack (`features.js`)
### Added
- **Live Official Clock Reading Auto-Sync (`syncOfficialClockReading()`):** Queries Wikipedia's live CORS API on load and every 30 minutes to detect new Bulletin announcements automatically.
- **Interactive Global Threat & Flashpoint Map:** Plots all 9 nuclear-armed states, 2026 Bulletin flashpoints, and live USGS seismic coordinates.
- **Planetary Atmospheric & Space Weather Gauges:** Added atmospheric CO2 (426.8 ppm), surface temperature anomaly (+1.54 C), >40% clean electricity milestone, and solar geomagnetic Kp index monitors.
- **City Impact Visualizer (TTAPS + Open-Meteo):** Connects to Open-Meteo for live city temperatures and models the 1983 TTAPS nuclear winter soot plunge (-11 C to -22 C) vs. climate warming.
- **"When Were You Born?" Doomsday Time Machine:** Calculates lifetime Clock movements, safest/closest years, and exports a custom PNG card.
- **Nuclear Arsenal & Treaty Tracker Matrix:** Compares warhead inventories across the 9 nuclear states and tracks major treaties (PTBT, NPT, ABM, INF, START I, Paris Agreement, and expired New START).
- **Next-Announcement Countdown, Community Poll, Canvas PNG Exporter & `<iframe>` Embed Generator.**

## [1.0.0] — 2026-10-25 — Initial Live Doomsday Clock Observatory Release
### Added
- Interactive SVG Doomsday Clock dial set to the official January 27, 2026 reading of **85 seconds to midnight (`23:58:35`)** with Full Dial and 1947 Quadrant views, Web Audio Geiger/clock pulse, complete 1947–2026 historical timeline, NASA EONET & USGS live sensors, and the 12-lever Policy & Crisis Simulator.
