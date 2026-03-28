import FaqPage from '@/site-pages/FaqPage'
import { siteName } from '@/siteConfig'

export const metadata = {
  title: 'FAQ',
  description: `Frequently asked questions about ${siteName} — scope, pricing, timelines, and how we collaborate.`,
  alternates: { canonical: '/faq' },
}

export default function Page() {
  return <FaqPage />
}
