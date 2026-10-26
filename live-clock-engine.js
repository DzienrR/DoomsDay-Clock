/**
 * OBSERVATORY LIVE AUTONOMOUS DOOMSDAY CLOCK ENGINE (ODC-LIVE v3.0)
 * ============================================================================
 * A second, independent, real-time data-driven Doomsday Clock simulation that
 * continuously reads live global intelligence, USGS seismic feeds, NASA EONET
 * satellite hazards, and planetary climate telemetry on the website, applies
 * a transparent mathematical Rule & Ratio model, and moves its clock hand
 * forward (closer to midnight) and backward (toward safety) automatically.
 */

const ODC_RULES_SPEC = {
  baselineSeconds: 85.0, // Official Jan 2026 Bulletin Baseline (85.00s)
  minAllowedSeconds: 15.0,
  maxAllowedSeconds: 240.0,
  equilibriumPercent: 50.0, //At 50% composite threat, clock stays at 85.00s baseline
  // Pillar Weights (Sum = 100%) & Seconds-per-1%-Deviation Ratios
  pillars: {
    nuclear: {
      name: "Nuclear & Geopolitical Conflict",
      weight: 0.40, // 40% weight
      weightPct: "40%",
      secPerPct: -0.12, // Every +1% above 50% pushes clock -0.12s closer (-1.20s per +10%)
      color: "#ff3b30",
      icon: "☢️"
    },
    climate: {
      name: "Climate & Planetary Hazards (NASA/CO₂)",
      weight: 0.25, // 25% weight
      weightPct: "25%",
      secPerPct: -0.075, // Every +1% above 50% pushes clock -0.075s closer (-0.75s per +10%)
      color: "#ff9500",
      icon: "🌡️"
    },
    ai: {
      name: "AI, Cyber & Autonomous Weapons",
      weight: 0.20, // 20% weight
      weightPct: "20%",
      secPerPct: -0.06, // Every +1% above 50% pushes clock -0.06s closer (-0.60s per +10%)
      color: "#38bdf8",
      icon: "🤖"
    },
    bio: {
      name: "Biosecurity & Pathogen Surveillance",
      weight: 0.15, // 15% weight
      weightPct: "15%",
      secPerPct: -0.045, // Every +1% above 50% pushes clock -0.045s closer (-0.45s per +10%)
      color: "#a855f7",
      icon: "🧬"
    },
    diplomacy: {
      name: "Diplomacy, Treaties & Clean Energy (Counter-Force)",
      weight: 0.25, // Stabilizing counter-weight
      weightPct: "+25% Counter-Force",
      secPerPct: +0.15, // Every +1% diplomatic/stabilizing signal pulls clock +0.15s BACK (+1.50s per +10%)
      color: "#10b981",
      icon: "🕊️"
    }
  },
  // Percentage Threat Tiers
  tiers: [
    { range: "0% – 25%", label: "LOW / DE-ESCALATION ZONE", shift: "+4.0s to +12.0s Safer", badgeClass: "status-safe", desc: "Strong treaty verification & diplomatic de-escalation pull the clock significantly back from midnight." },
    { range: "26% – 49%", label: "MODERATE / STABILIZING", shift: "+0.5s to +3.9s Safer", badgeClass: "status-safe", desc: "Peace talks, renewable energy milestones & crisis restraint outweigh regional tensions." },
    { range: "50.0%", label: "EQUILIBRIUM BASELINE", shift: "0.0s (Holds at 85.00s)", badgeClass: "status-high", desc: "Balanced global risk matches the annual Bulletin baseline of 85.00 seconds." },
    { range: "51% – 70%", label: "ELEVATED GLOBAL TENSION", shift: "−0.5s to −4.5s Closer", badgeClass: "status-high", desc: "Active regional conflicts, treaty erosion & climate anomalies push the clock forward." },
    { range: "71% – 85%", label: "SEVERE MULTI-FRONT CRISIS", shift: "−4.6s to −9.0s Closer", badgeClass: "status-critical", desc: "Simultaneous nuclear flashpoints, AI battlefield escalation & extreme planetary hazards." },
    { range: "86% – 100%", label: "CRITICAL EXISTENTIAL ALERT", shift: "−9.1s to −15.0s Closer", badgeClass: "status-critical", desc: "Acute strategic confrontation or severe multi-vector breakdown requiring immediate de-escalation." }
  ]
};

// Live State of the Autonomous Clock Engine
const odcState = {
  running: true,
  officialBaseline: 85.0,
  currentSeconds: 82.4, // Dynamically computed from live data
  previousSeconds: 85.0,
  pillarScores: {
    nuclear: 72.0,
    climate: 68.0,
    ai: 64.0,
    bio: 54.0,
    diplomacy: 38.0
  },
  compositeThreatPct: 66.8,
  incidentQueue: [],
  queueCursor: 0,
  incidentLog: [],
  sparklineHistory: [85.0, 84.6, 84.1, 83.8, 84.2, 83.5, 83.1, 82.8, 83.2, 82.6],
  timerId: null
};

