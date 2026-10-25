# Design System & UI/UX Specification — Doomsday Clock Observatory

**Document Version:** 3.0.0  
**Aesthetic Direction:** "Bulletin Tactical Command Center" — High-contrast dark mode, precision monospace telemetry, glowing vector instrumentation, and museum-grade editorial typography.

## 1. CSS Custom Properties (Design Tokens)

All visual tokens are centralized in `:root` at the top of `styles.css`. Never hardcode arbitrary hex colors in component rules when an existing token applies.

| Token Name | Value | Semantic Usage |
| :--- | :--- | :--- |
| `--bg-primary` | `#07090e` | Deep obsidian canvas background |
| `--bg-secondary` | `#0d111a` | Alternating section background (`.section-alt`) |
| `--bg-card` | `rgba(18, 23, 35, 0.85)` | Primary glassmorphic card surface |
| `--bg-card-hover` | `rgba(26, 33, 50, 0.95)` | Interactive card hover/active state |
| `--border-subtle` | `rgba(255, 255, 255, 0.09)` | Hairline structural borders and dividers |
| `--border-highlight` | `rgba(255, 59, 48, 0.45)` | Active/alert card border highlight |
| `--text-main` | `#f8fafc` | Primary headings and body copy (high contrast) |
| `--text-muted` | `#94a3b8` | Secondary descriptions and article snippets |
| `--text-dim` | `#64748b` | Captions, axis labels, and metadata |
| `--accent-red` | `#ff3b30` | Primary Doomsday Clock hand, critical risk badges, primary CTAs |
| `--accent-orange` | `#ff9500` | Severe threat indicators, final 17-minute dial ticks, secondary highlights |
| `--accent-blue` | `#38bdf8` | Hyperlinks, simulated ghost hand, seismic telemetry badges |
| `--accent-green` | `#10b981` | Diplomatic breakthroughs, backward Clock moves (`away`), stabilizing signals |
| `--accent-purple` | `#a855f7` | Biosecurity pillar badges and elevated watch indicators |

## 2. Typography Scale & Font Stacks

- **Display Headings (`--font-display`):** `'Space Grotesk', sans-serif` — Used for `.brand-title`, `.hero-reading`, `.section-title`, and `.tl-year`.
- **UI & Editorial Body (`--font-sans`):** `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` — Used for long-form historical explanations, news snippets, and dossiers (`line-height: 1.6`).
- **Telemetry & Numerical Readouts (`--font-mono`):** `'JetBrains Mono', monospace` — Mandatory for all timestamps, 24-hour clock readouts (`23:58:35`), coordinate pairs, warhead counts, and status pills (`.mono`).

## 3. Component Patterns & Accessibility Rules

1. **Status Pills (`.status-pill`):**
   - `.status-critical`: Red tint (`<= 120s` to midnight or expired treaties).
   - `.status-high`: Amber tint (`121s–360s` or accelerating risk).
   - `.status-elevated`: Purple tint (biosecurity / dual-use technology watch).
   - `.status-safe`: Emerald tint (backward Clock movements and active arms-control treaties).
2. **Responsive Breakpoints:**
   - **Desktop (`> 1080px`):** 2-column hero stage (`480px 1fr`), 4-column mini threat grid, 2-column sensor panels.
   - **Tablet (`641px–1080px`):** Single-column hero and simulator layouts; 2-column gauges and threat cards.
   - **Mobile (`<= 640px`):** Single-column stacked grids; horizontally scrollable telemetry ticker and treaty tables.
3. **Motion & Audio Restraint:**
   - Audio synthesis (`Web Audio API`) must **always** default to `Off` (`aria-pressed="false"`) and only activate upon explicit user click.
   - Clock hand rotations use `transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)` for smooth physical damping.
