import { Redis } from '@upstash/redis';

let redisClient: Redis | null = null;

export function getRedisClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token || url.includes('sample-redis')) {
    return null;
  }

  if (!redisClient) {
    try {
      redisClient = new Redis({
        url,
        token,
      });
    } catch (error) {
      console.warn('⚠️ Upstash Redis initialization error:', error);
      redisClient = null;
    }
  }

  return redisClient;
}

export async function getFromCache<T>(key: string): Promise<T | null> {
  try {
    const client = getRedisClient();
    if (!client) return null;
    const data = await client.get<T>(key);
    return data;
  } catch (error) {
    console.warn(`⚠️ Redis cache get error for key "${key}":`, error);
    return null;
  }
}

export async function setToCache(
  key: string,
  value: any,
  ttlSeconds: number = 300
): Promise<void> {
  try {
    const client = getRedisClient();
    if (!client) return;
    await client.set(key, value, { ex: ttlSeconds });
  } catch (error) {
    console.warn(`⚠️ Redis cache set error for key "${key}":`, error);
  }
}