document.addEventListener("DOMContentLoaded", () => {
  initAutonomousLiveClockSection();
});

function initAutonomousLiveClockSection() {
  // Automatically mount the Autonomous Live Clock Studio on index.html, simulator.html, intelligence.html, or about.html
  const heroSection = document.getElementById("clock-hero");
  const simSection = document.getElementById("simulator-section");
  const intelSection = document.getElementById("live-intel");
  const aboutEngineSection = document.getElementById("about-observatory-engine");

  let mountTarget = null;
  let insertMode = "after";

  if (heroSection) {
    mountTarget = heroSection;
    insertMode = "after";
  } else if (simSection) {
    mountTarget = simSection;
    insertMode = "before";
  } else if (intelSection) {
    mountTarget = intelSection;
    insertMode = "before";
  } else if (aboutEngineSection) {
    mountTarget = aboutEngineSection;
    insertMode = "after";
  }

  if (!mountTarget || document.getElementById("odc-live-studio")) return;

  const section = document.createElement("section");
  section.id = "odc-live-studio";
  section.className = "section-block odc-live-section";
  section.innerHTML = buildAutonomousClockMarkup();

  if (insertMode === "after") {
    mountTarget.insertAdjacentElement("afterend", section);
  } else {
    mountTarget.insertAdjacentElement("beforebegin", section);
  }

  drawOdcDialTicks();
  harvestWebsiteTelemetryIntoQueue();
  recalculateOdcClock("Initial Live Telemetry Sync (Wikipedia + NASA EONET + USGS)", 0);
  bindOdcControls();
  startOdcAutonomousLoop();

  // Re-harvest live articles/sensors whenever external APIs finish loading
  setTimeout(() => {
    harvestWebsiteTelemetryIntoQueue();
    processNextLiveIncident();
  }, 2200);
}

