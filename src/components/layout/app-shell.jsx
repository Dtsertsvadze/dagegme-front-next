'use client'

import { AppProvider } from '@/state/app-provider.jsx'
import { SiteFooter } from './site-footer.jsx'
import { SiteHeader } from './site-header.jsx'

export function AppShell({ children, language, modal }) {
  return (
    <AppProvider language={language}>
      <div className="app-shell">
        <div className="page-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </div>
      {modal}
    </AppProvider>
  )
}
