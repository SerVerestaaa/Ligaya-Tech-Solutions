import CaseStudyPage from '@/site-pages/CaseStudyPage'
import { getCaseStudy } from '@/data/caseStudies'
import { siteName } from '@/siteConfig'

export async function generateMetadata({ params }) {
  const study = getCaseStudy(params.slug)
  if (!study) {
    return {
      title: 'Case study not found',
      description: 'The requested case study could not be found.',
      robots: { index: false, follow: false },
    }
  }
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/case-studies/${params.slug}` },
    openGraph: {
      title: study.title,
      description: study.summary,
      url: `/case-studies/${params.slug}`,
      siteName,
    },
  }
}

export default function Page() {
  return <CaseStudyPage />
}
