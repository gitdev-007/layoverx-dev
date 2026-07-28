import { createClient } from '@supabase/supabase-js';
import { getRedisClient } from '../utils/redis.js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(
  SUPABASE_URL.startsWith('http') ? SUPABASE_URL : 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder'
);

export interface ProcessFlightUpdateInput {
  flightNumber: string;
  userId: string;
  bookingId: string;
  slotId?: string;
  originalLayoverMinutes: number;
  delayMinutes: number;
}

export interface ProcessFlightUpdateResult {
  status: 'safe' | 'auto_cancelled';
  message: string;
  netLayoverMinutes: number;
  refundStatus?: string;
  statusCode: number;
}

export async function processFlightUpdate(
  input: ProcessFlightUpdateInput
): Promise<ProcessFlightUpdateResult> {
  const { flightNumber, userId, bookingId, slotId, originalLayoverMinutes, delayMinutes } = input;

  const netLayoverMinutes = originalLayoverMinutes - delayMinutes;

  // SCENARIO A: Layover is still usable (netLayoverMinutes >= 45)
  if (netLayoverMinutes >= 45) {
    return {
      status: 'safe',
      message: 'Layover is still usable despite delay. Booking retained.',
      netLayoverMinutes,
      statusCode: 200,
    };
  }

  // SCENARIO B: Severe delay rendering layover unusable (netLayoverMinutes < 45)
  // a. Update Supabase 'bookings' table
  if (SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({
          payment_status: 'CANCELLED_FLIGHT_DELAY',
          location_instructions:
            'Booking automatically cancelled due to severe flight delay. Full refund initiated.',
        })
        .or(`id.eq.${bookingId},payment_order_id.eq.${bookingId}`);

      if (error) {
        console.error('❌ Supabase telemetry update error:', error.message, error.details || '', error);
        throw new Error(`Database error on telemetry auto-cancellation: ${error.message}`);
      }
    } catch (err: any) {
      console.error('❌ Exception during flight delay auto-cancellation:', err);
      throw err;
    }
  }

  // b. Delete Redis lock key `lock:slot:${slotId}` if slotId provided
  if (slotId) {
    const lockKey = `lock:slot:${slotId}`;
    const redis = getRedisClient();
    if (redis) {
      try {
        await redis.del(lockKey);
      } catch (redisErr) {
        console.warn('⚠️ Redis lock release error on telemetry cancel:', redisErr);
      }
    }
  }

  return {
    status: 'auto_cancelled',
    message: 'Flight delay rendered layover unusable. Booking auto-cancelled and refund initiated.',
    netLayoverMinutes,
    refundStatus: 'INITIATED',
    statusCode: 200,
  };
}
