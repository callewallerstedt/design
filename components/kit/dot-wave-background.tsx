"use client"

import {
  useEffect,
  useRef,
  type HTMLAttributes,
} from "react"

import { cn } from "@/lib/utils"

export type DotWaveBackgroundProps = HTMLAttributes<HTMLDivElement> & {
  /** Centre-to-centre grid spacing in CSS pixels. Default 24. */
  spacing?: number
  /** Dot diameter in CSS pixels. Default 2. */
  dotSize?: number
  /** Ignored; kept so existing call sites compile. Motion comes from the field speeds. */
  periodMs?: number
  /** Freeze the field; dots stay at rest brightness. */
  paused?: boolean
}

const WAVES = 4
const LUT = 1024
const LUT_SCALE = LUT / (2 * Math.PI)
const SIN = Float32Array.from({ length: LUT }, (_, i) =>
  Math.sin((i * 2 * Math.PI) / LUT)
)
const ANGLE_DEG = [18, 73, 131, 204]
const CYCLES = [1.15, 0.82, 1.55, 0.58]
const SPEED = [0.34, -0.27, 0.21, -0.16]
const AMP = [1.0, 0.88, 0.62, 0.74]
const AMP_SUM = AMP.reduce((a, b) => a + b, 0)

function sinLut(radians: number) {
  let i = Math.floor(radians * LUT_SCALE) % LUT
  if (i < 0) i += LUT
  return SIN[i]
}

function liquidGlow(field: number) {
  let u = field * 0.5 + 0.5
  if (u < 0) u = 0
  else if (u > 1) u = 1
  let pool = u < 0.42 ? 0 : (u - 0.42) / 0.58
  pool = pool * pool * (3 - 2 * pool)
  const wrapped = u * 3
  const frac = wrapped - Math.floor(wrapped)
  let ridge = 1 - Math.abs(frac * 2 - 1)
  ridge = ridge * ridge * pool
  const glow = pool * 0.55 + ridge * 0.45
  return glow < 0 ? 0 : glow > 1 ? 1 : glow
}

/**
 * A page-coloured grid of dim dots whose brightness is a slow, liquid
 * interference field (four travelling sine waves at different angles).
 * Bright regions curve, ripple and morph; faint topographic ridges follow
 * the iso-lines. Greyscale only. Pauses when off-screen, hidden, or when
 * the user prefers reduced motion.
 *
 * Sit it behind content: the parent should be `relative`, this fills it.
 *
 * @example
 * ```tsx
 * <div className="relative isolate min-h-dvh bg-background">
 *   <DotWaveBackground />
 *   {children}
 * </div>
 * ```
 */