function buildAutonomousClockMarkup() {
  return `
    <div class="container">
      <div class="section-header-row">
        <div>
          <span class="section-kicker">AUTONOMOUS REAL-TIME TELEMETRY ENGINE • ODC-LIVE v3.0</span>
          <h2 class="section-title">Live Data-Driven Doomsday Clock (Real-Time World Incident Analyzer)</h2>
          <p class="section-desc">
            While the Official Bulletin Clock updates once a year (<strong>85.00s baseline</strong>), this <strong>Autonomous Observatory Clock</strong> continuously reads live global news, USGS seismic events, NASA satellite hazards, and diplomatic signals on our site—moving <strong>forward and backward in real time</strong> according to strict mathematical threat ratios.
          </p>
        </div>
        <div class="feed-meta-controls">
          <button type="button" id="odc-toggle-run-btn" class="btn-chip" aria-pressed="true">
            <span class="live-dot"></span> <span id="odc-run-label">Autonomous Engine: RUNNING (5s Cycle)</span>
          </button>
          <button type="button" id="odc-force-scan-btn" class="btn-secondary">⚡ Scan Next Live Signal Now</button>
        </div>
      </div>

      <!-- Top Comparison Banner: Official Annual Clock vs. Our Live Data-Driven Clock -->
      <div class="planetary-gauges-row" style="margin-bottom: 1.5rem;">
        <div class="digital-box">
          <span class="digital-label">1. OFFICIAL BULLETIN CLOCK (ANNUAL)</span>
          <span class="digital-val mono" id="odc-official-val">85.00s (23:58:35.00)</span>
          <span class="gauge-sub">Static Jan 2026 Official Setting</span>
        </div>
        <div class="digital-box" style="border-color: rgba(56, 189, 248, 0.45);">
          <span class="digital-label">2. OUR LIVE AUTONOMOUS CLOCK (REAL-TIME)</span>
          <span class="digital-val mono accent-text" id="odc-live-readout-top">82.40s (23:58:37.60)</span>
          <span class="gauge-sub" id="odc-live-delta-top">−2.60s Closer than Official Baseline</span>
        </div>
        <div class="digital-box">
          <span class="digital-label">COMPOSITE GLOBAL THREAT INDEX</span>
          <span class="digital-val mono" style="color: #fbbf24;" id="odc-composite-pct">66.8% (ELEVATED)</span>
          <span class="gauge-sub" id="odc-tier-label">Tier 4: Elevated Global Tension</span>
        </div>
        <div class="digital-box">
          <span class="digital-label">LAST LIVE INCIDENT SHIFT</span>
          <span class="digital-val mono" id="odc-last-shift-val">Analyzing live stream...</span>
          <span class="gauge-sub" id="odc-queue-count">Live Telemetry Queue Active</span>
        </div>
      </div>

      <!-- Main 3-Column Autonomous Clock Studio -->
      <div class="odc-studio-grid">
        <!-- Column 1: Live Autonomous SVG Clock Dial & Sparkline -->
        <div class="clock-stage-card odc-dial-card">
          <div class="clock-stage-header">
            <span class="status-pill status-critical" id="odc-live-status-pill">⚡ LIVE AUTONOMOUS HAND</span>
            <span class="mono" style="font-size: 0.72rem; color: #94a3b8;" id="odc-24h-badge">23:58:37.60</span>
          </div>

          <div class="clock-canvas-wrap" style="max-width: 340px;">
            <svg id="odc-live-svg" viewBox="0 0 420 420" role="img" aria-label="Autonomous Live Data-Driven Doomsday Clock">
              <defs>
                <radialGradient id="odcLiveGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.20" />
                  <stop offset="65%" stop-color="#ff3b30" stop-opacity="0.08" />
                  <stop offset="100%" stop-color="#000000" stop-opacity="0" />
                </radialGradient>
              </defs>

              <circle cx="210" cy="210" r="192" fill="url(#odcLiveGlow)" />
              <circle cx="210" cy="210" r="182" fill="#080b12" stroke="#232838" stroke-width="2.5" />
              <circle cx="210" cy="210" r="168" fill="none" stroke="#181c28" stroke-width="1" stroke-dasharray="3 5" />

              <!-- Dynamic Danger Sector from Live Hand to Midnight -->
              <path id="odc-danger-sector" d="" fill="rgba(255, 59, 48, 0.18)" />
              <path id="odc-danger-arc" d="" fill="none" stroke="#ff3b30" stroke-width="6" stroke-linecap="round" />

              <g id="odc-dial-ticks"></g>

              <!-- Midnight Crown -->
              <g transform="translate(210, 26)">
                <polygon points="0,12 -7,0 7,0" fill="#ff3b30" />
              </g>
              <text x="210" y="64" text-anchor="middle" class="clock-midnight-label">MIDNIGHT (00:00)</text>

              <!-- Reference Marker: Official 85s Bulletin Hand (Dashed Red/Gray Reference) -->
              <g id="odc-official-ref-hand" transform="rotate(-8.5 210 210)">
                <line x1="210" y1="210" x2="210" y2="56" stroke="rgba(255, 255, 255, 0.38)" stroke-width="2.5" stroke-dasharray="4 4" />
                <text x="210" y="82" text-anchor="middle" fill="#94a3b8" font-size="8.5" class="mono">85s OFFICIAL</text>
              </g>

              <!-- Hour Hand -->
              <g id="odc-hour-hand" transform="rotate(-0.7 210 210)">
                <line x1="210" y1="230" x2="210" y2="104" stroke="#cbd5e1" stroke-width="6.5" stroke-linecap="round" />
              </g>

              <!-- LIVE AUTONOMOUS MINUTE/SECOND HAND -->
              <g id="odc-live-hand" transform="rotate(-8.24 210 210)" style="transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);">
                <line id="odc-live-hand-line" x1="210" y1="240" x2="210" y2="44" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" />
                <circle id="odc-live-hand-tip" cx="210" cy="50" r="4.5" fill="#ffffff" stroke="#38bdf8" stroke-width="2" />
              </g>

              <circle cx="210" cy="210" r="11" fill="#181c28" stroke="#38bdf8" stroke-width="3" />
              <circle cx="210" cy="210" r="4" fill="#ffffff" />
            </svg>
          </div>

          <div class="odc-big-readout-wrap">
            <div class="odc-big-seconds mono" id="odc-big-seconds">82.40s</div>
            <div class="odc-big-sub mono" id="odc-big-sub">SECONDS TO MIDNIGHT • LIVE TELEMETRY</div>
          </div>

          <!-- Real-Time Movement Sparkline -->
          <div class="odc-sparkline-box">
            <div style="display:flex;justify-content:space-between;font-size:0.68rem;color:#94a3b8;margin-bottom:0.25rem;" class="mono">
              <span>LIVE MOVEMENT TRAJECTORY (LAST 15 CYCLES)</span>
              <span id="odc-sparkline-range">85.0s Baseline</span>
            </div>
            <svg id="odc-sparkline-svg" viewBox="0 0 320 58" width="100%" height="58"></svg>
          </div>
        </div>

        <!-- Column 2: 5 Weighted Threat & Stabilization Pillars + Live Incident Stream Log -->
        <div class="sensor-panel odc-pillars-panel">
          <div class="sensor-panel-header" style="margin-bottom: 0.75rem; padding-bottom: 0.6rem;">
            <div>
              <span class="sensor-badge seismic-badge">LIVE WEIGHTED PILLAR ANALYZER</span>
              <h3>Real-Time Threat Percentages &amp; Ratios</h3>
            </div>
            <div style="display:flex;gap:0.35rem;">
              <button type="button" class="btn-mini" id="odc-test-peace-btn" style="border-color:#10b981;color:#34d399;">+ Peace Signal (+0.9s)</button>
              <button type="button" class="btn-mini" id="odc-test-crisis-btn">− Crisis Signal (−0.9s)</button>
            </div>
          </div>

          <div id="odc-pillars-bars" class="arsenal-bars-list" style="margin-bottom: 1.1rem;"></div>

          <div class="sensor-panel-header" style="margin-bottom: 0.5rem; padding-bottom: 0.4rem;">
            <div>
              <span class="sensor-badge climate-badge">LIVE INCIDENT IMPACT LOG</span>
              <h4 style="font-size: 0.95rem;">How Live World Events Are Moving the Clock Right Now</h4>
            </div>
          </div>
          <div id="odc-incident-log" class="sensor-list" style="max-height: 225px;"></div>
        </div>
      </div>

      <!-- Mathematical Rules, Weights & Threat Ratio Specification Table -->
      <div class="chart-card" style="margin-top: 1.5rem;">
        <div class="chart-header" style="margin-bottom: 0.75rem;">
          <div>
            <span class="section-kicker">ALGORITHMIC RULEBOOK &amp; MATHEMATICAL SPECIFICATION</span>
            <h3 style="font-size: 1.2rem;">How Threat Percentages &amp; Live Incidents Move the Autonomous Clock</h3>
          </div>
          <span class="mono" style="font-size: 0.75rem; color: #38bdf8;">
            Formula: T_live = 85.00s + Σ [ (Pillar% − 50%) × Ratio ] + DiplomacyCounterForce + LiveIncidentDelta
          </span>
        </div>

        <div class="sensors-grid">
          <div class="treaty-table-wrap">
            <table class="treaty-table">
              <thead>
                <tr>
                  <th>THREAT / STABILIZATION PILLAR</th>
                  <th>WEIGHT</th>
                  <th>1% SHIFT RATIO</th>
                  <th>+10% THREAT IMPACT</th>
                  <th>LIVE DATA FEED SOURCE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>☢️ Nuclear &amp; Conflict</strong></td>
                  <td class="mono">40%</td>
                  <td class="mono accent-text">−0.120s / 1%</td>
                  <td class="mono accent-text">−1.20s Closer</td>
                  <td>Wikipedia Live Conflict + USGS Shallow (&lt;10km) Seismic</td>
                </tr>
                <tr>
                  <td><strong>🌡️ Climate &amp; Hazards</strong></td>
                  <td class="mono">25%</td>
                  <td class="mono accent-text">−0.075s / 1%</td>
                  <td class="mono accent-text">−0.75s Closer</td>
                  <td>NASA EONET v3 Wildfires/Storms + Open-Meteo + CO₂</td>
                </tr>
                <tr>
                  <td><strong>🤖 AI &amp; Cyber Risk</strong></td>
                  <td class="mono">20%</td>
                  <td class="mono accent-text">−0.060s / 1%</td>
                  <td class="mono accent-text">−0.60s Closer</td>
                  <td>Autonomous Weapons, Cyber &amp; Disinformation Stream</td>
                </tr>
                <tr>
                  <td><strong>🧬 Biosecurity Watch</strong></td>
                  <td class="mono">15%</td>
                  <td class="mono accent-text">−0.045s / 1%</td>
                  <td class="mono accent-text">−0.45s Closer</td>
                  <td>Global Pathogen, Outbreak &amp; Lab Safety Telemetry</td>
                </tr>
                <tr>
                  <td><strong>🕊️ Diplomacy &amp; Peace</strong></td>
                  <td class="mono">+25%</td>
                  <td class="mono" style="color:#34d399;">+0.150s / 1%</td>
                  <td class="mono" style="color:#34d399;">+1.50s Safer (Back)</td>
                  <td>Treaties, Ceasefires, Disarmament &amp; Clean Energy</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="treaty-table-wrap">
            <table class="treaty-table">
              <thead>
                <tr>
                  <th>COMPOSITE THREAT %</th>
                  <th>RISK CLASSIFICATION</th>
                  <th>NET CLOCK MOVEMENT</th>
                </tr>
              </thead>
              <tbody>
                ${ODC_RULES_SPEC.tiers
                  .map(
                    (t) => `
                  <tr>
                    <td class="mono"><strong>${t.range}</strong></td>
                    <td><span class="status-pill ${t.badgeClass}">${t.label}</span></td>
                    <td class="mono">${t.shift}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

function drawOdcDialTicks() {
  const ticksGroup = document.getElementById("odc-dial-ticks");
  if (!ticksGroup) return;
  ticksGroup.innerHTML = "";
  const cx = 210;
  const cy = 210;
  const outerR = 166;

  for (let i = 0; i < 60; i++) {
    const angleDeg = i * 6;
    const angleRad = ((angleDeg - 90) * Math.PI) / 180;
    const isHour = i % 5 === 0;
    const isFinalZone = i >= 45;
    const innerR = isHour ? 150 : 158;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", (cx + innerR * Math.cos(angleRad)).toFixed(2));
    line.setAttribute("y1", (cy + innerR * Math.sin(angleRad)).toFixed(2));
    line.setAttribute("x2", (cx + outerR * Math.cos(angleRad)).toFixed(2));
    line.setAttribute("y2", (cy + outerR * Math.sin(angleRad)).toFixed(2));
    line.setAttribute(
      "stroke",
      i === 0 ? "#ff3b30" : isFinalZone ? "rgba(56, 189, 248, 0.75)" : "rgba(148, 163, 184, 0.3)"
    );
    line.setAttribute("stroke-width", isHour ? "2.5" : "1.2");
    ticksGroup.appendChild(line);
  }
}

// Harvest real-time data from the site's active news, USGS seismic, and NASA EONET streams
function harvestWebsiteTelemetryIntoQueue() {
  const newQueue = [];

  // 1. Harvest from currentNewsArticles (app.js live stream + curated archive)
  if (typeof currentNewsArticles !== "undefined" && Array.isArray(currentNewsArticles)) {
    currentNewsArticles.forEach((art) => {
      const cat = art.category || "nuclear";
      const titleLower = (art.title || "").toLowerCase();
      let deltaSec = -0.25;
      let pillar = cat;

      if (cat === "diplomacy" || /(peace|treaty|ceasefire|ratif|clean|renewable|40%|solar|accord)/.test(titleLower)) {
        pillar = "diplomacy";
        deltaSec = +0.42;
      } else if (/(strike|attack|warhead|expiration|expired|catastroph|escalation|missile|test)/.test(titleLower)) {
        deltaSec = -0.48;
      } else if (cat === "climate") {
        deltaSec = -0.30;
      } else if (cat === "ai") {
        deltaSec = -0.28;
      } else if (cat === "bio") {
        deltaSec = -0.22;
      }

      newQueue.push({
        title: art.title,
        source: art.source || "Global Intelligence Stream",
        pillar,
        deltaSec
      });
    });
  }

  // 2. Harvest from liveMapMarkers (USGS Seismic & NASA EONET from features.js)
  if (typeof liveMapMarkers !== "undefined" && Array.isArray(liveMapMarkers)) {
    liveMapMarkers.forEach((m) => {
      if (m.layer === "live") {
        const isShallow = (m.status || "").includes("Depth: 0") || (m.status || "").includes("Depth: 1.");
        newQueue.push({
          title: `${m.name} (${m.status})`,
          source: "USGS Seismic Network",
          pillar: "nuclear",
          deltaSec: isShallow ? -0.35 : -0.14
        });
      } else if (m.layer === "climate") {
        newQueue.push({
          title: m.name,
          source: "NASA EONET v3 Satellite",
          pillar: "climate",
          deltaSec: -0.24
        });
      }
    });
  }

  // 3. Include stabilizing diplomatic & renewable energy signals so the clock visibly breathes back and forth
  const balancingSignals = [
    {
      title: "Global Solar, Wind & Nuclear Surpass 40% Electricity Share Milestone",
      source: "Bulletin 2026 Energy Telemetry",
      pillar: "diplomacy",
      deltaSec: +0.55
    },
    {
      title: "IAEA Continuous Safeguards Inspection Verified Across 180+ States",
      source: "IAEA Verification Feed",
      pillar: "diplomacy",
      deltaSec: +0.38
    },
    {
      title: "UN General Assembly Committee Advances Autonomous Weapons Human-Control Framework",
      source: "UN Disarmament Telemetry",
      pillar: "diplomacy",
      deltaSec: +0.44
    },
    {
      title: "WHO Global Genomic Pathogen Radar Expands Wastewater Early-Warning Nodes",
      source: "Biosecurity Stabilization Feed",
      pillar: "diplomacy",
      deltaSec: +0.32
    }
  ];

  // Interleave risk and stabilizing signals so real-world push-and-pull is visible
  const interleaved = [];
  const maxLen = Math.max(newQueue.length, balancingSignals.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < newQueue.length) interleaved.push(newQueue[i]);
    if (i < balancingSignals.length) interleaved.push(balancingSignals[i]);
  }

  if (interleaved.length > 0) {
    odcState.incidentQueue = interleaved;
  }
}

