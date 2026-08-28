'use client'

import { useEffect } from 'react'

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="feedback-card route-feedback" role="alert">
      <p>გვერდის ჩატვირთვა ვერ მოხერხდა. / The page could not be loaded.</p>
      <button type="button" onClick={reset}>
        ხელახლა ცდა / Try again
      </button>
    </div>
  )
}
