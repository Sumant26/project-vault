import { test, expect } from '@playwright/test';

test.describe('Pixel-by-Pixel Visual Regression Suite', () => {
  test('Launchpad View renders consistently across viewports', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.launchpad-grid');
    
    // Pixel snapshot comparison
    await expect(page).toHaveScreenshot('launchpad-view-baseline.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02
    });
  });

  test('Viewport View interactive layout matches baseline', async ({ page }) => {
    await page.goto('/');
    // Switch to Viewport mode
    await page.click('button:has-text("Viewport")');
    await page.waitForSelector('.viewport-layout');

    await expect(page).toHaveScreenshot('viewport-mode-baseline.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02
    });
  });

  test('Deck View showcase cards match baseline', async ({ page }) => {
    await page.goto('/');
    // Switch to Deck mode
    await page.click('button:has-text("Deck")');
    await page.waitForSelector('.deck-grid');

    await expect(page).toHaveScreenshot('deck-mode-baseline.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02
    });
  });

  test('Add Project Modal appearance matches design tokens', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Add Project")');
    await page.waitForSelector('.modal-dialog');

    await expect(page.locator('.modal-dialog')).toHaveScreenshot('add-project-modal-baseline.png', {
      maxDiffPixelRatio: 0.02
    });
  });
});
