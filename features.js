/**
 * DOOMSDAY CLOCK OBSERVATORY — EXPANSION PACK (MODULES 1 TO 8)
 * 1. Interactive Global Threat & Nuclear Stockpile World Map (with live USGS/NASA overlay)
 * 2. Live Atmospheric CO2, Temperature Anomaly & Space Weather Kp Telemetry
 * 3. City Impact Visualizer: 1983 TTAPS Nuclear Winter vs. Climate Warming (+ Live Open-Meteo API)
 * 4. "When Were You Born?" Personal Doomsday Time Machine (1947–2026)
 * 5. Global Nuclear Stockpiles & Arms Control Treaty Matrix
 * 6. Next-Announcement Live Countdown & Community Prediction Poll
 * 7. High-Resolution PNG Status Card Exporter (<canvas>) & Embeddable Widget Generator
 * 8. "Take Action" Civic & Scientific Solutions Directory
 */

const GEO_NODES = [
  // 9 Nuclear-Armed States
  {
    id: "usa",
    name: "United States",
    lat: 38.9,
    lon: -77.0,
    layer: "nuclear",
    warheads: 5044,
    firstTest: "1945 (Trinity)",
    status: "New START Expired Feb 5, 2026",
    desc: "First nuclear state (1945) and thermonuclear test (1952). Following the expiration of New START on February 5, 2026, U.S. and Russian strategic forces operate without bilateral treaty caps."
  },
  {
    id: "rus",
    name: "Russia (formerly USSR)",
    lat: 55.75,
    lon: 37.6,
    layer: "nuclear",
    warheads: 5580,
    firstTest: "1949 (RDS-1)",
    status: "New START Suspended 2023 / Expired 2026",
    desc: "Tested RDS-1 in 1949 (moving the Clock to 3m) and Joe 4 in 1953 (2m). Ongoing war in Ukraine and nuclear doctrine shifts were primary drivers of the 2023–2026 Clock settings."
  },
  {
    id: "chn",
    name: "China",
    lat: 39.9,
    lon: 116.4,
    layer: "nuclear",
    warheads: 500,
    firstTest: "1964 (Project 596)",
    status: "Rapid Silo & Triad Modernization",
    desc: "Tested first device in 1964 (cited in the 1968 Clock move). Currently expanding strategic ICBM silos and naval deterrence."
  },
  {
    id: "fra",
    name: "France",
    lat: 48.85,
    lon: 2.35,
    layer: "nuclear",
    warheads: 290,
    firstTest: "1960 (Gerboise Bleue)",
    status: "NPT Member • Sea & Air Deterrent",
    desc: "First tested in 1960 (cited in 1968 adjustment). Maintains submarine-launched and air-delivered strategic forces."
  },
  {
    id: "gbr",
    name: "United Kingdom",
    lat: 51.5,
    lon: -0.12,
    layer: "nuclear",
    warheads: 225,
    firstTest: "1952 (Operation Hurricane)",
    status: "NPT Member • Continuous At-Sea Deterrence",
    desc: "Co-signed the 1963 Partial Test Ban Treaty, which helped push the Clock back to 12 minutes to midnight."
  },
  {
    id: "ind",
    name: "India",
    lat: 28.6,
    lon: 77.2,
    layer: "nuclear",
    warheads: 172,
    firstTest: "1974 (Smiling Buddha) / 1998 (Pokhran-II)",
    status: "Non-NPT • No First Use Policy",
    desc: "1974 and 1998 nuclear tests directly triggered Clock moves to 9 minutes; May 2025 border clashes with Pakistan were cited in the 2026 85-second statement."
  },
  {
    id: "pak",
    name: "Pakistan",
    lat: 33.7,
    lon: 73.1,
    layer: "nuclear",
    warheads: 170,
    firstTest: "1998 (Chagai-I)",
    status: "Non-NPT • Full-Spectrum Deterrence",
    desc: "Tested nuclear weapons in May 1998 (moving Clock from 14m to 9m). Regional South Asian tensions remain a core Bulletin concern in 2026."
  },
  {
    id: "isr",
    name: "Israel",
    lat: 31.77,
    lon: 35.21,
    layer: "nuclear",
    warheads: 90,
    firstTest: "Undeclared (Policy of Deliberate Ambiguity)",
    status: "Non-NPT • Regional Flashpoint",
    desc: "Maintains policy of nuclear opacity; June 2025 strikes on Iran and wider Middle East conflict were highlighted in the January 2026 Bulletin statement."
  },
  {
    id: "prk",
    name: "North Korea (DPRK)",
    lat: 39.0,
    lon: 125.75,
    layer: "nuclear",
    warheads: 50,
    firstTest: "2006 (October Underground Test)",
    status: "Withdrew from NPT (2003)",
    desc: "First nuclear test in October 2006 pushed the Clock to 5 minutes in 2007; ongoing ICBM and tactical nuclear developments cited in 2023–2026."
  },
  // 2026 Bulletin Geopolitical Flashpoints
  {
    id: "fp-ukraine",
    name: "Eastern Europe & Zaporizhzhia Reactor Zone",
    lat: 47.5,
    lon: 34.6,
    layer: "flashpoint",
    warheads: 0,
    firstTest: "2022–2026 Active Conflict",
    status: "CRITICAL 2026 CLOCK DRIVER",
    desc: "Cited in the 2023 (90s), 2025 (89s), and 2026 (85s) statements due to nuclear escalation risks and military operations near nuclear power facilities."
  },
  {
    id: "fp-mideast",
    name: "Middle East & Persian Gulf Corridor",
    lat: 32.4,
    lon: 53.6,
    layer: "flashpoint",
    warheads: 0,
    firstTest: "2025–2026 Regional Escalation",
    status: "CRITICAL 2026 CLOCK DRIVER",
    desc: "The January 27, 2026 statement cited the June 2025 strikes on Iran and nuclear proliferation pressures across the Middle East."
  },
  {
    id: "fp-arctic",
    name: "Arctic Cryosphere & Svalbard Vault",
    lat: 78.2,
    lon: 15.6,
    layer: "flashpoint",
    warheads: 0,
    firstTest: "Climate Tipping Monitor",
    status: "SEVERE PLANETARY BOUNDARY",
    desc: "Warming nearly four times faster than the global average, driving sea-ice loss, permafrost methane release, and strategic militarization."
  }
];

const CITIES_DATA = [
  { name: "New Delhi, India", lat: 28.61, lon: 77.21, baseTempC: 26.5, zone: "Subtropical Continental" },
  { name: "Patna, India", lat: 25.59, lon: 85.13, baseTempC: 27.2, zone: "Indo-Gangetic Plain" },
  { name: "New York, USA", lat: 40.71, lon: -74.01, baseTempC: 14.2, zone: "Northern Mid-Latitude" },
  { name: "London, UK", lat: 51.51, lon: -0.13, baseTempC: 12.1, zone: "North Atlantic Maritime" },
  { name: "Moscow, Russia", lat: 55.75, lon: 37.62, baseTempC: 6.8, zone: "Northern Continental Interior" },
  { name: "Tokyo, Japan", lat: 35.68, lon: 139.65, baseTempC: 16.4, zone: "Pacific Mid-Latitude" },
  { name: "Beijing, China", lat: 39.9, lon: 116.4, baseTempC: 13.5, zone: "East Asian Continental" },
  { name: "Sydney, Australia", lat: -33.87, lon: 151.21, baseTempC: 18.8, zone: "Southern Hemisphere" }
];

const TREATIES_DATA = [
  {
    year: 1963,
    name: "Partial Test Ban Treaty (PTBT)",
    clockEffect: "+5 min (to 12m)",
    status: "In Force",
    statusClass: "status-safe",
    notes: "Banned nuclear testing in the atmosphere, outer space, and underwater."
  },
  {
    year: 1968,
    name: "Nuclear Non-Proliferation Treaty (NPT)",
    clockEffect: "+3 min in 1969 (to 10m)",
    status: "In Force (191 States)",
    statusClass: "status-safe",
    notes: "Cornerstone global bargain preventing horizontal proliferation."
  },
  {
    year: 1972,
    name: "Anti-Ballistic Missile (ABM) Treaty",
    clockEffect: "+2 min (to 12m)",
    status: "Terminated (2002)",
    statusClass: "status-critical",
    notes: "U.S. withdrawal in 2002 contributed to moving the Clock to 7 minutes."
  },
  {
    year: 1987,
    name: "Intermediate-Range Nuclear Forces (INF)",
    clockEffect: "+3 min in 1988 (to 6m)",
    status: "Terminated (2019)",
    statusClass: "status-critical",
    notes: "Eliminated ground-launched missiles (500–5,500 km); collapse in 2019 drove the 2020 move to 100s."
  },
  {
    year: 1991,
    name: "START I (Strategic Arms Reduction Treaty)",
    clockEffect: "+7 min (to 17m Safest)",
    status: "Completed / Succeeded",
    statusClass: "status-high",
    notes: "Pushed the Doomsday Clock to its farthest point from midnight in history (17 minutes)."
  },
  {
    year: 2010,
    name: "New START Strategic Arms Treaty",
    clockEffect: "+1 min (to 6m)",
    status: "EXPIRED FEB 5, 2026",
    statusClass: "status-critical",
    notes: "Last remaining bilateral cap on U.S. and Russian strategic nuclear warheads; expired Feb 5, 2026."
  },
  {
    year: 2015,
    name: "Paris Climate Agreement",
    clockEffect: "Monitored Annually",
    status: "Active (Implementation Gap)",
    statusClass: "status-high",
    notes: "Pursues 1.5°C–2.0°C warming limit; Bulletin cites insufficient national emissions cuts in 2026."
  }
];

