# Security & Privacy Policy (`SECURITY.md`)

## 1. Zero-Credential Client Architecture

The **Doomsday Clock Live Observatory** is architected to run 100% in the visitor's browser using public, keyless, CORS-enabled open data endpoints:
- **Wikipedia MediaWiki REST/Action API** (`origin=*`)
- **NASA Earth Observatory Natural Event Tracker (EONET v3 API)**
- **USGS Real-Time GeoJSON Earthquake Feed**
- **Open-Meteo Public Weather Forecast API**

**Rule:** Never commit private API keys, bearer tokens, `.env` files, or server credentials into `app.js`, `features.js`, or any HTML file.

## 2. DOM Sanitization & XSS Prevention

When rendering external text from live APIs (such as Wikipedia search snippets, USGS location strings, or NASA EONET event titles):
1. Strip raw HTML tags from search snippets before rendering (`snippet.replace(/<[^>]+>/g, "")`).
2. Enforce `rel="noopener noreferrer"` on all external `<a target="_blank">` links to prevent `window.opener` tabnabbing.
3. Restrict external URLs in dynamic cards to verified HTTPS origins.

## 3. User Privacy & Local Storage

- The site does **not** use tracking cookies, third-party ad scripts, or invasive analytics Fingerprinting.
- Only two optional keys are stored in the visitor's browser `localStorage` (`dd_clock_poll_votes` and `dd_clock_user_vote`) to persist their community forecast poll selection locally.
