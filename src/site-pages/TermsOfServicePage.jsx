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

export default function TermsOfServicePage() {
  return (
    <PolicyPageLayout title="Terms of Service">
      <article>
        <p className="font-mono text-[11px] text-white/35 tracking-widest uppercase mb-3">Legal</p>
        <h1
          className="font-display font-800 text-3xl sm:text-4xl text-white mb-4"
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
        >
          Terms of Service
        </h1>
        <p className="text-white/45 text-sm mb-10">
          Last updated: March 26, 2026 · These Terms govern your use of Ligaya Technology
          Solutions&apos; website and any statements of work or contracts you enter with us. If there is a
          signed agreement, its terms control for that project where they conflict with this page.
        </p>

        <Section title="1. Acceptance">
          <p>
            By accessing <Link href="/" className="text-cyan/75 hover:text-cyan">our website</Link>,
            requesting quotes, or engaging our services, you agree to these Terms and our{' '}
            <Link href="/privacy" className="text-cyan/75 hover:text-cyan">
              Privacy Policy
            </Link>
            .
          </p>
        </Section>

        <Section title="2. Services">
          <p>
            We provide professional software, web, systems, and related consulting as described in proposals,
            statements of work, or other written scope documents. We may use subcontractors or tools
            consistent with good industry practice, subject to confidentiality obligations.
          </p>
        </Section>

        <Section title="3. Client responsibilities">
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide accurate information, timely feedback, and necessary access (repos, APIs, hosting).</li>
            <li>Ensure you have rights to any materials you supply (copy, logos, data, third-party assets).</li>
            <li>Designate a primary contact who can approve scope and accept deliverables.</li>
          </ul>
        </Section>

        <Section title="4. Intellectual property">
          <p>
            Unless a signed agreement says otherwise, client-owned materials stay yours; pre-existing Ligaya
            libraries, templates, or tools remain ours. Deliverables are typically licensed or assigned as
            spelled out in your contract after fees for those milestones are paid.
          </p>
        </Section>

        <Section title="5. Fees and payment">
          <p>
            Fees, deposits, invoicing cadence, and late-payment remedies are defined in your quote or
            contract. Work may pause if invoices are materially overdue. Prices exclude taxes unless stated.
          </p>
        </Section>

        <Section title="6. Changes and timelines">
          <p>
            Scope changes require written approval (including email). Calendar estimates depend on client
            responsiveness; delays caused by third parties or unclear requirements may shift schedules.
          </p>
        </Section>

        <Section title="7. Warranty and disclaimer">
          <p>
            We warrant that services will be performed with reasonable skill and care. Except as required
            by law or expressly stated in writing, we disclaim implied warranties to the maximum extent
            permitted. Software inherently evolves — we are not responsible for issues caused solely by
            third-party platforms, hosting outside our control, or unsupported modifications after handoff.
          </p>
        </Section>

        <Section title="8. Limitation of liability">
          <p>
            To the fullest extent permitted by law, our aggregate liability arising out of these Terms or
            the services is limited to the fees you paid us for the specific engagement in the six (6)
            months before the claim. We are not liable for indirect, incidental, special, or consequential
            damages.
          </p>
        </Section>

        <Section title="9. Confidentiality">
          <p>
            Both parties will treat non-public business and technical information received during the
            project as confidential, using at least reasonable care, for three (3) years unless a
            different period is agreed.
          </p>
        </Section>

        <Section title="10. Termination">
          <p>
            Either party may terminate for material breach if uncured after written notice where cure is
            feasible. On termination, you pay for work completed and expenses incurred through the effective
            date. Survival clauses (fees, IP, limits, confidentiality) continue.
          </p>
        </Section>

        <Section title="11. Law and disputes">
          <p>
            These Terms are governed by the laws of the Philippines, without regard to conflict-of-law
            rules. Courts in Pampanga, Philippines shall have exclusive jurisdiction, unless mandatory consumer rules
            say otherwise.
          </p>
        </Section>

        <Section title="12. Contact">
          <p>
            <a href="mailto:ligayatechsolutions@gmail.com" className="text-cyan/75 hover:text-cyan">
              ligayatechsolutions@gmail.com
            </a>
          </p>
        </Section>

        <p className="text-white/35 text-xs mt-12 pt-8 border-t border-white/[0.07]">
          Summary for readability only — your executed contract and applicable law prevail.
        </p>
      </article>
    </PolicyPageLayout>
  )
}
