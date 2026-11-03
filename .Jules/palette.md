## 2024-05-18 - Improve Global Keyboard Focus Visibility
**Learning:** The application had `outline: none;` on inputs and lacked explicit keyboard focus rings on interactive elements, making it difficult for keyboard users to track focus. When disabling default outlines, using `outline: 2px solid transparent;` instead of `outline: none;` ensures the outline still renders in Windows High Contrast Mode (WHCM). Modern browsers curve the outline to match the element's existing border-radius.
**Action:** Changed `.search-bar-form input:focus` to `outline: 2px solid transparent;` for WHCM support and implemented a global `:focus-visible` rule using existing design tokens (`var(--accent-blue)`) with an offset to provide a clear focus ring without impacting standard mouse click behavior.

## 2026-10-27 - Focus outline and WHCM compatibility
**Learning:** Using `outline: none` breaks focus visibility in Windows High Contrast Mode (WHCM) because borders and box-shadows might be overwritten by the OS, leaving users with no focus indicator.
**Action:** Always use `outline: 2px solid transparent` instead of `outline: none` to ensure WHCM can override the transparent outline with a visible one while keeping it invisible in normal modes.


## 2024-05-19 - Using tabindex for skip-to-content links without breaking back-to-top links
**Learning:** Using the default `#top` id on the body or wrapper for a "Skip to Content" link creates a conflict when a site also features a "Back to Top" link pointing to `#top`. Reusing the ID causes programmatic focus to jump unintentionally or scroll to the wrong location, harming keyboard navigation flow.
**Action:** Always create a dedicated semantic id target (e.g. `id="main-content"`) on the `<main>` element specifically for the "Skip to Content" link, and ensure it receives programmatic focus by setting `tabindex="-1"`. This allows the browser to focus the content block without adding it to the natural tab order, and preserves the native scrolling behavior of the existing "Back to Top" `#top` links.
