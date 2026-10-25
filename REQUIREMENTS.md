# Product Requirements Document (PRD) — Doomsday Clock Live Observatory

**Document Version:** 3.0.0  
**Last Updated:** October 25, 2026  
**Current Official Clock Baseline:** 85 Seconds to Midnight (`23:58:35`, set January 27, 2026)  
**Architecture Type:** Multi-Page Zero-Dependency Web Application (HTML5 / CSS3 / ES6+)

## 1. Product Vision & Purpose

The **Doomsday Clock Live Global Threat & History Observatory** transforms a static annual metaphor into an interactive, real-time public intelligence and historical research platform. While the Bulletin of the Atomic Scientists updates the official Clock setting once per year (each January), global events across nuclear security, climate change, disruptive technologies (AI/cyber), and biosecurity unfold every hour.

This platform bridges that gap by combining:
1. **The Authoritative Official Reading** (automatically verified and synced against live Wikipedia/Bulletin records).
2. **Real-Time Open-Source Planetary & News Telemetry** showing the live world events driving the Clock's four threat pillars.
3. **Interactive Simulation & Historical Exploration** empowering visitors to explore 79 years of atomic history (1947–2026) and test diplomatic/policy solutions that can turn back the Clock.

## 2. Target Audience & User Personas

| Persona | Primary Goal on the Site | Key Pages & Modules Used |
| :--- | :--- | :--- |
| **General Curious Visitor** | Understand what "85 seconds to midnight" means today and how close humanity is to catastrophe. | `index.html` (Clock Dial, Audio Pulse, Time-Travel Scrubber), `timeline.html` (Birth Year Time Machine) |
| **Policy Researcher / Journalist** | Track real-time geopolitical, nuclear, climate, and AI developments alongside historical treaty precedents. | `intelligence.html` (Live Feed, Tension Index), `map.html` (9 Nuclear States & Treaty Matrix), `about.html` |
| **Educator / Student** | Teach Cold War history, nuclear winter atmospheric physics (TTAPS model), and international diplomacy. | `simulator.html` (Policy Sandbox, City Nuclear Winter Visualizer), `timeline.html` (27/28 Adjustments) |
| **Blogger / Content Creator** | Share high-resolution visual status cards or embed a live Doomsday Clock widget on an external site. | `index.html` / `timeline.html` (`<canvas>` PNG Exporter, `<iframe>` Embed Snippet Generator) |

## 3. Site Map & Multi-Page Functional Requirements

The application is organized into **6 specialized HTML entry points** sharing a unified design system (`styles.css`), core state/timeline engine (`app.js`), and interactive expansion suite (`features.js`):

### 3.1 `index.html` — Main Observatory & Command Hub
- **FR-1.1 Interactive SVG Clock Dial:** Must render a high-precision vector clock face accurate to the second (`85 seconds` = `-8.5°` minute hand angle), with toggleable **Full 12-Hour Dial** and **1947 Martyl Langsdorf Upper-Left Quadrant** views.
- **FR-1.2 Live Official Reading Auto-Sync:** Must query the CORS-enabled Wikipedia MediaWiki API on page load and every 30 minutes (`syncOfficialClockReading()`) to detect any newly announced Bulletin setting and dynamically update the clock, timeline, and charts.
- **FR-1.3 Time-Travel Scrubber & Auto-Playback:** Must allow scrubbing or animated playback from 1947 (7 minutes) to 1991 (17 minutes) to 2026 (85 seconds).
- **FR-1.4 Synthesized Web Audio Pulse:** Must provide an opt-in, zero-asset Web Audio API Geiger/clock pulse whose tempo scales dynamically with proximity to midnight.
- **FR-1.5 Observatory Portal Grid:** Must provide clear navigation cards linking to the 5 specialized sub-pages (`intelligence.html`, `map.html`, `simulator.html`, `timeline.html`, `about.html`).

