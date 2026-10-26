# Legal, Privacy Policy, Terms & Disclaimers (`LEGAL_COMPLIANCE.md`)

**Document Version:** 3.1.0 (Living Document — Update In-Place on Feature Changes)  
**Last Updated:** October 26, 2026  
**Web Page Mirror:** `legal.html` & `about.html`

## 1. Official Disclaimers

1. **Independent Observatory & Non-Affiliation Notice:** The **Doomsday Clock Live Global Threat & History Observatory** is an independent educational, scientific-visualization, and open-source intelligence platform. While it displays and cites the official historical Doomsday Clock readings (1947–2026, currently **85 seconds to midnight**) set by the *Bulletin of the Atomic Scientists*, this website is not affiliated with, endorsed by, or operated by the Bulletin of the Atomic Scientists.
2. **Dual-Clock Architecture Distinction:**
   - **Clock #1 (Official Bulletin Doomsday Clock):** Reflects the annual January consensus of the Bulletin's Science and Security Board (`85.00s`).
   - **Clock #2 (Autonomous Live Data-Driven Clock — `ODC-LIVE v3.0`):** An independent mathematical model (`live-clock-engine.js`) that moves forward and backward in real time every 5 seconds by analyzing live news, USGS seismic events, NASA EONET satellite hazards, and diplomatic signals. It is an experimental real-time risk visualization, not an official Bulletin setting.
3. **Simulation & Educational Modeling Disclaimer:** The "What Moves the Clock?" Policy Simulator, Custom Scenario Builder, Ballistic Missile Flight & Alert Window Calculator, 1983 TTAPS Nuclear Winter City Visualizer, and Birth Year Time Machine are simplified mathematical and educational models. They do not constitute classified military intelligence, emergency civil-defense advice, or official weather warnings.
4. **Live Sensor Telemetry & Offline Fallback Disclaimer:** Live feeds (Wikipedia MediaWiki API, NASA EONET v3, USGS GeoJSON, Open-Meteo) are fetched directly from public open-data endpoints and may experience network latency or upstream revisions. When offline, the site falls back to its built-in verified 2026 baseline archive.

## 2. Privacy Policy (Local-First Zero-Tracking Model)

- **Zero Cookies & Zero Ad Trackers:** This website uses no tracking cookies, third-party ad networks, behavioral analytics scripts, or browser fingerprinting.
- **100% Client-Side Processing:** Inputs into the Birth Year Time Machine, Policy Simulator, Custom Scenario Builder, and HTML5 `<canvas>` PNG Card Exporter are processed strictly in your browser's local memory and never transmitted to any backend server.
- **Local Storage Usage (`localStorage`):** Only optional community poll votes (`dd_clock_poll_votes`, `dd_clock_user_vote`) are stored locally in the visitor's browser `localStorage` and can be cleared at any time.
- **Direct Public API Requests:** Your browser makes standard HTTPS `fetch()` requests to public open-data APIs (`en.wikipedia.org`, `eonet.gsfc.nasa.gov`, `earthquake.usgs.gov`, `api.open-meteo.com`, and `cdn.jsdelivr.net` for D3/TopoJSON/Natural Earth `world-atlas` cartography).

## 3. Terms and Conditions

1. **Educational & Media Use:** Visitors, educators, journalists, and creators may freely share downloaded PNG status cards and embed the observatory via the provided `<iframe>` widget, provided attribution is retained and simulated readings (`ODC-LIVE` or Policy Sandbox projections) are not misrepresented as official annual settings of the Bulletin of the Atomic Scientists.
2. **Open-Source Data & Cartographic Licenses:** Wikipedia extracts are used under CC-BY-SA 4.0; Natural Earth 110m country boundaries (`world-atlas@2`) are public domain; USGS and NASA EONET feeds are U.S. Government public-domain open data.
3. **"As-Is" Provision:** The platform is provided "as is" for informational and educational exploration without warranties of any kind.

## 4. Living Sync Rule (Update In-Place When Features Change)

Whenever a developer or AI agent adds or modifies any feature, API endpoint, simulator, or storage mechanism on the website, they MUST inspect and **update in-place** (not duplicate):
- `legal.html` & `LEGAL_COMPLIANCE.md` (if data sources, APIs, simulations, or browser storage changed)
- `about.html` (if observatory capabilities, mission features, or algorithmic rules changed)
- `RULES.md`, `ARCHITECTURE.md`, and `CHANGELOG.md`
