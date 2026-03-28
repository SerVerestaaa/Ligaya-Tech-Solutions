'use client'

import { getSiteOrigin, siteName } from '../siteConfig'

/** Organization + WebSite structured data for the home page */
export default function OrganizationJsonLd() {
  const url = getSiteOrigin()
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${url}/#organization`,
        name: siteName,
        url,
        description:
          'Web development, custom systems, POS solutions, thesis & capstone projects, and bespoke business software.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Pampanga',
          addressCountry: 'PH',
        },
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url,
        name: siteName,
        publisher: { '@id': `${url}/#organization` },
        inLanguage: 'en',
      },
    ],
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
