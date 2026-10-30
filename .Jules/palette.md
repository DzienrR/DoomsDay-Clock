## 2024-05-18 - Improve Global Keyboard Focus Visibility
**Learning:** The application had `outline: none;` on inputs and lacked explicit keyboard focus rings on interactive elements, making it difficult for keyboard users to track focus. When disabling default outlines, using `outline: 2px solid transparent;` instead of `outline: none;` ensures the outline still renders in Windows High Contrast Mode (WHCM). Modern browsers curve the outline to match the element's existing border-radius.
**Action:** Changed `.search-bar-form input:focus` to `outline: 2px solid transparent;` for WHCM support and implemented a global `:focus-visible` rule using existing design tokens (`var(--accent-blue)`) with an offset to provide a clear focus ring without impacting standard mouse click behavior.

## 2026-10-27 - Focus outline and WHCM compatibility
**Learning:** Using `outline: none` breaks focus visibility in Windows High Contrast Mode (WHCM) because borders and box-shadows might be overwritten by the OS, leaving users with no focus indicator.
**Action:** Always use `outline: 2px solid transparent` instead of `outline: none` to ensure WHCM can override the transparent outline with a visible one while keeping it invisible in normal modes.


## 2026-10-30 - Focus outline and programmatic focus via `tabindex="-1"` for Skip Links
**Learning:** When implementing Skip to Content links, targeting an element without intrinsic focusability (like `<main>`) requires explicitly adding `tabindex="-1"` so it can programmatically receive focus without entering the natural tab order. Moreover, avoiding conflicts with existing `#top` links requires isolating the target ID.
**Action:** Always add `tabindex="-1"` to non-interactive target elements for skip links, and ensure skip link targets are separate from scroll-to-top targets.
