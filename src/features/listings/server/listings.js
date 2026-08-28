import { homeCategories } from '@/content/home-categories.js'
import {
  normalizeListing,
  normalizeVipCarouselItem,
} from '../lib/normalize-listing.mjs'

const fallbackApiBaseUrl = 'https://api.dagegme.com/api'

const apiBaseUrl = (
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  fallbackApiBaseUrl
).replace(/\/$/, '')

async function fetchJson(path) {
  const response = await fetch(`${apiBaseUrl}/${path}`, {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}.`)
  }

  return response.json()
}

async function fetchCategory(category) {
  const data = await fetchJson(category.endpoint)
  const providers = Array.isArray(data) ? data : []

  return {
    ...category,
    items: providers.map((provider) => normalizeListing(category, provider)),
  }
}

export async function fetchAllListings() {
  const results = await Promise.all(homeCategories.map(fetchCategory))

  return {
    categories: results.map(({ items, ...category }) => ({
      ...category,
      count: items.length,
    })),
    // Do not sort here. The API defines provider order through sort_order.
    items: results.flatMap((result) => result.items),
  }
}

export async function fetchCategoryListings(category) {
  const result = await fetchCategory(category)

  // Preserve the exact API response order.
  return result.items
}

export async function fetchVipListings() {
  const data = await fetchJson('vips')

  if (!Array.isArray(data)) {
    return []
  }

  // VIP placement remains controlled only by the API's vip_order behavior.
  return data
    .map((item) => normalizeVipCarouselItem(homeCategories, item))
    .filter(Boolean)
}
