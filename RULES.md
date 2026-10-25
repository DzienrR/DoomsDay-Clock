# Engineering, Content & Quality Rules (`RULES.md`)

These rules govern the lifecycle of the **Doomsday Clock Live Observatory**—from pre-development planning to code implementation and post-deployment verification.

## Rule 1: Pre-Development Checklist (Before Writing Code)
1. **Check `REQUIREMENTS.md` and `ARCHITECTURE.md`:** Verify which of the 6 HTML pages (`index.html`, `intelligence.html`, `map.html`, `simulator.html`, `timeline.html`, `about.html`) and which JS module (`app.js` vs. `features.js`) owns the feature.
2. **Verify Data Provenance:** Any factual claim about nuclear arsenals, treaties, historical Clock movements, or atmospheric modeling (such as the 1983 TTAPS nuclear winter study) must trace to a verified encyclopedia, peer-reviewed study, or official Bulletin statement.
3. **Design Token Reuse:** Check `DESIGN_SYSTEM.md` and `:root` in `styles.css` before writing new CSS classes.

## Rule 2: Code Quality & Resilience Rules (During Development)
1. **Zero Unhandled Promise Rejections:** Every `async` function calling `fetch()` must catch network errors and render a meaningful fallback state rather than leaving an empty container or infinite loading spinner.
2. **Idempotent Rendering Functions:** Functions like `renderActiveYear()`, `renderHistoryChart()`, `renderTimelineCards()`, and `drawWorldMap()` must clear their container (`innerHTML = ""`) before re-rendering so they can be called repeatedly during time-travel scrubbing or live auto-sync without duplicating DOM nodes.
3. **Accessible Interactive Controls:**
   - Every `<button>` must have `type="button"` (unless submitting a `<form>`).
   - Every `<svg>` visualization must include `role="img"` and a descriptive `aria-label`.
   - Every `<input>` and `<select>` must have an associated `<label>` or `aria-label`.

## Rule 3: Post-Development & Release Checklist (After Writing Code)
1. **Cross-Page Smoke Test:** Open each of the 6 HTML pages (`index.html`, `intelligence.html`, `map.html`, `simulator.html`, `timeline.html`, `about.html`) and verify:
   - Top telemetry bar UTC clock ticks every second.
   - Navigation links highlight the current page (`.nav-link.active`).
   - Interactive widgets on that page respond to clicks and filters.
2. **SEO & Sitemap Sync:** If a new `.html` page is created, add its canonical path to `sitemap.xml` and `ARCHITECTURE.md`.
3. **Changelog Entry:** Record the change under the current date in `CHANGELOG.md`.
