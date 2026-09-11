import Image from 'next/image'
import Link from 'next/link'

export function SiteBrand({ label, language }) {
  return (
    <Link className="brand" href={`/${language}`} aria-label={label}>
      <Image
        className="brand-mark"
        src="/site-logo.png"
        alt=""
        width={512}
        height={443}
        aria-hidden="true"
      />
      <span className="brand-name">{label}</span>
    </Link>
  )
}
