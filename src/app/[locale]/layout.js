import Script from 'next/script'
import { notFound } from 'next/navigation'
import { AppShell } from '@/components/layout/app-shell.jsx'
import { siteCopy } from '@/content/site-copy.js'
import { hasLocale } from '@/i18n/config.js'
import '@/styles/index.css'

export async function generateMetadata({ params }) {
  const { locale } = await params

  if (!hasLocale(locale)) {
    return {}
  }

  const copy = siteCopy[locale]

  return {
    metadataBase: new URL('https://dagegme.com'),
    title: {
      default: copy.brand,
      template: `%s | ${copy.brand}`,
    },
    description: copy.heroText,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        ka: '/ka',
      },
    },
    icons: {
      icon: '/favicon.ico',
    },
  }
}

const preferenceBootstrap = `
  try {
    const storedTheme = localStorage.getItem('app-theme');
    const theme = storedTheme === 'light' || storedTheme === 'dark'
      ? storedTheme
      : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {}
`

export default async function RootLayout({ children, modal, params }) {
  const { locale } = await params

  if (!hasLocale(locale)) {
    notFound()
  }

  return (
    <html
      lang={locale}
      data-language={locale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <Script id="preference-bootstrap" strategy="beforeInteractive">
          {preferenceBootstrap}
        </Script>
        <AppShell language={locale} modal={modal}>
          {children}
        </AppShell>
      </body>
    </html>
  )
}
