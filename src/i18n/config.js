export const locales = ['ka', 'en']
export const defaultLocale = 'ka'
export const localeCookieName = 'site-locale'

export function hasLocale(value) {
  return locales.includes(value)
}

export function localizePath(path, locale) {
  if (!path.startsWith('/')) {
    return path
  }

  const suffixIndexes = [path.indexOf('?'), path.indexOf('#')].filter(
    (index) => index >= 0,
  )
  const suffixIndex = suffixIndexes.length > 0 ? Math.min(...suffixIndexes) : -1
  const suffix = suffixIndex >= 0 ? path.slice(suffixIndex) : ''
  const pathname = suffixIndex >= 0 ? path.slice(0, suffixIndex) : path
  const segments = pathname.split('/').filter(Boolean)

  if (hasLocale(segments[0])) {
    segments[0] = locale
  } else {
    segments.unshift(locale)
  }

  return `/${segments.join('/')}${suffix}`
}

export function replacePathLocale(pathname, locale) {
  return localizePath(pathname || '/', locale)
}