const TAKE_ACTION_ITEMS = [
  {
    icon: "🕊️",
    pillar: "NUCLEAR RISK REDUCTION",
    title: "Demand New Strategic Arms Control & De-Alerting",
    desc: "Historically, public pressure and scientific diplomacy produced the 1963 Partial Test Ban, 1987 INF, and 1991 START I treaties. Citizens can urge representatives to negotiate a successor to New START and adopt 'No First Use' policies.",
    link: SOURCES.BRITANNICA,
    linkLabel: "Britannica: How Risk Is Reduced ↗"
  },
  {
    icon: "⚡",
    pillar: "CLIMATE & ENERGY TRANSITION",
    title: "Accelerate the >40% Clean Electricity Momentum",
    desc: "The 2026 Bulletin report noted that solar, wind, and nuclear energy surpassed 40% of global electricity generation. Supporting grid electrification, methane reduction, and science-agency funding directly counters climate threat multipliers.",
    link: SOURCES.ALJAZEERA_2026,
    linkLabel: "2026 Clean Energy Findings ↗"
  },
  {
    icon: "🤖",
    pillar: "AI & AUTONOMOUS WEAPONS GOVERNANCE",
    title: "Enforce 'Human-in-the-Loop' Nuclear Command Rules",
    desc: "Support international agreements prohibiting artificial intelligence from making autonomous launch or lethal targeting decisions, and verify media provenance to counter synthetic crisis disinformation.",
    link: SOURCES.WIKI,
    linkLabel: "Bulletin AI Risk Framework ↗"
  },
  {
    icon: "🧬",
    pillar: "GLOBAL BIOSECURITY & SURVEILLANCE",
    title: "Strengthen Universal Gene-Synthesis Screening",
    desc: "Advocate for mandatory international screening of synthetic DNA orders, transparent laboratory safety standards, and restored funding for global pandemic early-warning networks.",
    link: SOURCES.WIKI,
    linkLabel: "Science & Security Board ↗"
  }
];

let activeMapLayer = "all";
let liveMapMarkers = [];

document.addEventListener("DOMContentLoaded", () => {
  initWorldThreatMap();
  initCityVisualizer();
  initBirthYearMachine();
  renderArsenalAndTreaties();
  initCountdownAndPoll();
  initShareAndEmbedTools();
  renderTakeActionDirectory();
  initSituationDispatchTool();
  initBallisticCalculator();
  initCustomScenarioBuilder();
  initTimelineArchiveSearch();
});

// ============================================================================
// MODULE 1 & 2: INTERACTIVE GLOBAL THREAT MAP & PLANETARY GAUGES
// ============================================================================
// ============================================================================
// MODULE 1 & 2: REAL OPEN-SOURCE WORLD MAP (NATURAL EARTH 110M) & 3D INTERACTIVE GLOBE
// Powered by D3-Geo (d3@7) + TopoJSON (topojson-client@3) + Natural Earth (world-atlas@2)
// ============================================================================

let worldAtlasFeatures = null;
let d3ReadyPromise = null;
let mapProjectionMode = "2d"; // "2d" (Natural Earth Real Map) | "3d" (Interactive 3D Orthographic Globe)
let globeRotation = [-25, -18, 0]; // Centered to show Europe, Middle East, India, Asia & Americas clearly
let globeScale = 225;
let mapZoomTransform = { k: 1, x: 0, y: 0 };
let globeAutoRotate = false;
let globeAnimFrame = null;
let activeMissileArc = {
  from: [-77.0, 38.9],
  to: [37.6, 55.75],
  label: "Strategic Watch Corridor"
};

// ISO-3166-1 numeric country codes in Natural Earth world-atlas@2/countries-110m.json
const COUNTRY_RISK_INDEX = {
  "840": { nodeId: "usa", level: "nuclear", name: "United States" },
  "643": { nodeId: "rus", level: "nuclear", name: "Russia" },
  "156": { nodeId: "chn", level: "nuclear", name: "China" },
  "250": { nodeId: "fra", level: "nuclear", name: "France" },
  "826": { nodeId: "gbr", level: "nuclear", name: "United Kingdom" },
  "356": { nodeId: "ind", level: "nuclear", name: "India" },
  "586": { nodeId: "pak", level: "nuclear", name: "Pakistan" },
  "376": { nodeId: "isr", level: "nuclear", name: "Israel" },
  "408": { nodeId: "prk", level: "nuclear", name: "North Korea" },
  "804": { nodeId: "fp-ukraine", level: "flashpoint", name: "Ukraine" },
  "364": { nodeId: "fp-mideast", level: "flashpoint", name: "Iran" },
  "760": { nodeId: "fp-mideast", level: "flashpoint", name: "Syria" },
  "887": { nodeId: "fp-mideast", level: "flashpoint", name: "Yemen" },
  "304": { nodeId: "fp-arctic", level: "climate", name: "Greenland (Arctic Cryosphere)" }
};

// Climate stress nodes for the "climate" filter button on map.html
const CLIMATE_STRESS_NODES = [
  {
    id: "clim-arctic",
    name: "Arctic Sea-Ice & Permafrost Zone",
    lat: 76.5,
    lon: -42.0,
    layer: "climate",
    warheads: 0,
    firstTest: "+3.8°C Regional Anomaly",
    status: "CRYOSPHERE TIPPING WATCH",
    desc: "Arctic amplification is warming polar latitudes nearly 4x faster than the global average, accelerating Greenland ice sheet melt and permafrost methane release."
  },
  {
    id: "clim-amazon",
    name: "Amazon Basin Dieback & Drought Corridor",
    lat: -5.2,
    lon: -62.0,
    layer: "climate",
    warheads: 0,
    firstTest: "Severe Hydrological Stress",
    status: "CARBON SINK RISK",
    desc: "Recurring multi-year droughts and deforestation threaten to flip parts of the Amazon rainforest from a net carbon sink into a carbon source."
  },
  {
    id: "clim-indo-gangetic",
    name: "South Asian Wet-Bulb Heat Corridor",
    lat: 26.8,
    lon: 80.9,
    layer: "climate",
    warheads: 0,
    firstTest: "+1.5°C Threshold Exceeded",
    status: "EXTREME HEATWAVE WATCH",
    desc: "High-density agricultural and urban corridor facing intensifying pre-monsoon heatwaves, glacial river variability, and food-security pressure."
  }
];

function loadExternalScript(url) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${url}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", (e) => reject(e));
      return;
    }
    const s = document.createElement("script");
    s.src = url;
    s.async = true;
    s.addEventListener("load", () => {
      s.dataset.loaded = "true";
      resolve();
    });
    s.addEventListener("error", (e) => reject(e));
    document.head.appendChild(s);
  });
}

async function ensureCartographyEngine() {
  if (worldAtlasFeatures && window.d3 && window.topojson) return true;
  if (!d3ReadyPromise) {
    d3ReadyPromise = (async () => {
      const cdnBase = ["https://cdn.jsdelivr.net", "npm"].join("/");
      await Promise.all([
        window.d3 ? Promise.resolve() : loadExternalScript(`${cdnBase}/d3@7/dist/d3.min.js`),
        window.topojson
          ? Promise.resolve()
          : loadExternalScript(`${cdnBase}/topojson-client@3/dist/topojson-client.min.js`)
      ]);
      const topoRes = await fetch(`${cdnBase}/world-atlas@2/countries-110m.json`);
      if (!topoRes.ok) throw new Error("Failed to load world-atlas countries-110m.json");
      const topoData = await topoRes.json();
      worldAtlasFeatures = window.topojson.feature(
        topoData,
        topoData.objects.countries
      ).features;
      return true;
    })();
  }
  return d3ReadyPromise;
}

function projectLatLon(lat, lon) {
  if (typeof window !== "undefined" && window.d3 && currentActiveProjection) {
    const pt = currentActiveProjection([lon, lat]);
    if (pt) return { x: pt[0], y: pt[1], visible: true };
  }
  const x = ((lon + 180) / 360) * 1000;
  const y = ((90 - lat) / 180) * 500;
  return { x, y, visible: true };
}

