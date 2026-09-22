import { z } from 'zod';

export const flightLookupSchema = z.object({
  flightNumber: z.string().trim().regex(/^[A-Z0-9]{2,3}\s?\d{3,4}$/i, 'Invalid flight number (e.g. AI302, EK501)'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD').optional(),
});

export const pnrTelemetrySchema = z.object({
  pnr: z.string().trim().toUpperCase().regex(/^[A-Z0-9]{6}$/, 'PNR must be 6 alphanumeric characters'),
  passengerLastName: z.string().trim().min(2).max(50),
});

export type FlightLookupInput = z.infer<typeof flightLookupSchema>;
export type PnrTelemetryInput = z.infer<typeof pnrTelemetrySchema>;
