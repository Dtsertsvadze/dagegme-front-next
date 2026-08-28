import { ProfessionalsPage } from '@/features/listings/professionals-page.jsx'
import { fetchAllListings } from '@/features/listings/server/listings.js'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Professionals',
  description: 'Browse event professionals and services by category.',
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