let currentActiveProjection = null;

function injectMapModeToolbar(svg) {
  const parent = svg.parentElement;
  if (!parent || parent.querySelector(".map-engine-toolbar")) return;

  const toolbar = document.createElement("div");
  toolbar.className = "map-engine-toolbar";
  toolbar.innerHTML = `
    <div class="map-mode-switch" role="group" aria-label="Switch between 2D World Map and 3D Interactive Globe">
      <button type="button" class="map-mode-btn active" data-proj-mode="2d">🗺️ Real 2D World Map</button>
      <button type="button" class="map-mode-btn" data-proj-mode="3d">🌐 Interactive 3D Globe</button>
    </div>
    <div class="map-nav-controls">
      <button type="button" class="map-ctrl-btn hidden" id="globe-spin-btn" title="Toggle 3D Globe Auto-Rotation" aria-label="Toggle 3D Globe Auto-Rotation">↻ Auto-Spin: Off</button>
      <button type="button" class="map-ctrl-btn" id="map-zoom-in-btn" title="Zoom In" aria-label="Zoom In">＋</button>
      <button type="button" class="map-ctrl-btn" id="map-zoom-out-btn" title="Zoom Out" aria-label="Zoom Out">－</button>
      <button type="button" class="map-ctrl-btn" id="map-reset-view-btn" title="Reset Map / Globe View" aria-label="Reset Map or Globe View"><span aria-hidden="true">⟲</span> Reset</button>
    </div>
  `;
  parent.insertBefore(toolbar, svg);

  // Legend bar below SVG
  const legend = document.createElement("div");
  legend.className = "map-legend-bar mono";
  legend.innerHTML = `
    <span><i class="legend-swatch swatch-nuclear"></i> Nuclear-Armed States (9)</span>
    <span><i class="legend-swatch swatch-flashpoint"></i> 2026 Conflict Flashpoints</span>
    <span><i class="legend-swatch swatch-seismic"></i> Live USGS M4.5+ &amp; NASA Hazards</span>
    <span><i class="legend-swatch swatch-climate"></i> Climate Tipping Zones</span>
    <span class="map-drag-hint">💡 Drag to rotate/pan • Scroll to zoom • Click any country or marker</span>
  `;
  parent.appendChild(legend);

  toolbar.querySelectorAll("[data-proj-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      toolbar.querySelectorAll("[data-proj-mode]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      mapProjectionMode = btn.dataset.projMode || "2d";
      const spinBtn = document.getElementById("globe-spin-btn");
      if (mapProjectionMode === "3d") {
        spinBtn?.classList.remove("hidden");
        toggleGlobeAutoSpin(true);
      } else {
        spinBtn?.classList.add("hidden");
        toggleGlobeAutoSpin(false);
      }
      drawWorldMap(activeMapLayer);
    });
  });

  document.getElementById("globe-spin-btn")?.addEventListener("click", () => {
    toggleGlobeAutoSpin(!globeAutoRotate);
  });

  document.getElementById("map-zoom-in-btn")?.addEventListener("click", () => {
    if (mapProjectionMode === "3d") {
      globeScale = Math.min(460, globeScale * 1.22);
      drawWorldMap(activeMapLayer);
    } else {
      mapZoomTransform.k = Math.min(5, mapZoomTransform.k * 1.3);
      updateMapTransform2D();
    }
  });

  document.getElementById("map-zoom-out-btn")?.addEventListener("click", () => {
    if (mapProjectionMode === "3d") {
      globeScale = Math.max(150, globeScale / 1.22);
      drawWorldMap(activeMapLayer);
    } else {
      mapZoomTransform.k = Math.max(1, mapZoomTransform.k / 1.3);
      if (mapZoomTransform.k === 1) {
        mapZoomTransform.x = 0;
        mapZoomTransform.y = 0;
      }
      updateMapTransform2D();
    }
  });

  document.getElementById("map-reset-view-btn")?.addEventListener("click", () => {
    globeRotation = [-25, -18, 0];
    globeScale = 225;
    mapZoomTransform = { k: 1, x: 0, y: 0 };
    drawWorldMap(activeMapLayer);
  });

  // Pointer drag interaction for rotating 3D Globe or panning 2D Map
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;
  let dragRafId = null;

  svg.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".map-node")) return;
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    svg.style.cursor = "grabbing";
    if (globeAutoRotate) toggleGlobeAutoSpin(false);
  });

  window.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;

    if (mapProjectionMode === "3d") {
      globeRotation[0] += dx * 0.35;
      globeRotation[1] = Math.max(-75, Math.min(75, globeRotation[1] - dy * 0.35));
    } else if (mapZoomTransform.k > 1) {
      mapZoomTransform.x += dx;
      mapZoomTransform.y += dy;
    } else {
      return;
    }

    if (!dragRafId) {
      dragRafId = requestAnimationFrame(() => {
        // Bolt: Throttled rendering of the SVG map layout during dragging
        if (mapProjectionMode === "2d") {
          updateMapTransform2D();
        } else {
          drawWorldMap(activeMapLayer);
        }
        dragRafId = null;
      });
    }
  });

  window.addEventListener("pointerup", () => {
    if (isDragging) {
      isDragging = false;
      svg.style.cursor = "grab";
    }
  });
}

function updateMapTransform2D() {
  const rootG = document.querySelector("#world-threat-map > g");
  if (rootG) {
    const width = 1000;
    const height = 500;
    const cx = width / 2;
    const cy = height / 2;
    rootG.setAttribute(
      "transform",
      `translate(${cx + mapZoomTransform.x}, ${cy + mapZoomTransform.y}) scale(${mapZoomTransform.k}) translate(${-cx}, ${-cy})`
    );
  }
}

function toggleGlobeAutoSpin(enable) {
  globeAutoRotate = enable;
  const spinBtn = document.getElementById("globe-spin-btn");
  if (spinBtn) {
    spinBtn.textContent = globeAutoRotate ? "⏸ Auto-Spin: On" : "↻ Auto-Spin: Off";
    spinBtn.classList.toggle("active", globeAutoRotate);
  }
  if (globeAnimFrame) {
    cancelAnimationFrame(globeAnimFrame);
    globeAnimFrame = null;
  }
  if (globeAutoRotate && mapProjectionMode === "3d") {
    const step = () => {
      if (!globeAutoRotate || mapProjectionMode !== "3d") return;
      globeRotation[0] = (globeRotation[0] + 0.25) % 360;
      drawWorldMap(activeMapLayer);
      globeAnimFrame = requestAnimationFrame(step);
    };
    globeAnimFrame = requestAnimationFrame(step);
  }
}

function initWorldThreatMap() {
  const svg = document.getElementById("world-threat-map");
  if (!svg) return;
  svg.style.cursor = "grab";
  injectMapModeToolbar(svg);

  document.querySelectorAll("[data-map-layer]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-map-layer]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeMapLayer = btn.dataset.mapLayer || "all";
      drawWorldMap(activeMapLayer);
    });
  });

  // Load D3 + TopoJSON + Natural Earth 110m countries, then draw
  ensureCartographyEngine()
    .then(() => {
      drawWorldMap(activeMapLayer);
    })
    .catch(() => {
      drawWorldMap(activeMapLayer);
    });

  // Fetch live USGS & NASA EONET points to overlay on the map
  fetchLiveMapOverlay();
}

async function fetchLiveMapOverlay() {
  const combinedLive = [];
  // 1. Live USGS M4.5+ Earthquakes
  try {
    const usgsUrl =
      typeof USGS_ENDPOINT !== "undefined"
        ? USGS_ENDPOINT
        : [
            "https://earthquake.usgs.gov",
            "earthquakes",
            "feed",
            "v1.0",
            "summary",
            "4.5_day.geojson"
          ].join("/");
    const res = await fetch(usgsUrl);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.features)) {
        data.features.slice(0, 14).forEach((f, idx) => {
          combinedLive.push({
            id: `usgs-${idx}`,
            name: `Live Seismic: M${Number(f.properties.mag).toFixed(1)}`,
            lat: Number(f.geometry.coordinates[1]),
            lon: Number(f.geometry.coordinates[0]),
            layer: "live",
            warheads: 0,
            firstTest: new Date(f.properties.time).toISOString().substring(0, 19) + " UTC",
            status: `Depth: ${Number(f.geometry.coordinates[2]).toFixed(1)} km`,
            desc: `Real-time USGS seismic detection at ${(f.properties.place || "").replace(
              /[&<>"']/g,
              ""
            )}. Global seismic stations verify both natural tectonic events and underground nuclear test-ban compliance.`
          });
        });
      }
    }
  } catch (e) {}

  // 2. Live NASA EONET Natural Hazards
  try {
    const nasaUrl = ["https://eonet.gsfc.nasa.gov", "api", "v3", "events"].join("/") + "?status=open&limit=10";
    const res = await fetch(nasaUrl);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.events)) {
        data.events.slice(0, 8).forEach((ev, idx) => {
          const geo = ev.geometry?.[ev.geometry.length - 1];
          if (geo && Array.isArray(geo.coordinates) && typeof geo.coordinates[0] === "number") {
            combinedLive.push({
              id: `nasa-${idx}`,
              name: `NASA Satellite Alert: ${ev.title}`,
              lat: Number(geo.coordinates[1]),
              lon: Number(geo.coordinates[0]),
              layer: "climate",
              warheads: 0,
              firstTest: (geo.date || "").substring(0, 10) || "Active Satellite Track",
              status: ev.categories?.[0]?.title || "Planetary Hazard",
              desc: `Active planetary anomaly tracked by NASA Earth Observatory (EONET v3) at ${Number(
                geo.coordinates[1]
              ).toFixed(2)}°, ${Number(geo.coordinates[0]).toFixed(2)}°.`
            });
          }
        });
      }
    }
  } catch (e) {}

  if (combinedLive.length > 0) {
    liveMapMarkers = combinedLive;
    drawWorldMap(activeMapLayer);
  }
}

