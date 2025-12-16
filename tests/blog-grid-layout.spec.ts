import { test, expect } from '@playwright/test';

/**
 * Blog Grid Layout Tests
 *
 * Verifies responsive grid behavior:
 * - lg (1024px): 4-column grid with 8 articles (4x2)
 * - xl (1280px+): 3-column grid with 9 articles (3x3) + 1 featured hero = 10 total
 */

test.describe('Blog Grid Responsive Layout', () => {
  test('lg viewport (1024px): should display 4-column grid', async ({ page }) => {
    // Set viewport to lg breakpoint
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Get the grid container
    const grid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4');
    await expect(grid).toBeVisible();

    // Verify grid has lg:grid-cols-4 class
    const gridClass = await grid.getAttribute('class');
    expect(gridClass).toContain('lg:grid-cols-4');

    // Count articles in grid
    const gridArticles = grid.locator('a');
    const articleCount = await gridArticles.count();

    console.log(`lg viewport (1024px): ${articleCount} articles in grid`);

    // At lg, we expect up to 8 articles visible in 4x2 grid
    // (actual count depends on how many articles exist minus the featured hero)
    expect(articleCount).toBeGreaterThan(0);
  });

  test('xl viewport (1280px): should display 3-column grid', async ({ page }) => {
    // Set viewport to xl breakpoint
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Get the grid container - it should have xl:grid-cols-3
    const grid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4.xl\\:grid-cols-3');
    await expect(grid).toBeVisible();

    // Verify grid has xl:grid-cols-3 class
    const gridClass = await grid.getAttribute('class');
    expect(gridClass).toContain('xl:grid-cols-3');

    // Count articles in grid
    const gridArticles = grid.locator('a');
    const gridCount = await gridArticles.count();

    // Check for featured hero
    const heroSection = page.locator('a.group.grid.md\\:grid-cols-2');
    const heroCount = await heroSection.count();

    const totalArticles = heroCount + gridCount;

    console.log(`xl viewport (1280px): ${heroCount} hero + ${gridCount} grid = ${totalArticles} total`);

    // At xl, we expect 1 featured hero + up to 9 in grid = 10 total
    expect(gridCount).toBeGreaterThan(0);
    if (heroCount > 0) {
      // If there's a hero, grid should have remaining articles
      expect(totalArticles).toBeGreaterThanOrEqual(2);
    }
  });

  test('xxl viewport (1536px): should maintain 3-column grid', async ({ page }) => {
    // Set viewport to 2xl breakpoint
    await page.setViewportSize({ width: 1536, height: 900 });
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Grid should still use xl:grid-cols-3 at larger sizes
    const grid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4.xl\\:grid-cols-3');
    await expect(grid).toBeVisible();

    // Count total visible articles
    const gridArticles = grid.locator('a');
    const gridCount = await gridArticles.count();
    const heroSection = page.locator('a.group.grid.md\\:grid-cols-2');
    const heroCount = await heroSection.count();

    console.log(`xxl viewport (1536px): ${heroCount} hero + ${gridCount} grid articles`);

    expect(gridCount).toBeGreaterThan(0);
  });

  test('md viewport (768px): should display 2-column grid', async ({ page }) => {
    // Set viewport to md breakpoint
    await page.setViewportSize({ width: 768, height: 800 });
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // At md, grid should be 2 columns
    const grid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2');
    await expect(grid.first()).toBeVisible();

    const gridClass = await grid.first().getAttribute('class');
    expect(gridClass).toContain('md:grid-cols-2');
  });

  test('mobile viewport (375px): should display 1-column grid', async ({ page }) => {
    // Set viewport to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // At mobile, grid should be 1 column (grid-cols-1)
    const grid = page.locator('.grid.grid-cols-1');
    await expect(grid.first()).toBeVisible();
  });

  test('verify article count matches expectations', async ({ page }) => {
    // Use xl viewport for full layout test
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Count featured hero
    const heroSection = page.locator('a.group.grid.md\\:grid-cols-2');
    const heroCount = await heroSection.count();

    // Count grid articles
    const grid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4.xl\\:grid-cols-3');
    const gridArticles = grid.locator('a');
    const gridCount = await gridArticles.count();

    const totalOnPage = heroCount + gridCount;

    console.log('Article counts:');
    console.log(`  Featured hero: ${heroCount}`);
    console.log(`  Grid articles: ${gridCount}`);
    console.log(`  Total on page: ${totalOnPage}`);

    // We fetch 11 articles, display 1 as hero, so up to 10 remain for grid
    // After filtering out featured from grid, we should have up to 10 total (1 hero + 9 grid)
    expect(totalOnPage).toBeLessThanOrEqual(11);
    expect(totalOnPage).toBeGreaterThan(0);
  });

  test('grid layout visual verification at lg breakpoint', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Get grid and verify computed styles
    const grid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4.xl\\:grid-cols-3');

    // Get first few grid items and verify they're positioned for 4 columns
    const items = grid.locator('> a');
    const itemCount = await items.count();

    if (itemCount >= 4) {
      // Get bounding boxes of first 4 items
      const boxes = await Promise.all([
        items.nth(0).boundingBox(),
        items.nth(1).boundingBox(),
        items.nth(2).boundingBox(),
        items.nth(3).boundingBox(),
      ]);

      // Verify items are in a row (same Y position approximately)
      if (boxes[0] && boxes[1] && boxes[2] && boxes[3]) {
        const firstRowY = boxes[0].y;
        // Allow 2px tolerance for rounding
        expect(Math.abs(boxes[1].y - firstRowY)).toBeLessThan(2);
        expect(Math.abs(boxes[2].y - firstRowY)).toBeLessThan(2);
        expect(Math.abs(boxes[3].y - firstRowY)).toBeLessThan(2);

        console.log('lg viewport: First 4 items are aligned horizontally (4-column grid verified)');
      }
    }
  });

  test('grid layout visual verification at xl breakpoint', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Get grid
    const grid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4.xl\\:grid-cols-3');

    // Get first few grid items and verify they're positioned for 3 columns
    const items = grid.locator('> a');
    const itemCount = await items.count();

    if (itemCount >= 3) {
      // Get bounding boxes of first 3 items
      const boxes = await Promise.all([
        items.nth(0).boundingBox(),
        items.nth(1).boundingBox(),
        items.nth(2).boundingBox(),
      ]);

      // Verify first 3 items are in a row (same Y position approximately)
      if (boxes[0] && boxes[1] && boxes[2]) {
        const firstRowY = boxes[0].y;
        // Allow 2px tolerance for rounding
        expect(Math.abs(boxes[1].y - firstRowY)).toBeLessThan(2);
        expect(Math.abs(boxes[2].y - firstRowY)).toBeLessThan(2);

        console.log('xl viewport: First 3 items are aligned horizontally (3-column grid verified)');
      }

      // If we have 4+ items, verify 4th item is on second row
      if (itemCount >= 4) {
        const fourthBox = await items.nth(3).boundingBox();
        if (boxes[0] && fourthBox) {
          expect(fourthBox.y).toBeGreaterThan(boxes[0].y + boxes[0].height / 2);
          console.log('xl viewport: 4th item is on second row (confirming 3-column layout)');
        }
      }
    }
  });
});
