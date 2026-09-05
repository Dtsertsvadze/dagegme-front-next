'use client'

import { ListingGrid } from '@/components/home/listing-grid.jsx'
import { siteCopy } from '@/content/site-copy.js'
import { useAppPreferences } from '@/state/app-preferences.js'

export function ProfessionalsPage({ categories, items, hasError }) {
  const { language } = useAppPreferences()
  const copy = siteCopy[language].professionals

  return (
    <div className="professionals-page">
      <header className="professionals-hero">
        <p className="professionals-hero__eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="professionals-hero__text">{copy.text}</p>
        <span className="professionals-hero__accent" aria-hidden="true" />
      </header>

      {hasError ? (
        <div className="feedback-card professionals-page__feedback" role="alert">
          {copy.error}
        </div>
      ) : (
        <div className="professionals-rows">
          {categories.map((category) => {
            const categoryItems = items.filter(
              (item) => item.categoryId === category.id,
            )

            if (categoryItems.length === 0) {
              return null
            }

            return (
              <ListingGrid
                key={category.id}
                className="professionals-row"
                title={
                  copy.categoryTitles[category.id] || category.labels[language]
                }
                seeAllHref={`/professionals/${category.id}`}
                items={categoryItems}
                language={language}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
