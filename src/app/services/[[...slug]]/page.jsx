import RedirectClient from './RedirectClient'

export function generateStaticParams() {
  return [{ slug: [] }]
}

export default function Page() {
  return <RedirectClient />
}
