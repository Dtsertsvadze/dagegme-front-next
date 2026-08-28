import { redirect } from 'next/navigation'
import { homeCategories } from '@/content/home-categories.js'
import { ProfessionCategoryPage } from '@/features/listings/profession-category-page.jsx'
import { fetchCategoryListings } from '@/features/listings/server/listings.js'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { categoryId } = await params
  const category = homeCategories.find((item) => item.id === categoryId)

  return {
    title: category?.labels.en || 'Professionals',
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
  const { categoryId } = await params
  const category = homeCategories.find((item) => item.id === categoryId)

  if (!category) {
    redirect('/professionals')
  }

  const pageData = await getPageData(category)

  return <ProfessionCategoryPage category={category} {...pageData} />
}
