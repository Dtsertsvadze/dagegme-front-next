import Image from 'next/image'
import heroImage from '../../assets/hero-event.webp'

export function HeroSection({ titleTop, titleAccent, text }) {
  return (
    <section className="hero" aria-label="Homepage hero">
      <div className="hero__content">
        <h1 className="hero__title">
          <span>{titleTop}</span>
          <span className="hero__title-accent">{titleAccent}</span>
        </h1>
        <p className="hero__text">{text}</p>
      </div>

      <div className="hero__media">
        <Image
          src={heroImage}
          alt=""
          priority
          sizes="(max-width: 760px) 100vw, 50vw"
        />
      </div>
    </section>
  )
}
