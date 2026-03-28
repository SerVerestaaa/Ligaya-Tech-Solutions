import BookPage from '@/site-pages/BookPage'

const pageTitle = 'Book a strategy call'
const pageDesc =
  'Schedule a 30-minute strategy session with Ligaya Technology Solutions — align scope, timeline, and investment for your web, systems, or POS project.'

export const metadata = {
  title: pageTitle,
  description: pageDesc,
  alternates: { canonical: '/book' },
}

export default function Page() {
  return <BookPage />
}
