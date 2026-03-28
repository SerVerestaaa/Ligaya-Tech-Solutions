import { useEffect } from 'react'
import { isSoundEnabled, uiTap } from '../utils/uiFeedback'

const interactiveSelector = [
  'a[href]',
  'button',
  '[role="button"]',
  'input[type="button"]',
  'input[type="submit"]',
  'input[type="reset"]',
  'input[type="checkbox"]',
  'input[type="radio"]',
].join(',')

function shouldPlayFor(el) {
  if (!el.closest) return false
  if (el.closest('[data-no-ui-sound]')) return false
  const aria = el.getAttribute('aria-label') || ''
  if (/ui sounds/i.test(aria)) return false

  if ((el.matches('button') || el.matches('input')) && el.disabled) return false

  const tag = el.tagName
  if (tag === 'INPUT') {
    const t = el.type || 'text'
    const quiet = new Set(['text', 'email', 'password', 'search', 'tel', 'url', 'number', 'hidden', 'file', 'date', 'time', 'datetime-local', 'month', 'week'])
    if (quiet.has(t)) return false
  }
  if (tag === 'TEXTAREA' || tag === 'SELECT') return false

  return true
}

/**
 * Plays uiTap for most real clicks on links and buttons (when Sound is on).
 * Previously only elements that manually called uiTap() had audio — easy to miss.
 */
export function useGlobalUiSound() {
  useEffect(() => {
    const onClick = (e) => {
      if (!isSoundEnabled()) return
      const t = e.target
      if (!(t instanceof Element)) return

      const interactive = t.closest(interactiveSelector)
      if (!interactive || !shouldPlayFor(interactive)) return

      void uiTap()
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])
}
