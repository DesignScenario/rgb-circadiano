import { useState, useRef, useEffect, useCallback } from 'react'
import svgPaths from '@/imports/AppTelaAmbientesAmbientesAbertoIluminacaoControles/svg-pmgjkt5zjf'
import imgVaranda from '@/imports/AppTelaAmbientesAmbientesAbertoIluminacaoControles/22a9ee485fdf17a055744d650f1f5599924c6e1a.png'
import imgMatizes from '@/imports/AppTelaAmbientesAmbientesAbertoIluminacaoModoCircadiano/dad55023aed494b396988fa22a3673797d574fcb.png'
import imgCctArc from '@/imports/AppTelaAmbientesAmbientesAbertoIluminacaoModoCircadiano-1/aa2d1113b1e32cf249aca3b9ce7c43c8ce970f30.png'
import imgAnelCromatico from '@/imports/AppTelaAmbientesAmbientesAbertoIluminacaoRgbFitaLed2/84dbb79dfd0f6c297efd18b14c39107762f48e9e.png'
import AppBotaoMenuAmbienteAberto from '@/imports/AppBotaoMenuAmbienteAberto/index'
import AppIconeAmbientesIluminacao70Px from '@/imports/AppIconeAmbientesIluminacao70Px/index'
import AppIconeAmbientesControles70Px from '@/imports/AppIconeAmbientesControles70Px/index'

// ─── SVG path for the teardrop / gota tooltip shape ──────────────────────────
// 43 × 50.05 px — circle at top, pointed tip at bottom
const GOTA_PATH =
  'M21.5 0C33.3741 0 42.9999 9.55853 43 21.3496C43 27.6311 40.2671 33.2779 35.9189 37.1846L23.5947 49.1982C22.4297 50.3337 20.5723 50.3336 19.4072 49.1982L7.08008 37.1846C2.73222 33.2779 0 27.6308 0 21.3496C0.000108996 9.55853 9.62595 0 21.5 0Z'

const M = 'Montserrat, sans-serif'
// Duration of the Home ↔ main-screen "Move In" slide transition
const MAIN_TRANSITION_MS = 320
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(Math.max(v, lo), hi)

// ─── Color helpers ────────────────────────────────────────────────────────────

// Map 0-100 slider value to RGB hue color (rainbow gradient matching the track)
function hueToRgb(value: number): [number, number, number] {
  const stops: Array<{ v: number; r: number; g: number; b: number }> = [
    { v: 0, r: 255, g: 255, b: 255 },
    { v: 8, r: 255, g: 0, b: 128 },
    { v: 17, r: 255, g: 0, b: 255 },
    { v: 25, r: 127, g: 0, b: 255 },
    { v: 33, r: 0, g: 0, b: 255 },
    { v: 42, r: 0, g: 127, b: 255 },
    { v: 50, r: 0, g: 255, b: 255 },
    { v: 58, r: 0, g: 255, b: 127 },
    { v: 67, r: 0, g: 255, b: 0 },
    { v: 75, r: 127, g: 255, b: 0 },
    { v: 83, r: 255, g: 255, b: 0 },
    { v: 92, r: 255, g: 127, b: 0 },
    { v: 100, r: 255, g: 0, b: 0 },
  ]
  const lo = [...stops].reverse().find((s) => s.v <= value) ?? stops[0]
  const hi = stops.find((s) => s.v > value) ?? stops[stops.length - 1]
  if (lo === hi) return [lo.r, lo.g, lo.b]
  const t = (value - lo.v) / (hi.v - lo.v)
  return [
    Math.round(lo.r + (hi.r - lo.r) * t),
    Math.round(lo.g + (hi.g - lo.g) * t),
    Math.round(lo.b + (hi.b - lo.b) * t),
  ]
}
function hueToColor(value: number): string {
  const [r, g, b] = hueToRgb(value)
  return `rgb(${r},${g},${b})`
}

// Map slider value (0-100) to HSL hue degrees
// Slider 0 = white (no hue), slider 8 = hue 330°, slider 100 = hue 0°
// Linear mapping from 8→100 covers 330°→0° (going through 360=0)
function sliderToHslHue(slider: number): number {
  if (slider <= 0) return 0
  const s = Math.max(slider, 8)
  return (((330 - (s - 8) * (330 / 92)) % 360) + 360) % 360
}

// Map HSL hue degrees → slider value (8-100)
function hslHueToSlider(hue: number): number {
  hue = ((hue % 360) + 360) % 360
  // Hues 330°–360° are on the short arc (magenta→red) with no slider equivalent — clamp to 8
  if (hue > 330) return 8
  return Math.round(clamp(8 + (330 - hue) * (92 / 330), 8, 100))
}

// Convert HSL hue + saturation to a blended color (white at center, pure hue at edge)
function hslToBlendedColor(hue: number, sat: number): string {
  if (sat === 0) return 'rgb(255,255,255)'
  hue = ((hue % 360) + 360) % 360
  let r: number, g: number, b: number
  if (hue > 330) {
    // 30° short arc (magenta→red): interpolate endpoint colors directly
    const t = (hue - 330) / 30
    const [r0, g0, b0] = hueToRgb(8) // magenta end
    const [r1, g1, b1] = hueToRgb(100) // red end
    r = Math.round(r0 + (r1 - r0) * t)
    g = Math.round(g0 + (g1 - g0) * t)
    b = Math.round(b0 + (b1 - b0) * t)
  } else {
    ;[r, g, b] = hueToRgb(hslHueToSlider(hue))
  }
  const wr = Math.round(255 + (r - 255) * sat)
  const wg = Math.round(255 + (g - 255) * sat)
  const wb = Math.round(255 + (b - 255) * sat)
  return `rgb(${wr},${wg},${wb})`
}

// Converts an "rgb(r,g,b)" string (as produced by the helpers above) to "#RRGGBB"
function rgbStringToHex(rgbStr: string): string {
  const [r, g, b] = rgbStr.match(/\d+/g)!.map(Number)
  return (
    '#' +
    [r, g, b]
      .map((c) => c.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  )
}

// Perceived-brightness heuristic: light backgrounds get black text, dark backgrounds get white text
function contrastTextColor(rgbStr: string): string {
  const [r, g, b] = rgbStr.match(/\d+/g)!.map(Number)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 150 ? 'black' : 'white'
}

// Map 0-100 CCT temp to warm (#FF8800) → white (#FFFFFF) → cool (#88BBFF)
function cctToRgb(temp: number): [number, number, number] {
  if (temp <= 50) {
    const t = temp / 50
    return [
      Math.round(255 + (255 - 255) * t),
      Math.round(136 + (255 - 136) * t),
      Math.round(0 + (255 - 0) * t),
    ]
  }
  const t = (temp - 50) / 50
  return [
    Math.round(255 + (136 - 255) * t),
    Math.round(255 + (187 - 255) * t),
    Math.round(255 + (255 - 255) * t),
  ]
}
function cctToColor(temp: number): string {
  const [r, g, b] = cctToRgb(temp)
  return `rgb(${r},${g},${b})`
}

// Kelvin step applied by the circadian ring's manual up/down nudge buttons.
// All circadian K values are snapped to this grid so displayed numbers are
// always round (4600K, 4650K, ...), never arbitrary drag positions.
const CCT_STEP_K = 50
const CCT_MIN_K = 2700
const CCT_MAX_K = 6500
// Raw (unsnapped) 0-100 slider value → Kelvin, rounded to the nearest CCT_STEP_K
const cctTempToK = (temp: number) =>
  Math.round(
    (CCT_MIN_K + (temp / 100) * (CCT_MAX_K - CCT_MIN_K)) / CCT_STEP_K,
  ) * CCT_STEP_K
const kToCctTemp = (k: number) =>
  ((clamp(k, CCT_MIN_K, CCT_MAX_K) - CCT_MIN_K) / (CCT_MAX_K - CCT_MIN_K)) * 100
// Snaps any raw 0-100 slider value to the one whose Kelvin value is round
const snapCctTemp = (temp: number) => kToCctTemp(cctTempToK(temp))

// ─── Teardrop Tooltip Balloon ─────────────────────────────────────────────────

function DropBalloon({
  children,
  visible,
  fill = 'rgba(112,112,112,0.85)',
}: {
  children: React.ReactNode
  visible: boolean
  fill?: string
}) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 'calc(100% + 6px)',
        left: '50%',
        transform: `translateX(-50%) translateY(${visible ? '0px' : '12px'})`,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.18s ease, transform 0.18s ease',
        pointerEvents: 'none',
        zIndex: 60,
        width: 43,
        height: 50.05,
        filter: 'drop-shadow(0 4px 3px rgba(0,0,0,0.35))',
      }}
    >
      {/* Teardrop SVG */}
      <svg
        style={{ position: 'absolute', inset: 0 }}
        width="43"
        height="50.0498"
        viewBox="0 0 43 50.0498"
        fill="none"
      >
        <path d={GOTA_PATH} fill={fill} />
      </svg>
      {/* Content centered on the circle's geometric center: y ≈ 21.35px in 50.05px SVG */}
      <div
        style={{
          position: 'absolute',
          top: 21.35,
          left: 0,
          right: 0,
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </div>
  )
}

// ─── Generic Slider ───────────────────────────────────────────────────────────

interface SliderProps {
  value: number
  onChange: (v: number) => void
  disabled?: boolean
  trackBg?: string
  trackFill?: React.ReactNode
  thumbColor?: string
  thumbContent?: React.ReactNode
  thumbW?: number
  thumbH?: number
  trackH?: number
  tooltipFill?: string
  tooltipContent?: React.ReactNode
}