function drawWorldMap(layerFilter = "all") {
  const svg = document.getElementById("world-threat-map");
  if (!svg) return;
  svg.innerHTML = "";

  const width = 1000;
  const height = 500;
  const fragment = document.createDocumentFragment();

  // Defs for ocean/globe gradients and tactical glow
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.innerHTML = `
    <radialGradient id="globeOceanGrad" cx="42%" cy="38%" r="60%">
      <stop offset="0%" stop-color="#111c33" />
      <stop offset="70%" stop-color="#080d1a" />
      <stop offset="100%" stop-color="#04070f" />
    </radialGradient>
    <radialGradient id="globeAtmosGlow" cx="50%" cy="50%" r="50%">
      <stop offset="82%" stop-color="rgba(56, 189, 248, 0)" />
      <stop offset="96%" stop-color="rgba(255, 59, 48, 0.22)" />
      <stop offset="100%" stop-color="rgba(56, 189, 248, 0)" />
    </radialGradient>
  `;
  fragment.appendChild(defs);

  const rootG = document.createElementNS("http://www.w3.org/2000/svg", "g");
  if (mapProjectionMode === "2d" && (mapZoomTransform.k !== 1 || mapZoomTransform.x !== 0 || mapZoomTransform.y !== 0)) {
    const cx = width / 2;
    const cy = height / 2;
    rootG.setAttribute(
      "transform",
      `translate(${cx + mapZoomTransform.x}, ${cy + mapZoomTransform.y}) scale(${mapZoomTransform.k}) translate(${-cx}, ${-cy})`
    );
  }
  fragment.appendChild(rootG);

  const hasD3 = Boolean(window.d3 && worldAtlasFeatures);

  if (hasD3) {
    const d3 = window.d3;
    const projection =
      mapProjectionMode === "3d"
        ? d3
            .geoOrthographic()
            .scale(globeScale)
            .translate([width / 2, height / 2])
            .rotate(globeRotation)
            .clipAngle(90)
        : (d3.geoNaturalEarth1 ? d3.geoNaturalEarth1() : d3.geoEquirectangular())
            .scale(162)
            .translate([width / 2, height / 2 + 12]);

    currentActiveProjection = projection;
    const pathGen = d3.geoPath().projection(projection);

    // 1. Ocean Sphere / Background
    if (mapProjectionMode === "3d") {
      const atmos = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      atmos.setAttribute("cx", String(width / 2));
      atmos.setAttribute("cy", String(height / 2));
      atmos.setAttribute("r", String(globeScale + 18));
      atmos.setAttribute("fill", "url(#globeAtmosGlow)");
      rootG.appendChild(atmos);

      const sphere = document.createElementNS("http://www.w3.org/2000/svg", "path");
      sphere.setAttribute("d", pathGen({ type: "Sphere" }) || "");
      sphere.setAttribute("fill", "url(#globeOceanGrad)");
      sphere.setAttribute("stroke", "rgba(56, 189, 248, 0.35)");
      sphere.setAttribute("stroke-width", "1.5");
      rootG.appendChild(sphere);
    } else {
      const sphere = document.createElementNS("http://www.w3.org/2000/svg", "path");
      sphere.setAttribute("d", pathGen({ type: "Sphere" }) || "");
      sphere.setAttribute("fill", "#070c17");
      sphere.setAttribute("stroke", "rgba(148, 163, 184, 0.2)");
      sphere.setAttribute("stroke-width", "1.2");
      rootG.appendChild(sphere);
    }

    // 2. Graticule (Latitude / Longitude Grid Lines)
    const graticule = d3.geoGraticule().step([20, 20]);
    const gratPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    gratPath.setAttribute("d", pathGen(graticule()) || "");
    gratPath.setAttribute("fill", "none");
    gratPath.setAttribute("stroke", "rgba(148, 163, 184, 0.08)");
    gratPath.setAttribute("stroke-width", "0.8");
    rootG.appendChild(gratPath);

    // 3. Real Open-Source World Countries (177 Countries from Natural Earth 110m)
    worldAtlasFeatures.forEach((feature) => {
      const dStr = pathGen(feature);
      if (!dStr) return;

      const countryId = String(feature.id || "").padStart(3, "0");
      const riskInfo = COUNTRY_RISK_INDEX[countryId];
      const countryName = feature.properties?.name || riskInfo?.name || "Sovereign Territory";

      let fillColor = "rgba(30, 41, 59, 0.72)";
      let strokeColor = "rgba(148, 163, 184, 0.28)";
      let strokeWidth = "0.75";

      if (riskInfo) {
        const showHighlight =
          layerFilter === "all" ||
          layerFilter === riskInfo.level ||
          (layerFilter === "nuclear" && riskInfo.level === "nuclear") ||
          (layerFilter === "flashpoint" && riskInfo.level === "flashpoint");

        if (showHighlight) {
          if (riskInfo.level === "nuclear") {
            fillColor = "rgba(255, 59, 48, 0.34)";
            strokeColor = "rgba(255, 85, 75, 0.85)";
            strokeWidth = "1.2";
          } else if (riskInfo.level === "flashpoint") {
            fillColor = "rgba(255, 149, 0, 0.32)";
            strokeColor = "rgba(255, 179, 64, 0.85)";
            strokeWidth = "1.2";
          } else if (riskInfo.level === "climate") {
            fillColor = "rgba(168, 85, 247, 0.28)";
            strokeColor = "rgba(192, 132, 252, 0.8)";
            strokeWidth = "1.1";
          }
        }
      }

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", dStr);
      path.setAttribute("fill", fillColor);
      path.setAttribute("stroke", strokeColor);
      path.setAttribute("stroke-width", strokeWidth);
      path.setAttribute("class", "real-country-path");

      const titleTag = document.createElementNS("http://www.w3.org/2000/svg", "title");
      titleTag.textContent = riskInfo
        ? `${countryName} — Click to inspect strategic intelligence dossier`
        : countryName;
      path.appendChild(titleTag);

      path.addEventListener("click", (e) => {
        e.stopPropagation();
        if (riskInfo) {
          const matchedNode = [...GEO_NODES, ...CLIMATE_STRESS_NODES].find(
            (n) => n.id === riskInfo.nodeId
          );
          if (matchedNode) {
            inspectMapNode(matchedNode);
            return;
          }
        }
        inspectMapNode({
          id: `country-${countryId}`,
          name: countryName,
          lat: 0,
          lon: 0,
          layer: "diplomacy",
          warheads: 0,
          firstTest: "Non-Nuclear Weapons State (NPT Signatory)",
          status: "MONITORED TERRITORY",
          desc: `${countryName} is a non-nuclear sovereign state under the Treaty on the Non-Proliferation of Nuclear Weapons (NPT) framework. Click any red, amber, or cyan marker to inspect active nuclear arsenals, 2026 flashpoints, or live seismic anomalies.`
        });
      });

      rootG.appendChild(path);
    });

    // 4. Great-Circle Geodesic Trajectory Arc (ICBM / Strategic Watch Corridor)
    if (activeMissileArc && (layerFilter === "all" || layerFilter === "nuclear")) {
      const arcFeature = {
        type: "LineString",
        coordinates: [activeMissileArc.from, activeMissileArc.to]
      };
      const arcD = pathGen(arcFeature);
      if (arcD) {
        const arcPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        arcPath.setAttribute("d", arcD);
        arcPath.setAttribute("fill", "none");
        arcPath.setAttribute("stroke", "#ff3b30");
        arcPath.setAttribute("stroke-width", "2.2");
        arcPath.setAttribute("stroke-dasharray", "6 5");
        arcPath.setAttribute("opacity", "0.85");
        rootG.appendChild(arcPath);
      }
    }
  }

  // 5. Plot Strategic Intelligence Markers (Nuclear States, 2026 Flashpoints, Climate Zones, Live USGS/NASA)
  const allNodes = [...GEO_NODES, ...CLIMATE_STRESS_NODES, ...liveMapMarkers].filter((n) =>
    layerFilter === "all" ? true : n.layer === layerFilter
  );

  allNodes.forEach((node) => {
    let x = 0;
    let y = 0;

    if (hasD3 && currentActiveProjection) {
      // Check hemisphere visibility when in 3D Orthographic Globe mode
      if (mapProjectionMode === "3d") {
        const centerLon = -globeRotation[0];
        const centerLat = -globeRotation[1];
        const distRad = window.d3.geoDistance([node.lon, node.lat], [centerLon, centerLat]);
        if (distRad > Math.PI / 2 - 0.04) return; // Hidden on back side of the 3D Globe
      }
      const projected = currentActiveProjection([node.lon, node.lat]);
      if (!projected) return;
      x = projected[0];
      y = projected[1];
    } else {
      x = ((node.lon + 180) / 360) * width;
      y = ((90 - node.lat) / 180) * height;
    }

    const color =
      node.layer === "nuclear"
        ? "#ff3b30"
        : node.layer === "flashpoint"
        ? "#ff9500"
        : node.layer === "climate"
        ? "#a855f7"
        : "#38bdf8";

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "map-node");

    const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    halo.setAttribute("cx", x.toFixed(1));
    halo.setAttribute("cy", y.toFixed(1));
    halo.setAttribute("r", node.layer === "nuclear" ? "13" : "10");
    halo.setAttribute("fill", color);
    halo.setAttribute("fill-opacity", "0.26");
    g.appendChild(halo);

    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", x.toFixed(1));
    dot.setAttribute("cy", y.toFixed(1));
    dot.setAttribute("r", node.layer === "nuclear" ? "5.5" : "4.5");
    dot.setAttribute("fill", color);
    dot.setAttribute("stroke", "#ffffff");
    dot.setAttribute("stroke-width", "1.5");
    g.appendChild(dot);

    if (node.layer === "nuclear" || node.layer === "flashpoint") {
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", (x + 8).toFixed(1));
      label.setAttribute("y", (y + 3.5).toFixed(1));
      label.setAttribute("fill", "#f8fafc");
      label.setAttribute("font-size", "9.5");
      label.setAttribute("font-weight", "600");
      label.setAttribute("font-family", "JetBrains Mono, monospace");
      label.style.textShadow = "0 1px 4px #000000";
      label.textContent = node.name.split(" ")[0];
      g.appendChild(label);
    }

    g.addEventListener("click", (e) => {
      e.stopPropagation();
      inspectMapNode(node);
    });
    rootG.appendChild(g);
  });

  svg.appendChild(fragment);
}

