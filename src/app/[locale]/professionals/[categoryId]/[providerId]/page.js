import { notFound } from 'next/navigation'
import { ProviderDetails } from '@/components/home/listing-detail-modal.jsx'
import {
  getProviderDetail,
  getProviderMetadata,
} from '@/features/listings/server/provider-detail.js'

export async function generateMetadata({ params }) {
  return getProviderMetadata(await params)
}

export default async function ProviderPage({ params }) {
  const { categoryId, locale, providerId } = await params
  const detail = await getProviderDetail(categoryId, providerId)

  if (!detail) {
    notFound()
  }

  return <ProviderDetails item={detail.item} language={locale} mode="page" />
}
