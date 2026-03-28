'use client'

import Link from 'next/link'
import PolicyPageLayout from '../components/PolicyPageLayout'
import { caseStudies } from '../data/caseStudies'

export default function SitemapPage() {
  return (
    <PolicyPageLayout title="Sitemap">
      <p className="font-mono text-[11px] text-white/35 tracking-widest uppercase mb-3">Navigation</p>
      <h1
        className="font-display font-800 text-3xl sm:text-4xl text-white mb-4"
        style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
      >
        Sitemap
      </h1>
      <p className="text-white/50 text-sm mb-10 max-w-2xl">
        Primary destinations on this site. For section anchors on the home page, open the main site and use
        the navigation bar or footer.
      </p>

      <ul className="space-y-8 text-sm">
        <li>
          <p className="font-mono text-[10px] uppercase tracking-widest text-cyan/60 mb-2">Main</p>
          <ul className="space-y-2 text-white/65">
            <li>
              <Link href="/" className="hover:text-cyan transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/book" className="hover:text-cyan transition-colors">
                Book a strategy call
              </Link>
            </li>
            <li>
              <Link href="/insights" className="hover:text-cyan transition-colors">
                Insights
              </Link>
            </li>
            <li>
              <a href="/downloads/company-profile.html" className="hover:text-cyan transition-colors">
                Company profile (print / PDF)
              </a>
            </li>
            <li>
              <Link href="/faq" className="hover:text-cyan transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <p className="font-mono text-[10px] uppercase tracking-widest text-cyan/60 mb-2">Case studies</p>
          <ul className="space-y-2 text-white/65">
            {caseStudies.map((c) => (
              <li key={c.slug}>
                <Link href={`/case-studies/${c.slug}`} className="hover:text-cyan transition-colors">
                  {c.client} — {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <p className="font-mono text-[10px] uppercase tracking-widest text-cyan/60 mb-2">Policies</p>
          <ul className="space-y-2 text-white/65">
            <li>
              <Link href="/privacy" className="hover:text-cyan transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-cyan transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/refunds" className="hover:text-cyan transition-colors">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-cyan transition-colors">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <p className="font-mono text-[10px] uppercase tracking-widest text-cyan/60 mb-2">Home sections</p>
          <ul className="space-y-2 text-white/65">
            {[
              ['#about', 'About'],
              ['#team', 'Team'],
              ['#ceo', "CEO's message"],
              ['#services', 'Services'],
              ['#portfolio', 'Portfolio'],
              ['#why-us', 'Why Us'],
              ['#testimonials', 'Testimonials'],
              ['#faq', 'FAQ'],
              ['#contact', 'Contact'],
            ].map(([hash, label]) => (
              <li key={hash}>
                <Link href={`/${hash}`} className="hover:text-cyan transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </PolicyPageLayout>
  )
}
