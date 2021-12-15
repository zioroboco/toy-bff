import { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  webServer: {
    command: `yarn start`,
    port: 8080,
  },
}

export default config
