## 2024-05-18 - Missing global focus-visible states
**Learning:** Keyboard navigation lacks visual feedback across interactive elements (buttons, links, inputs). `outline: none` is used without a fallback, making tab-navigation difficult for accessibility.
**Action:** Add global `:focus-visible` styles to provide clear, accessible focus rings across all interactive elements, following the `DESIGN_SYSTEM.md` token patterns (`var(--accent-blue)`).
## 2026-10-27 - Focus outline and WHCM compatibility
**Learning:** Using `outline: none` breaks focus visibility in Windows High Contrast Mode (WHCM) because borders and box-shadows might be overwritten by the OS, leaving users with no focus indicator.
**Action:** Always use `outline: 2px solid transparent` instead of `outline: none` to ensure WHCM can override the transparent outline with a visible one while keeping it invisible in normal modes.
