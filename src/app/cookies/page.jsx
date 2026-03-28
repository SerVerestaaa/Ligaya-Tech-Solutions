import CookiePolicyPage from '@/site-pages/CookiePolicyPage'
import { siteName } from '@/siteConfig'

export const metadata = {
  title: 'Cookie Policy',
  description: `Cookie Policy — how ${siteName} uses cookies and similar technologies.`,
  alternates: { canonical: '/cookies' },
}

export default function Page() {
  return <CookiePolicyPage />
}
