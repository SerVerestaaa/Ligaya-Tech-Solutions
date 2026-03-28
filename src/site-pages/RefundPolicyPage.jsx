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

export default function RefundPolicyPage() {
  return (
    <PolicyPageLayout title="Refund Policy">
      <article>
        <p className="font-mono text-[11px] text-white/35 tracking-widest uppercase mb-3">Legal</p>
        <h1
          className="font-display font-800 text-3xl sm:text-4xl text-white mb-4"
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
        >
          Refund Policy
        </h1>
        <p className="text-white/45 text-sm mb-10">
          Last updated: March 26, 2026 · Ligaya Technology Solutions primarily delivers custom digital work
          paid by milestone. This policy explains how deposits, refunds, and cancellations are typically
          handled. Your signed quote or contract may include project-specific terms that override this page
          where they clearly apply.
        </p>

        <Section title="1. Non-refundable items">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-white/75">Completed milestones</strong> are generally non-refundable
              once deliverables are accepted or the review window in your agreement has passed without valid
              written objections tied to the agreed acceptance criteria.
            </li>
            <li>
              <strong className="text-white/75">Third-party costs</strong> (licenses, domains, stock assets,
              paid APIs, paid advertising) that we disburse on your behalf are passed through and typically
              non-refundable once purchased.
            </li>
          </ul>
        </Section>

        <Section title="2. Deposits and kickoff">
          <p>
            A deposit or kickoff invoice secures calendar time and initial discovery. If you cancel before
            work begins, we may refund part of the deposit minus any preparation already performed (e.g.
            meetings, audits, environment setup) at our standard hourly rate, as stated in your agreement.
          </p>
        </Section>

        <Section title="3. Client-initiated cancellation">
          <p>
            If you end a project early after work has started, you pay for all completed phases and work in
            progress up to the cancellation date, plus any non-recoverable third-party commitments. Unused
            prepaid balances may be credited toward a future engagement within twelve (12) months unless
            otherwise agreed in writing.
          </p>
        </Section>

        <Section title="4. Ligaya-initiated cancellation">
          <p>
            If we cannot continue due to force majeure, material non-payment, or abuse of collaboration
            channels, we will invoice for work delivered to date and return or transfer your materials as
            appropriate. If we terminate without cause before any milestone begins, we will refund any
            unused deposit for that milestone.
          </p>
        </Section>

        <Section title="5. Quality and rework">
          <p>
            If deliverables materially miss documented acceptance criteria, we will prioritize good-faith
            rework within the scoped revision rounds stated in your contract. Refunds are considered only
            where rework is not feasible and a breach is clear — details belong in your statement of work.
          </p>
        </Section>

        <Section title="6. Strategy calls and light consulting">
          <p>
            Fees for booked strategy sessions or short advisory blocks may be non-refundable within
            forty-eight (48) hours of the scheduled time unless we reschedule by mutual agreement.
          </p>
        </Section>

        <Section title="7. How to request a review">
          <p>
            Email{' '}
            <a href="mailto:ligayatechsolutions@gmail.com" className="text-cyan/75 hover:text-cyan">
              ligayatechsolutions@gmail.com
            </a>{' '}
            with your agreement reference, invoice numbers, and a concise description of the concern. We aim
            to respond within five (5) business days.
          </p>
        </Section>

        <Section title="8. Consumer rights">
          <p>
            Nothing here limits statutory rights you cannot waive under applicable law (including certain
            consumer protections). For EU/UK consumers, you may also have cooling-off rules on some
            remote services — tell us your jurisdiction when you sign so we can flag exceptions.
          </p>
        </Section>

        <p className="text-white/35 text-xs mt-12 pt-8 border-t border-white/[0.07]">
          See also our <Link href="/terms">Terms of Service</Link> and{' '}
          <Link href="/privacy">Privacy Policy</Link>. Questions?{' '}
          <Link href="/#contact" className="text-cyan/70 hover:text-cyan">
            Contact us
          </Link>
          .
        </p>
      </article>
    </PolicyPageLayout>
  )
}
