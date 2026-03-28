'use client'

import Link from 'next/link'
import PolicyPageLayout from '../components/PolicyPageLayout'

const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2
      className="font-display font-700 text-lg sm:text-xl text-white mb-3"
      style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
    >
      {title}
    </h2>
    <div className="text-white/60 text-sm leading-relaxed space-y-3">{children}</div>
  </section>
)

export default function CookiePolicyPage() {
  return (
    <PolicyPageLayout title="Cookie Policy">
      <article>
        <p className="font-mono text-[11px] text-white/35 tracking-widest uppercase mb-3">Legal</p>
        <h1
          className="font-display font-800 text-3xl sm:text-4xl text-white mb-4"
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
        >
          Cookie Policy
        </h1>
        <p className="text-white/45 text-sm mb-10">
          Last updated: March 26, 2026 · This page describes how Ligaya Technology Solutions uses cookies and
          similar technologies on our website. For personal data more broadly, see our{' '}
          <Link href="/privacy" className="text-cyan/75 hover:text-cyan">
            Privacy Policy
          </Link>
          .
        </p>

        <Section title="1. What are cookies?">
          <p>
            Cookies are small text files stored on your device when you visit a site. They help remember
            preferences, keep sessions secure, and understand how the site is used.
          </p>
        </Section>

        <Section title="2. How we use cookies">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-white/75">Essential:</strong> required for basic operation and security
              (e.g. load balancing, abuse protection, remembering privacy-related choices where
              implemented).
            </li>
            <li>
              <strong className="text-white/75">Preferences:</strong> storing lightweight UI or language
              choices (for example if you enable optional site features that remember a setting).
            </li>
            <li>
              <strong className="text-white/75">Analytics (if enabled):</strong> aggregate statistics about
              traffic and performance. We prefer privacy-preserving, first-party or aggregated approaches
              when we turn analytics on.
            </li>
          </ul>
        </Section>

        <Section title="3. Third parties">
          <p>
            Embedded tools (such as booking calendars or maps, if you add them later) may set their own
            cookies. Their use is governed by those providers&apos; policies. We list major integrations in
            proposals when they touch client data.
          </p>
        </Section>

        <Section title="4. Local storage">
          <p>
            We may use <code className="text-cyan/80 text-xs">localStorage</code> for non-essential UX, such
            as remembering whether you turned on optional UI sounds. That is not a cookie but works
            similarly; you can clear it via your browser settings.
          </p>
        </Section>

        <Section title="5. Your choices">
          <p>
            Most browsers let you block or delete cookies. If you disable essential cookies, some parts of
            the site may not work. For advertising cookies (we do not run retargeting by default on this
            marketing site), use industry opt-out pages your browser vendor recommends.
          </p>
        </Section>

        <Section title="6. Updates">
          <p>
            We will revise this policy if our practices change. Check the &quot;Last updated&quot; date when
            you revisit.
          </p>
        </Section>

        <Section title="7. Contact">
          <p>
            <a href="mailto:ligayatechsolutions@gmail.com" className="text-cyan/75 hover:text-cyan">
              ligayatechsolutions@gmail.com
            </a>
          </p>
        </Section>
      </article>
    </PolicyPageLayout>
  )
}
