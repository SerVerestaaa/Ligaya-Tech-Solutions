// ─── Shared Framer Motion Variants ────────────────────────────────────────────

/** Fade in upward from slight offset */
export const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
  },
}

/** Fade in with no transform */
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

/** Stagger children by 0.12 s */
export const stagger = (staggerTime = 0.12) => ({
  hidden:  {},
  visible: {
    transition: { staggerChildren: staggerTime },
  },
})

/** Scale in from 0.85 */
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
}

/** Slide in from left */
export const slideLeft = {
  hidden:  { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
  },
}

/** Slide in from right */
export const slideRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
  },
}

/**
 * Scroll-in reveal for `react-intersection-observer` / `useInView`.
 * Uses correct option names (`triggerOnce`, `rootMargin`). Requires a visible
 * chunk of the element, and ignores “peeking” at the bottom of the screen so
 * animations still run when the user scrolls the section into view.
 */
export const viewportOnce = {
  triggerOnce: true,
  threshold: 0.14,
  rootMargin: '0px 0px -14% 0px',
}

/** Snappy spring for buttons / chips — pairs well with `MotionConfig reducedMotion="user"`. */
export const snappyTransition = { type: 'spring', stiffness: 420, damping: 28 }

/** Default hover / tap feedback for `motion.button`. */
export const btnMotion = {
  whileHover: { scale: 1.02, y: -1 },
  whileTap: { scale: 0.97 },
  transition: snappyTransition,
}

/** Subtle lift for ghost / outline controls. */
export const subtleLift = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1] },
}
