import { defineConfig, devices } from '@playwright/test'

const isCi = Boolean(process.env.CI)

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: isCi,
  retries: isCi ? 2 : 0,
  reporter: isCi ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:3210',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'node tests/e2e/mock-api.mjs',
      url: 'http://127.0.0.1:4210/health',
      reuseExistingServer: !isCi,
      timeout: 30_000,
    },
    {
      command: 'npm run dev -- --hostname 127.0.0.1 --port 3210',
      url: 'http://127.0.0.1:3210/ka',
      env: {
        API_BASE_URL: 'http://127.0.0.1:4210/api',
        NEXT_DIST_DIR: '.next-e2e',
      },
      reuseExistingServer: !isCi,
      timeout: 120_000,
    },
  ],
})
