# THE DOOMSDAY CLOCK — Live Global Threat & History Observatory (v3.0)

An interactive, zero-dependency, 6-page web observatory displaying the official **2026 Doomsday Clock reading (85 Seconds to Midnight)** with automatic live official-reading synchronization, real-time global intelligence streams, NASA EONET & USGS planetary telemetry, an interactive global threat map, a 1947–2026 time-travel archive, and policy/climate simulators.

## 1. Multi-Page Observatory Map

| Page File | Role & Interactive Modules |
| :--- | :--- |
| `index.html` | **Main Command Hub:** Interactive SVG Clock (Full Dial & 1947 Quadrant views), Live Official Sync, Time-Travel Scrubber, Audio Pulse, Portal Hub, and All-in-One Dashboard. |
| `intelligence.html` | **Live Intelligence & Planetary Sensors:** Real-time threat stream, custom keyword search, Stream Tension Index, NASA EONET v3 natural hazards, and USGS M4.5+ seismic monitor. |
| `map.html` | **Geospatial Threat Map & Arsenals:** Interactive SVG world map tracking the 9 nuclear-armed states, 2026 flashpoints, live seismic epicenters, and the Treaty Tracker Matrix. |
| `simulator.html` | **Simulation Laboratories:** 12-lever Policy & Crisis Simulator (with ghost hand projection) and the City Impact Visualizer (1983 TTAPS Nuclear Winter vs. Warming with live Open-Meteo weather). |
| `timeline.html` | **1947–2026 Historical Archive & Birth Machine:** Interactive SVG trajectory graph, all 27/28 historical adjustment cards, and the "When Were You Born?" Doomsday Time Machine. |
| `about.html` | **Strategic Dossiers & Methodology:** Deep-dive dossiers on Nuclear, Climate, AI, and Biosecurity pillars, cultural history, and verified bibliography. |

## 2. World-Class Engineering & Governance Documentation

This project includes a complete pre-development and post-deployment engineering governance suite:

- **`REQUIREMENTS.md`** — Product Requirements Document (PRD), user personas, functional specs, and non-functional SLAs.
- **`ARCHITECTURE.md`** — System architecture, defensive multi-page DOM hydration, live API fallback matrix, and SVG mathematical models.
- **`DESIGN_SYSTEM.md`** — CSS custom property tokens, typography scale, status badge semantics, and accessibility rules.
- **`AGENTS.md` & `RULES.md`** — Mandatory rules for AI coding agents and human developers (cross-page navigation sync, data groundedness, defensive DOM guards).
- **`CONTRIBUTING.md`** — Step-by-step developer guide for adding new annual Clock settings, simulator levers, or cities.
- **`OPERATIONS_RUNBOOK.md`** — Pre-launch QA checklist, annual January Bulletin update protocol, and 1-step deployment guides.
- **`SECURITY.md` & `CHANGELOG.md`** — Zero-credential API policy, XSS sanitization rules, and release history.
- **`.skills/doomsday-site-manager/SKILL.md`** — Dedicated AI skill for managing, auditing, and updating the observatory.

## 3. Running Locally & Deploying Globally

```bash
cd "/Users/dzienrr/Documents/ChatGPT/DoomsDay Project/DoomsDay Clock"
python3 -m http.server 8080
```
Then open `http://localhost:8080/index.html` in your browser, or deploy the folder directly to **GitHub Pages**, **Vercel**, **Netlify**, or **Cloudflare Pages**.
