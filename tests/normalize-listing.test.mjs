import assert from 'node:assert/strict'
import test from 'node:test'
import {
  normalizeLinks,
  normalizeListing,
  normalizeLocalizedField,
  normalizeVipCarouselItem,
} from '../src/features/listings/lib/normalize-listing.mjs'
import { homeCategories } from '../src/content/home-categories.js'

const photographerCategory = {
  id: 'photographers',
  endpoint: 'photographers',
  entityType: 'photographer',
  labels: { en: 'Photographer', ka: 'Photographer KA' },
}

test('normalizes localized API fields and falls back between languages', () => {
  assert.deepEqual(
    normalizeLocalizedField({ name_en: 'Name', name_ka: '' }, 'name'),
    { en: 'Name', ka: 'Name' },
  )
  assert.deepEqual(
    normalizeLocalizedField({ description: { en: '', ka: 'Text' } }, 'description'),
    { en: 'Text', ka: 'Text' },
  )
})

test('normalizes JSON and array link values', () => {
  assert.deepEqual(normalizeLinks('["https://one.test","https://two.test"]'), [
    'https://one.test',
    'https://two.test',
  ])
  assert.deepEqual(normalizeLinks(null), [])
})

test('keeps sort_order as data without applying frontend sorting', () => {
  const providers = [
    { id: 1, name: { en: 'First', ka: 'First' }, sort_order: 8 },
    { id: 2, name: { en: 'Second', ka: 'Second' }, sort_order: 2 },
  ]
  const listings = providers.map((provider) =>
    normalizeListing(photographerCategory, provider),
  )

  assert.deepEqual(
    listings.map((listing) => listing.id),
    ['photographers-1', 'photographers-2'],
  )
  assert.deepEqual(
    listings.map((listing) => listing.sortOrder),
    [8, 2],
  )
  assert.equal(listings[0].providerId, 1)
  assert.equal(
    listings[0].detailsHref,
    '/professionals/photographers/1',
  )
})

test('builds rental-car titles and gallery photos', () => {
  const rentalCategory = {
    id: 'rental-cars',
    labels: { en: 'Rental car', ka: 'Rental car KA' },
  }
  const listing = normalizeListing(rentalCategory, {
    id: 4,
    mark: { en: 'Mercedes', ka: 'Mercedes KA' },
    model: { en: 'S Class', ka: 'S Class KA' },
    description: { en: 'Description', ka: 'Description KA' },
    photos: [{ photo_url: '/one.jpg' }, { photo_url: '' }],
    sort_order: null,
  })

  assert.deepEqual(listing.title, {
    en: 'Mercedes S Class',
    ka: 'Mercedes KA S Class KA',
  })
  assert.deepEqual(listing.photos, ['/one.jpg'])
  assert.equal(listing.sortOrder, null)
})

test('builds provider detail URLs for every public category', () => {
  for (const category of homeCategories) {
    const provider =
      category.id === 'rental-cars'
        ? { id: 11, mark: 'Mercedes', model: 'S Class' }
        : { id: 11, name: 'Provider' }
    const listing = normalizeListing(category, provider)

    assert.equal(listing.providerId, 11)
    assert.equal(
      listing.detailsHref,
      `/professionals/${category.id}/11`,
    )
  }
})

test('maps VIP providers to their category without changing vip_order', () => {
  const listing = normalizeVipCarouselItem([photographerCategory], {
    provider_type: 'photographer',
    provider: {
      id: 9,
      name: { en: 'VIP', ka: 'VIP KA' },
      vip_order: 3,
    },
  })

  assert.equal(listing.providerId, 9)
  assert.equal(listing.detailsHref, '/professionals/photographers/9')
  assert.equal(listing.vipOrder, 3)
})
