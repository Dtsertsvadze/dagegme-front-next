import { expect, test } from '@playwright/test'

const categoryPath = '/ka/professionals/photographers'
const detailPath = `${categoryPath}/7`

test('redirects a legacy unprefixed URL to the preferred locale', async ({
  page,
}) => {
  await page.goto('/professionals/photographers')

  await expect(page).toHaveURL(new RegExp(`${categoryPath}/?$`))
  await expect(page.locator('html')).toHaveAttribute('lang', 'ka')
})

test('opens a provider in a routed modal and Back restores the category', async ({
  page,
}) => {
  await page.goto(categoryPath)

  const detailLink = page.getByRole('link', { name: 'ნახვა' })
  await expect(detailLink).toHaveAttribute('href', detailPath)
  await detailLink.click()

  await expect(page).toHaveURL(new RegExp(`${detailPath}/?$`))
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(
    dialog.getByRole('heading', { name: 'აპერტურა სტუდიო' }),
  ).toBeVisible()

  await page.goBack()

  await expect(page).toHaveURL(new RegExp(`${categoryPath}/?$`))
  await expect(page.getByRole('dialog')).toHaveCount(0)
})

test('refreshing a modal URL renders the full server detail page', async ({
  page,
}) => {
  await page.goto(categoryPath)
  await page.getByRole('link', { name: 'ნახვა' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()

  await page.reload()

  await expect(page).toHaveURL(new RegExp(`${detailPath}/?$`))
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(
    page.getByRole('heading', { level: 1, name: 'აპერტურა სტუდიო' }),
  ).toBeVisible()
})

test('a shared English URL has localized SSR content and metadata', async ({
  page,
}) => {
  const englishPath = '/en/professionals/photographers/7'
  await page.goto(englishPath)

  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(
    page.getByRole('heading', { level: 1, name: 'Aperture Studio' }),
  ).toBeVisible()
  await expect(page).toHaveTitle(/Aperture Studio/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://dagegme.com/en/professionals/photographers/7',
  )
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Documentary wedding and event photography.',
  )
})

test('language switching preserves the current provider URL', async ({ page }) => {
  await page.goto('/en/professionals/photographers/7')
  await page.getByRole('button', { name: 'GEO' }).click()

  await expect(page).toHaveURL(new RegExp(`${detailPath}/?$`))
  await expect(page.locator('html')).toHaveAttribute('lang', 'ka')
  await expect(
    page.getByRole('heading', { name: 'აპერტურა სტუდიო' }),
  ).toBeVisible()
})
