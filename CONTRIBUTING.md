# Contributing & Extension Guide (`CONTRIBUTING.md`)

Welcome to the **Doomsday Clock Live Observatory** engineering guide. This document walks you through the exact steps to extend historical data, add new policy simulator levers, or create new observatory pages without breaking existing modules.

## 1. How to Add a New Official Doomsday Clock Setting Manual Override

While `syncOfficialClockReading()` in `app.js` automatically detects new annual settings from the live Wikipedia MediaWiki API, you should also commit the permanent historical record to `TIMELINE_DATA` in `app.js` after each January announcement:

1. Open `app.js` and locate `const TIMELINE_DATA = [...]`.
2. Append a new object at the end of the array following this exact schema:
   ```javascript
   {
     year: 2027,
     dateLabel: "JAN 2027",
     seconds: 85, // Total seconds to midnight (e.g., 85s = 85, 2m = 120)
     displayVal: "85",
     displayUnit: "SECONDS TO MIDNIGHT",
     shortLabel: "85 sec",
     time24: "23:58:35",
     deltaLabel: "UNCHANGED", // Or "−X SECONDS (CLOSER)" / "+X SECONDS (SAFER)"
     direction: "closer", // "closer" | "away" | "initial"
     title: "2027: Headline Summary of the Setting",
     reason: "Concise factual explanation citing the official Science and Security Board statement.",
     quote: "Direct verbatim quote from the Bulletin announcement.",
     quoteAuthor: "Speaker Name, Title, Bulletin of the Atomic Scientists",
     source: SOURCES.WIKI
   }
   ```
3. Update the `max` attribute of `#year-scrubber` in `index.html` and `timeline.html` to `TIMELINE_DATA.length - 1`.

## 2. How to Add a New Scenario to the Policy & Crisis Simulator

1. Open `features.js` or `app.js` and locate `const SIMULATOR_SCENARIOS = [...]`.
2. Add a new scenario object:
   - Set `type: "peace"` with a positive `deltaSeconds` (e.g. `+35`) for diplomatic/mitigation actions that turn back the Clock.
   - Set `type: "danger"` with a negative `deltaSeconds` (e.g. `-20`) for crisis escalations that push the Clock closer to midnight.
3. The simulator UI (`initSimulator()`) and blue ghost-hand projection (`updateSimulatorCalculation()`) will automatically render and include the new checkbox.

## 3. How to Add a New City to the Nuclear Winter & Climate Visualizer

1. Open `features.js` and locate `const CITIES_DATA = [...]`.
2. Add an entry with `{ name, lat, lon, baseTempC, zone }`.
3. On selection, `initCityVisualizer()` will automatically query Open-Meteo for the city's live current weather using its `lat` and `lon` coordinates and compute the TTAPS nuclear winter and warming projections.

## 4. Local Development & Testing Commands

```bash
# Start a local HTTP server on port 8080
cd "/Users/dzienrr/Documents/ChatGPT/DoomsDay Project/DoomsDay Clock"
python3 -m http.server 8080
```

Visit `http://localhost:8080/index.html` and test all 6 pages (`index.html`, `intelligence.html`, `map.html`, `simulator.html`, `timeline.html`, `about.html`).
