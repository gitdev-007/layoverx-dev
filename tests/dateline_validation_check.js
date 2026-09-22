import assert from 'assert';
import { calculateLayoverDurationMinutes, validateLayoverTimes, layoverInputSchema } from '../lib/validations/layover.ts';
import { layoverCalculationSchema } from '../backend/dist/schemas/layoverSchemas.js';

console.log('🕒 Running LayoverX Dateline & Future-Only Date Validation Suite...\n');

const now = Date.now();
const pastDate = new Date(now - 24 * 60 * 60 * 1000).toISOString(); // 1 day ago
const earlierToday = new Date(now - 2 * 60 * 60 * 1000).toISOString(); // 2 hours ago
const futureArrSameDay = new Date(now + 2 * 60 * 60 * 1000).toISOString(); // 2 hours in future (same day)
const futureDepSameDay = new Date(now + 8 * 60 * 60 * 1000).toISOString(); // 8 hours in future (same day)
const futureArrNextWeek = new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString();
const futureDepNextWeek = new Date(now + 7 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000).toISOString();

// Test 1: Past Arrival Rejection
console.log('Test 1: Past Arrival Dates Rejected');
const pastResult = calculateLayoverDurationMinutes(pastDate, futureDepSameDay);
assert.strictEqual(pastResult.isValid, false, 'Past arrival (yesterday) must be invalid');
assert.strictEqual(pastResult.error, 'Landing flight arrival time cannot be in the past.');

const earlierTodayResult = calculateLayoverDurationMinutes(earlierToday, futureDepSameDay);
assert.strictEqual(earlierTodayResult.isValid, false, 'Past arrival (earlier today) must be invalid');
assert.strictEqual(earlierTodayResult.error, 'Landing flight arrival time cannot be in the past.');
console.log('  ✓ Successfully blocked past dates (yesterday and earlier today)');

// Test 2: Same-Day Upcoming & Future Flight Bookings Permitted
console.log('\nTest 2: Same-Day and Future Upcoming Bookings Allowed');
const validSameDay = calculateLayoverDurationMinutes(futureArrSameDay, futureDepSameDay);
assert.strictEqual(validSameDay.isValid, true, 'Upcoming same-day arrival must be valid');
assert.strictEqual(validSameDay.totalMinutes, 360, 'Must calculate 6 hours (360 mins)');

const validNextWeek = calculateLayoverDurationMinutes(futureArrNextWeek, futureDepNextWeek);
assert.strictEqual(validNextWeek.isValid, true, 'Upcoming next-week flight must be valid');
console.log('  ✓ Allowed upcoming same-day booking (+2h arrival, +8h departure)');
console.log('  ✓ Allowed future date booking (+7 days arrival)');

// Test 3: Departure Before Arrival Rejected
console.log('\nTest 3: Departure Must Be After Arrival');
const invertedResult = calculateLayoverDurationMinutes(futureDepSameDay, futureArrSameDay);
assert.strictEqual(invertedResult.isValid, false, 'Departure before arrival must fail');
assert.strictEqual(invertedResult.error, 'Departure flight time must be scheduled after landing arrival time.');
console.log('  ✓ Inverted timings strictly rejected');

// Test 4: Zod Frontend Schema Refinement
console.log('\nTest 4: Zod Frontend Schema Enforces Present/Future Rule');
const zodPast = layoverInputSchema.safeParse({
  arrivalTime: pastDate,
  departureTime: futureDepSameDay,
  terminal: 'csmia-t2',
});
assert.strictEqual(zodPast.success, false, 'Zod schema must reject past arrival');

const zodValid = layoverInputSchema.safeParse({
  arrivalTime: futureArrSameDay,
  departureTime: futureDepSameDay,
  terminal: 'csmia-t2',
});
assert.strictEqual(zodValid.success, true, 'Zod schema must accept valid upcoming layover');
console.log('  ✓ Zod frontend schema blocked past arrival and allowed future timing');

// Test 5: Backend API Layover Schema Validation
console.log('\nTest 5: Backend API Schema Enforces Dateline Rule');
const backendPast = layoverCalculationSchema.safeParse({
  airport: 'BOM',
  arrivalTime: pastDate,
  departureTime: futureDepSameDay,
});
assert.strictEqual(backendPast.success, false, 'Backend schema must reject past date');

const backendValid = layoverCalculationSchema.safeParse({
  airport: 'BOM',
  arrivalTime: futureArrSameDay,
  departureTime: futureDepSameDay,
});
assert.strictEqual(backendValid.success, true, 'Backend schema must accept upcoming layover');
console.log('  ✓ Backend schema successfully blocked past arrival and allowed future timing');

console.log('\n===============================================================');
console.log('🎉 ALL DATELINE & FUTURE-ONLY DATE VALIDATION CHECKS PASSED!');
console.log('===============================================================\n');
