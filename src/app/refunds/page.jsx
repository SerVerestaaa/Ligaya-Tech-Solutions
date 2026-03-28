import RefundPolicyPage from '@/site-pages/RefundPolicyPage'
import { siteName } from '@/siteConfig'

export const metadata = {
  title: 'Refund Policy',
  description: `Refund Policy — ${siteName} commitments on deposits, milestones, and cancellations.`,
  alternates: { canonical: '/refunds' },
}

export default function Page() {
  return <RefundPolicyPage />
}
