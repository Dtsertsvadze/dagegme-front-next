const LINK_CATEGORY_IDS = new Set([
  'bands',
  'djs',
  'photographers',
  'videographers',
])

const GALLERY_CATEGORY_IDS = new Set([
  'bands',
  'photographers',
  'rental-cars',
  'studios',
])

export function normalizeLinks(links) {
  if (typeof links === 'string') {
    try {
      return normalizeLinks(JSON.parse(links))
    } catch {
      return links.trim() ? [links.trim()] : []
    }
  }

  if (!Array.isArray(links)) {
    return []
  }

  return links.filter(
    (link) => typeof link === 'string' && link.trim() !== '',
  )
}

export function normalizeLocalizedField(item, field) {
  const value = item[field]

  if (value && typeof value === 'object') {
    return {
      en: value.en || value.ka || '',
      ka: value.ka || value.en || '',
    }
  }

  const fallback = typeof value === 'string' ? value : ''

  return {
    en: item[`${field}_en`] || item[`${field}_ka`] || fallback,
    ka: item[`${field}_ka`] || item[`${field}_en`] || fallback,
  }
}

function normalizeTitle(category, item) {
  if (category.id === 'rental-cars') {
    const mark = normalizeLocalizedField(item, 'mark')
    const model = normalizeLocalizedField(item, 'model')

    return {
      en: [mark.en, model.en].filter(Boolean).join(' '),
      ka: [mark.ka, model.ka].filter(Boolean).join(' '),
    }
  }

  return normalizeLocalizedField(item, 'name')
}

function normalizePhotos(photos) {
  if (!Array.isArray(photos)) {
    return []
  }

  return photos.map((photo) => photo?.photo_url).filter(Boolean)
}

export function normalizeListing(category, item) {
  const links = LINK_CATEGORY_IDS.has(category.id)
    ? normalizeLinks(item.links)
    : []

  return {
    id: `${category.id}-${item.id}`,
    providerId: item.id,
    categoryId: category.id,
    categoryName: category.labels,
    title: normalizeTitle(category, item),
    description: normalizeLocalizedField(item, 'description'),
    imageUrl: item.profile_photo_url || '',
    detailsHref: `/professionals/${category.id}/${item.id}`,
    href: links[0] || '',
    links,
    vip: Boolean(item.vip),
    sortOrder: item.sort_order ?? null,
    photos: GALLERY_CATEGORY_IDS.has(category.id)
      ? normalizePhotos(item.photos)
      : [],
  }
}

export function normalizeVipCarouselItem(categories, item) {
  const providerType = item?.provider_type
  const provider = item?.provider
  const category = categories.find(
    (candidate) => candidate.entityType === providerType,
  )

  if (
    !category ||
    !provider ||
    provider.id === undefined ||
    provider.id === null
  ) {
    return null
  }

  return {
    id: `${providerType}-${provider.id}`,
    providerId: provider.id,
    categoryId: category.id,
    categoryName: category.labels,
    title: provider.name,
    description: provider.description || '',
    imageUrl: provider.profile_photo_url || '',
    detailsHref: `/professionals/${category.id}/${provider.id}`,
    href: '',
    links: [],
    photos: [],
    vip: true,
    vipOrder: provider.vip_order,
  }
}
