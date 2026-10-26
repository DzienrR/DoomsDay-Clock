# Engineering, Content & Algorithmic Rules (`RULES.md`)

These rules govern both the engineering lifecycle and the **Mathematical Threat-to-Clock Ratio Algorithm (`ODC-LIVE v3.0`)** of the **Doomsday Clock Live Observatory**.

## Part 1: Mathematical Rules & Ratios for the Autonomous Live Doomsday Clock (`live-clock-engine.js`)

While the Official Bulletin Doomsday Clock is set once a year in January (**85.00 seconds to midnight** as of January 2026), our **Observatory Live Autonomous Doomsday Clock (`ODC-LIVE`)** continuously analyzes real-time global data streams and moves forward (closer to midnight) and backward (toward safety) every 5 seconds according to the following mathematical rules:

### 1.1 Pillar Weights & Seconds-Per-Percentage Ratios

The engine evaluates **4 Threat Pillars** (totalling `100%` of the Composite Threat Index, with `50%` representing the neutral equilibrium baseline) and **1 Diplomatic Counter-Force Pillar**:

| Pillar | Weight in Composite Index | Neutral Baseline | Ratio per `1%` Shift | Impact of `+10%` Shift | Live Data Source |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Nuclear & Strategic Conflict ($T_N$)** | **40%** | `50%` | `−0.120s` per `+1%` | **−1.20 seconds** (Closer) | Wikipedia Live Conflict Stream + USGS M4.5+ / Shallow (`<10 km`) Seismic Feed |
| **2. Climate & Planetary Hazards ($T_C$)** | **25%** | `50%` | `−0.075s` per `+1%` | **−0.75 seconds** (Closer) | NASA EONET v3 Active Wildfires/Storms + Open-Meteo Anomalies + CO₂ |
| **3. AI, Cyber & Autonomous Tech ($T_A$)** | **20%** | `50%` | `−0.060s` per `+1%` | **−0.60 seconds** (Closer) | Autonomous Weapons, Cyber Operations & Synthetic Disinformation Stream |
| **4. Biosecurity & Pathogens ($T_B$)** | **15%** | `50%` | `−0.045s` per `+1%` | **−0.45 seconds** (Closer) | Global Pathogen Surveillance & Lab Safety Telemetry |
| **5. Diplomacy & Clean Energy ($D_P$)** | **+25% Counter-Force** | `35%` | `+0.150s` per `+1%` | **+1.50 seconds** (Safer / Back) | Peace Talks, Treaty Verification, Ceasefires & `>40%` Clean Electricity Signals |

### 1.2 Master Clock Movement Equation

1. **Composite Threat Percentage ($I_{\text{total}}$):**
   $$I_{\text{total}} = 0.40(T_N) + 0.25(T_C) + 0.20(T_A) + 0.15(T_B) - 0.22(D_P - 35)$$
2. **Net Seconds Adjustment ($\Delta S_{\text{net}}$):**
   $$\Delta S_{\text{net}} = -0.120(T_N - 50) - 0.075(T_C - 50) - 0.060(T_A - 50) - 0.045(T_B - 50) + 0.150(D_P - 35) + \delta_{\text{incident}}$$
3. **Live Autonomous Clock Reading ($T_{\text{live}}$):**
   $$T_{\text{live}} = \text{clamp}\left(85.00 + \Delta S_{\text{net}},\; 15.00\text{s},\; 240.00\text{s}\right)$$

### 1.3 Threat Percentage Tiers & Clock Movement Ranges

| Composite Threat % | Risk Classification | Net Clock Movement from 85.00s Baseline | Resulting Clock Range |
| :--- | :--- | :--- | :--- |
| **0% – 25%** | `LOW / DE-ESCALATION ZONE` | **+4.0s to +12.0s Safer (Moves Back)** | `89.00s – 97.00s` |
| **26% – 49%** | `MODERATE / STABILIZING` | **+0.5s to +3.9s Safer (Moves Back)** | `85.50s – 88.90s` |
| **50.0%** | `EQUILIBRIUM BASELINE` | **0.0s (Holds at Official Baseline)** | `85.00s` |
| **51% – 70%** | `ELEVATED GLOBAL TENSION` | **−0.5s to −4.5s Closer to Midnight** | `80.50s – 84.50s` |
| **71% – 85%** | `SEVERE MULTI-FRONT CRISIS` | **−4.6s to −9.0s Closer to Midnight** | `76.00s – 80.40s` |
| **86% – 100%** | `CRITICAL EXISTENTIAL ALERT` | **−9.1s to −15.0s Closer to Midnight** | `70.00s – 75.90s` |

### 1.4 Individual Live Incident Scoring Rules ($\delta_{\text{incident}}$)

- **High-Severity Nuclear / Military Escalation Headline:** `−0.48s` (moves clock closer to midnight)
- **USGS Shallow Seismic Event (`< 10 km` depth, M4.5+):** `−0.35s` (moves clock closer)
- **USGS Standard Tectonic Event (`>= 10 km` depth, M4.5+):** `−0.14s`
- **NASA EONET Active Wildfire / Severe Storm / Volcanic Hazard:** `−0.24s` to `−0.30s`
- **AI / Cyber / Biosecurity Risk Alert:** `−0.22s` to `−0.28s`
- **Diplomatic Breakthrough / Ceasefire / Treaty Inspection / Clean Energy Milestone:** `+0.32s` to `+0.55s` (pulls clock BACK toward safety)

## Part 2: Software Engineering & Quality Rules

1. **Cross-Page Synchronization:** Any change to shared headers, footers, or script imports must be synchronized across `index.html`, `intelligence.html`, `map.html`, `simulator.html`, `timeline.html`, and `about.html`.
2. **Defensive DOM Hydration:** All scripts (`app.js`, `features.js`, `live-clock-engine.js`) must guard DOM lookups so pages only hydrate the containers present on that page.
3. **Zero Unhandled Rejections:** Every external `fetch()` call must fall back gracefully to verified offline baseline data if rate-limited or offline.
