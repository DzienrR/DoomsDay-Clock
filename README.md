# THE DOOMSDAY CLOCK — Live Global Threat & History Observatory

An interactive, zero-dependency web application displaying the official **2026 Doomsday Clock reading (85 Seconds to Midnight)** alongside live global intelligence streams, planetary telemetry, a complete 1947–2026 time-travel timeline, and an interactive policy & crisis simulator.

## Key Features Built for Deep Exploration

1. **Interactive SVG Doomsday Clock & Time-Travel Engine (`index.html`, `app.js`)**
   - Displays the official January 27, 2026 setting of **85 seconds to midnight (`23:58:35`)** set by the Bulletin of the Atomic Scientists.
   - **Dual View Modes**: Switch between the **Full 12-Hour Tactical Dial** and **Martyl Langsdorf's Iconic 1947 Upper-Left Quadrant View**.
   - **Time-Travel Scrubber & Auto-Playback**: Scrub through or animate all **27 official historical settings (1947–2026)** and watch the clock hands, danger arc, rank badge, and historical statement update in real time.
   - **Web Audio Geiger/Clock Pulse**: Optional synthesized audio pulse (via the browser's native Web Audio API) that accelerates as the Clock moves closer to midnight.

2. **Live World News & Global Conflict Intelligence Stream**
   - **Google News Live RSS Integration**: Pulls live global articles across five Doomsday Clock pillars (*Nuclear & Security*, *Climate & Earth*, *AI & Cyber*, *Biosecurity*, and *Diplomacy & Treaties*) plus a custom live search bar.
   - **GDELT Project v2 Open API**: Queries real-time global media coverage and computes a live **Stream Tension Index**.
   - **Resilient Curated Archive**: Automatically merges and falls back to verified 2026 reporting if a visitor is offline.

3. **Live Open-Source Planetary Sensors**
   - **NASA EONET v3 API**: Real-time satellite tracking of active wildfires, severe storms, volcanic activity, and sea/lake ice anomalies.
   - **USGS Real-Time Seismic Feed (GeoJSON API)**: Live global M4.5+ seismic events over the past 24 hours, flagging shallow seismic events.

4. **Complete 1947–2026 Interactive Trajectory Chart & Timeline**
   - Interactive SVG trajectory graph plotting distance to midnight from 1947 (7 minutes) to 1991 (17 minutes, safest on record) to 2026 (85 seconds, closest ever).
   - Filterable cards for all 27 adjustments (*Moved Closer*, *Moved Back*, *Seconds Era*).

5. **"What Moves the Clock?" Policy & Crisis Simulator**
   - Interactive sandbox where visitors toggle 12 diplomatic breakthroughs (e.g., *New START successor treaty*, *Global ban on autonomous AI weapons*, *Methane & coal phase-down*) or escalation scenarios to project a simulated blue ghost hand directly on the main clock face.

## Running Locally & Deploying Globally

- **Open Directly**: Double-click `index.html` in Finder or open it in any modern browser.
- **Local Web Server**:
  ```bash
  cd "/Users/dzienrr/Documents/ChatGPT/DoomsDay Clock"
  python3 -m http.server 8080
  ```
  Then visit `http://localhost:8080`.
- **Global Deployment**: Since this project uses pure HTML5, CSS3, and vanilla ES6+ JavaScript with keyless CORS-friendly open APIs, you can deploy the `/Users/dzienrr/Documents/ChatGPT/DoomsDay Clock` folder directly to **GitHub Pages**, **Vercel**, **Netlify**, or **Cloudflare Pages** with zero build configuration.
