import { expect, test } from "@playwright/test"

test.describe(`demo`, () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL)
    await page.waitForLoadState("networkidle")
  })

  test(`simple`, async ({ page }) => {
    const button = await page.$("#button")
    expect(await button.textContent()).toMatch("click me!")

    await button.click()
    await page.waitForResponse("https://httpbin.org/get")

    const result = await page.$("#result")
    expect(await result.textContent()).toMatch("httpbin")
  })
})
