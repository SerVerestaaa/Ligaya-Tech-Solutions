import TermsOfServicePage from '@/site-pages/TermsOfServicePage'
import { siteName } from '@/siteConfig'

export const metadata = {
  title: 'Terms of Service',
  description: `Terms of Service for ${siteName} — using our website and services.`,
  alternates: { canonical: '/terms' },
}

export default function Page() {
  return <TermsOfServicePage />
}
