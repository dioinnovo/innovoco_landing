# Tailwind CSS v4 Migration Guide

## Overview

This document describes a critical CSS cascade issue discovered during the migration to Tailwind CSS v4.1.18 and provides guidance for future projects upgrading to Tailwind v4.

**Date:** December 15, 2025
**Project:** Innovoco Public Website
**Tailwind Version:** 4.1.18
**Issue Severity:** High (breaks layout centering and spacing)

---

## The Problem

### Symptoms Observed
- Containers with `mx-auto` class were **not centering** on the page
- All containers aligned to the left edge (`margin-left: 0px`, `margin-right: 0px`)
- Tailwind utility classes for margins and padding appeared to have no effect
- Layout appeared "broken" with content flush against edges

### Root Cause

In **Tailwind CSS v4**, the CSS import mechanism changed. When using:

```css
@import "tailwindcss";
```

Tailwind's styles (including the built-in CSS reset/preflight) are injected **before** any custom CSS that follows in the same file.

The issue was caused by a universal CSS reset in `globals.css`:

```css
/* PROBLEMATIC CODE - DO NOT USE WITH TAILWIND V4 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

**Why this breaks Tailwind v4:**

1. Tailwind v4's `@import "tailwindcss"` injects all utility classes first
2. Custom CSS (including `* { margin: 0; }`) comes after
3. The universal selector `*` has **equal or higher specificity** in the cascade
4. Result: `margin: 0` overrides `mx-auto`'s `margin-inline: auto`

### Technical Details

**CSS Cascade Order in Tailwind v4:**
```
1. @import "tailwindcss"     <- Tailwind utilities injected here
2. @config "../tailwind.config.ts"
3. /* Your custom CSS */     <- This comes AFTER and overrides!
```

**Computed Styles Before Fix:**
```javascript
{
  className: 'container mx-auto max-w-7xl',
  computedMarginLeft: '0px',      // Should be 'auto' or calculated px
  computedMarginRight: '0px',     // Should be 'auto' or calculated px
  computedMarginInline: '0px',    // Should be 'auto'
  boundingLeft: 0,                // Container stuck to left edge
  isCentered: false
}
```

**Computed Styles After Fix:**
```javascript
{
  className: 'container mx-auto max-w-7xl',
  computedMarginLeft: '320px',    // Properly calculated
  computedMarginRight: '320px',   // Properly calculated
  computedMarginInline: '320px',  // Auto margin working
  boundingLeft: 320,              // Container properly centered
  isCentered: true
}
```

---

## The Solution

### Remove Conflicting Universal Reset

**Before (Broken):**
```css
@import "tailwindcss";
@config "../tailwind.config.ts";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

**After (Fixed):**
```css
@import "tailwindcss";
@config "../tailwind.config.ts";

/*
 * Note: Tailwind v4 includes its own CSS reset via @import "tailwindcss"
 * The previous universal reset (* { margin: 0; padding: 0; }) was overriding
 * Tailwind utility classes like mx-auto. Only box-sizing is kept as it's
 * generally safe and doesn't conflict with Tailwind utilities.
 */
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

### Why This Works

1. **Tailwind v4 includes Preflight** - The `@import "tailwindcss"` already includes a comprehensive CSS reset (Preflight), so a manual reset is redundant
2. **box-sizing is safe** - Setting `box-sizing: border-box` doesn't conflict with Tailwind utilities
3. **No margin/padding override** - Removing `margin: 0` and `padding: 0` allows Tailwind's `mx-auto`, `py-4`, etc. to work correctly

---

## Migration Checklist for Tailwind v4

When upgrading a project to Tailwind CSS v4, follow this checklist:

### 1. Check for Universal Resets

Search your codebase for universal selector resets:

```bash
# Search for problematic patterns
grep -r "\* {" --include="*.css" .
grep -r "\*{" --include="*.css" .
```

**Remove or modify any:**
- `* { margin: 0; }`
- `* { padding: 0; }`
- `* { margin: 0; padding: 0; }`

**Keep (these are safe):**
- `* { box-sizing: border-box; }`

### 2. Check CSS Import Order

Ensure your `globals.css` or main CSS file uses the correct import:

```css
/* Correct for Tailwind v4 */
@import "tailwindcss";
@config "../tailwind.config.ts";

