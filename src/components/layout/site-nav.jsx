import Link from 'next/link'

export function SiteNav({ items }) {
  return (
    <nav className="site-nav" aria-label="Primary">
      {items.map((item) => (
        <Link key={item.href} className="site-nav__link" href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
