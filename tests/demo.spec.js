import { expect, test } from "@playwright/test"

test.describe(`demo cases`, () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL)
    await page.waitForLoadState("networkidle")
  })

  test(`simple`, async ({ page }) => {
    const content = await page.content()
    expect(content).toMatch("click me!")
  })
})
