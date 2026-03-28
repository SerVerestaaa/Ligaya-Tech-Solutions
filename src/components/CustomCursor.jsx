'use client'

import { useEffect, useRef } from 'react'

/**
 * Dot + lagging ring; scales up over interactive elements.
 * Uses event delegation so listeners survive React re-renders.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined

    document.documentElement.classList.add('use-custom-cursor')

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let rafId = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      const dot = dotRef.current
      if (dot) {
        dot.style.left = `${mouseX}px`
        dot.style.top = `${mouseY}px`
      }
    }

    const setHover = (on) => {
      const dot = dotRef.current
      const ring = ringRef.current
      const d = on ? 'translate(-50%,-50%) scale(2)' : 'translate(-50%,-50%) scale(1)'
      const r = on ? 'translate(-50%,-50%) scale(1.55)' : 'translate(-50%,-50%) scale(1)'
      if (dot) dot.style.transform = d
      if (ring) ring.style.transform = r
    }

    const onOver = (e) => {
      const el = e.target
      if (!(el instanceof Element)) return
      setHover(!!el.closest('a, button, [role="button"], [data-cursor-hover]'))
    }

    const loop = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      const ring = ringRef.current
      if (ring) {
        ring.style.left = `${ringX}px`
        ring.style.top = `${ringY}px`
      }
      rafId = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    rafId = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafId)
      document.documentElement.classList.remove('use-custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="custom-cursor" style={{ position: 'fixed', pointerEvents: 'none' }} />
      <div ref={ringRef} className="custom-cursor-ring" style={{ position: 'fixed', pointerEvents: 'none' }} />
    </>
  )
}
