import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Visual Regression and E2E Test Suite
 * Compares screenshots pixel-by-pixel with configured threshold tolerances
 */
export default defineConfig({
  testDir: './e2e',
  snapshotDir: './e2e/snapshots',
  snapshotPathTemplate: '{snapshotDir}/{testFileName}-snapshots/{arg}-{projectName}{ext}',
  timeout: 30 * 1000,
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.05, // Pixel difference tolerance across environments
      animations: 'disabled'
    }
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list']
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 14'] }
    },
    {
      name: 'Tablet iPad',
      use: { ...devices['iPad Pro 11'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  }
});
