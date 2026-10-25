# Post-Creation Operations, QA & Deployment Runbook (`OPERATIONS_RUNBOOK.md`)

**Document Version:** 3.0.0  
**Target Environment:** Static Edge CDN (GitHub Pages, Vercel, Netlify, Cloudflare Pages)

## 1. Pre-Launch Quality Assurance (QA) Checklist

Before deploying any update to production, complete this 5-point verification:

- [ ] **1. Multi-Page Navigation Audit:** Click through all 6 pages (`index.html`, `intelligence.html`, `map.html`, `simulator.html`, `timeline.html`, `about.html`) and verify no broken links or console errors occur.
- [ ] **2. Official Reading Auto-Sync Check:** Click the `Check Official Sync` button (`#sync-clock-btn`) on `index.html` and verify the status pill updates to `OFFICIAL 2026 READING • LIVE VERIFIED` (or the latest year).
- [ ] **3. Live API & Offline Fallback Test:**
  - Verify live articles load in `#news-grid` and planetary events populate in `#nasa-events-list` and `#usgs-events-list`.
  - In browser DevTools (`Network -> Offline`), reload `index.html` and `intelligence.html` to confirm the site gracefully displays `CURATED_INTEL` and baseline sensor cards without breaking.
- [ ] **4. Interactive Canvas Export Test:** Click `Download High-Res Status Card (PNG)` and `Save Share Card` (in the Birth Year Time Machine) to confirm a crisp `1200x630` PNG downloads cleanly.
- [ ] **5. Responsive Viewport Check:** Test in DevTools Device Mode at `375px` (Mobile), `768px` (Tablet), and `1440px` (Desktop).

## 2. Production Deployment Runbooks

Because this observatory is a pure static HTML/CSS/JS application with zero build dependencies, it deploys in under 30 seconds on any global CDN:

### Option A: GitHub Pages (Recommended Free Global Hosting)
1. Push the repository to GitHub.
2. Go to **Settings -> Pages -> Build and deployment**.
3. Select **Deploy from a branch** -> Branch: `main` / `(root)` -> **Save**.

### Option B: Vercel / Netlify / Cloudflare Pages
- **Framework Preset:** `Other` / `Static HTML`
- **Build Command:** *(Leave empty)*
- **Output Directory:** `.` (Root directory)

## 3. Annual January Maintenance Protocol (Bulletin Announcement Day)

Each January, when the Bulletin of the Atomic Scientists announces the year's Doomsday Clock setting:
1. **Automatic Live Coverage:** As soon as the Wikipedia `Doomsday_Clock` article lead is updated, `syncOfficialClockReading()` automatically syncs the new reading for live site visitors.
2. **Permanent Archive Commit:** Within 24 hours of the announcement, add the new year's permanent entry, verbatim quote, and verified source URL to `TIMELINE_DATA` in `app.js` following `CONTRIBUTING.md`.
