'use client'

/** Keyboard / screen reader: jump past chrome to main content */
export default function SkipLink() {
  return (
    <a
      id="ligaya-skip-main"
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-deep focus:text-white focus:font-mono focus:text-xs focus:tracking-widest focus:uppercase focus:outline-none focus:ring-2 focus:ring-cyan/80 focus:ring-offset-2 focus:ring-offset-void"
    >
      Skip to main content
    </a>
  )
}
