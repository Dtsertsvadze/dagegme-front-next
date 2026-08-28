import Script from 'next/script'
import { AppShell } from '@/components/layout/app-shell.jsx'
import '@/styles/index.css'

export const metadata = {
  metadataBase: new URL('https://dagegme.com'),
  title: {
    default: 'Dagegme',
    template: '%s | Dagegme',
  },
  description:
    'Find photographers, videographers, bands, DJs, presenters, studios, and rental cars for your celebration.',
  icons: {
    icon: '/favicon.svg',
  },
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

export default function RootLayout({ children }) {
  return (
    <html lang="ka" data-language="ka" suppressHydrationWarning>
      <body>
        <Script id="preference-bootstrap" strategy="beforeInteractive">
          {preferenceBootstrap}
        </Script>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
