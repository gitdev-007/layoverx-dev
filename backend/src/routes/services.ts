import { Router, Request, Response } from 'express';
import { getFromCache, setToCache } from '../utils/redis.js';
import { fetchServiceCatalog, ServiceCatalogItem } from '../services/catalogService.js';

const router = Router();

// GET /api/v1/services
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const category = req.query.category as string | undefined;
    const usableMinutesStr = req.query.usableMinutes as string | undefined;
    const terminal = req.query.terminal as string | undefined;

    const usableMinutes = usableMinutesStr ? parseInt(usableMinutesStr, 10) : undefined;

    // 1. Generate Cache Key
    const cacheKey = `catalog:cat=${category || 'ALL'}:usable=${usableMinutes !== undefined ? usableMinutes : 'ALL'}:term=${terminal || 'ALL'}`;

    // 2. Check Upstash Redis Cache
    const cachedData = await getFromCache<ServiceCatalogItem[]>(cacheKey);

    if (cachedData) {
      res.setHeader('X-Cache', 'HIT');
      res.status(200).json({
        status: 'success',
        count: cachedData.length,
        data: cachedData,
      });
      return;
    }

    // 3. Cache Miss: Fetch from Supabase / Catalog Service
    const catalogData = await fetchServiceCatalog({
      category,
      usableMinutes,
      terminal,
    });

    // 4. Store in Upstash Redis Cache (TTL = 300s / 5 mins)
    await setToCache(cacheKey, catalogData, 300);

    res.setHeader('X-Cache', 'MISS');
    res.status(200).json({
      status: 'success',
      count: catalogData.length,
      data: catalogData,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error while fetching service catalog',
    });
  }
});

export default router;
