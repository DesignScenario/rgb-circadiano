# figma-make-app — Tela de Iluminação

React + Vite + Tailwind CSS project running inside Figma Make.

## What this app is

A mobile UI prototype for a **smart-home lighting control screen** — the lighting
panel for a single room ("Varanda Gourmet"). Everything is rendered as a phone
mockup (max width 393px, iOS-style status bar and home indicator). Only the
lighting feature is implemented; other room devices (A/C, blinds, outlets,
cameras) appear as nav icons only.

The whole app lives in `src/App.tsx` as a small screen state machine. A
`HomeScreen` landing page offers **three UX proposals** for the same lighting
panel — all driven by the same shared state in `App()` (brightness, hue,
saturation, CCT temp/min/max, circadian on/off, Bancada on/off), so adjusting
a value in one proposal is reflected in the others:

- **Proposal #1** (`main-classic`, `MainScreenClassic`) — one full screen per
  luminaire. Lists **Central** (dimmer), **Fita LED** and **Fita LED 2**
  (brightness + an inline hue slider, each with a gear icon into its own
  color-wheel screen), **Bancada** (ON/OFF), and **LED CCT/Circadiano**
  (intensity + temperature slider, plus a `"CIRC."` button into the CCT arc
  screen).
  - `rgb-advanced-classic` (`RGBAdvancedScreenClassic`) — full color wheel
    (hue/saturation), intensity slider, and preset scene buttons (`FESTA`,
    `CICLO RGB`, `MIX 1`, `MIX 2`, `OFF` — currently only dim the wheel, no
    actual scene logic).
  - `rgb2-advanced-classic` (`RGB2AdvancedScreenClassic`) — a hue ring
    (`RingHueHandle`) plus a separate vertical saturation slider
    (`VerticalSatSlider`).
  - `cct-advanced-classic` (`CctAdvancedScreen`) — interactive 270° arc for
    color temperature (2700K–6500K, snapped to a 50K grid via
    `snapCctTemp`); in circadian mode it shows two handles (warmest/coolest
    bounds via `CctArcHandle`) instead of one, and animates the temperature
    over a 20s triangle wave when circadian mode is on.
- **Proposal #2** (`main`, `MainScreen`) — same luminaires (now including a
  **Fita LED 3**), but color/temperature controls expand **inline** on the
  main screen (`ExpandToggleIcon`) instead of navigating away: a color wheel
  for Fita LED, hue rings for Fita LED 2/3, and an inline CCT arc. Expanded
  controls dim to 50% opacity when their strip's intensity is 0.
- **Proposal #3** (`main-3`, `MainScreenThird`) — advanced-only: the main
  screen shows just intensity/on-off controls (no Fita LED 2, no inline
  color/temperature sliders); color and temperature are only adjustable from
  two dedicated screens, both dimming to 50% opacity when their strip's
  intensity is 0:
  - `rgb-advanced-3` (`RGBAdvancedScreen3`) — the same color wheel, no preset
    buttons, plus an **editable hex field** in place of a static swatch:
    typing a complete 6-digit hex (`hexToRgb` → `rgbToHsv`) moves the wheel
    selector and sets Intensidade from the hex's brightness; conversely, the
    field's background/text (`scaleRgbString` + `contrastTextColor`) always
    shows the color as actually *displayed* — hue/sat blended with the
    current Intensidade — not the wheel's always-100%-value `pickedColor`.
    Sliders on this screen and in `MainScreenThird`/`CctCircleScreen3` are
    also visibly thicker (`trackH={11}`, `thumbW/H={15}`) than this app's
    3px/13px default — a proposal #3–only style choice, not a bug to "fix".
  - `cct-circle-3` (`CctCircleScreen3`) — a circadian **circle** instead of an
    arc: a linear vertical gradient (warm↔cool), one or two 32px
    `CctCircleHandle`s draggable anywhere inside the circle along its
    vertical diameter (`cctTToCircleY` / `cctCircleDyToT`), a Kelvin-value
    label below it (fixed min/max bounds in manual mode; in circadian mode, a
    `CctAutoRingIcon` slides across a live min/max gradient tracking the
    temperature sweep in real time, with a 9px end-of-travel stop).

State lives in `App()` and is passed down to every screen as props, so values
persist when navigating between screens — including across proposals.

