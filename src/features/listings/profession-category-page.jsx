'use client'

import Link from 'next/link'
import { ListingCard } from '@/components/home/listing-card.jsx'
import { siteCopy } from '@/content/site-copy.js'
import { useAppPreferences } from '@/state/app-preferences.js'

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M19 12H5M10 7l-5 5l5 5" />
    </svg>
  )
}

export function ProfessionCategoryPage({ category, items, hasError }) {
  const { language } = useAppPreferences()
  const copy = siteCopy[language].professionals
  const categoryTitle =
    copy.categoryTitles[category.id] || category.labels[language]

  return (
    <div className="profession-category-page">
      <Link className="profession-category-page__back" href="/professionals">
        <BackIcon />
        <span>{copy.categoryPage.back}</span>
      </Link>

      <header className="profession-category-header">
        <div>
          <p>{copy.eyebrow}</p>
          <h1>{categoryTitle}</h1>
          <span>{copy.categoryPage.subtitle}</span>
        </div>
      </header>

      {hasError ? (
        <div
          className="feedback-card profession-category-page__feedback"
          role="alert"
        >
          {copy.error}
        </div>
      ) : (
        <>
          <p className="profession-category-page__count">
            {copy.categoryPage.results.replace('{count}', items.length)}
          </p>
          {items.length > 0 ? (
            <div className="professionals-listing-grid">
              {items.map((item) => (
                <ListingCard key={item.id} item={item} language={language} />
              ))}
            </div>
          ) : (
            <div className="feedback-card profession-category-page__feedback">
              {copy.categoryPage.empty}
            </div>
          )}
        </>
      )}
    </div>
  )
}
