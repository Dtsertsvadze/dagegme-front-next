import { homeCategories } from '@/content/home-categories.js'
import { fetchAllListings } from '@/features/listings/server/listings.js'
import { locales } from '@/i18n/config.js'

const siteUrl = 'https://dagegme.com'

export const revalidate = 300

export default async function sitemap() {
  // Let API failures propagate so revalidation can retain the last good sitemap.
  const { items } = await fetchAllListings()
  const paths = new Set([
    '',
    '/professionals',
    ...homeCategories.map(({ id }) => `/professionals/${id}`),
    ...items.map((item) => item.detailsHref),
  ])

  return [...paths].flatMap((path) => {
    const languages = Object.fromEntries(
      locales.map((locale) => [locale, `${siteUrl}/${locale}${path}`]),
    )

    return locales.map((locale) => ({
      url: languages[locale],
      alternates: { languages },
    }))
  })
}
