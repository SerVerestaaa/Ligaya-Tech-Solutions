import PrivacyPolicyPage from '@/site-pages/PrivacyPolicyPage'
import { siteName } from '@/siteConfig'

export const metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy — how ${siteName} collects, uses, and protects your information.`,
  alternates: { canonical: '/privacy' },
}

export default function Page() {
  return <PrivacyPolicyPage />
}
