import { expect, test } from "@playwright/test"
import fetch from "node-fetch"
import quibble from "quibble"

import { thing } from "./thing.js"

test.describe(`demo`, () => {
  test.beforeEach(async ({ page, baseURL }) => {
    quibble("./thing", { thing: "blaaargh" })

    await page.route("/thing", async route => {
      // const body = await fetch("https://httpbin.org/get")
      //   .then(res => res.json())
      //   .then(res => res.url)

      route.fulfill({ status: 200, body: thing })
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
    expect(await result.textContent()).toMatch("https://httpbin.org/get")
  })
})
