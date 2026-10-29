## 2024-05-18 - Improve Global Keyboard Focus Visibility
**Learning:** The application had `outline: none;` on inputs and lacked explicit keyboard focus rings on interactive elements, making it difficult for keyboard users to track focus. When disabling default outlines, using `outline: 2px solid transparent;` instead of `outline: none;` ensures the outline still renders in Windows High Contrast Mode (WHCM). Modern browsers curve the outline to match the element's existing border-radius.
**Action:** Changed `.search-bar-form input:focus` to `outline: 2px solid transparent;` for WHCM support and implemented a global `:focus-visible` rule using existing design tokens (`var(--accent-blue)`) with an offset to provide a clear focus ring without impacting standard mouse click behavior.

## 2026-10-27 - Focus outline and WHCM compatibility
**Learning:** Using `outline: none` breaks focus visibility in Windows High Contrast Mode (WHCM) because borders and box-shadows might be overwritten by the OS, leaving users with no focus indicator.
**Action:** Always use `outline: 2px solid transparent` instead of `outline: none` to ensure WHCM can override the transparent outline with a visible one while keeping it invisible in normal modes.


## 2026-10-29 - Implementing Skip-to-Content Link
**Learning:** When implementing "skip to main content" links in a page that already uses `#top` for back-to-top scrolling, reusing `#top` doesn't work correctly for programmatic focus. The browser will handle `#top` by scrolling to the top, rather than moving focus to the main element.
**Action:** Always create a distinct ID (like `#main-content`) for the `<main>` tag, add `tabindex="-1"` to allow programmatic focus without putting it in the normal tab order, and add `outline: none` on focus to prevent a large focus ring around the whole page body when the skip link is used.
