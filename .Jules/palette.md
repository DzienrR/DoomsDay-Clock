## 2024-05-18 - Improve Global Keyboard Focus Visibility
**Learning:** The application had `outline: none;` on inputs and lacked explicit keyboard focus rings on interactive elements, making it difficult for keyboard users to track focus. When disabling default outlines, using `outline: 2px solid transparent;` instead of `outline: none;` ensures the outline still renders in Windows High Contrast Mode (WHCM). Modern browsers curve the outline to match the element's existing border-radius.
**Action:** Changed `.search-bar-form input:focus` to `outline: 2px solid transparent;` for WHCM support and implemented a global `:focus-visible` rule using existing design tokens (`var(--accent-blue)`) with an offset to provide a clear focus ring without impacting standard mouse click behavior.

## 2026-10-27 - Focus outline and WHCM compatibility
**Learning:** Using `outline: none` breaks focus visibility in Windows High Contrast Mode (WHCM) because borders and box-shadows might be overwritten by the OS, leaving users with no focus indicator.
**Action:** Always use `outline: 2px solid transparent` instead of `outline: none` to ensure WHCM can override the transparent outline with a visible one while keeping it invisible in normal modes.


## 2024-05-19 - Skip to Content link and page structure
**Learning:** Adding a "Skip to Content" link for screen reader and keyboard accessibility requires careful handling of IDs when `#top` is used heavily for "Back to Top" links across the app. Targeting the same ID for both programatic focus skipping and visual scrolling creates conflicts.
**Action:** Targeted a separate ID (`#main-content`) for the "Skip to Content" feature and added `tabindex="-1"` to the `<main>` element, while inserting a `<div id="top"></div>` right before `<main>` to maintain existing `#top` link scrolling actions without conflicting.
