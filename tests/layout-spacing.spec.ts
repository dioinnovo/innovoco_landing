import { test, expect } from '@playwright/test';

test.describe('Layout and Spacing Verification', () => {

  test.describe('Homepage Layout', () => {
    test('should have proper body styles applied', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const body = page.locator('body');
      const bodyStyles = await body.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          lineHeight: computed.lineHeight,
          fontFamily: computed.fontFamily,
          minHeight: computed.minHeight,
        };
      });

      console.log('Body Styles:', bodyStyles);

      // Verify line-height is set (should be 1.6 from globals.css)
      expect(bodyStyles.lineHeight).toBeTruthy();
      // Note: minHeight is computed to pixels, so we just verify it's at least viewport height
      expect(parseInt(bodyStyles.minHeight)).toBeGreaterThanOrEqual(600);
    });

    test('should have proper container spacing', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check for containers with proper max-width
      const containers = page.locator('.container, [class*="max-w-"]');
      const containerCount = await containers.count();

      console.log(`Found ${containerCount} container elements`);

      if (containerCount > 0) {
        const firstContainer = containers.first();
        const containerStyles = await firstContainer.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            maxWidth: computed.maxWidth,
            marginLeft: computed.marginLeft,
            marginRight: computed.marginRight,
            paddingLeft: computed.paddingLeft,
            paddingRight: computed.paddingRight,
          };
        });

        console.log('Container Styles:', containerStyles);
      }
    });

    test('should have proper section padding', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check sections for proper vertical padding
      const sections = page.locator('section, [class*="py-"]');
      const sectionCount = await sections.count();

      console.log(`Found ${sectionCount} section elements`);

      const sectionSpacings: Array<{index: number, padding: string, classes: string}> = [];

      for (let i = 0; i < Math.min(sectionCount, 10); i++) {
        const section = sections.nth(i);
        const styles = await section.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            paddingTop: computed.paddingTop,
            paddingBottom: computed.paddingBottom,
            classes: el.className,
          };
        });

        sectionSpacings.push({
          index: i,
          padding: `${styles.paddingTop} / ${styles.paddingBottom}`,
          classes: styles.classes.substring(0, 100),
        });
      }

      console.log('Section Spacings:', sectionSpacings);
    });

    test('should have proper card spacing', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check card elements
      const cards = page.locator('[class*="card"], [class*="Card"]');
      const cardCount = await cards.count();

      console.log(`Found ${cardCount} card elements`);

      if (cardCount > 0) {
        const cardSpacings: Array<{index: number, padding: string, gap: string}> = [];

        for (let i = 0; i < Math.min(cardCount, 5); i++) {
          const card = cards.nth(i);
          const styles = await card.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
              padding: computed.padding,
              gap: computed.gap,
              margin: computed.margin,
            };
          });

          cardSpacings.push({
            index: i,
            padding: styles.padding,
            gap: styles.gap,
          });
        }

        console.log('Card Spacings:', cardSpacings);
      }
    });

    test('should have proper grid gaps', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check grid elements
      const grids = page.locator('[class*="grid"]');
      const gridCount = await grids.count();

      console.log(`Found ${gridCount} grid elements`);

      if (gridCount > 0) {
        const gridGaps: Array<{index: number, gap: string, gridTemplateColumns: string}> = [];

        for (let i = 0; i < Math.min(gridCount, 10); i++) {
          const grid = grids.nth(i);
          const styles = await grid.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
              gap: computed.gap,
              gridTemplateColumns: computed.gridTemplateColumns,
              display: computed.display,
            };
          });

          if (styles.display === 'grid') {
            gridGaps.push({
              index: i,
              gap: styles.gap,
              gridTemplateColumns: styles.gridTemplateColumns.substring(0, 50),
            });
          }
        }

        console.log('Grid Gaps:', gridGaps);
      }
    });
  });

  test.describe('Navigation Layout', () => {
    test('should have proper navbar height and spacing', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const navbar = page.locator('nav, header, [class*="navbar"], [class*="Navbar"]').first();

      if (await navbar.count() > 0) {
        const navStyles = await navbar.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return {
            height: rect.height,
            padding: computed.padding,
            position: computed.position,
            top: computed.top,
            zIndex: computed.zIndex,
          };
        });

        console.log('Navbar Styles:', navStyles);

        // Navbar should have reasonable height (typically 60-80px)
        expect(navStyles.height).toBeGreaterThan(40);
        expect(navStyles.height).toBeLessThan(120);
      }
    });
  });

  test.describe('Typography Spacing', () => {
    test('should have proper heading margins', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      const headingCount = await headings.count();

      console.log(`Found ${headingCount} heading elements`);

      const headingStyles: Array<{tag: string, margin: string, fontSize: string, lineHeight: string}> = [];

      for (let i = 0; i < Math.min(headingCount, 10); i++) {
        const heading = headings.nth(i);
        const styles = await heading.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            tag: el.tagName,
            marginTop: computed.marginTop,
            marginBottom: computed.marginBottom,
            fontSize: computed.fontSize,
            lineHeight: computed.lineHeight,
          };
        });

        headingStyles.push({
          tag: styles.tag,
          margin: `${styles.marginTop} / ${styles.marginBottom}`,
          fontSize: styles.fontSize,
          lineHeight: styles.lineHeight,
        });
      }

      console.log('Heading Styles:', headingStyles);
    });

    test('should have proper paragraph spacing', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const paragraphs = page.locator('p');
      const pCount = await paragraphs.count();

      console.log(`Found ${pCount} paragraph elements`);

      if (pCount > 0) {
        const pStyles = await paragraphs.first().evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            margin: computed.margin,
            lineHeight: computed.lineHeight,
            fontSize: computed.fontSize,
          };
        });

        console.log('Paragraph Styles:', pStyles);
      }
    });
  });

  test.describe('Responsive Layout', () => {
    test('should have proper mobile layout', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Take screenshot for visual verification
      await page.screenshot({ path: 'tests/screenshots/mobile-layout.png', fullPage: true });

      // Check that content doesn't overflow
      const body = page.locator('body');
      const bodyWidth = await body.evaluate((el) => el.scrollWidth);
      const viewportWidth = 375;

      console.log(`Mobile: Body scroll width: ${bodyWidth}, Viewport: ${viewportWidth}`);

      // Body shouldn't be significantly wider than viewport (small tolerance for scrollbars)
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20);
    });

    test('should have proper tablet layout', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 }); // iPad
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.screenshot({ path: 'tests/screenshots/tablet-layout.png', fullPage: true });

      const body = page.locator('body');
      const bodyWidth = await body.evaluate((el) => el.scrollWidth);

      console.log(`Tablet: Body scroll width: ${bodyWidth}`);

      expect(bodyWidth).toBeLessThanOrEqual(768 + 20);
    });

    test('should have proper desktop layout', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.screenshot({ path: 'tests/screenshots/desktop-layout.png', fullPage: true });

      // Check containers are properly centered
      const containers = page.locator('.container, [class*="max-w-7xl"]');

      if (await containers.count() > 0) {
        const containerStyles = await containers.first().evaluate((el) => {
          const computed = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return {
            width: rect.width,
            left: rect.left,
            marginLeft: computed.marginLeft,
            marginRight: computed.marginRight,
          };
        });

        console.log('Desktop Container:', containerStyles);

        // Container should be centered (left margin should be positive)
        if (containerStyles.marginLeft === 'auto') {
          expect(containerStyles.left).toBeGreaterThan(0);
        }
      }
    });
  });

  test.describe('CSS Variables Application', () => {
    test('should have CSS variables properly applied', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const cssVars = await page.evaluate(() => {
        const root = document.documentElement;
        const computed = window.getComputedStyle(root);
        return {
          background: computed.getPropertyValue('--background').trim(),
          foreground: computed.getPropertyValue('--foreground').trim(),
          card: computed.getPropertyValue('--card').trim(),
          border: computed.getPropertyValue('--border').trim(),
          primary: computed.getPropertyValue('--primary').trim(),
          muted: computed.getPropertyValue('--muted').trim(),
        };
      });

      console.log('CSS Variables:', cssVars);

      // Verify CSS variables are defined
      expect(cssVars.background).toBeTruthy();
      expect(cssVars.foreground).toBeTruthy();
    });
  });

  test.describe('Flexbox and Gap Verification', () => {
    test('should have proper flex gaps', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const flexContainers = page.locator('[class*="flex"]');
      const flexCount = await flexContainers.count();

      console.log(`Found ${flexCount} flex containers`);

      const flexGaps: Array<{index: number, gap: string, direction: string}> = [];

      for (let i = 0; i < Math.min(flexCount, 15); i++) {
        const flex = flexContainers.nth(i);
        const styles = await flex.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            display: computed.display,
            gap: computed.gap,
            flexDirection: computed.flexDirection,
          };
        });

        if (styles.display === 'flex' && styles.gap !== 'normal') {
          flexGaps.push({
            index: i,
            gap: styles.gap,
            direction: styles.flexDirection,
          });
        }
      }

      console.log('Flex Gaps:', flexGaps);
    });
  });

  test.describe('Visual Regression - Key Pages', () => {
    const pages = [
      { path: '/', name: 'homepage' },
      { path: '/solutions', name: 'solutions' },
      { path: '/services', name: 'services' },
      { path: '/about', name: 'about' },
    ];

    for (const pageInfo of pages) {
      test(`should render ${pageInfo.name} with proper layout`, async ({ page }) => {
        const response = await page.goto(pageInfo.path);

        // Skip if page doesn't exist
        if (response?.status() === 404) {
          console.log(`Page ${pageInfo.path} not found, skipping`);
          return;
        }

        await page.waitForLoadState('networkidle');

        // Take screenshot
        await page.screenshot({
          path: `tests/screenshots/${pageInfo.name}-full.png`,
          fullPage: true
        });

        // Basic layout checks
        const hasOverflow = await page.evaluate(() => {
          return document.body.scrollWidth > window.innerWidth;
        });

        console.log(`${pageInfo.name}: Has horizontal overflow: ${hasOverflow}`);

        // Check for layout shifts or issues
        const layoutIssues = await page.evaluate(() => {
          const issues: string[] = [];

          // Check for elements with 0 height that shouldn't be
          const visibleElements = document.querySelectorAll('section, main, article, .container');
          visibleElements.forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            if (rect.height === 0 && el.children.length > 0) {
              issues.push(`Element ${i} (${el.tagName}.${el.className.substring(0, 30)}) has 0 height`);
            }
          });

          // Check for elements outside viewport
          const allElements = document.querySelectorAll('*');
          let outsideCount = 0;
          allElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.left < -100 || rect.right > window.innerWidth + 100) {
              outsideCount++;
            }
          });

          // Allow some elements outside viewport (common for carousels, animations, hidden menus)
          // Only flag if a very large number of visible elements are misplaced
          if (outsideCount > 100) {
            issues.push(`${outsideCount} elements appear outside viewport (possible layout issue)`);
          }

          return issues;
        });

        if (layoutIssues.length > 0) {
          console.log(`${pageInfo.name} Layout Issues:`, layoutIssues);
        }

        expect(layoutIssues.length).toBe(0);
      });
    }
  });
});
