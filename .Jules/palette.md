## 2024-05-18 - Missing global focus-visible states
**Learning:** Keyboard navigation lacks visual feedback across interactive elements (buttons, links, inputs). `outline: none` is used without a fallback, making tab-navigation difficult for accessibility.
**Action:** Add global `:focus-visible` styles to provide clear, accessible focus rings across all interactive elements, following the `DESIGN_SYSTEM.md` token patterns (`var(--accent-blue)`).
