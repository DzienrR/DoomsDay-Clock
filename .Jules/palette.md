## 2024-05-18 - Improve Global Keyboard Focus Visibility
**Learning:** The application had `outline: none;` on inputs and lacked explicit keyboard focus rings on interactive elements, making it difficult for keyboard users to track focus. When disabling default outlines, using `outline: 2px solid transparent;` instead of `outline: none;` ensures the outline still renders in Windows High Contrast Mode (WHCM). Modern browsers curve the outline to match the element's existing border-radius.
**Action:** Changed `.search-bar-form input:focus` to `outline: 2px solid transparent;` for WHCM support and implemented a global `:focus-visible` rule using existing design tokens (`var(--accent-blue)`) with an offset to provide a clear focus ring without impacting standard mouse click behavior.

## 2026-10-27 - Focus outline and WHCM compatibility
**Learning:** Using `outline: none` breaks focus visibility in Windows High Contrast Mode (WHCM) because borders and box-shadows might be overwritten by the OS, leaving users with no focus indicator.
**Action:** Always use `outline: 2px solid transparent` instead of `outline: none` to ensure WHCM can override the transparent outline with a visible one while keeping it invisible in normal modes.


## 2024-11-12 - Separation of Back-to-Top and Skip-to-Content Targets
**Learning:** Programmatic focus management (like Skip to Content) and visual scroll management (like Back to Top) often conflict if they share the same ID target (`#top`), especially when the skip target requires a specific DOM element (`<main tabindex="-1">`) for keyboard focus, while the scroll target simply needs to be at the top of the body.
**Action:** Decouple these concerns by maintaining a legacy anchor (e.g., `<div id="top"></div>`) for back-to-top links while targeting a dedicated, focusable semantic container (e.g., `<main id="main-content" tabindex="-1">`) for accessibility skip links.
