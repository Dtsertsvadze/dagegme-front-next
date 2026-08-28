import assert from 'node:assert/strict'
import test from 'node:test'
import { localizePath, replacePathLocale } from '../src/i18n/config.js'

test('adds a locale to internal paths and preserves hash fragments', () => {
  assert.equal(localizePath('/professionals', 'ka'), '/ka/professionals')
  assert.equal(localizePath('/#categories', 'en'), '/en#categories')
  assert.equal(
    localizePath('/en/professionals?page=2#results', 'ka'),
    '/ka/professionals?page=2#results',
  )
})

test('replaces an existing path locale', () => {
  assert.equal(
    replacePathLocale('/ka/professionals/photographers/7', 'en'),
    '/en/professionals/photographers/7',
  )
})

test('does not modify external URLs', () => {
  assert.equal(localizePath('https://example.com', 'ka'), 'https://example.com')
})
