'use client'

import Link from 'next/link'
import PolicyPageLayout from '../components/PolicyPageLayout'
import FaqAccordion from '../components/FaqAccordion'

export default function FaqPage() {
  return (
    <PolicyPageLayout title="FAQ">
      <p className="font-mono text-[11px] tracking-widest text-cyan/60 uppercase mb-4">Help center</p>
      <h1
        className="font-display font-800 text-3xl sm:text-4xl text-white mb-4"
        style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
      >
        Frequently asked questions
      </h1>
      <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-2xl">
        Quick answers about scope, pricing, timelines, and how we collaborate. For project-specific
        detail,{' '}
        <Link href="/#contact" className="text-cyan/80 hover:text-cyan transition-colors">
          start a conversation
        </Link>
        .
      </p>

      <FaqAccordion />

      <div className="mt-14 pt-10 border-t border-white/[0.08] space-y-4">
        <p className="font-mono text-[10px] tracking-widest uppercase text-white/35">Legal & policies</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/privacy" className="text-white/50 hover:text-white/85 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-white/50 hover:text-white/85 transition-colors">
            Terms of Service
          </Link>
          <Link href="/refunds" className="text-white/50 hover:text-white/85 transition-colors">
            Refund Policy
          </Link>
          <Link href="/cookies" className="text-white/50 hover:text-white/85 transition-colors">
            Cookie Policy
          </Link>
        </div>
      </div>
    </PolicyPageLayout>
  )
}
