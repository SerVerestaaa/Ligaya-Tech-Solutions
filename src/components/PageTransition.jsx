'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function PageTransition({ children }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={false}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, filter: 'blur(8px)' }}
      transition={{
        duration: reduce ? 0.12 : 0.5,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

