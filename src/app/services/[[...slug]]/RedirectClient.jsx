'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RedirectClient() {
  const router = useRouter()
  
  useEffect(() => {
    // This handles the jump to the #services anchor on your home page
    router.replace('/#services')
  }, [router])
  
  return null
}
