import { test, expect } from '@playwright/test';

test.describe('LayoverX Unified Checkout & Routing Suite', () => {

  test('Proceed to Checkout redirects to Plan My Layover, blocks if unsaved, and scrolls if saved', async ({ page }) => {
    // 1. Visit Service Details page
    await page.goto('http://localhost:3000/service-details?id=g1');
    await page.waitForLoadState('networkidle');

    // 2. Click Proceed to Checkout from an external page
    const checkoutBtn = page.locator('button:has-text("Proceed to Checkout"), a:has-text("Proceed to Checkout")').first();
    if (await checkoutBtn.isVisible()) {
      await checkoutBtn.click();

      // 3. Confirm redirection to /plan-my-layover
      await expect(page).toHaveURL(/.*plan-my-layover/);

      // 4. Confirm unsaved draft blocks checkout and shows toast
      await expect(page.locator('text=Please click \'Save Draft\' first')).toBeVisible();

      // 5. Select cab & click Save Draft
      await page.click('text=AC Sedan Transfer');
      await page.click('button:has-text("Save Draft")');
      await page.click('button:has-text("Continue to Passenger Registration")');

      // 6. Confirm Step 5 is visible
      await expect(page.locator('text=Review & Passenger Registration')).toBeInViewport();
    }
  });

});