/* Your custom styles go AFTER the import */
```

### 3. Verify Container Behavior

Test that containers are properly centered:

```javascript
// Quick browser console test
const container = document.querySelector('.container.mx-auto');
const style = window.getComputedStyle(container);
console.log('Margin Left:', style.marginLeft);   // Should NOT be '0px'
console.log('Margin Right:', style.marginRight); // Should NOT be '0px'
```

### 4. Run Layout Tests

Use Playwright or similar to verify layout:

```typescript
test('containers should be centered', async ({ page }) => {
  await page.goto('/');

  const containerStyles = await page.evaluate(() => {
    const el = document.querySelector('.container.mx-auto');
    const computed = window.getComputedStyle(el);
    return {
      marginLeft: computed.marginLeft,
      marginRight: computed.marginRight,
    };
  });

  // Margins should NOT be 0px if container is narrower than viewport
  expect(containerStyles.marginLeft).not.toBe('0px');
  expect(containerStyles.marginRight).not.toBe('0px');
});
```

### 5. Check Other Utility Classes

Verify these common utilities work correctly:
- `mx-auto` - horizontal centering
- `my-4`, `py-6`, `px-4` - spacing utilities
- `gap-4`, `gap-6` - flex/grid gaps
- `space-x-4`, `space-y-4` - child spacing

---

## Key Differences: Tailwind v3 vs v4

| Feature | Tailwind v3 | Tailwind v4 |
|---------|-------------|-------------|
| **Import** | `@tailwind base; @tailwind components; @tailwind utilities;` | `@import "tailwindcss";` |
| **Config** | `@config` optional | `@config "../tailwind.config.ts";` recommended |
| **Preflight** | Included with `@tailwind base` | Included with `@import "tailwindcss"` |
| **CSS Reset** | Manual reset often added | **DO NOT add manual reset** |
| **CSS Cascade** | Custom CSS could precede utilities | Custom CSS always **follows** utilities |
| **Container** | `max-width` only by default | `max-width` only by default |
| **mx-auto** | `margin-left: auto; margin-right: auto;` | `margin-inline: auto;` |

---

## Verification Results

After applying the fix, Playwright tests confirmed:

### Before Fix
```
Container 1: Margin L/R: 0px / 0px, Is Centered: false
Container 2: Margin L/R: 0px / 0px, Is Centered: false
Container 3: Margin L/R: 0px / 0px, Is Centered: false
0 of 5 containers appear to be centered
```

### After Fix
```
Container 1: Margin L/R: 168px / 168px, Is Centered: true
Container 2: Margin L/R: 304px / 304px, Is Centered: true
Container 3: Margin L/R: 360px / 360px, Is Centered: true
5 of 5 containers appear to be centered
```

### Test Suite Results
- **17 tests passed** covering:
  - Body styles
  - Container spacing
  - Section padding
  - Card spacing
  - Grid gaps
  - Navbar layout
  - Typography spacing
  - Mobile/Tablet/Desktop responsive layouts
  - CSS variables
  - Flex gaps
  - Visual regression for all pages

---

## Files Modified

1. **`app/globals.css`** - Removed conflicting universal reset
2. **`tests/layout-spacing.spec.ts`** - Added comprehensive layout tests
3. **`tests/container-debug.spec.ts`** - Added container centering debug tests
4. **`playwright.config.ts`** - Added Playwright configuration

---

## Quick Reference Commands

```bash
# Install Playwright
bun add -d @playwright/test
bunx playwright install chromium

# Run layout tests
bunx playwright test tests/layout-spacing.spec.ts

# Debug container centering
bunx playwright test tests/container-debug.spec.ts

# Check for universal resets in CSS
grep -rn "\* {" --include="*.css" app/
```

---

## Conclusion

When migrating to Tailwind CSS v4:

1. **DO NOT** use universal resets like `* { margin: 0; padding: 0; }`
2. **DO** let Tailwind's Preflight handle CSS resets
3. **DO** test container centering after migration
4. **DO** use the migration checklist above

The key insight is that Tailwind v4's `@import "tailwindcss"` changes the CSS cascade order, making custom universal resets override Tailwind utilities instead of the other way around.
