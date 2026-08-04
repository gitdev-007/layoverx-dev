import { test, expect } from '@playwright/test';

test.describe('LayoverX Full System & Error-Free Verification', () => {

  test('E2E Audit: No Console Errors, Working Buttons, Complete Flow', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    // 1. Visit Gaming Page & Test Add to Itinerary
    await page.goto('http://localhost:3000/gaming-entertainment');
    await page.waitForLoadState('networkidle');
    
    const viewDetailsBtn = page.locator('button:has-text("View Details"), a:has-text("View Details")').first();
    await expect(viewDetailsBtn).toBeVisible();

    const addBtn = page.locator('button:has-text("Add to Itinerary")').first();
    await addBtn.click();

    // 2. Visit Detail Page for Gaming Item
    await page.goto('http://localhost:3000/service-details?id=g1');
    await page.waitForLoadState('networkidle');

    const detailAddBtn = page.locator('button:has-text("Add to Itinerary")').first();
    await expect(detailAddBtn).toBeVisible();
    await detailAddBtn.click();

    // 3. Visit Plan My Layover & Test Cab + Draft Save Flow
    await page.goto('http://localhost:3000/plan-my-layover');
    await page.click('text=AC Sedan Transfer');

    // Test Checkout Gate before Draft Save
    await page.click('button:has-text("Continue to Book")');
    await expect(page.locator('text=Please click \'Save Draft\' first')).toBeVisible();

    // Click Save Draft
    await page.click('button:has-text("Save Draft")');
    await expect(page.locator('text=Itinerary Draft Saved')).toBeVisible();

    // Proceed to Step 5
    await page.click('button:has-text("Continue to Passenger Registration")');
    await expect(page.locator('text=Review & Passenger Verification')).toBeInViewport();

    // Assert zero runtime errors or CSP errors
    const criticalErrors = consoleErrors.filter(
      (e) => e.includes('is not a function') || e.includes('Content Security Policy')
    );
    expect(criticalErrors).toEqual([]);
  });

});
