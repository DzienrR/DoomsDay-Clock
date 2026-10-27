# Changelog (`CHANGELOG.md`)

All notable architectural, feature, and historical data updates to the **Doomsday Clock Live Observatory** are documented in this file.

## [3.1.0] — 2026-10-26 — Jules Contribution Review & Security Hardening
### Security
- **DOM XSS Elimination (PR #2 & PR #12):** Fully sanitized external API feeds (NASA EONET events and USGS earthquake feeds) and user inputs in the Custom Geopolitical Scenario builder using entity escaping and safe native DOM element construction (`textContent`).
### Accessibility & UX
- **Keyboard Navigation (PR #3):** Added global `:focus-visible` outline styles adhering to the `--accent-blue` token for WCAG 2.1 keyboard accessibility compliance.
- **Non-blocking UI Feedback (PR #6):** Replaced native blocking `alert()` notifications on failed clipboard copying with inline non-blocking button state indicators.
### Code Health & Architecture
- **Event Listener Modularization (PR #11):** Refactored the monolithic `bindEventListeners()` function in `app.js` into domain-specific modules (`bindTimelineEvents`, `bindClockEvents`, `bindIntelligenceEvents`, `bindSensorEvents`, `bindSimulatorEvents`).
- **Endpoint Deduplication (PR #9):** Extracted duplicate USGS earthquake API endpoints into a shared `USGS_ENDPOINT` constant.
- **Wikipedia HTML DOMParser Refactoring (PR #14):** Replaced brittle wikitext regex parsing with structured HTML querying using native `DOMParser` via Wikipedia's `prop=text` API.
- **Edge-Case Clock Arithmetic Fix (PR #4):** Fixed `format24HourTime(0)` to return `"00:00:00"` (midnight).
### Performance & Rendering
- **DOM Batching with DocumentFragment (PR #13):** Batched repeated element insertions inside render loops for clock dial ticks, historical trajectory charts, timeline cards, and interactive world map elements using `DocumentFragment`, dramatically reducing style recalculations and layout thrashing.
### Testing
- **Zero-Dependency Automated Test Suites (PR #1, #4, #5, #8, #10, #15):** Integrated 35 automated unit tests across `app.test.js` and `features.test.js` (including `toRad` angle boundary tests) using Node's native `node:test` runner, preserving zero external dependencies without npm lockfile bloat.


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
