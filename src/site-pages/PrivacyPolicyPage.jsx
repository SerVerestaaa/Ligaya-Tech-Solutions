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

export default function PrivacyPolicyPage() {
  return (
    <PolicyPageLayout title="Privacy Policy">
      <article>
        <p className="font-mono text-[11px] text-white/35 tracking-widest uppercase mb-3">Legal</p>
        <h1
          className="font-display font-800 text-3xl sm:text-4xl text-white mb-4"
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
        >
          Privacy Policy
        </h1>
        <p className="text-white/45 text-sm mb-10">
          Last updated: March 26, 2026 · Ligaya Technology Solutions (&quot;Ligaya&quot;, &quot;we&quot;,
          &quot;us&quot;) respects your privacy. This policy describes how we handle information when you
          use <Link href="/" className="text-cyan/75 hover:text-cyan">ligayatech.com</Link> and related
          services.
        </p>

        <Section title="1. What this policy covers">
          <p>
            This policy applies to information collected through our website, contact forms, booking flows,
            email, and ordinary project communication. It does not govern third-party sites we link to (for
            example payment or calendar providers you choose).
          </p>
        </Section>

        <Section title="2. Information we collect">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-white/75">You provide:</strong> name, email, company, project details,
              budgets, files or briefs you send, and messages through forms or email.
            </li>
            <li>
              <strong className="text-white/75">Automatically:</strong> basic technical data such as device
              type, browser, general location (country/region), and usage signals needed to operate and
              secure the site (e.g. logs, cookies — see our{' '}
              <Link href="/cookies" className="text-cyan/75 hover:text-cyan">
                Cookie Policy
              </Link>
              ).
            </li>
            <li>
              <strong className="text-white/75">Help chat:</strong> questions you type in the on-site help
              assistant may be processed to suggest answers. By default that uses automated matching against
              our own content. If we configure the assistant to call an external AI service through our
              infrastructure (such as OpenAI, Anthropic Claude, or Google Gemini), those messages would be
              processed by that provider as
              described when we enable it — we will update this section accordingly.
            </li>
          </ul>
        </Section>

        <Section title="3. Analytics and measurement">
          <p>
            If you accept our cookie notice and we configure Google Analytics (GA4), we may collect anonymized usage
            statistics (for example page views and general device/browser information) to understand how the site is
            used. GA4 is loaded only after consent; you can ask us about data processing or opt out of further
            measurement by contacting us via the{' '}
            <Link href="/#contact" className="text-cyan/75 hover:text-cyan">
              contact page
            </Link>
            .
          </p>
        </Section>

        <Section title="4. How we use information">
          <ul className="list-disc pl-5 space-y-2">
            <li>Respond to inquiries, prepare proposals, and deliver contracted work.</li>
            <li>Operate, secure, and improve the website and internal tooling.</li>
            <li>Comply with law, enforce our agreements, and protect rights and safety.</li>
          </ul>
        </Section>

        <Section title="5. Sharing">
          <p>
            We do not sell personal information. We share data only with service providers who help us run
            the business (e.g. email delivery, hosting, analytics where enabled) under appropriate
            agreements, or when required by law. Project materials are shared only as you instruct or as
            needed to complete the engagement.
          </p>
        </Section>

        <Section title="6. Retention">
          <p>
            We keep information for as long as needed to fulfill the purposes above, meet legal or tax
            obligations, and resolve disputes. You may ask us to delete or export certain data where
            applicable law requires.
          </p>
        </Section>

        <Section title="7. Security">
          <p>
            We use reasonable administrative and technical safeguards appropriate to the nature of the data.
            No method of transmission over the Internet is completely secure; we encourage strong passwords
            and careful sharing of credentials.
          </p>
        </Section>

        <Section title="8. Your choices">
          <p>
            You may request access, correction, or deletion of personal information we hold, subject to
            legal exceptions. Contact us using the details on our{' '}
            <Link href="/#contact" className="text-cyan/75 hover:text-cyan">
              contact page
            </Link>
            . If you are in the EEA or UK, you may have additional rights under local law.
          </p>
        </Section>

        <Section title="9. Children">
          <p>Our services are directed to businesses and adults. We do not knowingly collect data from children.</p>
        </Section>

        <Section title="10. Changes">
          <p>
            We may update this policy from time to time. The &quot;Last updated&quot; date will change
            accordingly. Continued use of the site after changes means you accept the revised policy.
          </p>
        </Section>

        <Section title="11. Contact">
          <p>
            Questions about privacy? Email{' '}
            <a href="mailto:ligayatechsolutions@gmail.com" className="text-cyan/75 hover:text-cyan">
              ligayatechsolutions@gmail.com
            </a>
            .
          </p>
        </Section>

        <p className="text-white/35 text-xs mt-12 pt-8 border-t border-white/[0.07]">
          This page is provided for transparency and is not legal advice. Have counsel review engagements
          that require formal compliance (health, finance, etc.).
        </p>
      </article>
    </PolicyPageLayout>
  )
}
