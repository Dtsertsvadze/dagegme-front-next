import { HomePage } from '@/features/home/home-page.jsx'
import { fetchVipListings } from '@/features/listings/server/listings.js'

async function getPageData() {
  try {
    const items = await fetchVipListings()

    return { items, hasError: false }
  } catch {
    return { items: [], hasError: true }
  }
}

export default async function Page() {
  const pageData = await getPageData()

  return <HomePage {...pageData} />
}