function Slider({
  value,
  onChange,
  disabled = false,
  trackBg = '#999',
  trackFill,
  thumbColor = '#FFCC33',
  thumbContent,
  thumbW = 13,
  thumbH = 13,
  trackH = 3,
  tooltipFill = 'rgba(112,112,112,0.85)',
  tooltipContent,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)

  const getVal = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return value
      const r = trackRef.current.getBoundingClientRect()
      const usable = r.width - thumbW
      return Math.round(
        clamp((clientX - r.left - thumbW / 2) / usable, 0, 1) * 100,
      )
    },
    [value, thumbW],
  )

  const containerH = Math.max(trackH, thumbH)

  return (
    <div
      ref={trackRef}
      style={{
        position: 'relative',
        width: '100%',
        height: containerH,
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      {/* Track */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          left: 0,
          right: 0,
          height: trackH,
          borderRadius: trackH / 2,
          background: trackBg,
          overflow: 'hidden',
        }}
      >
        {trackFill ?? (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${value}%`,
              background: thumbColor,
              borderRadius: trackH / 2,
            }}
          />
        )}
      </div>

      {/* Thumb hit area */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: `calc(${thumbW / 2}px + ${value / 100} * (100% - ${thumbW}px))`,
          transform: 'translate(-50%, -50%)',
          width: thumbW,
          height: thumbH,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled ? 'default' : dragging ? 'grabbing' : 'grab',
          touchAction: 'none',
          zIndex: 10,
        }}
        onPointerDown={
          disabled
            ? undefined
            : (e) => {
                e.preventDefault()
                ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
                setDragging(true)
              }
        }
        onPointerMove={
          disabled
            ? undefined
            : (e) => {
                if (
                  !(e.currentTarget as HTMLElement).hasPointerCapture(
                    e.pointerId,
                  )
                )
                  return
                onChange(getVal(e.clientX))
              }
        }
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        <div
          style={{
            position: 'relative',
            width: thumbW,
            height: thumbH,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {thumbContent ?? (
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: thumbColor,
              }}
            />
          )}
          <DropBalloon visible={dragging} fill={tooltipFill}>
            {tooltipContent !== undefined ? (
              tooltipContent
            ) : (
              <span
                style={{
                  fontFamily: M,
                  fontWeight: 600,
                  fontSize: 16,
                  color: 'white',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                {value}
              </span>
            )}
          </DropBalloon>
        </div>
      </div>
    </div>
  )
}

// ─── CCT Wave Thumb ───────────────────────────────────────────────────────────

const WAVE_PATH =
  'M9.5363 13.8852H12.905C13.5583 13.8542 14.1812 13.5926 14.669 13.1444C15.375 12.5178 16.0225 11.8247 16.6031 11.0741C16.6439 11.0173 16.6884 10.9635 16.7363 10.913C18.3608 8.93519 19.9907 7 22.7015 7C25.433 7 27.0215 8.95833 28.6316 10.95V10.9556C29.226 11.745 29.8936 12.4732 30.6251 13.1296C31.1445 13.5964 31.8051 13.8637 32.4944 13.8861H35.8622C36.2701 13.8861 36.6614 14.0528 36.9498 14.3496C37.2383 14.6463 37.4003 15.0488 37.4003 15.4685V16.2694C37.4003 16.6891 37.2383 17.0916 36.9498 17.3884C36.6614 17.6851 36.2701 17.8519 35.8622 17.8519H32.4971C31.1013 17.837 29.7547 17.3197 28.691 16.3898C27.777 15.5924 26.9457 14.6996 26.2106 13.7259C25.6454 12.9747 25.0126 12.2799 24.3206 11.6509C23.8745 11.2356 23.3016 10.9933 22.7006 10.9657C22.0807 10.9978 21.4905 11.2486 21.0293 11.6759C20.3164 12.3182 19.6624 13.0264 19.0754 13.7917C18.3407 14.7463 17.5152 15.6232 16.6112 16.4093C15.5775 17.3201 14.2668 17.8304 12.9059 17.8519H9.5381C9.13017 17.8519 8.73895 17.6851 8.4505 17.3884C8.16205 17.0916 8 16.6891 8 16.2694V15.4676C8 15.0479 8.16205 14.6454 8.4505 14.3487C8.73895 14.0519 9.13017 13.8852 9.5381 13.8852H9.5363Z'
const RECT_PATH =
  'M6.5625 1H38.4375C41.444 1 44 3.6307 44 7V18C44 21.3693 41.444 24 38.4375 24H6.5625C3.55603 24 1 21.3693 1 18V7C1 3.6307 3.55603 1 6.5625 1Z'

function CCTThumb({ borderColor = '#FF8800' }: { borderColor?: string }) {
  return (
    <svg width="45" height="25" viewBox="0 0 45 25" fill="none">
      <g clipPath="url(#cct-clip)">
        <path d={RECT_PATH} fill="black" stroke={borderColor} strokeWidth="2" />
        <path d={WAVE_PATH} fill="url(#cct-wave-grad)" stroke="black" />
      </g>
      <defs>
        <linearGradient
          id="cct-wave-grad"
          gradientUnits="userSpaceOnUse"
          x1="8"
          x2="37.4"
          y1="12.43"
          y2="12.43"
        >
          <stop stopColor="#FF8800" />
          <stop offset="0.5" stopColor="#88BBFF" />
          <stop offset="1" stopColor="#FF8800" />
        </linearGradient>
        <clipPath id="cct-clip">
          <rect width="45" height="25" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

// ─── Status Bar ───────────────────────────────────────────────────────────────

function StatusBar() {
  return (
    <div style={{ height: 50, flexShrink: 0 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 26px',
          height: '100%',
        }}
      >
        <svg
          width="28.63"
          height="10.71"
          viewBox="0 0 28.6331 10.7088"
          fill="none"
        >
          <path d={svgPaths.p17daad00} fill="white" />
        </svg>
        <svg width="75.37" height="12" viewBox="0 0 75.3717 12" fill="none">
          <path d={svgPaths.p1dd8f8c0} fill="white" />
          <path d={svgPaths.p13122500} fill="white" />
          <path d={svgPaths.p329921f0} fill="white" />
          <path d={svgPaths.p3f00b700} fill="white" />
          <path
            clipRule="evenodd"
            d={svgPaths.p2ba99580}
            fill="white"
            fillRule="evenodd"
          />
          <path d={svgPaths.pdc7d780} fill="#7D7D7D" />
          <path d={svgPaths.p2ea63500} fill="#7D7D7D" />
          <path d={svgPaths.p2077f700} fill="white" />
        </svg>
      </div>
    </div>
  )
}

// ─── Nav Bar ──────────────────────────────────────────────────────────────────

function NavBar({ onHomeClick }: { onHomeClick?: () => void }) {
  return (
    <div style={{ height: 72, flexShrink: 0 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '9px 31px',
          height: '100%',
        }}
      >
        <div
          onClick={onHomeClick}
          style={{
            flex: '1 0 0',
            height: 54,
            borderRadius: 4,
            background: '#FFCC33',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: onHomeClick ? 'pointer' : 'default',
          }}
        >
          <svg
            width="21.6"
            height="21.525"
            viewBox="0 0 21.6 21.525"
            fill="none"
          >
            <path d={svgPaths.p1cc22100} fill="black" />
          </svg>
        </div>
        {[
          <svg
            key="at"
            width="21.8"
            height="21.8"
            viewBox="0 0 21.8 21.8"
            fill="none"
          >
            <path d={svgPaths.pacefc80} fill="white" />
          </svg>,
          <svg
            key="eq"
            width="21.9"
            height="22"
            viewBox="0 0 21.9 22"
            fill="none"
          >
            <path d={svgPaths.p854ca80} fill="white" />
          </svg>,
          <svg
            key="av"
            width="32"
            height="29.74"
            viewBox="0 0 32 29.7392"
            fill="none"
          >
            <path d={svgPaths.p568ad00} fill="white" />
          </svg>,
        ].map((icon, i) => (
          <div
            key={i}
            style={{
              flex: '1 0 0',
              height: 54,
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Action Menu ──────────────────────────────────────────────────────────────

function ActionMenu({ anyLightOn }: { anyLightOn: boolean }) {
  const menuItems = [
    {
      key: 'remote',
      icon: null,
      active: false,
    },
    {
      key: 'light',
      icon: null,
      active: true,
    },
    {
      key: 'ac',
      icon: (
        <svg width="44" height="44" viewBox="0 0 43.5003 43.3801" fill="none">
          <path
            d={svgPaths.p1241a700}
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      ),
      active: false,
    },
    {
      key: 'blinds',
      icon: (
        <svg width="50" height="45" viewBox="0 0 50.35 44.91" fill="none">
          <path
            d={svgPaths.p31f2600}
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      ),
      active: false,
    },
    {
      key: 'outlet',
      icon: (
        <svg width="36" height="42" viewBox="0 0 36.207 41.832" fill="none">
          <path d={svgPaths.p3daa3c40} fill="white" />
          <path d={svgPaths.p3f45d80} fill="white" />
          <path d={svgPaths.p21214800} fill="white" />
        </svg>
      ),
      active: false,
    },
    {
      key: 'cam',
      icon: (
        <svg width="45" height="40" viewBox="0 0 45.2626 40.1398" fill="none">
          <path
            d={svgPaths.p24755900}
            stroke="white"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </svg>
      ),
      active: false,
    },
    {
      key: 'more',
      icon: (
        <svg width="35" height="8" viewBox="0 0 35.0008 8" fill="none">
          <path
            clipRule="evenodd"
            d={svgPaths.pe97cd00}
            fill="white"
            fillRule="evenodd"
          />
        </svg>
      ),
      active: false,
    },
  ]

  return (
    <div
      style={{
        height: 82,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 32,
          height: 70,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="6" height="20" viewBox="0 0 6.00025 20.0005" fill="none">
          <path
            d={svgPaths.p2e891880}
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div
        style={{
          flex: '1 0 0',
          height: 82,
          overflowX: 'auto',
          overflowY: 'hidden',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 11,
          scrollbarWidth: 'none',
        }}
      >
        {menuItems.map((btn) => {
          if (btn.key === 'remote') {
            return (
              <AppBotaoMenuAmbienteAberto
                key={btn.key}
                selecionado={btn.active}
                icone={<AppIconeAmbientesControles70Px />}
              />
            )
          }
          if (btn.key === 'light') {
            return (
              <AppBotaoMenuAmbienteAberto
                key={btn.key}
                selecionado={btn.active}
                icone={<AppIconeAmbientesIluminacao70Px estado={anyLightOn} />}
              />
            )
          }
          return (
            <div
              key={btn.key}
              style={{
                width: 70,
                height: 80,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 8,
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: 70,
                  height: 70,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {btn.icon}
              </div>
              {btn.active && (
                <div
                  style={{
                    width: 70,
                    height: 2,
                    background: '#FFCC33',
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
      <div
        style={{
          width: 32,
          height: 70,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'rotate(180deg)',
        }}
      >
        <svg width="6" height="20" viewBox="0 0 6.00025 20.0005" fill="none">
          <path
            d={svgPaths.p2e891880}
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  )
}

// ─── Section header ───────────────────────────────────────────────────────────

function LumHeader({ name, extra }: { name: string; extra?: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        height: 22,
        width: '100%',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: M,
          fontWeight: 600,
          fontSize: 16,
          color: 'white',
          flex: '1 0 0',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          lineHeight: 'normal',
        }}
      >
        {name}
      </span>
      {extra}
    </div>
  )
}

// ─── Gear icon (opens the classic full-screen advanced mode) ─────────────────

function GearIcon({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        width: 22,
        height: 22,
        flexShrink: 0,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <svg width="19" height="19" viewBox="0 0 19.0002 19.0002" fill="none">
        <path
          clipRule="evenodd"
          d={svgPaths.p3d3b3100}
          fill="white"
          fillRule="evenodd"
          stroke="white"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  )
}

// ─── Inline expand/collapse chevron (replaces the gear icon in proposal #2) ───

function ExpandToggleIcon({
  open,
  onClick,
}: {
  open: boolean
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        width: 22,
        height: 22,
        flexShrink: 0,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d={open ? 'M5 13L11 7L17 13' : 'M5 9L11 15L17 9'}
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}

// ─── Circadian ring step arrows (40px, center of the inline ring, manual mode) ─

function CircadianStepArrow({
  direction,
  onClick,
}: {
  direction: 'up' | 'down'
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 40,
        height: 40,
        flexShrink: 0,
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
        <path
          d={direction === 'up' ? 'M1 7L8 1L15 7' : 'M1 1L8 7L15 1'}
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </button>
  )
}

// ─── Circadian automatic-mode ring icon (travels the arc over the 10s sweep) ──

function CctAutoRingIcon({
  color,
  size = 36,
}: {
  color: string
  size?: number
}) {
  const iconW = (size * 32) / 36
  const iconH = (size * 17.8) / 36
  const border = 3
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#000',
        border: `${border}px solid ${color}`,
        boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Same wave/parábola vector as CCTThumb's collapsed-mode icon */}
      <svg width={iconW} height={iconH} viewBox="0 0 45 25" fill="none">
        <path d={WAVE_PATH} fill="url(#cct-wave-grad-ring)" stroke="black" />
        <defs>
          <linearGradient
            id="cct-wave-grad-ring"
            gradientUnits="userSpaceOnUse"
            x1="8"
            x2="37.4"
            y1="12.43"
            y2="12.43"
          >
            <stop stopColor="#FF8800" />
            <stop offset="0.5" stopColor="#88BBFF" />
            <stop offset="1" stopColor="#FF8800" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<
    | 'main'
    | 'cct-advanced'
    | 'main-classic'
    | 'rgb-advanced-classic'
    | 'rgb2-advanced-classic'
    | 'cct-advanced-classic'
    | 'main-3'
    | 'rgb-advanced-3'
    | 'cct-circle-3'
  >('main')
  // Home is the app's landing screen; the lighting main screen slides in over it
  const [mainMounted, setMainMounted] = useState(false)
  const [mainSlideIn, setMainSlideIn] = useState(false)
  // Same Move In slide, but for the classic (full-screen advanced mode) prototype
  const [classicMounted, setClassicMounted] = useState(false)
  const [classicSlideIn, setClassicSlideIn] = useState(false)
  // Same Move In slide, but for proposal #3 (advanced-only prototype)
  const [thirdMounted, setThirdMounted] = useState(false)
  const [thirdSlideIn, setThirdSlideIn] = useState(false)
  const [centralDim, setCentralDim] = useState(100)
  const [fitaBrightness, setFitaBrightness] = useState(100)
  const [fitaHue, setFitaHue] = useState(0)
  const [fitaSat, setFitaSat] = useState(1)
  const [fitaBrightness2, setFitaBrightness2] = useState(100)
  const [fitaHue2, setFitaHue2] = useState(0)
  const [fitaSat2, setFitaSat2] = useState(1)
  const [ringAngle2, setRingAngle2] = useState(0)
  const [fitaBrightness3, setFitaBrightness3] = useState(100)
  const [fitaHue3, setFitaHue3] = useState(0)
  const [fitaSat3, setFitaSat3] = useState(1)
  const [ringAngle3, setRingAngle3] = useState(0)
  const [cctIntensity, setCctIntensity] = useState(100)
  const [cctTemp, setCctTemp] = useState(50)
  const [cctTempMin, setCctTempMin] = useState(0)
  const [cctTempMax, setCctTempMax] = useState(100)
  const [bancadaOn, setBancadaOn] = useState(true)
  const [circAuto, setCircAuto] = useState(false)
  // Inline expand/collapse state for the on-screen advanced controls (proposal #2) —
  // independent per luminaire, so any combination can be open at once
  const [fitaExpanded, setFitaExpanded] = useState(false)
  const [fita2Expanded, setFita2Expanded] = useState(false)
  const [fita3Expanded, setFita3Expanded] = useState(false)
  const [cctExpanded, setCctExpanded] = useState(false)

  // CCT auto animation: bounces between cctTempMin and cctTempMax
  useEffect(() => {
    if (!circAuto) return
    let raf: number
    let start: number | null = null
    const CYCLE = 20000 // 20s total

    const tick = (ts: number) => {
      if (!start) start = ts
      const elapsed = (ts - start) % CYCLE
      const t = elapsed / CYCLE
      const pos = t < 0.5 ? t * 2 : (1 - t) * 2 // triangle wave 0→1→0
      setCctTemp(Math.round(cctTempMin + pos * (cctTempMax - cctTempMin)))
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [circAuto, cctTempMin, cctTempMax])

  // Derived colors
  // pickedColor blends toward white based on saturation (so wheel center = white)
  const pickedColor = hslToBlendedColor(
    sliderToHslHue(fitaHue),
    fitaHue === 0 ? 0 : fitaSat,
  )
  const rgbColor = fitaHue === 0 ? 'rgb(255,255,255)' : pickedColor
  const cctColor = cctToColor(cctTemp)

  // Fita LED 2 — derived colors (canonical slider-space hue, mirrors fitaHue/pickedColor above)
  const pickedColor2 = hslToBlendedColor(
    sliderToHslHue(fitaHue2),
    fitaHue2 === 0 ? 0 : fitaSat2,
  )
  const rgbColor2 = fitaHue2 === 0 ? 'rgb(255,255,255)' : pickedColor2

  // Called when the hue ring changes color — receives precise angle so the handle stays put
  const handleRingHueChange2 = (angleDeg: number) => {
    setRingAngle2(angleDeg)
    setFitaHue2(hslHueToSlider(angleDeg))
  }

  // Fita LED 3 — derived colors (canonical slider-space hue, mirrors fitaHue/pickedColor above)
  const pickedColor3 = hslToBlendedColor(
    sliderToHslHue(fitaHue3),
    fitaHue3 === 0 ? 0 : fitaSat3,
  )
  const rgbColor3 = fitaHue3 === 0 ? 'rgb(255,255,255)' : pickedColor3

  // Called when the hue ring changes color — receives precise angle so the handle stays put
  const handleRingHueChange3 = (angleDeg: number) => {
    setRingAngle3(angleDeg)
    setFitaHue3(hslHueToSlider(angleDeg))
  }

  // Wheel selector position — stored directly so drag avoids the hue round-trip
  const deriveWheelPos = (sliderVal: number, sat: number) => {
    const hue = sliderToHslHue(sliderVal)
    const angleRad = ((hue - 90) * Math.PI) / 180
    const radius = (sliderVal === 0 ? 0 : sat) * 150
    return { x: Math.cos(angleRad) * radius, y: Math.sin(angleRad) * radius }
  }
  const [wheelPos, setWheelPos] = useState(() => deriveWheelPos(0, 1))

  // Called when the wheel changes color — receives raw offset so selector stays put
  const handleWheelColorChange = (
    hue: number,
    sat: number,
    rawX: number,
    rawY: number,
  ) => {
    setFitaSat(sat)
    setWheelPos({ x: rawX, y: rawY })
    if (sat < 0.05) {
      setFitaHue(0)
    } else {
      setFitaHue(hslHueToSlider(hue))
    }
  }

  // Opens the lighting main screen, sliding it in over Home ("Move In")
  const openMainExperience = () => {
    setScreen('main')
    setMainMounted(true)
  }

  // Double rAF so the frame paints off-screen once before the transition kicks in
  useEffect(() => {
    if (!mainMounted) return
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setMainSlideIn(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [mainMounted])

  // Slides the main screen back out, then unmounts it once the transition ends
  const closeMainExperience = () => {
    setMainSlideIn(false)
    window.setTimeout(() => setMainMounted(false), MAIN_TRANSITION_MS)
  }

  // Opens the classic (full-screen advanced mode) lighting screen, sliding it in over Home
  const openClassicExperience = () => {
    setScreen('main-classic')
    setClassicMounted(true)
  }

  // Double rAF so the frame paints off-screen once before the transition kicks in
  useEffect(() => {
    if (!classicMounted) return
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setClassicSlideIn(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [classicMounted])

  // Slides the classic screen back out, then unmounts it once the transition ends
  const closeClassicExperience = () => {
    setClassicSlideIn(false)
    window.setTimeout(() => setClassicMounted(false), MAIN_TRANSITION_MS)
  }

  // Opens proposal #3 (advanced-only lighting screen), sliding it in over Home
  const openThirdExperience = () => {
    setScreen('main-3')
    setThirdMounted(true)
  }

  // Double rAF so the frame paints off-screen once before the transition kicks in
  useEffect(() => {
    if (!thirdMounted) return
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setThirdSlideIn(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [thirdMounted])

  // Slides proposal #3's screen back out, then unmounts it once the transition ends
  const closeThirdExperience = () => {
    setThirdSlideIn(false)
    window.setTimeout(() => setThirdMounted(false), MAIN_TRANSITION_MS)
  }

  if (screen === 'rgb-advanced-3') {
    return (
      <RGBAdvancedScreen3
        onBack={() => setScreen('main-3')}
        brightness={fitaBrightness}
        onBrightnessChange={setFitaBrightness}
        wheelPos={wheelPos}
        onWheelColorChange={handleWheelColorChange}
        pickedColor={pickedColor}
      />
    )
  }

  if (screen === 'cct-circle-3') {
    return (
      <CctCircleScreen3
        onBack={() => setScreen('main-3')}
        circAuto={circAuto}
        onCircAutoChange={(v) => {
          setCircAuto(v)
          if (!v)
            setCctTemp(Math.round(cctTempMin + (cctTempMax - cctTempMin) / 2))
        }}
        cctTemp={cctTemp}
        onCctTempChange={setCctTemp}
        cctTempMin={cctTempMin}
        onCctTempMinChange={setCctTempMin}
        cctTempMax={cctTempMax}
        onCctTempMaxChange={setCctTempMax}
        cctIntensity={cctIntensity}
        onCctIntensityChange={setCctIntensity}
      />
    )
  }

  if (screen === 'rgb-advanced-classic') {
    return (
      <RGBAdvancedScreenClassic
        onBack={() => setScreen('main-classic')}
        brightness={fitaBrightness}
        onBrightnessChange={setFitaBrightness}
        wheelPos={wheelPos}
        onWheelColorChange={handleWheelColorChange}
        pickedColor={pickedColor}
      />
    )
  }

  if (screen === 'rgb2-advanced-classic') {
    return (
      <RGB2AdvancedScreenClassic
        onBack={() => setScreen('main-classic')}
        brightness={fitaBrightness2}
        onBrightnessChange={setFitaBrightness2}
        ringAngle={ringAngle2}
        onRingAngleChange={handleRingHueChange2}
        sat={fitaSat2}
        onSatChange={setFitaSat2}
      />
    )
  }

  if (screen === 'cct-advanced-classic') {
    return (
      <CctAdvancedScreen
        onBack={() => setScreen('main-classic')}
        circAuto={circAuto}
        onCircAutoChange={(v) => {
          setCircAuto(v)
          if (!v)
            setCctTemp(Math.round(cctTempMin + (cctTempMax - cctTempMin) / 2))
        }}
        cctTemp={cctTemp}
        onCctTempChange={setCctTemp}
        cctTempMin={cctTempMin}
        onCctTempMinChange={setCctTempMin}
        cctTempMax={cctTempMax}
        onCctTempMaxChange={setCctTempMax}
        cctIntensity={cctIntensity}
        onCctIntensityChange={setCctIntensity}
      />
    )
  }

  if (screen === 'cct-advanced') {
    return (
      <CctAdvancedScreen
        onBack={() => setScreen('main')}
        circAuto={circAuto}
        onCircAutoChange={(v) => {
          setCircAuto(v)
          if (!v)
            setCctTemp(Math.round(cctTempMin + (cctTempMax - cctTempMin) / 2))
        }}
        cctTemp={cctTemp}
        onCctTempChange={setCctTemp}
        cctTempMin={cctTempMin}
        onCctTempMinChange={setCctTempMin}
        cctTempMax={cctTempMax}
        onCctTempMaxChange={setCctTempMax}
        cctIntensity={cctIntensity}
        onCctIntensityChange={setCctIntensity}
      />
    )
  }

  // Fita LED simple-mode hue slider — mirrors handleWheelColorChange's sync duty
  const handleFitaHueChange = (v: number) => {
    setFitaHue(v)
    if (v > 0) setFitaSat(1)
    setWheelPos(deriveWheelPos(v, v > 0 ? fitaSat : 1))
  }

  // Fita LED 2 simple-mode hue slider — mirrors handleRingHueChange2's sync duty
  const handleFitaHue2Change = (v: number) => {
    setFitaHue2(v)
    if (v > 0) setFitaSat2(1)
    setRingAngle2(sliderToHslHue(v))
  }

  // Fita LED 3 simple-mode hue slider — mirrors handleRingHueChange3's sync duty
  const handleFitaHue3Change = (v: number) => {
    setFitaHue3(v)
    if (v > 0) setFitaSat3(1)
    setRingAngle3(sliderToHslHue(v))
  }

  return (
    <>
      <HomeScreen
        onOpenAdvanced={openClassicExperience}
        onOpenSecondary={openMainExperience}
        onOpenThird={openThirdExperience}
      />
      {classicMounted && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            transform: classicSlideIn ? 'translateX(0)' : 'translateX(100%)',
            transition: `transform ${MAIN_TRANSITION_MS}ms cubic-bezier(0.32,0.72,0,1)`,
            zIndex: 30,
          }}
        >
          <MainScreenClassic
            onGoHome={closeClassicExperience}
            onOpenRgbAdvanced={() => setScreen('rgb-advanced-classic')}
            onOpenRgb2Advanced={() => setScreen('rgb2-advanced-classic')}
            onOpenCctAdvanced={() => setScreen('cct-advanced-classic')}
            centralDim={centralDim}
            onCentralDimChange={setCentralDim}
            fitaBrightness={fitaBrightness}
            onFitaBrightnessChange={setFitaBrightness}
            fitaHue={fitaHue}
            onFitaHueChange={handleFitaHueChange}
            pickedColor={pickedColor}
            rgbColor={rgbColor}
            fitaBrightness2={fitaBrightness2}
            onFitaBrightness2Change={setFitaBrightness2}
            fitaHue2={fitaHue2}
            onFitaHue2Change={handleFitaHue2Change}
            pickedColor2={pickedColor2}
            rgbColor2={rgbColor2}
            bancadaOn={bancadaOn}
            onBancadaChange={setBancadaOn}
            cctIntensity={cctIntensity}
            onCctIntensityChange={setCctIntensity}
            cctTemp={cctTemp}
            onCctTempChange={setCctTemp}
            circAuto={circAuto}
            cctColor={cctColor}
          />
        </div>
      )}
      {thirdMounted && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            transform: thirdSlideIn ? 'translateX(0)' : 'translateX(100%)',
            transition: `transform ${MAIN_TRANSITION_MS}ms cubic-bezier(0.32,0.72,0,1)`,
            zIndex: 30,
          }}
        >
          <MainScreenThird
            onGoHome={closeThirdExperience}
            onOpenRgbAdvanced3={() => setScreen('rgb-advanced-3')}
            onOpenCctCircle3={() => setScreen('cct-circle-3')}
            centralDim={centralDim}
            onCentralDimChange={setCentralDim}
            fitaBrightness={fitaBrightness}
            onFitaBrightnessChange={setFitaBrightness}
            pickedColor={pickedColor}
            bancadaOn={bancadaOn}
            onBancadaChange={setBancadaOn}
            cctIntensity={cctIntensity}
            onCctIntensityChange={setCctIntensity}
            circAuto={circAuto}
            cctColor={cctColor}
          />
        </div>
      )}
      {mainMounted && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            transform: mainSlideIn ? 'translateX(0)' : 'translateX(100%)',
            transition: `transform ${MAIN_TRANSITION_MS}ms cubic-bezier(0.32,0.72,0,1)`,
            zIndex: 30,
          }}
        >
          <MainScreen
            onGoHome={closeMainExperience}
            onOpenCctAdvanced={() => setScreen('cct-advanced')}
            centralDim={centralDim}
            onCentralDimChange={setCentralDim}
            fitaBrightness={fitaBrightness}
            onFitaBrightnessChange={setFitaBrightness}
            fitaHue={fitaHue}
            onFitaHueChange={handleFitaHueChange}
            pickedColor={pickedColor}
            rgbColor={rgbColor}
            fitaExpanded={fitaExpanded}
            onFitaExpandedChange={setFitaExpanded}
            wheelPos={wheelPos}
            onWheelColorChange={handleWheelColorChange}
            fitaBrightness2={fitaBrightness2}
            onFitaBrightness2Change={setFitaBrightness2}
            fitaHue2={fitaHue2}
            onFitaHue2Change={handleFitaHue2Change}
            pickedColor2={pickedColor2}
            rgbColor2={rgbColor2}
            fita2Expanded={fita2Expanded}
            onFita2ExpandedChange={setFita2Expanded}
            ringAngle2={ringAngle2}
            onRingAngle2Change={handleRingHueChange2}
            fitaSat2={fitaSat2}
            onFitaSat2Change={setFitaSat2}
            fitaBrightness3={fitaBrightness3}
            onFitaBrightness3Change={setFitaBrightness3}
            fitaHue3={fitaHue3}
            onFitaHue3Change={handleFitaHue3Change}
            pickedColor3={pickedColor3}
            rgbColor3={rgbColor3}
            fita3Expanded={fita3Expanded}
            onFita3ExpandedChange={setFita3Expanded}
            ringAngle3={ringAngle3}
            onRingAngle3Change={handleRingHueChange3}
            fitaSat3={fitaSat3}
            onFitaSat3Change={setFitaSat3}
            bancadaOn={bancadaOn}
            onBancadaChange={setBancadaOn}
            cctIntensity={cctIntensity}
            onCctIntensityChange={setCctIntensity}
            cctTemp={cctTemp}
            onCctTempChange={setCctTemp}
            circAuto={circAuto}
            cctColor={cctColor}
            cctExpanded={cctExpanded}
            onCctExpandedChange={setCctExpanded}
          />
        </div>
      )}
    </>
  )
}

// ─── Home Screen (prototype landing screen) ───────────────────────────────────

function HomeScreen({
  onOpenAdvanced,
  onOpenSecondary,
  onOpenThird,
}: {
  onOpenAdvanced: () => void
  onOpenSecondary?: () => void
  onOpenThird?: () => void
}) {
  return (
    <div
      style={{
        background: '#000',
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: M,
        maxWidth: 393,
        margin: '0 auto',
      }}
    >
      {/* ── Descriptive tag ─────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 64,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div style={{ width: 76, height: 11, background: 'white' }} />
        <span
          style={{
            fontFamily: M,
            fontWeight: 600,
            fontSize: 16,
            color: 'white',
            lineHeight: 'normal',
            whiteSpace: 'nowrap',
          }}
        >
          PROTÓTIPO
        </span>
      </div>

      {/* ── Title ────────────────────────────────────────────────────────────── */}
      <span
        style={{
          position: 'absolute',
          left: 31,
          top: 133,
          transform: 'translateY(-50%)',
          fontFamily: M,
          fontWeight: 600,
          fontSize: 26,
          color: 'white',
          lineHeight: 'normal',
          whiteSpace: 'nowrap',
        }}
      >
        RGB - Circadiano
      </span>

      {/* ── Buttons ──────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: 31,
          right: 31,
          top: 197,
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}
      >
        <button
          onClick={onOpenAdvanced}
          style={{
            height: 50,
            border: '1px solid white',
            borderRadius: 4,
            background: 'transparent',
            padding: '0 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            fontFamily: M,
            fontWeight: 600,
            fontSize: 16,
            color: 'white',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          #1 - Ajuste no modo avançado
        </button>
        <button
          onClick={onOpenSecondary}
          style={{
            height: 50,
            border: '1px solid white',
            borderRadius: 4,
            background: 'transparent',
            padding: '0 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            fontFamily: M,
            fontWeight: 600,
            fontSize: 16,
            color: 'white',
            textAlign: 'center',
            cursor: onOpenSecondary ? 'pointer' : 'default',
          }}
        >
          #2 - Ajuste na tela principal
        </button>
        <button
          onClick={onOpenThird}
          style={{
            height: 50,
            border: '1px solid white',
            borderRadius: 4,
            background: 'transparent',
            padding: '0 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            fontFamily: M,
            fontWeight: 600,
            fontSize: 16,
            color: 'white',
            textAlign: 'center',
            cursor: onOpenThird ? 'pointer' : 'default',
          }}
        >
          #3 - Ajuste apenas no avançado
        </button>
      </div>

      {/* ── Home indicator ───────────────────────────────────────────────────── */}
      <div
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 34 }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: '33.33%',
            right: '33.33%',
            height: 5,
            borderRadius: 2.5,
            background: 'white',
          }}
        />
      </div>
    </div>
  )
}

// ─── Main Screen (lighting panel) ─────────────────────────────────────────────

function MainScreen({
  onGoHome,
  onOpenCctAdvanced,
  centralDim,
  onCentralDimChange,
  fitaBrightness,
  onFitaBrightnessChange,
  fitaHue,
  onFitaHueChange,
  pickedColor,
  rgbColor,
  fitaExpanded,
  onFitaExpandedChange,
  wheelPos,
  onWheelColorChange,
  fitaBrightness2,
  onFitaBrightness2Change,
  fitaHue2,
  onFitaHue2Change,
  pickedColor2,
  rgbColor2,
  fita2Expanded,
  onFita2ExpandedChange,
  ringAngle2,
  onRingAngle2Change,
  fitaSat2,
  onFitaSat2Change,
  fitaBrightness3,
  onFitaBrightness3Change,
  fitaHue3,
  onFitaHue3Change,
  pickedColor3,
  rgbColor3,
  fita3Expanded,
  onFita3ExpandedChange,
  ringAngle3,
  onRingAngle3Change,
  fitaSat3,
  onFitaSat3Change,
  bancadaOn,
  onBancadaChange,
  cctIntensity,
  onCctIntensityChange,
  cctTemp,
  onCctTempChange,
  circAuto,
  cctColor,
  cctExpanded,
  onCctExpandedChange,
}: {
  onGoHome: () => void
  onOpenCctAdvanced: () => void
  centralDim: number
  onCentralDimChange: (v: number) => void
  fitaBrightness: number
  onFitaBrightnessChange: (v: number) => void
  fitaHue: number
  onFitaHueChange: (v: number) => void
  pickedColor: string
  rgbColor: string
  fitaExpanded: boolean
  onFitaExpandedChange: (v: boolean) => void
  wheelPos: { x: number; y: number }
  onWheelColorChange: (
    hue: number,
    sat: number,
    rawX: number,
    rawY: number,
  ) => void
  fitaBrightness2: number
  onFitaBrightness2Change: (v: number) => void
  fitaHue2: number
  onFitaHue2Change: (v: number) => void
  pickedColor2: string
  rgbColor2: string
  fita2Expanded: boolean
  onFita2ExpandedChange: (v: boolean) => void
  ringAngle2: number
  onRingAngle2Change: (deg: number) => void
  fitaSat2: number
  onFitaSat2Change: (v: number) => void
  fitaBrightness3: number
  onFitaBrightness3Change: (v: number) => void
  fitaHue3: number
  onFitaHue3Change: (v: number) => void
  pickedColor3: string
  rgbColor3: string
  fita3Expanded: boolean
  onFita3ExpandedChange: (v: boolean) => void
  ringAngle3: number
  onRingAngle3Change: (deg: number) => void
  fitaSat3: number
  onFitaSat3Change: (v: number) => void
  bancadaOn: boolean
  onBancadaChange: (v: boolean) => void
  cctIntensity: number
  onCctIntensityChange: (v: number) => void
  cctTemp: number
  onCctTempChange: (v: number) => void
  circAuto: boolean
  cctColor: string
  cctExpanded: boolean
  onCctExpandedChange: (v: boolean) => void
}) {
  const pureHueColor2 = hslToBlendedColor(ringAngle2, 1)
  // Ring handle / sat-slider thumb color — always the true angle+sat blend, unlike
  // pickedColor2 which forces white at fitaHue2 === 0 for the collapsed linear slider
  const ringColor2 = hslToBlendedColor(ringAngle2, fitaSat2)
  const pureHueColor3 = hslToBlendedColor(ringAngle3, 1)
  const ringColor3 = hslToBlendedColor(ringAngle3, fitaSat3)

  // Expanded chromatic controls fade to 50% only when the strip is fully off (0) —
  // any intensity above that is full opacity, not a gradual ramp
  const fitaWheelOpacity = fitaBrightness === 0 ? 0.5 : 1
  const fita2RingOpacity = fitaBrightness2 === 0 ? 0.5 : 1
  const fita3RingOpacity = fitaBrightness3 === 0 ? 0.5 : 1

  // Drives the inline Fita LED color wheel (mirrors RGBAdvancedScreen's moveSelector)
  const wheelRef = useRef<HTMLDivElement>(null)
  const moveWheelSelector = (clientX: number, clientY: number) => {
    if (!wheelRef.current) return
    const rect = wheelRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    let dx = clientX - cx
    let dy = clientY - cy
    const d = Math.sqrt(dx * dx + dy * dy)
    if (d > 150) {
      dx = (dx / d) * 150
      dy = (dy / d) * 150
    }
    const sat = Math.min(Math.sqrt(dx * dx + dy * dy) / 150, 1)
    const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI)
    const hue = (((angleDeg + 90) % 360) + 360) % 360
    onWheelColorChange(hue, sat, dx, dy)
  }

  return (
    <div
      style={{
        background: '#000',
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: M,
        maxWidth: 393,
        margin: '0 auto',
      }}
    >
      {/* ── Scrollable content ──────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 122,
          bottom: 34,
          left: 0,
          right: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
        }}
      >
        {/* Ambient card */}
        <div style={{ position: 'relative', width: '100%' }}>
          <img
            src={imgVaranda}
            alt="Varanda Gourmet"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 33%, rgba(0,0,0,0) 37%, rgba(0,0,0,0.6) 100%)',
            }}
          />
          <div style={{ position: 'relative' }}>
            <div
              style={{
                padding: '24px 12px 24px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  height: 32,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 2,
                    top: 29,
                    cursor: 'pointer',
                  }}
                >
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                    <path
                      d="M7 13L1 7L7 1"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: M,
                    fontWeight: 600,
                    fontSize: 26,
                    color: 'white',
                    flex: '1 0 0',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Varanda Gourmet
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="11"
                    height="18"
                    viewBox="0 0 11.0001 18"
                    fill="none"
                  >
                    <path d={svgPaths.p9c99c00} fill="white" />
                  </svg>
                  <span
                    style={{
                      fontFamily: M,
                      fontWeight: 600,
                      fontSize: 24,
                      color: 'white',
                      lineHeight: 1,
                    }}
                  >
                    27°
                  </span>
                </div>
              </div>
            </div>
            <ActionMenu
              anyLightOn={
                centralDim > 0 ||
                fitaBrightness > 0 ||
                fitaBrightness2 > 0 ||
                fitaBrightness3 > 0 ||
                cctIntensity > 0 ||
                bancadaOn
              }
            />
          </div>
        </div>

        {/* ── Iluminação section ─────────────────────────────────────────────── */}
        <div
          style={{
            padding: '31px 31px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          {/* Label */}
          <div
            style={{
              position: 'relative',
              height: 25,
              width: '100%',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #7D7D7D',
            }}
          >
            <span
              style={{
                fontFamily: M,
                fontWeight: 700,
                fontSize: 10,
                color: '#B7B7B7',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: 'normal',
              }}
            >
              Luminárias
            </span>
          </div>

          {/* Luminarias list */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 32,
              width: '100%',
            }}
          >
            {/* ── Central ──────────────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <LumHeader name="Central" />
              <Slider
                value={centralDim}
                onChange={onCentralDimChange}
                thumbColor="#FFCC33"
                tooltipFill="rgba(112,112,112,0.85)"
              />
            </div>

            {/* ── Fita LED ─────────────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <LumHeader
                name="Fita LED"
                extra={
                  <ExpandToggleIcon
                    open={fitaExpanded}
                    onClick={() => onFitaExpandedChange(!fitaExpanded)}
                  />
                }
              />
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
              >
                {/* Brightness */}
                <Slider
                  value={fitaBrightness}
                  onChange={onFitaBrightnessChange}
                  trackFill={
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${fitaBrightness}%`,
                        background: pickedColor,
                        borderRadius: 1.5,
                      }}
                    />
                  }
                  thumbColor={pickedColor}
                  thumbContent={
                    <div
                      style={{
                        width: 13,
                        height: 13,
                        borderRadius: '50%',
                        background: 'white',
                      }}
                    />
                  }
                  tooltipFill="rgba(112,112,112,0.85)"
                />

                {/* Chromatic — simple slider (collapsed) or full color wheel (expanded) */}
                {fitaExpanded ? (
                  <div
                    ref={wheelRef}
                    style={{
                      position: 'relative',
                      width: 300,
                      height: 300,
                      margin: '0 auto',
                      borderRadius: '50%',
                      flexShrink: 0,
                      cursor: 'crosshair',
                      touchAction: 'none',
                      userSelect: 'none',
                      opacity: fitaWheelOpacity,
                      transition: 'opacity 0.2s ease',
                    }}
                    onPointerDown={(e) => {
                      e.currentTarget.setPointerCapture(e.pointerId)
                      moveWheelSelector(e.clientX, e.clientY)
                    }}
                    onPointerMove={(e) => {
                      if (!e.currentTarget.hasPointerCapture(e.pointerId))
                        return
                      moveWheelSelector(e.clientX, e.clientY)
                    }}
                  >
                    <img
                      src={imgMatizes}
                      alt=""
                      draggable={false}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        transform: 'rotate(-90deg)',
                        pointerEvents: 'none',
                      }}
                    />
                    <svg
                      style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                      }}
                      width="300"
                      height="300"
                      viewBox="0 0 300 300"
                    >
                      <defs>
                        <radialGradient
                          id="fitaWheelWhiteGrad"
                          cx="50%"
                          cy="50%"
                          r="50%"
                        >
                          <stop offset="0%" stopColor="white" />
                          <stop
                            offset="100%"
                            stopColor="white"
                            stopOpacity="0"
                          />
                        </radialGradient>
                      </defs>
                      <circle
                        cx="150"
                        cy="150"
                        r="150"
                        fill="url(#fitaWheelWhiteGrad)"
                      />
                    </svg>
                    {(() => {
                      const d = Math.sqrt(wheelPos.x ** 2 + wheelPos.y ** 2)
                      const sat = Math.min(d / 150, 1)
                      const hue =
                        ((Math.atan2(wheelPos.y, wheelPos.x) * 180) /
                          Math.PI +
                          90 +
                          360) %
                        360
                      const selectorColor = hslToBlendedColor(hue, sat)
                      return (
                        <div
                          style={{
                            position: 'absolute',
                            left: 150 + wheelPos.x - 16,
                            top: 150 + wheelPos.y - 16,
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: selectorColor,
                            border: '3px solid white',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.45)',
                            pointerEvents: 'none',
                          }}
                        />
                      )
                    })()}
                  </div>
                ) : (
                  <Slider
                    value={fitaHue}
                    onChange={onFitaHueChange}
                    trackBg="transparent"
                    trackFill={
                      <>
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage:
                              'linear-gradient(90deg, rgb(255,0,128) 8%, rgb(255,0,255) 17%, rgb(127,0,255) 25%, rgb(0,0,255) 33%, rgb(0,127,255) 42%, rgb(0,255,255) 50%, rgb(0,255,127) 58%, rgb(0,255,0) 67%, rgb(127,255,0) 75%, rgb(255,255,0) 83%, rgb(255,127,0) 92%, rgb(255,0,0) 100%)',
                            borderRadius: 1.5,
                          }}
                        />
                        {/* white overlay at start */}
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: 13,
                            background: 'white',
                          }}
                        />
                      </>
                    }
                    thumbContent={
                      <div
                        style={{
                          width: 13,
                          height: 13,
                          borderRadius: '50%',
                          background: rgbColor,
                          border: '1.5px solid white',
                          boxSizing: 'border-box',
                        }}
                      />
                    }
                    tooltipFill={
                      fitaHue === 0 ? 'rgba(200,200,200,0.9)' : pickedColor
                    }
                    tooltipContent={null}
                  />
                )}
              </div>
            </div>

            {/* ── Fita LED 2 ───────────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <LumHeader
                name="Fita LED 2"
                extra={
                  <ExpandToggleIcon
                    open={fita2Expanded}
                    onClick={() => onFita2ExpandedChange(!fita2Expanded)}
                  />
                }
              />
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
              >
                {/* Brightness */}
                <Slider
                  value={fitaBrightness2}
                  onChange={onFitaBrightness2Change}
                  trackFill={
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${fitaBrightness2}%`,
                        background: pickedColor2,
                        borderRadius: 1.5,
                      }}
                    />
                  }
                  thumbColor={pickedColor2}
                  thumbContent={
                    <div
                      style={{
                        width: 13,
                        height: 13,
                        borderRadius: '50%',
                        background: 'white',
                      }}
                    />
                  }
                  tooltipFill="rgba(112,112,112,0.85)"
                />

                {/* Chromatic — simple slider (collapsed) or hue ring + white slider (expanded) */}
                {fita2Expanded ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '0 12px',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: 240,
                        height: 240,
                        flexShrink: 0,
                        opacity: fita2RingOpacity,
                        transition: 'opacity 0.2s ease',
                      }}
                    >
                      <img
                        src={imgAnelCromatico}
                        alt=""
                        draggable={false}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          transform: 'rotate(-90deg)',
                          pointerEvents: 'none',
                        }}
                      />
                      <RingHueHandle
                        angleDeg={ringAngle2}
                        onDrag={onRingAngle2Change}
                        color={ringColor2}
                      />
                    </div>
                    <VerticalSatSlider
                      value={Math.round(fitaSat2 * 100)}
                      onChange={(v) => onFitaSat2Change(v / 100)}
                      topColor={pureHueColor2}
                      thumbColor={ringColor2}
                      opacity={fita2RingOpacity}
                    />
                  </div>
                ) : (
                  <Slider
                    value={fitaHue2}
                    onChange={onFitaHue2Change}
                    trackBg="transparent"
                    trackFill={
                      <>
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage:
                              'linear-gradient(90deg, rgb(255,0,128) 8%, rgb(255,0,255) 17%, rgb(127,0,255) 25%, rgb(0,0,255) 33%, rgb(0,127,255) 42%, rgb(0,255,255) 50%, rgb(0,255,127) 58%, rgb(0,255,0) 67%, rgb(127,255,0) 75%, rgb(255,255,0) 83%, rgb(255,127,0) 92%, rgb(255,0,0) 100%)',
                            borderRadius: 1.5,
                          }}
                        />
                        {/* white overlay at start */}
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: 13,
                            background: 'white',
                          }}
                        />
                      </>
                    }
                    thumbContent={
                      <div
                        style={{
                          width: 13,
                          height: 13,
                          borderRadius: '50%',
                          background: rgbColor2,
                          border: '1.5px solid white',
                          boxSizing: 'border-box',
                        }}
                      />
                    }
                    tooltipFill={
                      fitaHue2 === 0 ? 'rgba(200,200,200,0.9)' : pickedColor2
                    }
                    tooltipContent={null}
                  />
                )}
              </div>
            </div>

            {/* ── Fita LED 3 ───────────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <LumHeader
                name="Fita LED 3"
                extra={
                  <ExpandToggleIcon
                    open={fita3Expanded}
                    onClick={() => onFita3ExpandedChange(!fita3Expanded)}
                  />
                }
              />
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
              >
                {fita3Expanded ? (
                  /* Intensity slider (left) + hue ring (center) + saturation slider (right) —
                     replaces the horizontal brightness bar while expanded */
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '0 12px',
                    }}
                  >
                    <VerticalSatSlider
                      value={fitaBrightness3}
                      onChange={onFitaBrightness3Change}
                      topColor="white"
                      bottomColor="black"
                      thumbColor="white"
                      width={30}
                      height={200}
                      thumbSize={24}
                      showValue
                    />
                    <div
                      style={{
                        position: 'relative',
                        width: 200,
                        height: 200,
                        flexShrink: 0,
                        opacity: fita3RingOpacity,
                        transition: 'opacity 0.2s ease',
                      }}
                    >
                      <img
                        src={imgAnelCromatico}
                        alt=""
                        draggable={false}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          transform: 'rotate(-90deg)',
                          pointerEvents: 'none',
                        }}
                      />
                      <RingHueHandle
                        angleDeg={ringAngle3}
                        onDrag={onRingAngle3Change}
                        color={ringColor3}
                        center={100}
                        radius={85}
                        handleSize={24}
                      />
                    </div>
                    <VerticalSatSlider
                      value={Math.round(fitaSat3 * 100)}
                      onChange={(v) => onFitaSat3Change(v / 100)}
                      topColor={pureHueColor3}
                      thumbColor={ringColor3}
                      width={30}
                      height={200}
                      thumbSize={24}
                      opacity={fita3RingOpacity}
                    />
                  </div>
                ) : (
                  <>
                    {/* Brightness */}
                    <Slider
                      value={fitaBrightness3}
                      onChange={onFitaBrightness3Change}
                      trackFill={
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: `${fitaBrightness3}%`,
                            background: pickedColor3,
                            borderRadius: 1.5,
                          }}
                        />
                      }
                      thumbColor={pickedColor3}
                      thumbContent={
                        <div
                          style={{
                            width: 13,
                            height: 13,
                            borderRadius: '50%',
                            background: 'white',
                          }}
                        />
                      }
                      tooltipFill="rgba(112,112,112,0.85)"
                    />

                    {/* Chromatic (RGB) */}
                    <Slider
                      value={fitaHue3}
                      onChange={onFitaHue3Change}
                      trackBg="transparent"
                      trackFill={
                        <>
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              backgroundImage:
                                'linear-gradient(90deg, rgb(255,0,128) 8%, rgb(255,0,255) 17%, rgb(127,0,255) 25%, rgb(0,0,255) 33%, rgb(0,127,255) 42%, rgb(0,255,255) 50%, rgb(0,255,127) 58%, rgb(0,255,0) 67%, rgb(127,255,0) 75%, rgb(255,255,0) 83%, rgb(255,127,0) 92%, rgb(255,0,0) 100%)',
                              borderRadius: 1.5,
                            }}
                          />
                          {/* white overlay at start */}
                          <div
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: 0,
                              bottom: 0,
                              width: 13,
                              background: 'white',
                            }}
                          />
                        </>
                      }
                      thumbContent={
                        <div
                          style={{
                            width: 13,
                            height: 13,
                            borderRadius: '50%',
                            background: rgbColor3,
                            border: '1.5px solid white',
                            boxSizing: 'border-box',
                          }}
                        />
                      }
                      tooltipFill={
                        fitaHue3 === 0 ? 'rgba(200,200,200,0.9)' : pickedColor3
                      }
                      tooltipContent={null}
                    />
                  </>
                )}
              </div>
            </div>

            {/* ── Bancada ON/OFF ────────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <LumHeader name="Bancada" />
              <button
                onClick={() => onBancadaChange(!bancadaOn)}
                style={{
                  width: '100%',
                  height: 23,
                  background: 'none',
                  border: 'none',
                  padding: '5px 0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    flex: '1 0 0',
                    height: 13,
                    borderRadius: 4,
                    background: bancadaOn ? '#FFCC33' : 'transparent',
                    border: `1px solid ${bancadaOn ? '#FFCC33' : 'white'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s ease, border-color 0.2s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: M,
                      fontWeight: 600,
                      fontSize: 10,
                      color: bancadaOn ? 'black' : 'white',
                      lineHeight: 1,
                    }}
                  >
                    {bancadaOn ? 'ON' : 'OFF'}
                  </span>
                </div>
              </button>
            </div>

            {/* ── LED CCT/Circadiano ────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <LumHeader
                name="LED CCT/Circadiano"
                extra={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      flexShrink: 0,
                    }}
                  >
                    <button
                      onClick={onOpenCctAdvanced}
                      style={{
                        background: circAuto ? '#FFCC33' : 'transparent',
                        border: `1px solid ${circAuto ? '#FFCC33' : 'white'}`,
                        height: 22,
                        borderRadius: 4,
                        padding: '0 7px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        minWidth: 50,
                        cursor: 'pointer',
                        transition: 'background 0.2s, border-color 0.2s',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: M,
                          fontWeight: 600,
                          fontSize: 10,
                          color: circAuto ? 'black' : 'white',
                          textAlign: 'center',
                        }}
                      >
                        CIRC.
                      </span>
                    </button>
                    <ExpandToggleIcon
                      open={cctExpanded}
                      onClick={() => onCctExpandedChange(!cctExpanded)}
                    />
                  </div>
                }
              />
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
              >
                {/* CCT Intensity */}
                <Slider
                  value={cctIntensity}
                  onChange={onCctIntensityChange}
                  trackFill={
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${cctIntensity}%`,
                        background: cctColor,
                        borderRadius: 1.5,
                      }}
                    />
                  }
                  thumbColor={cctColor}
                  thumbContent={
                    <div
                      style={{
                        width: 13,
                        height: 13,
                        borderRadius: '50%',
                        background: 'white',
                      }}
                    />
                  }
                  tooltipFill="rgba(112,112,112,0.85)"
                />

                {/* CCT Chromatic — linear slider (collapsed) or circadian ring (expanded) */}
                {cctExpanded ? (
                  <div
                    style={{
                      position: 'relative',
                      width: 300,
                      height: 300,
                      margin: '0 auto',
                      flexShrink: 0,
                      userSelect: 'none',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: '12.95%',
                      }}
                    >
                      <img
                        src={imgCctArc}
                        alt=""
                        draggable={false}
                        style={{
                          display: 'block',
                          width: '100%',
                          height: '100%',
                          pointerEvents: 'none',
                          objectFit: 'contain',
                        }}
                      />
                    </div>

                    {/* Center label — manual mode also gets the ±100K step arrows */}
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      {!circAuto && (
                        <CircadianStepArrow
                          direction="up"
                          onClick={() =>
                            onCctTempChange(
                              clamp(
                                Math.round(
                                  kToCctTemp(cctTempToK(cctTemp) + CCT_STEP_K),
                                ),
                                0,
                                100,
                              ),
                            )
                          }
                        />
                      )}
                      <span
                        style={{
                          fontFamily: M,
                          fontWeight: 600,
                          fontSize: 24,
                          color: 'white',
                          lineHeight: 1.3,
                          textAlign: 'center',
                        }}
                      >
                        {kValueLabel(cctTemp / 100)}
                      </span>
                      {!circAuto && (
                        <CircadianStepArrow
                          direction="down"
                          onClick={() =>
                            onCctTempChange(
                              clamp(
                                Math.round(
                                  kToCctTemp(cctTempToK(cctTemp) - CCT_STEP_K),
                                ),
                                0,
                                100,
                              ),
                            )
                          }
                        />
                      )}
                    </div>

                    {/* Ring handle — draggable puck (manual) or traveling icon (automatic) */}
                    {circAuto ? (
                      <div
                        style={{
                          position: 'absolute',
                          left: cctTToPos(cctTemp / 100).x - 18,
                          top: cctTToPos(cctTemp / 100).y - 18,
                        }}
                      >
                        <CctAutoRingIcon color={cctColor} />
                      </div>
                    ) : (
                      <CctArcHandle
                        t={cctTemp / 100}
                        fillColor={cctColor}
                        onDrag={(newT) =>
                          onCctTempChange(Math.round(snapCctTemp(newT * 100)))
                        }
                      />
                    )}
                  </div>
                ) : (
                  <Slider
                    value={cctTemp}
                    onChange={(v) => {
                      if (!circAuto) onCctTempChange(v)
                    }}
                    disabled={circAuto}
                    trackH={3}
                    trackBg="transparent"
                    trackFill={
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(to right, #FF8800, #FFFFFF, #88BBFF)',
                          borderRadius: 1.5,
                        }}
                      />
                    }
                    thumbContent={
                      circAuto ? (
                        <CCTThumb borderColor={cctColor} />
                      ) : (
                        <div
                          style={{
                            width: 13,
                            height: 13,
                            borderRadius: '50%',
                            background: 'white',
                          }}
                        />
                      )
                    }
                    thumbW={circAuto ? 45 : 13}
                    thumbH={circAuto ? 25 : 13}
                    tooltipFill={cctColor}
                    tooltipContent={
                      <span
                        style={{
                          fontFamily: M,
                          fontWeight: 600,
                          fontSize: 13,
                          color: 'black',
                          display: 'block',
                          lineHeight: 1,
                        }}
                      >
                        {kValueLabel(cctTemp / 100)}
                      </span>
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Top bars ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          background: '#000',
        }}
      >
        <StatusBar />
        <NavBar onHomeClick={onGoHome} />
      </div>

      {/* ── Home indicator ────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 34,
          zIndex: 20,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: '33.33%',
            right: '33.33%',
            height: 5,
            borderRadius: 2.5,
            background: 'white',
          }}
        />
      </div>
    </div>
  )
}

// ─── Main Screen (Classic — full-screen advanced mode, proposal #1) ──────────

function MainScreenClassic({
  onGoHome,
  onOpenRgbAdvanced,
  onOpenRgb2Advanced,
  onOpenCctAdvanced,
  centralDim,
  onCentralDimChange,
  fitaBrightness,
  onFitaBrightnessChange,
  fitaHue,
  onFitaHueChange,
  pickedColor,
  rgbColor,
  fitaBrightness2,
  onFitaBrightness2Change,
  fitaHue2,
  onFitaHue2Change,
  pickedColor2,
  rgbColor2,
  bancadaOn,
  onBancadaChange,
  cctIntensity,
  onCctIntensityChange,
  cctTemp,
  onCctTempChange,
  circAuto,
  cctColor,
}: {
  onGoHome: () => void
  onOpenRgbAdvanced: () => void
  onOpenRgb2Advanced: () => void
  onOpenCctAdvanced: () => void
  centralDim: number
  onCentralDimChange: (v: number) => void
  fitaBrightness: number
  onFitaBrightnessChange: (v: number) => void
  fitaHue: number
  onFitaHueChange: (v: number) => void
  pickedColor: string
  rgbColor: string
  fitaBrightness2: number
  onFitaBrightness2Change: (v: number) => void
  fitaHue2: number
  onFitaHue2Change: (v: number) => void
  pickedColor2: string
  rgbColor2: string
  bancadaOn: boolean
  onBancadaChange: (v: boolean) => void
  cctIntensity: number
  onCctIntensityChange: (v: number) => void
  cctTemp: number
  onCctTempChange: (v: number) => void
  circAuto: boolean
  cctColor: string
}) {
  return (
    <div
      style={{
        background: '#000',
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: M,
        maxWidth: 393,
        margin: '0 auto',
      }}
    >
      {/* ── Scrollable content ──────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 122,
          bottom: 34,
          left: 0,
          right: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
        }}
      >
        {/* Ambient card */}
        <div style={{ position: 'relative', width: '100%' }}>
          <img
            src={imgVaranda}
            alt="Varanda Gourmet"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 33%, rgba(0,0,0,0) 37%, rgba(0,0,0,0.6) 100%)',
            }}
          />
          <div style={{ position: 'relative' }}>
            <div
              style={{
                padding: '24px 12px 24px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  height: 32,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 2,
                    top: 29,
                    cursor: 'pointer',
                  }}
                >
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                    <path
                      d="M7 13L1 7L7 1"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: M,
                    fontWeight: 600,
                    fontSize: 26,
                    color: 'white',
                    flex: '1 0 0',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Varanda Gourmet
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="11"
                    height="18"
                    viewBox="0 0 11.0001 18"
                    fill="none"
                  >
                    <path d={svgPaths.p9c99c00} fill="white" />
                  </svg>
                  <span
                    style={{
                      fontFamily: M,
                      fontWeight: 600,
                      fontSize: 24,
                      color: 'white',
                      lineHeight: 1,
                    }}
                  >
                    27°
                  </span>
                </div>
              </div>
            </div>
            <ActionMenu
              anyLightOn={
                centralDim > 0 ||
                fitaBrightness > 0 ||
                fitaBrightness2 > 0 ||
                cctIntensity > 0 ||
                bancadaOn
              }
            />
          </div>
        </div>

        {/* ── Iluminação section ─────────────────────────────────────────────── */}
        <div
          style={{
            padding: '31px 31px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          {/* Label */}
          <div
            style={{
              position: 'relative',
              height: 25,
              width: '100%',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #7D7D7D',
            }}
          >
            <span
              style={{
                fontFamily: M,
                fontWeight: 700,
                fontSize: 10,
                color: '#B7B7B7',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: 'normal',
              }}
            >
              Luminárias
            </span>
          </div>

          {/* Luminarias list */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 32,
              width: '100%',
            }}
          >
            {/* ── Central ──────────────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <LumHeader name="Central" />
              <Slider
                value={centralDim}
                onChange={onCentralDimChange}
                thumbColor="#FFCC33"
                tooltipFill="rgba(112,112,112,0.85)"
              />
            </div>

            {/* ── Fita LED ─────────────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <LumHeader
                name="Fita LED"
                extra={<GearIcon onClick={onOpenRgbAdvanced} />}
              />
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
              >
                {/* Brightness */}
                <Slider
                  value={fitaBrightness}
                  onChange={onFitaBrightnessChange}
                  trackFill={
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${fitaBrightness}%`,
                        background: pickedColor,
                        borderRadius: 1.5,
                      }}
                    />
                  }
                  thumbColor={pickedColor}
                  thumbContent={
                    <div
                      style={{
                        width: 13,
                        height: 13,
                        borderRadius: '50%',
                        background: 'white',
                      }}
                    />
                  }
                  tooltipFill="rgba(112,112,112,0.85)"
                />

                {/* Chromatic (RGB) */}
                <Slider
                  value={fitaHue}
                  onChange={onFitaHueChange}
                  trackBg="transparent"
                  trackFill={
                    <>
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage:
                            'linear-gradient(90deg, rgb(255,0,128) 8%, rgb(255,0,255) 17%, rgb(127,0,255) 25%, rgb(0,0,255) 33%, rgb(0,127,255) 42%, rgb(0,255,255) 50%, rgb(0,255,127) 58%, rgb(0,255,0) 67%, rgb(127,255,0) 75%, rgb(255,255,0) 83%, rgb(255,127,0) 92%, rgb(255,0,0) 100%)',
                          borderRadius: 1.5,
                        }}
                      />
                      {/* white overlay at start */}
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 13,
                          background: 'white',
                        }}
                      />
                    </>
                  }
                  thumbContent={
                    <div
                      style={{
                        width: 13,
                        height: 13,
                        borderRadius: '50%',
                        background: rgbColor,
                        border: '1.5px solid white',
                        boxSizing: 'border-box',
                      }}
                    />
                  }
                  tooltipFill={
                    fitaHue === 0 ? 'rgba(200,200,200,0.9)' : pickedColor
                  }
                  tooltipContent={null}
                />
              </div>
            </div>

            {/* ── Fita LED 2 ───────────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <LumHeader
                name="Fita LED 2"
                extra={<GearIcon onClick={onOpenRgb2Advanced} />}
              />
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
              >
                {/* Brightness */}
                <Slider
                  value={fitaBrightness2}
                  onChange={onFitaBrightness2Change}
                  trackFill={
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${fitaBrightness2}%`,
                        background: pickedColor2,
                        borderRadius: 1.5,
                      }}
                    />
                  }
                  thumbColor={pickedColor2}
                  thumbContent={
                    <div
                      style={{
                        width: 13,
                        height: 13,
                        borderRadius: '50%',
                        background: 'white',
                      }}
                    />
                  }
                  tooltipFill="rgba(112,112,112,0.85)"
                />

                {/* Chromatic (RGB) */}
                <Slider
                  value={fitaHue2}
                  onChange={onFitaHue2Change}
                  trackBg="transparent"
                  trackFill={
                    <>
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage:
                            'linear-gradient(90deg, rgb(255,0,128) 8%, rgb(255,0,255) 17%, rgb(127,0,255) 25%, rgb(0,0,255) 33%, rgb(0,127,255) 42%, rgb(0,255,255) 50%, rgb(0,255,127) 58%, rgb(0,255,0) 67%, rgb(127,255,0) 75%, rgb(255,255,0) 83%, rgb(255,127,0) 92%, rgb(255,0,0) 100%)',
                          borderRadius: 1.5,
                        }}
                      />
                      {/* white overlay at start */}
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 13,
                          background: 'white',
                        }}
                      />
                    </>
                  }
                  thumbContent={
                    <div
                      style={{
                        width: 13,
                        height: 13,
                        borderRadius: '50%',
                        background: rgbColor2,
                        border: '1.5px solid white',
                        boxSizing: 'border-box',
                      }}
                    />
                  }
                  tooltipFill={
                    fitaHue2 === 0 ? 'rgba(200,200,200,0.9)' : pickedColor2
                  }
                  tooltipContent={null}
                />
              </div>
            </div>

            {/* ── Bancada ON/OFF ────────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <LumHeader name="Bancada" />
              <button
                onClick={() => onBancadaChange(!bancadaOn)}
                style={{
                  width: '100%',
                  height: 23,
                  background: 'none',
                  border: 'none',
                  padding: '5px 0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    flex: '1 0 0',
                    height: 13,
                    borderRadius: 4,
                    background: bancadaOn ? '#FFCC33' : 'transparent',
                    border: `1px solid ${bancadaOn ? '#FFCC33' : 'white'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s ease, border-color 0.2s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: M,
                      fontWeight: 600,
                      fontSize: 10,
                      color: bancadaOn ? 'black' : 'white',
                      lineHeight: 1,
                    }}
                  >
                    {bancadaOn ? 'ON' : 'OFF'}
                  </span>
                </div>
              </button>
            </div>

            {/* ── LED CCT/Circadiano ────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <LumHeader
                name="LED CCT/Circadiano"
                extra={
                  <button
                    onClick={onOpenCctAdvanced}
                    style={{
                      background: circAuto ? '#FFCC33' : 'transparent',
                      border: `1px solid ${circAuto ? '#FFCC33' : 'white'}`,
                      height: 22,
                      borderRadius: 4,
                      padding: '0 7px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      minWidth: 50,
                      cursor: 'pointer',
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: M,
                        fontWeight: 600,
                        fontSize: 10,
                        color: circAuto ? 'black' : 'white',
                        textAlign: 'center',
                      }}
                    >
                      CIRC.
                    </span>
                  </button>
                }
              />
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
              >
                {/* CCT Intensity */}
                <Slider
                  value={cctIntensity}
                  onChange={onCctIntensityChange}
                  trackFill={
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${cctIntensity}%`,
                        background: cctColor,
                        borderRadius: 1.5,
                      }}
                    />
                  }
                  thumbColor={cctColor}
                  thumbContent={
                    <div
                      style={{
                        width: 13,
                        height: 13,
                        borderRadius: '50%',
                        background: 'white',
                      }}
                    />
                  }
                  tooltipFill="rgba(112,112,112,0.85)"
                />

                {/* CCT Chromatic with wave thumb */}
                <Slider
                  value={cctTemp}
                  onChange={(v) => {
                    if (!circAuto) onCctTempChange(v)
                  }}
                  disabled={circAuto}
                  trackH={3}
                  trackBg="transparent"
                  trackFill={
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to right, #FF8800, #FFFFFF, #88BBFF)',
                        borderRadius: 1.5,
                      }}
                    />
                  }
                  thumbContent={
                    circAuto ? (
                      <CCTThumb borderColor={cctColor} />
                    ) : (
                      <div
                        style={{
                          width: 13,
                          height: 13,
                          borderRadius: '50%',
                          background: 'white',
                        }}
                      />
                    )
                  }
                  thumbW={circAuto ? 45 : 13}
                  thumbH={circAuto ? 25 : 13}
                  tooltipFill={cctColor}
                  tooltipContent={
                    <span
                      style={{
                        fontFamily: M,
                        fontWeight: 600,
                        fontSize: 13,
                        color: 'black',
                        display: 'block',
                        lineHeight: 1,
                      }}
                    >
                      {kValueLabel(cctTemp / 100)}
                    </span>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Top bars ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          background: '#000',
        }}
      >
        <StatusBar />
        <NavBar onHomeClick={onGoHome} />
      </div>

      {/* ── Home indicator ────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 34,
          zIndex: 20,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: '33.33%',
            right: '33.33%',
            height: 5,
            borderRadius: 2.5,
            background: 'white',
          }}
        />
      </div>
    </div>
  )
}

// ─── Main Screen (Proposal #3 — advanced-only, no inline chromatic controls) ──

function MainScreenThird({
  onGoHome,
  onOpenRgbAdvanced3,
  onOpenCctCircle3,
  centralDim,
  onCentralDimChange,
  fitaBrightness,
  onFitaBrightnessChange,
  pickedColor,
  bancadaOn,
  onBancadaChange,
  cctIntensity,
  onCctIntensityChange,
  circAuto,
  cctColor,
}: {
  onGoHome: () => void
  onOpenRgbAdvanced3: () => void
  onOpenCctCircle3: () => void
  centralDim: number
  onCentralDimChange: (v: number) => void
  fitaBrightness: number
  onFitaBrightnessChange: (v: number) => void
  pickedColor: string
  bancadaOn: boolean
  onBancadaChange: (v: boolean) => void
  cctIntensity: number
  onCctIntensityChange: (v: number) => void
  circAuto: boolean
  cctColor: string
}) {
  return (
    <div
      style={{
        background: '#000',
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: M,
        maxWidth: 393,
        margin: '0 auto',
      }}
    >
      {/* ── Scrollable content ──────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 122,
          bottom: 34,
          left: 0,
          right: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
        }}
      >
        {/* Ambient card */}
        <div style={{ position: 'relative', width: '100%' }}>
          <img
            src={imgVaranda}
            alt="Varanda Gourmet"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 33%, rgba(0,0,0,0) 37%, rgba(0,0,0,0.6) 100%)',
            }}
          />
          <div style={{ position: 'relative' }}>
            <div
              style={{
                padding: '24px 12px 24px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  height: 32,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 2,
                    top: 29,
                    cursor: 'pointer',
                  }}
                >
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                    <path
                      d="M7 13L1 7L7 1"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: M,
                    fontWeight: 600,
                    fontSize: 26,
                    color: 'white',
                    flex: '1 0 0',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Varanda Gourmet
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="11"
                    height="18"
                    viewBox="0 0 11.0001 18"
                    fill="none"
                  >
                    <path d={svgPaths.p9c99c00} fill="white" />
                  </svg>
                  <span
                    style={{
                      fontFamily: M,
                      fontWeight: 600,
                      fontSize: 24,
                      color: 'white',
                      lineHeight: 1,
                    }}
                  >
                    27°
                  </span>
                </div>
              </div>
            </div>
            <ActionMenu
              anyLightOn={
                centralDim > 0 ||
                fitaBrightness > 0 ||
                cctIntensity > 0 ||
                bancadaOn
              }
            />
          </div>
        </div>

        {/* ── Iluminação section ─────────────────────────────────────────────── */}
        <div
          style={{
            padding: '31px 31px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          {/* Label */}
          <div
            style={{
              position: 'relative',
              height: 25,
              width: '100%',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #7D7D7D',
            }}
          >
            <span
              style={{
                fontFamily: M,
                fontWeight: 700,
                fontSize: 10,
                color: '#B7B7B7',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: 'normal',
              }}
            >
              Luminárias
            </span>
          </div>

          {/* Luminarias list */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 32,
              width: '100%',
            }}
          >
            {/* ── Central ──────────────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <LumHeader name="Central" />
              <Slider
                value={centralDim}
                onChange={onCentralDimChange}
                thumbColor="#FFCC33"
                tooltipFill="rgba(112,112,112,0.85)"
              />
            </div>

            {/* ── Fita LED ─────────────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <LumHeader
                name="Fita LED"
                extra={<GearIcon onClick={onOpenRgbAdvanced3} />}
              />
              <Slider
                value={fitaBrightness}
                onChange={onFitaBrightnessChange}
                trackFill={
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${fitaBrightness}%`,
                      background: pickedColor,
                      borderRadius: 1.5,
                    }}
                  />
                }
                thumbColor={pickedColor}
                thumbContent={
                  <div
                    style={{
                      width: 13,
                      height: 13,
                      borderRadius: '50%',
                      background: 'white',
                    }}
                  />
                }
                tooltipFill="rgba(112,112,112,0.85)"
              />
            </div>

            {/* ── Bancada ON/OFF ────────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <LumHeader name="Bancada" />
              <button
                onClick={() => onBancadaChange(!bancadaOn)}
                style={{
                  width: '100%',
                  height: 23,
                  background: 'none',
                  border: 'none',
                  padding: '5px 0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    flex: '1 0 0',
                    height: 13,
                    borderRadius: 4,
                    background: bancadaOn ? '#FFCC33' : 'transparent',
                    border: `1px solid ${bancadaOn ? '#FFCC33' : 'white'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s ease, border-color 0.2s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: M,
                      fontWeight: 600,
                      fontSize: 10,
                      color: bancadaOn ? 'black' : 'white',
                      lineHeight: 1,
                    }}
                  >
                    {bancadaOn ? 'ON' : 'OFF'}
                  </span>
                </div>
              </button>
            </div>

            {/* ── LED CCT/Circadiano ────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <LumHeader
                name="LED CCT/Circadiano"
                extra={
                  <button
                    onClick={onOpenCctCircle3}
                    style={{
                      background: circAuto ? '#FFCC33' : 'transparent',
                      border: `1px solid ${circAuto ? '#FFCC33' : 'white'}`,
                      height: 22,
                      borderRadius: 4,
                      padding: '0 7px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      minWidth: 50,
                      cursor: 'pointer',
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: M,
                        fontWeight: 600,
                        fontSize: 10,
                        color: circAuto ? 'black' : 'white',
                        textAlign: 'center',
                      }}
                    >
                      CIRC.
                    </span>
                  </button>
                }
              />
              <Slider
                value={cctIntensity}
                onChange={onCctIntensityChange}
                trackFill={
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${cctIntensity}%`,
                      background: cctColor,
                      borderRadius: 1.5,
                    }}
                  />
                }
                thumbColor={cctColor}
                thumbContent={
                  <div
                    style={{
                      width: 13,
                      height: 13,
                      borderRadius: '50%',
                      background: 'white',
                    }}
                  />
                }
                tooltipFill="rgba(112,112,112,0.85)"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Top bars ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          background: '#000',
        }}
      >
        <StatusBar />
        <NavBar onHomeClick={onGoHome} />
      </div>

      {/* ── Home indicator ────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 34,
          zIndex: 20,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: '33.33%',
            right: '33.33%',
            height: 5,
            borderRadius: 2.5,
            background: 'white',
          }}
        />
      </div>
    </div>
  )
}

// ─── RGB Advanced Screen (Classic) ────────────────────────────────────────────

function RGBAdvancedScreenClassic({
  onBack,
  brightness,
  onBrightnessChange,
  wheelPos,
  onWheelColorChange,
  pickedColor,
}: {
  onBack: () => void
  brightness: number
  onBrightnessChange: (v: number) => void
  wheelPos: { x: number; y: number }
  onWheelColorChange: (
    hue: number,
    sat: number,
    rawX: number,
    rawY: number,
  ) => void
  pickedColor: string
}) {
  const [activeScene, setActiveScene] = useState<string | null>(null)
  const wheelRef = useRef<HTMLDivElement>(null)

  const moveSelector = (clientX: number, clientY: number) => {
    if (!wheelRef.current || activeScene !== null) return
    const rect = wheelRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    let dx = clientX - cx
    let dy = clientY - cy
    const d = Math.sqrt(dx * dx + dy * dy)
    if (d > 150) {
      dx = (dx / d) * 150
      dy = (dy / d) * 150
    }
    const sat = Math.min(Math.sqrt(dx * dx + dy * dy) / 150, 1)
    const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI)
    const hue = (((angleDeg + 90) % 360) + 360) % 360
    onWheelColorChange(hue, sat, dx, dy)
  }

  const scenes = ['FESTA', 'CICLO RGB', 'MIX 1', 'MIX 2']
  const wheelDisabled = activeScene !== null

  return (
    <div
      style={{
        background: '#000',
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: M,
        maxWidth: 393,
        margin: '0 auto',
      }}
    >
      {/* ── Scrollable content ───────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 106,
          bottom: 34,
          left: 0,
          right: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
        }}
      >
        <div
          style={{
            padding: '24px 31px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            alignItems: 'center',
          }}
        >
          {/* Section label */}
          <div
            style={{
              height: 25,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #7D7D7D',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: M,
                fontWeight: 700,
                fontSize: 10,
                color: '#B7B7B7',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Modo avançado
            </span>
          </div>

          {/* ── Color wheel ────────────────────────────────────────────────────── */}
          <div
            ref={wheelRef}
            style={{
              position: 'relative',
              width: 300,
              height: 300,
              borderRadius: '50%',
              flexShrink: 0,
              cursor: wheelDisabled ? 'default' : 'crosshair',
              touchAction: 'none',
              userSelect: 'none',
            }}
            onPointerDown={(e) => {
              if (wheelDisabled) return
              e.currentTarget.setPointerCapture(e.pointerId)
              moveSelector(e.clientX, e.clientY)
            }}
            onPointerMove={(e) => {
              if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
              moveSelector(e.clientX, e.clientY)
            }}
          >
            {/* Hue image (rotated -90deg to match Figma) */}
            <img
              src={imgMatizes}
              alt=""
              draggable={false}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                transform: 'rotate(-90deg)',
                pointerEvents: 'none',
                opacity: wheelDisabled ? 0.35 : 1,
                transition: 'opacity 0.25s ease',
              }}
            />
            {/* White radial gradient: center white → transparent at edge */}
            <svg
              style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
              width="300"
              height="300"
              viewBox="0 0 300 300"
            >
              <defs>
                <radialGradient id="rgbWhiteGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="white" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle
                cx="150"
                cy="150"
                r="150"
                fill="url(#rgbWhiteGrad)"
                opacity={wheelDisabled ? 0.35 : 1}
                style={{ transition: 'opacity 0.25s ease' }}
              />
            </svg>

            {/* Selector handle — color computed directly from wheel position for zero lag */}
            {(() => {
              const d = Math.sqrt(wheelPos.x ** 2 + wheelPos.y ** 2)
              const sat = Math.min(d / 150, 1)
              const hue =
                ((Math.atan2(wheelPos.y, wheelPos.x) * 180) / Math.PI +
                  90 +
                  360) %
                360
              const selectorColor = wheelDisabled
                ? 'rgba(255,255,255,0.1)'
                : hslToBlendedColor(hue, sat)
              return (
                <div
                  style={{
                    position: 'absolute',
                    left: 150 + wheelPos.x - 16,
                    top: 150 + wheelPos.y - 16,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: selectorColor,
                    border: '3px solid white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.45)',
                    pointerEvents: 'none',
                  }}
                />
              )
            })()}
          </div>

          {/* ── Intensity slider ────────────────────────────────────────────────── */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <LumHeader name="Intensidade" />
            <Slider
              value={brightness}
              onChange={onBrightnessChange}
              trackFill={
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${brightness}%`,
                    background: pickedColor,
                    borderRadius: 1.5,
                  }}
                />
              }
              thumbColor={pickedColor}
              thumbContent={
                <div
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: '50%',
                    background: 'white',
                  }}
                />
              }
              tooltipFill="rgba(112,112,112,0.85)"
            />
          </div>

          {/* ── Scene buttons ───────────────────────────────────────────────────── */}
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
            }}
          >
            {scenes.map((scene) => {
              const active = activeScene === scene
              return (
                <button
                  key={scene}
                  onClick={() => setActiveScene(active ? null : scene)}
                  style={{
                    height: 50,
                    borderRadius: 4,
                    background: active ? '#FFCC33' : 'transparent',
                    border: `1px solid ${active ? '#FFCC33' : 'white'}`,
                    color: active ? 'black' : 'white',
                    fontFamily: M,
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: 'pointer',
                    transition:
                      'background 0.18s ease, border-color 0.18s ease, color 0.18s ease',
                  }}
                >
                  {scene}
                </button>
              )
            })}

            {/* OFF — full width, active when no scene selected */}
            <button
              onClick={() => setActiveScene(null)}
              style={{
                gridColumn: '1 / -1',
                height: 50,
                borderRadius: 4,
                background: activeScene === null ? '#FFCC33' : 'transparent',
                border: `1px solid ${
                  activeScene === null ? '#FFCC33' : 'white'
                }`,
                color: activeScene === null ? 'black' : 'white',
                fontFamily: M,
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                transition:
                  'background 0.18s ease, border-color 0.18s ease, color 0.18s ease',
              }}
            >
              OFF
            </button>
          </div>
        </div>
      </div>

      {/* ── Top bars ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          background: '#000',
        }}
      >
        {/* Status bar */}
        <StatusBar />

        {/* Title bar */}
        <div
          style={{
            height: 56,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={onBack}
            style={{
              position: 'absolute',
              left: 12,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path
                d="M9 17L1 9L9 1"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
          <span
            style={{
              fontFamily: M,
              fontWeight: 600,
              fontSize: 16,
              color: '#A5A5A5',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Fita LED
          </span>
        </div>
      </div>

      {/* ── Home indicator ────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 34,
          zIndex: 20,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: '33.33%',
            right: '33.33%',
            height: 5,
            borderRadius: 2.5,
            background: 'white',
          }}
        />
      </div>
    </div>
  )
}

// ─── RGB Advanced Screen (Proposal #3 — no scene presets, adds color swatch) ──

function RGBAdvancedScreen3({
  onBack,
  brightness,
  onBrightnessChange,
  wheelPos,
  onWheelColorChange,
  pickedColor,
}: {
  onBack: () => void
  brightness: number
  onBrightnessChange: (v: number) => void
  wheelPos: { x: number; y: number }
  onWheelColorChange: (
    hue: number,
    sat: number,
    rawX: number,
    rawY: number,
  ) => void
  pickedColor: string
}) {
  const wheelRef = useRef<HTMLDivElement>(null)
  // Dim the wheel to 50% when the strip is fully off, same as proposal #2
  const wheelOpacity = brightness === 0 ? 0.5 : 1

  const moveSelector = (clientX: number, clientY: number) => {
    if (!wheelRef.current) return
    const rect = wheelRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    let dx = clientX - cx
    let dy = clientY - cy
    const d = Math.sqrt(dx * dx + dy * dy)
    if (d > 150) {
      dx = (dx / d) * 150
      dy = (dy / d) * 150
    }
    const sat = Math.min(Math.sqrt(dx * dx + dy * dy) / 150, 1)
    const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI)
    const hue = (((angleDeg + 90) % 360) + 360) % 360
    onWheelColorChange(hue, sat, dx, dy)
  }

  return (
    <div
      style={{
        background: '#000',
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: M,
        maxWidth: 393,
        margin: '0 auto',
      }}
    >
      {/* ── Scrollable content ───────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 106,
          bottom: 34,
          left: 0,
          right: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
        }}
      >
        <div
          style={{
            padding: '24px 31px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            alignItems: 'center',
          }}
        >
          {/* Section label */}
          <div
            style={{
              height: 25,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #7D7D7D',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: M,
                fontWeight: 700,
                fontSize: 10,
                color: '#B7B7B7',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Modo avançado
            </span>
          </div>

          {/* ── Color wheel ────────────────────────────────────────────────────── */}
          <div
            ref={wheelRef}
            style={{
              position: 'relative',
              width: 300,
              height: 300,
              borderRadius: '50%',
              flexShrink: 0,
              cursor: 'crosshair',
              touchAction: 'none',
              userSelect: 'none',
              opacity: wheelOpacity,
              transition: 'opacity 0.2s ease',
            }}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId)
              moveSelector(e.clientX, e.clientY)
            }}
            onPointerMove={(e) => {
              if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
              moveSelector(e.clientX, e.clientY)
            }}
          >
            {/* Hue image (rotated -90deg to match Figma) */}
            <img
              src={imgMatizes}
              alt=""
              draggable={false}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                transform: 'rotate(-90deg)',
                pointerEvents: 'none',
              }}
            />
            {/* White radial gradient: center white → transparent at edge */}
            <svg
              style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
              width="300"
              height="300"
              viewBox="0 0 300 300"
            >
              <defs>
                <radialGradient id="rgbWhiteGrad3" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="white" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="150" cy="150" r="150" fill="url(#rgbWhiteGrad3)" />
            </svg>

            {/* Selector handle — color computed directly from wheel position for zero lag */}
            {(() => {
              const d = Math.sqrt(wheelPos.x ** 2 + wheelPos.y ** 2)
              const sat = Math.min(d / 150, 1)
              const hue =
                ((Math.atan2(wheelPos.y, wheelPos.x) * 180) / Math.PI +
                  90 +
                  360) %
                360
              const selectorColor = hslToBlendedColor(hue, sat)
              return (
                <div
                  style={{
                    position: 'absolute',
                    left: 150 + wheelPos.x - 16,
                    top: 150 + wheelPos.y - 16,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: selectorColor,
                    border: '3px solid white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.45)',
                    pointerEvents: 'none',
                  }}
                />
              )
            })()}
          </div>

          {/* ── Color preview swatch ───────────────────────────────────────────── */}
          <div
            style={{
              width: '100%',
              height: 50,
              borderRadius: 4,
              background: pickedColor,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: wheelOpacity,
              transition: 'opacity 0.2s ease',
            }}
          >
            <span
              style={{
                fontFamily: M,
                fontWeight: 600,
                fontSize: 16,
                color: contrastTextColor(pickedColor),
              }}
            >
              {rgbStringToHex(pickedColor)}
            </span>
          </div>

          {/* ── Intensity slider ────────────────────────────────────────────────── */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <LumHeader name="Intensidade" />
            <Slider
              value={brightness}
              onChange={onBrightnessChange}
              trackFill={
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${brightness}%`,
                    background: pickedColor,
                    borderRadius: 1.5,
                  }}
                />
              }
              thumbColor={pickedColor}
              thumbContent={
                <div
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: '50%',
                    background: 'white',
                  }}
                />
              }
              tooltipFill="rgba(112,112,112,0.85)"
            />
          </div>
        </div>
      </div>

      {/* ── Top bars ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          background: '#000',
        }}
      >
        {/* Status bar */}
        <StatusBar />

        {/* Title bar */}
        <div
          style={{
            height: 56,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={onBack}
            style={{
              position: 'absolute',
              left: 12,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path
                d="M9 17L1 9L9 1"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
          <span
            style={{
              fontFamily: M,
              fontWeight: 600,
              fontSize: 16,
              color: '#A5A5A5',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Fita LED
          </span>
        </div>
      </div>

      {/* ── Home indicator ────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 34,
          zIndex: 20,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: '33.33%',
            right: '33.33%',
            height: 5,
            borderRadius: 2.5,
            background: 'white',
          }}
        />
      </div>
    </div>
  )
}

// ─── RGB 2 Advanced Screen (Classic — hue ring + separate saturation slider) ──

function RGB2AdvancedScreenClassic({
  onBack,
  brightness,
  onBrightnessChange,
  ringAngle,
  onRingAngleChange,
  sat,
  onSatChange,
}: {
  onBack: () => void
  brightness: number
  onBrightnessChange: (v: number) => void
  ringAngle: number
  onRingAngleChange: (deg: number) => void
  sat: number
  onSatChange: (v: number) => void
}) {
  const pickedColor = hslToBlendedColor(ringAngle, sat)
  const pureHueColor = hslToBlendedColor(ringAngle, 1)

  return (
    <div
      style={{
        background: '#000',
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: M,
        maxWidth: 393,
        margin: '0 auto',
      }}
    >
      {/* ── Scrollable content ───────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 106,
          bottom: 34,
          left: 0,
          right: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
        }}
      >
        <div
          style={{
            padding: '24px 31px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            alignItems: 'center',
          }}
        >
          {/* Section label */}
          <div
            style={{
              height: 25,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #7D7D7D',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: M,
                fontWeight: 700,
                fontSize: 10,
                color: '#B7B7B7',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Modo avançado
            </span>
          </div>

          {/* ── Hue ring + saturation slider ─────────────────────────────────── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '0 12px',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: 240,
                height: 240,
                flexShrink: 0,
              }}
            >
              <img
                src={imgAnelCromatico}
                alt=""
                draggable={false}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  transform: 'rotate(-90deg)',
                  pointerEvents: 'none',
                }}
              />
              <RingHueHandle
                angleDeg={ringAngle}
                onDrag={onRingAngleChange}
                color={pickedColor}
              />
            </div>
            <VerticalSatSlider
              value={Math.round(sat * 100)}
              onChange={(v) => onSatChange(v / 100)}
              topColor={pureHueColor}
              thumbColor={pickedColor}
            />
          </div>

          {/* ── Intensity slider ────────────────────────────────────────────────── */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <LumHeader name="Intensidade" />
            <Slider
              value={brightness}
              onChange={onBrightnessChange}
              trackFill={
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${brightness}%`,
                    background: pickedColor,
                    borderRadius: 1.5,
                  }}
                />
              }
              thumbColor={pickedColor}
              thumbContent={
                <div
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: '50%',
                    background: 'white',
                  }}
                />
              }
              tooltipFill="rgba(112,112,112,0.85)"
            />
          </div>
        </div>
      </div>

      {/* ── Top bars ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          background: '#000',
        }}
      >
        {/* Status bar */}
        <StatusBar />

        {/* Title bar */}
        <div
          style={{
            height: 56,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={onBack}
            style={{
              position: 'absolute',
              left: 12,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path
                d="M9 17L1 9L9 1"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
          <span
            style={{
              fontFamily: M,
              fontWeight: 600,
              fontSize: 16,
              color: '#A5A5A5',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Fita LED 2
          </span>
        </div>
      </div>

      {/* ── Home indicator ────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 34,
          zIndex: 20,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: '33.33%',
            right: '33.33%',
            height: 5,
            borderRadius: 2.5,
            background: 'white',
          }}
        />
      </div>
    </div>
  )
}

// ─── RGB 2 Advanced Screen (hue ring + separate saturation slider) ───────────

// Fixed radius (px from ring center) where the hue handle sits, on the ring band
const RING2_RADIUS = 102

// Visible handle diameter (28px circle + 2px stroke), centered exactly on the ring point
const RING2_HANDLE_SIZE = 30

function RingHueHandle({
  angleDeg,
  onDrag,
  color,
  center = 120,
  radius = RING2_RADIUS,
  handleSize = RING2_HANDLE_SIZE,
}: {
  angleDeg: number
  onDrag: (deg: number) => void
  color: string
  center?: number
  radius?: number
  handleSize?: number
}) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180
  const x = center + radius * Math.cos(angleRad)
  const y = center + radius * Math.sin(angleRad)
  const containerRef = useRef<HTMLElement | null>(null)

  return (
    <div
      style={{
        position: 'absolute',
        left: x - handleSize / 2,
        top: y - handleSize / 2,
        width: handleSize,
        height: handleSize,
        touchAction: 'none',
        userSelect: 'none',
        cursor: 'grab',
        zIndex: 10,
      }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        containerRef.current = e.currentTarget.parentElement
      }}
      onPointerMove={(e) => {
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
        const container = containerRef.current
        if (!container) return
        const rect = container.getBoundingClientRect()
        const dx = e.clientX - (rect.left + rect.width / 2)
        const dy = e.clientY - (rect.top + rect.height / 2)
        const deg = ((Math.atan2(dy, dx) * 180) / Math.PI + 90 + 360) % 360
        onDrag(deg)
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: color,
          border: '2px solid white',
          boxSizing: 'border-box',
          boxShadow: '0 3.2px 3.2px rgba(0,0,0,0.5)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

function VerticalSatSlider({
  value,
  onChange,
  topColor,
  thumbColor,
  bottomColor = 'white',
  width = 36,
  height = 240,
  thumbSize = 30,
  showValue = false,
  opacity = 1,
}: {
  value: number
  onChange: (v: number) => void
  topColor: string
  thumbColor: string
  bottomColor?: string
  width?: number
  height?: number
  thumbSize?: number
  showValue?: boolean
  opacity?: number
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const THUMB = thumbSize
  // Keeps the thumb's edge 3px shy of the track's top/bottom so it never touches the rounded ends
  const END_MARGIN = 3

  const getVal = useCallback(
    (clientY: number) => {
      if (!trackRef.current) return value
      const r = trackRef.current.getBoundingClientRect()
      const usable = r.height - THUMB - END_MARGIN * 2
      return Math.round(
        clamp(
          1 - (clientY - r.top - THUMB / 2 - END_MARGIN) / usable,
          0,
          1,
        ) * 100,
      )
    },
    [value],
  )

  return (
    <div
      ref={trackRef}
      style={{
        position: 'relative',
        width,
        height,
        borderRadius: width / 2,
        flexShrink: 0,
        background: `linear-gradient(to bottom, ${topColor} 0%, ${bottomColor} 100%)`,
        touchAction: 'none',
        userSelect: 'none',
        opacity,
        transition: 'opacity 0.2s ease',
      }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        setDragging(true)
        onChange(getVal(e.clientY))
      }}
      onPointerMove={(e) => {
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
        onChange(getVal(e.clientY))
      }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: `calc(${THUMB / 2 + END_MARGIN}px + ${1 - value / 100} * (100% - ${THUMB + END_MARGIN * 2}px))`,
          transform: 'translate(-50%, -50%)',
          width: THUMB,
          height: THUMB,
          borderRadius: '50%',
          background: thumbColor,
          border: '2px solid white',
          boxSizing: 'border-box',
          boxShadow: '0 3px 3px rgba(0,0,0,0.35)',
          pointerEvents: 'none',
        }}
      >
        {showValue && (
          <DropBalloon visible={dragging} fill="rgba(112,112,112,0.85)">
            <span
              style={{
                fontFamily: M,
                fontWeight: 600,
                fontSize: 16,
                color: 'white',
                display: 'block',
                lineHeight: 1,
              }}
            >
              {value}
            </span>
          </DropBalloon>
        )}
      </div>
    </div>
  )
}

// ─── CCT Advanced Screen ──────────────────────────────────────────────────────

// Margin so handles never reach the very tip of the arc image (one step ≈ 0.01)
const CCT_MARGIN = 0.01

function cctTToPos(t: number): { x: number; y: number } {
  const arcT = CCT_MARGIN + t * (1 - 2 * CCT_MARGIN)
  const angleDeg = 135 + 270 * arcT
  const angleRad = (angleDeg * Math.PI) / 180
  return {
    x: 150 + 126 * Math.cos(angleRad),
    y: 150 + 126 * Math.sin(angleRad),
  }
}

function cctPosToT(dx: number, dy: number): number {
  let angle = (Math.atan2(dy, dx) * 180) / Math.PI
  angle = (angle + 360) % 360
  let arc = (angle - 135 + 360) % 360
  if (arc > 270) arc = arc > 315 ? 0 : 270
  const rawT = arc / 270
  return clamp((rawT - CCT_MARGIN) / (1 - 2 * CCT_MARGIN), 0, 1)
}

function kValueLabel(t: number): string {
  return cctTempToK(t * 100) + 'K'
}

function CctArcHandle({
  t,
  onDrag,
  fillColor,
}: {
  t: number
  onDrag: (newT: number) => void
  fillColor: string
}) {
  const pos = cctTToPos(t)
  const containerRef = useRef<HTMLElement | null>(null)

  return (
    <div
      style={{
        position: 'absolute',
        left: pos.x - 18,
        top: pos.y - 18,
        width: 36,
        height: 36,
        touchAction: 'none',
        userSelect: 'none',
        zIndex: 10,
        cursor: 'grab',
      }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        containerRef.current = e.currentTarget.parentElement
      }}
      onPointerMove={(e) => {
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
        const container = containerRef.current
        if (!container) return
        const rect = container.getBoundingClientRect()
        const dx = e.clientX - (rect.left + rect.width / 2)
        const dy = e.clientY - (rect.top + rect.height / 2)
        onDrag(cctPosToT(dx, dy))
      }}
    >
      <svg
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
        style={{
          position: 'absolute',
          left: -8,
          top: -4,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <filter
            id="cct-dropshadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="4"
              floodColor="rgba(0,0,0,0.5)"
            />
          </filter>
        </defs>
        <circle
          cx="26"
          cy="22"
          r="16.5"
          stroke="white"
          strokeWidth="3"
          fill={fillColor}
          filter="url(#cct-dropshadow)"
        />
      </svg>
    </div>
  )
}

function CctAdvancedScreen({
  onBack,
  circAuto,
  onCircAutoChange,
  cctTemp,
  onCctTempChange,
  cctTempMin,
  onCctTempMinChange,
  cctTempMax,
  onCctTempMaxChange,
  cctIntensity,
  onCctIntensityChange,
}: {
  onBack: () => void
  circAuto: boolean
  onCircAutoChange: (v: boolean) => void
  cctTemp: number
  onCctTempChange: (v: number) => void
  cctTempMin: number
  onCctTempMinChange: (v: number) => void
  cctTempMax: number
  onCctTempMaxChange: (v: number) => void
  cctIntensity: number
  onCctIntensityChange: (v: number) => void
}) {
  const [showDialog, setShowDialog] = useState(false)
  const color = cctToColor(cctTemp)
  const singleT = cctTemp / 100
  const minT = cctTempMin / 100
  const maxT = cctTempMax / 100
  const centerLabel = circAuto
    ? `${kValueLabel(minT)}–\n${kValueLabel(maxT)}`
    : kValueLabel(singleT)

  return (
    <div
      style={{
        background: '#000',
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: M,
        maxWidth: 393,
        margin: '0 auto',
      }}
    >
      {/* Scrollable content */}
      <div
        style={{
          position: 'absolute',
          top: 106,
          bottom: 34,
          left: 0,
          right: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
        }}
      >
        <div
          style={{
            padding: '24px 31px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            alignItems: 'center',
          }}
        >
          {/* Section header */}
          <div
            style={{
              height: 25,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #7D7D7D',
            }}
          >
            <span
              style={{
                fontFamily: M,
                fontWeight: 700,
                fontSize: 10,
                color: '#B7B7B7',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Modo circadiano
            </span>
            <button
              onClick={() => setShowDialog(true)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9.5" stroke="#666666" />
                <path
                  d="M9.05216 11.566C9.05216 11.2393 9.1035 10.95 9.20616 10.698C9.31816 10.446 9.4535 10.222 9.61216 10.026C9.78016 9.83 9.9575 9.648 10.1442 9.48C10.3308 9.312 10.5035 9.15333 10.6622 9.004C10.8302 8.84533 10.9655 8.682 11.0682 8.514C11.1802 8.346 11.2362 8.15933 11.2362 7.954C11.2362 7.618 11.0962 7.34733 10.8162 7.142C10.5455 6.93667 10.1815 6.834 9.72416 6.834C9.2855 6.834 8.8935 6.92733 8.54816 7.114C8.20283 7.29133 7.91816 7.54333 7.69416 7.87L6.00016 6.876C6.3735 6.30667 6.8915 5.854 7.55416 5.518C8.21683 5.17267 9.0195 5 9.96216 5C10.6622 5 11.2782 5.10267 11.8102 5.308C12.3422 5.504 12.7575 5.79333 13.0562 6.176C13.3642 6.55867 13.5182 7.03 13.5182 7.59C13.5182 7.954 13.4622 8.276 13.3502 8.556C13.2382 8.836 13.0935 9.07867 12.9162 9.284C12.7388 9.48933 12.5475 9.68067 12.3422 9.858C12.1462 10.0353 11.9595 10.208 11.7822 10.376C11.6048 10.544 11.4555 10.7213 11.3342 10.908C11.2222 11.0947 11.1662 11.314 11.1662 11.566H9.05216ZM10.1162 15.08C9.72416 15.08 9.40216 14.954 9.15016 14.702C8.89816 14.45 8.77216 14.1513 8.77216 13.806C8.77216 13.4513 8.89816 13.1573 9.15016 12.924C9.40216 12.6813 9.72416 12.56 10.1162 12.56C10.5175 12.56 10.8395 12.6813 11.0822 12.924C11.3342 13.1573 11.46 13.4513 11.46 13.806C11.46 14.1513 11.3342 14.45 11.0822 14.702C10.8395 14.954 10.5175 15.08 10.1162 15.08Z"
                  fill="#666666"
                />
              </svg>
            </button>
          </div>

          {/* Checkbox row */}
          <button
            onClick={() => onCircAutoChange(!circAuto)}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            <span
              style={{
                fontFamily: M,
                fontWeight: 600,
                fontSize: 16,
                color: 'white',
              }}
            >
              Ativar iluminação circadiana
            </span>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 2,
                border: '2px solid white',
                background: circAuto ? 'white' : 'transparent',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s ease',
              }}
            >
              {circAuto && (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path
                    d="M1 5.96789L3.85933 9.00001L11 1.00001"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </div>
          </button>

          {/* Arc selector */}
          <div
            style={{
              position: 'relative',
              width: 300,
              height: 300,
              flexShrink: 0,
              userSelect: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: '12.95%',
              }}
            >
              <img
                src={imgCctArc}
                alt=""
                draggable={false}
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  objectFit: 'contain',
                }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                textAlign: 'center',
                fontFamily: M,
                fontWeight: 600,
                fontSize: 24,
                color: 'white',
                pointerEvents: 'none',
                whiteSpace: 'pre-line',
                lineHeight: 1.3,
              }}
            >
              {centerLabel}
            </div>
            {circAuto ? (
              <>
                <CctArcHandle
                  t={minT}
                  fillColor={cctToColor(cctTempMin)}
                  onDrag={(newT) =>
                    onCctTempMinChange(
                      Math.round(snapCctTemp(Math.min(newT, maxT - 0.01) * 100)),
                    )
                  }
                />
                <CctArcHandle
                  t={maxT}
                  fillColor={cctToColor(cctTempMax)}
                  onDrag={(newT) =>
                    onCctTempMaxChange(
                      Math.round(snapCctTemp(Math.max(newT, minT + 0.01) * 100)),
                    )
                  }
                />
              </>
            ) : (
              <CctArcHandle
                t={singleT}
                fillColor={cctToColor(cctTemp)}
                onDrag={(newT) =>
                  onCctTempChange(Math.round(snapCctTemp(newT * 100)))
                }
              />
            )}
          </div>

          {/* Intensity slider */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <LumHeader name="Intensidade" />
            <Slider
              value={cctIntensity}
              onChange={onCctIntensityChange}
              trackFill={
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${cctIntensity}%`,
                    background: color,
                    borderRadius: 1.5,
                  }}
                />
              }
              thumbColor={color}
              thumbContent={
                <div
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: '50%',
                    background: 'white',
                  }}
                />
              }
              tooltipFill="rgba(112,112,112,0.85)"
            />
          </div>
        </div>
      </div>

      {/* Top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          background: '#000',
        }}
      >
        <StatusBar />
        <div
          style={{
            height: 56,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={onBack}
            style={{
              position: 'absolute',
              left: 12,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path
                d="M9 17L1 9L9 1"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
          <span
            style={{
              fontFamily: M,
              fontWeight: 600,
              fontSize: 16,
              color: '#A5A5A5',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            LED CCT/Circadiano
          </span>
        </div>
      </div>

      {/* Home indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 34,
          zIndex: 20,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: '33.33%',
            right: '33.33%',
            height: 5,
            borderRadius: 2.5,
            background: 'white',
          }}
        />
      </div>

      {/* Dialog */}
      {showDialog && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 40px',
          }}
          onClick={() => setShowDialog(false)}
        >
          <div
            style={{
              background: '#252525',
              borderRadius: 9,
              padding: '36px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 28,
              width: '100%',
              maxWidth: 313,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              style={{
                fontFamily: M,
                fontWeight: 600,
                fontSize: 14,
                color: 'white',
                textAlign: 'center',
                lineHeight: 1.5,
                maxWidth: 247,
              }}
            >
              Ao ativar a iluminação circadiana, defina a tonalidade mais quente
              e a mais fria
            </span>
            <button
              onClick={() => setShowDialog(false)}
              style={{
                height: 32,
                width: 161,
                borderRadius: 4,
                background: 'transparent',
                border: '1px solid white',
                cursor: 'pointer',
                fontFamily: M,
                fontWeight: 600,
                fontSize: 14,
                color: 'white',
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Circadian Circle Screen (Proposal #3 — vertical-drag circle replaces the 270° arc) ──

const CCT_CIRCLE_RADIUS = 150

// Vertical position (offset from circle center) for a given 0-1 temp fraction.
// t=1 (coolest) sits at the top (negative y); t=0 (warmest) sits at the bottom.
function cctTToCircleY(t: number): number {
  return CCT_CIRCLE_RADIUS - t * (2 * CCT_CIRCLE_RADIUS)
}

// Inverse of the above: clamps dy to the circle's vertical diameter, returns 0-1.
function cctCircleDyToT(dy: number): number {
  const clamped = clamp(dy, -CCT_CIRCLE_RADIUS, CCT_CIRCLE_RADIUS)
  return 1 - (clamped + CCT_CIRCLE_RADIUS) / (2 * CCT_CIRCLE_RADIUS)
}

function CctCircleHandle({ y, fillColor }: { y: number; fillColor: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: CCT_CIRCLE_RADIUS - 16,
        top: CCT_CIRCLE_RADIUS + y - 16,
        width: 32,
        height: 32,
        pointerEvents: 'none',
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        style={{ position: 'absolute', left: -8, top: -8 }}
      >
        <defs>
          <filter
            id="cct-circle-dropshadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="4"
              floodColor="rgba(0,0,0,0.5)"
            />
          </filter>
        </defs>
        <circle
          cx="24"
          cy="24"
          r="14.5"
          stroke="white"
          strokeWidth="3"
          fill={fillColor}
          filter="url(#cct-circle-dropshadow)"
        />
      </svg>
    </div>
  )
}

function CctCircleScreen3({
  onBack,
  circAuto,
  onCircAutoChange,
  cctTemp,
  onCctTempChange,
  cctTempMin,
  onCctTempMinChange,
  cctTempMax,
  onCctTempMaxChange,
  cctIntensity,
  onCctIntensityChange,
}: {
  onBack: () => void
  circAuto: boolean
  onCircAutoChange: (v: boolean) => void
  cctTemp: number
  onCctTempChange: (v: number) => void
  cctTempMin: number
  onCctTempMinChange: (v: number) => void
  cctTempMax: number
  onCctTempMaxChange: (v: number) => void
  cctIntensity: number
  onCctIntensityChange: (v: number) => void
}) {
  const [showDialog, setShowDialog] = useState(false)
  const color = cctToColor(cctTemp)
  const singleT = cctTemp / 100
  const minT = cctTempMin / 100
  const maxT = cctTempMax / 100
  // Where the live-animating cctTemp currently sits between min and max (0-1),
  // used to slide the circadian icon across the label as it sweeps
  const cctFraction =
    cctTempMax > cctTempMin
      ? clamp((cctTemp - cctTempMin) / (cctTempMax - cctTempMin), 0, 1)
      : 0.5
  // Dim the circle to 50% when the strip is fully off, same as proposal #2
  const circleOpacity = cctIntensity === 0 ? 0.5 : 1

  const circleRef = useRef<HTMLDivElement>(null)
  // Which handle the current drag gesture is moving — chosen by proximity on
  // pointer-down since the whole circle (not just the handle) accepts taps
  const draggingHandle = useRef<'single' | 'min' | 'max' | null>(null)

  const applyDrag = (t: number) => {
    if (draggingHandle.current === 'single') {
      onCctTempChange(Math.round(snapCctTemp(t * 100)))
    } else if (draggingHandle.current === 'min') {
      onCctTempMinChange(
        Math.round(snapCctTemp(Math.min(t, maxT - 0.01) * 100)),
      )
    } else if (draggingHandle.current === 'max') {
      onCctTempMaxChange(
        Math.round(snapCctTemp(Math.max(t, minT + 0.01) * 100)),
      )
    }
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!circleRef.current) return
    e.currentTarget.setPointerCapture(e.pointerId)
    const rect = circleRef.current.getBoundingClientRect()
    const dy = e.clientY - (rect.top + rect.height / 2)
    if (circAuto) {
      const minY = cctTToCircleY(minT)
      const maxY = cctTToCircleY(maxT)
      draggingHandle.current =
        Math.abs(dy - minY) <= Math.abs(dy - maxY) ? 'min' : 'max'
    } else {
      draggingHandle.current = 'single'
    }
    applyDrag(cctCircleDyToT(dy))
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
    if (!circleRef.current || !draggingHandle.current) return
    const rect = circleRef.current.getBoundingClientRect()
    const dy = e.clientY - (rect.top + rect.height / 2)
    applyDrag(cctCircleDyToT(dy))
  }

  const clearDrag = () => {
    draggingHandle.current = null
  }

  return (
    <div
      style={{
        background: '#000',
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: M,
        maxWidth: 393,
        margin: '0 auto',
      }}
    >
      {/* Scrollable content */}
      <div
        style={{
          position: 'absolute',
          top: 106,
          bottom: 34,
          left: 0,
          right: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
        }}
      >
        <div
          style={{
            padding: '24px 31px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            alignItems: 'center',
          }}
        >
          {/* Section header */}
          <div
            style={{
              height: 25,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #7D7D7D',
            }}
          >
            <span
              style={{
                fontFamily: M,
                fontWeight: 700,
                fontSize: 10,
                color: '#B7B7B7',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Modo circadiano
            </span>
            <button
              onClick={() => setShowDialog(true)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9.5" stroke="#666666" />
                <path
                  d="M9.05216 11.566C9.05216 11.2393 9.1035 10.95 9.20616 10.698C9.31816 10.446 9.4535 10.222 9.61216 10.026C9.78016 9.83 9.9575 9.648 10.1442 9.48C10.3308 9.312 10.5035 9.15333 10.6622 9.004C10.8302 8.84533 10.9655 8.682 11.0682 8.514C11.1802 8.346 11.2362 8.15933 11.2362 7.954C11.2362 7.618 11.0962 7.34733 10.8162 7.142C10.5455 6.93667 10.1815 6.834 9.72416 6.834C9.2855 6.834 8.8935 6.92733 8.54816 7.114C8.20283 7.29133 7.91816 7.54333 7.69416 7.87L6.00016 6.876C6.3735 6.30667 6.8915 5.854 7.55416 5.518C8.21683 5.17267 9.0195 5 9.96216 5C10.6622 5 11.2782 5.10267 11.8102 5.308C12.3422 5.504 12.7575 5.79333 13.0562 6.176C13.3642 6.55867 13.5182 7.03 13.5182 7.59C13.5182 7.954 13.4622 8.276 13.3502 8.556C13.2382 8.836 13.0935 9.07867 12.9162 9.284C12.7388 9.48933 12.5475 9.68067 12.3422 9.858C12.1462 10.0353 11.9595 10.208 11.7822 10.376C11.6048 10.544 11.4555 10.7213 11.3342 10.908C11.2222 11.0947 11.1662 11.314 11.1662 11.566H9.05216ZM10.1162 15.08C9.72416 15.08 9.40216 14.954 9.15016 14.702C8.89816 14.45 8.77216 14.1513 8.77216 13.806C8.77216 13.4513 8.89816 13.1573 9.15016 12.924C9.40216 12.6813 9.72416 12.56 10.1162 12.56C10.5175 12.56 10.8395 12.6813 11.0822 12.924C11.3342 13.1573 11.46 13.4513 11.46 13.806C11.46 14.1513 11.3342 14.45 11.0822 14.702C10.8395 14.954 10.5175 15.08 10.1162 15.08Z"
                  fill="#666666"
                />
              </svg>
            </button>
          </div>

          {/* Checkbox row */}
          <button
            onClick={() => onCircAutoChange(!circAuto)}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            <span
              style={{
                fontFamily: M,
                fontWeight: 600,
                fontSize: 16,
                color: 'white',
              }}
            >
              Ativar iluminação circadiana
            </span>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 2,
                border: '2px solid white',
                background: circAuto ? 'white' : 'transparent',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s ease',
              }}
            >
              {circAuto && (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path
                    d="M1 5.96789L3.85933 9.00001L11 1.00001"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </div>
          </button>

          {/* ── Circadian circle ─────────────────────────────────────────────── */}
          <div
            ref={circleRef}
            style={{
              position: 'relative',
              width: CCT_CIRCLE_RADIUS * 2,
              height: CCT_CIRCLE_RADIUS * 2,
              borderRadius: '50%',
              flexShrink: 0,
              cursor: 'crosshair',
              touchAction: 'none',
              userSelect: 'none',
              background: `linear-gradient(180deg, ${cctToColor(100)} 0%, white 50%, ${cctToColor(0)} 100%)`,
              opacity: circleOpacity,
              transition: 'opacity 0.2s ease',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={clearDrag}
            onPointerCancel={clearDrag}
          >
            {circAuto ? (
              <>
                <CctCircleHandle
                  y={cctTToCircleY(minT)}
                  fillColor={cctToColor(cctTempMin)}
                />
                <CctCircleHandle
                  y={cctTToCircleY(maxT)}
                  fillColor={cctToColor(cctTempMax)}
                />
              </>
            ) : (
              <CctCircleHandle
                y={cctTToCircleY(singleT)}
                fillColor={cctToColor(cctTemp)}
              />
            )}
          </div>

          {/* Temperature label — value/icon box + min/max range row below it */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              flexShrink: 0,
              opacity: circleOpacity,
              transition: 'opacity 0.2s ease',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 50,
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: circAuto
                  ? `linear-gradient(90deg, ${cctToColor(cctTempMin)} 10%, ${cctToColor((cctTempMin + cctTempMax) / 2)} 50%, ${cctToColor(cctTempMax)} 90%)`
                  : color,
                transition: circAuto ? undefined : 'background 0.1s linear',
              }}
            >
              {circAuto ? (
                <div
                  style={{
                    position: 'absolute',
                    // End stop: keeps the icon's own edge (16px radius) 9px
                    // clear of the label's border at either end of travel
                    left: `calc(25px + ${cctFraction} * (100% - 50px))`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <CctAutoRingIcon color={color} size={32} />
                </div>
              ) : (
                <span
                  style={{
                    fontFamily: M,
                    fontWeight: 600,
                    fontSize: 16,
                    color: 'black',
                  }}
                >
                  {kValueLabel(singleT)}
                </span>
              )}
            </div>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontFamily: M,
                  fontWeight: 600,
                  fontSize: 16,
                  color: 'white',
                }}
              >
                {circAuto ? kValueLabel(minT) : `${CCT_MIN_K}K`}
              </span>
              <span
                style={{
                  fontFamily: M,
                  fontWeight: 600,
                  fontSize: 16,
                  color: 'white',
                }}
              >
                {circAuto ? kValueLabel(maxT) : `${CCT_MAX_K}K`}
              </span>
            </div>
          </div>

          {/* Intensity slider */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <LumHeader name="Intensidade" />
            <Slider
              value={cctIntensity}
              onChange={onCctIntensityChange}
              trackFill={
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${cctIntensity}%`,
                    background: color,
                    borderRadius: 1.5,
                  }}
                />
              }
              thumbColor={color}
              thumbContent={
                <div
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: '50%',
                    background: 'white',
                  }}
                />
              }
              tooltipFill="rgba(112,112,112,0.85)"
            />
          </div>
        </div>
      </div>

      {/* Top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          background: '#000',
        }}
      >
        <StatusBar />
        <div
          style={{
            height: 56,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={onBack}
            style={{
              position: 'absolute',
              left: 12,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path
                d="M9 17L1 9L9 1"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
          <span
            style={{
              fontFamily: M,
              fontWeight: 600,
              fontSize: 16,
              color: '#A5A5A5',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            LED CCT/Circadiano
          </span>
        </div>
      </div>

      {/* Home indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 34,
          zIndex: 20,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: '33.33%',
            right: '33.33%',
            height: 5,
            borderRadius: 2.5,
            background: 'white',
          }}
        />
      </div>

      {/* Dialog */}
      {showDialog && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 40px',
          }}
          onClick={() => setShowDialog(false)}
        >
          <div
            style={{
              background: '#252525',
              borderRadius: 9,
              padding: '36px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 28,
              width: '100%',
              maxWidth: 313,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              style={{
                fontFamily: M,
                fontWeight: 600,
                fontSize: 14,
                color: 'white',
                textAlign: 'center',
                lineHeight: 1.5,
                maxWidth: 247,
              }}
            >
              Ao ativar a iluminação circadiana, defina a tonalidade mais quente
              e a mais fria
            </span>
            <button
              onClick={() => setShowDialog(false)}
              style={{
                height: 32,
                width: 161,
                borderRadius: 4,
                background: 'transparent',
                border: '1px solid white',
                cursor: 'pointer',
                fontFamily: M,
                fontWeight: 600,
                fontSize: 14,
                color: 'white',
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