function inspectMapNode(node) {
  // 1. Update index.html & intelligence.html Inspector Card (#map-insp-*)
  const typeEl = document.getElementById("map-insp-type");
  const titleEl = document.getElementById("map-insp-title");
  const statEl = document.getElementById("map-insp-stat");
  const descEl = document.getElementById("map-insp-desc");
  const metaEl = document.getElementById("map-insp-meta");

  const badgeText =
    node.layer === "nuclear"
      ? "☢️ NUCLEAR-ARMED STATE DOSSIER"
      : node.layer === "flashpoint"
      ? "⚡ 2026 BULLETIN FLASHPOINT"
      : node.layer === "climate"
      ? "🌡️ PLANETARY CLIMATE HAZARD"
      : "🛰️ LIVE TELEMETRY NODE";

  if (typeEl) typeEl.textContent = badgeText;
  if (titleEl) titleEl.textContent = node.name;
  if (statEl) {
    statEl.textContent =
      node.warheads > 0 ? `~${node.warheads.toLocaleString()} Estimated Warheads` : node.status;
  }
  if (descEl) descEl.textContent = node.desc;
  if (metaEl) {
    metaEl.innerHTML = `
      <div><strong>Coordinates:</strong> <span class="mono">${Number(node.lat).toFixed(2)}°, ${Number(node.lon).toFixed(2)}°</span></div>
      <div><strong>Key Milestone:</strong> <span class="mono">${node.firstTest}</span></div>
      <div><strong>Treaty / Watch Status:</strong> <span class="mono">${node.status}</span></div>
    `;
  }

  // 2. Update map.html Detail Drawer (#node-drawer-*)
  const drawerTitle = document.getElementById("node-drawer-title");
  const drawerStatus = document.getElementById("node-drawer-status");
  const drawerDesc = document.getElementById("node-drawer-desc");
  const drawerWarheads = document.getElementById("node-drawer-warheads");
  const drawerTest = document.getElementById("node-drawer-test");

  if (drawerTitle) drawerTitle.textContent = node.name;
  if (drawerStatus) {
    drawerStatus.textContent = node.status || badgeText;
    drawerStatus.className =
      "status-pill " +
      (node.layer === "nuclear"
        ? "status-critical"
        : node.layer === "flashpoint"
        ? "status-high"
        : "status-elevated");
  }
  if (drawerDesc) drawerDesc.textContent = node.desc;
  if (drawerWarheads) {
    drawerWarheads.textContent =
      node.warheads > 0 ? `~${node.warheads.toLocaleString()} Warheads` : "Non-Nuclear / Hazard Node";
  }
  if (drawerTest) drawerTest.textContent = node.firstTest || "Active Monitor";
}

// ============================================================================
// MODULE 3: CITY IMPACT VISUALIZER (1983 TTAPS NUCLEAR WINTER + OPEN-METEO)
// ============================================================================
function initCityVisualizer() {
  const citySelect = document.getElementById("city-select");
  const modeSelect = document.getElementById("scenario-mode-select");
  if (!citySelect || !modeSelect) return;

  citySelect.innerHTML = CITIES_DATA.map(
    (c, idx) => `<option value="${idx}">${c.name} (${c.zone})</option>`
  ).join("");

  const updateCityImpact = async () => {
    const city = CITIES_DATA[Number(citySelect.value) || 0];
    const mode = modeSelect.value;
    let currentTemp = city.baseTempC;
    let sourceLabel = "Climatological Baseline";

    // Try live Open-Meteo current weather API (CORS-enabled, keyless)
    try {
      const params = new URLSearchParams({
        latitude: String(city.lat),
        longitude: String(city.lon),
        current_weather: "true"
      });
      const endpoint = ["https://api.open-meteo.com", "v1", "forecast"].join("/") + "?" + params.toString();
      const res = await fetch(endpoint);
      if (res.ok) {
        const data = await res.json();
        if (typeof data?.current_weather?.temperature === "number") {
          currentTemp = data.current_weather.temperature;
          sourceLabel = "Open-Meteo Live Telemetry";
        }
      }
    } catch (e) {
      // Fallback to baseline
    }

    let deltaTemp = -20;
    let sunlightDrop = "−85% Solar Flux";
    let agImpact = "Complete halt to photosynthesis & killing frosts (Encyclopaedia Britannica)";

    if (mode === "ttaps-severe") {
      deltaTemp = -20.0;
      sunlightDrop = "−88% Sunlight (Stratospheric Black Carbon)";
      agImpact = "Subfreezing drop (−11°C to −22°C TTAPS range) halts crop photosynthesis for weeks.";
    } else if (mode === "ttaps-moderate") {
      deltaTemp = -11.0;
      sunlightDrop = "−55% Sunlight (Upper-Tropospheric Soot)";
      agImpact = "Shortened growing season and severe monsoon disruption across mid-latitudes.";
    } else if (mode === "warming-2c") {
      deltaTemp = +2.4;
      sunlightDrop = "+3.1 W/m² Radiative Forcing";
      agImpact = "Exceeds Paris Agreement 1.5°C–2°C threshold; severe heat stress and crop yield loss.";
    } else {
      deltaTemp = +4.2;
      sunlightDrop = "Extreme Wet-Bulb Heatwave";
      agImpact = "Multi-week lethal heat index and acute grid/water infrastructure strain.";
    }

    const projectedTemp = (currentTemp + deltaTemp).toFixed(1);
    const box = document.getElementById("city-impact-readout");
    if (box) {
      box.innerHTML = `
        <div class="impact-metrics-row">
          <div class="digital-box">
            <span class="digital-label">CURRENT BASELINE (${sourceLabel.toUpperCase()})</span>
            <span class="digital-val mono">${currentTemp.toFixed(1)} °C</span>
          </div>
          <div class="digital-box">
            <span class="digital-label">PROJECTED SCENARIO TEMP</span>
            <span class="digital-val mono ${deltaTemp < 0 ? "accent-text" : "delta-forward"}">${projectedTemp} °C (${deltaTemp > 0 ? "+" : ""}${deltaTemp}°C)</span>
          </div>
          <div class="digital-box">
            <span class="digital-label">SOLAR / RADIATIVE SHIFT</span>
            <span class="digital-val mono" style="font-size: 0.82rem;">${sunlightDrop}</span>
          </div>
        </div>
        <p style="font-size: 0.84rem; color: #cbd5e1;">
          <strong>Biosphere &amp; Food Security Impact for ${city.name}:</strong> ${agImpact}
          (<a href="${SOURCES.BRITANNICA}" target="_blank" rel="noopener noreferrer">Verified TTAPS / Climate Reference ↗</a>)
        </p>
      `;
    }
  };

  citySelect.addEventListener("change", updateCityImpact);
  modeSelect.addEventListener("change", updateCityImpact);
  updateCityImpact();
}

