import { useEffect, useRef } from 'react'
import dots from './heroDots.json'

// Dot centers + radii extracted from the original home_hero.svg halftone
// (flat [x, y, r, ...] in its 2400x1700 viewBox), so the motif stays identical.
const VIEW_W = 2400
const VIEW_H = 1700

export default function DotWaveBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let rafId = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (elapsed: number) => {
      const t = elapsed * 0.0025

      // cover-fit the 2400x1700 pattern, same as the old bg-cover bg-center
      const scale = Math.max(width / VIEW_W, height / VIEW_H)
      const offsetX = (width - VIEW_W * scale) / 2
      const offsetY = (height - VIEW_H * scale) / 2

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#000'

      for (let i = 0; i < dots.length; i += 3) {
        const x = dots[i] * scale + offsetX
        let y = dots[i + 1] * scale + offsetY
        if (x < -8 || x > width + 8 || y < -8 || y > height + 8) continue

        // three overlapping waves (different directions, frequencies, speeds)
        // interfere so the motion never repeats visibly; dots swell/shrink
        // around their original size, so the motif is preserved
        let pulse = 1
        if (!reduceMotion) {
          const px = dots[i]
          const py = dots[i + 1]
          const w1 = Math.sin((px + py * 0.4) * 0.008 - t)
          const w2 = Math.sin((px * 0.35 - py) * 0.0055 + t * 0.73)
          const w3 = Math.sin((px * 0.6 + py * 0.8) * 0.0032 - t * 1.31)
          const wave = w1 * 0.45 + w2 * 0.35 + w3 * 0.2
          pulse = 0.55 + 0.5 * wave
          y += (w1 * 3 + w2 * 2.5) * scale
        }
        const radius = dots[i + 2] * scale * pulse
        if (radius < 0.2) continue

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduceMotion) rafId = requestAnimationFrame(draw)
    }

    resize()
    const observer = new ResizeObserver(() => {
      resize()
      if (reduceMotion) draw(0)
    })
    observer.observe(canvas)
    if (reduceMotion) draw(0)
    else rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
