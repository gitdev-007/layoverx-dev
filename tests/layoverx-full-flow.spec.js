import { test, expect } from '@playwright/test';

test.describe('LayoverX Master Workflow Verification', () => {
  test('Complete End-to-End Execution Test', async ({ page }) => {
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

    await page.goto('http://localhost:3000/plan-my-layover');

    // 1. Verify Timings & Exit Window Header
    await expect(page.locator('text=Timings & Exit Window')).toBeVisible();

    // 2. Select Cab
    await page.click('text=AC Sedan Transfer');
    await expect(page.locator('text=Calculated at Final Booking')).toBeVisible();

    // 3. Test Blocked Checkout prior to saving draft
    await page.click('button:has-text("Continue to Book")');
    await expect(page.locator('text=Please click \'Save Draft\' first')).toBeVisible();

    // 4. Save Draft
    await page.click('button:has-text("Save Draft")');
    await expect(page.locator('text=Itinerary Draft Saved')).toBeVisible();

    // 5. Proceed to Step 5
    await page.click('button:has-text("Continue to Passenger Registration")');
    await expect(page.locator('text=Review & Passenger Registration')).toBeInViewport();
  });
});
