import SitemapPage from '@/site-pages/SitemapPage'
import { siteName } from '@/siteConfig'

export const metadata = {
  title: 'Sitemap',
  description: `Browse all pages on ${siteName}.`,
  alternates: { canonical: '/sitemap' },
}

export default function Page() {
  return <SitemapPage />
}
