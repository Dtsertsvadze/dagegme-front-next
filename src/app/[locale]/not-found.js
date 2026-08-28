import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="feedback-card route-feedback">
      <h1>404</h1>
      <p>გვერდი ვერ მოიძებნა. / Page not found.</p>
      <Link href="/">მთავარი / Home</Link>
    </div>
  )
}
