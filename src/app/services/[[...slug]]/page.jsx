'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Tells Next.js to only build the base /services path
export function generateStaticParams() {
  return [{ slug: [] }]
}

/** Deep links like /services/web land on the home Services anchor. */
export default function ServiceRedirectPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/#services')
  }, [router])
  
  return null
}
