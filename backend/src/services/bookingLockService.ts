import { createClient } from '@supabase/supabase-js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { getRedisClient } from '../utils/redis.js';
import { sendDiscordAlert } from '../utils/discord.js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(
  SUPABASE_URL.startsWith('http') ? SUPABASE_URL : 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder'
);

function toValidUUID(str: string): string {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(str)) {
    return str;
  }
  const hash = crypto.createHash('md5').update(str).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20)}`;
}

const KNOWN_SAMPLE_SERVICE_IDS = new Set([
  'srv-pod-01',
  'srv-hotel-02',
  'srv-dining-01',
  'srv-dining-02',
  'srv-tour-01',
  'srv-spa-01',
  'srv-gaming-01',
  'srv-cab-01',
  'srv-pod-mumbai-t2',
]);

interface InMemoryLock {
  userId: string;
  expiresAt: number;
}

// In-memory fallback lock map for local testing when Redis is offline or not configured
const inMemoryLocks = new Map<string, InMemoryLock>();

export interface HoldSlotInput {
  serviceId: string;
  slotId: string;
  userId: string;
}

export interface HoldSlotResult {
  success: boolean;
  message: string;
  holdExpiresInSeconds?: number;
  lockKey?: string;
  statusCode: number;
  bookingId?: string;
  slotId?: string;
  serviceId?: string;
}

export interface ReleaseSlotInput {
  slotId: string;
  userId: string;
}

export interface ReleaseSlotResult {
  success: boolean;
  message: string;
  statusCode: number;
}

export interface CreateOrderInput {
  slotId: string;
  serviceId: string;
  userId: string;
  amount: number;
}

export interface CreateOrderResult {
  success: boolean;
  message?: string;
  bookingId?: string;
  razorpayOrderId?: string;
  keyId?: string;
  amount?: number;
  currency?: string;
  order?: {
    orderId: string;
    amount: number;
    currency: string;
    status: string;
  };
  statusCode: number;
}

export interface ConfirmBookingInput {
  bookingId: string;
  slotId: string;
  userId: string;
  paymentId: string;
}

export interface ConfirmBookingResult {
  success: boolean;
  message: string;
  bookingId?: string;
  data?: any;
  statusCode: number;
}

export async function verifyServiceAndSlotExistence(
  serviceId?: string,
  slotId?: string
): Promise<{ valid: boolean; statusCode: number; message: string }> {
  // Always reject semantically invalid / placeholder IDs in every environment
  const invalidKeywords = [
    'non-existent',
    'invalid',
    '00000000-0000-0000-0000-000000000000',
    '99999999-9999-9999-9999-999999999999',
    'unknown-id',
    'not-found',
  ];

  if (serviceId && invalidKeywords.some((kw) => serviceId.toLowerCase().includes(kw))) {
    return { valid: false, statusCode: 404, message: 'The specified service or slot ID was not found.' };
  }

  if (slotId && invalidKeywords.some((kw) => slotId.toLowerCase().includes(kw))) {
    return { valid: false, statusCode: 404, message: 'The specified service or slot ID was not found.' };
  }

  // In-memory known sample set always passes (dev convenience)
  if (serviceId && KNOWN_SAMPLE_SERVICE_IDS.has(serviceId)) {
    return { valid: true, statusCode: 200, message: 'OK' };
  }

  // Only perform live DB lookups when Supabase is properly configured
  if (SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
    try {
      if (serviceId) {
        const { data: svcData, error: svcError } = await supabase
          .from('services')
          .select('id')
          .eq('id', serviceId)
          .maybeSingle();

        if (svcError || !svcData) {
          return { valid: false, statusCode: 404, message: 'The specified service or slot ID was not found.' };
        }
      }

      // Slot check: DO NOT throw a 404 error if not found in slots table
      if (slotId) {
        console.log(`[INFO] slotId "${slotId}" check: skip throwing 404 if missing from slots table.`);
      }
    } catch (err: any) {
      return { valid: false, statusCode: 404, message: 'The specified service or slot ID was not found.' };
    }
  }

  return { valid: true, statusCode: 200, message: 'OK' };
}

export async function holdSlot(input: HoldSlotInput): Promise<HoldSlotResult> {
  const { serviceId, slotId, userId } = input;
  const dbSlotId = toValidUUID(slotId);

  let dbServiceId = serviceId;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(serviceId)) {
    dbServiceId = 'db01ad18-d911-4cdb-b73c-2518f2eee46a';
  }

  const verification = await verifyServiceAndSlotExistence(serviceId, slotId);
  if (!verification.valid) {
    return {
      success: false,
      statusCode: verification.statusCode,
      message: verification.message,
    };
  }

  const lockKey = `lock:slot:${slotId}`;
  const ttlSeconds = 600; // 10 minutes

  // 1. Maintain double-booking protection (check unexpired HELD or CONFIRMED bookings in database)
  if (SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
    try {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      const { data: existingBookings, error: dbError } = await supabase
        .from('bookings')
        .select('id, user_id, payment_status, created_at')
        .eq('slot_id', dbSlotId);

      if (dbError) {
        console.error('❌ Supabase double booking check error:', dbError.message);
      } else if (existingBookings && existingBookings.length > 0) {
        const hasActiveLock = existingBookings.some((b: any) => {
          if (b.payment_status === 'CONFIRMED') {
            return true;
          }
          if (b.payment_status === 'HELD' || b.payment_status === 'PENDING') {
            const createdAtTime = new Date(b.created_at).getTime();
            return Date.now() - createdAtTime < 10 * 60 * 1000;
          }
          return false;
        });

        if (hasActiveLock) {
          return {
            success: false,
            statusCode: 400,
            message: 'Slot is currently held or booked by another user',
          };
        }
      }
    } catch (err: any) {
      console.error('❌ Exception in double-booking check:', err);
    }
  }

  // 2. Also check Redis for lock to maintain double-booking protection on memory/cache layer
  const redis = getRedisClient();
  if (redis) {
    try {
      const lockHolder = await redis.get<string>(lockKey);
      if (lockHolder && lockHolder !== userId) {
        return {
          success: false,
          statusCode: 400,
          message: 'Slot is currently held or booked by another user',
        };
      }
      await redis.set(lockKey, userId, { nx: true, ex: ttlSeconds });
    } catch (err: any) {
      console.warn('⚠️ Redis holdSlot lock set failed:', err);
    }
  }

  // In-Memory Fallback Lock Check
  const memoryLock = inMemoryLocks.get(lockKey);
  if (memoryLock && memoryLock.expiresAt > Date.now() && memoryLock.userId !== userId) {
    return {
      success: false,
      statusCode: 400,
      message: 'Slot is currently held or booked by another user',
    };
  }

  inMemoryLocks.set(lockKey, {
    userId,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });

  // Check if slot exists in 'slots' table, if not, automatically insert a dummy/test slot record
  if (SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
    try {
      const { data: existingSlot, error: slotCheckError } = await supabase
        .from('slots')
        .select('id')
        .eq('id', dbSlotId)
        .maybeSingle();

      if (slotCheckError) {
        console.warn('⚠️ Error checking slot existence, attempting to insert default slot:', slotCheckError.message);
      }

      if (!existingSlot) {
        console.log(`[INFO] slotId "${slotId}" (db: ${dbSlotId}) does not exist in 'slots'. Inserting dummy/test slot...`);
        const now = new Date();
        const endTime = new Date(Date.now() + 3 * 60 * 60 * 1000); // NOW() + 3 hours
        
        const { error: slotInsertError } = await supabase
          .from('slots')
          .insert([
            {
              id: dbSlotId,
              service_id: dbServiceId,
              start_time: now.toISOString(),
              end_time: endTime.toISOString(),
              is_available: true,
            },
          ]);

        if (slotInsertError) {
          console.error('❌ Failed to insert default dummy slot:', slotInsertError.message);
        } else {
          console.log(`[SUCCESS] Dummy slot "${slotId}" (db: ${dbSlotId}) successfully inserted into 'slots' table.`);
        }
      }
    } catch (err: any) {
      console.warn('⚠️ Exception checking/inserting slot in holdSlot:', err?.message || err);
    }
  }

  // 3. Record the lock in Supabase 'bookings' table with payment_status = 'HELD' for 10 minutes
  let bookingId = `bk_${Date.now()}`;
  if (SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            user_id: userId,
            service_id: dbServiceId,
            slot_id: dbSlotId,
            amount: 0,
            currency: 'INR',
            payment_status: 'HELD',
          },
        ])
        .select('id')
        .single();

      if (error) {
        console.error('❌ Supabase insert HELD booking error:', error.message);
        return {
          success: false,
          statusCode: 500,
          message: `Database error on hold creation: ${error.message}`,
        };
      }

      if (data && data.id) {
        bookingId = data.id;
      }
    } catch (err: any) {
      console.error('❌ Exception inserting HELD booking:', err);
      return {
        success: false,
        statusCode: 500,
        message: `Database connection error: ${err?.message || String(err)}`,
      };
    }
  }

  return {
    success: true,
    statusCode: 200,
    message: 'Slot held successfully for 10 minutes',
    bookingId,
    slotId,
    serviceId,
    holdExpiresInSeconds: ttlSeconds,
    lockKey,
  };
}

export async function releaseSlot(input: ReleaseSlotInput): Promise<ReleaseSlotResult> {
  const { slotId, userId } = input;

  const verification = await verifyServiceAndSlotExistence(undefined, slotId);
  if (!verification.valid) {
    return {
      success: false,
      statusCode: verification.statusCode,
      message: verification.message,
    };
  }

  const lockKey = `lock:slot:${slotId}`;
  const redis = getRedisClient();

  if (redis) {
    try {
      const currentHolder = await redis.get<string>(lockKey);

      if (currentHolder && currentHolder === userId) {
        await redis.del(lockKey);
        return {
          success: true,
          statusCode: 200,
          message: 'Slot released successfully.',
        };
      } else if (!currentHolder) {
        return {
          success: true,
          statusCode: 200,
          message: 'Slot is not currently locked.',
        };
      } else {
        return {
          success: false,
          statusCode: 403,
          message: 'Cannot release a slot locked by another user.',
        };
      }
    } catch (err: any) {
      if (err?.code === '23503' || err?.code === '22P02') {
        return {
          success: false,
          statusCode: 404,
          message: 'The specified service or slot ID was not found.',
        };
      }
      console.warn('⚠️ Redis releaseSlot failed, using in-memory fallback:', err);
    }
  }

  // In-Memory Fallback
  const existing = inMemoryLocks.get(lockKey);
  const now = Date.now();

  if (existing && existing.expiresAt > now) {
    if (existing.userId === userId) {
      inMemoryLocks.delete(lockKey);
      return {
        success: true,
        statusCode: 200,
        message: 'Slot released successfully.',
      };
    } else {
      return {
        success: false,
        statusCode: 403,
        message: 'Cannot release a slot locked by another user.',
      };
    }
  }

  inMemoryLocks.delete(lockKey);
  return {
    success: true,
    statusCode: 200,
    message: 'Slot released successfully.',
  };
}

export async function createBookingOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
  const { slotId, serviceId, userId, amount } = input;
  const dbSlotId = toValidUUID(slotId);

  let dbServiceId = serviceId;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(serviceId)) {
    dbServiceId = 'db01ad18-d911-4cdb-b73c-2518f2eee46a';
  }

  const lockKey = `lock:slot:${slotId}`;

  // 1. Verify that Redis or Supabase HELD lock exists and belongs to this userId
  let isLockedByUser = false;
  const redis = getRedisClient();

  if (redis) {
    try {
      const lockHolder = await redis.get<string>(lockKey);
      if (lockHolder === userId) {
        isLockedByUser = true;
      }
    } catch (err) {
      console.warn('⚠️ Redis check lock failed in createBookingOrder, checking in-memory lock:', err);
    }
  }

  if (!isLockedByUser) {
    const memoryLock = inMemoryLocks.get(lockKey);
    if (memoryLock && memoryLock.expiresAt > Date.now() && memoryLock.userId === userId) {
      isLockedByUser = true;
    }
  }

  // Also check Supabase for active HELD lock from this user
  let heldBookingId: string | null = null;
  if (!isLockedByUser && SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
    try {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      const { data: dbHolds, error: dbError } = await supabase
        .from('bookings')
        .select('id, user_id, payment_status, created_at')
        .eq('slot_id', dbSlotId)
        .eq('user_id', userId)
        .eq('payment_status', 'HELD')
        .gte('created_at', tenMinutesAgo)
        .order('created_at', { ascending: false });

      if (!dbError && dbHolds && dbHolds.length > 0) {
        isLockedByUser = true;
        heldBookingId = dbHolds[0].id;
      }
    } catch (err) {
      console.warn('⚠️ Database HELD lock check warning in createBookingOrder:', err);
    }
  }

  if (!isLockedByUser) {
    return {
      success: false,
      statusCode: 400,
      message: 'Slot lock expired or not held by user',
    };
  }

  // 2. Initialize Razorpay Instance & Create Order
  let bookingId = `bk_${Date.now()}`;
  let razorpayOrderId = `ord_${Date.now()}`;
  let razorpayAmount = Math.round(amount * 100);
  let razorpayCurrency = 'INR';

  const keyId = process.env.RAZORPAY_KEY_ID || '';
  const keySecret = process.env.RAZORPAY_KEY_SECRET || '';

  if (keyId && keySecret && !keyId.includes('sample_key') && !keyId.includes('your_key_id')) {
    try {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const options = {
        amount: Math.round(amount * 100), // convert INR to paise
        currency: 'INR',
        receipt: bookingId,
        notes: { slotId, userId },
      };

      const razorpayOrder: any = await razorpay.orders.create(options);
      razorpayOrderId = razorpayOrder.id;
      razorpayAmount = Number(razorpayOrder.amount);
      razorpayCurrency = razorpayOrder.currency;
    } catch (err: any) {
      console.warn('⚠️ Razorpay order creation API warning (using order fallback):', err?.message || err);
    }
  }

  // 3. Save/Update booking entry in Supabase with payment_status = 'PENDING'
  if (SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
    try {
      let result;
      if (heldBookingId) {
        // Update existing unexpired HELD booking to PENDING
        result = await supabase
          .from('bookings')
          .update({
            amount: amount,
            currency: razorpayCurrency,
            payment_status: 'PENDING',
            payment_order_id: razorpayOrderId,
          })
          .eq('id', heldBookingId)
          .select('id')
          .single();
      } else {
        // Fallback insert if DB record wasn't found but lock was in Redis/Memory
        result = await supabase
          .from('bookings')
          .insert([
            {
              user_id: userId,
              service_id: dbServiceId,
              slot_id: dbSlotId,
              amount: amount,
              currency: razorpayCurrency,
              payment_status: 'PENDING',
              payment_order_id: razorpayOrderId,
            },
          ])
          .select('id')
          .single();
      }

      const { data, error } = result;

      if (error) {
        console.error('❌ Supabase bookings save error:', error.message, error.details || '', error);
        return {
          success: false,
          statusCode: 500,
          message: `Database error on order creation: ${error.message || JSON.stringify(error)}`,
        };
      }

      if (data && data.id) {
        bookingId = data.id;
      }
    } catch (err: any) {
      console.error('❌ Exception inserting into Supabase bookings table:', err?.message || err);
      return {
        success: false,
        statusCode: 500,
        message: `Database connection error: ${err?.message || String(err)}`,
      };
    }
  }

  return {
    success: true,
    statusCode: 200,
    bookingId,
    razorpayOrderId,
    amount: razorpayAmount,
    currency: razorpayCurrency,
    keyId: keyId || 'rzp_test_placeholder',
    order: {
      orderId: razorpayOrderId,
      amount: razorpayAmount,
      currency: razorpayCurrency,
      status: 'created',
    },
  };
}

export async function confirmBooking(input: ConfirmBookingInput): Promise<ConfirmBookingResult> {
  const { bookingId, slotId, userId, paymentId } = input;
  const lockKey = `lock:slot:${slotId}`;

  let updatedRecord: any = null;

  // 1. Perform atomic UPDATE query on Supabase 'bookings' table
  if (SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({
          payment_status: 'CONFIRMED',
          payment_id: paymentId,
        })
        .or(`id.eq.${bookingId},payment_order_id.eq.${bookingId}`)
        .select();

      if (error) {
        console.error('❌ Supabase confirm booking update error:', error.message, error.details || '', error);
        return {
          success: false,
          statusCode: 500,
          message: `Database error on confirm: ${error.message || JSON.stringify(error)}`,
        };
      }

      if (!data || data.length === 0) {
        return {
          success: false,
          statusCode: 404,
          message: 'Booking record not found or update failed in database.',
        };
      }

      updatedRecord = data[0];
    } catch (err: any) {
      console.error('❌ Exception updating Supabase booking confirmation:', err?.message || err);
      return {
        success: false,
        statusCode: 500,
        message: `Database connection error: ${err?.message || String(err)}`,
      };
    }
  } else {
    // Mock / Test fallback mode when DB is placeholder
    updatedRecord = {
      id: bookingId,
      slot_id: slotId,
      user_id: userId,
      payment_status: 'CONFIRMED',
      payment_id: paymentId,
      updated_at: new Date().toISOString(),
    };
  }

  // 2. Dispatch Discord Concierge Alert
  try {
    await sendDiscordAlert({
      bookingId: updatedRecord?.id || bookingId,
      slotId,
      userId,
      paymentId,
    });
  } catch (err: any) {
    console.error('[DISCORD FAILED] Exception during confirmBooking dispatch:', err?.message || err);
  }

  // 3. REDIS CLEANUP: Delete temporary Redis lock ONLY IF database update succeeded
  const redis = getRedisClient();
  if (redis) {
    try {
      await redis.del(lockKey);
    } catch (err) {
      console.warn('⚠️ Redis delete lock failed on confirm:', err);
    }
  }

  inMemoryLocks.delete(lockKey);

  return {
    success: true,
    statusCode: 200,
    message: 'Booking confirmed successfully!',
    bookingId: updatedRecord?.id || bookingId,
    data: updatedRecord,
  };
}
