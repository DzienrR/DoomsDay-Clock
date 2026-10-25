# System Architecture & Technical Reference — Doomsday Clock Observatory

**Document Version:** 3.0.0  
**Last Updated:** October 25, 2026

## 1. High-Level Architecture

The Doomsday Clock Observatory uses a **Modular Progressive Multi-Page Architecture (MPA)** written in standards-compliant HTML5, CSS3, and vanilla ES6+ JavaScript. By avoiding heavy client-side framework runtimes, the site achieves instant load times, zero supply-chain vulnerabilities, and universal hosting compatibility.

```
DoomsDay Clock/
├── index.html              # Main Observatory Command Center & Portal Hub
├── intelligence.html       # Dedicated Live Global News & NASA/USGS Sensor Workspace
├── map.html                # Full-Screen Geospatial Threat Map & Nuclear Arsenal Matrix
├── simulator.html          # Policy & Crisis Sandbox + TTAPS Nuclear Winter City Visualizer
├── timeline.html           # 1947–2026 Trajectory Archive + Birth Year Time Machine
├── about.html              # 4 Threat Pillar Dossiers, Methodology & Verified Bibliography
├── styles.css              # Unified Design System, CSS Custom Properties & Responsive Grids
├── app.js                  # Core Engine: TIMELINE_DATA, SVG Clock, Live Auto-Sync, News/Sensors
├── features.js             # Expansion Engine: World Map, City Visualizer, Poll, Canvas PNG Exporter
├── manifest.json           # PWA Web App Manifest for installable desktop/mobile experience
├── robots.txt              # Search engine crawler instructions
├── sitemap.xml             # Structured XML sitemap for all 6 observatory pages
├── REQUIREMENTS.md         # Pre-creation Product Requirements Document (PRD)
├── ARCHITECTURE.md         # System Architecture & Data Flow Specification (this file)
├── DESIGN_SYSTEM.md        # UI Tokens, Color Semantics, Typography & SVG Geometry
├── AGENTS.md               # AI Coding Agent & Developer Governance Rules
├── RULES.md                # Strict Content Grounding, Security & Code Quality Rules
├── CONTRIBUTING.md         # Developer Onboarding & Feature Extension Guide
├── OPERATIONS_RUNBOOK.md   # Post-Creation Maintenance, Annual Sync & Deployment Runbook
├── SECURITY.md             # Security, Privacy, CORS & DOM Sanitization Policy
├── CHANGELOG.md            # Version History & Release Notes
└── .skills/
    └── doomsday-site-manager/
        └── SKILL.md        # Reusable AI Skill for managing & updating the site
```

## 2. Core Data Flow & State Management (`app.js` & `features.js`)

### 2.1 Graceful Multi-Page DOM Hydration
Because `app.js` and `features.js` are shared across all 6 HTML pages, every rendering and event-binding function uses **Defensive DOM Presence Guards** (`const el = document.getElementById(...); if (!el) return;`).
- When a user opens `map.html`, only the telemetry bar, UTC clock, world threat map, planetary gauges, and arsenal/treaty matrix hydrate.
- When a user opens `index.html`, the full command center hydrates.
- This guarantees zero `TypeError: Cannot read properties of null` exceptions across any page or custom layout.

### 2.2 Live Official Reading Auto-Sync Pipeline (`syncOfficialClockReading()`)
1. **Trigger:** Runs automatically on `DOMContentLoaded`, every 30 minutes via `setInterval`, and on manual click of `#sync-clock-btn`.
2. **Source Endpoint:** Queries Wikipedia's CORS-enabled REST/Action API (`action=query&prop=extracts&exintro=1&explaintext=1&titles=Doomsday_Clock&format=json&origin=*`).
3. **Detection Logic:** Parses the lead extract for year tokens (`2026`–`2039`) and time-to-midnight patterns (`(\d+(?:\.\d+)?)\s*(seconds|minutes)`).
4. **Dynamic State Mutation:** If a newer official year is detected (`maxDetectedYear > currentLatest.year`), it constructs a normalized `TIMELINE_DATA` record, computes the 24-hour clock string (`23:XX:XX`) and delta from the prior setting, updates the range scrubber `max`, and re-renders the SVG clock hands, trajectory chart, and timeline cards in place.

### 2.3 External Open-Source API Matrix & Fallback Strategy

| Telemetry Stream | Primary Open API Endpoint | CORS Mechanism | Offline / Error Fallback |
| :--- | :--- | :--- | :--- |
| **Official Clock Setting** | Wikipedia MediaWiki API (`Doomsday_Clock`) | `origin=*` query param | Verified `TIMELINE_DATA` (1947–2026, 85s) |
| **Live Global Intelligence** | Wikipedia Search API + Google News RSS / GDELT | `origin=*` / JSON proxy | `CURATED_INTEL` verified 2026 baseline articles |
| **Planetary Natural Hazards** | NASA EONET v3 API (`/api/v3/events`) | Native CORS `*` header | Verified 2026 climate anomaly baseline card |
| **Global Seismic Monitor** | USGS GeoJSON API (`4.5_day.geojson`) | Native CORS `*` header | Global Seismic Verification Network baseline card |
| **City Local Weather** | Open-Meteo Forecast API (`/v1/forecast`) | Native CORS `*` header | Climatological city temperature baseline (`CITIES_DATA`) |

## 3. Mathematical & SVG Coordinate Models

### 3.1 Doomsday Clock Hand & Danger Sector Geometry (`420×420` ViewBox)
- **Center Origin:** `(cx, cy) = (210, 210)`, Outer Tick Radius `r = 166`.
- **Angle Formula:** Given `S` seconds to midnight:
  - `minutesFloat = S / 60`
  - `minuteAngleDeg = -(minutesFloat * 6)` (since `1 minute = 6°` counter-clockwise from `12:00 / 0°`).
  - `hourAngleDeg = -(minutesFloat * 0.5)` (since `1 minute = 0.5°` of hour-hand movement).
- **1947 Quadrant Zoom Mode:** Switches the SVG `viewBox` from `"0 0 420 420"` to `"20 20 225 225"`, framing the 9-to-12 o'clock upper-left quadrant popularized by Martyl Langsdorf's June 1947 cover.

### 3.2 Equirectangular Geospatial Projection (`1000×500` ViewBox)
- Converts `(lat, lon)` coordinates from `GEO_NODES` and live USGS GeoJSON features into SVG space:
  - `x = ((lon + 180) / 360) * 1000`
  - `y = ((90 - lat) / 180) * 500`
