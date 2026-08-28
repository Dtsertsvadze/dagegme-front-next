import { ProfessionalsPage } from '@/features/listings/professionals-page.jsx'
import { fetchAllListings } from '@/features/listings/server/listings.js'
import { siteCopy } from '@/content/site-copy.js'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const copy = (siteCopy[locale] ?? siteCopy.ka).professionals

  return {
    title: copy.title,
    description: copy.text,
    alternates: {
      canonical: `/${locale}/professionals`,
      languages: {
        en: '/en/professionals',
        ka: '/ka/professionals',
      },
    },
  }
}

async function getPageData() {
  try {
    const { categories, items } = await fetchAllListings()

    return { categories, items, hasError: false }
  } catch {
    return { categories: [], items: [], hasError: true }
  }
}

export default async function Page() {
  const pageData = await getPageData()

  return <ProfessionalsPage {...pageData} />
}
