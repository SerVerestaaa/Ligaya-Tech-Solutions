import NotFoundPage from '@/site-pages/NotFoundPage'

export const metadata = {
  title: 'Page not found',
  description: 'The page you requested does not exist on Ligaya Technology Solutions.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return <NotFoundPage />
}
