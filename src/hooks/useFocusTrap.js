import { useEffect, useRef } from 'react'

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Keeps keyboard focus inside `containerRef` while `active` is true.
 * Escape calls `onEscape` if provided.
 */
export function useFocusTrap(active, containerRef, { onEscape } = {}) {
  const prevActiveRef = useRef(false)

  useEffect(() => {
    if (!active || !containerRef?.current) return undefined

    const root = containerRef.current
    const getFocusable = () => Array.from(root.querySelectorAll(FOCUSABLE)).filter(el => el.offsetParent !== null || el === document.activeElement)

    const focusables = getFocusable()
    if (focusables.length && document.activeElement && !root.contains(document.activeElement)) {
      focusables[0].focus()
    }

    const onKeyDown = (e) => {
      if (e.key === 'Escape' && onEscape) {
        e.preventDefault()
        onEscape()
        return
      }
      if (e.key !== 'Tab') return

      const nodes = getFocusable()
      if (nodes.length === 0) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    prevActiveRef.current = true
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [active, containerRef, onEscape])
}
