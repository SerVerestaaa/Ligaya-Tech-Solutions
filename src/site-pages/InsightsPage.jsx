'use client'

import Link from 'next/link'
import PolicyPageLayout from '../components/PolicyPageLayout'
import { defaultDescription, siteName } from '../siteConfig'

const posts = [
  {
    slug: 'choosing-pos-for-restaurants',
    title: 'Choosing a POS stack for multi-branch restaurants',
    date: 'March 2026',
    excerpt:
      'What to validate before you invest: offline tolerance, reporting, and how your kitchen actually runs.',
  },
  {
    slug: 'capstone-scope-that-passes',
    title: 'Capstone scope that passes defense panels',
    date: 'February 2026',
    excerpt:
      'How to frame requirements, documentation, and demos so reviewers see your work clearly — without doing the project for you.',
  },
]

export default function InsightsPage() {
  return (
    <PolicyPageLayout
      title="Insights"
      description={`Articles and notes from ${siteName}. ${defaultDescription}`}
    >
      <p className="font-mono text-[11px] text-white/35 tracking-widest uppercase mb-3">Journal</p>
      <h1
        className="font-display font-800 text-3xl sm:text-4xl text-white mb-4"
        style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
      >
        Insights
      </h1>
      <p className="text-white/50 text-sm mb-12 max-w-2xl">
        Practical notes on shipping web apps, internal systems, POS, and thesis work. Full long-form posts coming soon —
        for now, browse summaries or{' '}
        <Link href="/#contact" className="text-cyan/80 hover:text-cyan underline-offset-2 hover:underline">
          start a conversation
        </Link>{' '}
        about your project.
      </p>

      <ul className="space-y-8">
        {posts.map((p) => (
          <li
            key={p.slug}
            className="glass rounded-2xl border border-white/[0.07] p-6 sm:p-8 hover:border-white/12 transition-colors"
          >
            <p className="font-mono text-[10px] text-white/35 tracking-widest uppercase mb-2">{p.date}</p>
            <h2
              className="font-display font-700 text-xl text-white mb-3"
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
            >
              {p.title}
            </h2>
            <p className="text-white/55 text-sm leading-relaxed mb-4">{p.excerpt}</p>
            <span className="font-mono text-xs text-cyan/50">Full article — coming soon</span>
          </li>
        ))}
      </ul>
    </PolicyPageLayout>
  )
}
