import './globals.css'
import 'lenis/dist/lenis.css'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import ClientRoot from './client-root'
import { defaultDescription, siteName } from '@/siteConfig'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ligayatech.com'

export const metadata = {
  metadataBase: new URL(siteUrl.replace(/\/$/, '')),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    siteName,
    title: siteName,
    description: defaultDescription,
    url: '/',
  },
}

export const viewport = {
  themeColor: '#03020F',
}

const criticalCss = `
:root { color-scheme: dark; }
html { background-color: #03020F; }
body { margin: 0; min-height: 100vh; background-color: #03020F; color: #E8EEFF; font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; }
#ligaya-skip-main {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
#ligaya-skip-main:focus {
  position: fixed; left: 1rem; top: 1rem; z-index: 100001; width: auto; height: auto; margin: 0;
  padding: 0.65rem 1rem; overflow: visible; clip: auto; white-space: normal;
  background: #07051A; color: #fff; border-radius: 0.5rem; outline: 2px solid #00D4FF;
}
[data-ligaya-sound-toggle] {
  position: fixed; bottom: 1.25rem; left: 1.25rem; z-index: 99990; display: none;
  align-items: center; gap: 0.5rem; padding: 0.5rem 0.85rem; border-radius: 9999px;
  border: 1px solid rgba(255,255,255,0.12); background: rgba(13, 11, 42, 0.92);
  color: rgba(255,255,255,0.86); font-size: 11px; font-family: ui-monospace, monospace;
  text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer;
}
@media (min-width: 640px) {
  [data-ligaya-sound-toggle] { display: inline-flex; }
}
`

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
      </head>
      <body className="font-body antialiased">
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  )
}
