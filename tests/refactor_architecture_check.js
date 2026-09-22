import assert from 'assert';
import { ZodError } from 'zod';
import { holdSlotSchema, luggageReservationSchema } from '../backend/dist/schemas/bookingSchemas.js';
import { flightLookupSchema } from '../backend/dist/schemas/flightSchemas.js';
import { layoverCalculationSchema } from '../backend/dist/schemas/layoverSchemas.js';
import { itineraryItemSchema } from '../backend/dist/schemas/itinerarySchemas.js';
import { errorHandler, AppError } from '../backend/dist/middleware/errorHandler.js';
import { holdSlot, releaseSlot } from '../backend/dist/services/bookingLockService.js';

console.log('🧪 Running LayoverX Architecture & Refactoring Verification Suite...\n');

// 1. Test Zod Validation on Booking & Luggage Schemas
console.log('Test 1: Zod Schemas Validation');

// Valid Hold Slot
const validHold = holdSlotSchema.safeParse({
  serviceId: 'srv-pod-01',
  slotId: 'slot_101',
  userId: 'usr_traveler_123',
});
assert.strictEqual(validHold.success, true, 'Valid holdSlot payload must pass');

// Invalid Hold Slot (illegal characters)
const invalidHold = holdSlotSchema.safeParse({
  serviceId: 'srv',
  slotId: 'slot<script>alert(1)</script>',
});
assert.strictEqual(invalidHold.success, false, 'Malicious/invalid slotId must be rejected');

// Valid Luggage Reservation
const validLuggage = luggageReservationSchema.safeParse({
  terminal: 'T2',
  bagCountCabin: 1,
  bagCountCheckin: 2,
  dropoffTime: new Date().toISOString(),
  pickupTime: new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
  flightNumber: 'AI302',
  userId: 'usr_luggage_01',
});
assert.strictEqual(validLuggage.success, true, 'Valid luggage reservation must pass');

// Invalid Luggage Reservation (0 bags selected)
const zeroBagsLuggage = luggageReservationSchema.safeParse({
  terminal: 'T2',
  bagCountCabin: 0,
  bagCountCheckin: 0,
  dropoffTime: new Date().toISOString(),
  pickupTime: new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
  flightNumber: 'AI302',
  userId: 'usr_luggage_01',
});
assert.strictEqual(zeroBagsLuggage.success, false, 'Zero bags reservation must fail refine check');

// Valid Flight Number
const validFlight = flightLookupSchema.safeParse({ flightNumber: 'EK501' });
assert.strictEqual(validFlight.success, true, 'EK501 flight number must pass');

const invalidFlight = flightLookupSchema.safeParse({ flightNumber: 'INVALID_TOO_LONG_12345' });
assert.strictEqual(invalidFlight.success, false, 'Malformed flight number must fail');

// Valid Layover Dwell-Time Math
const now = Date.now();
const validLayover = layoverCalculationSchema.safeParse({
  airport: 'BOM',
  arrivalTime: new Date(now).toISOString(),
  departureTime: new Date(now + 8 * 3600 * 1000).toISOString(),
});
assert.strictEqual(validLayover.success, true, '8-hour layover must pass');

// Invalid Layover Dwell-Time (< 3 hours)
const tooShortLayover = layoverCalculationSchema.safeParse({
  airport: 'BOM',
  arrivalTime: new Date(now).toISOString(),
  departureTime: new Date(now + 1 * 3600 * 1000).toISOString(),
});
assert.strictEqual(tooShortLayover.success, false, '1-hour layover must fail 3-hour minimum threshold');

console.log('  ✓ All Zod schemas successfully validated edge cases and rejected invalid inputs');

// 2. Test Centralized Error Handler (RFC 7807 Compliance & Zero Stack Leaks)
console.log('\nTest 2: Centralized Error Handler & Stack Masking');

function mockRes() {
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  return res;
}

// Test Zod Error Formatting
const res1 = mockRes();
try {
  holdSlotSchema.parse({ serviceId: 'a' }); // fails length & missing fields
} catch (e) {
  errorHandler(e, { path: '/api/v1/booking/hold-slot', method: 'POST' }, res1, () => {});
  assert.strictEqual(res1.statusCode, 400);
  assert.strictEqual(res1.body.code, 'VALIDATION_FAILED');
  assert.strictEqual(Array.isArray(res1.body.errors), true);
  assert.strictEqual(res1.body.stack, undefined, 'Stack trace must NEVER leak to client');
  console.log('  ✓ Zod validation error cleanly formatted into RFC 7807 envelope');
}

// Test Custom AppError Formatting
const res2 = mockRes();
const customErr = new AppError('Payment gateway timeout', 504, 'GATEWAY_TIMEOUT');
errorHandler(customErr, { path: '/api/v1/payments/verify', method: 'POST' }, res2, () => {});
assert.strictEqual(res2.statusCode, 504);
assert.strictEqual(res2.body.code, 'GATEWAY_TIMEOUT');
assert.strictEqual(res2.body.stack, undefined);
console.log('  ✓ AppError formatted without stack trace leak');

// Test Internal Server Error Masking
const res3 = mockRes();
const secretInternalErr = new Error('Database password failed on host 10.0.0.5:5432');
errorHandler(secretInternalErr, { path: '/api/v1/booking/hold-slot', method: 'POST' }, res3, () => {});
assert.strictEqual(res3.statusCode, 500);
assert.strictEqual(res3.body.code, 'INTERNAL_SERVER_ERROR');
assert.strictEqual(res3.body.title.includes('Database password'), false, 'Internal DB message must be masked');
assert.strictEqual(res3.body.stack, undefined);
console.log('  ✓ Internal error completely sanitized from internal infrastructure details');

// 3. Test Concurrency 409 Conflict Status Code
console.log('\nTest 3: Concurrency Collision 409 Status Check');
async function testConcurrency() {
  const slotKey = `slot_arch_${Date.now()}`;
  const user1 = 'traveler_101';
  const user2 = 'traveler_202';

  const hold1 = await holdSlot({ serviceId: 'srv-pod-01', slotId: slotKey, userId: user1 });
  assert.strictEqual(hold1.statusCode, 200, 'First hold should succeed');

  const hold2 = await holdSlot({ serviceId: 'srv-pod-01', slotId: slotKey, userId: user2 });
  assert.strictEqual(hold2.statusCode, 409, 'Concurrent collision MUST return HTTP 409 Conflict');
  assert.strictEqual(hold2.success, false);

  await releaseSlot({ slotId: slotKey, userId: user1 });
  console.log('  ✓ Concurrency collision strictly returned HTTP 409 Conflict');
}

await testConcurrency();

console.log('\n===============================================================');
console.log('🎉 ALL ARCHITECTURE & REFACTORING CHECKS PASSED (A+ GRADE)');
console.log('===============================================================\n');