// ============================================================================
// MODULE 4: "WHEN WERE YOU BORN?" PERSONAL DOOMSDAY TIME MACHINE
// ============================================================================
let lastBirthReport = null;

function initBirthYearMachine() {
  const form = document.getElementById("birth-year-form");
  const input = document.getElementById("birth-year-input");
  const dlBtn = document.getElementById("download-birth-card-btn");

  const computeBirthTimeline = (birthYear) => {
    const latestYear = TIMELINE_DATA[TIMELINE_DATA.length - 1].year;
    const clampedYear = Math.max(1947, Math.min(latestYear, Number(birthYear) || 1998));
    if (input) input.value = String(clampedYear);

    // Find setting active at birthYear
    let activeAtBirth = TIMELINE_DATA[0];
    for (const item of TIMELINE_DATA) {
      if (item.year <= clampedYear) {
        activeAtBirth = item;
      } else {
        break;
      }
    }

    const changesDuringLife = TIMELINE_DATA.filter((item) => item.year > clampedYear);
    const lifeSettings = [activeAtBirth, ...changesDuringLife];
    const safestInLife = [...lifeSettings].sort((a, b) => b.seconds - a.seconds)[0];
    const closestInLife = [...lifeSettings].sort((a, b) => a.seconds - b.seconds)[0];
    const latest = TIMELINE_DATA[TIMELINE_DATA.length - 1];

    lastBirthReport = {
      birthYear: clampedYear,
      birthSetting: `${activeAtBirth.displayVal} ${activeAtBirth.displayUnit}`,
      birthReason: activeAtBirth.title,
      movesCount: changesDuringLife.length,
      safestLabel: `${safestInLife.shortLabel} (${safestInLife.year})`,
      closestLabel: `${closestInLife.shortLabel} (${closestInLife.year})`,
      currentLabel: `${latest.shortLabel} (${latest.year})`
    };

    const box = document.getElementById("birth-year-result");
    if (box) {
      box.innerHTML = `
        <div class="impact-metrics-row">
          <div class="digital-box">
            <span class="digital-label">IN YOUR BIRTH YEAR (${clampedYear})</span>
            <span class="digital-val mono" style="color: #fbbf24;">${activeAtBirth.shortLabel.toUpperCase()}</span>
          </div>
          <div class="digital-box">
            <span class="digital-label">MOVES IN YOUR LIFETIME</span>
            <span class="digital-val mono">${changesDuringLife.length} ADJUSTMENTS</span>
          </div>
          <div class="digital-box">
            <span class="digital-label">SAFEST vs. CLOSEST IN LIFE</span>
            <span class="digital-val mono" style="font-size: 0.82rem;">${safestInLife.shortLabel} (${safestInLife.year}) / ${closestInLife.shortLabel} (${closestInLife.year})</span>
          </div>
        </div>
        <p style="font-size: 0.84rem; color: #cbd5e1;">
          When you were born in <strong>${clampedYear}</strong>, the Clock stood at <strong>${activeAtBirth.shortLabel} to midnight</strong> (set in ${activeAtBirth.year}: <em>${activeAtBirth.title}</em>). Today it stands at <strong>${latest.shortLabel}</strong>—a net shift of <strong>${Math.abs(activeAtBirth.seconds - latest.seconds)} seconds</strong> closer to midnight.
        </p>
      `;
    }
  };

  if (form && input) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      computeBirthTimeline(Number(input.value));
    });
  }
  if (dlBtn) {
    dlBtn.addEventListener("click", () => {
      if (!lastBirthReport) computeBirthTimeline(1998);
      exportCanvasCard("birth");
    });
  }

  computeBirthTimeline(1998);
}

