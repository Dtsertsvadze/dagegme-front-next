import { NextResponse } from 'next/server'
import {
  defaultLocale,
  hasLocale,
  localeCookieName,
} from '@/i18n/config.js'

function getPathLocale(pathname) {
  return pathname.split('/').filter(Boolean)[0]
}

export function proxy(request) {
  const { pathname } = request.nextUrl
  const pathLocale = getPathLocale(pathname)

  if (hasLocale(pathLocale)) {
    const response = NextResponse.next()
    response.cookies.set(localeCookieName, pathLocale, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
    })
    return response
  }

  const cookieLocale = request.cookies.get(localeCookieName)?.value
  const locale = hasLocale(cookieLocale) ? cookieLocale : defaultLocale
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`

  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
}
