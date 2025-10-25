import { test, expect } from '@playwright/test'

test.describe('Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('Running Unicorns')
  })

  test('podcasts page loads', async ({ page }) => {
    await page.goto('/podcasts')
    await expect(page.locator('h1')).toContainText('All Episodes')
  })

  test('events page loads', async ({ page }) => {
    await page.goto('/events')
    await expect(page.locator('h1')).toContainText('Community Events')
  })

  test('navigation works', async ({ page }) => {
    await page.goto('/')
    await page.click('text=PODCASTS')
    await expect(page).toHaveURL('/podcasts')
  })
})
