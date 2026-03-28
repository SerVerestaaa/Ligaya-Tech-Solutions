/** Canonical site URL for SEO, JSON-LD, and Open Graph. Set NEXT_PUBLIC_SITE_URL in production. */
export const siteName = 'Ligaya Technology Solutions'

export function getSiteOrigin() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  const env = process.env.NEXT_PUBLIC_SITE_URL
  if (env && typeof env === 'string') return env.replace(/\/$/, '')
  return 'https://ligayatech.com'
}

export const defaultDescription =
  'Premium web development, systems, POS, thesis & capstone support, and custom business software — Ligaya Technology Solutions, Pampanga, Philippines.'

/** Optional full URL to a 1200×630 image for og:image — set NEXT_PUBLIC_OG_IMAGE_URL in .env */
export function getOgImageUrl() {
  const env = process.env.NEXT_PUBLIC_OG_IMAGE_URL
  if (env && typeof env === 'string') return env
  return `${getSiteOrigin()}/og.svg`
}
