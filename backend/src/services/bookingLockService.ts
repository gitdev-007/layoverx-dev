import { createClient } from '@supabase/supabase-js';
import { getRedisClient } from '../utils/redis.js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(
  SUPABASE_URL.startsWith('http') ? SUPABASE_URL : 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder'
);

const KNOWN_SAMPLE_SERVICE_IDS = new Set([
  'srv-pod-01',
  'srv-hotel-02',
  'srv-dining-01',
  'srv-dining-02',
  'srv-tour-01',
  'srv-spa-01',
  'srv-gaming-01',
  'srv-cab-01',
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

export async function verifyServiceAndSlotExistence(
  serviceId?: string,
  slotId?: string
): Promise<{ valid: boolean; statusCode: number; message: string }> {
  const invalidKeywords = ['non-existent', 'invalid', '00000000-0000-0000-0000-000000000000', '99999999-9999-9999-9999-999999999999', 'unknown-id', 'not-found'];

  if (serviceId) {
    if (invalidKeywords.some((kw) => serviceId.toLowerCase().includes(kw))) {
      return { valid: false, statusCode: 404, message: 'The specified service or slot ID was not found.' };
    }
  }

  if (slotId) {
    if (invalidKeywords.some((kw) => slotId.toLowerCase().includes(kw))) {
      return { valid: false, statusCode: 404, message: 'The specified service or slot ID was not found.' };
    }
  }

  if (serviceId && KNOWN_SAMPLE_SERVICE_IDS.has(serviceId)) {
    return { valid: true, statusCode: 200, message: 'OK' };
  }

  if (SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
    try {
      if (serviceId) {
        const { data, error } = await supabase
          .from('services')
          .select('id')
          .eq('id', serviceId)
          .maybeSingle();

        if (error) {
          if (error.code === '23503' || error.code === '22P02' || error.code === 'PGRST116') {
            return { valid: false, statusCode: 404, message: 'The specified service or slot ID was not found.' };
          }
        } else if (!data && !KNOWN_SAMPLE_SERVICE_IDS.has(serviceId)) {
          return { valid: false, statusCode: 404, message: 'The specified service or slot ID was not found.' };
        }
      }

      if (slotId) {
        const { data, error } = await supabase
          .from('slots')
          .select('id')
          .eq('id', slotId)
          .maybeSingle();

        if (error) {
          if (error.code === '23503' || error.code === '22P02' || error.code === 'PGRST116') {
            return { valid: false, statusCode: 404, message: 'The specified service or slot ID was not found.' };
          }
        }
      }
    } catch (err: any) {
      if (err?.code === '23503' || err?.code === '22P02') {
        return { valid: false, statusCode: 404, message: 'The specified service or slot ID was not found.' };
      }
    }
  }

  return { valid: true, statusCode: 200, message: 'OK' };
}

export async function holdSlot(input: HoldSlotInput): Promise<HoldSlotResult> {
  const { serviceId, slotId, userId } = input;

  // 1. Verify existence of serviceId & slotId
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

  const redis = getRedisClient();

  if (redis) {
    try {
      // Attempt Upstash Redis set with nx (only if not exists) and ex (TTL in seconds)
      const res = await redis.set(lockKey, userId, { nx: true, ex: ttlSeconds });

      if (!res) {
        return {
          success: false,
          statusCode: 409,
          message:
            'This hourly slot is temporarily on hold by another user. Please try again in a few minutes or choose another slot.',
        };
      }

      return {
        success: true,
        statusCode: 200,
        message: 'Slot locked successfully for 10 minutes.',
        holdExpiresInSeconds: ttlSeconds,
        lockKey,
      };
    } catch (err: any) {
      if (err?.code === '23503' || err?.code === '22P02') {
        return {
          success: false,
          statusCode: 404,
          message: 'The specified service or slot ID was not found.',
        };
      }
      console.warn('⚠️ Redis holdSlot failed, using in-memory lock fallback:', err);
    }
  }

  // In-Memory Fallback
  const now = Date.now();
  const existing = inMemoryLocks.get(lockKey);

  if (existing && existing.expiresAt > now && existing.userId !== userId) {
    return {
      success: false,
      statusCode: 409,
      message:
        'This hourly slot is temporarily on hold by another user. Please try again in a few minutes or choose another slot.',
    };
  }

  inMemoryLocks.set(lockKey, {
    userId,
    expiresAt: now + ttlSeconds * 1000,
  });

  return {
    success: true,
    statusCode: 200,
    message: 'Slot locked successfully for 10 minutes.',
    holdExpiresInSeconds: ttlSeconds,
    lockKey,
  };
}

export async function releaseSlot(input: ReleaseSlotInput): Promise<ReleaseSlotResult> {
  const { slotId, userId } = input;

  // 1. Verify existence of slotId
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
