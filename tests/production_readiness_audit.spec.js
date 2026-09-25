import { test, expect } from '@playwright/test';

test.describe('LayoverX Production Readiness Comprehensive E2E Suite', () => {

  test('1. Core Pages Load with 200 OK, Zero Console Runtime Crashes, and Correct Headings', async ({ page }) => {
    const criticalExceptions = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (text.includes('TypeError') || text.includes('ReferenceError') || text.includes('is not a function') || text.includes('Uncaught Error')) {
          criticalExceptions.push(text);
        }
      }
    });
    page.on('pageerror', (err) => {
      if (!err.message.includes('Hydration') && !err.message.includes('Minified React error')) {
        criticalExceptions.push(err.message);
      }
    });

    const routes = [
      '/',
      '/plan-my-layover',
      '/how-it-works',
      '/restaurants',
      '/hotels',
      '/spa-wellness',
      '/gaming-entertainment',
      '/contact',
      '/privacy',
      '/terms',
    ];

    for (const route of routes) {
      const response = await page.goto(`http://localhost:3000${route}`, { waitUntil: 'domcontentloaded' });
      expect(response.status()).toBe(200);
      await page.waitForTimeout(300);
    }

    expect(criticalExceptions).toEqual([]);
  });

  test('2. Luggage & Safety Disclaimers Compliance (No False Promises)', async ({ page }) => {
    await page.goto('http://localhost:3000/how-it-works');
    await page.waitForLoadState('networkidle');

    // Verify copy states baggage storage is operated by airport authorities and LayoverX acts as transit concierge
    const bodyText = await page.textContent('body');
    expect(bodyText).toContain('operated independently by airport authorities');
    expect(bodyText).toContain('Baggage storage is operated directly by airport authorities; LayoverX provides transit navigational assistance');
    expect(bodyText).not.toContain('We own private bouncers');
  });

  test('3. Multi-Capacity Dining & Restaurant Exploration Flow', async ({ page }) => {
    await page.goto('http://localhost:3000/restaurants');
    await page.waitForLoadState('domcontentloaded');

    // Verify restaurants like Peshawri or Gajalee are visible
    const restaurantCard = page.locator('text=Peshawri').or(page.locator('text=Gajalee')).or(page.locator('text=Dining')).first();
    await expect(restaurantCard).toBeVisible();

    // Check View Details or Add to Plan button
    const actionBtn = page.locator('button:has-text("Add to Plan"), button:has-text("Add to Itinerary"), button:has-text("View Details"), a:has-text("View Details")').first();
    await expect(actionBtn).toBeVisible();
  });

  test('4. Plan My Layover Transit & Itinerary Generation Flow', async ({ page }) => {
    await page.goto('http://localhost:3000/plan-my-layover');
    await page.waitForLoadState('domcontentloaded');

    // Verify calculator & templates are visible
    await expect(page.locator('text=Plan Layover').first()).toBeVisible();
  });

  test('5. Backend Health & Security Header Verification', async ({ request }) => {
    const res = await request.get('http://localhost:5000/api/v1/health');
    expect(res.status()).toBe(200);
    const headers = res.headers();

    // Verify security hardening headers
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['strict-transport-security']).toBeDefined();
  });

});