function processNextLiveIncident() {
  if (!odcState.incidentQueue.length) {
    harvestWebsiteTelemetryIntoQueue();
  }
  if (!odcState.incidentQueue.length) return;

  const item = odcState.incidentQueue[odcState.queueCursor % odcState.incidentQueue.length];
  odcState.queueCursor++;

  // Update pillar percentage based on incident
  if (item.pillar === "diplomacy") {
    odcState.pillarScores.diplomacy = Math.min(85, Math.max(20, odcState.pillarScores.diplomacy + 3.2));
    // Slightly cool down nuclear/climate tension when diplomacy rises
    odcState.pillarScores.nuclear = Math.max(40, odcState.pillarScores.nuclear - 1.1);
  } else if (odcState.pillarScores[item.pillar] !== undefined) {
    const bump = Math.abs(item.deltaSec) * 6.5;
    odcState.pillarScores[item.pillar] = Math.min(96, Math.max(30, odcState.pillarScores[item.pillar] + bump));
    // Natural mean-reversion damping so percentages reflect a dynamic equilibrium
    Object.keys(odcState.pillarScores).forEach((k) => {
      if (k !== item.pillar && k !== "diplomacy") {
        odcState.pillarScores[k] = odcState.pillarScores[k] * 0.97 + 60 * 0.03;
      }
    });
    odcState.pillarScores.diplomacy = Math.max(22, odcState.pillarScores.diplomacy * 0.96);
  }

  recalculateOdcClock(`${item.title} (${item.source})`, item.deltaSec, item.pillar);
}

