'use client'

import { useEffect, useMemo, useSyncExternalStore } from 'react'
import {
  localeCookieName,
  replacePathLocale,
} from '@/i18n/config.js'
import {
  AppPreferencesContext,
  STORAGE_KEYS,
  THEMES,
} from './app-preferences.js'

const PREFERENCES_EVENT = 'app-preferences-change'
const EMPTY_WISHLIST = '[]'

function subscribeToPreferences(callback) {
  const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')

  window.addEventListener('storage', callback)
  window.addEventListener(PREFERENCES_EVENT, callback)
  colorScheme.addEventListener('change', callback)

  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener(PREFERENCES_EVENT, callback)
    colorScheme.removeEventListener('change', callback)
  }
}

function emitPreferenceChange() {
  window.dispatchEvent(new Event(PREFERENCES_EVENT))
}

function getThemeSnapshot() {
  const storedTheme = window.localStorage.getItem(STORAGE_KEYS.theme)

  if (storedTheme === THEMES.LIGHT || storedTheme === THEMES.DARK) {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEMES.DARK
    : THEMES.LIGHT
}

function getWishlistSnapshot() {
  return window.localStorage.getItem(STORAGE_KEYS.wishlist) || EMPTY_WISHLIST
}

function parseWishlist(snapshot) {
  try {
    const wishlist = JSON.parse(snapshot)

    return Array.isArray(wishlist) ? wishlist : []
  } catch {
    return []
  }
}

function writePreference(key, value) {
  window.localStorage.setItem(key, value)
  emitPreferenceChange()
}

function createWishlistItem(item) {
  return {
    id: item.id,
    categoryId: item.categoryId,
    categoryName: item.categoryName,
    title: item.title,
    description: item.description,
    imageUrl: item.imageUrl,
    href: item.href,
    detailsHref: item.detailsHref,
  }
}

export function AppProvider({ children, language }) {
  const theme = useSyncExternalStore(
    subscribeToPreferences,
    getThemeSnapshot,
    () => THEMES.LIGHT,
  )
  const wishlistSnapshot = useSyncExternalStore(
    subscribeToPreferences,
    getWishlistSnapshot,
    () => EMPTY_WISHLIST,
  )
  const wishlist = useMemo(
    () => parseWishlist(wishlistSnapshot),
    [wishlistSnapshot],
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dataset.language = language
  }, [language])

  function setTheme(nextTheme) {
    writePreference(STORAGE_KEYS.theme, nextTheme)
  }

  function setLanguage(nextLanguage) {
    document.cookie = `${localeCookieName}=${nextLanguage}; Max-Age=31536000; Path=/; SameSite=Lax`
    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`
    // Root layouts persist across soft navigation, so locale changes must reload
    // the document to keep <html lang>, shell copy, and route metadata in sync.
    window.location.assign(replacePathLocale(currentPath, nextLanguage))
  }

  function setWishlist(nextWishlist) {
    writePreference(STORAGE_KEYS.wishlist, JSON.stringify(nextWishlist))
  }

  function toggleWishlist(item) {
    const isSaved = wishlist.some(
      (wishlistItem) => wishlistItem.id === item.id,
    )

    setWishlist(
      isSaved
        ? wishlist.filter((wishlistItem) => wishlistItem.id !== item.id)
        : [...wishlist, createWishlistItem(item)],
    )
  }

  function removeFromWishlist(itemId) {
    setWishlist(wishlist.filter((item) => item.id !== itemId))
  }

  const value = {
    language,
    setLanguage,
    theme,
    setTheme,
    wishlist,
    toggleWishlist,
    removeFromWishlist,
    isInWishlist: (itemId) => wishlist.some((item) => item.id === itemId),
    toggleTheme: () =>
      setTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK),
  }

  return (
    <AppPreferencesContext.Provider value={value}>
      {children}
    </AppPreferencesContext.Provider>
  )
}
