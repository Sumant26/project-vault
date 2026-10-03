import { test, expect } from '@playwright/test';

test.describe('Pixel-by-Pixel Visual Regression Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Mock external vercel webapps so iframe renders instantly and deterministically
    await page.route(/^https?:\/\/(?!localhost).*/, route => {
      route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<div style="display:flex;height:100%;align-items:center;justify-content:center;background:#18181b;color:#a1a1aa;font-family:sans-serif;">Sandboxed App Preview</div>'
      });
    });
  });

  test('Launchpad View renders consistently across viewports', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.launchpad-grid');
    
    // Pixel snapshot comparison
    await expect(page).toHaveScreenshot('launchpad-view-baseline.png', {
      maxDiffPixelRatio: 0.08
    });
  });

  test('Viewport View interactive layout matches baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Switch to Viewport mode
    await page.locator('button:has-text("Viewport")').click();
    await page.waitForSelector('.viewport-layout');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('viewport-mode-baseline.png', {
      maxDiffPixelRatio: 0.08,
      timeout: 15000,
      animations: 'disabled',
      mask: [page.locator('.sandbox-iframe')]
    });
  });

  test('Deck View showcase cards match baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Switch to Deck mode
    await page.locator('button:has-text("Deck")').click();
    await page.waitForSelector('.deck-grid');

    await expect(page).toHaveScreenshot('deck-mode-baseline.png', {
      maxDiffPixelRatio: 0.08
    });
  });

  test('Add Project Modal appearance matches design tokens', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('button:has-text("Add Project")').click();
    await page.waitForSelector('.modal-dialog');

    await expect(page.locator('.modal-dialog')).toHaveScreenshot('add-project-modal-baseline.png', {
      maxDiffPixelRatio: 0.08
    });
  });
});
