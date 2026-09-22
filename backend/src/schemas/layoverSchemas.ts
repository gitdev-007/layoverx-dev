import { z } from 'zod';

export const layoverCalculationSchema = z.object({
  airport: z.string().toUpperCase().default('BOM'),
  arrivalTime: z.string().datetime({ message: 'arrivalTime must be a valid ISO 8601 string' }),
  departureTime: z.string().datetime({ message: 'departureTime must be a valid ISO 8601 string' }),
  arrivalTerminal: z.enum(['T1', 'T2', 'UNKNOWN']).default('T2'),
  departureTerminal: z.enum(['T1', 'T2', 'UNKNOWN']).default('T2'),
  isInternationalArrival: z.boolean().default(true),
  isInternationalDeparture: z.boolean().default(false),
}).refine((data) => {
  const arr = new Date(data.arrivalTime).getTime();
  // Allow 5 minutes clock drift tolerance
  return arr >= Date.now() - 5 * 60 * 1000;
}, {
  message: 'Landing flight arrival time cannot be in the past.',
  path: ['arrivalTime'],
}).refine((data) => {
  const arr = new Date(data.arrivalTime).getTime();
  const dep = new Date(data.departureTime).getTime();
  return dep > arr;
}, {
  message: 'Departure time must be strictly after arrival time.',
  path: ['departureTime'],
}).refine((data) => {
  const arr = new Date(data.arrivalTime).getTime();
  const dep = new Date(data.departureTime).getTime();
  const diffHours = (dep - arr) / (1000 * 60 * 60);
  return diffHours >= 3.0 && diffHours <= 48.0;
}, {
  message: 'Layover dwell time must be between 3 hours and 48 hours.',
});

export type LayoverCalculationInput = z.infer<typeof layoverCalculationSchema>;
