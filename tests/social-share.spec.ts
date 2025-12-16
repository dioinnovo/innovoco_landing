import { test, expect } from '@playwright/test';

test.describe('Social Share Buttons', () => {
  test('should display social share buttons on blog article page', async ({ page }) => {
    // Navigate to a blog article
    await page.goto('/blog');

    // Click on the first article
    const firstArticle = page.locator('a[href^="/blog/"]').first();
    await firstArticle.click();

    // Wait for the article page to load
    await page.waitForURL(/\/blog\/.+/);

    // Check that social share buttons are visible
    const shareSection = page.locator('text=Share:');
    await expect(shareSection).toBeVisible();

    // Check X (Twitter) share button
    const xButton = page.locator('a[aria-label="Share on X (Twitter)"]');
    await expect(xButton).toBeVisible();
    const xHref = await xButton.getAttribute('href');
    expect(xHref).toContain('twitter.com/intent/tweet');
    expect(xHref).toContain('url=');

    // Check LinkedIn share button
    const linkedinButton = page.locator('a[aria-label="Share on LinkedIn"]');
    await expect(linkedinButton).toBeVisible();
    const linkedinHref = await linkedinButton.getAttribute('href');
    expect(linkedinHref).toContain('linkedin.com/sharing/share-offsite');
    expect(linkedinHref).toContain('url=');

    // Check Facebook share button
    const facebookButton = page.locator('a[aria-label="Share on Facebook"]');
    await expect(facebookButton).toBeVisible();
    const facebookHref = await facebookButton.getAttribute('href');
    expect(facebookHref).toContain('facebook.com/sharer/sharer');
    expect(facebookHref).toContain('u=');

    // Check Copy Link button
    const copyButton = page.locator('button[aria-label="Copy link"]');
    await expect(copyButton).toBeVisible();
  });

  test('LinkedIn share button opens LinkedIn share dialog with correct URL', async ({ page, context }) => {
    // Navigate to a blog article
    await page.goto('/blog');

    // Click on the first article
    const firstArticle = page.locator('a[href^="/blog/"]').first();
    await firstArticle.click();
    await page.waitForURL(/\/blog\/.+/);

    // Get the current article URL slug
    const currentUrl = page.url();
    const slug = currentUrl.split('/blog/')[1];

    // Get the LinkedIn share button
    const linkedinButton = page.locator('a[aria-label="Share on LinkedIn"]');
    const linkedinHref = await linkedinButton.getAttribute('href');

    // Verify the LinkedIn share URL contains the correct article URL
    expect(linkedinHref).toContain(encodeURIComponent(`https://innovoco.com/blog/${slug}`));

    // Listen for new page (popup) when clicking the link
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      linkedinButton.click(),
    ]);

    // Verify the popup opened to LinkedIn
    const popupUrl = popup.url();
    expect(popupUrl).toContain('linkedin.com');
  });

  test('X share button opens Twitter/X share dialog', async ({ page, context }) => {
    // Navigate to a blog article
    await page.goto('/blog');

    // Click on the first article
    const firstArticle = page.locator('a[href^="/blog/"]').first();
    await firstArticle.click();
    await page.waitForURL(/\/blog\/.+/);

    // Get the X share button
    const xButton = page.locator('a[aria-label="Share on X (Twitter)"]');

    // Listen for new page (popup) when clicking the link
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      xButton.click(),
    ]);

    // Verify the popup opened to Twitter/X (Twitter redirects to x.com)
    const popupUrl = popup.url();
    expect(popupUrl.includes('twitter.com') || popupUrl.includes('x.com')).toBe(true);
  });

  test('Copy link button copies URL to clipboard', async ({ page, browserName }) => {
    // Skip clipboard test in WebKit as it has different clipboard handling
    test.skip(browserName === 'webkit', 'Clipboard API works differently in WebKit');

    // Navigate to a blog article
    await page.goto('/blog');

    // Click on the first article
    const firstArticle = page.locator('a[href^="/blog/"]').first();
    await firstArticle.click();
    await page.waitForURL(/\/blog\/.+/);

    // Grant clipboard permissions
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);

    // Click the copy button
    const copyButton = page.locator('button[aria-label="Copy link"]');
    await copyButton.click();

    // Check that the button shows "Copied!" state
    await expect(page.locator('button[aria-label="Link copied!"]')).toBeVisible();

    // Verify clipboard content
    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardContent).toContain('https://innovoco.com/blog/');
  });
});
