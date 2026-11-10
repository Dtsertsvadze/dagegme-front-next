function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7.2 3.5l2.1 4.2l-2.2 1.8a15.2 15.2 0 0 0 7.4 7.4l1.8-2.2l4.2 2.1l-.7 3.3c-.2.8-.9 1.4-1.8 1.4A15.5 15.5 0 0 1 2.5 6c0-.9.6-1.6 1.4-1.8l3.3-.7Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7l8 6l8-6" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.2 8.2V6.7c0-.7.5-.9 1-.9h2.6V2.1L14.3 2C10.8 2 9 4.1 9 7v1.2H6v4.2h3V22h4.2v-9.6h3.5l.6-4.2h-3.1Z" />
    </svg>
  )
}

export function ContactSection({ content }) {
  return (
    <section id="contact" className="home-section contact-section">
      <div>
        <p className="contact-section__eyebrow">{content.eyebrow}</p>
        <h2>{content.title}</h2>
      </div>
      <div className="contact-section__actions">
        <a
          className="contact-section__link"
          href="tel:+995555500019"
          aria-label={content.phoneLabel}
        >
          <span className="contact-section__link-icon" aria-hidden="true">
            <PhoneIcon />
          </span>
          <span>+995 555 50 00 19</span>
        </a>
        <a
          className="contact-section__link"
          href="mailto:dagegme1@gmail.com"
          aria-label={content.emailLabel}
        >
          <span className="contact-section__link-icon" aria-hidden="true">
            <MailIcon />
          </span>
          <span>dagegme1@gmail.com</span>
        </a>
        <div
          className="contact-section__socials"
          role="group"
          aria-label={content.socialLabel}
        >
          <a
            className="contact-section__link contact-section__link--social"
            href="https://www.instagram.com/dagegme_official?srtk=MWh4NjJxcmhjZGQ4Yw=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label={content.instagramLabel}
          >
            <span className="contact-section__link-icon" aria-hidden="true">
              <InstagramIcon />
            </span>
            <span>Instagram</span>
          </a>
          <a
            className="contact-section__link contact-section__link--social"
            href="https://www.facebook.com/share/18wEsXxF9n/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={content.facebookLabel}
          >
            <span className="contact-section__link-icon" aria-hidden="true">
              <FacebookIcon />
            </span>
            <span>Facebook</span>
          </a>
        </div>
      </div>
    </section>
  )
}
