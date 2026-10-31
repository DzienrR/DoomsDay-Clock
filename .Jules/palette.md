## 2024-05-18 - Improve Global Keyboard Focus Visibility
**Learning:** The application had `outline: none;` on inputs and lacked explicit keyboard focus rings on interactive elements, making it difficult for keyboard users to track focus. When disabling default outlines, using `outline: 2px solid transparent;` instead of `outline: none;` ensures the outline still renders in Windows High Contrast Mode (WHCM). Modern browsers curve the outline to match the element's existing border-radius.
**Action:** Changed `.search-bar-form input:focus` to `outline: 2px solid transparent;` for WHCM support and implemented a global `:focus-visible` rule using existing design tokens (`var(--accent-blue)`) with an offset to provide a clear focus ring without impacting standard mouse click behavior.

## 2026-10-27 - Focus outline and WHCM compatibility
**Learning:** Using `outline: none` breaks focus visibility in Windows High Contrast Mode (WHCM) because borders and box-shadows might be overwritten by the OS, leaving users with no focus indicator.
**Action:** Always use `outline: 2px solid transparent` instead of `outline: none` to ensure WHCM can override the transparent outline with a visible one while keeping it invisible in normal modes.


## 2026-10-31 - [Skip to Content Implementation]
**Learning:** Using `#top` for back-to-top links and also trying to target it for 'skip to content' creates a conflict. The skip link should target a specific main content ID like `#main-content` and set `tabindex="-1"` on it, otherwise programmatic focus might not work smoothly or could conflict with browser's default scroll behavior to `#top`.
**Action:** When adding skip links, ensure the target container has a unique ID separate from typical browser default IDs (like `#top`) and uses `tabindex="-1"` to properly handle programmatic focus without affecting the tab order.