### 3.2 `intelligence.html` — Live Global Threat Intelligence & Planetary Sensors
- **FR-2.1 Multi-Source Live News Stream:** Must aggregate live global risk coverage categorized into `All Drivers`, `Nuclear & Security`, `Climate & Earth`, `AI & Cyber`, `Biosecurity`, and `Diplomacy & Treaties`, plus support instant custom keyword searches.
- **FR-2.2 Stream Tension Index:** Must compute an aggregate 0–100 tension score based on threat-weighted keyword analysis across active articles.
- **FR-2.3 NASA EONET v3 Planetary Tracker:** Must display active satellite-tracked wildfires, severe storms, volcanic activity, and sea/lake ice anomalies.
- **FR-2.4 USGS Real-Time Seismic Monitor:** Must stream M4.5+ global earthquakes over the past 24 hours, flagging shallow seismic events (`< 5 km` depth) relevant to test-ban verification.

### 3.3 `map.html` — Interactive World Threat Map & Nuclear Arsenal Matrix
- **FR-3.1 Geospatial Threat Map:** Must plot the 9 nuclear-armed states, 2026 Bulletin flashpoints (Eastern Europe/Zaporizhzhia, Middle East corridor, Arctic cryosphere), and live USGS seismic epicenters on an interactive SVG map with layer filters.
- **FR-3.2 Nuclear Stockpile & Treaty Matrix:** Must compare estimated warhead inventories across all 9 nuclear states and present the historical treaty matrix (PTBT, NPT, ABM, INF, START I, Paris Agreement, and the expired New START treaty).

### 3.4 `simulator.html` — Policy Crisis Sandbox & Nuclear Winter City Visualizer
- **FR-4.1 "What Moves the Clock?" Policy Simulator:** Must provide 12 toggleable diplomatic breakthroughs and escalation scenarios that compute a net second adjustment and project a simulated blue ghost hand onto the clock face.
- **FR-4.2 City Impact Visualizer (TTAPS + Open-Meteo):** Must fetch live local temperatures for major world cities via Open-Meteo and model the 1983 TTAPS nuclear winter soot plunge (−11°C to −22°C) vs. +2.4°C/+4.2°C climate warming.

### 3.5 `timeline.html` — Complete 1947–2026 Historical Archive & Personal Time Machine
- **FR-5.1 Interactive Trajectory Graph:** Must plot all official settings from 1947 to 2026+ on a clickable SVG area/line graph.
- **FR-5.2 Filterable Historical Cards:** Must allow filtering by `All Settings`, `Moved Closer`, `Moved Back`, and `Seconds Era (2020–2026)`.
- **FR-5.3 "When Were You Born?" Time Machine:** Must calculate a visitor's birth-year Clock setting, lifetime adjustments, and safest/closest years, with 1-click PNG export.

### 3.6 `about.html` — Deep-Dive Threat Dossiers, Methodology & Bibliography
- **FR-6.1 Four Core Pillar Dossiers:** Must detail the scientific and geopolitical basis for Nuclear, Climate, AI/Disruptive Tech, and Biosecurity threats.
- **FR-6.2 Cultural History & Scholarly Debate:** Must document Martyl Langsdorf's 1947 design, cultural references (*Watchmen*, Iron Maiden, Linkin Park), and methodological critiques.

## 4. Non-Functional Requirements (NFRs)

1. **Zero Build-Step Portability:** The site must run directly from the filesystem (`file://`) or any static web server without requiring Node.js bundlers, paid API keys, or backend databases.
2. **Offline & Rate-Limit Resilience:** Every external `fetch()` call must have a deterministic timeout/catch handler that falls back seamlessly to verified baseline data (`CURATED_INTEL`, `TIMELINE_DATA`, climatological baselines) so the UI never displays broken states.
3. **Accessibility (WCAG 2.1 AA):** All interactive controls must include keyboard focus states, semantic ARIA labels (`role="img"`, `aria-live="polite"`, `aria-pressed`), and high-contrast legibility (`>= 4.5:1`).
4. **Performance Budget:** First Contentful Paint (FCP) `< 0.8s`; total CSS + JS payload `< 200 KB` uncompressed; zero layout shift (`CLS = 0`).
