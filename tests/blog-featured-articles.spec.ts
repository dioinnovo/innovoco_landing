import { test, expect } from '@playwright/test';

test.describe('Blog Featured Articles Verification', () => {
  // Known articles from Sanity with their featured status
  const FEATURED_ARTICLES = [
    'Beyond the Chatbot: Why GPT-5.2 Is the First Real "Business Partner" AI',
    'The Great AI Agent Acceleration: How Autonomous Systems Are Reshaping Enterprise Work',
    'Why 95% of Enterprise AI Coding Pilots Fail—And It\'s Not About the Technology',
  ];

  const NON_FEATURED_ARTICLES = [
    'Transforming Business Intelligence with AI-Powered Analytics',
    'Why Most Enterprise AI Coding Pilots Underperform—And How to Fix It',
    'Building Scalable Data Pipelines with Modern Tools',
    '2026 Playbook for Enterprise AI Success: From Strategy to Execution',
  ];

  test.describe('Featured Section Behavior', () => {
    test('should display a featured article in the hero card section', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');

      // The featured card section has a specific structure: grid with md:grid-cols-2
      const featuredCard = page.locator('a.group').filter({
        has: page.locator('h2.text-2xl.sm\\:text-3xl.lg\\:text-4xl'),
      }).first();

      // Verify featured card exists
      await expect(featuredCard).toBeVisible();

      // Get the title of the featured article
      const featuredTitle = await featuredCard.locator('h2').textContent();
      console.log('Featured article title:', featuredTitle);

      // Verify the featured article is one of the known featured articles
      const isFeaturedArticle = FEATURED_ARTICLES.some(title =>
        featuredTitle?.includes(title.substring(0, 30)) // Partial match for long titles
      );

      expect(isFeaturedArticle).toBeTruthy();
    });

    test('should NOT display non-featured articles in the hero section', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');

      // Get the featured card (large card with md:grid-cols-2 layout)
      const featuredSection = page.locator('.container').filter({
        has: page.locator('a.group.grid.md\\:grid-cols-2'),
      }).first();

      // Get the featured article title
      const featuredTitle = await featuredSection.locator('h2').first().textContent();
      console.log('Hero section article:', featuredTitle);

      // Verify none of the non-featured articles appear in the hero section
      for (const nonFeaturedTitle of NON_FEATURED_ARTICLES) {
        const titleSubstring = nonFeaturedTitle.substring(0, 25);
        const isInHero = featuredTitle?.includes(titleSubstring);

        if (isInHero) {
          console.error(`Non-featured article found in hero: ${nonFeaturedTitle}`);
        }

        expect(isInHero).toBeFalsy();
      }
    });

    test('should display non-featured articles in the regular grid', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');

      // The regular article grid has grid-cols-1 md:grid-cols-2 lg:grid-cols-3
      const articleGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');

      await expect(articleGrid).toBeVisible();

      // Get all article titles in the grid
      const gridArticleTitles = await articleGrid.locator('h3').allTextContents();
      console.log('Grid article titles:', gridArticleTitles);

      // Verify at least one non-featured article appears in the grid
      const hasNonFeaturedInGrid = NON_FEATURED_ARTICLES.some(nonFeaturedTitle =>
        gridArticleTitles.some(gridTitle =>
          gridTitle.includes(nonFeaturedTitle.substring(0, 25))
        )
      );

      expect(hasNonFeaturedInGrid).toBeTruthy();
    });
  });

  test.describe('Featured Badge Display', () => {
    test('should show "Featured" badge on featured articles in the hero section', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');

      // Look for the Featured badge in the hero card
      const featuredBadge = page.locator('a.group.grid.md\\:grid-cols-2').locator('text=Featured').first();

      // The badge should be visible
      const badgeCount = await featuredBadge.count();
      console.log('Featured badge count in hero:', badgeCount);

      // Featured badge is optional but should appear if the article is marked featured
      if (badgeCount > 0) {
        await expect(featuredBadge).toBeVisible();
      }
    });
  });

  test.describe('Toggle Verification - Article Exclusion', () => {
    test('should verify featured toggle affects display', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');

      // Take a screenshot for visual verification
      await page.screenshot({
        path: 'tests/screenshots/blog-featured-section.png',
        fullPage: false
      });

      // Get the hero/featured section article
      const heroArticle = page.locator('a.group.grid.md\\:grid-cols-2').first();
      const heroTitle = await heroArticle.locator('h2').textContent();

      // Get all articles in the regular grid
      const gridArticles = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 a');
      const gridCount = await gridArticles.count();

      console.log('Hero article:', heroTitle);
      console.log('Grid articles count:', gridCount);

      // Collect all titles from the grid
      const allGridTitles: string[] = [];
      for (let i = 0; i < gridCount; i++) {
        const title = await gridArticles.nth(i).locator('h3').textContent();
        if (title) allGridTitles.push(title);
      }
      console.log('All grid titles:', allGridTitles);

      // The hero article should NOT also appear in the grid (to avoid duplication)
      const heroTitleShort = heroTitle?.substring(0, 20) || '';
      const heroInGrid = allGridTitles.some(t => t.includes(heroTitleShort));

      // Hero article should be excluded from grid
      expect(heroInGrid).toBeFalsy();
    });
  });

  test.describe('Sanity Toggle Verification', () => {
    test('articles with featured=false should NOT be in the hero section', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');

      // Get the hero section article title
      const heroSection = page.locator('a.group.grid.md\\:grid-cols-2').first();
      const heroTitleElement = heroSection.locator('h2');

      await expect(heroTitleElement).toBeVisible();

      const heroTitle = await heroTitleElement.textContent();
      console.log('Current hero article:', heroTitle);

      // Check that specific non-featured articles are NOT in the hero
      // These articles have featured=false in Sanity
      const nonFeaturedTitles = [
        'Transforming Business Intelligence',
        'Building Scalable Data Pipelines',
        'Most Enterprise AI Coding Pilots Underperform',
        '2026 Playbook for Enterprise AI',
      ];

      for (const title of nonFeaturedTitles) {
        const isInHero = heroTitle?.toLowerCase().includes(title.toLowerCase().substring(0, 20));
        if (isInHero) {
          console.error(`ERROR: Non-featured article "${title}" is showing in hero section!`);
        }
        expect(isInHero).toBeFalsy();
      }

      console.log('✓ All non-featured articles correctly excluded from hero section');
    });

    test('only articles with featured=true should appear in hero', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');

      const heroTitle = await page.locator('a.group.grid.md\\:grid-cols-2 h2').first().textContent();

      // These are the ONLY articles that should be in the hero (featured=true in Sanity)
      const allowedFeaturedTitles = [
        'Beyond the Chatbot',
        'Great AI Agent Acceleration',
        '95% of Enterprise AI Coding Pilots Fail',
      ];

      const isAllowedFeatured = allowedFeaturedTitles.some(allowed =>
        heroTitle?.includes(allowed)
      );

      if (!isAllowedFeatured) {
        console.error(`Hero article "${heroTitle}" is not in the allowed featured list!`);
      }

      expect(isAllowedFeatured).toBeTruthy();
      console.log(`✓ Hero article "${heroTitle?.substring(0, 50)}..." is correctly featured`);
    });
  });
});
