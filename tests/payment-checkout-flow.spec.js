import { test, expect } from '@playwright/test';

test.describe('LayoverX Direct Checkout & Razorpay Flow', () => {

  test('Upload ticket, initiate checkout, mock Razorpay signature, and view digital confirmation pass', async ({ page }) => {
    // 1. Block the real Razorpay script request to prevent it from overwriting our mock constructor
    await page.route('https://checkout.razorpay.com/v1/checkout.js', async (route) => {
      await route.abort();
    });

    // 2. Hook window.supabase and window.Razorpay before page load
    await page.addInitScript(() => {
      const mockUser = {
        id: 'test-playwright-user-id',
        email: 'testuser@layoverx.in',
        user_metadata: {
          full_name: 'Playwright Test User',
          preferred_username: 'testuser'
        },
        app_metadata: {
          provider: 'email',
          role: 'user'
        }
      };

      let originalSupabase = null;
      Object.defineProperty(window, 'supabase', {
        get() {
          return originalSupabase;
        },
        set(val) {
          originalSupabase = val;
          if (originalSupabase && originalSupabase.auth) {
            originalSupabase.auth.getSession = async () => ({
              data: {
                session: {
                  user: mockUser,
                  access_token: 'mock-access-token',
                  refresh_token: 'mock-refresh-token',
                  expires_in: 3600,
                  expires_at: Math.floor(Date.now() / 1000) + 3600,
                }
              },
              error: null
            });
            originalSupabase.auth.getUser = async () => ({
              data: { user: mockUser },
              error: null
            });
            originalSupabase.auth.onAuthStateChange = (callback) => {
              callback('SIGNED_IN', {
                user: mockUser,
                access_token: 'mock-access-token',
                refresh_token: 'mock-refresh-token',
                expires_in: 3600,
                expires_at: Math.floor(Date.now() / 1000) + 3600,
              });
              return { data: { subscription: { unsubscribe: () => {} } } };
            };
          }
        },
        configurable: true
      });

      // Mock window.Razorpay constructor
      window.Razorpay = function (options) {
        this.open = function () {
          if (options && typeof options.handler === 'function') {
            options.handler({
              razorpay_order_id: 'ord_test_98765',
              razorpay_payment_id: 'pay_test_54321',
              razorpay_signature: 'mock_signature_value'
            });
          }
        };
      };
    });

    // 3. Open Plan My Layover page
    await page.goto('http://localhost:3000/plan-my-layover');
    await page.waitForLoadState('networkidle');

    // 4. Select AC Sedan Transfer cab
    await page.click('text=AC Sedan Transfer');

    // 5. Save Draft first (required before checking out)
    await page.click('button:has-text("Save Draft")');
    await expect(page.locator('text=Itinerary Draft Saved')).toBeVisible();

    // 6. Continue to Passenger Registration (Step 5)
    await page.click('button:has-text("Continue to Passenger Registration")');
    await expect(page.locator('text=Review & Passenger Verification')).toBeInViewport();

    // 7. Fill out passenger details (should be unlocked now because we are logged in)
    await page.fill('input[type="tel"]', '+919876543210');
    await page.click('text=I agree to allow LayoverX to process my e-ticket for trip coordination.');

    // Create a mock e-ticket file buffer
    const mockFileBuffer = Buffer.from('PDF Mock Ticket Content PNR: MH202A AI302 EK501');
    
    await page.setInputFiles('input[type="file"]', {
      name: 'mock_ticket.pdf',
      mimeType: 'application/pdf',
      buffer: mockFileBuffer,
    });

    await expect(page.locator('text=Attached').first()).toBeVisible();

    // Intercept checkout-order call to inject mock order details
    await page.route('**/booking/create-checkout-order', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          bookingId: 'bk_test_12345',
          orderId: 'ord_test_98765',
          amount: 149900,
          currency: 'INR',
          keyId: 'rzp_test_mock',
          extracted: {
            pnr: 'MH202A',
            flights: ['AI302', 'EK501']
          }
        }),
      });
    });

    // Intercept signature verification to return success
    await page.route('**/booking/verify-payment', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Payment verified successfully.',
          bookingId: 'bk_test_12345'
        }),
      });
    });

    // Intercept booking details lookup call
    await page.route('**/booking/bk_test_12345', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          booking: {
            id: 'bk_test_12345',
            user_phone: '+919876543210',
            ticket_file_path: 'mock_bucket/mock_ticket.pdf',
            extracted_pnr: 'MH202A',
            extracted_inbound_flight: 'AI302',
            extracted_outbound_flight: 'EK501',
            dpdp_consented: true,
            payment_status: 'COMPLETED',
            amount: 1499,
            currency: 'INR',
            status: 'confirmed',
            created_at: new Date().toISOString(),
          }
        }),
      });
    });

    // 8. Click Proceed to Secure Checkout
    const checkoutBtn = page.locator('button:has-text("Proceed to Secure Checkout")');
    await checkoutBtn.click();

    // 9. Verify we are redirected to /checkout
    await page.waitForURL(/.*checkout/);
    await expect(page).toHaveURL(/.*checkout\?bookingId=bk_test_12345.*/);

    // 10. Click the pay button on the dedicated checkout page
    const payBtn = page.locator('button:has-text("Confirm Layover")');
    await payBtn.click();

    // 11. Verify we are redirected to /booking-confirmation
    await page.waitForURL(/.*booking-confirmation/);
    await expect(page).toHaveURL(/.*booking-confirmation\?bookingId=bk_test_12345/);

    // 12. Confirm page layout and digital pass indicators
    await expect(page.locator('text=Layover Booking Confirmed!')).toBeVisible();
    await expect(page.locator('text=MH202A')).toBeVisible();
    await expect(page.locator('text=AI302')).toBeVisible();
    await expect(page.locator('text=EK501')).toBeVisible();
    await expect(page.locator('text=CSMIA Terminal 2 Exit Gate 2 Pickup')).toBeVisible();
    await expect(page.locator('text=Document Security & Auto-Deletion Policy')).toBeVisible();
  });

});
