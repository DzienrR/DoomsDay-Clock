## 2024-05-18 - Improve Global Keyboard Focus Visibility
**Learning:** The application had `outline: none;` on inputs and lacked explicit keyboard focus rings on interactive elements, making it difficult for keyboard users to track focus. When disabling default outlines, using `outline: 2px solid transparent;` instead of `outline: none;` ensures the outline still renders in Windows High Contrast Mode (WHCM). Modern browsers curve the outline to match the element's existing border-radius.
**Action:** Changed `.search-bar-form input:focus` to `outline: 2px solid transparent;` for WHCM support and implemented a global `:focus-visible` rule using existing design tokens (`var(--accent-blue)`) with an offset to provide a clear focus ring without impacting standard mouse click behavior.

## 2026-10-27 - Focus outline and WHCM compatibility
**Learning:** Using `outline: none` breaks focus visibility in Windows High Contrast Mode (WHCM) because borders and box-shadows might be overwritten by the OS, leaving users with no focus indicator.
**Action:** Always use `outline: 2px solid transparent` instead of `outline: none` to ensure WHCM can override the transparent outline with a visible one while keeping it invisible in normal modes.


## 2026-10-27 - Skip to main content links and scroll targets
**Learning:** When replacing an element ID that serves as a scroll target (like `id="top"` for 'Back to Top' links), directly moving that ID to a different element (or changing it for another feature like a skip link) breaks existing page behaviors. Programmatic focus elements like `<main tabindex="-1">` require unique IDs, and if they conflict with legacy targets like `#top`, the scroll jump doesn't work correctly.
**Action:** When adding "Skip to content" functionality, introduce a dedicated ID (`#main-content`) on the target element (e.g., `<main>`), add `tabindex="-1"` so it is programmatically focusable without adding default focus styles, and ensure legacy anchors (`<div id="top"></div>`) are preserved at the top of the body so existing 'Back to Top' links remain functional.
