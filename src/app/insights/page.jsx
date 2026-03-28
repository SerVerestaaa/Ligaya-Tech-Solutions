import InsightsPage from '@/site-pages/InsightsPage'
import { defaultDescription, siteName } from '@/siteConfig'

export const metadata = {
  title: 'Insights',
  description: `Articles and notes from ${siteName}. ${defaultDescription}`,
  alternates: { canonical: '/insights' },
}

export default function Page() {
  return <InsightsPage />
}
