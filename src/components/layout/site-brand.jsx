import Link from 'next/link'

export function SiteBrand({ label, language }) {
  return (
    <Link className="brand" href={`/${language}`} aria-label={label}>
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-mark__spark"></span>
      </span>
      <span className="brand-name">{label}</span>
    </Link>
  )
}
