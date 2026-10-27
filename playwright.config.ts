import { defineConfig, devices } from '@playwright/test';


const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  expect: {
    timeout: 10000
  },
  fullyParallel: true, /* Run tests in files in parallel */
  forbidOnly: isCI, /* Fail the build on CI if you accidentally left test.only in the source code. */
  retries: isCI ? 2 : 0, /* Retry on CI only */
  workers: isCI ? 4 : undefined, /* Opt out of parallel tests on CI. */
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  // reporter: [['html'], ['allure-playwright']],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'https://demo.realworld.show', /* Base URL to use in actions like `await page.goto('')`. */
    // headless: false, /* Run tests in headful mode. */
    // testIdAttribute: 'data-test-id', /* Attribute to use for test selectors. */
    trace: 'on-first-retry', /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 15_000, /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    navigationTimeout: 30_000, /* Maximum time each navigation such as `page.goto()` can take. Defaults to 30 seconds, pass 0 to disable timeout. */
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        screenshot: 'on',
        video: 'on',
        trace: 'on',
        viewport: { width: 1536, height: 864 } 
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
  ],
});
