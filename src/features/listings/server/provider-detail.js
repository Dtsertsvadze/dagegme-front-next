import { homeCategories } from '@/content/home-categories.js'
import { siteCopy } from '@/content/site-copy.js'
import { getLocalizedValue } from '@/utils/get-localized-value.js'
import { fetchListing } from './listings.js'

export async function getProviderDetail(categoryId, providerId) {
  const category = homeCategories.find((item) => item.id === categoryId)

  if (!category) {
    return null
  }

  const item = await fetchListing(category, providerId)

  return item ? { category, item } : null
}

export async function getProviderMetadata({
  categoryId,
  locale,
  providerId,
}) {
  const detail = await getProviderDetail(categoryId, providerId)
  const copy = siteCopy[locale] ?? siteCopy.ka

  if (!detail) {
    return { title: copy.professionals.title }
  }

  const { item } = detail
  const title = getLocalizedValue(item.title, locale)
  const description =
    getLocalizedValue(item.description, locale) ||
    copy.listingDetails.descriptionFallback
  const pathname = `/professionals/${categoryId}/${providerId}`

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${pathname}`,
      languages: {
        en: `/en${pathname}`,
        ka: `/ka${pathname}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}${pathname}`,
      images: item.imageUrl ? [{ url: item.imageUrl, alt: title }] : [],
    },
  }
}