export function DotWaveBackground({
  className,
  spacing = 24,
  dotSize = 2,
  periodMs: _periodMs = 10_000,
  paused = false,
  ...props
}: DotWaveBackgroundProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    let reduce = media.matches
    let visible = true
    let running = false
    let frame = 0
    let ro: ResizeObserver | undefined
    let io: IntersectionObserver | undefined

    const colors = { dim: [28, 28, 28], peak: [90, 90, 90], bg: [10, 10, 10] }

    const parseRgb = (value: string): [number, number, number] | null => {
      const m = value.match(
        /rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i
      )
      if (!m) return null
      return [Number(m[1]), Number(m[2]), Number(m[3])]
    }

    const mix = (
      a: [number, number, number],
      b: [number, number, number],
      t: number
    ): [number, number, number] => [
      a[0] + (b[0] - a[0]) * t,
      a[1] + (b[1] - a[1]) * t,
      a[2] + (b[2] - a[2]) * t,
    ]

    const readColors = () => {
      const styles = getComputedStyle(wrap)
      const bg =
        parseRgb(styles.backgroundColor) ??
        parseRgb(getComputedStyle(document.documentElement).backgroundColor)
      const fg = parseRgb(styles.color)
      if (bg && fg) {
        colors.bg = bg
        colors.dim = mix(bg, fg, 0.08)
        colors.peak = mix(bg, fg, 0.28)
      }
    }

    let width = 0
    let height = 0
    let dpr = 1
    let xs = new Float32Array(0)
    let ys = new Float32Array(0)
    let phases = new Float32Array(0)
    let count = 0

    const layout = () => {
      const rect = wrap.getBoundingClientRect()
      width = Math.max(0, Math.floor(rect.width))
      height = Math.max(0, Math.floor(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const step = Math.max(8, spacing)
      const cols = Math.floor(width / step) + 1
      const rows = Math.floor(height / step) + 1
      const originX = (width - (cols - 1) * step) / 2
      const originY = (height - (rows - 1) * step) / 2
      count = cols * rows
      xs = new Float32Array(count)
      ys = new Float32Array(count)
      phases = new Float32Array(count * WAVES)
      const shortEdge = Math.max(1, Math.min(width, height))
      const tauOverShort = (2 * Math.PI) / shortEdge
      const kx: number[] = []
      const ky: number[] = []
      for (let w = 0; w < WAVES; w++) {
        const a = (ANGLE_DEG[w] * Math.PI) / 180
        const k = CYCLES[w] * tauOverShort
        kx[w] = Math.cos(a) * k
        ky[w] = Math.sin(a) * k
      }
      let i = 0
      for (let r = 0; r < rows; r++) {
        const y = originY + r * step
        for (let c = 0; c < cols; c++) {
          const x = originX + c * step
          xs[i] = x
          ys[i] = y
          const base = i * WAVES
          for (let w = 0; w < WAVES; w++) {
            phases[base + w] = x * kx[w] + y * ky[w]
          }
          i++
        }
      }
      readColors()
    }

    const draw = (seconds: number, animate: boolean) => {
      ctx.clearRect(0, 0, width, height)
      const [br, bg, bb] = colors.bg
      ctx.fillStyle = `rgb(${br}, ${bg}, ${bb})`
      ctx.fillRect(0, 0, width, height)

      const radius = Math.max(0.6, dotSize / 2)
      const buckets = 8
      const lists: number[][] = Array.from({ length: buckets }, () => [])
      const invAmp = 1 / AMP_SUM
      for (let i = 0; i < count; i++) {
        let glow = 0
        if (animate) {
          const base = i * WAVES
          let field = 0
          for (let w = 0; w < WAVES; w++) {
            field += AMP[w] * sinLut(phases[base + w] + SPEED[w] * seconds)
          }
          glow = liquidGlow(field * invAmp)
        }
        lists[Math.round(glow * (buckets - 1))].push(i)
      }

      const [dr, dg, db] = colors.dim
      const [pr, pg, pb] = colors.peak
      for (let b = 0; b < buckets; b++) {
        const items = lists[b]
        if (items.length === 0) continue
        const k = b / (buckets - 1)
        const r = dr + (pr - dr) * k
        const g = dg + (pg - dg) * k
        const bl = db + (pb - db) * k
        ctx.fillStyle = `rgb(${r}, ${g}, ${bl})`
        ctx.beginPath()
        for (let j = 0; j < items.length; j++) {
          const i = items[j]
          ctx.moveTo(xs[i] + radius, ys[i])
          ctx.arc(xs[i], ys[i], radius, 0, Math.PI * 2)
        }
        ctx.fill()
      }
    }

    const animateNow = () =>
      !paused && !reduce && visible && document.visibilityState === "visible"

    const tick = () => {
      frame = 0
      if (!running) return
      const seconds = animateNow() ? performance.now() / 1000 : 0
      draw(seconds, animateNow())
      if (animateNow()) frame = requestAnimationFrame(tick)
    }

    const sync = () => {
      const should = animateNow()
      if (should && !running) {
        running = true
        frame = requestAnimationFrame(tick)
      } else if (!should && running) {
        running = false
        if (frame) cancelAnimationFrame(frame)
        frame = 0
        draw(0, false)
      } else if (!should) {
        draw(0, false)
      }
    }

    layout()
    sync()

    ro = new ResizeObserver(() => {
      layout()
      if (!running) draw(0, false)
    })
    ro.observe(wrap)

    io = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting
        sync()
      },
      { threshold: 0.01 }
    )
    io.observe(wrap)

    const onVisibility = () => sync()
    const onMotion = () => {
      reduce = media.matches
      sync()
    }
    document.addEventListener("visibilitychange", onVisibility)
    media.addEventListener("change", onMotion)

    return () => {
      running = false
      if (frame) cancelAnimationFrame(frame)
      ro?.disconnect()
      io?.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      media.removeEventListener("change", onMotion)
    }
  }, [spacing, dotSize, paused])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-background text-foreground",
        className
      )}
      {...props}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  )
}
