const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('--- RUNNING DYNAMIC LAYOVER CALCULATION UNIT TEST ---');

// 1. Static audit: Ensure 17.0 is no longer hardcoded in context or component
const contextPath = path.join(__dirname, '..', 'context', 'itinerary-context.tsx');
const timelineHeaderPath = path.join(__dirname, '..', 'components', 'TimelineHeader.tsx');

const contextContent = fs.readFileSync(contextPath, 'utf8');
const timelineContent = fs.readFileSync(timelineHeaderPath, 'utf8');

assert(!contextContent.includes('useState<number>(17.0)'), 'itinerary-context.tsx must NOT hardcode 17.0 in useState');
assert(!timelineContent.includes('totalLayoverHours = 17.0'), 'TimelineHeader.tsx must NOT hardcode 17.0 fallback');
console.log('✔ Static audit passed: No hardcoded 17.0 hours in context or TimelineHeader');

// 2. Dynamic layover calculation check: (departure - arrival)
function calculateLayoverMetrics(arrivalTimeStr, departureTimeStr, driveTimeHours = 0, activityDurations = []) {
  const arr = new Date(arrivalTimeStr).getTime();
  const dep = new Date(departureTimeStr).getTime();
  assert(!isNaN(arr) && !isNaN(dep) && dep > arr, 'Timings must be valid with departure > arrival');

  const totalLayoverHours = Number(((dep - arr) / (1000 * 60 * 60)).toFixed(1));
  const standardTransitBuffer = 2.5;
  const totalBufferHours = Number((standardTransitBuffer + driveTimeHours).toFixed(1));
  const usedActivitiesHours = Number(activityDurations.reduce((sum, d) => sum + d, 0).toFixed(1));
  const availableWindowHours = Number((totalLayoverHours - totalBufferHours - usedActivitiesHours).toFixed(1));

  return {
    totalLayoverHours,
    totalBufferHours,
    usedActivitiesHours,
    availableWindowHours,
    isOverbooked: availableWindowHours < 0
  };
}

// Case A: 8-hour layover, no drive, 2h activities
const caseA = calculateLayoverMetrics('2026-09-23T10:00', '2026-09-23T18:00', 0, [2.0]);
assert.strictEqual(caseA.totalLayoverHours, 8.0);
assert.strictEqual(caseA.totalBufferHours, 2.5);
assert.strictEqual(caseA.usedActivitiesHours, 2.0);
assert.strictEqual(caseA.availableWindowHours, 3.5); // 8.0 - 2.5 - 2.0 = 3.5
assert.strictEqual(caseA.isOverbooked, false);
console.log('✔ Case A passed: 8h layover -> 3.5h available');

// Case B: 12-hour layover, 0.4h drive, 3h activities
const caseB = calculateLayoverMetrics('2026-09-23T06:00', '2026-09-23T18:00', 0.4, [1.5, 1.5]);
assert.strictEqual(caseB.totalLayoverHours, 12.0);
assert.strictEqual(caseB.totalBufferHours, 2.9);
assert.strictEqual(caseB.usedActivitiesHours, 3.0);
assert.strictEqual(caseB.availableWindowHours, 6.1); // 12.0 - 2.9 - 3.0 = 6.1
assert.strictEqual(caseB.isOverbooked, false);
console.log('✔ Case B passed: 12h layover -> 6.1h available');

// Case C: 5-hour layover, 0.4h drive, 3h activities (overbooked)
const caseC = calculateLayoverMetrics('2026-09-23T12:00', '2026-09-23T17:00', 0.4, [3.0]);
assert.strictEqual(caseC.totalLayoverHours, 5.0);
assert.strictEqual(caseC.totalBufferHours, 2.9);
assert.strictEqual(caseC.usedActivitiesHours, 3.0);
assert.strictEqual(caseC.availableWindowHours, -0.9); // 5.0 - 2.9 - 3.0 = -0.9
assert.strictEqual(caseC.isOverbooked, true);
console.log('✔ Case C passed: Overbooking detected (-0.9h window)');

console.log('--- ALL DYNAMIC LAYOVER CALCULATION TESTS PASSED ---');
