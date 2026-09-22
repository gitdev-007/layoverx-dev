import { z } from 'zod';

export interface LayoverValidationInput {
  arrivalTime: string | Date;
  departureTime: string | Date;
  terminal?: 'csmia-t2' | 'csmia-t1' | 'near-airport' | string;
}

export interface LayoverValidationResult {
  isValid: boolean;
  error: string | null;
  totalMinutes: number;
  totalHours: number;
  bufferMinutes: number;
  usableMinutes: number;
  usableHours: number;
  formattedDuration: string;
  eligibleForCity: boolean;
  eligibleForAirside: boolean;
  terminal: string;
}

/**
 * Terminal Safe Transit Buffers (in minutes):
 * - CSMIA Terminal 2 (International & Mixed): 150 minutes (2.5 hours)
 * - CSMIA Terminal 1 (Domestic): 120 minutes (2.0 hours)
 */
export const TERMINAL_BUFFERS: Record<string, number> = {
  'csmia-t2': 150,
  'csmia-t1': 120,
  'near-airport': 150,
  default: 150,
};

/**
 * Get minimum transit buffer required for a given terminal.
 */
export function getMinimumBufferMinutes(terminal?: string): number {
  if (!terminal) return TERMINAL_BUFFERS.default;
  const normalized = terminal.toLowerCase();
  if (normalized.includes('t1') || normalized.includes('domestic')) {
    return TERMINAL_BUFFERS['csmia-t1'];
  }
  return TERMINAL_BUFFERS['csmia-t2'];
}

/**
 * Calculates raw duration between arrival and departure in minutes.
 * Enforces departureTime > arrivalTime.
 */
export function calculateLayoverDurationMinutes(
  arrivalTime: string | Date,
  departureTime: string | Date
): { totalMinutes: number; isValid: boolean; error: string | null } {
  const arrDate = typeof arrivalTime === 'string' ? new Date(arrivalTime) : arrivalTime;
  const depDate = typeof departureTime === 'string' ? new Date(departureTime) : departureTime;

  const arrMs = arrDate.getTime();
  const depMs = depDate.getTime();

  if (isNaN(arrMs) || isNaN(depMs)) {
    return {
      totalMinutes: 0,
      isValid: false,
      error: 'Invalid flight arrival or departure date format provided.',
    };
  }

  if (depMs <= arrMs) {
    return {
      totalMinutes: 0,
      isValid: false,
      error: 'Departure flight time must be scheduled after landing arrival time.',
    };
  }

  const nowMs = Date.now() - 5 * 60 * 1000;
  if (arrMs < nowMs) {
    return {
      totalMinutes: 0,
      isValid: false,
      error: 'Landing flight arrival time cannot be in the past.',
    };
  }

  const diffMs = depMs - arrMs;
  const totalMinutes = Math.floor(diffMs / (1000 * 60));

  return {
    totalMinutes,
    isValid: true,
    error: null,
  };
}

/**
 * Formats minute duration into human-readable aviation format: "Xh Ym".
 */
export function formatMinutesToHoursStr(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

/**
 * Parse any natural duration string like "3.5h", "4 hours", "90 mins" into integer minutes.
 */
export function parseDurationToMinutes(durationStr: string): number {
  if (!durationStr) return 0;
  const clean = durationStr.toLowerCase().trim();

  // "3.5h" or "4h"
  const hourMatch = clean.match(/([\d.]+)\s*(?:h|hr|hour|hours)/);
  if (hourMatch) {
    return Math.round(parseFloat(hourMatch[1]) * 60);
  }

  // "90 mins"
  const minMatch = clean.match(/([\d.]+)\s*(?:m|min|mins|minute|minutes)/);
  if (minMatch) {
    return Math.round(parseFloat(minMatch[1]));
  }

  // Pure number fallback
  const num = parseFloat(clean);
  if (!isNaN(num)) {
    return Math.round(num * 60);
  }

  return 0;
}

/**
 * Core validation function for layover timeframes.
 * Enforces departure > arrival and terminal safe buffers (T2: 150m, T1: 120m).
 */
export function validateLayoverTimes(input: LayoverValidationInput): LayoverValidationResult {
  const terminalKey = input.terminal || 'csmia-t2';
  const bufferMinutes = getMinimumBufferMinutes(terminalKey);
  const isDomestic = bufferMinutes === 120;

  const durationRes = calculateLayoverDurationMinutes(input.arrivalTime, input.departureTime);

  if (!durationRes.isValid) {
    return {
      isValid: false,
      error: durationRes.error,
      totalMinutes: 0,
      totalHours: 0,
      bufferMinutes,
      usableMinutes: 0,
      usableHours: 0,
      formattedDuration: '0h 0m',
      eligibleForCity: false,
      eligibleForAirside: false,
      terminal: terminalKey,
    };
  }

  const { totalMinutes } = durationRes;
  const totalHours = totalMinutes / 60;
  const formattedDuration = formatMinutesToHoursStr(totalMinutes);

  // Check buffer constraint
  if (totalMinutes < bufferMinutes) {
    const errorMsg = isDomestic
      ? 'Layover too short (< 2.0h) for domestic transit.'
      : 'Layover too short (< 2.5h) for international transit.';

    return {
      isValid: false,
      error: errorMsg,
      totalMinutes,
      totalHours,
      bufferMinutes,
      usableMinutes: 0,
      usableHours: 0,
      formattedDuration,
      eligibleForCity: false,
      eligibleForAirside: false,
      terminal: terminalKey,
    };
  }

  // Usable time after mandatory immigration and gate clearance buffer
  const usableMinutes = totalMinutes - bufferMinutes;
  const usableHours = Number((usableMinutes / 60).toFixed(2));
  const eligibleForCity = usableHours >= 3.0; // Need at least 3 hours outside airport

  return {
    isValid: true,
    error: null,
    totalMinutes,
    totalHours,
    bufferMinutes,
    usableMinutes,
    usableHours,
    formattedDuration,
    eligibleForCity,
    eligibleForAirside: true,
    terminal: terminalKey,
  };
}

/**
 * Zod schema for runtime form validation
 */
export const layoverInputSchema = z
  .object({
    arrivalTime: z.string().min(1, 'Arrival time is required'),
    departureTime: z.string().min(1, 'Departure time is required'),
    terminal: z.enum(['csmia-t2', 'csmia-t1', 'near-airport']).default('csmia-t2'),
  })
  .refine(
    (data) => {
      const arr = new Date(data.arrivalTime).getTime();
      return !isNaN(arr) && arr >= Date.now() - 5 * 60 * 1000;
    },
    {
      message: 'Landing flight arrival time cannot be in the past.',
      path: ['arrivalTime'],
    }
  )
  .refine(
    (data) => {
      const arr = new Date(data.arrivalTime).getTime();
      const dep = new Date(data.departureTime).getTime();
      return !isNaN(arr) && !isNaN(dep) && dep > arr;
    },
    {
      message: 'Departure flight time must be after landing arrival time.',
      path: ['departureTime'],
    }
  );
