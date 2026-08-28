import { redirect } from 'next/navigation'
import { homeCategories } from '@/content/home-categories.js'
import { siteCopy } from '@/content/site-copy.js'
import { ProfessionCategoryPage } from '@/features/listings/profession-category-page.jsx'
import { fetchCategoryListings } from '@/features/listings/server/listings.js'

export async function generateMetadata({ params }) {
  const { categoryId, locale } = await params
  const category = homeCategories.find((item) => item.id === categoryId)
  const copy = (siteCopy[locale] ?? siteCopy.ka).professionals
  const title =
    copy.categoryTitles[categoryId] || category?.labels[locale] || copy.title

  return {
    title,
    description: copy.categoryPage.subtitle,
    alternates: {
      canonical: `/${locale}/professionals/${categoryId}`,
      languages: {
        en: `/en/professionals/${categoryId}`,
        ka: `/ka/professionals/${categoryId}`,
      },
    },
  }
}

async function getPageData(category) {
  try {
    const items = await fetchCategoryListings(category)

    return { items, hasError: false }
  } catch {
    return { items: [], hasError: true }
  }
}

export default async function Page({ params }) {
  const { categoryId, locale } = await params
  const category = homeCategories.find((item) => item.id === categoryId)

  if (!category) {
    redirect(`/${locale}/professionals`)
  }

  const pageData = await getPageData(category)

  return <ProfessionCategoryPage category={category} {...pageData} />
}