// ============================================================================
// MODULE 5: NUCLEAR ARSENAL & TREATY TRACKER MATRIX
// ============================================================================
function renderArsenalAndTreaties() {
  const arsenalEl = document.getElementById("arsenal-bars-list");
  const treatyEl = document.getElementById("treaty-table-wrap");

  if (arsenalEl) {
    const nuclearStates = GEO_NODES.filter((n) => n.layer === "nuclear").sort(
      (a, b) => b.warheads - a.warheads
    );
    const maxW = 5600;
    arsenalEl.innerHTML = nuclearStates
      .map((s) => {
        const pct = Math.max(3, (s.warheads / maxW) * 100);
        return `
          <div class="arsenal-row">
            <div class="arsenal-row-top">
              <strong>${s.name}</strong>
              <span class="mono">~${s.warheads.toLocaleString()} warheads (${s.firstTest})</span>
            </div>
            <div class="arsenal-bar-bg">
              <div class="arsenal-bar-fill" style="width: ${pct.toFixed(1)}%"></div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  if (treatyEl) {
    treatyEl.innerHTML = `
      <table class="treaty-table">
        <thead>
          <tr>
            <th>YEAR</th>
            <th>TREATY / ACCORD</th>
            <th>CLOCK IMPACT</th>
            <th>2026 STATUS</th>
          </tr>
        </thead>
        <tbody>
          ${TREATIES_DATA.map(
            (t) => `
            <tr>
              <td class="mono">${t.year}</td>
              <td><strong>${t.name}</strong><div style="font-size:0.72rem;color:#94a3b8;">${t.notes}</div></td>
              <td class="mono" style="color:#34d399;">${t.clockEffect}</td>
              <td><span class="status-pill ${t.statusClass}">${t.status}</span></td>
            </tr>
          `
          ).join("")}
        </tbody>
      </table>
    `;
  }
}

// ============================================================================
// MODULE 6: NEXT-ANNOUNCEMENT LIVE COUNTDOWN & COMMUNITY PREDICTION POLL
// ============================================================================
function initCountdownAndPoll() {
  const cdEl = document.getElementById("next-announcement-countdown");
  // Next expected annual Bulletin announcement: Last Tuesday of January 2027 (Jan 26, 2027 15:00 UTC)
  const targetDate = new Date("2027-01-26T15:00:00Z").getTime();

  const updateCd = () => {
    if (!cdEl) return;
    const now = Date.now();
    const diff = Math.max(0, targetDate - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    cdEl.innerHTML = `
      <div class="cd-unit"><span class="cd-num">${days}</span><span class="cd-label">DAYS</span></div>
      <div class="cd-unit"><span class="cd-num">${String(hours).padStart(2, "0")}</span><span class="cd-label">HOURS</span></div>
      <div class="cd-unit"><span class="cd-num">${String(mins).padStart(2, "0")}</span><span class="cd-label">MINUTES</span></div>
      <div class="cd-unit"><span class="cd-num">${String(secs).padStart(2, "0")}</span><span class="cd-label">SECONDS</span></div>
    `;
  };
  updateCd();
  setInterval(updateCd, 1000);

  // Community Poll with localStorage persistence
  const pollWrap = document.getElementById("poll-options-wrap");
  if (!pollWrap) return;

  const defaultVotes = { closer: 612, unchanged: 284, safer: 194 };
  let savedVotes = defaultVotes;
  let userVote = null;
  try {
    const raw = localStorage.getItem("dd_clock_poll_votes");
    if (raw) savedVotes = JSON.parse(raw);
    userVote = localStorage.getItem("dd_clock_user_vote");
  } catch (e) {}

  const renderPoll = () => {
    const total = savedVotes.closer + savedVotes.unchanged + savedVotes.safer;
    const options = [
      { key: "closer", label: "⚠️ Move Closer to Midnight (80–84 Seconds)", count: savedVotes.closer },
      { key: "unchanged", label: "⏸ Remain Unchanged at 85 Seconds", count: savedVotes.unchanged },
      { key: "safer", label: "🕊️ Move Back Toward Safety (90+ Seconds)", count: savedVotes.safer }
    ];

    pollWrap.innerHTML = options
      .map((opt) => {
        const pct = Math.round((opt.count / total) * 100);
        return `
          <button type="button" class="poll-btn ${userVote === opt.key ? "voted" : ""}" data-vote="${opt.key}">
            <div class="poll-bar" style="width: ${pct}%"></div>
            <div class="poll-btn-content">
              <span>${opt.label}</span>
              <span class="mono">${pct}% (${opt.count.toLocaleString()} votes)</span>
            </div>
          </button>
        `;
      })
      .join("");

    pollWrap.querySelectorAll(".poll-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const choice = btn.dataset.vote;
        if (!choice) return;
        if (userVote && savedVotes[userVote] > 0) {
          savedVotes[userVote]--;
        }
        userVote = choice;
        savedVotes[choice]++;
        try {
          localStorage.setItem("dd_clock_poll_votes", JSON.stringify(savedVotes));
          localStorage.setItem("dd_clock_user_vote", userVote);
        } catch (e) {}
        renderPoll();
      });
    });
  };

  renderPoll();
}

// ============================================================================
// MODULE 7: HIGH-RES PNG CARD EXPORTER (<CANVAS>) & EMBED WIDGET GENERATOR
// ============================================================================
function initShareAndEmbedTools() {
  const embedBox = document.getElementById("embed-code-box");
  const copyBtn = document.getElementById("copy-embed-btn");
  const dlClockBtn = document.getElementById("download-clock-png-btn");

  const pageUrl = window.location.href.split("#")[0];
  if (embedBox) {
    embedBox.value = `<iframe src="${pageUrl}" width="100%" height="680" style="border:1px solid #232838;border-radius:16px;" title="Live Doomsday Clock Observatory"></iframe>`;
  }

  if (copyBtn && embedBox) {
    copyBtn.addEventListener("click", () => {
      embedBox.select();
      navigator.clipboard?.writeText(embedBox.value);
      copyBtn.textContent = "✓ Embed Code Copied!";
      setTimeout(() => {
        copyBtn.textContent = "📋 Copy Live Embed Code";
      }, 2200);
    });
  }

  if (dlClockBtn) {
    dlClockBtn.addEventListener("click", () => exportCanvasCard("status"));
  }
}

function exportCanvasCard(mode = "status") {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 1200, 630);
  grad.addColorStop(0, "#07090e");
  grad.addColorStop(1, "#151928");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 630);

  // Subtle red danger glow
  const rad = ctx.createRadialGradient(260, 315, 20, 260, 315, 260);
  rad.addColorStop(0, "rgba(255, 59, 48, 0.28)");
  rad.addColorStop(1, "rgba(255, 59, 48, 0)");
  ctx.fillStyle = rad;
  ctx.fillRect(0, 0, 1200, 630);

  const entry = TIMELINE_DATA[currentYearIndex];

  // Draw Clock Dial on Left (center 260, 315, radius 190)
  ctx.strokeStyle = "#2d3548";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(260, 315, 190, 0, Math.PI * 2);
  ctx.stroke();

  const angleRad = ((-entry.seconds / 60) * 6 - 90) * (Math.PI / 180);
  ctx.strokeStyle = "#ff3b30";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(260, 315);
  ctx.lineTo(260 + 155 * Math.cos(angleRad), 315 + 155 * Math.sin(angleRad));
  ctx.stroke();

  ctx.fillStyle = "#ff3b30";
  ctx.font = "bold 20px monospace";
  ctx.fillText("DOOMSDAY CLOCK LIVE OBSERVATORY", 510, 110);

  if (mode === "birth" && lastBirthReport) {
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 46px sans-serif";
    ctx.fillText(`Born in ${lastBirthReport.birthYear}: ${lastBirthReport.birthSetting}`, 510, 185);

    ctx.fillStyle = "#ff9500";
    ctx.font = "bold 34px monospace";
    const latestReading = TIMELINE_DATA[TIMELINE_DATA.length - 1];
    ctx.fillText(`${latestReading.year} Official Reading: ${latestReading.displayVal} ${latestReading.displayUnit}`, 510, 250);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "24px sans-serif";
    ctx.fillText(`• Adjustments in my lifetime: ${lastBirthReport.movesCount} moves`, 510, 330);
    ctx.fillText(`• Safest point in my life: ${lastBirthReport.safestLabel}`, 510, 380);
    ctx.fillText(`• Closest point in my life: ${lastBirthReport.closestLabel}`, 510, 430);
  } else {
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 68px sans-serif";
    ctx.fillText(`${entry.displayVal} ${entry.displayUnit}`, 510, 200);

    ctx.fillStyle = "#ff9500";
    ctx.font = "bold 30px monospace";
    ctx.fillText(`YEAR: ${entry.year} • 24H CLOCK: ${entry.time24} • ${entry.deltaLabel}`, 510, 260);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "24px sans-serif";
    const words = entry.reason.split(" ");
    let line = "";
    let y = 335;
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      if (ctx.measureText(testLine).width > 630 && i > 0) {
        ctx.fillText(line, 510, y);
        line = words[i] + " ";
        y += 36;
        if (y > 490) break;
      } else {
        line = testLine;
      }
    }
    if (y <= 490) ctx.fillText(line, 510, y);
  }

  ctx.fillStyle = "#64748b";
  ctx.font = "18px monospace";
  ctx.fillText("Data: Bulletin of the Atomic Scientists • Wikipedia • NASA EONET • USGS", 510, 565);

  const link = document.createElement("a");
  link.download =
    mode === "birth"
      ? `doomsday-clock-birth-${lastBirthReport?.birthYear || 1998}.png`
      : `doomsday-clock-${entry.year}-${entry.shortLabel.replace(/\s+/g, "")}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// ============================================================================
// MODULE 8: "TAKE ACTION" CIVIC & SCIENTIFIC SOLUTIONS DIRECTORY
// ============================================================================
function renderTakeActionDirectory() {
  const grid = document.getElementById("take-action-grid");
  if (!grid) return;

  grid.innerHTML = TAKE_ACTION_ITEMS.map(
    (item) => `
    <div class="threat-mini-card" style="cursor: default;">
      <div>
        <div class="threat-mini-top">
          <span class="threat-icon">${item.icon}</span>
          <span class="threat-severity elevated">${item.pillar}</span>
        </div>
        <h3 style="margin-bottom: 0.45rem;">${item.title}</h3>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.9rem;">${item.desc}</p>
      </div>
      <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="source-chip" style="text-align:center;">${item.linkLabel}</a>
    </div>
  `
  ).join("");
}

// ============================================================================
// MODULE 9: SITUATION DISPATCH EXPORTER
// ============================================================================
function initSituationDispatchTool() {
  const btn = document.getElementById("copy-dispatch-btn");
  const output = document.getElementById("dispatch-output");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const now = new Date();
    const utcStr = now.toUTCString();
    const reading = "85 SECONDS TO MIDNIGHT (23:58:35 UTC)";
    const tension = document.getElementById("tension-score-val")?.textContent || "88/100 (EXTREME)";
    const hazardCount = document.getElementById("nasa-feed-list")?.children.length || 0;
    const quakeCount = document.getElementById("usgs-feed-list")?.children.length || 0;

    const dispatch = [
      `# DOOMSDAY CLOCK STRATEGIC SITUATION DISPATCH`,
      `**TIMESTAMP**: ${utcStr}`,
      `**OFFICIAL SETTING**: ${reading}`,
      `**GLOBAL TENSION INDEX**: ${tension}`,
      `**ACTIVE SATELLITE HAZARDS (NASA EONET)**: ${hazardCount} Events Tracked`,
      `**SEISMIC ANOMALIES (USGS M4.5+)**: ${quakeCount} Recorded (24h)`,
      ``,
      `### STRATEGIC EXECUTIVE BRIEFING`,
      `• **Nuclear Pillar**: Strategic parity operates without bilateral limits post-New START expiration. Bilateral tactical alerts remain elevated.`,
      `• **Climate Pillar**: 2024–2026 marks consecutive annual breaches of the +1.5°C pre-industrial threshold.`,
      `• **Disruptive Tech**: Autonomous weapon testing and deepfake synthesis inject acute early-warning compression risks.`,
      `• **Biosecurity**: Global biological synthesis and laboratory pathogen handling oversight gaps persist.`,
      ``,
      `*Source: Bulletin of the Atomic Scientists • Doomsday Clock Live Observatory (doomsdayclock.live)*`
    ].join("\n");

    if (output) {
      output.textContent = dispatch;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(dispatch).then(() => {
        const origText = btn.innerHTML;
        btn.innerHTML = "✓ Dispatch Copied to Clipboard!";
        btn.style.background = "#22c55e";
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.style.background = "";
        }, 2500);
      }).catch(() => {
        const origText = btn.innerHTML;
        btn.innerHTML = "⚠ Please copy from preview below";
        btn.style.background = "#ff9500";
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.style.background = "";
        }, 2500);
      });
    }
  });
}

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

function computeGreatCircleDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Export for Node.js testing environment (without breaking browser usage)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    projectLatLon,
    toRad,
    computeGreatCircleDistance
  };
}

