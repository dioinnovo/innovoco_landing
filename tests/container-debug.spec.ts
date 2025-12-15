import { test, expect } from '@playwright/test';

test.describe('Container Debug', () => {
  test('debug container centering', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find all containers and check their computed styles
    const containers = await page.evaluate(() => {
      const results: Array<{
        className: string;
        tag: string;
        computedWidth: string;
        computedMaxWidth: string;
        computedMarginLeft: string;
        computedMarginRight: string;
        computedMarginInline: string;
        computedPaddingLeft: string;
        computedPaddingRight: string;
        boundingLeft: number;
        boundingWidth: number;
        parentWidth: number;
        isCentered: boolean;
      }> = [];

      const elements = document.querySelectorAll('.container');
      elements.forEach((el, index) => {
        if (index < 5) {
          const computed = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          const parent = el.parentElement;
          const parentRect = parent?.getBoundingClientRect();

          results.push({
            className: el.className.substring(0, 100),
            tag: el.tagName,
            computedWidth: computed.width,
            computedMaxWidth: computed.maxWidth,
            computedMarginLeft: computed.marginLeft,
            computedMarginRight: computed.marginRight,
            computedMarginInline: computed.marginInline,
            computedPaddingLeft: computed.paddingLeft,
            computedPaddingRight: computed.paddingRight,
            boundingLeft: rect.left,
            boundingWidth: rect.width,
            parentWidth: parentRect?.width || 0,
            isCentered: rect.left > 0 && rect.left === (parentRect?.width || 0) - rect.width - rect.left,
          });
        }
      });

      return results;
    });

    console.log('Container Debug Results:');
    containers.forEach((c, i) => {
      console.log(`\n--- Container ${i + 1} ---`);
      console.log(`Class: ${c.className}`);
      console.log(`Tag: ${c.tag}`);
      console.log(`Width: ${c.computedWidth}, Max-Width: ${c.computedMaxWidth}`);
      console.log(`Margin L/R: ${c.computedMarginLeft} / ${c.computedMarginRight}`);
      console.log(`Margin Inline: ${c.computedMarginInline}`);
      console.log(`Padding L/R: ${c.computedPaddingLeft} / ${c.computedPaddingRight}`);
      console.log(`Bounding Left: ${c.boundingLeft}, Width: ${c.boundingWidth}`);
      console.log(`Parent Width: ${c.parentWidth}`);
      console.log(`Is Centered: ${c.isCentered}`);
    });

    // Check if containers ARE actually centered
    const centeredContainers = containers.filter(c => c.boundingLeft > 100);
    console.log(`\n${centeredContainers.length} of ${containers.length} containers appear to be centered (left > 100px)`);

    // Verify horizontal padding exists on page
    const pagePadding = await page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      const main = document.querySelector('main');
      const mainComputed = main ? window.getComputedStyle(main) : null;

      return {
        bodyPaddingLeft: computed.paddingLeft,
        bodyPaddingRight: computed.paddingRight,
        mainPaddingLeft: mainComputed?.paddingLeft,
        mainPaddingRight: mainComputed?.paddingRight,
      };
    });

    console.log('\nPage Padding:');
    console.log(pagePadding);
  });

  test('check px-4 and px-6 classes', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const paddingClasses = await page.evaluate(() => {
      const results: Array<{
        className: string;
        paddingLeft: string;
        paddingRight: string;
      }> = [];

      // Check elements with px-4 or px-6
      const px4Elements = document.querySelectorAll('[class*="px-"]');
      px4Elements.forEach((el, index) => {
        if (index < 10) {
          const computed = window.getComputedStyle(el);
          if (computed.paddingLeft !== '0px') {
            results.push({
              className: el.className.substring(0, 80),
              paddingLeft: computed.paddingLeft,
              paddingRight: computed.paddingRight,
            });
          }
        }
      });

      return results;
    });

    console.log('Elements with horizontal padding:');
    paddingClasses.forEach((p, i) => {
      console.log(`${i + 1}. ${p.className} -> ${p.paddingLeft} / ${p.paddingRight}`);
    });
  });
});
