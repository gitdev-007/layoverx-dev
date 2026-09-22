import { z } from 'zod';

export const itineraryItemSchema = z.object({
  serviceId: z.string().min(3).max(64),
  category: z.enum(['HOTEL_PODS', 'DINING', 'TOURS', 'SPA', 'GAMING', 'TRANSFERS', 'LUGGAGE']),
  durationMinutes: z.number().int().min(15).max(1440),
  slotId: z.string().min(3).max(64).optional(),
  priceInr: z.number().nonnegative(),
});

export const saveItinerarySchema = z.object({
  layoverId: z.string().optional(),
  passengerCount: z.number().int().min(1).max(9).default(1),
  items: z.array(itineraryItemSchema).min(1, 'Itinerary must contain at least one service'),
  customNotes: z.string().max(500).optional(),
});

export type ItineraryItemInput = z.infer<typeof itineraryItemSchema>;
export type SaveItineraryInput = z.infer<typeof saveItinerarySchema>;
