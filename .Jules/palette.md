## 2024-05-18 - Improve Global Keyboard Focus Visibility
**Learning:** The application had `outline: none;` on inputs and lacked explicit keyboard focus rings on interactive elements, making it difficult for keyboard users to track focus. When disabling default outlines, using `outline: 2px solid transparent;` instead of `outline: none;` ensures the outline still renders in Windows High Contrast Mode (WHCM). Modern browsers curve the outline to match the element's existing border-radius.
**Action:** Changed `.search-bar-form input:focus` to `outline: 2px solid transparent;` for WHCM support and implemented a global `:focus-visible` rule using existing design tokens (`var(--accent-blue)`) with an offset to provide a clear focus ring without impacting standard mouse click behavior.

## 2026-10-27 - Focus outline and WHCM compatibility
**Learning:** Using `outline: none` breaks focus visibility in Windows High Contrast Mode (WHCM) because borders and box-shadows might be overwritten by the OS, leaving users with no focus indicator.
**Action:** Always use `outline: 2px solid transparent` instead of `outline: none` to ensure WHCM can override the transparent outline with a visible one while keeping it invisible in normal modes.


## 2026-10-31 - Skip to Content link and Legacy Anchors
**Learning:** Adding a 'Skip to Content' link is vital for keyboard users to bypass repetitive navigation. When updating the main content container's ID to serve as the target (e.g., `#main-content`), we must be careful not to break existing legacy anchor links, such as 'Back to Top' links that historically relied on the `#top` ID on the `<main>` tag.
**Action:** When implementing programmatic focus features like 'Skip to Content', target a separate ID (e.g., `#main-content`), add `tabindex="-1"` to the `<main>` element, and ensure a legacy anchor (e.g., `<div id="top"></div>`) is preserved at the top of the body to prevent breaking existing back-to-top links.

## 2026-11-08 - Accessible Skip Links vs Inline JS
**Learning:** Using inline JavaScript event handlers (like `onfocus` and `onblur`) for styling accessibility links like 'Skip to Content' violates separation of concerns, complicates maintenance, and can be blocked by strict Content Security Policies (CSP). CSS pseudo-classes (`:focus`, `:focus-visible`) are the correct and standard way to handle focus visibility.
**Action:** When adding visually hidden accessibility links, use a dedicated CSS class (e.g., `.skip-link`) and leverage CSS `:focus` and `:focus-visible` to manage their visible state, avoiding inline JavaScript entirely.
