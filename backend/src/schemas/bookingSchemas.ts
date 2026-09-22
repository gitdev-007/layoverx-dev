import { z } from 'zod';

export const holdSlotSchema = z.object({
  serviceId: z.string().min(3).max(64).regex(/^[a-zA-Z0-9_\-]+$/, 'Invalid serviceId format'),
  slotId: z.string().min(3).max(64).regex(/^[a-zA-Z0-9_\-:]+$/, 'Invalid slotId format'),
  userId: z.string().min(1).max(64).optional(),
});

export const releaseSlotSchema = z.object({
  slotId: z.string().min(3).max(64).regex(/^[a-zA-Z0-9_\-:]+$/, 'Invalid slotId format'),
  userId: z.string().min(1).max(64).optional(),
});

export const luggageReservationSchema = z.object({
  terminal: z.enum(['T1', 'T2']),
  bagCountCabin: z.number().int().min(0).max(10).default(0),
  bagCountCheckin: z.number().int().min(0).max(10).default(1),
  dropoffTime: z.string().datetime({ message: 'dropoffTime must be a valid ISO 8601 string' }),
  pickupTime: z.string().datetime({ message: 'pickupTime must be a valid ISO 8601 string' }),
  flightNumber: z.string().regex(/^[A-Z0-9]{2,3}\s?\d{3,4}$/i, 'Invalid flight number format'),
  userId: z.string().min(1).optional(),
}).refine((data) => data.bagCountCabin + data.bagCountCheckin > 0, {
  message: 'At least one bag (cabin or check-in) must be selected.',
});

export const createOrderSchema = z.object({
  slotId: z.string().min(3).max(64),
  serviceId: z.string().min(3).max(64),
  amount: z.number().positive().max(500000), // In INR rupees or paise
  currency: z.enum(['INR', 'USD', 'EUR', 'GBP', 'AED', 'SGD']).default('INR'),
  phone: z.string().regex(/^\+?[1-9]\d{7,14}$/, 'Invalid phone number format').optional(),
  country_code: z.string().max(4).optional(),
});

export const confirmBookingSchema = z.object({
  bookingId: z.string().min(5).max(64),
  paymentId: z.string().min(5).max(64),
  signature: z.string().min(10).max(128).optional(),
  pnr: z.string().min(5).max(10).optional(),
  inboundFlight: z.string().max(16).optional(),
  outboundFlight: z.string().max(16).optional(),
});

export type HoldSlotInput = z.infer<typeof holdSlotSchema>;
export type ReleaseSlotInput = z.infer<typeof releaseSlotSchema>;
export type LuggageReservationInput = z.infer<typeof luggageReservationSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type ConfirmBookingInput = z.infer<typeof confirmBookingSchema>;