## Development Server

A Vite development server is **already running** on `$PORT` (default 8443). You
don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

This is the canonical project structure. Start with task-relevant files below.
Only follow imports or inspect other files when required, when a documented path
is missing, or when the repository contradicts this guide.

- `src/App.tsx` - **The entire app.** All screens across all three proposals,
  shared components (`Slider`, `DropBalloon`, `StatusBar`, `NavBar`,
  `ActionMenu`, `LumHeader`, `GearIcon`), and color-math helpers live here.
  This is the starting point for almost all UI work.
- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts
  `src/App.tsx` into the `#root` element
- `src/index.css` - Global CSS entrypoint: Montserrat web font import + Tailwind CSS v4 import
- `src/imports/` - **Figma-generated components and assets.** One folder per
  Figma node, each with an `index.tsx`, a `svg-*.ts` file exporting raw SVG path
  strings, and sometimes a `.png`. `App.tsx` imports a few of these (icons, the
  room photo, the hue wheel and CCT arc images). Treat these as generated output —
  prefer importing from them over editing them by hand.
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `package.json` - Dependencies and the Vite dev/build/preview/format scripts
- `vite.config.ts` - Vite config with React, Tailwind CSS v4, and Figma Make plugins plus the `@` alias for `src`
- `.mise.toml` - Toolchain versions for Node.js and pnpm

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Conventions

**Two styling worlds — don't mix them:**

- `src/App.tsx` is hand-written and uses **inline `style={{}}` objects**, not
  Tailwind classes. Match this when editing `App.tsx`: keep new markup on inline
  styles for consistency with everything around it.
- `src/imports/*` is Figma-generated and uses **Tailwind utility classes**
  (`className="..."`). Leave that style in place when touching generated files.

Global CSS or Tailwind v4 theme customization still belongs in `src/index.css`
(keep `@import` statements first, then any `@font-face` / font-family rules).
No Tailwind config file or PostCSS config is needed with the v4 plugin.

**App.tsx idioms:**

- `const M = 'Montserrat, sans-serif'` is the shared font-family constant. Use
  `fontFamily: M` on text rather than repeating the string.
- Color math lives in the helpers at the top of the file — reuse them rather than
  re-deriving colors: `hueToColor` / `hueToRgb` (rainbow slider), `sliderToHslHue`
  / `hslHueToSlider` / `hslToBlendedColor` (RGB wheel ↔ slider), and `cctToColor`
  / `cctToRgb` (warm→white→cool temperature). `rgbStringToHex` converts an
  `rgb(r,g,b)` string to `#RRGGBB`; `hexToRgb` / `rgbToHsv` do the reverse
  (parse a typed hex into RGB, then standard HSV — `hue`/`sat` feed the wheel,
  `val` feeds an intensity slider); `scaleRgbString` scales an `rgb(...)`
  string's channels by a 0-1 factor (e.g. to blend in a separate intensity
  value). `contrastTextColor` picks black or white text for legibility
  against any of these colors. `clamp(v, lo, hi)` is the shared clamp.
- `Slider` is the reusable slider primitive; prefer configuring it (via
  `trackFill`, `thumbContent`, `tooltipFill`, `tooltipContent`, `thumbW/H`) over
  writing a new slider. `DropBalloon` is its teardrop tooltip.
- Drag interactions use pointer events with `setPointerCapture` — follow that
  pattern (down → capture → move guarded by `hasPointerCapture`) for new draggable controls.
- Expanded/advanced color controls (wheels, rings, the circadian circle, and
  their labels) dim to `opacity: 0.5` (with a `transition: 'opacity 0.2s
  ease'`) whenever their luminaire's intensity is exactly 0 — not a gradual
  ramp. Follow this convention for any new color control.
- UI copy is in **Portuguese (pt-BR)**. Keep new user-facing text in Portuguese.
- The accent/highlight color is `#FFCC33` (yellow); backgrounds are black (`#000`).

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`),
  or escape them in single-quoted strings. An unescaped apostrophe in a
  single-quoted string breaks the build. (Portuguese copy like `"não"` is fine;
  watch contractions and quotes.)
- Ensure JSX tags are closed and braces are balanced.
- Export components as default exports.