// ============================================================================
// MODULE 10: STRATEGIC BALLISTIC MISSILE FLIGHT WINDOW CALCULATOR
// ============================================================================
function initBallisticCalculator() {
  const originSelect = document.getElementById("missile-origin-select");
  const targetSelect = document.getElementById("missile-target-select");
  const typeSelect = document.getElementById("missile-type-select");
  const distEl = document.getElementById("missile-dist-val");
  const timeEl = document.getElementById("missile-time-val");
  const alertEl = document.getElementById("missile-alert-val");
  const gmdEl = document.getElementById("missile-gmd-val");

  if (!originSelect || !targetSelect || !typeSelect) return;

  const origins = {
    "usa-minot": { lat: 48.42, lon: -101.35, name: "Minot AFB (USA)" },
    "rus-kozelsk": { lat: 54.04, lon: 35.79, name: "Kozelsk Base (Russia)" },
    "chn-yibin": { lat: 28.76, lon: 104.64, name: "Rocket Force Base (China)" },
    "uk-faslane": { lat: 56.07, lon: -4.82, name: "HMNB Clyde Faslane (UK)" },
    "fra-ilelongue": { lat: 48.31, lon: -4.51, name: "Île Longue Brest (France)" },
    "dprk-ryongsong": { lat: 39.12, lon: 125.79, name: "Pyongyang Command (DPRK)" }
  };

  const targets = {
    "moscow": { lat: 55.75, lon: 37.62, name: "Moscow" },
    "dc": { lat: 38.90, lon: -77.04, name: "Washington, D.C." },
    "beijing": { lat: 39.90, lon: 116.40, name: "Beijing" },
    "london": { lat: 51.51, lon: -0.13, name: "London" },
    "paris": { lat: 48.86, lon: 2.35, name: "Paris" },
    "tokyo": { lat: 35.68, lon: 139.69, name: "Tokyo" }
  };

  function updateFlightCalculations() {
    const orig = origins[originSelect.value] || origins["usa-minot"];
    const targ = targets[targetSelect.value] || targets["moscow"];
    const type = typeSelect.value || "icbm";

    const distKm = Math.round(computeGreatCircleDistance(orig.lat, orig.lon, targ.lat, targ.lon));

    if (type === "icbm") {
      const seconds = (distKm / 6.5) + 180;
      const m = Math.floor(seconds / 60);
      const s = Math.round(seconds % 60);
      if (distEl) distEl.textContent = `${distKm.toLocaleString()} km`;
      if (timeEl) timeEl.textContent = `${m}m ${s < 10 ? "0" : ""}${s}s`;
      if (alertEl) alertEl.textContent = `~${Math.max(4, Math.round(m * 0.4))} to ${Math.round(m * 0.55)} min decision window`;
      if (gmdEl) gmdEl.textContent = distKm > 6000 ? "Limited GMD (15–30% Intercept)" : "Regional ABM / SM-3 Capable";
    } else if (type === "slbm") {
      const seconds = (distKm / 7.2) + 120;
      const m = Math.floor(seconds / 60);
      const s = Math.round(seconds % 60);
      if (distEl) distEl.textContent = `${distKm.toLocaleString()} km`;
      if (timeEl) timeEl.textContent = `${m}m ${s < 10 ? "0" : ""}${s}s`;
      if (alertEl) alertEl.textContent = `CRITICAL: ~${Math.max(2, Math.round(m * 0.35))} min decision window`;
      if (gmdEl) gmdEl.textContent = "Severely Compressed / Terminal Only";
    } else {
      const speedKmPerSec = 3.8;
      const seconds = (distKm / speedKmPerSec) + 150;
      const m = Math.floor(seconds / 60);
      const s = Math.round(seconds % 60);
      if (distEl) distEl.textContent = `${distKm.toLocaleString()} km`;
      if (timeEl) timeEl.textContent = `${m}m ${s < 10 ? "0" : ""}${s}s`;
      if (alertEl) alertEl.textContent = `~${Math.max(3, Math.round(m * 0.25))} min (Delayed Radar Horizon)`;
      if (gmdEl) gmdEl.textContent = "Near-Zero (Maneuvering Re-entry)";
    }
  }

  originSelect.addEventListener("change", updateFlightCalculations);
  targetSelect.addEventListener("change", updateFlightCalculations);
  typeSelect.addEventListener("change", updateFlightCalculations);
  updateFlightCalculations();
}

// ============================================================================
// MODULE 11: CUSTOM POLICY SCENARIO BUILDER & PRESETS
// ============================================================================
function initCustomScenarioBuilder() {
  const form = document.getElementById("custom-scenario-form");
  const nameInput = document.getElementById("custom-scenario-name");
  const deltaInput = document.getElementById("custom-scenario-delta");
  const deltaReadout = document.getElementById("custom-delta-readout");
  const listEl = document.getElementById("custom-scenario-list");

  if (deltaInput && deltaReadout) {
    deltaInput.addEventListener("input", () => {
      const val = Number(deltaInput.value);
      if (val > 0) {
        deltaReadout.textContent = `+${val}s Safer`;
        deltaReadout.style.color = "#34d399";
      } else if (val < 0) {
        deltaReadout.textContent = `${val}s Closer`;
        deltaReadout.style.color = "#ff3b30";
      } else {
        deltaReadout.textContent = `0s Neutral`;
        deltaReadout.style.color = "#94a3b8";
      }
    });
  }

  // Handle Preset Chips in simulator.html
  document.getElementById("preset-all-peace")?.addEventListener("click", () => {
    document.querySelectorAll("#sim-peace-list .sim-checkbox").forEach((cb) => (cb.checked = true));
    document.querySelectorAll("#sim-danger-list .sim-checkbox").forEach((cb) => (cb.checked = false));
    if (typeof updateSimulatorCalculation === "function") updateSimulatorCalculation();
  });

  document.getElementById("preset-cuban-crisis")?.addEventListener("click", () => {
    document.querySelectorAll("#sim-peace-list .sim-checkbox").forEach((cb) => (cb.checked = false));
    document.querySelectorAll("#sim-danger-list .sim-checkbox").forEach((cb, idx) => {
      cb.checked = idx === 0 || idx === 2 || idx === 3;
    });
    if (typeof updateSimulatorCalculation === "function") updateSimulatorCalculation();
  });

  document.getElementById("preset-nuclear-winter")?.addEventListener("click", () => {
    document.querySelectorAll("#sim-peace-list .sim-checkbox").forEach((cb) => (cb.checked = false));
    document.querySelectorAll("#sim-danger-list .sim-checkbox").forEach((cb) => (cb.checked = true));
    if (typeof updateSimulatorCalculation === "function") updateSimulatorCalculation();
  });

  document.getElementById("preset-reset-baseline")?.addEventListener("click", () => {
    document.querySelectorAll(".sim-checkbox").forEach((cb) => (cb.checked = false));
    if (typeof updateSimulatorCalculation === "function") updateSimulatorCalculation();
  });

  if (form && nameInput && deltaInput) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Security: Escape HTML entities from user input to prevent DOM XSS in scenario cards
      const title = nameInput.value.trim().replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
      const deltaVal = Number(deltaInput.value);
      if (!title) return;

      const badgeColor = deltaVal >= 0 ? "#34d399" : "#ff3b30";
      const sign = deltaVal >= 0 ? `+${deltaVal}s` : `${deltaVal}s`;

      const chip = document.createElement("div");
      chip.className = "preset-chip";
      chip.style.borderColor = badgeColor;

      const strongEl = document.createElement("strong");
      strongEl.textContent = title;

      const textNode = document.createTextNode(` (${sign}) `);

      const closeSpan = document.createElement("span");
      closeSpan.style.marginLeft = "6px";
      closeSpan.style.cursor = "pointer";
      closeSpan.title = "Remove";
      closeSpan.textContent = "✕";

      chip.appendChild(strongEl);
      chip.appendChild(textNode);
      chip.appendChild(closeSpan);

      closeSpan.addEventListener("click", () => {
        chip.remove();
        if (typeof updateSimulatorCalculation === "function") updateSimulatorCalculation();
      });

      chip.dataset.customDelta = String(deltaVal);
      if (listEl) listEl.appendChild(chip);

      nameInput.value = "";
      deltaInput.value = "15";
      if (deltaReadout) {
        deltaReadout.textContent = "+15s Safer";
        deltaReadout.style.color = "#34d399";
      }

      if (typeof updateSimulatorCalculation === "function") updateSimulatorCalculation();
    });
  }
}

// ============================================================================
// MODULE 12: TIMELINE REAL-TIME ARCHIVE SEARCH
// ============================================================================
function initTimelineArchiveSearch() {
  const searchInput = document.getElementById("timeline-search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    const activeFilterBtn = document.querySelector(".tl-filter-btn.active");
    const activeFilter = activeFilterBtn ? activeFilterBtn.dataset.tlFilter : "all";

    if (typeof renderTimelineCards === "function") {
      renderTimelineCards(activeFilter, query);
    }
  });
}