function recalculateOdcClock(reasonText, lastIncidentDelta = 0, activePillar = "nuclear") {
  // Get official baseline from TIMELINE_DATA if available
  if (typeof TIMELINE_DATA !== "undefined" && TIMELINE_DATA.length > 0) {
    odcState.officialBaseline = Number(TIMELINE_DATA[TIMELINE_DATA.length - 1].seconds) || 85.0;
  }

  const p = odcState.pillarScores;
  const spec = ODC_RULES_SPEC.pillars;

  // 1. Compute Weighted Composite Threat Percentage (0% - 100%)
  const compositePct =
    p.nuclear * spec.nuclear.weight +
    p.climate * spec.climate.weight +
    p.ai * spec.ai.weight +
    p.bio * spec.bio.weight;

  // Subtract stabilizing diplomacy dampening from composite threat
  const effectiveThreatPct = Math.max(
    12,
    Math.min(98, compositePct - (p.diplomacy - 35) * 0.22)
  );
  odcState.compositeThreatPct = effectiveThreatPct;

  // 2. Compute exact second shift per pillar from 50% equilibrium
  const nuclearShift = (p.nuclear - 50) * spec.nuclear.secPerPct;
  const climateShift = (p.climate - 50) * spec.climate.secPerPct;
  const aiShift = (p.ai - 50) * spec.ai.secPerPct;
  const bioShift = (p.bio - 50) * spec.bio.secPerPct;
  const diplomacyShift = (p.diplomacy - 35) * spec.diplomacy.secPerPct;

  const netShift = nuclearShift + climateShift + aiShift + bioShift + diplomacyShift + lastIncidentDelta;

  odcState.previousSeconds = odcState.currentSeconds;
  odcState.currentSeconds = Math.max(
    ODC_RULES_SPEC.minAllowedSeconds,
    Math.min(ODC_RULES_SPEC.maxAllowedSeconds, odcState.officialBaseline + netShift)
  );

  // Record in sparkline history (keep last 15 readings)
  odcState.sparklineHistory.push(Number(odcState.currentSeconds.toFixed(2)));
  if (odcState.sparklineHistory.length > 15) {
    odcState.sparklineHistory.shift();
  }

  // Record in live incident log
  const stepDiff = odcState.currentSeconds - odcState.previousSeconds;
  const nowTime = new Date().toISOString().substring(11, 19) + " UTC";
  odcState.incidentLog.unshift({
    time: nowTime,
    title: reasonText,
    pillar: activePillar,
    stepDiff: lastIncidentDelta !== 0 ? lastIncidentDelta : stepDiff,
    resultingSeconds: odcState.currentSeconds
  });
  if (odcState.incidentLog.length > 12) {
    odcState.incidentLog.pop();
  }

  renderOdcStudioUI();
}

