import { expect, test } from "@playwright/test"

test.describe(`demo`, () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.route("/thing", route => {
      route.fulfill({ status: 200 })
    })
    await page.goto(baseURL)
    await page.waitForLoadState("networkidle")
  })

  test(`simple`, async ({ page }) => {
    const button = await page.$("#button")
    expect(await button.textContent()).toMatch("click me!")

    await button.click()
    await page.waitForResponse("/thing")

    const result = await page.$("#result")
    expect(await result.textContent()).toMatch("200")
  })
})
