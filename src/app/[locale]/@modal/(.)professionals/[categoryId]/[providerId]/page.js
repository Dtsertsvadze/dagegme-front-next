import { notFound } from 'next/navigation'
import { ProviderDetails } from '@/components/home/listing-detail-modal.jsx'
import { getProviderDetail } from '@/features/listings/server/provider-detail.js'

export default async function ProviderModal({ params }) {
  const { categoryId, locale, providerId } = await params
  const detail = await getProviderDetail(categoryId, providerId)

  if (!detail) {
    notFound()
  }

  return <ProviderDetails item={detail.item} language={locale} mode="modal" />
}
