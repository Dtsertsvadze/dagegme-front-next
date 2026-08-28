import Link from 'next/link'
import { localizePath } from '@/i18n/config.js'

export function SiteNav({ items, language }) {
  return (
    <nav className="site-nav" aria-label="Primary">
      {items.map((item) => (
        <Link
          key={item.href}
          className="site-nav__link"
          href={localizePath(item.href, language)}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