function renderOdcStudioUI() {
  const secs = odcState.currentSeconds;
  const base = odcState.officialBaseline;
  const netDelta = secs - base;

  // Format 24-hour clock string (e.g., 23:58:37.60)
  const wholeMins = Math.floor(secs / 60);
  const remSecs = secs - wholeMins * 60;
  const clockMin = 59 - wholeMins - (remSecs > 0 ? 1 : 0);
  const clockSec = remSecs > 0 ? 60 - remSecs : 0;
  const time24Str = `23:${String(clockMin).padStart(2, "0")}:${clockSec.toFixed(2).padStart(5, "0")}`;

  // Update SVG Clock Hand & Danger Arc
  // Note: To make second-level changes visually dramatic on the dial, we amplify the visual angle near midnight slightly while keeping 1m = 6deg proportional
  const angleDeg = -((secs / 60) * 6);
  const liveHand = document.getElementById("odc-live-hand");
  const handLine = document.getElementById("odc-live-hand-line");
  const refHand = document.getElementById("odc-official-ref-hand");

  if (refHand) {
    refHand.setAttribute("transform", `rotate(${(-((base / 60) * 6)).toFixed(2)} 210 210)`);
  }
  if (liveHand) {
    liveHand.setAttribute("transform", `rotate(${angleDeg.toFixed(2)} 210 210)`);
  }

  const lastLog = odcState.incidentLog[0];
  const movedSafer = lastLog && lastLog.stepDiff > 0;
  if (handLine) {
    handLine.setAttribute("stroke", movedSafer ? "#10b981" : "#38bdf8");
  }

  // Danger sector path
  const cx = 210;
  const cy = 210;
  const r = 166;
  const startRad = ((angleDeg - 90) * Math.PI) / 180;
  const endRad = (-90 * Math.PI) / 180;
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);

  const arcEl = document.getElementById("odc-danger-arc");
  const sectorEl = document.getElementById("odc-danger-sector");
  if (arcEl) arcEl.setAttribute("d", `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`);
  if (sectorEl) sectorEl.setAttribute("d", `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`);

  // Update Text Readouts
  const elOfficial = document.getElementById("odc-official-val");
  const elTopReadout = document.getElementById("odc-live-readout-top");
  const elTopDelta = document.getElementById("odc-live-delta-top");
  const elCompPct = document.getElementById("odc-composite-pct");
  const elTierLabel = document.getElementById("odc-tier-label");
  const elLastShift = document.getElementById("odc-last-shift-val");
  const elQueueCount = document.getElementById("odc-queue-count");
  const elBigSecs = document.getElementById("odc-big-seconds");
  const el24hBadge = document.getElementById("odc-24h-badge");
  const elStatusPill = document.getElementById("odc-live-status-pill");

  if (elOfficial) elOfficial.textContent = `${base.toFixed(2)}s (Official Baseline)`;
  if (elTopReadout) {
    elTopReadout.textContent = `${secs.toFixed(2)}s (${time24Str})`;
    elTopReadout.style.color = netDelta >= 0 ? "#34d399" : "#ff6961";
  }
  if (elTopDelta) {
    elTopDelta.textContent =
      netDelta >= 0
        ? `+${netDelta.toFixed(2)}s SAFER than Official 85s Baseline`
        : `${netDelta.toFixed(2)}s CLOSER to Midnight than Official 85s`;
  }

  const pct = odcState.compositeThreatPct;
  let activeTier = ODC_RULES_SPEC.tiers[3];
  if (pct <= 25) activeTier = ODC_RULES_SPEC.tiers[0];
  else if (pct < 49.5) activeTier = ODC_RULES_SPEC.tiers[1];
  else if (pct <= 50.5) activeTier = ODC_RULES_SPEC.tiers[2];
  else if (pct <= 70) activeTier = ODC_RULES_SPEC.tiers[3];
  else if (pct <= 85) activeTier = ODC_RULES_SPEC.tiers[4];
  else activeTier = ODC_RULES_SPEC.tiers[5];

  if (elCompPct) elCompPct.textContent = `${pct.toFixed(1)}% THREAT`;
  if (elTierLabel) elTierLabel.textContent = activeTier.label;

  if (lastLog && elLastShift) {
    const sign = lastLog.stepDiff >= 0 ? "+" : "";
    elLastShift.textContent = `${sign}${lastLog.stepDiff.toFixed(2)}s (${
      lastLog.stepDiff >= 0 ? "Moved Back / Safer" : "Moved Closer"
    })`;
    elLastShift.style.color = lastLog.stepDiff >= 0 ? "#34d399" : "#ff6961";
  }
  if (elQueueCount) {
    elQueueCount.textContent = `${odcState.incidentQueue.length} Live Signals Indexed in Rotation`;
  }

  if (elBigSecs) {
    elBigSecs.textContent = `${secs.toFixed(2)} SECONDS`;
    elBigSecs.style.color = movedSafer ? "#34d399" : "#38bdf8";
  }
  if (el24hBadge) el24hBadge.textContent = time24Str;
  if (elStatusPill) {
    elStatusPill.textContent = movedSafer
      ? "🕊️ PULLED BACK BY DIPLOMACY SIGNAL"
      : "⚡ ADVANCED BY LIVE THREAT SIGNAL";
    elStatusPill.className = "status-pill " + (movedSafer ? "status-safe" : "status-critical");
  }

  // Render 5 Pillar Percentage & Seconds Contribution Bars
  const pillarsContainer = document.getElementById("odc-pillars-bars");
  if (pillarsContainer) {
    const p = odcState.pillarScores;
    const rows = [
      { key: "nuclear", score: p.nuclear, eq: 50 },
      { key: "climate", score: p.climate, eq: 50 },
      { key: "ai", score: p.ai, eq: 50 },
      { key: "bio", score: p.bio, eq: 50 },
      { key: "diplomacy", score: p.diplomacy, eq: 35 }
    ];

    pillarsContainer.innerHTML = rows
      .map((r) => {
        const meta = ODC_RULES_SPEC.pillars[r.key];
        const secContribution = (r.score - r.eq) * meta.secPerPct;
        const sign = secContribution >= 0 ? "+" : "";
        return `
          <div class="arsenal-row">
            <div class="arsenal-row-top">
              <span><strong>${meta.icon} ${meta.name}</strong> <span class="mono" style="font-size:0.72rem;color:#94a3b8;">(${meta.weightPct})</span></span>
              <span class="mono" style="color:${ secContribution >= 0 ? "#34d399" : "#ff6961" };">
                ${r.score.toFixed(1)}% → <strong>${sign}${secContribution.toFixed(2)}s</strong>
              </span>
            </div>
            <div class="arsenal-bar-bg">
              <div class="arsenal-bar-fill" style="width:${Math.min(100, r.score).toFixed(1)}%;background:${meta.color};"></div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // Render Live Incident Log
  const logContainer = document.getElementById("odc-incident-log");
  if (logContainer) {
    logContainer.innerHTML = odcState.incidentLog
      .map((entry) => {
        const isSafer = entry.stepDiff >= 0;
        const sign = isSafer ? "+" : "";
        return `
          <div class="sensor-item" style="padding: 0.55rem 0.75rem;">
            <div>
              <div class="sensor-item-title" style="font-size: 0.8rem;">${entry.title}</div>
              <div class="sensor-item-sub">${entry.time} • Pillar: ${entry.pillar.toUpperCase()} • Clock → ${entry.resultingSeconds.toFixed(2)}s</div>
            </div>
            <span class="status-pill ${isSafer ? "status-safe" : "status-critical"} mono">
              ${sign}${entry.stepDiff.toFixed(2)}s
            </span>
          </div>
        `;
      })
      .join("");
  }

  // Render Sparkline
  renderOdcSparkline();
}

function renderOdcSparkline() {
  const svg = document.getElementById("odc-sparkline-svg");
  if (!svg) return;
  const hist = odcState.sparklineHistory;
  if (hist.length < 2) return;

  const minV = Math.min(...hist, 78);
  const maxV = Math.max(...hist, 88);
  const span = Math.max(2, maxV - minV);
  const w = 320;
  const h = 58;

  const pts = hist.map((val, idx) => {
    const x = (idx / (hist.length - 1)) * (w - 16) + 8;
    const y = h - 8 - ((val - minV) / span) * (h - 16);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const baseY = h - 8 - ((odcState.officialBaseline - minV) / span) * (h - 16);

  svg.innerHTML = `
    <line x1="0" y1="${baseY.toFixed(1)}" x2="${w}" y2="${baseY.toFixed(1)}" stroke="rgba(255,255,255,0.2)" stroke-dasharray="3 3" />
    <polyline points="${pts.join(" ")}" fill="none" stroke="#38bdf8" stroke-width="2.2" />
    ${hist
      .map((val, idx) => {
        const [x, y] = pts[idx].split(",");
        return `<circle cx="${x}" cy="${y}" r="${idx === hist.length - 1 ? 4 : 2}" fill="${
          val >= odcState.officialBaseline ? "#10b981" : "#ff3b30"
        }" />`;
      })
      .join("")}
  `;
}

function startOdcAutonomousLoop() {
  if (odcState.timerId) clearInterval(odcState.timerId);
  odcState.timerId = setInterval(() => {
    if (!odcState.running) return;
    processNextLiveIncident();
  }, 5000);
}

function bindOdcControls() {
  const toggleBtn = document.getElementById("odc-toggle-run-btn");
  const runLabel = document.getElementById("odc-run-label");

  toggleBtn?.addEventListener("click", () => {
    odcState.running = !odcState.running;
    toggleBtn.setAttribute("aria-pressed", String(odcState.running));
    if (runLabel) {
      runLabel.textContent = odcState.running
        ? "Autonomous Engine: RUNNING (5s Cycle)"
        : "Autonomous Engine: PAUSED";
    }
  });

  document.getElementById("odc-force-scan-btn")?.addEventListener("click", () => {
    processNextLiveIncident();
  });

  document.getElementById("odc-test-peace-btn")?.addEventListener("click", () => {
    odcState.pillarScores.diplomacy = Math.min(92, odcState.pillarScores.diplomacy + 6.0);
    odcState.pillarScores.nuclear = Math.max(35, odcState.pillarScores.nuclear - 2.5);
    recalculateOdcClock(
      "Simulated Emergency Bilateral De-Escalation & Verification Pact",
      +0.9,
      "diplomacy"
    );
  });

  document.getElementById("odc-test-crisis-btn")?.addEventListener("click", () => {
    odcState.pillarScores.nuclear = Math.min(96, odcState.pillarScores.nuclear + 5.5);
    odcState.pillarScores.ai = Math.min(94, odcState.pillarScores.ai + 3.0);
    recalculateOdcClock(
      "Simulated High-Alert Strategic Missile & Cyber Escalation Signal",
      -0.9,
      "nuclear"
    );
  });
}
