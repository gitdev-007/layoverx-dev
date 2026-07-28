import { getRedisClient } from '../utils/redis.js';

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

export async function holdSlot(input: HoldSlotInput): Promise<HoldSlotResult> {
  const { slotId, userId } = input;
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
    } catch (err) {
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
    } catch (err) {
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
