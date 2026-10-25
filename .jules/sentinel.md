## 2026-10-25 - DOM XSS in External Data and User Input via innerHTML
**Vulnerability:** External data from NASA and USGS APIs (e.g. event titles, locations) and local user input (custom scenario titles) were injected directly into the DOM using `innerHTML` without prior sanitization.
**Learning:** The application extensively uses `innerHTML` for templating without utilizing DOM sanitization libraries or relying on native `textContent`. This highlights a systemic issue where both API responses and user inputs are implicitly trusted.
**Prevention:** Always escape HTML entities (e.g., `<` to `&lt;`, `>` to `&gt;`) or avoid `innerHTML` entirely by relying on `textContent`/`innerText` when injecting untrusted content.
