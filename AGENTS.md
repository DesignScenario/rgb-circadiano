# figma-make-app — Tela de Iluminação

React + Vite + Tailwind CSS project running inside Figma Make.

## What this app is

A mobile UI prototype for a **smart-home lighting control screen** — the lighting
panel for a single room ("Varanda Gourmet"). Everything is rendered as a phone
mockup (max width 393px, iOS-style status bar and home indicator). Only the
lighting feature is implemented; other room devices (A/C, blinds, outlets,
cameras) appear as nav icons only.

The whole app lives in `src/App.tsx` as a small screen state machine:

- `main` — the primary panel with the room photo, action menu, and the luminaire
  list: **Central** (simple dimmer), **Fita LED** (RGB brightness + chromatic
  slider), **Bancada** (ON/OFF), and **LED CCT/Circadiano** (intensity +
  color-temperature slider, 2700K–6500K, with a circadian auto mode that sweeps
  the temperature over a 20s triangle wave).
- `rgb-advanced` — full color wheel (hue/saturation), intensity slider, and
  preset scene buttons (`FESTA`, `CICLO RGB`, `MIX 1`, `MIX 2`).
- `cct-advanced` — interactive 270° arc for color temperature; in circadian mode
  it shows two handles (warmest/coolest bounds) instead of one.

State lives in `App()` and is passed down to the advanced screens as props, so
values persist when navigating between screens.

## Development Server

A Vite development server is **already running** on `$PORT` (default 8443). You
don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

This is the canonical project structure. Start with task-relevant files below.
Only follow imports or inspect other files when required, when a documented path
is missing, or when the repository contradicts this guide.

- `src/App.tsx` - **The entire app.** All screens, components (`Slider`,
  `DropBalloon`, `StatusBar`, `NavBar`, `ActionMenu`, the two advanced screens),
  and color-math helpers live here. This is the starting point for almost all UI work.
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
  / `cctToRgb` (warm→white→cool temperature). `clamp(v, lo, hi)` is the shared clamp.
- `Slider` is the reusable slider primitive; prefer configuring it (via
  `trackFill`, `thumbContent`, `tooltipFill`, `tooltipContent`, `thumbW/H`) over
  writing a new slider. `DropBalloon` is its teardrop tooltip.
- Drag interactions use pointer events with `setPointerCapture` — follow that
  pattern (down → capture → move guarded by `hasPointerCapture`) for new draggable controls.
- UI copy is in **Portuguese (pt-BR)**. Keep new user-facing text in Portuguese.
- The accent/highlight color is `#FFCC33` (yellow); backgrounds are black (`#000`).

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`),
  or escape them in single-quoted strings. An unescaped apostrophe in a
  single-quoted string breaks the build. (Portuguese copy like `"não"` is fine;
  watch contractions and quotes.)
- Ensure JSX tags are closed and braces are balanced.
- Export components as default exports.
